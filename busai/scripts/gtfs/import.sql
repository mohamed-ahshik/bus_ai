\set ON_ERROR_STOP on
-- Path placeholders are rendered by sync.py: psql \\copy does not
-- interpolate :'variable' values.
begin;

truncate gtfs_staging.stations, gtfs_staging.line_stations,
         gtfs_staging.services, gtfs_staging.service_exceptions,
         gtfs_staging.departures;

\copy gtfs_staging.stations from '__STATIONS_CSV__' with (format csv, header true)
\copy gtfs_staging.line_stations from '__LINE_STATIONS_CSV__' with (format csv, header true)
\copy gtfs_staging.services from '__SERVICES_CSV__' with (format csv, header true)
\copy gtfs_staging.service_exceptions from '__SERVICE_EXCEPTIONS_CSV__' with (format csv, header true)
\copy gtfs_staging.departures from '__DEPARTURES_CSV__' with (format csv, header true)

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
  from public.train_gtfs_meta
  where id = 1;

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
end
$$;

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
select line, station_ids::jsonb
from gtfs_staging.line_stations;

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
