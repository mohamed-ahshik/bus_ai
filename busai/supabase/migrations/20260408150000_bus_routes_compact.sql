-- Compact bus route storage: one row per service + direction, stops as JSON array.
-- Example stops: [{"code":"75009","name":"Tampines Int"},{"code":"75019","name":"Tampines Ave 1"}]

create table public.bus_routes_compact (
  id uuid primary key default gen_random_uuid(),
  service_no text not null,
  direction smallint not null default 1 check (direction in (1, 2)),
  stops jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  unique (service_no, direction)
);

create index bus_routes_compact_service_direction_idx
  on public.bus_routes_compact (service_no, direction);

comment on table public.bus_routes_compact is 'Bus service route: ordered stops in JSON [{code, name}, ...]';
comment on column public.bus_routes_compact.stops is 'Ordered array of objects with stop code and optional name';

alter table public.bus_routes_compact enable row level security;

create policy "bus_routes_compact_select_all"
  on public.bus_routes_compact for select
  using (true);

create policy "bus_routes_compact_insert_authenticated"
  on public.bus_routes_compact for insert
  to authenticated
  with check (true);

create policy "bus_routes_compact_update_authenticated"
  on public.bus_routes_compact for update
  to authenticated
  using (true)
  with check (true);

create policy "bus_routes_compact_delete_authenticated"
  on public.bus_routes_compact for delete
  to authenticated
  using (true);
