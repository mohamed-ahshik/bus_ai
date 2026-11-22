export type TrainLineCode =
  | "NSL"
  | "EWL"
  | "NEL"
  | "CCL"
  | "DTL"
  | "TEL"
  | "BPL"
  | "SKL"
  | "PGL";

export type TrainStation = {
  id: string;
  name: string;
  lines: TrainLineCode[];
  codes: Record<string, string>;
};

export type TrainLineStation = {
  id: string;
  name: string;
  code: string;
};

export type TrainLine = {
  code: TrainLineCode;
  name: string;
  stations: TrainLineStation[];
};

export type TrainDeparture = {
  tripId: string;
  line: string;
  direction: "0" | "1";
  headsign: string;
  platform: string;
  scheduledAt: string;
  epochMs: number;
};

export type TrainNetwork = {
  stations: TrainStation[];
  lines: TrainLine[];
  snapshotAt: string | null;
  feedEndDate: string | null;
};

export type TrainTimings = {
  station: TrainStation;
  line: TrainLine;
  direction: "0" | "1";
  departures: TrainDeparture[];
  feedEndDate: string | null;
  scheduleAvailable: boolean;
};

export type TrainDataSource = {
  getNetwork(): Promise<TrainNetwork>;
  getTimings(
    stationId: string,
    line: TrainLineCode,
    direction: "0" | "1",
  ): Promise<TrainTimings>;
};
