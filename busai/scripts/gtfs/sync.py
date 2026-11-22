#!/usr/bin/env python3
"""Download LTA's train GTFS feed, build a compact snapshot, and import it.

The workflow runs this with:
  LTA_DATAMALL_KEY, SUPABASE_DB_URL, DRY_RUN=0|1

Local dry run:
  cd busai/scripts/gtfs
  LTA_DATAMALL_KEY=... DRY_RUN=1 python sync.py
"""

from __future__ import annotations

import csv
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import urllib.request
import zipfile
from collections import defaultdict
from datetime import date, datetime, timezone
from pathlib import Path

LTA_METADATA_URL = (
    "https://datamall2.mytransport.sg/ltaodataservice/GTFSScheduleTrain"
)
REQUIRED_GTFS_FILES = (
    "agency.txt",
    "calendar.txt",
    "calendar_dates.txt",
    "feed_info.txt",
    "routes.txt",
    "stop_times.txt",
    "stops.txt",
    "trips.txt",
)

LINE_ORDER = (
    "NSL",
    "EWL",
    "NEL",
    "CCL",
    "DTL",
    "TEL",
    "BPL",
    "SKL",
    "PGL",
)
LINE_BY_ROUTE_SHORT = {
    "NS": "NSL",
    "EW": "EWL",
    "CG": "EWL",
    "NE": "NEL",
    "CC": "CCL",
    "DT": "DTL",
    "TE": "TEL",
    "BP": "BPL",
    "SK": "SKL",
    "PG": "PGL",
}
SERVICE_FIELDS = (
    "service_id",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
    "start_date",
    "end_date",
)


