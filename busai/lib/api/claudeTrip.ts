import type { LatLng, RouteOption, GeocodeResult } from "./googleTrip";
import { getAllBusStops } from "./ltaBusStops";
import type { BusStop } from "../types";

const ANTHROPIC_KEY = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY ?? "";
const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-6";

export interface AgentTripResult {
  routes: RouteOption[];
  recommendations: string[];   // one entry per route, index-aligned
  destinationAddress: string;
  destinationCoord: LatLng;
}

type DirectionsExecutor = (
  destination: string
) => Promise<{ routes: RouteOption[]; geocoded: GeocodeResult }>;

const SYSTEM_PROMPT = `You are OmniBus AI, a Singapore public transport trip planner.

When the user asks how to get somewhere or mentions a destination:
1. Call the get_directions tool with the cleaned-up destination name.
2. After receiving the routes, write a separate 1–2 sentence recommendation for EACH route following this exact structure:
   "From [origin_stop] (Bus Stop [origin_code]), walk [walk_duration] to [boards_at] (Bus Stop [boards_at_code]), then take [line] for [num_stops] stops. [Total_duration] total — [short friendly tip]!"
   - Always include the bus stop name AND code in parentheses for every stop mentioned.
   - Use **bold** markdown for bus/MRT line names, stop names, and journey time.
   - If there are multiple transit legs (transfers), mention each boarding stop and code.
   - Be friendly and specific, like a local Singaporean.
   - Keep each recommendation under 60 words.
   - Separate each recommendation with exactly "---ROUTE---" on its own line.
   - Output ONLY the recommendations separated by ---ROUTE--- with no extra text before or after.

If the user's message is NOT a trip request (e.g. a general question), respond conversationally without calling any tool.`;

// Find the nearest LTA bus stop to a given coordinate
function findNearestStopCode(
  coord: LatLng,
  stops: BusStop[]
): { code: string; name: string } {
  let best = stops[0];
  let bestDist = Infinity;
  for (const s of stops) {
    const dlat = s.Latitude - coord.latitude;
    const dlng = s.Longitude - coord.longitude;
    const dist = dlat * dlat + dlng * dlng; // squared distance — no sqrt needed for comparison
    if (dist < bestDist) {
      bestDist = dist;
      best = s;
    }
  }
  return { code: best.BusStopCode, name: best.Description };
}

const GET_DIRECTIONS_TOOL = {
  name: "get_directions",
  description:
    "Get real-time transit directions from the user's current bus stop to a destination in Singapore. Call this whenever the user wants to travel somewhere.",
  input_schema: {
    type: "object",
    properties: {
      destination: {
        type: "string",
        description:
          "The destination place name or address in Singapore (e.g. 'VivoCity', 'Changi Airport Terminal 3', 'National Museum')",
      },
    },
    required: ["destination"],
  },
};

async function callClaude(body: object): Promise<any> {
  const res = await fetch(ANTHROPIC_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text().catch(() => String(res.status));
    throw new Error(`Claude API error: ${err}`);
  }
  return res.json();
}

