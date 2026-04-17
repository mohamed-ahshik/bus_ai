export type { LatLng, GeocodeResult, TransitStep, RouteOption } from "./googleRoutesTransit";
import {
  computeTransitRoutes,
  type GeocodeResult,
  type LatLng,
  type RouteOption,
} from "./googleRoutesTransit";

const MAPS_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

export async function geocodeDestination(query: string): Promise<GeocodeResult> {
  const q = encodeURIComponent(`${query} Singapore`);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${q}&components=country:SG&key=${MAPS_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Geocode error: ${res.status}`);
  const data = await res.json();
  if (data.status !== "OK" || !data.results?.length) {
    throw new Error(`Geocode failed: ${data.status}`);
  }
  const loc = data.results[0].geometry.location;
  return {
    lat: loc.lat,
    lng: loc.lng,
    formattedAddress: data.results[0].formatted_address,
  };
}

export async function getTransitDirections(
  origin: LatLng,
  destination: GeocodeResult,
): Promise<RouteOption[]> {
  return computeTransitRoutes(origin, destination, MAPS_KEY);
}
