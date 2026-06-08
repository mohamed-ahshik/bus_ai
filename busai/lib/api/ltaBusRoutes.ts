import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import type { BusRoute, RouteStop } from "../types";
import { getAllBusStops } from "./ltaBusStops";
import { getSupabase, supabase } from "../supabaseClient";

const API_URL = "https://datamall2.mytransport.sg/ltaodataservice/BusRoutes";
const API_KEY = process.env.EXPO_PUBLIC_LTA_DATAMALL_KEY ?? "";
const CACHE_KEY = "lta_bus_routes_v1";
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const PAGE_SIZE = 500;

interface LTARouteRecord {
  ServiceNo: string;
  Operator: string;
  Direction: number;
  StopSequence: number;
  BusStopCode: string;
  Distance: number;
  WD_FirstBus: string;
  WD_LastBus: string;
  SAT_FirstBus: string;
  SAT_LastBus: string;
  SUN_FirstBus: string;
  SUN_LastBus: string;
}

interface CachedData {
  timestamp: number;
  routes: LTARouteRecord[];
}

async function fetchAllPagesViaEdge(): Promise<LTARouteRecord[]> {
  const client = getSupabase();
  if (!client) throw new Error("Supabase not configured");

  const all: LTARouteRecord[] = [];
  let skip = 0;

  while (true) {
    const { data, error } = await client.functions.invoke("lta-bus-routes", {
      body: { skip },
    });

    if (error) throw new Error(`lta-bus-routes error: ${error.message}`);
    if (!data?.ok) throw new Error(`lta-bus-routes failed: ${data?.error ?? "unknown"}`);

    const records: LTARouteRecord[] = data.value ?? [];
    if (records.length === 0) break;

    all.push(...records);
    if (records.length < PAGE_SIZE) break;
    skip += PAGE_SIZE;
  }

  return all;
}

async function fetchAllPages(): Promise<LTARouteRecord[]> {
  if (Platform.OS === "web") {
    return fetchAllPagesViaEdge();
  }

  const all: LTARouteRecord[] = [];
  let skip = 0;

  while (true) {
    const res = await fetch(`${API_URL}?$skip=${skip}`, {
      headers: { AccountKey: API_KEY, accept: "application/json" },
    });
    if (!res.ok) throw new Error(`LTA BusRoutes error: ${res.status}`);

    const data = await res.json();
    const records: LTARouteRecord[] = data.value;
    if (!records || records.length === 0) break;

    all.push(...records);
    if (records.length < PAGE_SIZE) break;
    skip += PAGE_SIZE;
  }

  return all;
}

export async function getAllRoutes(): Promise<LTARouteRecord[]> {
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed: CachedData = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
        return parsed.routes;
      }
    }
  } catch {}

  if (Platform.OS === "web") {
    if (!getSupabase()) return [];
  } else if (!API_KEY) {
    return [];
  }

  const routes = await fetchAllPages();

  try {
    await AsyncStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), routes } as CachedData)
    );
  } catch {}

  return routes;
}

function sortServiceNumbers(a: string, b: string): number {
  const aNum = parseInt(a, 10);
  const bNum = parseInt(b, 10);
  if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
  if (!isNaN(aNum)) return -1;
  if (!isNaN(bNum)) return 1;
  return a.localeCompare(b);
}

let _serviceNumbersCache: string[] | null = null;

export async function getServiceNumbers(): Promise<string[]> {
  if (_serviceNumbersCache) return _serviceNumbersCache;

  // Tier 1: Supabase distinct query
  try {
    const { data, error } = await supabase
      .from("bus_routes_compact")
      .select("service_no");
    if (!error && data && data.length > 0) {
      const seen = new Set(data.map((r: { service_no: string }) => r.service_no));
      _serviceNumbersCache = [...seen].sort(sortServiceNumbers);
      return _serviceNumbersCache;
    }
  } catch {}

  // Tier 2: AsyncStorage cache
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed: CachedData = JSON.parse(cached);
      const seen = new Set(parsed.routes.map((r) => r.ServiceNo));
      _serviceNumbersCache = [...seen].sort(sortServiceNumbers);
      return _serviceNumbersCache;
    }
  } catch {}

  // Tier 3: fresh fetch
  const routes = await getAllRoutes();
  const seen = new Set(routes.map((r) => r.ServiceNo));
  _serviceNumbersCache = [...seen].sort(sortServiceNumbers);
  return _serviceNumbersCache;
}

