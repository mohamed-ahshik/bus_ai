from pathlib import Path

from sync import (
    build_snapshot,
    canonical_hash,
    parse_time,
    write_snapshot_csvs,
)

FIXTURE = Path(__file__).parent / "fixtures" / "mini_gtfs"
CRLF = Path(__file__).parent / "fixtures" / "mini_gtfs_crlf"


def test_hash_is_stable():
    assert canonical_hash(FIXTURE) == canonical_hash(FIXTURE)


def test_crlf_and_lf_have_the_same_hash():
    assert canonical_hash(FIXTURE) == canonical_hash(CRLF)


def test_hash_changes_when_a_csv_changes(tmp_path):
    import shutil

    copy = tmp_path / "gtfs"
    shutil.copytree(FIXTURE, copy)
    (copy / "stop_times.txt").write_text(
        (copy / "stop_times.txt").read_text() + "\nX,06:00:00,06:00:00,S1,99,\n"
    )
    assert canonical_hash(copy) != canonical_hash(FIXTURE)


def test_parse_time_preserves_after_midnight():
    assert parse_time("25:10:00") == 25 * 3600 + 10 * 60


def test_snapshot_has_expected_fixture_counts():
    snap = build_snapshot(FIXTURE)
    assert len(snap["stations"]) == 2
    assert len(snap["services"]) == 1
    assert len(snap["line_stations"]) == 1
    assert snap["line_stations"][0]["line"] == "NSL"
    assert ("S1", "SERVICE_WD") in snap["departures"]


def test_after_midnight_time_is_preserved():
    snap = build_snapshot(FIXTURE)
    times = [d["t"] for d in snap["departures"][("S1", "SERVICE_WD")]]
    assert 25 * 3600 + 10 * 60 in times


def test_departures_keep_line_direction_and_platform():
    snap = build_snapshot(FIXTURE)
    departure = snap["departures"][("S1", "SERVICE_WD")][0]
    assert departure["line"] == "NSL"
    assert departure["direction"] == "0"
    assert departure["platform"] == "A"
    assert departure["headsign"] == "Station Two"


def test_write_snapshot_csvs_has_expected_headers(tmp_path):
    snap = build_snapshot(FIXTURE)
    paths = write_snapshot_csvs(snap, tmp_path)
    assert paths["stations_csv"].read_text().splitlines()[0] == (
        "station_id,name,lines,codes"
    )
    assert paths["departures_csv"].read_text().splitlines()[0] == (
        "station_id,service_id,departures"
    )
    assert '"NSL"' in paths["stations_csv"].read_text()
