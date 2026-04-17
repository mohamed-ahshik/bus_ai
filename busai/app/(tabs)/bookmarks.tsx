import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Iconify } from "react-native-iconify";
import { useQuery } from "@tanstack/react-query";
import { useBookmarks } from "../../lib/hooks/useBookmarks";
import type { Bookmark } from "../../lib/types";
import { bookmarkScope, compareServiceNo } from "../../lib/bookmarkScope";
import { getServicesAtStop } from "../../lib/api/ltaBusRoutes";
import { useAppTheme } from "../../lib/ThemeContext";
import type { AppColors } from "../../lib/theme";
import { ADMOB_TAB_SCROLL_EXTRA } from "../../lib/adMobConfig";

type StopServiceGroup = {
  stopCode: string;
  members: Bookmark[];
  serviceLine: string;
  sortKey: number;
};

function useServicesLineForWholeStop(stopCode: string, enabled: boolean) {
  const { data, isLoading } = useQuery({
    queryKey: ["bookmarkServicesAtStop", stopCode],
    queryFn: () => getServicesAtStop(stopCode),
    enabled: enabled && !!stopCode,
    staleTime: 24 * 60 * 60 * 1000,
  });
  const line = useMemo(() => {
    if (!data?.length) return "";
    return [...new Set(data.map((s) => s.ServiceNo))].sort(compareServiceNo).join(", ");
  }, [data]);
  return { line, isLoading };
}

function BookmarkCard({
  bookmark,
  line2,
  onPress,
  onRemove,
  editMode,
  colors,
  useBusIcon,
  line3Explicit,
  fetchAllServicesLine,
}: {
  bookmark: Bookmark;
  /** Second line: route → direction; saved stop → road name. */
  line2: string;
  onPress: () => void;
  onRemove: () => void;
  editMode: boolean;
  colors: AppColors;
  /** Whole stop + grouped stop services use the bus tile; route keeps service badge. */
  useBusIcon: boolean;
  /** Comma-separated services for grouped bookmarks; omit when using fetch. */
  line3Explicit?: string;
  /** Whole-stop bookmark: load all service numbers at this stop. */
  fetchAllServicesLine?: boolean;
}) {
  const { line: fetchedLine, isLoading } = useServicesLineForWholeStop(
    bookmark.stopCode,
    !!fetchAllServicesLine
  );

  const servicesLine = fetchAllServicesLine
    ? isLoading
      ? "…"
      : fetchedLine || "—"
    : line3Explicit;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: pressed ? colors.bgSection : colors.surface,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
      })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16, flex: 1, minWidth: 0 }}>
        <View
          style={{
            width: 48,
            height: 48,
            backgroundColor: `${colors.primary}1A`,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: `${colors.primary}33`,
          }}
        >
          {!useBusIcon && bookmark.serviceNo ? (
            <Text
              style={{
                fontWeight: "900",
                fontSize: bookmark.serviceNo.length > 3 ? 14 : 20,
                color: colors.primary,
              }}
            >
              {bookmark.serviceNo}
            </Text>
          ) : (
            <Iconify icon="solar:bus-bold" size={22} color={colors.primary} />
          )}
        </View>

        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={{ fontWeight: "700", fontSize: 13, color: colors.fg }} numberOfLines={2}>
            {bookmark.stopName}
          </Text>
          <Text style={{ fontSize: 10, color: colors.mutedFg, fontWeight: "500", marginTop: 2 }}>
            {line2}
          </Text>
          {line3Explicit !== undefined ||
          fetchAllServicesLine ||
          (servicesLine !== undefined && servicesLine !== "") ? (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 }}>
              {fetchAllServicesLine && isLoading ? (
                <ActivityIndicator size="small" color={colors.mutedFg} />
              ) : (
                <Text
                  style={{ fontSize: 11, color: colors.fg, fontWeight: "700" }}
                  numberOfLines={2}
                >
                  {servicesLine ?? line3Explicit ?? ""}
                </Text>
              )}
            </View>
          ) : null}
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={{
              fontSize: 9,
              fontWeight: "800",
              color: colors.mutedFg,
              letterSpacing: 0.6,
              textTransform: "uppercase",
            }}
          >
            Stop
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "900", color: colors.fg, marginTop: 2 }}>
            {bookmark.stopCode}
          </Text>
        </View>

        {editMode ? (
          <Pressable
            onPress={onRemove}
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: "#ef444422",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Iconify icon="solar:trash-bin-2-bold" size={16} color="#ef4444" />
          </Pressable>
        ) : (
          <Iconify icon="solar:alt-arrow-right-linear" size={20} color={colors.mutedFg} />
        )}
      </View>
    </Pressable>
  );
}

const SECTION_ICONS: Record<string, string> = {
  "Home Routes": "solar:home-2-bold",
  "Saved Stops": "solar:map-point-bold",
};

type SavedRow =
  | { kind: "whole"; bookmark: Bookmark }
  | { kind: "group"; group: StopServiceGroup };

