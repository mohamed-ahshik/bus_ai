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
