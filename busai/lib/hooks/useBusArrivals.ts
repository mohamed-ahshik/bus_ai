import { useQuery } from "@tanstack/react-query";
import type { BusArrivalResponse } from "../types";

const API_URL = "https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival";
const API_KEY = process.env.EXPO_PUBLIC_LTA_DATAMALL_KEY ?? "";

function computeArrivalMinutes(isoString: string): number {
  if (!isoString) return -1;
  const diff = new Date(isoString).getTime() - Date.now();
  return Math.max(0, Math.round(diff / 60000));
}

function withComputedMinutes(arrival: BusArrivalResponse): BusArrivalResponse {
  return {
    ...arrival,
    Services: arrival.Services.map((svc) => ({
      ...svc,
      NextBus: { ...svc.NextBus, arrivalMinutes: computeArrivalMinutes(svc.NextBus.EstimatedArrival) },
      NextBus2: { ...svc.NextBus2, arrivalMinutes: computeArrivalMinutes(svc.NextBus2.EstimatedArrival) },
      NextBus3: { ...svc.NextBus3, arrivalMinutes: computeArrivalMinutes(svc.NextBus3.EstimatedArrival) },
    })),
  };
}

export function useBusArrivals(stopCode: string) {
  return useQuery<BusArrivalResponse>({
    queryKey: ["busArrivals", stopCode],
    enabled: !!stopCode && !!API_KEY,
    queryFn: async () => {
      const res = await fetch(`${API_URL}?BusStopCode=${stopCode}`, {
        headers: { AccountKey: API_KEY, accept: "application/json" },
      });
      if (!res.ok) throw new Error(`LTA BusArrival error: ${res.status}`);
      const data: BusArrivalResponse = await res.json();
      return withComputedMinutes(data);
    },
    refetchInterval: 30000,
    staleTime: 25000,
  });
}

export function formatArrivalMinutes(minutes: number | undefined): string {
  if (minutes === undefined || minutes < 0) return "—";
  if (minutes === 0) return "Arr";
  return `${minutes}`;
}

export function getLoadColor(load: string): string {
  switch (load) {
    case "SEA": return "#22c55e"; // green-500
    case "SDA": return "#eab308"; // yellow-500
    case "LSD": return "#ef4444"; // red-500
    default: return "#9e9e9e";
  }
}

export function getLoadLabel(load: string): string {
  switch (load) {
    case "SEA": return "Seats Avail.";
    case "SDA": return "Standing";
    case "LSD": return "Limited";
    default: return "N/A";
  }
}

export function getBusTypeLabel(type: string): string {
  switch (type) {
    case "DD": return "Double Deck";
    case "SD": return "Single Deck";
    case "BD": return "Bendy";
    default: return type;
  }
}
