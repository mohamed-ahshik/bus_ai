# Train GTFS Schedule Sync via GitHub Actions — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep a compact, query-ready copy of LTA's static train timetable in Supabase, refreshed daily by a GitHub-hosted Action that imports only when normalized CSV content changes.

**Architecture:** A GitHub-hosted runner calls `GTFSScheduleTrain`, follows the 15-minute presigned S3 link, downloads the ZIP, and hashes all eight CSVs after normalizing line endings. It compares that hash with a single-row state table in Supabase. On a change it builds a compact per-station/per-service snapshot, copies the current live rows to `gtfs_prev`, loads staging with `psql \copy`, validates against the previous import plus a loose floor, swaps live tables in one transaction, and updates state. The Expo app reads only compact Supabase tables; it never downloads GTFS or holds the LTA key.

**Tech Stack:** GitHub Actions (`ubuntu-latest`), Python 3.12 standard library (`urllib`, `zipfile`, `hashlib`, `csv`), `psql`, Supabase Postgres 17.

**Spec:** Inline design in this plan (reviewed 2026-11-21).

## Global Constraints

- Schedule: daily at **04:00 SGT** → `cron: '0 20 * * *'` in UTC.
- Never compare presigned S3 URLs: `X-Amz-Date`/`X-Amz-Signature` change on every call.
- Never use `feed_version` as a change signal: it stayed `0.1` when the 19 Nov feed changed 17 trips and 167 stop calls.
- Change signal: SHA-256 over all eight CSVs in sorted filename order, with `\r\n`/`\r` normalized to `\n`. Do not hash the ZIP.
- Import only when the hash changes; update `last_checked_at` on every run.
- Validation is **relative to the previous import**, never a hard-coded station count:
  - fail if `new_departures < 500` (absolute floor)
  - fail if `new_stations < 100` (absolute floor)
  - fail if previous counts exist and `new_stations < previous_stations`
  - fail if previous counts exist and `new_departures < previous_departures * 0.9`
- Keep the prior snapshot in `gtfs_prev` before every swap; upload the five compact CSVs as a 7-day Actions artifact.
- Import must be atomic; the app reads the previous snapshot until commit.
- Secrets: `LTA_DATAMALL_KEY`, `SUPABASE_DB_URL` (dedicated `gtfs_importer` role), optional `HEALTHCHECK_PING_URL`.
- `SUPABASE_DB_URL` uses the **session pooler, port 5432**, `sslmode=require`; the transaction pooler (`6543`) cannot run this import safely.
- Dedicated `gtfs_importer` role: only `train_gtfs_*`, `gtfs_staging`, and `gtfs_prev`; never the `postgres` password.
- Do not print the presigned link or the DB URL. Print `::add-mask::<link>` before using it; never `set -x`.
- Use Python's `zipfile`; do not require `unzip`.
- Feed ends **2026-12-31**; guard/alert at T-30 days, but do not rely on the sync workflow alone for alerting.
- Do not import 392k `stop_times` rows; the compact snapshot is typically ~660 departure rows.

## Review Focus

- **Presigned URL equality:** a new signature every run must never be treated as content change; hash normalized CSV content only.
- **Partial snapshot:** a failed import must leave the previous live tables and `gtfs_prev` intact; all swaps happen in one transaction.
- **Rollback:** `gtfs_prev` must be populated before the live truncate, and the five CSVs must be downloadable as an artifact.
- **CSV quoting:** headsigns and stop names may contain commas; use `\copy ... WITH (FORMAT csv, HEADER true)`.
- **After-midnight times:** `25:10:00` belongs to the previous service day; preserve seconds as-is and resolve the service date, not the wall-clock date.
- **Public holidays:** the current feed leaves `2026-12-25` on weekday service (`SERVICE_WD` + `SERVICE_WD_CCL`), not `SERVICE_PH`. Do not assume `SERVICE_PH`; the app needs a PH list or LTA must publish an exception.
- **Expiry:** `2027-01-04` has no active service in the current feed. The action warns at T-30 but keeps checking daily; the app shows “Schedule not available for this date” instead of an empty or stale timetable.
- **Secrets:** no URL echo, no `psql` connection string in errors, no artifact containing secrets.
- **Role limits:** `gtfs_importer` must not be able to read or write unrelated app tables.
- **Alerting dead-man's switch:** if the GH cron stops, the job cannot report it; a heartbeat to an external monitor must catch it.

## Service-Day and Expiry Facts (checked 2026-11-21 02:37 SGT)

- Current feed: `feed_end_date = 20261231`; **no 2027 feed published**.
- 5,954 stop calls have `departure_time >= 24:00:00`; example `PGLRT_EI_PH_240`, `24:00:30`, `SERVICE_PH`, Punggol.
- `2026-11-13` (Friday) exception: `SERVICE_WD_CCL` removed, `SERVICE_WD_CCL_SPECIAL` active.
- `2026-11-21` (Saturday): `SERVICE_WE` + `SERVICE_WE_CCL`.
- `2026-12-25` (Friday): resolves to `SERVICE_WD` + `SERVICE_WD_CCL`; `SERVICE_PH` is **not** active. Known feed gap.
- `2027-01-04`: no active services.