def _read_csv(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8-sig") as handle:
        return list(csv.DictReader(handle))


def _read_csv_stream(path: Path):
    with path.open(newline="", encoding="utf-8-sig") as handle:
        yield from csv.DictReader(handle)


def fetch_feed_metadata(api_key: str) -> dict[str, str]:
    request = urllib.request.Request(
        LTA_METADATA_URL,
        headers={"AccountKey": api_key, "Accept": "application/json"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        payload = json.load(response)
    values = payload.get("value") or []
    if not values:
        raise RuntimeError("LTA returned no GTFSScheduleTrain metadata")
    metadata = values[0]
    link = metadata.get("link")
    if not link:
        raise RuntimeError("LTA metadata has no presigned download link")
    # Mask the presigned link before it can reach the logs.
    print(f"::add-mask::{link}")
    return {
        "timestamp": str(metadata.get("timestamp") or ""),
        "link": link,
    }


def download_zip(link: str, dest: Path) -> int:
    dest.parent.mkdir(parents=True, exist_ok=True)
    request = urllib.request.Request(
        link, headers={"User-Agent": "busai-gtfs-sync/1.0"}
    )
    total = 0
    with urllib.request.urlopen(request, timeout=60) as response, dest.open("wb") as handle:
        while True:
            chunk = response.read(1024 * 1024)
            if not chunk:
                break
            handle.write(chunk)
            total += len(chunk)
    return total


def extract_zip(zip_path: Path, dest: Path) -> None:
    dest.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(zip_path) as archive:
        archive.extractall(dest)


def resolve_gtfs_root(dest: Path) -> Path:
    if (dest / "stops.txt").exists():
        return dest
    for child in dest.iterdir():
        if child.is_dir() and (child / "stops.txt").exists():
            return child
    return dest


def canonical_hash(gtfs_dir: Path) -> str:
    missing = [name for name in REQUIRED_GTFS_FILES if not (gtfs_dir / name).exists()]
    if missing:
        raise RuntimeError(f"GTFS feed is missing: {', '.join(missing)}")

    parts: list[str] = []
    for name in sorted(REQUIRED_GTFS_FILES):
        raw = (gtfs_dir / name).read_bytes()
        normalized = raw.replace(b"\r\n", b"\n").replace(b"\r", b"\n")
        parts.append(f"{name}\n{hashlib.sha256(normalized).hexdigest()}\n")
    return hashlib.sha256("".join(parts).encode("utf-8")).hexdigest()


def read_feed_info(gtfs_dir: Path) -> dict[str, str]:
    rows = _read_csv(gtfs_dir / "feed_info.txt")
    return rows[0] if rows else {}


def parse_time(value: str) -> int:
    hours, minutes, seconds = (int(part) for part in value.strip().split(":"))
    return hours * 3600 + minutes * 60 + seconds


def _canonical_stop(stop: dict[str, str]) -> str:
    return stop.get("parent_station") or stop["stop_id"]


def _platform_code(stop: dict[str, str]) -> str:
    value = (stop.get("platform_code") or "").strip()
    if value:
        return value.split(" / ")[0].strip()
    return stop["stop_id"]


def _station_code(stop: dict[str, str], fallback: str) -> str:
    code = (stop.get("stop_code") or "").strip()
    if code:
        return code
    return fallback.split("_")[0]


def _code_sort_key(code: str) -> tuple[str, int, str]:
    match = re.match(r"^([A-Za-z]+)(\d+)$", code)
    if match:
        return match.group(1), int(match.group(2)), code
    return code, 0, code


def build_snapshot(gtfs_dir: Path) -> dict:
    stops = _read_csv(gtfs_dir / "stops.txt")
    routes = _read_csv(gtfs_dir / "routes.txt")
    trips = _read_csv(gtfs_dir / "trips.txt")
    calendar = _read_csv(gtfs_dir / "calendar.txt")
    calendar_dates = _read_csv(gtfs_dir / "calendar_dates.txt")

    stops_by_id = {row["stop_id"]: row for row in stops}
    station_names: dict[str, str] = {}
    for stop in stops:
        if stop.get("location_type") == "1" and not stop.get("parent_station"):
            station_names[stop["stop_id"]] = stop.get("stop_name") or stop["stop_id"]

    route_line: dict[str, str] = {}
    for route in routes:
        short = (route.get("route_short_name") or "").strip().upper()
        line = LINE_BY_ROUTE_SHORT.get(short)
        if line:
            route_line[route["route_id"]] = line

    trip_info: dict[str, dict[str, str]] = {}
    for trip in trips:
        line = route_line.get(trip.get("route_id", ""))
        if not line:
            continue
        trip_info[trip["trip_id"]] = {
            "service_id": trip["service_id"],
            "line": line,
            "headsign": (trip.get("trip_headsign") or "").strip(),
            "direction": (trip.get("direction_id") or "0").strip() or "0",
        }

    station_lines: dict[str, set[str]] = defaultdict(set)
    station_codes: dict[str, dict[str, set[str]]] = defaultdict(
        lambda: defaultdict(set)
    )
    departures: dict[tuple[str, str], list[dict]] = defaultdict(list)
    trip_stops: dict[str, list[str]] = defaultdict(list)

    for row in _read_csv_stream(gtfs_dir / "stop_times.txt"):
        trip = trip_info.get(row.get("trip_id", ""))
        if not trip:
            continue
        stop = stops_by_id.get(row.get("stop_id", ""))
        if not stop:
            continue

        station_id = _canonical_stop(stop)
        line = trip["line"]
        if station_id not in station_names:
            station_names[station_id] = stop.get("stop_name") or station_id
        station_lines[station_id].add(line)
        station_codes[station_id][line].add(
            _station_code(stop, stop["stop_id"])
        )

        departure_time = row.get("departure_time") or row.get("arrival_time") or ""
        if not departure_time:
            continue
        seconds = parse_time(departure_time)
        headsign = trip["headsign"] or (row.get("stop_headsign") or "").strip()
        departures[(station_id, trip["service_id"])].append(
            {
                "t": seconds,
                "line": line,
                "headsign": headsign,
                "platform": _platform_code(stop),
                "direction": trip["direction"],
                "tripId": row["trip_id"],
            }
        )
        trip_stops[row["trip_id"]].append(station_id)

    for rows in departures.values():
        rows.sort(key=lambda item: (item["t"], item["tripId"]))

    stations: list[dict] = []
    for station_id in sorted(station_names):
        lines = sorted(
            station_lines.get(station_id, set()),
            key=lambda line: LINE_ORDER.index(line) if line in LINE_ORDER else 99,
        )
        codes: dict[str, str] = {}
        for line in lines:
            candidates = sorted(station_codes.get(station_id, {}).get(line, set()))
            codes[line] = candidates[0] if candidates else station_id
        stations.append(
            {
                "station_id": station_id,
                "name": station_names[station_id],
                "lines": lines,
                "codes": codes,
            }
        )

    line_stations: list[dict] = []
    for line in LINE_ORDER:
        served = [
            station_id
            for station_id, lines in station_lines.items()
            if line in lines
        ]
        served.sort(
            key=lambda station_id: _code_sort_key(
                next(
                    iter(station_codes.get(station_id, {}).get(line, {station_id}))
                )
            )
        )
        trip_ids = [
            trip_id
            for trip_id, info in trip_info.items()
            if info["line"] == line and trip_stops.get(trip_id)
        ]
        best_trip = max(trip_ids, key=lambda trip_id: len(trip_stops[trip_id]), default=None)
        ordered: list[str] = []
        if best_trip:
            for station_id in trip_stops[best_trip]:
                if station_id not in ordered:
                    ordered.append(station_id)
        for station_id in served:
            if station_id not in ordered:
                ordered.append(station_id)
        if ordered:
            line_stations.append({"line": line, "station_ids": ordered})

    services = [
        {field: row.get(field, "") for field in SERVICE_FIELDS}
        for row in calendar
    ]
    service_exceptions = [
        {
            "service_id": row.get("service_id", ""),
            "date": row.get("date", ""),
            "exception_type": row.get("exception_type", ""),
        }
        for row in calendar_dates
    ]

    return {
        "stations": stations,
        "line_stations": line_stations,
        "services": services,
        "service_exceptions": service_exceptions,
        "departures": dict(departures),
    }


def write_snapshot_csvs(snapshot: dict, out_dir: Path) -> dict[str, Path]:
    out_dir.mkdir(parents=True, exist_ok=True)

    def dump(value) -> str:
        return json.dumps(value, separators=(",", ":"), ensure_ascii=False)

    paths = {
        "stations_csv": out_dir / "stations.csv",
        "line_stations_csv": out_dir / "line_stations.csv",
        "services_csv": out_dir / "services.csv",
        "service_exceptions_csv": out_dir / "service_exceptions.csv",
        "departures_csv": out_dir / "departures.csv",
    }

    with paths["stations_csv"].open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle, lineterminator="\n")
        writer.writerow(("station_id", "name", "lines", "codes"))
        for row in snapshot["stations"]:
            writer.writerow(
                (
                    row["station_id"],
                    row["name"],
                    dump(row["lines"]),
                    dump(row["codes"]),
                )
            )

    with paths["line_stations_csv"].open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle, lineterminator="\n")
        writer.writerow(("line", "station_ids"))
        for row in snapshot["line_stations"]:
            writer.writerow((row["line"], dump(row["station_ids"])))

    with paths["services_csv"].open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(
            handle, fieldnames=SERVICE_FIELDS, lineterminator="\n"
        )
        writer.writeheader()
        writer.writerows(snapshot["services"])

    with paths["service_exceptions_csv"].open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=("service_id", "date", "exception_type"),
            lineterminator="\n",
        )
        writer.writeheader()
        writer.writerows(snapshot["service_exceptions"])

    with paths["departures_csv"].open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle, lineterminator="\n")
        writer.writerow(("station_id", "service_id", "departures"))
        for (station_id, service_id) in sorted(snapshot["departures"]):
            writer.writerow(
                (
                    station_id,
                    service_id,
                    dump(snapshot["departures"][(station_id, service_id)]),
                )
            )

    return paths


