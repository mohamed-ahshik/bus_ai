import { Platform } from "react-native";
import { useQuery } from "@tanstack/react-query";
import {
  fetchTrainServiceAlerts,
  formatTrainAlertLine,
  isDisruptionLikeAlert,
  type TrainServiceAlertRecord,
} from "../api/ltaTrainServiceAlerts";
import { getSupabase } from "../supabaseClient";

export type { TrainServiceAlertRecord };

export function useTrainServiceAlerts() {
  const enabled = Platform.OS === "web" ? !!getSupabase() : true;

  return useQuery({
    queryKey: ["trainServiceAlerts"],
    queryFn: fetchTrainServiceAlerts,
    enabled,
    refetchInterval: enabled ? 30_000 : false,
    staleTime: 25_000,
  });
}

/** Alerts to show in UI; empty ⇒ show “all working” copy. */
export function selectDisruptionAlerts(rows: TrainServiceAlertRecord[]): TrainServiceAlertRecord[] {
  return rows.filter(isDisruptionLikeAlert);
}

export function alertsToDisplayLines(rows: TrainServiceAlertRecord[]): string[] {
  return selectDisruptionAlerts(rows).map(formatTrainAlertLine);
}
