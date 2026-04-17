import AsyncStorage from "@react-native-async-storage/async-storage";
import type { BusStop } from "../types";
import { logPayloadLocal, utf8JsonBytes } from "../payloadLog";

const API_URL = "https://datamall2.mytransport.sg/ltaodataservice/BusStops";
const API_KEY = process.env.EXPO_PUBLIC_LTA_DATAMALL_KEY ?? "";
const CACHE_KEY = "lta_bus_stops_v1";
/** Full catalog is large; long TTL avoids repeat downloads (default 7 days). */
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const PAGE_SIZE = 500;

/** Single in-flight full-catalog fetch (home tab can call `getAllBusStops` from multiple hooks). */
let inFlightCatalog: Promise<BusStop[]> | null = null;

interface LTABusStopRecord {
  BusStopCode: string;
  RoadName: string;
  Description: string;
  Latitude: number;
  Longitude: number;
}

interface LTAResponse {
  "odata.metadata": string;
  value: LTABusStopRecord[];
}

interface CachedData {
  timestamp: number;
  stops: BusStop[];
}

async function fetchAllPages(): Promise<BusStop[]> {
  const allStops: BusStop[] = [];
  let skip = 0;
  let pages = 0;
  let upstreamJsonUtf8Bytes = 0;

  while (true) {
    const res = await fetch(`${API_URL}?$skip=${skip}`, {
      headers: { AccountKey: API_KEY, accept: "application/json" },
    });

    if (!res.ok) {
      throw new Error(`LTA API error: ${res.status} ${res.statusText}`);
    }

    const data: LTAResponse = await res.json();
    upstreamJsonUtf8Bytes += utf8JsonBytes(data);
    pages += 1;
    const records = data.value;

    if (!records || records.length === 0) break;

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
    transport: "lta_direct",
    pages,
    upstreamJsonUtf8Bytes,
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

  if (!API_KEY) {
    console.warn("LTA DataMall API key not set in EXPO_PUBLIC_LTA_DATAMALL_KEY");
    return [];
  }

  if (!inFlightCatalog) {
    inFlightCatalog = (async () => {
      const fetched = await fetchAllPages();
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
