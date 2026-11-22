# Train GTFS sync

Downloads LTA's `GTFSScheduleTrain` ZIP, builds a compact station/service
snapshot, and imports it into Supabase. The app never downloads GTFS and
never holds the LTA key.

## What is stored

- `public.train_gtfs_stations` — 186 stations with per-line codes.
- `public.train_gtfs_line_stations` — 9 lines with ordered station IDs.
- `public.train_gtfs_services` + `service_exceptions` — service calendar.
- `public.train_gtfs_departures` — one row per station/service pair, with a
  JSON array of compact departures (`t`, line, headsign, platform, direction,
  tripId).
- `gtfs_staging` — text-only load area.
- `gtfs_prev` — previous successful snapshot for rollback.
- `public.train_gtfs_meta` — content hash, feed dates, counts, last check,
  last error.

The app reads `public.train_station_timings(...)`; it does not resolve
services or exceptions client-side.

## GitHub secrets

Repository → Settings → Secrets and variables → Actions:

```text
LTA_DATAMALL_KEY       Same value as EXPO_PUBLIC_LTA_DATAMALL_KEY
SUPABASE_DB_URL        Session pooler URL for gtfs_importer
HEALTHCHECK_PING_URL   Optional Healthchecks.io ping URL
```

`SUPABASE_DB_URL`:

```text
postgresql://gtfs_importer.<project-ref>:<importer-password>@aws-1-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require
```

- Use the **session pooler**, port **5432**.
- Do not use `postgres` or the transaction pooler on port `6543`.
- Percent-encode reserved characters in the password.

## First deployment

1. Apply the three migrations in `busai/supabase/migrations/`:

   ```bash
   cd busai
   supabase db push
   ```

   or run each file with `psql "$SUPABASE_DB_URL" -f ...` as an admin.

2. Set the importer password in Supabase Dashboard → Database → Roles:

   ```sql
   alter role gtfs_importer password '<secret>';
   ```

   Use that password in `SUPABASE_DB_URL`.

3. Add the GitHub secrets above.

4. Local dry run:

   ```bash
   cd busai/scripts/gtfs
   export LTA_DATAMALL_KEY="..."
   export DRY_RUN=1
   python3 sync.py
   ```

   On macOS, if Python reports an SSL certificate error:

   ```bash
   export SSL_CERT_FILE="$(python3 -c 'import certifi; print(certifi.where())')"
   ```

   A dry run downloads the feed, computes the hash, builds the five CSVs in
   `$RUNNER_TEMP/gtfs-snapshot` (or the system temp directory), and performs
   **no database writes**.

5. Push a branch and open a PR to `main` that touches one of the workflow
   paths. The PR run is **dry-run only** and uploads the CSVs as an artifact.
   This is the pre-merge gate.

6. Merge to `main`. The push run performs the real import. The daily
   schedule runs at **04:00 SGT**.

## Manual run

Actions → **Sync train GTFS schedule** → **Run workflow**:

- `dry_run = true` — download/build only.
- `dry_run = false` — import if the content hash changed.

`workflow_dispatch` requires the workflow to exist on the default branch.
The PR check is the branch-friendly path.

## Verify

```sql
select id, content_hash, prev_content_hash, feed_start_date, feed_end_date,
       row_counts, imported_at, last_checked_at, last_error
from public.train_gtfs_meta;

select count(*) from public.train_gtfs_stations;       -- ~186
select count(*) from public.train_gtfs_line_stations;  -- 9
select count(*) from public.train_gtfs_departures;     -- compact pairs

select public.train_station_timings(
  'NS9', 'NSL', 0, 5, '2026-11-22 06:00+08'
);
```

The RPC returns the next departures and `schedule_available: false` after
`feed_end_date`.

## Rollback

```bash
psql "$SUPABASE_DB_URL" -f busai/scripts/gtfs/restore.sql
```

This restores the five live tables from `gtfs_prev` in one transaction.
The 7-day Actions artifact contains the compact CSVs as a second backup.

## Force a reimport

```sql
update public.train_gtfs_meta set content_hash = '' where id = 1;
```

Then run the workflow with `dry_run = false`.

## App data source

The app uses the bundled fixture in development by default. To test the
deployed Supabase source locally, set:

```bash
EXPO_PUBLIC_TRAIN_FIXTURE=0
```

Production builds use Supabase when `EXPO_PUBLIC_SUPABASE_URL` and
`EXPO_PUBLIC_SUPABASE_ANON_KEY` are configured; they never silently use the
fixture.

## Notes

- Change detection is a SHA-256 over all eight normalized GTFS CSVs; the
  presigned URL and `feed_version` are not change signals.
- Import is atomic. Validation fails if stations drop, departures drop by
  more than 10%, or the absolute floors are not met.
- `import.sql` uses literal path placeholders rendered by `sync.py` because
  psql `\copy` does not interpolate `:'variable'` values.
- Public holidays currently use the feed's weekday/weekend service. The feed
  has no 25 Dec 2026 holiday exception; this is an accepted limitation.
- The feed ends **2026-12-31**. The action warns at T-30 days and keeps
  checking daily; it cannot create a 2027 feed.
- Scheduled workflows run only from the default branch and can be delayed.
  The optional Healthchecks.io ping is the external alert for missed runs.
