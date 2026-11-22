const TIME_ZONE = "Asia/Singapore";

export type Countdown = {
  value: string;
  unit: string;
};

function asDate(value: string | number | Date): Date {
  return value instanceof Date ? value : new Date(value);
}

export function formatClock(value: string | number | Date): string {
  const date = asDate(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-SG", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function formatUpdatedAt(ms: number): string {
  if (!ms) return "—";
  return new Intl.DateTimeFormat("en-SG", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(ms));
}

export function formatSnapshotDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-SG", {
    timeZone: TIME_ZONE,
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatCountdown(
  epochMs: number,
  now: number = Date.now(),
): Countdown {
  const diff = epochMs - now;
  if (diff < -60_000) return { value: "—", unit: "" };
  if (diff <= 30_000) return { value: "Due", unit: "" };

  const minutes = Math.ceil(diff / 60_000);
  if (minutes < 60) return { value: String(minutes), unit: "min" };

  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (hours < 24) {
    return {
      value: String(hours),
      unit: remainder ? `h ${remainder}m` : "h",
    };
  }

  const days = Math.floor(hours / 24);
  return { value: String(days), unit: `d ${hours % 24}h` };
}

export function formatEta(epochMs: number, now: number = Date.now()): string {
  const diff = epochMs - now;
  if (diff < -60_000) return "Departed";
  if (diff <= 30_000) return "Due";

  const countdown = formatCountdown(epochMs, now);
  return countdown.unit === "min"
    ? `in ${countdown.value} min`
    : `in ${countdown.value}${countdown.unit}`;
}

export function sgtDateKey(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}