## File Structure

- Create: `.github/workflows/sync-train-gtfs.yml`
- Create: `busai/scripts/gtfs/sync.py`
- Create: `busai/scripts/gtfs/import.sql`
- Create: `busai/scripts/gtfs/restore.sql`
- Create: `busai/scripts/gtfs/test_sync.py`
- Create: `busai/scripts/gtfs/fixtures/mini_gtfs/*.txt`
- Create: `busai/scripts/gtfs/fixtures/mini_gtfs_crlf/*.txt` (same content, CRLF)
- Create: `busai/supabase/migrations/20261121000000_train_gtfs_snapshot.sql`
- Create: `busai/supabase/migrations/20261121000100_gtfs_importer_role.sql`
- Create: `busai/supabase/migrations/20261121000200_train_station_timings_rpc.sql`
- Create: `busai/scripts/gtfs/README.md`

### Compact data model

`public.train_gtfs_meta` — one row, `id = 1`:

```sql
id smallint primary key default 1 check (id = 1),
content_hash text not null default '',
prev_content_hash text,
feed_timestamp timestamptz,
feed_version text,
feed_start_date date,
feed_end_date date,
zip_bytes bigint,
row_counts jsonb not null default '{}'::jsonb,
imported_at timestamptz,
prev_imported_at timestamptz,
last_checked_at timestamptz not null default now(),
last_error text
```

`public.train_gtfs_stations`:

```sql
station_id text primary key,
name text not null,
lines jsonb not null default '[]'::jsonb,
codes jsonb not null default '{}'::jsonb  -- {"NSL":"NS9","TEL":"TE2"}
```

`public.train_gtfs_line_stations`:

```sql
line text primary key,          -- NSL, EWL, NEL, CCL, DTL, TEL, BPL, SKL, PGL
station_ids jsonb not null      -- ordered array of station_id
```

`public.train_gtfs_services`:

```sql
service_id text primary key,
monday smallint not null, tuesday smallint not null, wednesday smallint not null,
thursday smallint not null, friday smallint not null, saturday smallint not null,
sunday smallint not null,
start_date text not null,       -- YYYYMMDD
end_date text not null
```

`public.train_gtfs_service_exceptions`:

```sql
service_id text not null,
date text not null,             -- YYYYMMDD
exception_type smallint not null,
primary key (service_id, date)
```

`public.train_gtfs_departures`:

```sql
station_id text not null references public.train_gtfs_stations(station_id),
service_id text not null references public.train_gtfs_services(service_id),
departures jsonb not null,      -- [{t,line,headsign,platform,direction,tripId}, ...]
primary key (station_id, service_id)
```

`gtfs_staging` — same five tables, all columns `text`, not exposed.
`gtfs_prev` — same five tables as the live schema, no FKs, no RLS, not exposed.
`train_gtfs_*_prev` is not used; the `gtfs_prev` schema keeps the names simple.

---

### Task 1: Schema, previous-snapshot tables, and importer role

**Files:**
- Create: `busai/supabase/migrations/20261121000000_train_gtfs_snapshot.sql`
- Create: `busai/supabase/migrations/20261121000100_gtfs_importer_role.sql`
- Test: psql queries below

**Interfaces:**
- Produces: public compact tables, `gtfs_staging`, `gtfs_prev`, and a `gtfs_importer` role.
- Produces: one `train_gtfs_meta` row with `id = 1`, `content_hash = ''`.

- [ ] **Step 1: Write the failing check**

```bash
psql "$LOCAL_DB_URL" -v ON_ERROR_STOP=1 -c \
  "select to_regclass('public.train_gtfs_meta'), to_regclass('gtfs_staging.departures'), to_regclass('gtfs_prev.departures');"
```

Expected before the migration: three `NULL` values.

- [ ] **Step 2: Write the schema migration**

Create the schema, the five typed tables, the five staging tables, the five previous tables, indexes, RLS, and the seed row. Enforce:

```sql
alter table public.train_gtfs_meta enable row level security;
alter table public.train_gtfs_stations enable row level security;
alter table public.train_gtfs_line_stations enable row level security;
alter table public.train_gtfs_services enable row level security;
alter table public.train_gtfs_service_exceptions enable row level security;
alter table public.train_gtfs_departures enable row level security;

create policy "train_gtfs_meta_select_all" on public.train_gtfs_meta
  for select using (true);
-- repeat with a distinct policy name for each public table
grant select on public.train_gtfs_meta, public.train_gtfs_stations,
  public.train_gtfs_line_stations, public.train_gtfs_services,
  public.train_gtfs_service_exceptions, public.train_gtfs_departures
  to anon, authenticated;

insert into public.train_gtfs_meta (id) values (1) on conflict (id) do nothing;
```

- [ ] **Step 3: Write the importer role migration**

Create the role without a password; set the password out-of-band (Dashboard → Database → Roles or `alter role ... password`). The migration grants only what the pipeline needs:

