import AsyncStorage from "@react-native-async-storage/async-storage";
import type { BusRoute, RouteStop } from "../types";
import { getAllBusStops } from "./ltaBusStops";

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

async function fetchAllPages(): Promise<LTARouteRecord[]> {
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

async function getAllRoutes(): Promise<LTARouteRecord[]> {
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed: CachedData = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
        return parsed.routes;
      }
    }
  } catch {}

  if (!API_KEY) return [];

  const routes = await fetchAllPages();

  try {
    await AsyncStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), routes } as CachedData)
    );
  } catch {}

  return routes;
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

export async function getRouteStops(
  serviceNo: string,
  originStopCode?: string
): Promise<RouteStop[]> {
  const [allRoutes, allStops] = await Promise.all([
    getAllRoutes(),
    getAllBusStops(),
  ]);

  const stopMap = new Map(
    allStops.map((s) => [s.BusStopCode, { Description: s.Description, RoadName: s.RoadName }])
  );

  const dir1 = buildRouteStops(allRoutes, stopMap, serviceNo, 1);
  const dir2 = buildRouteStops(allRoutes, stopMap, serviceNo, 2);

  // If an origin stop is provided, pick the direction that contains it
  if (originStopCode) {
    const inDir1 = dir1.some((s) => s.stopCode === originStopCode);
    if (inDir1) return dir1;
    const inDir2 = dir2.some((s) => s.stopCode === originStopCode);
    if (inDir2) return dir2;
  }

  // Fall back to direction 1 (or direction 2 if 1 is empty)
  return dir1.length > 0 ? dir1 : dir2;
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
  // Convert to Singapore time (UTC+8)
  const sgt = new Date(now.getTime() + (8 * 60 - now.getTimezoneOffset()) * 60 * 1000);
  const day = sgt.getDay(); // 0=Sun, 6=Sat, 1-5=Mon-Fri
  const currentHHMM = sgt.getHours() * 100 + sgt.getMinutes();

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

  if (!firstStr || firstStr === "-" || !lastStr || lastStr === "-") return false;

  const first = parseInt(firstStr, 10);
  const last = parseInt(lastStr, 10);

  // Overnight services (e.g. 2300–0130): wrap around midnight
  if (last < first) {
    return currentHHMM >= first || currentHHMM <= last;
  }
  return currentHHMM >= first && currentHHMM <= last;
}
