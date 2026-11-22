-- Compact train timetable snapshot, staging schema, and previous-snapshot schema.
-- The GitHub Action writes only to these tables through the gtfs_importer role.

create schema if not exists gtfs_staging;
create schema if not exists gtfs_prev;

create table if not exists public.train_gtfs_meta (
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
);

create table if not exists public.train_gtfs_stations (
  station_id text primary key,
  name text not null,
  lines jsonb not null default '[]'::jsonb,
  codes jsonb not null default '{}'::jsonb
);

create table if not exists public.train_gtfs_line_stations (
  line text primary key,
  station_ids jsonb not null
);

create table if not exists public.train_gtfs_services (
  service_id text primary key,
  monday smallint not null,
  tuesday smallint not null,
  wednesday smallint not null,
  thursday smallint not null,
  friday smallint not null,
  saturday smallint not null,
  sunday smallint not null,
  start_date text not null,
  end_date text not null
);

create table if not exists public.train_gtfs_service_exceptions (
  service_id text not null,
  date text not null,
  exception_type smallint not null,
  primary key (service_id, date)
);

create table if not exists public.train_gtfs_departures (
  station_id text not null references public.train_gtfs_stations(station_id),
  service_id text not null references public.train_gtfs_services(service_id),
  departures jsonb not null,
  primary key (station_id, service_id)
);

create index if not exists train_gtfs_departures_service_idx
  on public.train_gtfs_departures (service_id);

-- All staging columns are text so \copy can load the CSVs without casts.
create table if not exists gtfs_staging.stations (
  station_id text,
  name text,
  lines text,
  codes text
);

create table if not exists gtfs_staging.line_stations (
  line text,
  station_ids text
);

create table if not exists gtfs_staging.services (
  service_id text,
  monday text,
  tuesday text,
  wednesday text,
  thursday text,
  friday text,
  saturday text,
  sunday text,
  start_date text,
  end_date text
);

create table if not exists gtfs_staging.service_exceptions (
  service_id text,
  date text,
  exception_type text
);

create table if not exists gtfs_staging.departures (
  station_id text,
  service_id text,
  departures text
);

-- Previous snapshot mirrors the live schema but has no foreign keys or RLS.
create table if not exists gtfs_prev.stations (
  like public.train_gtfs_stations including defaults
);
create table if not exists gtfs_prev.line_stations (
  like public.train_gtfs_line_stations including defaults
);
create table if not exists gtfs_prev.services (
  like public.train_gtfs_services including defaults
);
create table if not exists gtfs_prev.service_exceptions (
  like public.train_gtfs_service_exceptions including defaults
);
create table if not exists gtfs_prev.departures (
  like public.train_gtfs_departures including defaults
);

alter table public.train_gtfs_meta enable row level security;
alter table public.train_gtfs_stations enable row level security;
alter table public.train_gtfs_line_stations enable row level security;
alter table public.train_gtfs_services enable row level security;
alter table public.train_gtfs_service_exceptions enable row level security;
alter table public.train_gtfs_departures enable row level security;

drop policy if exists "train_gtfs_meta_select_all" on public.train_gtfs_meta;
create policy "train_gtfs_meta_select_all" on public.train_gtfs_meta
  for select using (true);

drop policy if exists "train_gtfs_stations_select_all" on public.train_gtfs_stations;
create policy "train_gtfs_stations_select_all" on public.train_gtfs_stations
  for select using (true);

drop policy if exists "train_gtfs_line_stations_select_all" on public.train_gtfs_line_stations;
create policy "train_gtfs_line_stations_select_all" on public.train_gtfs_line_stations
  for select using (true);

drop policy if exists "train_gtfs_services_select_all" on public.train_gtfs_services;
create policy "train_gtfs_services_select_all" on public.train_gtfs_services
  for select using (true);

drop policy if exists "train_gtfs_service_exceptions_select_all" on public.train_gtfs_service_exceptions;
create policy "train_gtfs_service_exceptions_select_all" on public.train_gtfs_service_exceptions
  for select using (true);

drop policy if exists "train_gtfs_departures_select_all" on public.train_gtfs_departures;
create policy "train_gtfs_departures_select_all" on public.train_gtfs_departures
  for select using (true);

grant select on public.train_gtfs_meta, public.train_gtfs_stations,
  public.train_gtfs_line_stations, public.train_gtfs_services,
  public.train_gtfs_service_exceptions, public.train_gtfs_departures
  to anon, authenticated;

insert into public.train_gtfs_meta (id) values (1) on conflict (id) do nothing;
