import type { TrainStation } from "./types";

export function rankStations(
  stations: TrainStation[],
  query: string,
  limit = 8,
): TrainStation[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return stations
    .filter((station) => station.name.toLowerCase().includes(normalized))
    .sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(normalized) ? 0 : 1;
      const bStarts = b.name.toLowerCase().startsWith(normalized) ? 0 : 1;
      return aStarts - bStarts || a.name.localeCompare(b.name);
    })
    .slice(0, limit);
}
