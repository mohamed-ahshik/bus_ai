-- Read-only station timings RPC used by the Expo app.
-- Resolves the LTA service day (including 24:00+ departures from yesterday)
-- and returns only the next p_limit departures for one line/direction.
create or replace function public.train_station_timings(
  p_station_id text,
  p_line text,
  p_direction smallint default 0,
  p_limit int default 5,
  p_at timestamptz default now()
)
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  with params as (
    select (p_at at time zone 'Asia/Singapore')::date as service_date
  ),
  service_dates as (
    select service_date from params
    union all
    select service_date - 1 from params
  ),
  meta as (
    select feed_end_date from public.train_gtfs_meta where id = 1
  ),
  active_services as (
    select sd.service_date, s.service_id
    from service_dates sd
    join public.train_gtfs_services s
      on to_date(s.start_date, 'YYYYMMDD') <= sd.service_date
     and to_date(s.end_date, 'YYYYMMDD') >= sd.service_date
     and case extract(isodow from sd.service_date)
           when 1 then s.monday
           when 2 then s.tuesday
           when 3 then s.wednesday
           when 4 then s.thursday
           when 5 then s.friday
           when 6 then s.saturday
           when 7 then s.sunday
         end = 1
    where not exists (
      select 1
      from public.train_gtfs_service_exceptions e
      where e.service_id = s.service_id
        and e.date = to_char(sd.service_date, 'YYYYMMDD')
        and e.exception_type = 2
    )

    union

    select sd.service_date, e.service_id
    from service_dates sd
    join public.train_gtfs_service_exceptions e
      on e.date = to_char(sd.service_date, 'YYYYMMDD')
     and e.exception_type = 1
  ),
  expanded as (
    select
      a.service_date,
      dep
    from active_services a
    join public.train_gtfs_departures d
      on d.service_id = a.service_id
     and d.station_id = p_station_id
    cross join lateral jsonb_array_elements(d.departures) dep
    where dep->>'line' = p_line
      and (dep->>'direction')::smallint = p_direction
  ),
  departures as (
    select distinct
      dep->>'tripId' as trip_id,
      dep->>'line' as line,
      (dep->>'direction')::smallint as direction,
      dep->>'headsign' as headsign,
      dep->>'platform' as platform,
      ((service_date::timestamp at time zone 'Asia/Singapore')
        + make_interval(secs => (dep->>'t')::int)) as scheduled_at
    from expanded
  ),
  upcoming as (
    select *
    from departures
    where scheduled_at >= p_at - interval '30 seconds'
    order by scheduled_at
    limit greatest(coalesce(p_limit, 5), 0)
  )
  select jsonb_build_object(
    'departures', coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'trip_id', trip_id,
            'line', line,
            'direction', direction,
            'headsign', headsign,
            'platform', platform,
            'scheduled_at', to_char(
              scheduled_at at time zone 'UTC',
              'YYYY-MM-DD"T"HH24:MI:SS"Z"'
            ),
            'epoch_ms', (extract(epoch from scheduled_at) * 1000)::bigint
          )
          order by scheduled_at
        )
        from upcoming
      ),
      '[]'::jsonb
    ),
    'feed_end_date', (select to_char(feed_end_date, 'YYYY-MM-DD') from meta),
    'schedule_available', (
      select coalesce(
        (select service_date from params) <= feed_end_date,
        false
      )
      from meta
    )
  );
$$;

grant execute on function public.train_station_timings(text, text, smallint, int, timestamptz)
  to anon, authenticated;
