/**
 * LTA DataMall `TrainServiceAlerts` item — documented fields plus any passthrough keys.
 * @see https://datamall2.mytransport.sg/ltaodataservice/TrainServiceAlerts
 */
export type TrainServiceAlertRecord = Record<string, unknown>;

function strField(a: TrainServiceAlertRecord, keys: readonly string[]): string {
  for (const k of keys) {
    const v = a[k];
    if (v == null) continue;
    const s = String(v).trim();
    if (s) return s;
  }
  return "";
}

export function normalizeTrainAlertsValue(raw: unknown): TrainServiceAlertRecord[] {
  if (!raw || typeof raw !== "object") return [];
  const o = raw as { value?: unknown[]; Value?: unknown[] };
  const v = Array.isArray(o.value) ? o.value : Array.isArray(o.Value) ? o.Value : [];
  return v.filter((x): x is TrainServiceAlertRecord => x != null && typeof x === "object");
}

/** LTA Status 1 = normal / minor; omit from disruption list when field is present. */
export function isDisruptionLikeAlert(a: TrainServiceAlertRecord): boolean {
  const s = a.Status ?? a.status;
  if (s === undefined) return true;
  const n = Number(s);
  if (Number.isNaN(n)) return true;
  return n !== 1;
}

/**
 * One alert as human-readable text: line + prose, then Direction / Stations / free bus / shuttle when present.
 */
export function formatTrainAlertLine(a: TrainServiceAlertRecord): string {
  const lineCode = strField(a, ["Line", "line"]);
  const msg = strField(a, ["Content", "Message", "Text", "Description"]);
  const direction = strField(a, ["Direction", "direction"]);
  const stations = strField(a, ["Stations", "stations"]);
  const freeBus = strField(a, ["FreePublicBus", "freePublicBus"]);
  const shuttle = strField(a, ["FreeMRTShuttle", "freeMRTShuttle"]);

  const headline = [lineCode, msg].filter(Boolean).join(": ");
  const detailLines: string[] = [];

  if (direction) {
    const dup = msg.length > 0 && msg.toLowerCase().includes(direction.toLowerCase());
    if (!dup) detailLines.push(`Direction: ${direction}`);
  }
  if (stations) detailLines.push(`Affected stations: ${stations}`);
  if (freeBus) detailLines.push(`Free public bus: ${freeBus}`);
  if (shuttle) detailLines.push(`Free MRT shuttle: ${shuttle}`);

  if (headline && detailLines.length) return `${headline}\n${detailLines.join("\n")}`;
  if (headline) return headline;
  if (detailLines.length) return detailLines.join("\n");
  try {
    return JSON.stringify(a);
  } catch {
    return "Service alert";
  }
}