```sql
-- Make this idempotent: create only if the role does not already exist.
create role gtfs_importer login noinherit;
grant usage on schema public, gtfs_staging, gtfs_prev to gtfs_importer;
grant select, insert, update, delete on
  public.train_gtfs_meta, public.train_gtfs_stations,
  public.train_gtfs_line_stations, public.train_gtfs_services,
  public.train_gtfs_service_exceptions, public.train_gtfs_departures
  to gtfs_importer;
grant select, insert, update, delete on all tables in schema gtfs_staging to gtfs_importer;
grant select, insert, update, delete on all tables in schema gtfs_prev to gtfs_importer;

-- RLS policies for the importer; do not use BYPASSRLS.
create policy "train_gtfs_meta_importer_all" on public.train_gtfs_meta
  for all to gtfs_importer using (true) with check (true);
-- repeat with a distinct policy name for each of the six public tables.
```

The `SUPABASE_DB_URL` secret must use `gtfs_importer`, not `postgres`. Set the role password out-of-band; never commit it.

- [ ] **Step 4: Apply to a local Supabase database**

Run: `cd busai && supabase db reset`
Expected: both migrations apply without error.

- [ ] **Step 5: Verify schema, seed, and role grants**

```bash
psql "$LOCAL_DB_URL" -Atc \
  "select id, content_hash from public.train_gtfs_meta;"
psql "$LOCAL_DB_URL" -Atc \
  "select has_table_privilege('gtfs_importer','public.train_gtfs_departures','SELECT'),
          has_table_privilege('gtfs_importer','public.train_gtfs_departures','INSERT');"
```

Expected: `1|` and `t|t`.

- [ ] **Step 6: Commit**

```bash
git add busai/supabase/migrations/20261121000000_train_gtfs_snapshot.sql \
  busai/supabase/migrations/20261121000100_gtfs_importer_role.sql
git commit -m "feat: add compact train GTFS schema and importer role"
```

---

### Task 2: Fetch, download, and normalized content hash

**Files:**
- Create: `busai/scripts/gtfs/sync.py`
- Create: `busai/scripts/gtfs/test_sync.py`
- Create: `busai/scripts/gtfs/fixtures/mini_gtfs/*.txt`
- Create: `busai/scripts/gtfs/fixtures/mini_gtfs_crlf/*.txt`

**Test dependency:** `python -m pip install pytest` once in the dev environment. The GitHub workflow uses only the standard library.

**Interfaces:**
- Produces: `fetch_feed_metadata(api_key: str) -> dict` returning `timestamp` and `link`.
- Produces: `download_zip(link: str, dest: Path) -> int` returning bytes written.
- Produces: `extract_zip(zip_path: Path, dest: Path) -> None`.
- Produces: `canonical_hash(gtfs_dir: Path) -> str` returning 64 hex chars.
- Consumes: `LTA_DATAMALL_KEY` from the environment.
- Prints: `::add-mask::<link>` before using the link.

- [ ] **Step 1: Write the failing tests**

```python
from pathlib import Path
from sync import canonical_hash

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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd busai/scripts/gtfs && python -m pytest -q`
Expected: FAIL with `ImportError` for `canonical_hash`.

- [ ] **Step 3: Implement fetch and hash**

`fetch_feed_metadata` calls:

```text
https://datamall2.mytransport.sg/ltaodataservice/GTFSScheduleTrain
Header: AccountKey: <LTA_DATAMALL_KEY>
```

and returns `value[0]`. Before printing or returning the link, print `::add-mask::{link}` so GitHub masks it in later logs. `download_zip` uses `urllib.request` with a 30 s timeout and writes the response body. `extract_zip` uses `zipfile.ZipFile`.

`canonical_hash` must:

1. Require exactly these files: `agency.txt`, `calendar.txt`, `calendar_dates.txt`, `feed_info.txt`, `routes.txt`, `stop_times.txt`, `stops.txt`, `trips.txt`.
2. Read each file as bytes and replace `b"\r\n"` and `b"\r"` with `b"\n"`.
3. SHA-256 each normalized byte sequence.
4. Build `f"{name}\n{file_sha256}\n"` in sorted filename order.
5. Return `sha256(concat).hexdigest()`.

Never hash the ZIP and never compare presigned URLs.

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd busai/scripts/gtfs && python -m pytest -q`
Expected: `3 passed`.

- [ ] **Step 5: Commit**

```bash
git add busai/scripts/gtfs/sync.py busai/scripts/gtfs/test_sync.py \
  busai/scripts/gtfs/fixtures
git commit -m "feat: fetch and normalized-hash LTA GTFS feed"
```

---

### Task 3: Build the compact snapshot and eyeball real data

**Files:**
- Modify: `busai/scripts/gtfs/sync.py`
- Modify: `busai/scripts/gtfs/test_sync.py`

**Interfaces:**
- Produces: `build_snapshot(gtfs_dir: Path) -> dict` with keys `stations`, `line_stations`, `services`, `service_exceptions`, `departures`.
- `departures` is `dict[(station_id, service_id), list[dict]]`; each dict has `t` (int seconds), `line`, `headsign`, `platform`, `direction`, `tripId`.
- Produces: `write_snapshot_csvs(snapshot: dict, out_dir: Path) -> dict[str, Path]`; files `stations.csv`, `line_stations.csv`, `services.csv`, `service_exceptions.csv`, `departures.csv`.

- [ ] **Step 1: Write the failing tests**

```python
def test_snapshot_has_expected_fixture_counts():
    snap = build_snapshot(FIXTURE)
    assert len(snap["stations"]) == 2
    assert len(snap["services"]) == 1
    assert len(snap["line_stations"]) == 1
    assert ("S1", "SERVICE_WD") in snap["departures"]

