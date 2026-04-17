import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Iconify } from "react-native-iconify";
import {
  useBusArrivals,
  formatArrivalMinutes,
  getLoadColor,
  getBusTypeLabel,
} from "../../lib/hooks/useBusArrivals";
import { useBookmarks } from "../../lib/hooks/useBookmarks";
import { safeRouterBack } from "../../lib/safeRouterBack";
import type { BusArrivalService } from "../../lib/types";
import { getAllBusStops } from "../../lib/api/ltaBusStops";
import { getServicesAtStop, isServiceInOperation } from "../../lib/api/ltaBusRoutes";
import { useQuery } from "@tanstack/react-query";
import type { BusArrivalTime } from "../../lib/types";
import { BusDeckSvg } from "../../lib/busDeckIcons";
import { WheelchairWabSvg } from "../../lib/wheelchairWabIcon";
import { useAppTheme } from "../../lib/ThemeContext";
import { ADMOB_TAB_SCROLL_EXTRA } from "../../lib/adMobConfig";
import type { AppColors } from "../../lib/theme";
import { compareServiceNo } from "../../lib/bookmarkScope";

/** Wide enough for 44px digits + "min" + gaps + load pill (avoids pill overlapping MIN). */
const ARRIVAL_STRIP_W = 104;

/** Deck icons: top = coming bus (NextBus), bottom = following bus (NextBus2). */
const BUS_COL_W = 24;
const BUS_ICON_GAP = 10;
/** Wheelchair column width (aligned with bus rows). */
const WAB_COL_W = 18;

function ServiceBookmarkPill({
  bookmarked,
  onPress,
  colors,
  compact,
}: {
  bookmarked: boolean;
  onPress: () => void;
  colors: AppColors;
  /** Tighter typography for grid cards. */
  compact?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={compact ? 6 : 16}
      style={({ pressed }) => ({
        marginTop: compact ? 5 : 0,
        paddingVertical: compact ? 2 : 8,
        paddingHorizontal: compact ? 4 : 12,
        borderRadius: compact ? 4 : 6,
        alignSelf: "center",
        minWidth: compact ? 58 : 76,
        minHeight: compact ? undefined : 36,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bookmarked ? "#fef9c3" : pressed ? colors.mutedBg : colors.surface,
        borderWidth: 1,
        borderColor: bookmarked ? "#eab308" : colors.border,
      })}
    >
      <Text
        style={{
          fontSize: compact ? 7 : 10,
          fontWeight: "800",
          letterSpacing: 0.2,
          color: bookmarked ? "#a16207" : colors.mutedFg,
        }}
      >
        Bookmark
      </Text>
    </Pressable>
  );
}

