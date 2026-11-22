-- Dedicated least-privilege role used by the GitHub GTFS sync.
-- Set the password out-of-band in the Supabase Dashboard or with:
--   alter role gtfs_importer password '<secret>';
do $$
begin
  if not exists (select 1 from pg_roles where rolname = 'gtfs_importer') then
    create role gtfs_importer login noinherit;
  end if;
end
$$;

grant usage on schema public, gtfs_staging, gtfs_prev to gtfs_importer;

grant select, insert, update, delete, truncate on
  public.train_gtfs_meta,
  public.train_gtfs_stations,
  public.train_gtfs_line_stations,
  public.train_gtfs_services,
  public.train_gtfs_service_exceptions,
  public.train_gtfs_departures
  to gtfs_importer;

grant select, insert, update, delete, truncate on all tables in schema gtfs_staging to gtfs_importer;
grant select, insert, update, delete, truncate on all tables in schema gtfs_prev to gtfs_importer;

drop policy if exists "train_gtfs_meta_importer_all" on public.train_gtfs_meta;
create policy "train_gtfs_meta_importer_all" on public.train_gtfs_meta
  for all to gtfs_importer using (true) with check (true);

drop policy if exists "train_gtfs_stations_importer_all" on public.train_gtfs_stations;
create policy "train_gtfs_stations_importer_all" on public.train_gtfs_stations
  for all to gtfs_importer using (true) with check (true);

drop policy if exists "train_gtfs_line_stations_importer_all" on public.train_gtfs_line_stations;
create policy "train_gtfs_line_stations_importer_all" on public.train_gtfs_line_stations
  for all to gtfs_importer using (true) with check (true);

drop policy if exists "train_gtfs_services_importer_all" on public.train_gtfs_services;
create policy "train_gtfs_services_importer_all" on public.train_gtfs_services
  for all to gtfs_importer using (true) with check (true);

drop policy if exists "train_gtfs_service_exceptions_importer_all" on public.train_gtfs_service_exceptions;
create policy "train_gtfs_service_exceptions_importer_all" on public.train_gtfs_service_exceptions
  for all to gtfs_importer using (true) with check (true);

drop policy if exists "train_gtfs_departures_importer_all" on public.train_gtfs_departures;
create policy "train_gtfs_departures_importer_all" on public.train_gtfs_departures
  for all to gtfs_importer using (true) with check (true);