def test_after_midnight_time_is_preserved():
    snap = build_snapshot(FIXTURE)
    times = [d["t"] for d in snap["departures"][("S1", "SERVICE_WD")]]
    assert 25 * 3600 + 10 * 60 in times
```

Add `25:10:00` to the fixture's `stop_times.txt` with a valid trip/stop.

- [ ] **Step 2: Run tests to verify they fail**

Run: `python -m pytest -q`
Expected: FAIL because `build_snapshot` is not defined.

- [ ] **Step 3: Implement `build_snapshot`**

Read the CSVs with `csv.DictReader`. Resolve each stop's parent station; derive line codes from `routes.txt` `route_short_name` (`NS→NSL`, `EW→EWL`, `NE→NEL`, `CC→CCL`, `DT→DTL`, `TE→TEL`, `BP→BPL`, `SK→SKL`, `PG→PGL`, `CG→EWL`). Build:

- `stations`: one row per parent station with `station_id`, `name`, sorted `lines` array, and `codes` map of line → per-line station code (derive the code from the platform stop ID prefix, e.g. `NS9_A → NS9`, `TE2_A → TE2`; fall back to the station ID).
- `line_stations`: one row per line with station IDs in a representative trip order; append any missing served station IDs sorted numerically.
- `services`: one row per `calendar.txt` row.
- `service_exceptions`: one row per `calendar_dates.txt` row.
- `departures`: group every `stop_times` row by `(station_id, service_id)`; store line, headsign, platform, direction, tripId, and `t = h*3600 + m*60 + s`, including values `>= 24*3600`.

Do not hard-code station or departure counts anywhere in validation.

- [ ] **Step 4: Implement `write_snapshot_csvs`**

Write CSV headers exactly:

```text
stations.csv: station_id,name,lines,codes
line_stations.csv: line,station_ids
services.csv: service_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday,start_date,end_date
service_exceptions.csv: service_id,date,exception_type
departures.csv: station_id,service_id,departures
```

`lines`, `codes`, `station_ids`, and `departures` are JSON strings generated with `json.dumps(..., separators=(",", ":"))`.

- [ ] **Step 5: Run the real-feed gate before writing the import**

```bash
python - <<'PY'
from pathlib import Path
from sync import build_snapshot
s = build_snapshot(Path('/tmp/gtfs_now'))
print('stations', len(s['stations']))
print('line_stations', len(s['line_stations']))
print('services', len(s['services']))
print('station/service pairs', len(s['departures']))
for key in list(s['departures'])[:5]:
    print(key, s['departures'][key][:3])
PY
```

Eyeball:

- station count is plausible (currently ~186; do not assert it)
- `line_stations` has 9 lines
- a sample departure has line, destination, platform, and numeric `t`
- a `>= 24:00:00` departure appears with `t >= 86400`
- `2026-11-13` resolves to `SERVICE_WD_CCL_SPECIAL`, not `SERVICE_WD_CCL`
- `2026-12-25` resolves to weekday services, not `SERVICE_PH` (accepted gap)
- Woodlands codes are `{"NSL":"NS9","TEL":"TE2"}`; an interchange code is not lost

**Do not start Task 4 until this output has been inspected.** This is the cheapest point to catch a schema/assumption error.

- [ ] **Step 6: Commit**

```bash
git add busai/scripts/gtfs/sync.py busai/scripts/gtfs/test_sync.py
git commit -m "feat: build compact station timetable snapshot"
```

---

### Task 4: Import with dynamic validation, previous snapshot, and rollback

**Files:**
- Create: `busai/scripts/gtfs/import.sql`
- Create: `busai/scripts/gtfs/restore.sql`
- Modify: `busai/scripts/gtfs/sync.py`

**Interfaces:**
- Consumes: `write_snapshot_csvs` output, `content_hash`, metadata.
- `import.sql` uses psql variables `:content_hash`, `:feed_timestamp`, `:feed_version`, `:feed_start_date`, `:feed_end_date`, `:zip_bytes`, and one path variable per CSV: `:stations_csv`, `:line_stations_csv`, `:services_csv`, `:service_exceptions_csv`, `:departures_csv`.
- Produces: `import_snapshot(psql_url: str, csv_paths: dict, meta: dict) -> None`.

- [ ] **Step 1: Write the failing integration test**

Against a local database with Task 1 applied and zero rows:

```bash
psql "$LOCAL_DB_URL" -Atc "select count(*) from public.train_gtfs_departures;"
```

Expected: `0`.

- [ ] **Step 2: Write `import.sql`**

> **Implementation note:** psql `\copy` does **not** interpolate `:'path'`
> variables. The checked-in `import.sql` uses `__STATIONS_CSV__`-style path
> placeholders; `sync.py` renders them into a temporary SQL file. Scalar
> metadata (`content_hash`, feed dates, `zip_bytes`) still uses `psql -v`.

```sql
\set ON_ERROR_STOP on
begin;

