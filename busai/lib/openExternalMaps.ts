import { Alert, Linking, Platform } from "react-native";
import type { LatLng } from "./api/googleTrip";

/** Maps URLs: max intermediate waypoints (docs: up to 9 on many clients). */
const MAX_DRIVING_WAYPOINTS = 9;

const COORD_EPS = 1.2e-4;

export type OpenTransitDirectionsOptions = {
  destinationPlaceId?: string;
  transitDepartureTimeUnix?: number;
};

export type OpenDrivingCorridorOptions = {
  destinationPlaceId?: string;
};

function fmtCoord(c: LatLng): string {
  return `${c.latitude.toFixed(6)},${c.longitude.toFixed(6)}`;
}

function near(a: LatLng, b: LatLng): boolean {
  return (
    Math.abs(a.latitude - b.latitude) < COORD_EPS && Math.abs(a.longitude - b.longitude) < COORD_EPS
  );
}

function validCoord(c: LatLng): boolean {
  return (
    Number.isFinite(c.latitude) &&
    Number.isFinite(c.longitude) &&
    !(Math.abs(c.latitude) < 1e-8 && Math.abs(c.longitude) < 1e-8)
  );
}

/**
 * Picks interior anchors along the decoded overview polyline (~¼, ½, ¾, etc.),
 * per the common “don’t send 100 points” Maps URL pattern for driving handoff.
 */
export function polylineQuarterAnchorsForDrivingHandoff(coords: LatLng[]): LatLng[] {
  const n = coords.length;
  if (n < 3) return [];

  const fractions = [1 / 8, 1 / 4, 3 / 8, 1 / 2, 5 / 8, 3 / 4, 7 / 8];
  const out: LatLng[] = [];
  const lastIdx = n - 1;

  for (const f of fractions) {
    const idx = Math.min(lastIdx - 1, Math.max(1, Math.round(lastIdx * f)));
    const p = coords[idx]!;
    if (!validCoord(p)) continue;
    const prev = out[out.length - 1];
    if (!prev || !near(prev, p)) out.push(p);
    if (out.length >= MAX_DRIVING_WAYPOINTS) break;
  }

  return out.slice(0, MAX_DRIVING_WAYPOINTS);
}

function filterWaypointsAgainstEndpoints(
  origin: LatLng,
  destination: LatLng,
  waypoints: LatLng[],
): LatLng[] {
  return waypoints.filter((w) => validCoord(w) && !near(w, origin) && !near(w, destination));
}

function buildGoogleTransitDirectionsUrl(
  origin: LatLng,
  destination: LatLng,
  options?: OpenTransitDirectionsOptions,
): string {
  const params = new URLSearchParams();
  params.set("api", "1");
  params.set("origin", fmtCoord(origin));
  params.set("destination", fmtCoord(destination));
  params.set("travelmode", "transit");

  const pid = options?.destinationPlaceId?.trim();
  if (pid) {
    params.set("destination_place_id", pid);
  }

  const dep = options?.transitDepartureTimeUnix;
  if (typeof dep === "number" && Number.isFinite(dep) && dep > 0) {
    params.set("departure_time", String(Math.floor(dep)));
  }

  params.set("utm_source", "busai");
  params.set("utm_campaign", "transit_open_external");

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

function buildGoogleDrivingCorridorUrl(
  origin: LatLng,
  destination: LatLng,
  waypoints: LatLng[],
  options?: OpenDrivingCorridorOptions,
): string {
  const params = new URLSearchParams();
  params.set("api", "1");
  params.set("origin", fmtCoord(origin));
  params.set("destination", fmtCoord(destination));
  params.set("travelmode", "driving");

  const pid = options?.destinationPlaceId?.trim();
  if (pid) {
    params.set("destination_place_id", pid);
  }

  const wps = filterWaypointsAgainstEndpoints(origin, destination, waypoints).slice(
    0,
    MAX_DRIVING_WAYPOINTS,
  );
  if (wps.length > 0) {
    params.set("waypoints", wps.map(fmtCoord).join("|"));
  }

  params.set("utm_source", "busai");
  params.set("utm_campaign", "driving_corridor_open_external");

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/**
 * Opens Apple Maps (iOS) or Google Maps with **transit** (no polyline waypoints —
 * those are unreliable for transit and create odd multi-stop labels).
 */
export function openTransitDirectionsInSystemMaps(
  origin: LatLng,
  destination: LatLng,
  options?: OpenTransitDirectionsOptions,
): void {
  const google = buildGoogleTransitDirectionsUrl(origin, destination, options);
  const o = fmtCoord(origin);
  const d = fmtCoord(destination);
  const apple = `http://maps.apple.com/?saddr=${encodeURIComponent(o)}&daddr=${encodeURIComponent(d)}&dirflg=r`;

  const open = (url: string) => Linking.openURL(url);

  if (Platform.OS === "ios") {
    open(apple).catch(() => {
      open(google).catch(() =>
        Alert.alert("Could not open Maps", "Try again or open Google Maps manually."),
      );
    });
  } else {
    open(google).catch(() =>
      Alert.alert("Could not open Maps", "Check that a browser or maps app is available."),
    );
  }
}

/**
 * Opens Google Maps with **driving** directions and **waypoints** sampled along
 * your route polyline so the path is pulled through the same corridor (not transit).
 */
export function openDrivingCorridorInGoogleMaps(
  origin: LatLng,
  destination: LatLng,
  polylineCoords: LatLng[],
  options?: OpenDrivingCorridorOptions,
): void {
  const anchors = polylineQuarterAnchorsForDrivingHandoff(polylineCoords);
  const url = buildGoogleDrivingCorridorUrl(origin, destination, anchors, options);
  Linking.openURL(url).catch(() =>
    Alert.alert("Could not open Maps", "Check that Google Maps or a browser is available."),
  );
}
