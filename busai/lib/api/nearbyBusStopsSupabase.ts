import type { BusStop } from "../types";
import { getSupabase } from "../supabaseClient";
import { logPayloadLocal, utf8JsonBytes } from "../payloadLog";

type RpcRow = {
  bus_stop_code: string;
  description: string;
  road_name: string;
  latitude: number;
  longitude: number;
  distance_km: number;
};

/**
 * Nearest stops from Supabase `nearby_bus_stops` RPC (requires `bus_stops_catalog` populated by sync-bus-routes).
 * Returns null if Supabase is unset, RPC errors, or catalog is empty — caller should fall back to full LTA list.
 */
export async function fetchNearbyBusStopsFromSupabase(
  lat: number,
  lng: number,
  limit = 80,
): Promise<BusStop[] | null> {
  const client = getSupabase();
  if (!client) return null;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  const { data, error } = await client.rpc("nearby_bus_stops", {
    p_lat: lat,
    p_lng: lng,
    p_limit: limit,
  });

  if (error) {
    logPayloadLocal("nearby_bus_stops.rpc", { ok: false, message: error.message });
    return null;
  }

  const rows = (data ?? []) as RpcRow[];
  if (!rows.length) return null;

  const stops: BusStop[] = rows.map((r) => ({
    BusStopCode: r.bus_stop_code,
    Description: r.description ?? "",
    RoadName: r.road_name ?? "",
    Latitude: r.latitude,
    Longitude: r.longitude,
    distance: Number.isFinite(r.distance_km)
      ? parseFloat(Number(r.distance_km).toFixed(3))
      : undefined,
  }));

  logPayloadLocal("nearby_bus_stops.rpc", {
    ok: true,
    count: stops.length,
    responseJsonUtf8Bytes: utf8JsonBytes(rows),
  });

  return stops;
}
