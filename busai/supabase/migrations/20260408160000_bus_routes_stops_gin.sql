-- GIN index on stops JSONB column for fast containment queries.
-- Enables: WHERE stops @> '[{"code":"12345"}]' to run in O(log n) instead of full table scan.

create index if not exists bus_routes_compact_stops_gin
  on public.bus_routes_compact using gin(stops);
