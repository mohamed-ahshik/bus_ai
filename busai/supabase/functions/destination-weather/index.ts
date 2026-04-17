import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {
  getNearestTwoHourForecast,
  type NearestForecastResult,
} from "../_shared/sgTwoHourWeather.ts";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "Use POST" }, 405);
  }

  try {
    const body = (await req.json()) as {
      destinationLat?: number;
      destinationLng?: number;
    };
    const lat = body.destinationLat;
    const lng = body.destinationLng;
    if (typeof lat !== "number" || typeof lng !== "number" || !Number.isFinite(lat) || !Number.isFinite(lng)) {
      return jsonResponse(
        { ok: false, error: "destinationLat and destinationLng (numbers) required" },
        400,
      );
    }

    const dataGovKey = Deno.env.get("EXPO_DATAMALL_WEATHER_FORCAST_KEY") ?? undefined;
    const forecast = await getNearestTwoHourForecast(lat, lng, {
      dataGovApiKey: dataGovKey,
    });

    if (!forecast) {
      return jsonResponse({ ok: false, error: "Weather data unavailable" }, 502);
    }

    const payload: NearestForecastResult & { ok: true } = {
      ok: true,
      ...forecast,
    };
    return jsonResponse(payload);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
