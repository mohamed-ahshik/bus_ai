/**
 * Web-specific implementation of getAllBusStops.
 * Calls the lta-bus-stops Supabase Edge Function instead of LTA directly
 * (LTA DataMall does not send CORS headers, so browser requests are blocked).
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { BusStop } from "../types";
import { getSupabase } from "../supabaseClient";
import { logPayloadLocal, utf8JsonBytes } from "../payloadLog";

const CACHE_KEY = "lta_bus_stops_v1";
/** Full catalog is large; long TTL avoids repeat downloads (default 7 days). */
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const PAGE_SIZE = 500;

/** Single in-flight full-catalog fetch (home tab can call `getAllBusStops` from multiple hooks). */
let inFlightCatalog: Promise<BusStop[]> | null = null;

interface CachedData {
  timestamp: number;
  stops: BusStop[];
}

async function fetchAllPagesViaEdge(): Promise<BusStop[]> {
  const client = getSupabase();
  if (!client) throw new Error("Supabase not configured");

  const allStops: BusStop[] = [];
  let skip = 0;
  let pages = 0;
  let invokeResponseJsonUtf8Bytes = 0;

  while (true) {
    const { data, error } = await client.functions.invoke("lta-bus-stops", {
      body: { skip },
    });

    if (error) throw new Error(`lta-bus-stops error: ${error.message}`);
    if (!data?.ok) throw new Error(`lta-bus-stops failed: ${data?.error ?? "unknown"}`);

    invokeResponseJsonUtf8Bytes += utf8JsonBytes(data);
    pages += 1;

    const records: Array<{
      BusStopCode: string;
      RoadName: string;
      Description: string;
      Latitude: number;
      Longitude: number;
    }> = data.value ?? [];

    if (records.length === 0) break;

    for (const r of records) {
      allStops.push({
        BusStopCode: r.BusStopCode,
        RoadName: r.RoadName,
        Description: r.Description,
        Latitude: r.Latitude,
        Longitude: r.Longitude,
      });
    }

    if (records.length < PAGE_SIZE) break;
    skip += PAGE_SIZE;
  }

  logPayloadLocal("getAllBusStops.fetch", {
    transport: "supabase_edge_lta_bus_stops",
    pages,
    invokeResponseJsonUtf8Bytes,
    stopCount: allStops.length,
    normalizedStopsJsonUtf8Bytes: utf8JsonBytes(allStops),
  });

  return allStops;
}

export async function getAllBusStops(): Promise<BusStop[]> {
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed: CachedData = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
        logPayloadLocal("getAllBusStops", {
          source: "async_storage_cache",
          stopCount: parsed.stops.length,
          normalizedStopsJsonUtf8Bytes: utf8JsonBytes(parsed.stops),
        });
        return parsed.stops;
      }
    }
  } catch {}

  if (!inFlightCatalog) {
    inFlightCatalog = (async () => {
      const fetched = await fetchAllPagesViaEdge();
      try {
        const toCache: CachedData = { timestamp: Date.now(), stops: fetched };
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(toCache));
      } catch {}
      return fetched;
    })().finally(() => {
      inFlightCatalog = null;
    });
  }

  return inFlightCatalog;
}
