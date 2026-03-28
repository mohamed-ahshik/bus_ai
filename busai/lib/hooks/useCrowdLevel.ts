import { useQuery } from "@tanstack/react-query";
import {
  getPassengerVolume,
  getDayType,
  getCurrentHour,
  type PVRecord,
} from "../api/ltaPassengerVolume";

export interface CrowdInfo {
  color: string;
  label: string;
  tapIn: number;
  tapOut: number;
  total: number;
}

const GREEN = "#22c55e";
const ORANGE = "#f59e0b";
const RED = "#ef4444";
const GRAY = "#9e9e9e";

const TAP_THRESHOLD_LOW = 500;
const TAP_THRESHOLD_HIGH = 1000;

function getCrowdColor(total: number): { color: string; label: string } {
  if (total >= TAP_THRESHOLD_HIGH) return { color: RED, label: "Crowded" };
  if (total >= TAP_THRESHOLD_LOW) return { color: ORANGE, label: "Moderate" };
  return { color: GREEN, label: "Not Crowded" };
}

export function useCrowdLevel(stopCodes: string[]) {
  return useQuery<Map<string, CrowdInfo>>({
    queryKey: ["crowdLevel", ...stopCodes],
    enabled: stopCodes.length > 0,
    queryFn: async () => {
      const records = await getPassengerVolume();
      const dayType = getDayType();
      const hour = getCurrentHour();

      const stopSet = new Set(stopCodes);
      const result = new Map<string, CrowdInfo>();

      const filtered = records.filter(
        (r) =>
          stopSet.has(r.PT_CODE) &&
          r.DAY_TYPE === dayType &&
          r.TIME_PER_HOUR === hour
      );

      const grouped = new Map<string, { tapIn: number; tapOut: number }>();
      for (const r of filtered) {
        const existing = grouped.get(r.PT_CODE) ?? { tapIn: 0, tapOut: 0 };
        existing.tapIn += r.TOTAL_TAP_IN_VOLUME;
        existing.tapOut += r.TOTAL_TAP_OUT_VOLUME;
        grouped.set(r.PT_CODE, existing);
      }

      for (const code of stopCodes) {
        const data = grouped.get(code);
        if (data) {
          const total = data.tapIn + data.tapOut;
          const { color, label } = getCrowdColor(total);
          result.set(code, {
            color,
            label,
            tapIn: data.tapIn,
            tapOut: data.tapOut,
            total,
          });
        } else {
          result.set(code, {
            color: GRAY,
            label: "No Data",
            tapIn: 0,
            tapOut: 0,
            total: 0,
          });
        }
      }

      return result;
    },
    staleTime: 5 * 60 * 1000,
  });
}
