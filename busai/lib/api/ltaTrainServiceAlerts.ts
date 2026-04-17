import { getSupabase } from "../supabaseClient";
import {
  normalizeTrainAlertsValue,
  type TrainServiceAlertRecord,
} from "./ltaTrainServiceAlertsShared";

export type { TrainServiceAlertRecord } from "./ltaTrainServiceAlertsShared";
export { formatTrainAlertLine, isDisruptionLikeAlert, normalizeTrainAlertsValue } from "./ltaTrainServiceAlertsShared";

const LTA_API_URL = "https://datamall2.mytransport.sg/ltaodataservice/TrainServiceAlerts";
const LTA_API_KEY = process.env.EXPO_PUBLIC_LTA_DATAMALL_KEY ?? "";

async function fetchViaSupabase(): Promise<TrainServiceAlertRecord[]> {
  const client = getSupabase();
  if (!client) throw new Error("Supabase not configured");

  const { data, error } = await client.functions.invoke("lta-train-service-alerts", {
    body: {},
  });

  if (error) throw new Error(`lta-train-service-alerts error: ${error.message}`);
  if (!data?.ok) throw new Error(`lta-train-service-alerts failed: ${data?.error ?? "unknown"}`);

  return normalizeTrainAlertsValue({ value: data.value });
}

async function fetchViaLtaDirect(): Promise<TrainServiceAlertRecord[]> {
  if (!LTA_API_KEY) return [];
  const res = await fetch(LTA_API_URL, {
    headers: { AccountKey: LTA_API_KEY, accept: "application/json" },
  });
  if (!res.ok) throw new Error(`LTA TrainServiceAlerts error: ${res.status}`);
  const data = (await res.json()) as unknown;
  return normalizeTrainAlertsValue(data);
}

export async function fetchTrainServiceAlerts(): Promise<TrainServiceAlertRecord[]> {
  if (getSupabase()) {
    return fetchViaSupabase();
  }
  return fetchViaLtaDirect();
}