export default function BookmarksScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const { bookmarks, loaded, removeBookmark, removeBookmarksByIds } = useBookmarks();
  const [editMode, setEditMode] = useState(false);

  const { routeBookmarks, savedRows } = useMemo(() => {
    const route = bookmarks.filter((b) => bookmarkScope(b) === "route_service");
    const whole = bookmarks.filter((b) => bookmarkScope(b) === "whole_stop");
    const stopSvc = bookmarks.filter((b) => bookmarkScope(b) === "stop_service");

    const byStop = new Map<string, Bookmark[]>();
    for (const b of stopSvc) {
      const arr = byStop.get(b.stopCode) ?? [];
      arr.push(b);
      byStop.set(b.stopCode, arr);
    }
    const groups: StopServiceGroup[] = [];
    for (const [stopCode, members] of byStop) {
      const nos = [...new Set(members.map((m) => m.serviceNo).filter(Boolean) as string[])].sort(
        compareServiceNo
      );
      groups.push({
        stopCode,
        members,
        serviceLine: nos.join(", "),
        sortKey: Math.max(...members.map((m) => m.createdAt)),
      });
    }

    const saved: SavedRow[] = [];
    for (const bm of whole) saved.push({ kind: "whole", bookmark: bm });
    for (const g of groups) saved.push({ kind: "group", group: g });

    saved.sort((a, b) => {
      const ta = a.kind === "whole" ? a.bookmark.createdAt : a.group.sortKey;
      const tb = b.kind === "whole" ? b.bookmark.createdAt : b.group.sortKey;
      return tb - ta;
    });

    route.sort((a, b) => b.createdAt - a.createdAt);

    return { routeBookmarks: route, savedRows: saved };
  }, [bookmarks]);

  const sections = [
    ...(routeBookmarks.length > 0 ? [{ title: "Home Routes", kind: "routes" as const }] : []),
    ...(savedRows.length > 0 ? [{ title: "Saved Stops", kind: "saved" as const }] : []),
  ];

  const navigateToStopFromBookmark = (bm: Bookmark, onlyServices?: string) => {
    router.push({
      pathname: "/stop/[id]",
      params: {
        id: bm.stopCode,
        name: bm.stopName,
        road: bm.roadName,
        ...(onlyServices ? { onlyServices } : {}),
      },
    });
  };

  if (!loaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgSection }}>
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingBottom: 24,
          paddingHorizontal: 24,
          backgroundColor: colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.04,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <Text style={{ fontWeight: "700", fontSize: 28, color: colors.fg }}>Bookmarks</Text>
          <Pressable onPress={() => setEditMode(!editMode)}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 13,
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}
            >
              {editMode ? "Done" : "Edit"}
            </Text>
          </Pressable>
        </View>
        <Text style={{ fontSize: 13, color: colors.mutedFg }}>
          Your frequently used services and stops
        </Text>
      </View>

      {bookmarks.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            paddingHorizontal: 32,
          }}
        >
          <Iconify icon="solar:bookmark-linear" size={48} color={`${colors.mutedFg}66`} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: colors.mutedFg,
              textAlign: "center",
            }}
          >
            No bookmarks yet
          </Text>
          <Text style={{ fontSize: 13, color: `${colors.mutedFg}99`, textAlign: "center" }}>
            Star a bus stop or service to save it here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={sections}
          keyExtractor={(item) => item.title}
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 100 + ADMOB_TAB_SCROLL_EXTRA,
            gap: 24,
          }}
          renderItem={({ item: section }) => (
            <View style={{ gap: 12 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  paddingHorizontal: 8,
                }}
              >
                <Iconify
                  icon={SECTION_ICONS[section.title] ?? "solar:bookmark-bold"}
                  size={16}
                  color={colors.primary}
                />
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    color: colors.mutedFg,
                  }}
                >
                  {section.title}
                </Text>
              </View>

              <View style={{ gap: 12 }}>
                {section.kind === "routes"
                  ? routeBookmarks.map((bm) => (
                      <BookmarkCard
                        key={bm.id}
                        bookmark={bm}
                        line2={bm.direction ?? bm.roadName}
                        colors={colors}
                        useBusIcon={false}
                        onPress={() =>
                          navigateToStopFromBookmark(bm, bm.serviceNo ?? undefined)
                        }
                        onRemove={() => {
                          removeBookmark(bm.id);
                        }}
                        editMode={editMode}
                      />
                    ))
                  : savedRows.map((row) =>
                      row.kind === "whole" ? (
                        <BookmarkCard
                          key={row.bookmark.id}
                          bookmark={row.bookmark}
                          line2={row.bookmark.roadName}
                          colors={colors}
                          useBusIcon
                          fetchAllServicesLine
                          onPress={() => navigateToStopFromBookmark(row.bookmark)}
                          onRemove={() => {
                            removeBookmark(row.bookmark.id);
                          }}
                          editMode={editMode}
                        />
                      ) : (
                        <BookmarkCard
                          key={`grp_${row.group.stopCode}`}
                          bookmark={row.group.members[0]}
                          line2={row.group.members[0].roadName}
                          colors={colors}
                          useBusIcon
                          line3Explicit={row.group.serviceLine}
                          onPress={() =>
                            navigateToStopFromBookmark(
                              row.group.members[0],
                              row.group.serviceLine
                            )
                          }
                          onRemove={() => {
                            removeBookmarksByIds(row.group.members.map((m) => m.id));
                          }}
                          editMode={editMode}
                        />
                      )
                    )}
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
