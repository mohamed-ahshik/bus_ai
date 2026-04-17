import { useState, useEffect, useCallback, useMemo } from "react";
import * as Location from "expo-location";
import { useQuery } from "@tanstack/react-query";
import type { BusStop } from "../types";
import { getAllBusStops } from "../api/ltaBusStops";
import { fetchNearbyBusStopsFromSupabase } from "../api/nearbyBusStopsSupabase";

interface LocationState {
  latitude: number;
  longitude: number;
  address?: string;
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function fetchLocation(): Promise<LocationState> {
  const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
  const { latitude, longitude } = pos.coords;
  let address = "Your Location";
  try {
    const [geo] = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (geo) {
      address = [geo.streetNumber, geo.street].filter(Boolean).join(" ") || geo.name || "Your Location";
    }
  } catch {}
  return { latitude, longitude, address };
}

export function useNearestStops() {
  const [location, setLocation] = useState<LocationState | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const updateLocation = useCallback(async (): Promise<LocationState | null> => {
    setIsLocating(true);
    try {
      const loc = await fetchLocation();
      setLocation(loc);
      return loc;
    } catch {
      setLocationError("Could not get location");
      const fallback: LocationState = {
        latitude: 1.3521,
        longitude: 103.8198,
        address: "Singapore",
      };
      setLocation(fallback);
      return fallback;
    } finally {
      setIsLocating(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationError("Location permission denied");
        setLocation({ latitude: 1.3521, longitude: 103.8198, address: "Singapore" });
        return;
      }
      setPermissionGranted(true);
      updateLocation();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { data: stops, isLoading, refetch: refetchStops } = useQuery<BusStop[]>({
    queryKey: ["nearestStops", location?.latitude, location?.longitude],
    enabled: !!location,
    queryFn: async () => {
      if (!location) return [];
      const fromDb = await fetchNearbyBusStopsFromSupabase(
        location.latitude,
        location.longitude,
        80,
      );
      if (fromDb?.length) {
        return fromDb.map((stop) => ({
          ...stop,
          distance:
            stop.distance ??
            parseFloat(
              haversineDistance(
                location.latitude,
                location.longitude,
                stop.Latitude,
                stop.Longitude,
              ).toFixed(2),
            ),
        }));
      }
      const allStops = await getAllBusStops();
      return allStops
        .map((stop) => ({
          ...stop,
          distance: parseFloat(
            haversineDistance(location.latitude, location.longitude, stop.Latitude, stop.Longitude).toFixed(2)
          ),
        }))
        .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
    },
    staleTime: 60000,
  });

  const list = stops ?? [];
  /** Nearest few for the scroll list + prefetch only (map uses full `stops`). */
  const nearestStops = useMemo(() => list.slice(0, 6), [list]);

  const refetch = useCallback(async (): Promise<LocationState | null> => {
    const loc = await updateLocation();
    await refetchStops();
    return loc;
  }, [updateLocation, refetchStops]);

  return {
    stops: list,
    nearestStops,
    location,
    locationError,
    permissionGranted,
    isLoading: isLoading || isLocating,
    refetch,
  };
}
