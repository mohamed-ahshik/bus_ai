import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const LTA_BASE = "https://datamall2.mytransport.sg/ltaodataservice";
const PAGE_SIZE = 500;
const UPSERT_CHUNK = 150;
const CATALOG_CHUNK = 400;

interface LtaRouteRow {
  ServiceNo: string;
  Direction: number;
  StopSequence: number;
  BusStopCode: string;
}

interface LtaStopRow {
  BusStopCode: string;
  RoadName?: string;
  Description: string;
  Latitude: number;
  Longitude: number;
}

async function fetchAllLtaPages<T>(path: string, accountKey: string): Promise<T[]> {
  const all: T[] = [];
  let skip = 0;
  for (;;) {
    const res = await fetch(`${LTA_BASE}/${path}?$skip=${skip}`, {
      headers: { AccountKey: accountKey, Accept: "application/json" },
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`LTA ${path} HTTP ${res.status}: ${body.slice(0, 200)}`);
    }
    const data = (await res.json()) as { value?: T[] };
    const records = data.value;
    if (!records?.length) break;
    all.push(...records);
    if (records.length < PAGE_SIZE) break;
    skip += PAGE_SIZE;
  }
  return all;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Use POST" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const syncSecret = Deno.env.get("SYNC_BUS_ROUTES_SECRET");
  if (syncSecret) {
    const auth = req.headers.get("Authorization") ?? "";
    if (auth !== `Bearer ${syncSecret}`) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  const ltaKey = Deno.env.get("EXPO_PUBLIC_LTA_DATAMALL_KEY");
  if (!ltaKey) {
    return new Response(
      JSON.stringify({
        error:
          "Missing LTA_ACCOUNT_KEY. Set: supabase secrets set LTA_ACCOUNT_KEY=your_key",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    return new Response(JSON.stringify({ error: "Missing Supabase env" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const [routeRows, stopRows] = await Promise.all([
      fetchAllLtaPages<LtaRouteRow>("BusRoutes", ltaKey),
      fetchAllLtaPages<LtaStopRow>("BusStops", ltaKey),
    ]);

    const nameByCode = new Map(stopRows.map((s) => [s.BusStopCode, s.Description]));

    type Group = { service_no: string; direction: number; rows: LtaRouteRow[] };
    const groups = new Map<string, Group>();

    for (const r of routeRows) {
      if (r.Direction !== 1 && r.Direction !== 2) continue;
      const key = `${r.ServiceNo}|${r.Direction}`;
      let g = groups.get(key);
      if (!g) {
        g = { service_no: String(r.ServiceNo).trim(), direction: r.Direction, rows: [] };
        groups.set(key, g);
      }
      g.rows.push(r);
    }

    const upserts: {
      service_no: string;
      direction: number;
      stops: { code: string; name: string }[];
      updated_at: string;
    }[] = [];

    for (const g of groups.values()) {
      g.rows.sort((a, b) => a.StopSequence - b.StopSequence);
      const stops = g.rows.map((row) => ({
        code: row.BusStopCode,
        name: nameByCode.get(row.BusStopCode) ?? row.BusStopCode,
      }));
      upserts.push({
        service_no: g.service_no,
        direction: g.direction,
        stops,
        updated_at: new Date().toISOString(),
      });
    }

    const supabase = createClient(supabaseUrl, serviceKey);
    let upserted = 0;
    for (let i = 0; i < upserts.length; i += UPSERT_CHUNK) {
      const chunk = upserts.slice(i, i + UPSERT_CHUNK);
      const { error } = await supabase.from("bus_routes_compact").upsert(chunk, {
        onConflict: "service_no,direction",
      });
      if (error) throw error;
      upserted += chunk.length;
    }

    const catalogRows = stopRows
      .map((s) => {
        const code = String(s.BusStopCode ?? "").trim();
        const lat = Number(s.Latitude);
        const lng = Number(s.Longitude);
        if (!code || !Number.isFinite(lat) || !Number.isFinite(lng)) return null;
        return {
          bus_stop_code: code,
          road_name: String(s.RoadName ?? "").trim(),
          description: String(s.Description ?? "").trim(),
          latitude: lat,
          longitude: lng,
          updated_at: new Date().toISOString(),
        };
      })
      .filter((r): r is NonNullable<typeof r> => r != null);

    let catalogUpserted = 0;
    for (let i = 0; i < catalogRows.length; i += CATALOG_CHUNK) {
      const chunk = catalogRows.slice(i, i + CATALOG_CHUNK);
      const { error: catErr } = await supabase.from("bus_stops_catalog").upsert(chunk, {
        onConflict: "bus_stop_code",
      });
      if (catErr) throw catErr;
      catalogUpserted += chunk.length;
    }

    const body = {
      ok: true,
      lta_route_rows: routeRows.length,
      lta_stop_rows: stopRows.length,
      compact_rows_upserted: upserted,
      catalog_stops_upserted: catalogUpserted,
    };

    return new Response(JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});
