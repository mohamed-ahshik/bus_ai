// ─── Bus Stop ───────────────────────────────────────────────────────────────

export interface BusStop {
  BusStopCode: string;
  RoadName: string;
  Description: string;
  Latitude: number;
  Longitude: number;
  distance?: number; // km from user location
}

// ─── Bus Arrival ────────────────────────────────────────────────────────────

export type LoadStatus = "SEA" | "SDA" | "LSD" | "NA";
export type BusType = "SD" | "DD" | "BD";

export interface BusArrivalService {
  ServiceNo: string;
  Operator: string;
  NextBus: BusArrivalTime;
  NextBus2: BusArrivalTime;
  NextBus3: BusArrivalTime;
}

export interface BusArrivalTime {
  OriginCode: string;
  DestinationCode: string;
  EstimatedArrival: string; // ISO datetime string
  Monitored: number;
  Latitude: string;
  Longitude: string;
  VisitNumber: string;
  Load: LoadStatus;
  Feature: string;
  Type: BusType;
  arrivalMinutes?: number; // computed
}

export interface BusArrivalResponse {
  BusStopCode: string;
  Services: BusArrivalService[];
}

// ─── Route ──────────────────────────────────────────────────────────────────

export interface BusRoute {
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

export interface RouteStop {
  stopCode: string;
  stopName: string;
  roadName: string;
  sequence: number;
  distance: number;
  estimatedMinutes?: number;
}

// ─── Bookmark ────────────────────────────────────────────────────────────────

export interface Bookmark {
  id: string;
  type: "stop" | "service";
  stopCode: string;
  stopName: string;
  roadName: string;
  serviceNo?: string;
  direction?: string; // e.g. "To Bedok Int"
  createdAt: number;
}

// ─── Trip / AI ────────────────────────────────────────────────────────────────

export interface TripPlan {
  query: string;
  fromStop: BusStop;
  toDescription: string;
  recommendedService: string;
  boardingStop: BusStop;
  alightingStop?: BusStop;
  stopsCount: number;
  estimatedMinutes: number;
  walkingMeters: number;
  arrivalMinutes: number;
  busType: BusType;
  loadStatus: LoadStatus;
}