export async function runTripAgent(
  userQuery: string,
  boardingStopName: string,
  boardingStopCode: string,
  executeDirections: DirectionsExecutor
): Promise<AgentTripResult> {
  // No API key — fall back to direct Google call, no AI recommendation
  if (!ANTHROPIC_KEY) {
    const { routes, geocoded } = await executeDirections(userQuery);
    return {
      routes,
      recommendations: routes.map(
        (r, i) =>
          `Route ${i + 1}: Board from ${boardingStopName} and follow the highlighted route. Journey takes ${r.durationText}.`
      ),
      destinationAddress: geocoded.formattedAddress,
      destinationCoord: { latitude: geocoded.lat, longitude: geocoded.lng },
    };
  }

  const userMessage = `I'm currently at ${boardingStopName} (Bus Stop ${boardingStopCode}). ${userQuery}`;

  // ── Turn 1: Send query with tool definition ────────────────────────────────
  const turn1Data = await callClaude({
    model: MODEL,
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    tools: [GET_DIRECTIONS_TOOL],
    messages: [{ role: "user", content: userMessage }],
  });

  const turn1Content: any[] = turn1Data.content ?? [];
  const toolUseBlock = turn1Content.find((b: any) => b.type === "tool_use");

  // ── Claude returned text only (not a trip query) ───────────────────────────
  if (!toolUseBlock) {
    const textBlock = turn1Content.find((b: any) => b.type === "text");
    const text: string = textBlock?.text ?? "Tell me where you'd like to go!";
    // Still try to get directions using the raw query as a best-effort
    try {
      const { routes, geocoded } = await executeDirections(userQuery);
      return {
        routes,
        recommendations: routes.length > 0 ? [text] : [],
        destinationAddress: geocoded.formattedAddress,
        destinationCoord: { latitude: geocoded.lat, longitude: geocoded.lng },
      };
    } catch {
      return {
        routes: [],
        recommendations: [text],
        destinationAddress: userQuery,
        destinationCoord: { latitude: 1.3521, longitude: 103.8198 },
      };
    }
  }

  // ── Execute the tool: geocode + directions ─────────────────────────────────
  const destination: string = toolUseBlock.input?.destination ?? userQuery;
  const { routes, geocoded } = await executeDirections(destination);

  // Load the LTA bus stop list so we can resolve stop codes from coordinates
  const allStops = await getAllBusStops().catch(() => [] as BusStop[]);

  // Format rich route data for Claude, including stop codes via proximity lookup
  const routesSummary = routes.map((r, i) => {
    const walkStep = r.steps.find((s) => s.travelMode === "WALKING");
    const transitSteps = r.steps.filter(
      (s) => s.travelMode === "TRANSIT" && s.transitDetails
    );

    const transit_lines = transitSteps.map((s) => {
      const td = s.transitDetails!;
      const depStop = allStops.length
        ? findNearestStopCode(td.departureStopCoord, allStops)
        : { code: "—", name: td.departureStop };
      const arrStop = allStops.length
        ? findNearestStopCode(td.arrivalStopCoord, allStops)
        : { code: "—", name: td.arrivalStop };
      return {
        line: td.lineName,
        vehicle: td.vehicleType,
        from: td.departureStop,
        from_code: depStop.code,
        to: td.arrivalStop,
        to_code: arrStop.code,
        num_stops: td.numStops,
        duration: s.durationText,
        departs_at: td.departureTimeText,
      };
    });

    return {
      route: i + 1,
      origin_stop: boardingStopName,
      origin_code: boardingStopCode,
      walk_to_boarding: walkStep
        ? { duration: walkStep.durationText, distance: walkStep.distanceText }
        : null,
      boards_at: r.firstBoardingStop || boardingStopName,
      boards_at_code: transit_lines[0]?.from_code ?? boardingStopCode,
      transit_lines,
      total_duration: r.durationText,
      departure: r.departureTimeText || "Now",
      arrival: r.arrivalTimeText || "",
    };
  });

  const toolResult = JSON.stringify({
    destination_address: geocoded.formattedAddress,
    routes: routesSummary,
  });

  // ── Turn 2: Send tool result, get per-route recommendations ─────────────
  const turn2Data = await callClaude({
    model: MODEL,
    max_tokens: 512,
    system: SYSTEM_PROMPT,
    tools: [GET_DIRECTIONS_TOOL],
    messages: [
      { role: "user", content: userMessage },
      { role: "assistant", content: turn1Content },
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: toolUseBlock.id,
            content: toolResult,
          },
        ],
      },
    ],
  });

  const turn2Content: any[] = turn2Data.content ?? [];
  const finalText = turn2Content.find((b: any) => b.type === "text");
  const rawText: string = finalText?.text?.trim() ?? "";

  // Split on the ---ROUTE--- delimiter; fall back to a single generic rec if
  // Claude didn't follow the format (e.g. only one route returned).
  let recommendations: string[] = rawText
    .split(/---ROUTE---/i)
    .map((s) => s.trim())
    .filter(Boolean);

  // Safety: ensure we always have at least one entry per route
  if (recommendations.length === 0) {
    recommendations = routes.map((_, i) => `Route ${i + 1} — follow the map!`);
  } else if (recommendations.length < routes.length) {
    // Pad missing entries with a generic fallback
    while (recommendations.length < routes.length) {
      recommendations.push(`Route ${recommendations.length + 1} — follow the map!`);
    }
  }

  return {
    routes,
    recommendations,
    destinationAddress: geocoded.formattedAddress,
    destinationCoord: { latitude: geocoded.lat, longitude: geocoded.lng },
  };
}
