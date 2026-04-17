/**
 * NEA 2-hour weather via data.gov.sg Open API.
 * @see https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast
 * Optional `x-api-key`: pass key from env `EXPO_DATAMALL_WEATHER_FORCAST_KEY` (Supabase secret).
 */

export interface NearestForecastResult {
  areaName: string;
  forecast: string;
  validPeriodText: string;
  validStart: string;
  validEnd: string;
  updateTimestamp: string;
}

interface AreaMeta {
  name: string;
  label_location: { latitude: number; longitude: number };
}

function distSq(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dlat = lat1 - lat2;
  const dlng = lng1 - lng2;
  return dlat * dlat + dlng * dlng;
}

export async function getNearestTwoHourForecast(
  destinationLat: number,
  destinationLng: number,
  options?: { dataGovApiKey?: string },
): Promise<NearestForecastResult | null> {
  const headers: Record<string, string> = { accept: "application/json" };
  if (options?.dataGovApiKey) headers["x-api-key"] = options.dataGovApiKey;

  const res = await fetch(
    "https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast",
    { headers },
  );
  if (!res.ok) return null;

  const json = (await res.json()) as {
    code?: number;
    data?: {
      area_metadata?: AreaMeta[];
      items?: Array<{
        update_timestamp?: string;
        timestamp?: string;
        valid_period?: { start?: string; end?: string; text?: string };
        forecasts?: Array<{ area: string; forecast: string }>;
      }>;
    };
  };

  if (json.code != null && json.code !== 0) return null;
  if (!json.data?.area_metadata?.length || !json.data?.items?.[0]) return null;

  const item = json.data.items[0];
  const forecasts = item.forecasts ?? [];
  const forecastByArea = new Map(forecasts.map((f) => [f.area, f.forecast]));

  let bestArea = json.data.area_metadata[0];
  let bestD = Infinity;
  for (const m of json.data.area_metadata) {
    const d = distSq(
      destinationLat,
      destinationLng,
      m.label_location.latitude,
      m.label_location.longitude,
    );
    if (d < bestD) {
      bestD = d;
      bestArea = m;
    }
  }

  const vp = item.valid_period;
  const validPeriodText =
    vp?.text?.trim() ||
    (vp?.start && vp?.end ? `${vp.start}–${vp.end}` : "");

  return {
    areaName: bestArea.name,
    forecast: forecastByArea.get(bestArea.name) ?? "Unknown",
    validPeriodText,
    validStart: vp?.start ?? "",
    validEnd: vp?.end ?? "",
    updateTimestamp: item.update_timestamp ?? item.timestamp ?? "",
  };
}

/** Line appended to the trip user message for Claude. */
export function formatWeatherContextLine(w: NearestForecastResult): string {
  return (
    `Destination weather (NEA 2-hour forecast, nearest area "${w.areaName}", valid ${w.validPeriodText || "see NEA"}): ${w.forecast}. When you summarise this for the user, add 1–2 fitting emoji (weather-appropriate) in that sentence.`
  );
}