truncate gtfs_staging.stations, gtfs_staging.line_stations,
         gtfs_staging.services, gtfs_staging.service_exceptions,
         gtfs_staging.departures;

\copy gtfs_staging.stations from :'stations_csv' with (format csv, header true)
\copy gtfs_staging.line_stations from :'line_stations_csv' with (format csv, header true)
\copy gtfs_staging.services from :'services_csv' with (format csv, header true)
\copy gtfs_staging.service_exceptions from :'service_exceptions_csv' with (format csv, header true)
\copy gtfs_staging.departures from :'departures_csv' with (format csv, header true)

do $$
declare
  old_stations int;
  old_departures int;
  new_stations int;
  new_departures int;
begin
  select coalesce((row_counts->>'stations')::int, 0),
         coalesce((row_counts->>'departures')::int, 0)
    into old_stations, old_departures
  from public.train_gtfs_meta where id = 1;

  select count(*) into new_stations from gtfs_staging.stations;
  select count(*) into new_departures from gtfs_staging.departures;

  if new_stations < 100 then
    raise exception 'station floor failed: % < 100', new_stations;
  end if;
  if new_departures < 500 then
    raise exception 'departure floor failed: % < 500', new_departures;
  end if;
  if old_stations > 0 and new_stations < old_stations then
    raise exception 'station count dropped: % -> %', old_stations, new_stations;
  end if;
  if old_departures > 0 and new_departures < old_departures * 0.9 then
    raise exception 'departure count dropped >10%%: % -> %', old_departures, new_departures;
  end if;
end $$;

-- Preserve the current snapshot before destroying it.
truncate gtfs_prev.stations, gtfs_prev.line_stations, gtfs_prev.services,
         gtfs_prev.service_exceptions, gtfs_prev.departures;
insert into gtfs_prev.stations select * from public.train_gtfs_stations;
insert into gtfs_prev.line_stations select * from public.train_gtfs_line_stations;
insert into gtfs_prev.services select * from public.train_gtfs_services;
insert into gtfs_prev.service_exceptions select * from public.train_gtfs_service_exceptions;
insert into gtfs_prev.departures select * from public.train_gtfs_departures;

update public.train_gtfs_meta
set prev_content_hash = content_hash,
    prev_imported_at = imported_at
where id = 1;

truncate public.train_gtfs_departures, public.train_gtfs_service_exceptions,
         public.train_gtfs_services, public.train_gtfs_line_stations,
         public.train_gtfs_stations;

insert into public.train_gtfs_stations
  (station_id, name, lines, codes)
select station_id, name, lines::jsonb, codes::jsonb
from gtfs_staging.stations;

insert into public.train_gtfs_line_stations (line, station_ids)
select line, station_ids::jsonb from gtfs_staging.line_stations;

insert into public.train_gtfs_services
  (service_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday, start_date, end_date)
select service_id, monday::smallint, tuesday::smallint, wednesday::smallint,
       thursday::smallint, friday::smallint, saturday::smallint, sunday::smallint,
       start_date, end_date
from gtfs_staging.services;

insert into public.train_gtfs_service_exceptions (service_id, date, exception_type)
select service_id, date, exception_type::smallint
from gtfs_staging.service_exceptions;

insert into public.train_gtfs_departures (station_id, service_id, departures)
select station_id, service_id, departures::jsonb
from gtfs_staging.departures;

update public.train_gtfs_meta
set content_hash = :'content_hash',
    feed_timestamp = :'feed_timestamp'::timestamptz,
    feed_version = :'feed_version',
    feed_start_date = to_date(:'feed_start_date', 'YYYYMMDD'),
    feed_end_date = to_date(:'feed_end_date', 'YYYYMMDD'),
    zip_bytes = :'zip_bytes'::bigint,
    row_counts = jsonb_build_object(
      'stations', (select count(*) from public.train_gtfs_stations),
      'departures', (select count(*) from public.train_gtfs_departures)
    ),
    imported_at = now(),
    last_checked_at = now(),
    last_error = null
where id = 1;

analyze public.train_gtfs_stations;
analyze public.train_gtfs_departures;

commit;
```

- [ ] **Step 3: Write `restore.sql`**

Restore from `gtfs_prev` in one transaction:

```sql
\set ON_ERROR_STOP on
begin;
truncate public.train_gtfs_departures, public.train_gtfs_service_exceptions,
         public.train_gtfs_services, public.train_gtfs_line_stations,
         public.train_gtfs_stations;
insert into public.train_gtfs_stations select * from gtfs_prev.stations;
insert into public.train_gtfs_line_stations select * from gtfs_prev.line_stations;
insert into public.train_gtfs_services select * from gtfs_prev.services;
insert into public.train_gtfs_service_exceptions select * from gtfs_prev.service_exceptions;
insert into public.train_gtfs_departures select * from gtfs_prev.departures;
update public.train_gtfs_meta
set content_hash = prev_content_hash,
    imported_at = prev_imported_at,
    last_error = 'restored from previous snapshot'