function BusArrivalRow({
  service,
  stopCode,
  stopName,
  destinationName,
  isOperating,
  onPress,
  serviceBookmarked,
  onBookmarkPress,
}: {
  service: BusArrivalService;
  stopCode: string;
  stopName: string;
  destinationName: string;
  isOperating?: boolean;
  onPress: () => void;
  serviceBookmarked: boolean;
  onBookmarkPress: () => void;
}) {
  const { colors } = useAppTheme();
  const next = service.NextBus;
  const next2 = service.NextBus2;
  const mins1 = formatArrivalMinutes(next.arrivalMinutes);
  const mins2 = formatArrivalMinutes(next2.arrivalMinutes);
  const loadColor = getLoadColor(next.Load);
  const loadColor2 = getLoadColor(next2.Load);
  const comingIsDD = next.Type === "DD";
  const nextIsDD = next2.Type === "DD";
  const destination = destinationName || "—";
  const frequency = next.arrivalMinutes != null && next2.arrivalMinutes != null && next2.arrivalMinutes > 0
    ? `~${next2.arrivalMinutes - (next.arrivalMinutes ?? 0)}m`
    : "—";
  const comingWAB = next.Feature === "WAB";
  const nextWAB = next2.Feature === "WAB";

  // "—" label when no live ETA: distinguish "No Est. Available" vs "Not In Operation"
  const noEtaLabel = isOperating === false ? "Not In Op." : "No Est.";
  const nextBusLine =
    mins2 === "—"
      ? noEtaLabel
      : mins2 === "Arr"
        ? "Next: Arr"
        : `Next: ${mins2}m`;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: `${colors.border}80`,
        backgroundColor: colors.surface,
      }}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => ({
          flex: 1,
          minWidth: 0,
          paddingVertical: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: 8,
          backgroundColor: pressed ? colors.mutedBg : colors.surface,
        })}
      >
      {/* Service number + bookmark pill + destination */}
      <View style={{ flex: 1, minWidth: 0, flexDirection: "row", alignItems: "center", gap: 16 }}>
        <View style={{ width: 64, alignSelf: "stretch", alignItems: "center" }}>
          <View
            style={{
              width: 64,
              height: 48,
              backgroundColor: colors.primary,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: colors.onPrimary,
                fontWeight: "900",
                fontSize: service.ServiceNo.length > 3 ? 18 : 24,
              }}
            >
              {service.ServiceNo}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              width: "100%",
              minHeight: 0,
              justifyContent: "flex-start",
              alignItems: "center",
              paddingTop: 14,
              paddingBottom: 10,
            }}
          >
            <ServiceBookmarkPill
              bookmarked={serviceBookmarked}
              onPress={onBookmarkPress}
              colors={colors}
            />
          </View>
        </View>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={{ fontWeight: "700", fontSize: 13, color: colors.fg }}>
            {destination}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 6,
              marginTop: 2,
            }}
          >
            <Text style={{ fontSize: 11, color: colors.fg }}>
              {getBusTypeLabel(next.Type)}
            </Text>
            <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: colors.fg }} />
            <Text style={{ fontSize: 11, color: colors.fg }}>
              Freq: {frequency}
            </Text>
          </View>
        </View>
      </View>

      {/* Wheelchair (per bus) + deck icons + arrival times */}
      <View style={{ flexDirection: "row", gap: 6, alignItems: "center", flexShrink: 0 }}>
        <View
          style={{
            width: WAB_COL_W,
            alignItems: "center",
            gap: BUS_ICON_GAP,
          }}
        >
          <View
            style={{
              width: WAB_COL_W,
              height: 14,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {comingWAB ? <WheelchairWabSvg size={13} /> : null}
          </View>
          <View
            style={{
              width: WAB_COL_W,
              height: 11,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {nextWAB ? <WheelchairWabSvg size={13} /> : null}
          </View>
        </View>
        <View
          style={{
            width: BUS_COL_W,
            alignItems: "center",
            gap: BUS_ICON_GAP,
          }}
        >
          <View style={{ width: BUS_COL_W, height: 14, justifyContent: "flex-end", alignItems: "center" }}>
            <BusDeckSvg isDoubleDeck={comingIsDD} width={20} height={14} fillColor={colors.fg} />
          </View>
          <View style={{ width: BUS_COL_W, height: 11, justifyContent: "flex-end", alignItems: "center" }}>
            <BusDeckSvg isDoubleDeck={nextIsDD} width={16} height={11} fillColor={colors.fg} />
          </View>
        </View>
        <View style={{ width: ARRIVAL_STRIP_W, alignItems: "stretch", gap: 8 }}>
          {/* First bus: number + MIN + pill — one tight group, right-aligned in strip */}
          {mins1 === "—" ? (
            <Text
              style={{
                fontSize: 11,
                fontWeight: "700",
                color: colors.mutedFg,
                textAlign: "right",
                marginBottom: 2,
              }}
            >
              {noEtaLabel}
            </Text>
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                gap: 4,
              }}
            >
              <View
                style={{
                  width: 44,
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "900",
                    color: colors.fg,
                    lineHeight: 28,
                  }}
                >
                  {mins1}
                </Text>
              </View>
              {mins1 !== "Arr" ? (
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color: colors.primary,
                    textTransform: "uppercase",
                    lineHeight: 14,
                    marginBottom: 3,
                    marginLeft: 2,
                  }}
                >
                  min
                </Text>
              ) : (
                <View style={{ width: 10, marginBottom: 3, marginLeft: 2 }} />
              )}
              <View
                style={{
                  width: 10,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: loadColor,
                  marginBottom: 5,
                  flexShrink: 0,
                }}
              />
            </View>
          )}
          {/* Second bus: Next + pill; same strip width so pills stack vertically */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              gap: 4,
            }}
          >
            <Text
              style={{
                flex: 1,
                minWidth: 0,
                fontSize: 10,
                color: colors.mutedFg,
                marginBottom: 4,
                lineHeight: 14,
                textAlign: "right",
                marginRight: 2,
              }}
              numberOfLines={1}
            >
              {nextBusLine}
            </Text>
            {mins2 !== "—" && (
              <View
                style={{
                  width: 10,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: loadColor2,
                  marginBottom: 4,
                  opacity: 0.85,
                  flexShrink: 0,
                }}
              />
            )}
          </View>
        </View>
        <Iconify icon="solar:alt-arrow-right-linear" size={20} color={colors.mutedFg} />
      </View>
      </Pressable>
    </View>
  );
}

