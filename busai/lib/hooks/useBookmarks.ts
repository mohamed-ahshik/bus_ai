import React, { useState, useEffect, useCallback, useContext, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Bookmark } from "../types";
import { bookmarkScope, scopeFromPayload } from "../bookmarkScope";

const STORAGE_KEY = "@busai_bookmarks";

function persist(next: Bookmark[]) {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function matchesServiceBookmark(
  b: Bookmark,
  bm: Omit<Bookmark, "id" | "createdAt">,
  scope: "route_service" | "stop_service"
): boolean {
  return (
    b.type === "service" &&
    bm.type === "service" &&
    b.stopCode === bm.stopCode &&
    b.serviceNo === bm.serviceNo &&
    bookmarkScope(b) === scope
  );
}

interface BookmarksContextValue {
  bookmarks: Bookmark[];
  loaded: boolean;
  addBookmark: (bm: Omit<Bookmark, "id" | "createdAt">) => void;
  removeBookmark: (id: string) => void;
  removeBookmarksByIds: (ids: string[]) => void;
  /** Route screen: (stopCode, serviceNo) only matches route-origin service bookmarks. */
  isBookmarked: (stopCode: string, serviceNo?: string) => boolean;
  isWholeStopBookmarked: (stopCode: string) => boolean;
  isStopServiceBookmarked: (stopCode: string, serviceNo: string) => boolean;
  toggleBookmark: (bm: Omit<Bookmark, "id" | "createdAt">) => void;
  toggleWholeStopBookmark: (bm: Pick<Bookmark, "stopCode" | "stopName" | "roadName">) => void;
}

const BookmarksContext = createContext<BookmarksContextValue | null>(null);

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          setBookmarks(JSON.parse(raw));
        } catch {
          setBookmarks([]);
        }
      } else {
        setBookmarks([]);
      }
      setLoaded(true);
    });
  }, []);

  const addBookmark = useCallback(
    (bm: Omit<Bookmark, "id" | "createdAt">) => {
      setBookmarks((prev) => {
        const newBm: Bookmark = {
          ...bm,
          id: `bm_${Date.now()}`,
          createdAt: Date.now(),
        };
        const updated = [...prev, newBm];
        persist(updated);
        return updated;
      });
    },
    []
  );

  const removeBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      persist(updated);
      return updated;
    });
  }, []);

  const removeBookmarksByIds = useCallback((ids: string[]) => {
    if (!ids.length) return;
    const drop = new Set(ids);
    setBookmarks((prev) => {
      const updated = prev.filter((b) => !drop.has(b.id));
      persist(updated);
      return updated;
    });
  }, []);

  const isBookmarked = useCallback(
    (stopCode: string, serviceNo?: string) => {
      if (serviceNo !== undefined) {
        return bookmarks.some(
          (b) =>
            b.stopCode === stopCode &&
            b.serviceNo === serviceNo &&
            bookmarkScope(b) === "route_service"
        );
      }
      return bookmarks.some((b) => b.stopCode === stopCode && bookmarkScope(b) === "route_service");
    },
    [bookmarks]
  );

  const isWholeStopBookmarked = useCallback(
    (stopCode: string) => bookmarks.some((b) => b.stopCode === stopCode && b.type === "stop"),
    [bookmarks]
  );

  const isStopServiceBookmarked = useCallback(
    (stopCode: string, serviceNo: string) =>
      bookmarks.some(
        (b) =>
          b.stopCode === stopCode &&
          b.serviceNo === serviceNo &&
          bookmarkScope(b) === "stop_service"
      ),
    [bookmarks]
  );

  const toggleBookmark = useCallback((bm: Omit<Bookmark, "id" | "createdAt">) => {
    if (bm.type !== "service" || !bm.serviceNo) return;
    const scope = scopeFromPayload(bm);
    if (scope !== "route_service" && scope !== "stop_service") return;

    setBookmarks((prev) => {
      let next = [...prev];
      if (scope === "stop_service") {
        const existing = next.find((b) => matchesServiceBookmark(b, bm, "stop_service"));
        if (!existing) {
          next = next.filter((b) => !(b.stopCode === bm.stopCode && b.type === "stop"));
        }
      }

      const hit = next.find((b) => matchesServiceBookmark(b, bm, scope));
      let updated: Bookmark[];
      if (hit) {
        updated = next.filter((b) => b.id !== hit.id);
      } else {
        updated = [
          ...next,
          { ...bm, id: `bm_${Date.now()}`, createdAt: Date.now() },
        ];
      }
      persist(updated);
      return updated;
    });
  }, []);

  const toggleWholeStopBookmark = useCallback((bm: Pick<Bookmark, "stopCode" | "stopName" | "roadName">) => {
    setBookmarks((prev) => {
      const whole = prev.find((b) => b.stopCode === bm.stopCode && b.type === "stop");
      if (whole) {
        const updated = prev.filter((b) => b.id !== whole.id);
        persist(updated);
        return updated;
      }
      const cleared = prev.filter(
        (b) => !(b.stopCode === bm.stopCode && bookmarkScope(b) === "stop_service")
      );
      const newBm: Bookmark = {
        id: `bm_${Date.now()}`,
        createdAt: Date.now(),
        type: "stop",
        stopCode: bm.stopCode,
        stopName: bm.stopName,
        roadName: bm.roadName,
      };
      const updated = [...cleared, newBm];
      persist(updated);
      return updated;
    });
  }, []);

  const value: BookmarksContextValue = {
    bookmarks,
    loaded,
    addBookmark,
    removeBookmark,
    removeBookmarksByIds,
    isBookmarked,
    isWholeStopBookmarked,
    isStopServiceBookmarked,
    toggleBookmark,
    toggleWholeStopBookmark,
  };

  return React.createElement(BookmarksContext.Provider, { value }, children);
}

export function useBookmarks(): BookmarksContextValue {
  const ctx = useContext(BookmarksContext);
  if (!ctx) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return ctx;
}
