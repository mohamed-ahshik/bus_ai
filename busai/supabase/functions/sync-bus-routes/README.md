# sync-bus-routes

Fetches LTA DataMall **BusRoutes** + **BusStops**, groups by `service_no` + `direction`, and upserts into `public.bus_routes_compact`.

## Secrets

```bash
supabase secrets set LTA_ACCOUNT_KEY="your_lta_datamall_account_key"
```

Optional (recommended in production):

```bash
supabase secrets set SYNC_BUS_ROUTES_SECRET="a-long-random-string"
```

If `SYNC_BUS_ROUTES_SECRET` is set, send `Authorization: Bearer <secret>` on every request.

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are provided automatically in Edge Functions.

## Deploy

```bash
cd busai
supabase functions deploy sync-bus-routes
```

## Populate the table (POST)

```bash
supabase functions invoke sync-bus-routes --no-verify-jwt --body '{}'
```

With optional secret:

```bash
supabase functions invoke sync-bus-routes --no-verify-jwt \
  -H "Authorization: Bearer YOUR_SYNC_SECRET" --body '{}'
```

Apply migration `20260408150000_bus_routes_compact.sql` on the remote DB before the first run (`supabase db push` or SQL Editor).

**Note:** Full LTA sync can take a while. If you hit timeouts, upgrade plan or split work later.