function BusArrivalCard({
  service,
  destinationName,
  isOperating,
  onPress,
  serviceBookmarked,
  onBookmarkPress,
}: {
  service: BusArrivalService;
  destinationName: string;
  isOperating?: boolean;
  onPress: () => void;
  serviceBookmarked: boolean;
  onBookmarkPress: () => void;
}) {
  const { colors } = useAppTheme();
  const next = service.NextBus;
  const next2 = service.NextBus2;
  const mins1 = formatArrivalMinutes(next.arrivalMinutes);
  const mins2 = formatArrivalMinutes(next2.arrivalMinutes);
  const loadColor = getLoadColor(next.Load);
  const loadColor2 = getLoadColor(next2.Load);
  const noEtaLabel = isOperating === false ? "Not In Op." : "No Est.";
  const comingWAB = next.Feature === "WAB";
  const nextWAB = next2.Feature === "WAB";
  const nextBusLineCard =
    mins2 === "—"
      ? noEtaLabel
      : mins2 === "Arr"
        ? "Next: Arr"
        : `Next: ${mins2}m`;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flex: 1,
        backgroundColor: pressed ? colors.mutedBg : colors.surface,
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        gap: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
      })}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        <View
          style={{
            width: 56,
            height: 42,
            backgroundColor: colors.primary,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: colors.onPrimary,
              fontWeight: "900",
              fontSize: service.ServiceNo.length > 3 ? 16 : 22,
            }}
          >
            {service.ServiceNo}
          </Text>
        </View>
        <ServiceBookmarkPill
          bookmarked={serviceBookmarked}
          onPress={onBookmarkPress}
          colors={colors}
          compact
        />
      </View>

      <Text
        style={{ fontSize: 10, color: colors.mutedFg, fontWeight: "500", textAlign: "center" }}
        numberOfLines={1}
      >
        {destinationName || "—"}
      </Text>

      <Text style={{ fontSize: 9, color: colors.fg, fontWeight: "600", textAlign: "center" }}>
        {getBusTypeLabel(next.Type)}
      </Text>

      {/* Wheelchair column + timings (aligned like list rows) */}
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 8,
          marginTop: 2,
        }}
      >
        <View
          style={{
            width: WAB_COL_W,
            alignItems: "center",
            gap: 6,
          }}
        >
          <View
            style={{
              width: WAB_COL_W,
              height: 30,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {comingWAB ? <WheelchairWabSvg size={12} /> : null}
          </View>
          <View
            style={{
              width: WAB_COL_W,
              height: 14,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {nextWAB ? <WheelchairWabSvg size={11} /> : null}
          </View>
        </View>

        <View style={{ alignItems: "flex-end", gap: 6, minWidth: 80 }}>
          {mins1 === "—" ? (
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                color: colors.mutedFg,
                textAlign: "right",
                minHeight: 30,
                alignSelf: "flex-end",
              }}
            >
              {noEtaLabel}
            </Text>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 3 }}>
              <Text style={{ fontSize: 28, fontWeight: "900", color: colors.fg, lineHeight: 32 }}>
                {mins1}
              </Text>
              {mins1 !== "Arr" ? (
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "700",
                    color: colors.primary,
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  min
                </Text>
              ) : (
                <View style={{ width: 10, marginBottom: 4 }} />
              )}
              <View
                style={{
                  width: 10,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: loadColor,
                  marginBottom: 5,
                  flexShrink: 0,
                }}
              />
            </View>
          )}

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              gap: 4,
            }}
          >
            <Text
              style={{
                flex: 1,
                minWidth: 0,
                fontSize: 10,
                color: colors.mutedFg,
                marginBottom: 4,
                lineHeight: 14,
                textAlign: "right",
                marginRight: 2,
              }}
              numberOfLines={1}
            >
              {nextBusLineCard}
            </Text>
            {mins2 !== "—" && (
              <View
                style={{
                  width: 10,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: loadColor2,
                  marginBottom: 4,
                  opacity: 0.85,
                  flexShrink: 0,
                }}
              />
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default function BusStopDetails() {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const params = useLocalSearchParams<{
    id: string;
    name: string;
    road: string;
    /** Comma-separated service numbers when opened from Bookmarks (subset view). */
    onlyServices?: string | string[];
  }>();
  const stopCode = params.id ?? "";
  const stopName = params.name ?? stopCode;
  const roadName = params.road ?? "";
  const onlyServicesRaw = params.onlyServices;
  const onlyServicesParam = Array.isArray(onlyServicesRaw)
    ? onlyServicesRaw.filter(Boolean).join(",")
    : (onlyServicesRaw ?? "");

  const { data, isLoading, dataUpdatedAt, refetch } = useBusArrivals(stopCode);
  const {
    isWholeStopBookmarked,
    isStopServiceBookmarked,
    toggleBookmark,
    toggleWholeStopBookmark,
  } = useBookmarks();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const filterServiceNos = useMemo(() => {
    const parts = onlyServicesParam
      .split(/[,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (!parts.length) return null;
    return new Set(parts);
  }, [onlyServicesParam]);

  const { data: stopMap } = useQuery({
    queryKey: ["busStopMap"],
    queryFn: async () => {
      const stops = await getAllBusStops();
      return new Map(stops.map((s) => [s.BusStopCode, s.Description]));
    },
    staleTime: Infinity,
  });

  const { data: staticServices } = useQuery({
    queryKey: ["servicesAtStop", stopCode],
    queryFn: () => getServicesAtStop(stopCode),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!stopCode,
  });

  const EMPTY_ARRIVAL: BusArrivalTime = {
    OriginCode: "", DestinationCode: "", EstimatedArrival: "",
    Monitored: 0, Latitude: "", Longitude: "", VisitNumber: "1",
    Load: "NA", Feature: "", Type: "SD", arrivalMinutes: -1,
  };

  // Map serviceNo → isInOperation, computed once per render from staticServices
  const operatingMap = useMemo(() => {
    const map = new Map<string, boolean>();
    for (const s of staticServices ?? []) {
      map.set(s.ServiceNo, isServiceInOperation(s));
    }
    return map;
  }, [staticServices]);

  const mergedServices = useMemo(() => {
    const live = data?.Services ?? [];
    if (!staticServices?.length) {
      return [...live].sort((a, b) => compareServiceNo(a.ServiceNo, b.ServiceNo));
    }
    const liveMap = new Map(live.map((s) => [s.ServiceNo, s]));
    const rows = staticServices.map((s) =>
      liveMap.get(s.ServiceNo) ?? {
        ServiceNo: s.ServiceNo,
        Operator: s.Operator,
        NextBus: { ...EMPTY_ARRIVAL, VisitNumber: "1" },
        NextBus2: { ...EMPTY_ARRIVAL, VisitNumber: "2" },
        NextBus3: { ...EMPTY_ARRIVAL, VisitNumber: "3" },
      }
    );
    return [...rows].sort((a, b) => compareServiceNo(a.ServiceNo, b.ServiceNo));
  }, [data?.Services, staticServices]);

  const displayedServices = useMemo(() => {
    if (!filterServiceNos?.size) return mergedServices;
    return mergedServices.filter((s) => filterServiceNos.has(s.ServiceNo));
  }, [mergedServices, filterServiceNos]);

  const bookmarkedWhole = isWholeStopBookmarked(stopCode);
  const updatedTime = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString("en-SG", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : "—";

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.surface }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Sticky header */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingBottom: 16,
          paddingHorizontal: 24,
          backgroundColor: `${colors.surface}E8`,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        {/* Top row */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <Pressable
            onPress={safeRouterBack}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.mutedBg,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Iconify icon="solar:alt-arrow-left-linear" size={20} color={colors.fg} />
          </Pressable>

          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "700", fontSize: 18, lineHeight: 24 }} numberOfLines={1}>
              {stopName}
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: colors.mutedFg,
                textTransform: "uppercase",
                fontWeight: "500",
              }}
            >
              Stop {stopCode} • {roadName}
            </Text>
          </View>

          <Pressable
            onPress={() => {
              toggleWholeStopBookmark({ stopCode, stopName, roadName });
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.mutedBg,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Iconify
              icon={bookmarkedWhole ? "solar:star-bold" : "solar:star-linear"}
              size={20}
              color={bookmarkedWhole ? "#eab308" : colors.mutedFg}
            />
          </Pressable>
        </View>

        {/* Bottom row: timestamp + view toggle */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            onPress={() => refetch()}
            style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
          >
            <Iconify icon="solar:refresh-linear" size={14} color={colors.mutedFg} />
            <Text
              style={{
                fontSize: 10,
                color: colors.mutedFg,
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Updated: {updatedTime}
            </Text>
          </Pressable>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: colors.mutedBg,
              borderRadius: 999,
              padding: 4,
              borderWidth: 1,
              borderColor: colors.border,
              height: 36,
              alignItems: "center",
            }}
          >
            {(["list", "grid"] as const).map((mode) => (
              <Pressable
                key={mode}
                onPress={() => setViewMode(mode)}
                style={{
                  width: 56,
                  height: "100%",
                  borderRadius: 999,
                  backgroundColor: viewMode === mode ? colors.primary : "transparent",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "700",
                    textTransform: "uppercase",
                    color: viewMode === mode ? colors.onPrimary : colors.mutedFg,
                  }}
                >
                  {mode}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      {/* Arrival list / grid */}
      {isLoading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      ) : viewMode === "grid" ? (
        <FlatList
          key="grid"
          data={displayedServices}
          keyExtractor={(item) => item.ServiceNo}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 + ADMOB_TAB_SCROLL_EXTRA, gap: 12 }}
          renderItem={({ item }) => (
            <BusArrivalCard
              service={item}
              destinationName={
                stopMap?.get(item.NextBus.DestinationCode) ?? (item.NextBus.DestinationCode || "—")
              }
              isOperating={operatingMap.get(item.ServiceNo)}
              serviceBookmarked={isStopServiceBookmarked(stopCode, item.ServiceNo)}
              onBookmarkPress={() => {
                const dest =
                  stopMap?.get(item.NextBus.DestinationCode) ?? (item.NextBus.DestinationCode || "—");
                toggleBookmark({
                  type: "service",
                  stopCode,
                  stopName,
                  roadName,
                  serviceNo: item.ServiceNo,
                  direction: dest,
                  bookmarkOrigin: "stop",
                });
              }}
              onPress={() => {
                router.push({
                  pathname: "/route/[id]",
                  params: { id: item.ServiceNo, stopCode, stopName },
                });
              }}
            />
          )}
          ListEmptyComponent={
            <View style={{ padding: 32, alignItems: "center", gap: 8 }}>
              <Iconify icon="solar:bus-broken" size={32} color={colors.mutedFg} />
              <Text style={{ color: colors.mutedFg, fontSize: 14, fontWeight: "600" }}>
                No bus services available
              </Text>
            </View>
          }
        />
      ) : (
        <FlatList
          key="list"
          data={displayedServices}
          keyExtractor={(item) => item.ServiceNo}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 + ADMOB_TAB_SCROLL_EXTRA }}
          renderItem={({ item }) => (
            <BusArrivalRow
              service={item}
              stopCode={stopCode}
              stopName={stopName}
              destinationName={
                stopMap?.get(item.NextBus.DestinationCode) ?? (item.NextBus.DestinationCode || "—")
              }
              isOperating={operatingMap.get(item.ServiceNo)}
              serviceBookmarked={isStopServiceBookmarked(stopCode, item.ServiceNo)}
              onBookmarkPress={() => {
                const dest =
                  stopMap?.get(item.NextBus.DestinationCode) ?? (item.NextBus.DestinationCode || "—");
                toggleBookmark({
                  type: "service",
                  stopCode,
                  stopName,
                  roadName,
                  serviceNo: item.ServiceNo,
                  direction: dest,
                  bookmarkOrigin: "stop",
                });
              }}
              onPress={() => {
                router.push({
                  pathname: "/route/[id]",
                  params: { id: item.ServiceNo, stopCode, stopName },
                });
              }}
            />
          )}
          ListEmptyComponent={
            <View style={{ padding: 32, alignItems: "center", gap: 8 }}>
              <Iconify icon="solar:bus-broken" size={32} color={colors.mutedFg} />
              <Text style={{ color: colors.mutedFg, fontSize: 14, fontWeight: "600" }}>
                No bus services available
              </Text>
            </View>
          }
        />
      )}
    </KeyboardAvoidingView>
  );
}