where id = 1;
commit;
```

- [ ] **Step 4: Implement `import_snapshot`**

Use `subprocess.run` with `psql` and `-v` for every value/path. Do not print `psql_url`. Capture stderr; print only a sanitized error line.

- [ ] **Step 5: Run the integration test**

First import: succeeds; `select count(*)` returns >0 and `content_hash <> ''`.
Second identical import: passes; counts unchanged.
Simulated drop: remove 20% of departures from a copy; run import; expected failure and live counts unchanged.
Simulated station drop: remove one station; expected failure.
Restore: after a successful import, modify live data, run `restore.sql`, verify live matches `gtfs_prev`.

Do not assert exact `186` or `660`; print the counts and compare them to the previous import.

- [ ] **Step 6: Commit**

```bash
git add busai/scripts/gtfs/import.sql busai/scripts/gtfs/restore.sql \
  busai/scripts/gtfs/sync.py
git commit -m "feat: atomically import compact GTFS snapshot with rollback"
```

---

### Task 5: Workflow with artifact backup and heartbeat

**Files:**
- Create: `.github/workflows/sync-train-gtfs.yml`

**Interfaces:**
- Consumes: `busai/scripts/gtfs/sync.py`.
- Secrets: `LTA_DATAMALL_KEY`, `SUPABASE_DB_URL` (importer role), `HEALTHCHECK_PING_URL`.

- [ ] **Step 1: Write the workflow**

```yaml
name: Sync train GTFS schedule

on:
  # Dry-run before merge: proves the feed download, hash, and compact build.
  pull_request:
    branches: [main]
    paths:
      - 'busai/scripts/gtfs/**'
      - 'busai/supabase/migrations/**'
      - '.github/workflows/sync-train-gtfs.yml'
  # Real import after a pipeline change lands on main.
  push:
    branches: [main]
    paths:
      - 'busai/scripts/gtfs/**'
      - 'busai/supabase/migrations/**'
      - '.github/workflows/sync-train-gtfs.yml'
  schedule:
    - cron: '0 20 * * *'   # 04:00 SGT
  workflow_dispatch:
    inputs:
      dry_run:
        description: Download, hash, and build without importing
        type: boolean
        default: false

concurrency:
  group: sync-train-gtfs
  cancel-in-progress: false

permissions:
  contents: read

