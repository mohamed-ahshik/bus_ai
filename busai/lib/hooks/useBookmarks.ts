import React, { useState, useEffect, useCallback, useContext, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Bookmark } from "../types";

const STORAGE_KEY = "@busai_bookmarks";

interface BookmarksContextValue {
  bookmarks: Bookmark[];
  loaded: boolean;
  addBookmark: (bm: Omit<Bookmark, "id" | "createdAt">) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (stopCode: string, serviceNo?: string) => boolean;
  toggleBookmark: (bm: Omit<Bookmark, "id" | "createdAt">) => void;
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
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  const removeBookmark = useCallback(
    (id: string) => {
      setBookmarks((prev) => {
        const updated = prev.filter((b) => b.id !== id);
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  const isBookmarked = useCallback(
    (stopCode: string, serviceNo?: string) => {
      return bookmarks.some(
        (b) =>
          b.stopCode === stopCode &&
          (serviceNo ? b.serviceNo === serviceNo : true)
      );
    },
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    (bm: Omit<Bookmark, "id" | "createdAt">) => {
      setBookmarks((prev) => {
        const existing = prev.find(
          (b) => b.stopCode === bm.stopCode && b.serviceNo === bm.serviceNo
        );
        let updated: Bookmark[];
        if (existing) {
          updated = prev.filter((b) => b.id !== existing.id);
        } else {
          updated = [
            ...prev,
            { ...bm, id: `bm_${Date.now()}`, createdAt: Date.now() },
          ];
        }
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  const value: BookmarksContextValue = {
    bookmarks,
    loaded,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
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
