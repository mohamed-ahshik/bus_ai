import type { Bookmark } from "./types";

/** Classify bookmarks for grouping, toggles, and route vs stop-screen origin. */
export function bookmarkScope(b: Bookmark): "route_service" | "stop_service" | "whole_stop" {
  if (b.type === "stop") return "whole_stop";
  if (b.bookmarkOrigin === "route") return "route_service";
  if (b.bookmarkOrigin === "stop") return "stop_service";
  if (!b.roadName || b.roadName.trim() === "") return "route_service";
  return "stop_service";
}

export function scopeFromPayload(bm: Omit<Bookmark, "id" | "createdAt">): "route_service" | "stop_service" | "whole_stop" {
  if (bm.type === "stop") return "whole_stop";
  if (bm.bookmarkOrigin === "route") return "route_service";
  if (bm.bookmarkOrigin === "stop") return "stop_service";
  if (!bm.roadName || bm.roadName.trim() === "") return "route_service";
  return "stop_service";
}

export function compareServiceNo(a: string, b: string): number {
  const na = Number(a);
  const nb = Number(b);
  if (Number.isFinite(na) && Number.isFinite(nb) && `${na}` === a && `${nb}` === b) {
    return na - nb;
  }
  return a.localeCompare(b, undefined, { numeric: true });
}
