import type { BusStop, BusArrivalResponse, RouteStop, Bookmark } from "./types";

// ─── Mock Bus Stops (near Orchard Road, Singapore) ──────────────────────────

export const MOCK_BUS_STOPS: BusStop[] = [
  {
    BusStopCode: "08057",
    RoadName: "Orchard Rd",
    Description: "Plaza Singapura, Dhoby...",
    Latitude: 1.29863,
    Longitude: 103.84583,
    distance: 0.14,
  },
  {
    BusStopCode: "08058",
    RoadName: "Orchard Rd",
    Description: "Aft Dhoby Ghaut Stn",
    Latitude: 1.2993,
    Longitude: 103.8462,
    distance: 0.23,
  },
  {
    BusStopCode: "08138",
    RoadName: "Orchard Rd",
    Description: "Concorde Hotel S'pore",
    Latitude: 1.30001,
    Longitude: 103.84399,
    distance: 0.38,
  },
  {
    BusStopCode: "08041",
    RoadName: "Orchard Rd",
    Description: "YMCA",
    Latitude: 1.30058,
    Longitude: 103.8434,
    distance: 0.39,
  },
  {
    BusStopCode: "08137",
    RoadName: "Orchard Rd",
    Description: "Orchard Plaza",
    Latitude: 1.30117,
    Longitude: 103.84226,
    distance: 0.47,
  },
  {
    BusStopCode: "09022",
    RoadName: "Somerset Rd",
    Description: "Opp Somerset Stn",
    Latitude: 1.30046,
    Longitude: 103.83895,
    distance: 0.55,
  },
];

// ─── Mock Bus Arrivals ───────────────────────────────────────────────────────

function makeArrivalTime(minutesFromNow: number, type: "SD" | "DD" = "DD", load: "SEA" | "SDA" | "LSD" = "SEA") {
  const d = new Date(Date.now() + minutesFromNow * 60000);
  return {
    OriginCode: "08057",
    DestinationCode: "99009",
    EstimatedArrival: d.toISOString(),
    Monitored: 1,
    Latitude: "1.29863",
    Longitude: "103.84583",
    VisitNumber: "1",
    Load: load as any,
    Feature: "WAB",
    Type: type as any,
    arrivalMinutes: minutesFromNow,
  };
}

export const MOCK_BUS_ARRIVALS: Record<string, BusArrivalResponse> = {
  "08057": {
    BusStopCode: "08057",
    Services: [
      {
        ServiceNo: "7",
        Operator: "SBST",
        NextBus: makeArrivalTime(3, "DD", "SEA"),
        NextBus2: makeArrivalTime(12, "DD", "SDA"),
        NextBus3: makeArrivalTime(22, "SD", "LSD"),
      },
      {
        ServiceNo: "14",
        Operator: "SBST",
        NextBus: makeArrivalTime(8, "SD", "SDA"),
        NextBus2: makeArrivalTime(22, "SD", "SEA"),
        NextBus3: makeArrivalTime(35, "DD", "SEA"),
      },
      {
        ServiceNo: "65",
        Operator: "SBST",
        NextBus: makeArrivalTime(5, "DD", "SEA"),
        NextBus2: makeArrivalTime(18, "DD", "SEA"),
        NextBus3: makeArrivalTime(31, "SD", "SDA"),
      },
      {
        ServiceNo: "106",
        Operator: "SBST",
        NextBus: makeArrivalTime(12, "DD", "SEA"),
        NextBus2: makeArrivalTime(25, "DD", "LSD"),
        NextBus3: makeArrivalTime(38, "SD", "SEA"),
      },
      {
        ServiceNo: "111",
        Operator: "SBST",
        NextBus: makeArrivalTime(2, "SD", "SEA"),
        NextBus2: makeArrivalTime(15, "SD", "SEA"),
        NextBus3: makeArrivalTime(29, "DD", "SDA"),
      },
      {
        ServiceNo: "174",
        Operator: "SBST",
        NextBus: makeArrivalTime(6, "SD", "LSD"),
        NextBus2: makeArrivalTime(20, "SD", "SDA"),
        NextBus3: makeArrivalTime(35, "DD", "SEA"),
      },
    ],
  },
  "08058": {
    BusStopCode: "08058",
    Services: [
      {
        ServiceNo: "7",
        Operator: "SBST",
        NextBus: makeArrivalTime(4, "DD", "SEA"),
        NextBus2: makeArrivalTime(14, "DD", "SEA"),
        NextBus3: makeArrivalTime(26, "SD", "SDA"),
      },
      {
        ServiceNo: "14",
        Operator: "SBST",
        NextBus: makeArrivalTime(9, "SD", "SDA"),
        NextBus2: makeArrivalTime(24, "SD", "SEA"),
        NextBus3: makeArrivalTime(38, "DD", "SEA"),
      },
    ],
  },
};

