import { getSupabase } from "../supabaseClient";
import { TRAIN_LINES } from "../train/lines";
import type {
  TrainDataSource,
  TrainDeparture,
  TrainLine,
  TrainLineCode,
  TrainNetwork,
  TrainStation,
  TrainTimings,
} from "../train/types";

type StationRow = {
  station_id: string;
  name: string;
  lines: TrainLineCode[];
  codes: Record<string, string>;
};

type LineRow = {
  line: TrainLineCode;
  station_ids: string[];
};

type MetaRow = {
  imported_at: string | null;
  feed_end_date: string | null;
};

type TimingsRpc = {
  departures?: Array<{
    trip_id: string;
    line: string;
    direction: number | string;
    headsign: string | null;
    platform: string | null;
    scheduled_at: string;
    epoch_ms: number;
  }>;
  feed_end_date?: string | null;
  schedule_available?: boolean;
};

const LINE_ORDER = TRAIN_LINES.map((line) => line.code);

export function createSupabaseDataSource(): TrainDataSource {
  const client = getSupabase();
  if (!client) {
    throw new Error(
      "Supabase is not configured: check EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY",
    );
  }
  const supabase = client;

  let networkPromise: Promise<TrainNetwork> | null = null;

  async function loadNetwork(): Promise<TrainNetwork> {
    const [stationsResult, linesResult, metaResult] = await Promise.all([
      supabase
        .from("train_gtfs_stations")
        .select("station_id, name, lines, codes"),
      supabase.from("train_gtfs_line_stations").select("line, station_ids"),
      supabase
        .from("train_gtfs_meta")
        .select("imported_at, feed_end_date")
        .eq("id", 1)
        .maybeSingle(),
    ]);

    if (stationsResult.error) throw new Error(stationsResult.error.message);
    if (linesResult.error) throw new Error(linesResult.error.message);
    if (metaResult.error) throw new Error(metaResult.error.message);

    const stations: TrainStation[] = (stationsResult.data as StationRow[]).map(
      (row) => ({
        id: row.station_id,
        name: row.name,
        lines: row.lines ?? [],
        codes: row.codes ?? {},
      }),
    );
    const stationById = new Map(stations.map((station) => [station.id, station]));

    const lines: TrainLine[] = (linesResult.data as LineRow[])
      .filter((row) => LINE_ORDER.includes(row.line))
      .sort(
        (a, b) => LINE_ORDER.indexOf(a.line) - LINE_ORDER.indexOf(b.line),
      )
      .map((row) => {
        const meta = TRAIN_LINES.find((line) => line.code === row.line);
        return {
          code: row.line,
          name: meta?.name ?? row.line,
          stations: (row.station_ids ?? []).flatMap((stationId) => {
            const station = stationById.get(stationId);
            if (!station) return [];
            return [
              {
                id: station.id,
                name: station.name,
                code: station.codes[row.line] ?? station.id,
              },
            ];
          }),
        };
      });

    const meta = metaResult.data as MetaRow | null;
    return {
      stations,
      lines,
      snapshotAt: meta?.imported_at ?? null,
      feedEndDate: meta?.feed_end_date ?? null,
    };
  }

  function getNetwork(): Promise<TrainNetwork> {
    if (!networkPromise) {
      networkPromise = loadNetwork().catch((error) => {
        networkPromise = null;
        throw error;
      });
    }
    return networkPromise;
  }

  return {
    getNetwork,

    async getTimings(stationId, line, direction): Promise<TrainTimings> {
      const [network, rpc] = await Promise.all([
        getNetwork(),
        supabase.rpc("train_station_timings", {
          p_station_id: stationId,
          p_line: line,
          p_direction: Number(direction),
          p_limit: 5,
        }),
      ]);

      if (rpc.error) throw new Error(rpc.error.message);

      const station = network.stations.find((item) => item.id === stationId);
      const lineInfo = network.lines.find((item) => item.code === line);
      if (!station || !lineInfo) {
        throw new Error(`Unknown station/line: ${stationId}/${line}`);
      }

      const data = (rpc.data ?? {}) as TimingsRpc;
      const departures: TrainDeparture[] = (data.departures ?? []).map(
        (item) => ({
          tripId: item.trip_id,
          line: item.line,
          direction: String(item.direction) as "0" | "1",
          headsign: item.headsign ?? "",
          platform: item.platform ?? "",
          scheduledAt: item.scheduled_at,
          epochMs: Number(item.epoch_ms),
        }),
      );

      return {
        station,
        line: lineInfo,
        direction,
        departures,
        feedEndDate: data.feed_end_date ?? network.feedEndDate,
        scheduleAvailable: Boolean(data.schedule_available),
      };
    },
  };
}