def _sanitize(text: str, db_url: str) -> str:
    text = (text or "").strip()
    if db_url:
        text = text.replace(db_url, "[database]")
    return text[:1000]


def _run_psql(db_url: str, args: list[str]) -> str:
    result = subprocess.run(
        ["psql", db_url, *args],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        raise RuntimeError(_sanitize(result.stderr or result.stdout, db_url))
    return result.stdout


def read_meta(db_url: str) -> dict:
    output = _run_psql(
        db_url,
        [
            "-At",
            "-F",
            "|",
            "-c",
            """
            select content_hash,
                   coalesce(row_counts->>'stations', '0'),
                   coalesce(row_counts->>'departures', '0'),
                   coalesce(to_char(feed_end_date, 'YYYY-MM-DD'), '')
            from public.train_gtfs_meta
            where id = 1
            """,
        ],
    ).strip()
    if not output:
        return {
            "content_hash": "",
            "stations": "0",
            "departures": "0",
            "feed_end_date": "",
        }
    content_hash, stations, departures, feed_end_date = output.split("|")
    return {
        "content_hash": content_hash,
        "stations": stations,
        "departures": departures,
        "feed_end_date": feed_end_date,
    }


def mark_checked(db_url: str) -> None:
    _run_psql(
        db_url,
        [
            "-v",
            "ON_ERROR_STOP=1",
            "-c",
            "update public.train_gtfs_meta "
            "set last_checked_at = now(), last_error = null where id = 1",
        ],
    )


def mark_error(db_url: str, message: str) -> None:
    message = " ".join(message.split())[:500]
    _run_psql(
        db_url,
        [
            "-v",
            "ON_ERROR_STOP=1",
            "-v",
            f"msg={message}",
            "-c",
            "update public.train_gtfs_meta set last_error = :'msg' where id = 1",
        ],
    )


def import_snapshot(
    db_url: str,
    csv_paths: dict[str, Path],
    meta: dict[str, str],
) -> None:
    template = Path(__file__).with_name("import.sql").read_text()
    for key, path in csv_paths.items():
        placeholder = f"__{key.removesuffix('_csv').upper()}_CSV__"
        template = template.replace(placeholder, str(path).replace("'", "''"))

    with tempfile.NamedTemporaryFile(
        "w", suffix=".sql", delete=False, encoding="utf-8"
    ) as handle:
        handle.write(template)
        sql_path = Path(handle.name)

    args = [
        "-v",
        "ON_ERROR_STOP=1",
        "-v",
        f"content_hash={meta['content_hash']}",
        "-v",
        f"feed_timestamp={meta['feed_timestamp']}",
        "-v",
        f"feed_version={meta['feed_version']}",
        "-v",
        f"feed_start_date={meta['feed_start_date']}",
        "-v",
        f"feed_end_date={meta['feed_end_date']}",
        "-v",
        f"zip_bytes={meta['zip_bytes']}",
        "-f",
        str(sql_path),
    ]
    try:
        _run_psql(db_url, args)
    finally:
        sql_path.unlink(missing_ok=True)


def print_expiry(feed_end_date: str) -> None:
    if not feed_end_date:
        return
    try:
        end = datetime.strptime(feed_end_date, "%Y%m%d").date()
    except ValueError:
        return
    days_left = (end - date.today()).days
    if days_left < 30:
        print(
            f"::warning::GTFS feed ends {end.isoformat()} "
            f"({days_left} days left). The action will keep checking daily."
        )


def main() -> int:
    api_key = os.environ.get("LTA_DATAMALL_KEY", "").strip()
    db_url = os.environ.get("SUPABASE_DB_URL", "").strip()
    dry_run = os.environ.get("DRY_RUN", "0") == "1"

    if not api_key:
        print("::error::LTA_DATAMALL_KEY is not set")
        return 1
    if not dry_run and not db_url:
        print("::error::SUPABASE_DB_URL is not set")
        return 1

    out_dir = Path(os.environ.get("RUNNER_TEMP", tempfile.gettempdir())) / "gtfs-snapshot"
    work_dir = Path(tempfile.mkdtemp(prefix="gtfs-"))
    try:
        metadata = fetch_feed_metadata(api_key)
        zip_path = work_dir / "gtfs.zip"
        zip_bytes = download_zip(metadata["link"], zip_path)
        extract_zip(zip_path, work_dir / "extract")
        gtfs_dir = resolve_gtfs_root(work_dir / "extract")
        content_hash = canonical_hash(gtfs_dir)
        feed_info = read_feed_info(gtfs_dir)

        print(f"content_hash={content_hash}")
        print(f"zip_bytes={zip_bytes}")
        print(
            "feed_start={} feed_end={} feed_version={}".format(
                feed_info.get("feed_start_date", ""),
                feed_info.get("feed_end_date", ""),
                feed_info.get("feed_version", ""),
            )
        )
        print_expiry(feed_info.get("feed_end_date", ""))

        if not dry_run:
            current = read_meta(db_url)
            if current["content_hash"] == content_hash:
                mark_checked(db_url)
                print("unchanged")
                return 0

        snapshot = build_snapshot(gtfs_dir)
        csv_paths = write_snapshot_csvs(snapshot, out_dir)
        print(f"stations={len(snapshot['stations'])}")
        print(f"line_stations={len(snapshot['line_stations'])}")
        print(f"services={len(snapshot['services'])}")
        print(f"station_service_pairs={len(snapshot['departures'])}")

        if dry_run:
            print("dry_run=1 (no database writes)")
            return 0

        import_snapshot(
            db_url,
            csv_paths,
            {
                "content_hash": content_hash,
                "feed_timestamp": metadata["timestamp"]
                or datetime.now(timezone.utc).isoformat(),
                "feed_version": feed_info.get("feed_version", ""),
                "feed_start_date": feed_info.get("feed_start_date", ""),
                "feed_end_date": feed_info.get("feed_end_date", ""),
                "zip_bytes": str(zip_bytes),
            },
        )
        print("imported")
        return 0
    except Exception as exc:  # noqa: BLE001 - the workflow needs a clean failure
        message = _sanitize(str(exc), db_url)
        print(f"::error::{message}")
        if not dry_run and db_url:
            try:
                mark_error(db_url, message)
            except Exception as error:  # noqa: BLE001
                print(f"::warning::could not store last_error: {_sanitize(str(error), db_url)}")
        return 1
    finally:
        shutil.rmtree(work_dir, ignore_errors=True)


if __name__ == "__main__":
    sys.exit(main())
