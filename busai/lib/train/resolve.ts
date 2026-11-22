import { sgtDateKey } from "./format";
import type { TrainLine, TrainStation } from "./types";

export function stationCode(station: TrainStation, line: string): string {
  return station.codes[line] ?? station.id;
}

export function directionTerminals(line: TrainLine): {
  first: string;
  last: string;
} {
  const first = line.stations[0]?.name ?? "—";
  const last = line.stations[line.stations.length - 1]?.name ?? "—";
  return { first, last };
}

export function directionLabel(
  line: TrainLine,
  direction: "0" | "1",
): string {
  const terminals = directionTerminals(line);
  return direction === "0" ? `To ${terminals.first}` : `To ${terminals.last}`;
}

export function stripWindow(
  line: TrainLine,
  stationId: string,
  size = 5,
): TrainLine["stations"] {
  const index = line.stations.findIndex((station) => station.id === stationId);
  if (index < 0) return [];
  const count = Math.min(size, line.stations.length);
  const start = Math.max(0, Math.min(index - 2, line.stations.length - count));
  return line.stations.slice(start, start + count);
}

export function isScheduleAvailable(
  feedEndDate: string | null,
  date: Date = new Date(),
): boolean {
  if (!feedEndDate) return true;
  return sgtDateKey(date) <= feedEndDate;
}

export function isSnapshotStale(
  snapshotAt: string | null,
  now: number = Date.now(),
  days = 7,
): boolean {
  if (!snapshotAt) return false;
  const timestamp = new Date(snapshotAt).getTime();
  if (Number.isNaN(timestamp)) return false;
  return now - timestamp > days * 24 * 60 * 60 * 1000;
}
