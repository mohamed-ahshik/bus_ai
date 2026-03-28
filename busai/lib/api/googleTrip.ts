export type LatLng = { latitude: number; longitude: number };

export interface GeocodeResult {
  lat: number;
  lng: number;
  formattedAddress: string;
}

export interface TransitStep {
  instruction: string;
  travelMode: "WALKING" | "TRANSIT" | string;
  durationText: string;
  distanceText: string;
  stepPolyline: LatLng[];
  transitDetails?: {
    lineName: string;
    vehicleType: string;
    lineColor: string;
    departureStop: string;
    departureStopCoord: LatLng;
    arrivalStop: string;
    arrivalStopCoord: LatLng;
    departureTimeText: string;
    numStops: number;
  };
}

export interface RouteOption {
  polylineCoords: LatLng[];
  steps: TransitStep[];
  durationText: string;
  durationSeconds: number;
  distanceText: string;
  departureTimeText: string;
  departureTimeValue: number; // unix seconds — used for dedup sorting
  arrivalTimeText: string;
  summary: string;
  firstBoardingStop: string;
  mapRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

const MAPS_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

function decodePolyline(encoded: string): LatLng[] {
  const coords: LatLng[] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;
  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte: number;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lat += result & 1 ? ~(result >> 1) : result >> 1;
    shift = 0;
    result = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lng += result & 1 ? ~(result >> 1) : result >> 1;
    coords.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
  }
  return coords;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

function computeRegion(coords: LatLng[]) {
  if (!coords.length) {
    return { latitude: 1.3521, longitude: 103.8198, latitudeDelta: 0.05, longitudeDelta: 0.05 };
  }
  const lats = coords.map((c) => c.latitude);
  const lngs = coords.map((c) => c.longitude);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const pad = 0.012;
  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta: Math.max(maxLat - minLat + pad * 2, 0.02),
    longitudeDelta: Math.max(maxLng - minLng + pad * 2, 0.02),
  };
}

function parseRoute(route: any): RouteOption {
  const leg = route.legs[0];
  const polylineCoords = decodePolyline(route.overview_polyline.points);

  const steps: TransitStep[] = (leg.steps ?? [])
    // Filter out zero-distance/zero-duration walk steps (Google sometimes emits
    // a 0 m walk when the origin coordinates are already at a bus stop)
    .filter((step: any) => {
      if (step.travel_mode !== "WALKING") return true;
      return (step.distance?.value ?? 1) > 0 && (step.duration?.value ?? 1) > 0;
    })
    .map((step: any) => {
      const base: TransitStep = {
        instruction: stripHtml(step.html_instructions ?? ""),
        travelMode: step.travel_mode,
        durationText: step.duration?.text ?? "",
        distanceText: step.distance?.text ?? "",
        stepPolyline: step.polyline?.points ? decodePolyline(step.polyline.points) : [],
      };
      if (step.travel_mode === "TRANSIT" && step.transit_details) {
        const t = step.transit_details;
        const rawColor: string = t.line?.color ?? "";
        const lineColor =
          rawColor
            ? rawColor.startsWith("#") ? rawColor : `#${rawColor}`
            : t.line?.vehicle?.type === "SUBWAY" ? "#555555" : "#22c55e";
        base.transitDetails = {
          lineName: t.line?.short_name ?? t.line?.name ?? "Bus",
          vehicleType: t.line?.vehicle?.type ?? "BUS",
          lineColor,
          departureStop: t.departure_stop?.name ?? "",
          departureStopCoord: {
            latitude: t.departure_stop?.location?.lat ?? 0,
            longitude: t.departure_stop?.location?.lng ?? 0,
          },
          arrivalStop: t.arrival_stop?.name ?? "",
          arrivalStopCoord: {
            latitude: t.arrival_stop?.location?.lat ?? 0,
            longitude: t.arrival_stop?.location?.lng ?? 0,
          },
          departureTimeText: t.departure_time?.text ?? "",
          numStops: t.num_stops ?? 0,
        };
      }
      return base;
    });

  const firstTransitStep = steps.find((s) => s.transitDetails);
  const firstBoardingStop = firstTransitStep?.transitDetails?.departureStop ?? "";

  const summary = steps
    .map((s) => {
      if (s.transitDetails) {
        return `Take ${s.transitDetails.lineName} from ${s.transitDetails.departureStop} to ${s.transitDetails.arrivalStop} (${s.transitDetails.numStops} stops, ${s.durationText})`;
      }
      return `Walk ${s.durationText}`;
    })
    .join(" → ");

  return {
    polylineCoords,
    steps,
    durationText: leg.duration?.text ?? "",
    durationSeconds: leg.duration?.value ?? 0,
    distanceText: leg.distance?.text ?? "",
    departureTimeText: leg.departure_time?.text ?? "",
    departureTimeValue: leg.departure_time?.value ?? 0,
    arrivalTimeText: leg.arrival_time?.text ?? "",
    summary,
    firstBoardingStop,
    mapRegion: computeRegion(polylineCoords),
  };
}

/**
 * Fingerprint for deduplication: each transit segment's line + boarding + alighting.
 * Routes that use the same buses between the same stops are considered identical
 * (only the departure time differs). Different boarding stops = genuinely different.
 */
function routeFingerprint(route: RouteOption): string {
  return route.steps
    .filter((s) => s.travelMode === "TRANSIT" && s.transitDetails)
    .map((s) => `${s.transitDetails!.lineName}:${s.transitDetails!.departureStop}→${s.transitDetails!.arrivalStop}`)
    .join("|");
}

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
  destination: GeocodeResult
): Promise<RouteOption[]> {
  const originStr = `${origin.latitude},${origin.longitude}`;
  const destStr = `${destination.lat},${destination.lng}`;
  const departureTime = Math.floor(Date.now() / 1000);

  const url =
    `https://maps.googleapis.com/maps/api/directions/json` +
    `?origin=${originStr}` +
    `&destination=${destStr}` +
    `&mode=transit` +
    `&region=sg` +
    `&alternatives=true` +
    `&departure_time=${departureTime}` +
    `&key=${MAPS_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Directions error: ${res.status}`);
  const data = await res.json();

  if (data.status !== "OK" || !data.routes?.length) {
    throw new Error(`Directions failed: ${data.status}`);
  }

  const parsed = (data.routes as any[]).map(parseRoute);

  // Deduplicate: same transit line/stop sequence → keep the earliest departure
  const seen = new Map<string, RouteOption>();
  for (const route of parsed) {
    const fp = routeFingerprint(route);
    const existing = seen.get(fp);
    if (!existing || route.departureTimeValue < existing.departureTimeValue) {
      seen.set(fp, route);
    }
  }

  return Array.from(seen.values())
    .sort((a, b) => a.durationSeconds - b.durationSeconds)
    .slice(0, 3);
}