// ─── Mock Route Stops ────────────────────────────────────────────────────────

export const MOCK_ROUTE_STOPS: Record<string, RouteStop[]> = {
  "7": [
    { stopCode: "08057", stopName: "Plaza Singapura", roadName: "Orchard Rd", sequence: 1, distance: 0, estimatedMinutes: 0 },
    { stopCode: "08058", stopName: "Lucky Plaza", roadName: "Orchard Rd", sequence: 2, distance: 0.3, estimatedMinutes: 2 },
    { stopCode: "09022", stopName: "Somerset Stn", roadName: "Somerset Rd", sequence: 3, distance: 0.8, estimatedMinutes: 5 },
    { stopCode: "09033", stopName: "Grange Rd", roadName: "Grange Rd", sequence: 4, distance: 1.4, estimatedMinutes: 8 },
    { stopCode: "10009", stopName: "Robinson Rd", roadName: "Robinson Rd", sequence: 5, distance: 2.1, estimatedMinutes: 13 },
    { stopCode: "10019", stopName: "Maxwell Rd", roadName: "Maxwell Rd", sequence: 6, distance: 2.8, estimatedMinutes: 17 },
    { stopCode: "84009", stopName: "Bedok Interchange", roadName: "Bedok Rd", sequence: 7, distance: 12.5, estimatedMinutes: 42 },
  ],
  "14": [
    { stopCode: "08057", stopName: "Plaza Singapura", roadName: "Orchard Rd", sequence: 1, distance: 0, estimatedMinutes: 0 },
    { stopCode: "08058", stopName: "Aft Dhoby Ghaut Stn", roadName: "Orchard Rd", sequence: 2, distance: 0.4, estimatedMinutes: 3 },
    { stopCode: "08138", stopName: "Concorde Hotel", roadName: "Orchard Rd", sequence: 3, distance: 0.9, estimatedMinutes: 6 },
    { stopCode: "84009", stopName: "Bedok Interchange", roadName: "Bedok Rd", sequence: 4, distance: 13.1, estimatedMinutes: 45 },
  ],
};

// ─── Mock Bookmarks ──────────────────────────────────────────────────────────

export const DEFAULT_BOOKMARKS: Bookmark[] = [
  {
    id: "bm_1",
    type: "service",
    stopCode: "08057",
    stopName: "Plaza Singapura",
    roadName: "Orchard Rd",
    serviceNo: "7",
    direction: "To Bedok Int",
    createdAt: Date.now() - 86400000,
  },
];

// ─── Frequency Labels ─────────────────────────────────────────────────────────

export const SERVICE_FREQUENCY: Record<string, string> = {
  "7": "8-12m",
  "14": "10-15m",
  "65": "12-18m",
  "106": "10-15m",
  "111": "8-12m",
  "174": "15-20m",
};

export const SERVICE_DESTINATION: Record<string, string> = {
  "7": "Bedok Int",
  "14": "Bedok Int",
  "65": "Tampines Int",
  "106": "Elias Mall",
  "111": "Toa Payoh Int",
  "174": "Ang Mo Kio",
};