function buildRouteStops(
  allRoutes: LTARouteRecord[],
  stopMap: Map<string, { Description: string; RoadName: string }>,
  serviceNo: string,
  direction: number
): RouteStop[] {
  return allRoutes
    .filter((r) => r.ServiceNo === serviceNo && r.Direction === direction)
    .sort((a, b) => a.StopSequence - b.StopSequence)
    .map((r) => {
      const stop = stopMap.get(r.BusStopCode);
      return {
        stopCode: r.BusStopCode,
        stopName: stop?.Description ?? r.BusStopCode,
        roadName: stop?.RoadName ?? "",
        sequence: r.StopSequence,
        distance: r.Distance,
      };
    });
}

// ─── Supabase compact-table helpers ─────────────────────────────────────────

interface CompactStop { code: string; name: string }

interface CompactRow {
  service_no: string;
  direction: number;
  stops: CompactStop[];
}

function compactToRouteStops(stops: CompactStop[]): RouteStop[] {
  return stops.map((s, i) => ({
    stopCode: s.code,
    stopName: s.name,
    roadName: "",
    sequence: i + 1,
    // Approximate distance: average Singapore bus stop spacing ~0.5 km
    distance: i * 0.5,
  }));
}

async function fetchCompactRows(serviceNo: string): Promise<CompactRow[]> {
  const { data, error } = await supabase
    .from("bus_routes_compact")
    .select("service_no, direction, stops")
    .eq("service_no", serviceNo);

  if (error || !data || data.length === 0) return [];
  return data as CompactRow[];
}

// ─── Route stop helpers ──────────────────────────────────────────────────────

export async function getRouteStops(
  serviceNo: string,
  originStopCode?: string
): Promise<RouteStop[]> {
  // Try Supabase compact table first (fast: 1 query, 2 rows max)
  try {
    const rows = await fetchCompactRows(serviceNo);
    if (rows.length > 0) {
      const row1 = rows.find((r) => r.direction === 1);
      const row2 = rows.find((r) => r.direction === 2);
      const dir1 = row1 ? compactToRouteStops(row1.stops) : [];
      const dir2 = row2 ? compactToRouteStops(row2.stops) : [];

      if (originStopCode) {
        if (dir1.some((s) => s.stopCode === originStopCode)) return dir1;
        if (dir2.some((s) => s.stopCode === originStopCode)) return dir2;
      }
      return dir1.length > 0 ? dir1 : dir2;
    }
  } catch {}

  // Fallback: LTA DataMall direct (slow, paginated)
  const [allRoutes, allStops] = await Promise.all([
    getAllRoutes(),
    getAllBusStops(),
  ]);

  const stopMap = new Map(
    allStops.map((s) => [s.BusStopCode, { Description: s.Description, RoadName: s.RoadName }])
  );

  const dir1 = buildRouteStops(allRoutes, stopMap, serviceNo, 1);
  const dir2 = buildRouteStops(allRoutes, stopMap, serviceNo, 2);

  if (originStopCode) {
    const inDir1 = dir1.some((s) => s.stopCode === originStopCode);
    if (inDir1) return dir1;
    const inDir2 = dir2.some((s) => s.stopCode === originStopCode);
    if (inDir2) return dir2;
  }

  return dir1.length > 0 ? dir1 : dir2;
}

export interface BothDirectionStops {
  direction_1: { terminal: string; stops_from_origin: RouteStop[] | null };
  direction_2: { terminal: string; stops_from_origin: RouteStop[] | null };
}

/**
 * Returns both directions for a bus service, each with:
 * - terminal: the last stop name (end of that direction)
 * - stops_from_origin: up to 20 stops from the user's boarding point, or null
 *   if the user's stop is not served by that direction
 */
