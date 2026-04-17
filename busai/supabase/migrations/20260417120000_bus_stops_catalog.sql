-- Geo catalog for fast "nearest stops" without downloading the full LTA list on first paint.
-- Populated by `sync-bus-routes` from LTA BusStops.

create table if not exists public.bus_stops_catalog (
  bus_stop_code text primary key,
  description text not null default '',
  road_name text not null default '',
  latitude double precision not null,
  longitude double precision not null,
  updated_at timestamptz not null default now()
);

create index if not exists bus_stops_catalog_lat_lon_idx
  on public.bus_stops_catalog (latitude, longitude);

comment on table public.bus_stops_catalog is 'Singapore bus stops for nearest-stop RPC; synced from LTA.';

alter table public.bus_stops_catalog enable row level security;

create policy "bus_stops_catalog_select_all"
  on public.bus_stops_catalog for select
  using (true);

create or replace function public.nearby_bus_stops(
  p_lat double precision,
  p_lng double precision,
  p_limit int default 80
)
returns table (
  bus_stop_code text,
  description text,
  road_name text,
  latitude double precision,
  longitude double precision,
  distance_km double precision
)
language sql
stable
set search_path = public
as $$
  with lim as (
    select greatest(1, least(coalesce(p_limit, 80), 200)) as n
  )
  select
    c.bus_stop_code,
    c.description,
    c.road_name,
    c.latitude,
    c.longitude,
    (
      6371.0 * acos(
        least(
          1.0::double precision,
          greatest(
            -1.0::double precision,
            cos(radians(p_lat)) * cos(radians(c.latitude))
              * cos(radians(c.longitude) - radians(p_lng))
            + sin(radians(p_lat)) * sin(radians(c.latitude))
          )
        )
      )
    )::double precision as distance_km
  from public.bus_stops_catalog c, lim
  order by distance_km asc
  limit (select n from lim);
$$;

comment on function public.nearby_bus_stops is 'Nearest bus stops by Haversine km; anon-readable for home tab.';

grant select on table public.bus_stops_catalog to anon, authenticated;
grant execute on function public.nearby_bus_stops(double precision, double precision, int) to anon, authenticated;
