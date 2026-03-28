import { useQuery } from "@tanstack/react-query";
import { getAllBusStops } from "../api/ltaBusStops";
import {
  geocodeDestination,
  getTransitDirections,
  type LatLng,
  type RouteOption,
} from "../api/googleTrip";
import { runTripAgent } from "../api/claudeTrip";

export type { RouteOption } from "../api/googleTrip";

export interface TripPlanResult {
  boardingStop: {
    name: string;
    code: string;
    coordinate: LatLng;
  };
  destination: {
    address: string;
    coordinate: LatLng;
  };
  routes: RouteOption[];
  recommendations: string[];   // index-aligned with routes
}

export function useTripPlan(query: string, fromStopCode: string) {
  return useQuery<TripPlanResult>({
    queryKey: ["tripPlan", query, fromStopCode],
    enabled: !!query && !!fromStopCode,
    queryFn: async () => {
      const allStops = await getAllBusStops();
      const boardingStop = allStops.find((s) => s.BusStopCode === fromStopCode);
      if (!boardingStop) throw new Error(`Stop ${fromStopCode} not found`);

      const origin: LatLng = {
        latitude: boardingStop.Latitude,
        longitude: boardingStop.Longitude,
      };

      const result = await runTripAgent(
        query,
        boardingStop.Description,
        fromStopCode,
        async (destination) => {
          const geocoded = await geocodeDestination(destination);
          const routes = await getTransitDirections(origin, geocoded);
          return { routes, geocoded };
        }
      );

      return {
        boardingStop: {
          name: boardingStop.Description,
          code: fromStopCode,
          coordinate: origin,
        },
        destination: {
          address: result.destinationAddress,
          coordinate: result.destinationCoord,
        },
        routes: result.routes,
        recommendations: result.recommendations,
      };
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