export async function getBothDirectionStops(
  serviceNo: string,
  originStopCode?: string
): Promise<BothDirectionStops> {
  let dir1: RouteStop[] = [];
  let dir2: RouteStop[] = [];

  // Try Supabase compact table first
  try {
    const rows = await fetchCompactRows(serviceNo);
    if (rows.length > 0) {
      const row1 = rows.find((r) => r.direction === 1);
      const row2 = rows.find((r) => r.direction === 2);
      dir1 = row1 ? compactToRouteStops(row1.stops) : [];
      dir2 = row2 ? compactToRouteStops(row2.stops) : [];
    }
  } catch {}

  // Fallback to LTA if Supabase returned nothing
  if (dir1.length === 0 && dir2.length === 0) {
    const [allRoutes, allStops] = await Promise.all([
      getAllRoutes(),
      getAllBusStops(),
    ]);
    const stopMap = new Map(
      allStops.map((s) => [s.BusStopCode, { Description: s.Description, RoadName: s.RoadName }])
    );
    dir1 = buildRouteStops(allRoutes, stopMap, serviceNo, 1);
    dir2 = buildRouteStops(allRoutes, stopMap, serviceNo, 2);
  }

  const sliceFromOrigin = (stops: RouteStop[]): RouteStop[] | null => {
    if (!originStopCode) return stops.slice(0, 20);
    const idx = stops.findIndex((s) => s.stopCode === originStopCode);
    if (idx < 0) return null; // origin not served by this direction
    return stops.slice(idx, idx + 20);
  };

  return {
    direction_1: {
      terminal: dir1.at(-1)?.stopName ?? "—",
      stops_from_origin: sliceFromOrigin(dir1),
    },
    direction_2: {
      terminal: dir2.at(-1)?.stopName ?? "—",
      stops_from_origin: sliceFromOrigin(dir2),
    },
  };
}

export interface BothDirectionsFull {
  dir1: RouteStop[];        // the direction the user is traveling in (full list)
  dir2: RouteStop[];        // the opposite direction (full list)
  dir1Terminal: string;
  dir2Terminal: string;
}

/**
 * Returns full stop lists for both directions of a service.
 * dir1 is always the direction that contains originStopCode (or Direction 1 by default).
 * dir2 is the opposite — used to show "cross the road" options.
 */
export async function getBothDirectionsFull(
  serviceNo: string,
  originStopCode?: string
): Promise<BothDirectionsFull> {
  let raw1: RouteStop[] = [];
  let raw2: RouteStop[] = [];

  // Try Supabase compact table first
  try {
    const rows = await fetchCompactRows(serviceNo);
    if (rows.length > 0) {
      const row1 = rows.find((r) => r.direction === 1);
      const row2 = rows.find((r) => r.direction === 2);
      raw1 = row1 ? compactToRouteStops(row1.stops) : [];
      raw2 = row2 ? compactToRouteStops(row2.stops) : [];
    }
  } catch {}

  // Fallback to LTA if Supabase returned nothing
  if (raw1.length === 0 && raw2.length === 0) {
    const [allRoutes, allStops] = await Promise.all([
      getAllRoutes(),
      getAllBusStops(),
    ]);
    const stopMap = new Map(
      allStops.map((s) => [s.BusStopCode, { Description: s.Description, RoadName: s.RoadName }])
    );
    raw1 = buildRouteStops(allRoutes, stopMap, serviceNo, 1);
    raw2 = buildRouteStops(allRoutes, stopMap, serviceNo, 2);
  }

  // Orient so dir1 is always the user's travel direction
  const userInDir2 = originStopCode && raw2.some((s) => s.stopCode === originStopCode);
  const dir1 = userInDir2 ? raw2 : raw1;
  const dir2 = userInDir2 ? raw1 : raw2;

  return {
    dir1,
    dir2,
    dir1Terminal: dir1.at(-1)?.stopName ?? "Terminal",
    dir2Terminal: dir2.at(-1)?.stopName ?? "Terminal",
  };
}

export async function getServiceDestination(
  serviceNo: string,
  originStopCode?: string
): Promise<string> {
  const stops = await getRouteStops(serviceNo, originStopCode);
  if (stops.length === 0) return "Terminal";
  return stops[stops.length - 1].stopName;
}