jobs:
  sync:
    # Fork PRs do not receive repository secrets; skip them safely.
    if: github.event_name != 'pull_request' || github.event.pull_request.head.repo.full_name == github.repository
    runs-on: ubuntu-latest
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - name: Verify psql
        run: psql --version
      - name: Sync
        env:
          LTA_DATAMALL_KEY: ${{ secrets.LTA_DATAMALL_KEY }}
          SUPABASE_DB_URL: ${{ secrets.SUPABASE_DB_URL }}
          DRY_RUN: ${{ github.event_name == 'pull_request' && '1' || (github.event.inputs.dry_run == 'true' && '1' || '0') }}
        run: python busai/scripts/gtfs/sync.py
      - name: Upload compact CSVs
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: train-gtfs-snapshot-${{ github.run_id }}
          path: ${{ runner.temp }}/gtfs-snapshot/*.csv
          retention-days: 7
          if-no-files-found: warn
      - name: Heartbeat
        if: success() && github.event_name != 'pull_request'
        env:
          HEALTHCHECK_PING_URL: ${{ secrets.HEALTHCHECK_PING_URL }}
        run: |
          if [ -n "$HEALTHCHECK_PING_URL" ]; then
            curl -fsS --max-time 10 "$HEALTHCHECK_PING_URL"
          fi
```

Trigger summary:

| Event | Mode | Database writes |
|---|---|---|
| PR to `main` touching pipeline files | Dry run | Never |
| Push/merge to `main` touching pipeline files | Real import | Yes, only if the hash changed |
| Daily schedule on `main` | Real import | Yes, only if the hash changed |
| Manual dispatch | Choose dry run or real | Only when `dry_run` is false |

The `paths` filters keep app-only merges from running the GTFS sync. Remove them if you want it on every merge to `main`.

- [ ] **Step 2: Update `sync.py` outputs**

Write the five CSVs to `Path(os.environ.get("RUNNER_TEMP", tempfile.gettempdir())) / "gtfs-snapshot"`. The workflow artifact step expects that path.

- [ ] **Step 3: Test with a pull request**

Push the branch and open a PR to `main` that touches the pipeline paths. Expected: the **pull request** run starts automatically in dry-run mode. Logs show the hash, station count, and departure count; no database writes occur. Download the artifact and inspect the five CSVs.

This is the pre-merge gate: the PR check proves the feed download and compact build are healthy without touching production.

- [ ] **Step 4: Merge and verify the first real import**

Merge the PR. Expected: the **push to main** run starts automatically and imports for real. Live counts are plausible, `content_hash` changes from empty, `imported_at` and `last_checked_at` are current, and `gtfs_prev` contains the previous (empty on first run) snapshot.

- [ ] **Step 5: Run it a second time**

Use **Run workflow** with `dry_run = false` (or wait for the daily schedule). Expected: logs say `unchanged`; no staging/import work; `last_checked_at` advances; `content_hash`, `imported_at`, and `gtfs_prev` stay the same.

- [ ] **Step 6: Commit**

```bash
git add .github/workflows/sync-train-gtfs.yml busai/scripts/gtfs/sync.py
git commit -m "ci: schedule daily train GTFS sync with backup and heartbeat"
```

---

### Task 6: External alerting and expiry guard

**Files:**
- Modify: `busai/scripts/gtfs/sync.py`
- Modify: `busai/scripts/gtfs/README.md`

**Interfaces:**
- Consumes: `train_gtfs_meta.feed_end_date`, `last_checked_at`, `last_error`.
- Produces: a warning when the feed expires within 30 days; does **not** block the daily check or import.
- Produces: heartbeat to an external monitor on every successful run.

- [ ] **Step 1: Add the expiry warning**

After reading metadata:

```python
days_left = (feed_end_date - date.today()).days
if days_left < 30:
    print(
        f"::warning::GTFS feed ends {feed_end_date} ({days_left} days left). "
        "The action can import a new feed only when LTA publishes one."
    )
```

Do not raise/exit. The action must keep checking daily so it can import a new feed automatically when LTA publishes one. If the feed has ended, the app shows “Schedule not available for this date”; the action still checks for a replacement.

- [ ] **Step 2: Move alert ownership outside the sync workflow**

- Configure a **Healthchecks.io** (or equivalent) check with a 25-hour period and 2-hour grace.
- Store its ping URL as `HEALTHCHECK_PING_URL`; the workflow pings it only after a successful run.
- If the GH cron is delayed, disabled, or the job fails, the external monitor alerts.
- Do not rely on the stale check inside the same workflow as your only alert: **if the cron stops firing, that check never runs.**
- Optional, if Supabase Pro: enable `pg_cron` and run a daily query against `train_gtfs_meta.last_checked_at`, sending a webhook on staleness. `pg_cron` is currently not installed.

- [ ] **Step 3: Add a secondary stale check**

Keep a `psql` query in the workflow that fails if `last_checked_at < now() - interval '48 hours'` or `last_error is not null`. This is a secondary guard, not the primary alert.

- [ ] **Step 4: Note the GitHub schedule limitation**

Public repos can have scheduled workflows auto-disabled after 60 days of inactivity, and scheduled runs can be delayed. The external heartbeat catches the former; if this becomes critical, trigger `workflow_dispatch` from an external scheduler using a fine-grained GitHub token.

- [ ] **Step 5: Verify**

- Run the workflow successfully; confirm the heartbeat monitor shows a ping.
- Temporarily break the `LTA_DATAMALL_KEY`; confirm the job fails and the monitor alerts after the grace period.
- Test the expiry warning with a fixture feed ending in 20 days; expect a `::warning::` and a successful run, not a failure.

- [ ] **Step 6: Commit**

```bash
git add busai/scripts/gtfs/sync.py busai/scripts/gtfs/README.md
git commit -m "ci: add external heartbeat and expiry guard"
```

---

### Task 7: Verify service-day behavior and document PH/expiry limits

**Files:**
- Modify: `busai/scripts/gtfs/README.md`
- Optional: `busai/scripts/gtfs/check_service_day.py`

**Interfaces:**
- Consumes: the compact snapshot / staging data.
- Produces: a documented and tested rule for resolving a calendar date to active `service_id`s, including after-midnight times.

- [ ] **Step 1: Check a late-night departure**

Find a stop call with `departure_time >= 24:00:00` (for example `PGLRT_EI_PH_240`, `24:00:30`). For service date `2026-11-20`, confirm it appears as `2026-11-21 00:00:30 SGT`. It must be found via the previous service date, not the wall-clock date.

- [ ] **Step 2: Check an exception date**

For `2026-11-13`, confirm the active services are `SERVICE_WD` + `SERVICE_WD_CCL_SPECIAL`; `SERVICE_WD_CCL` is removed by `calendar_dates` type 2. Verify the app query unions all active services.

- [ ] **Step 3: Check a public holiday**

For `2026-12-25`, the current feed resolves to `SERVICE_WD` + `SERVICE_WD_CCL`, **not** `SERVICE_PH`.

**Accepted decision (2026-11-22):** leave the gap. Do not add a PH calendar in this change. Document the limitation: public-holiday dates will show the feed’s weekday/weekend service until LTA publishes a `calendar_dates` exception. Do not block the sync over it.

- [ ] **Step 4: Check 2027**

`2027-01-04` has no active service in the current feed. Confirm the app shows **Schedule not available for this date**, not an empty or stale list. The action keeps checking daily; if LTA publishes a 2027 feed, the content hash changes and the next run imports it automatically.

- [ ] **Step 5: Commit**

```bash
git add busai/scripts/gtfs/README.md
git commit -m "docs: record service-day and public-holiday handling"
```

---

### Task 8: Expose station timings through a read RPC

**Files:**
- Create: `busai/supabase/migrations/20261121000200_train_station_timings_rpc.sql`
- Test: SQL queries below

**Interfaces:**
- Produces: `public.train_station_timings(p_station_id text, p_line text, p_direction smallint default 0, p_limit int default 5, p_at timestamptz default now()) returns jsonb`.
- Returns: `{ departures: [{trip_id, line, direction, headsign, platform, scheduled_at, epoch_ms}], feed_end_date, schedule_available }`.
- The app uses this instead of resolving `services`/`exceptions` client-side.

- [ ] **Step 1: Write the failing SQL check**

Against the production/local DB after the schema and a real import:

```sql
select public.train_station_timings('NS9', 'NSL', 0, 5, '2026-11-22 06:00+08');
```

Expected before the migration: `function ... does not exist`.

- [ ] **Step 2: Implement the RPC**

Use a `language sql stable security invoker set search_path = public` function. Resolution rules:

1. Convert `p_at` to the SGT calendar date.
2. Consider service dates **today and yesterday** so `24:00+` departures from the previous service day are eligible.
3. For each service date, select services where:
   - `to_date(start_date,'YYYYMMDD') <= service_date <= to_date(end_date,'YYYYMMDD')`,
   - the weekday flag is `1`,
   - no `calendar_dates` type `2` exception on that date.
   - Add services with a type `1` exception on that date.
4. For each active service, read `train_gtfs_departures` for `p_station_id`, expand `departures` JSON, filter `line` and `direction`.
5. Compute the scheduled timestamp from the service date midnight SGT plus `t` seconds.
6. Keep departures `>= p_at - 30 seconds`, order by time, limit `p_limit`.
7. Return `feed_end_date` from `train_gtfs_meta` and `schedule_available = (p_at SGT date <= feed_end_date)`.

- [ ] **Step 3: Add public execute grant**

```sql
grant execute on function public.train_station_timings(text, text, smallint, int, timestamptz)
  to anon, authenticated;
```

The function is read-only; writes remain limited to `gtfs_importer`.

- [ ] **Step 4: Verify**

- `('NS9','NSL',0,5,'2026-11-22 06:00+08')` returns 5 departures, first destinations toward Jurong East.
- `('NS9','TEL',1,5,...)` returns TEL departures toward Woodlands North.
- A query at `2026-11-22 01:00+08` includes after-midnight departures from the 21 Nov service day.
- A query after `feed_end_date` returns `schedule_available: false`.

- [ ] **Step 5: Commit**

```bash
git add busai/supabase/migrations/20261121000200_train_station_timings_rpc.sql
git commit -m "feat: add train station timings RPC"
```

---

### Task 9: Runbook

**Files:**
- Create: `busai/scripts/gtfs/README.md`

- [ ] **Step 1: Write the runbook**

Cover:

```text
1. Create the gtfs_importer role and set its password in the dashboard.
2. Add GitHub secrets:
   LTA_DATAMALL_KEY
   SUPABASE_DB_URL  = session pooler, port 5432, sslmode=require, gtfs_importer
   HEALTHCHECK_PING_URL
3. Local dry run:
   export LTA_DATAMALL_KEY=...
   export SUPABASE_DB_URL=...
   export DRY_RUN=1
   python busai/scripts/gtfs/sync.py
4. Inspect state:
   select * from public.train_gtfs_meta;
5. Roll back:
   psql "$SUPABASE_DB_URL" -f busai/scripts/gtfs/restore.sql
6. Download the 7-day Actions artifact if the prev tables are insufficient.
7. Rotate the importer password; update the GitHub secret.
8. Force a reimport:
   update public.train_gtfs_meta set content_hash = '';
   then run the workflow.
```

- [ ] **Step 2: Verify the runbook on a clean checkout**

Run the dry-run commands exactly as written. Expected: no database writes and a printed hash/count summary.

- [ ] **Step 3: Commit**

```bash
git add busai/scripts/gtfs/README.md
git commit -m "docs: add train GTFS sync runbook"
```

---

## Execution Notes

- **Native execution**, in task order. Tasks 2–4 share `sync.py`; a fresh subagent would need the same interfaces re-explained.
- **Gate after Task 3:** run the fetch and snapshot builder against the real feed, inspect five sample departures and the late-night/exception dates, then start Task 4.
- Run the workflow on a branch first with `dry_run = true`; scheduled runs use the default branch.
- Do not add `set -x`; do not echo `SUPABASE_DB_URL` or the presigned link.
- Confirm the linked Supabase project ref before the first real import.
- Task 8 provides the read RPC. The Expo implementation plan uses `train_station_timings`; direct table reads provide station/line metadata for search and chips. The app does not resolve service calendars itself.

## Non-Goals

- Full GTFS route planning or `stop_times` tables in Postgres.
- Real-time alerts/trip updates in this workflow; those stay in the existing Edge Function/cache path.
- Changing the Expo UI.
- Historical GTFS versions; only the current and previous snapshots are retained.
