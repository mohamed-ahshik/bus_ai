/**
 * Google Routes API v2 (`computeRoutes`) for transit — replaces legacy Directions API.
 * Display attribution where results are shown: "Powered by Google, ©YEAR Google".
 */

export type LatLng = { latitude: number; longitude: number };

export interface GeocodeResult {
  lat: number;
  lng: number;
  formattedAddress: string;
}

export interface TransitStep {
  instruction: string;
  travelMode: string;
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
    /** Alight clock for this leg (from Routes API); used after stripping trailing walks. */
    arrivalTimeText?: string;
    numStops: number;
    /** e.g. "every 12 min" from Routes API `headway`. */
    headwayText?: string;
  };
}

export interface RouteOption {
  polylineCoords: LatLng[];
  steps: TransitStep[];
  durationText: string;
  durationSeconds: number;
  distanceText: string;
  departureTimeText: string;
  departureTimeValue: number;
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

const ROUTES_COMPUTE = "https://routes.googleapis.com/directions/v2:computeRoutes";

const ROUTES_FIELD_MASK = [
  "routes.distanceMeters",
  "routes.duration",
  "routes.polyline",
  "routes.localizedValues",
  "routes.legs.distanceMeters",
  "routes.legs.duration",
  "routes.legs.polyline",
  "routes.legs.localizedValues",
  "routes.legs.steps.distanceMeters",
  /** Step-level `duration` is not a valid Routes v2 field mask path; use `staticDuration`. */
  "routes.legs.steps.staticDuration",
  "routes.legs.steps.polyline",
  "routes.legs.steps.navigationInstruction",
  "routes.legs.steps.startLocation",
  "routes.legs.steps.endLocation",
  "routes.legs.steps.travelMode",
  "routes.legs.steps.localizedValues",
  "routes.legs.steps.transitDetails.stopDetails.departureStop",
  "routes.legs.steps.transitDetails.stopDetails.arrivalStop",
  "routes.legs.steps.transitDetails.stopDetails.departureTime",
  "routes.legs.steps.transitDetails.stopDetails.arrivalTime",
  "routes.legs.steps.transitDetails.localizedValues.departureTime",
  "routes.legs.steps.transitDetails.localizedValues.arrivalTime",
  "routes.legs.steps.transitDetails.transitLine.name",
  "routes.legs.steps.transitDetails.transitLine.nameShort",
  "routes.legs.steps.transitDetails.transitLine.color",
  "routes.legs.steps.transitDetails.transitLine.vehicle",
  "routes.legs.steps.transitDetails.headway",
  "routes.legs.steps.transitDetails.stopCount",
].join(",");

/** How many distinct transit itineraries to return (Google Maps often shows several). */
const MAX_TRANSIT_ROUTE_OPTIONS = 5;

export type ComputeTransitRoutesOptions = {
  /**
   * Map / station-picker flow: ask Google for rail-only itineraries and drop any route
   * that still contains bus, LRT, or other non-rapid-transit legs after parsing.
   */
  mrtSubwayOnly?: boolean;
};

/**
 * `transitPreferences.allowedTravelModes` (Routes API v2 `TransitTravelMode`).
 * Do not use `RAIL` here — it includes LIGHT_RAIL. Post-parse filter drops any
 * non-metro vehicle types (e.g. LIGHT_RAIL legs) if they slip through.
 */
const MRT_ONLY_ALLOWED_GOOGLE_MODES = ["SUBWAY", "TRAIN"] as const;

/** Parsed `transitLine.vehicle.type` values treated as MRT / heavy metro (not bus or LRT). */
const MRT_ONLY_VEHICLE_TYPES = new Set<string>([
  "SUBWAY",
  "HEAVY_RAIL",
  "TRAIN",
  "HIGH_SPEED_TRAIN",
  "COMMUTER_TRAIN",
]);

function routeUsesOnlyMrtTransitLegs(route: RouteOption): boolean {
  let sawRailTransit = false;
  for (const step of route.steps) {
    if (step.travelMode !== "TRANSIT") continue;
    if (!step.transitDetails) return false;
    sawRailTransit = true;
    const vt = step.transitDetails.vehicleType;
    if (!MRT_ONLY_VEHICLE_TYPES.has(vt)) return false;
  }
  return sawRailTransit;
}

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

function parseDurationSeconds(d: string | undefined): number {
  if (!d) return 0;
  const m = String(d).match(/^(\d+)s$/);
  if (m) return parseInt(m[1]!, 10);
  const n = parseInt(String(d).replace(/\D/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}

function formatDurationSeconds(sec: number): string {
  if (sec <= 0) return "—";
  if (sec < 3600) return `${Math.max(1, Math.round(sec / 60))} mins`;
  const h = Math.floor(sec / 3600);
  const m = Math.round((sec % 3600) / 60);
  return m > 0 ? `${h} hr ${m} min` : `${h} hr`;
}

function formatDistanceMeters(m: number): string {
  if (m < 1000) return `${Math.round(m)} m`;
  return `${(m / 1000).toFixed(1)} km`;
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

function latLngFromLocation(loc: any): LatLng | null {
  const ll = loc?.latLng ?? loc;
  if (ll && typeof ll.latitude === "number" && typeof ll.longitude === "number") {
    return { latitude: ll.latitude, longitude: ll.longitude };
  }
  return null;
}

function rfc3339ToUnixSeconds(iso: string | undefined): number {
  if (!iso) return 0;
  const t = Date.parse(iso);
  return Number.isFinite(t) ? Math.floor(t / 1000) : 0;
}

function formatClockFromMs(ms: number): string {
  if (!Number.isFinite(ms) || ms <= 0) return "";
  return new Date(ms).toLocaleTimeString("en-SG", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function leadingWalkSecondsFrom(rawSteps: any[]): number {
  let n = 0;
  for (const step of rawSteps) {
    const mode = String(step?.travelMode ?? "").toUpperCase();
    if (mode === "WALK") {
      n += parseDurationSeconds(step.staticDuration ?? step.duration);
    } else {
      break;
    }
  }
  return n;
}

function trailingWalkSecondsFrom(rawSteps: any[]): number {
  let n = 0;
  for (let i = rawSteps.length - 1; i >= 0; i--) {
    const step = rawSteps[i]!;
    const mode = String(step?.travelMode ?? "").toUpperCase();
    if (mode === "WALK") {
      n += parseDurationSeconds(step.staticDuration ?? step.duration);
    } else {
      break;
    }
  }
  return n;
}

function firstTransitDepartureIso(rawSteps: any[]): string | undefined {
  for (const step of rawSteps) {
    if (String(step?.travelMode ?? "").toUpperCase() !== "TRANSIT") continue;
    const sd = step.transitDetails?.stopDetails ?? {};
    const iso = sd.departureTime;
    if (typeof iso === "string" && iso.length > 0) return iso;
  }
  return undefined;
}

function lastTransitArrivalIso(rawSteps: any[]): string | undefined {
  for (let i = rawSteps.length - 1; i >= 0; i--) {
    const step = rawSteps[i]!;
    if (String(step?.travelMode ?? "").toUpperCase() !== "TRANSIT") continue;
    const sd = step.transitDetails?.stopDetails ?? {};
    const iso = sd.arrivalTime;
    if (typeof iso === "string" && iso.length > 0) return iso;
  }
  return undefined;
}

/** Whole-trip window: first boarding minus leading walks through last alighting plus trailing walks. */
function formatHeadwayInterval(d: string | undefined): string | undefined {
  if (!d) return undefined;
  const sec = parseDurationSeconds(d);
  if (sec < 60) return undefined;
  const min = Math.round(sec / 60);
  if (min >= 60) {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return m ? `every ${h} hr ${m} min` : `every ${h} hr`;
  }
  return `every ${min} min`;
}

function journeyClockLabels(rawSteps: any[]): { start: string; end: string } {
  const depIso = firstTransitDepartureIso(rawSteps);
  const arrIso = lastTransitArrivalIso(rawSteps);
  const lead = leadingWalkSecondsFrom(rawSteps);
  const trail = trailingWalkSecondsFrom(rawSteps);
  const startMs = depIso ? Date.parse(depIso) - lead * 1000 : NaN;
  const endMs = arrIso ? Date.parse(arrIso) + trail * 1000 : NaN;
  return {
    start: Number.isFinite(startMs) ? formatClockFromMs(startMs) : "",
    end: Number.isFinite(endMs) ? formatClockFromMs(endMs) : "",
  };
}

function normalizeTravelMode(mode: string | undefined): string {
  const m = (mode ?? "").toUpperCase();
  if (m === "WALK") return "WALKING";
  return m || "UNKNOWN";
}

function parseRoutesApiRoute(route: any): RouteOption {
  const leg = route.legs?.[0] ?? {};
  const overview = route.polyline?.encodedPolyline
    ? decodePolyline(route.polyline.encodedPolyline)
    : [];

  const rawSteps: any[] = leg.steps ?? [];
  const steps: TransitStep[] = [];

  for (const step of rawSteps) {
    const travelMode = normalizeTravelMode(step.travelMode);
    const distM = typeof step.distanceMeters === "number" ? step.distanceMeters : 0;
    const durSec = parseDurationSeconds(step.staticDuration ?? step.duration);
    if (travelMode === "WALKING" && distM <= 0 && durSec <= 0) continue;

    const navInstr = step.navigationInstruction?.instructions ?? "";
    const instruction = stripHtml(String(navInstr || ""));

    const enc = step.polyline?.encodedPolyline;
    const stepPolyline = enc ? decodePolyline(enc) : [];

    const base: TransitStep = {
      instruction,
      travelMode,
      durationText: step.localizedValues?.duration?.text ?? formatDurationSeconds(durSec),
      distanceText: step.localizedValues?.distance?.text ?? formatDistanceMeters(distM),
      stepPolyline,
    };

    const td = step.transitDetails;
    if (travelMode === "TRANSIT" && td) {
      const sd = td.stopDetails ?? {};
      const depStop = sd.departureStop ?? td.departureStop;
      const arrStop = sd.arrivalStop ?? td.arrivalStop;
      const line = td.transitLine ?? {};
      const rawColor: string = line.color ?? "";
      const vehicleType = line.vehicle?.type ?? "BUS";
      const lineColor = rawColor
        ? rawColor.startsWith("#")
          ? rawColor
          : `#${rawColor}`
        : vehicleType === "SUBWAY"
          ? "#555555"
          : "#22c55e";

      const depLL = latLngFromLocation(depStop?.location) ?? { latitude: 0, longitude: 0 };
      const arrLL = latLngFromLocation(arrStop?.location) ?? { latitude: 0, longitude: 0 };

      const depIso = typeof sd.departureTime === "string" ? sd.departureTime : "";
      const depText =
        td.localizedValues?.departureTime?.time?.text ??
        (depIso ? formatClockFromMs(Date.parse(depIso)) : "");

      const arrIso = typeof sd.arrivalTime === "string" ? sd.arrivalTime : "";
      const arrText =
        td.localizedValues?.arrivalTime?.time?.text ??
        (arrIso ? formatClockFromMs(Date.parse(arrIso)) : "");

      const headwayText = formatHeadwayInterval(td.headway);

      base.transitDetails = {
        lineName: line.nameShort ?? line.name ?? "Transit",
        vehicleType,
        lineColor,
        departureStop: depStop?.name ?? "",
        departureStopCoord: depLL,
        arrivalStop: arrStop?.name ?? "",
        arrivalStopCoord: arrLL,
        departureTimeText: depText,
        ...(arrText ? { arrivalTimeText: arrText } : {}),
        numStops: typeof td.stopCount === "number" ? td.stopCount : 0,
        ...(headwayText ? { headwayText } : {}),
      };
    }

    steps.push(base);
  }

  const polylineCoords = overview.length > 0
    ? overview
    : steps.flatMap((s) => s.stepPolyline);

  const legDist = typeof leg.distanceMeters === "number" ? leg.distanceMeters : 0;
  const legDurSec = parseDurationSeconds(leg.duration);

  const firstTransit = steps.find((s) => s.transitDetails);
  const depUnix = (() => {
    for (const step of rawSteps) {
      const td = step.transitDetails;
      if (!td) continue;
      const sd = td.stopDetails ?? {};
      const u = rfc3339ToUnixSeconds(sd.departureTime ?? td.departureTime);
      if (u > 0) return u;
    }
    return 0;
  })();

  const { start: journeyStartLabel, end: journeyEndLabel } = journeyClockLabels(rawSteps);

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
    durationText: leg.localizedValues?.duration?.text ?? formatDurationSeconds(legDurSec),
    durationSeconds: legDurSec,
    distanceText: leg.localizedValues?.distance?.text ?? formatDistanceMeters(legDist),
    departureTimeText: journeyStartLabel,
    departureTimeValue: depUnix,
    arrivalTimeText: journeyEndLabel,
    summary,
    firstBoardingStop: firstTransit?.transitDetails?.departureStop ?? "",
    mapRegion: computeRegion(polylineCoords),
  };
}

function parseStepDurationSecondsFromText(durationText: string): number {
  const t = (durationText || "").toLowerCase();
  let sec = 0;
  const h = t.match(/(\d+)\s*hr/);
  if (h) sec += parseInt(h[1]!, 10) * 3600;
  const m = t.match(/(\d+)\s*min/);
  if (m) sec += parseInt(m[1]!, 10) * 60;
  return Math.max(sec, 30);
}

function parseStepDistanceMetersFromText(distanceText: string): number {
  const t = distanceText || "";
  const km = t.match(/([\d.]+)\s*km/i);
  if (km) return Math.round(parseFloat(km[1]!) * 1000);
  const m = t.match(/(\d+)\s*m(?:\s|$|,)/i);
  return m ? parseInt(m[1]!, 10) : 0;
}

/** Map flow: station-to-station — drop access walks only at start/end of the leg. */
function stripMrtSurroundingWalks(route: RouteOption): RouteOption {
  let steps = [...route.steps];
  while (steps.length > 0 && steps[0]!.travelMode === "WALKING") steps.shift();
  while (steps.length > 0 && steps[steps.length - 1]!.travelMode === "WALKING") steps.pop();
  if (steps.length === route.steps.length) return route;
  if (!steps.some((s) => s.travelMode === "TRANSIT" && s.transitDetails)) return route;

  let durationSeconds = 0;
  let distanceM = 0;
  for (const s of steps) {
    durationSeconds += parseStepDurationSecondsFromText(s.durationText);
    distanceM += parseStepDistanceMetersFromText(s.distanceText);
  }

  const polylineCoords = steps.flatMap((s) => s.stepPolyline);

  const transitSteps = steps.filter((s) => s.travelMode === "TRANSIT" && s.transitDetails);
  const firstT = transitSteps[0];
  const lastT = transitSteps[transitSteps.length - 1];

  const departureTimeText = firstT?.transitDetails?.departureTimeText ?? route.departureTimeText;
  const arrivalTimeText = lastT?.transitDetails?.arrivalTimeText ?? route.arrivalTimeText;

  const summary = steps
    .map((s) => {
      if (s.transitDetails) {
        return `Take ${s.transitDetails.lineName} from ${s.transitDetails.departureStop} to ${s.transitDetails.arrivalStop} (${s.transitDetails.numStops} stops, ${s.durationText})`;
      }
      return `Walk ${s.durationText}`;
    })
    .join(" → ");

  const coords = polylineCoords.length > 0 ? polylineCoords : route.polylineCoords;

  return {
    ...route,
    steps,
    polylineCoords: coords,
    durationSeconds,
    durationText: formatDurationSeconds(durationSeconds),
    distanceText: formatDistanceMeters(distanceM),
    departureTimeText,
    arrivalTimeText,
    summary,
    firstBoardingStop: firstT?.transitDetails?.departureStop ?? route.firstBoardingStop,
    mapRegion: computeRegion(coords),
  };
}

function routeFingerprint(route: RouteOption): string {
  return route.steps
    .filter((s) => s.travelMode === "TRANSIT" && s.transitDetails)
    .map((s) => `${s.transitDetails!.lineName}:${s.transitDetails!.departureStop}→${s.transitDetails!.arrivalStop}`)
    .join("|");
}

export async function computeTransitRoutes(
  origin: LatLng,
  destination: GeocodeResult,
  apiKey: string,
  options?: ComputeTransitRoutesOptions,
): Promise<RouteOption[]> {
  if (!apiKey) throw new Error("Google Maps API key is not configured");

  const departureTime = new Date().toISOString();

  const body: Record<string, unknown> = {
    origin: {
      location: { latLng: { latitude: origin.latitude, longitude: origin.longitude } },
    },
    destination: {
      location: { latLng: { latitude: destination.lat, longitude: destination.lng } },
    },
    travelMode: "TRANSIT",
    computeAlternativeRoutes: true,
    departureTime,
    languageCode: "en",
    regionCode: "SG",
    units: "METRIC",
  };
  if (options?.mrtSubwayOnly) {
    body.transitPreferences = {
      allowedTravelModes: [...MRT_ONLY_ALLOWED_GOOGLE_MODES],
    };
  }

  const res = await fetch(ROUTES_COMPUTE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": ROUTES_FIELD_MASK,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => res.statusText);
    throw new Error(`Routes API error: ${res.status} ${errText}`);
  }

  const data = await res.json();
  const routes = data.routes as any[] | undefined;
  if (!routes?.length) {
    if (options?.mrtSubwayOnly) return [];
    throw new Error("Routes API returned no routes");
  }

  let parsed = routes.map(parseRoutesApiRoute);
  if (options?.mrtSubwayOnly) {
    parsed = parsed.filter(routeUsesOnlyMrtTransitLegs).map(stripMrtSurroundingWalks);
  }
  if (!parsed.length) {
    if (options?.mrtSubwayOnly) return [];
    throw new Error("Routes API returned no routes");
  }

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
    .slice(0, MAX_TRANSIT_ROUTE_OPTIONS);
}