export interface StopService {
  ServiceNo: string;
  Operator: string;
  WD_FirstBus: string;
  WD_LastBus: string;
  SAT_FirstBus: string;
  SAT_LastBus: string;
  SUN_FirstBus: string;
  SUN_LastBus: string;
}

export async function getServicesAtStop(stopCode: string): Promise<StopService[]> {
  // Fast path: JSONB `@>` via PostgREST `cs`. `.contains([{...}])` can 400 on web.
  try {
    const containment = JSON.stringify([{ code: stopCode }]);
    const { data, error } = await supabase
      .from("bus_routes_compact")
      .select("service_no")
      .filter("stops", "cs", containment);

    if (!error && data && data.length > 0) {
      // Deduplicate service numbers (one row per direction, both may match)
      const seen = new Set<string>();
      const result: StopService[] = [];
      for (const row of data) {
        if (!seen.has(row.service_no)) {
          seen.add(row.service_no);
          // Timing info not stored in compact table — treated as always operating
          result.push({
            ServiceNo: row.service_no,
            Operator: "",
            WD_FirstBus: "", WD_LastBus: "",
            SAT_FirstBus: "", SAT_LastBus: "",
            SUN_FirstBus: "", SUN_LastBus: "",
          });
        }
      }
      return result.sort((a, b) => {
        const aNum = parseInt(a.ServiceNo, 10);
        const bNum = parseInt(b.ServiceNo, 10);
        if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
        if (!isNaN(aNum)) return -1;
        if (!isNaN(bNum)) return 1;
        return a.ServiceNo.localeCompare(b.ServiceNo);
      });
    }
  } catch {}

  // Fallback: LTA DataMall full fetch (slow, used if Supabase empty/unavailable)
  const allRoutes = await getAllRoutes();
  const seen = new Set<string>();
  const result: StopService[] = [];

  for (const r of allRoutes) {
    if (r.BusStopCode === stopCode && !seen.has(r.ServiceNo)) {
      seen.add(r.ServiceNo);
      result.push({
        ServiceNo: r.ServiceNo,
        Operator: r.Operator,
        WD_FirstBus: r.WD_FirstBus,
        WD_LastBus: r.WD_LastBus,
        SAT_FirstBus: r.SAT_FirstBus,
        SAT_LastBus: r.SAT_LastBus,
        SUN_FirstBus: r.SUN_FirstBus,
        SUN_LastBus: r.SUN_LastBus,
      });
    }
  }

  return result.sort((a, b) => {
    const aNum = parseInt(a.ServiceNo, 10);
    const bNum = parseInt(b.ServiceNo, 10);
    if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
    if (!isNaN(aNum)) return -1;
    if (!isNaN(bNum)) return 1;
    return a.ServiceNo.localeCompare(b.ServiceNo);
  });
}

/**
 * Returns whether a bus service is expected to be in operation right now,
 * based on the first/last bus times for the current day (Singapore time).
 */
export function isServiceInOperation(service: StopService): boolean {
  const now = new Date();
  // Convert to Singapore time (UTC+8) using UTC methods to avoid double-applying device timezone
  const sgt = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  const day = sgt.getUTCDay(); // 0=Sun, 6=Sat, 1-5=Mon-Fri
  const currentHHMM = sgt.getUTCHours() * 100 + sgt.getUTCMinutes();

  let firstStr: string;
  let lastStr: string;

  if (day === 0) {
    firstStr = service.SUN_FirstBus;
    lastStr = service.SUN_LastBus;
  } else if (day === 6) {
    firstStr = service.SAT_FirstBus;
    lastStr = service.SAT_LastBus;
  } else {
    firstStr = service.WD_FirstBus;
    lastStr = service.WD_LastBus;
  }

  // No timing info (Supabase compact path) — assume operating since it's in the route table
  if (!firstStr || firstStr === "-" || !lastStr || lastStr === "-") return true;

  const first = parseInt(firstStr, 10);
  const last = parseInt(lastStr, 10);

  // Overnight services (e.g. 2300–0130): wrap around midnight
  if (last < first) {
    return currentHHMM >= first || currentHHMM <= last;
  }
  return currentHHMM >= first && currentHHMM <= last;
}
