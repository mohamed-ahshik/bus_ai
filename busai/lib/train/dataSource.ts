import { createSupabaseDataSource } from "../api/trainSchedule";
import { getSupabase } from "../supabaseClient";
import { isScheduleAvailable } from "./resolve";
import {
  FIXTURE_DEPARTURES,
  FIXTURE_FEED_END_DATE,
  FIXTURE_LINES,
  FIXTURE_SNAPSHOT_AT,
  FIXTURE_STATIONS,
} from "./fixture";
import type {
  TrainDataSource,
  TrainDeparture,
  TrainLineCode,
  TrainTimings,
} from "./types";

export const fixtureDataSource: TrainDataSource = {
  async getNetwork() {
    return {
      stations: FIXTURE_STATIONS,
      lines: FIXTURE_LINES,
      snapshotAt: FIXTURE_SNAPSHOT_AT,
      feedEndDate: FIXTURE_FEED_END_DATE,
    };
  },

  async getTimings(stationId, line, direction): Promise<TrainTimings> {
    const station = FIXTURE_STATIONS.find((item) => item.id === stationId);
    const lineInfo = FIXTURE_LINES.find((item) => item.code === line);
    if (!station || !lineInfo) {
      throw new Error(`Unknown station/line: ${stationId}/${line}`);
    }

    const now = Date.now();
    const departures: TrainDeparture[] = (
      FIXTURE_DEPARTURES[`${stationId}|${line}|${direction}`] ?? []
    )
      .map((departure) => {
        const epochMs = now + departure.offsetMinutes * 60_000;
        return {
          ...departure,
          scheduledAt: new Date(epochMs).toISOString(),
          epochMs,
        };
      })
      .sort((a, b) => a.epochMs - b.epochMs)
      .slice(0, 5);

    return {
      station,
      line: lineInfo,
      direction,
      departures,
      feedEndDate: FIXTURE_FEED_END_DATE,
      scheduleAvailable: isScheduleAvailable(FIXTURE_FEED_END_DATE),
    };
  },
};

let supabaseDataSource: TrainDataSource | null = null;

// Development defaults to the fixture so the UI works before the pipeline is
// deployed. Set EXPO_PUBLIC_TRAIN_FIXTURE=0 to exercise the Supabase source.
// Production never silently ships fixture timings.
export function getTrainDataSource(): TrainDataSource {
  const flag = process.env.EXPO_PUBLIC_TRAIN_FIXTURE;
  const forceSupabase = flag === "0";

  if (flag === "1" || (__DEV__ && !forceSupabase)) {
    return fixtureDataSource;
  }

  if (getSupabase()) {
    if (!supabaseDataSource) {
      supabaseDataSource = createSupabaseDataSource();
    }
    return supabaseDataSource;
  }

  if (__DEV__) {
    console.warn(
      "Supabase train source unavailable; falling back to the development fixture.",
    );
    return fixtureDataSource;
  }

  throw new Error(
    "Train Supabase data source is not configured: check EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.",
  );
}
