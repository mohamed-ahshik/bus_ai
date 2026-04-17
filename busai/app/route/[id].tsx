import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Iconify } from "react-native-iconify";
import { useQuery } from "@tanstack/react-query";
import type { RouteStop } from "../../lib/types";
import { getBothDirectionsFull } from "../../lib/api/ltaBusRoutes";
import { useBookmarks } from "../../lib/hooks/useBookmarks";
import { safeRouterBack } from "../../lib/safeRouterBack";
import { useAppTheme } from "../../lib/ThemeContext";
import { ADMOB_TAB_SCROLL_EXTRA } from "../../lib/adMobConfig";

/** Fallback row height for direction-2 scroll (nested card layout). */
const EST_DIR2_ROW_PX = 58;

/** Vertical centre of the 28px dot column within each direction-1 row (px from row top). */
const DIR1_DOT_CY = 14;

function useRouteData(serviceNo: string, originStopCode?: string) {
  return useQuery({
    queryKey: ["routeBothDirs", serviceNo, originStopCode],
    enabled: !!serviceNo,
    queryFn: () => getBothDirectionsFull(serviceNo, originStopCode),
    staleTime: 300000,
  });
}

function RouteStopItem({
  stop,
  index,
  originIndex,
  totalStops,
}: {
  stop: RouteStop;
  index: number;
  originIndex: number;
  totalStops: number;
}) {
  const { colors } = useAppTheme();
  const isPassed = index < originIndex;
  const isCurrent = index === originIndex;

  const dotColor = isPassed ? colors.border : colors.primary;
  const opacity = isPassed ? 0.4 : isCurrent ? 1 : 0.7 - (index - originIndex) * 0.1;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 24,
        marginBottom: index < totalStops - 1 ? 48 : 0,
        opacity: Math.max(0.3, opacity),
      }}
    >
      <View style={{ alignItems: "center", width: 28 }}>
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            borderWidth: isCurrent ? 6 : 4,
            borderColor: dotColor,
            backgroundColor: colors.surface,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          {isCurrent && (
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.primary,
              }}
            />
          )}
        </View>
      </View>

      <View style={{ flex: 1, marginTop: -2 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 15,
              color: isCurrent ? colors.primary : colors.fg,
            }}
          >
            {stop.stopName}
          </Text>
          {isCurrent && (
            <Iconify icon="solar:map-point-bold" size={12} color={colors.primary} />
          )}
        </View>
        <Text style={{ fontSize: 11, color: colors.mutedFg, fontWeight: "500" }}>
          Stop {stop.stopCode}
        </Text>
      </View>

      {isCurrent && (
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: `${colors.primary}1A`,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Iconify icon="solar:bus-bold" size={20} color={colors.primary} />
        </View>
      )}
    </View>
  );
}

function OppositeDirectionStop({
  stop,
  isLast,
}: {
  stop: RouteStop;
  isLast: boolean;
}) {
  const { colors } = useAppTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        paddingVertical: 12,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: colors.border,
      }}
    >
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: "#c8c8c8",
        }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, color: colors.mutedFg, fontWeight: "500" }}>
          {stop.stopName}
        </Text>
        <Text style={{ fontSize: 11, color: "#bbb" }}>{stop.stopCode}</Text>
      </View>
    </View>
  );
}

export default function RouteDetails() {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const params = useLocalSearchParams<{
    id: string;
    stopCode: string;
    stopName: string;
  }>();
  const serviceNo = params.id ?? "";
  const stopCode = params.stopCode ?? "";
  const stopName = params.stopName ?? "";

  const [activeDirection, setActiveDirection] = useState<1 | 2>(1);
  const dir1ScrollRef = useRef<ScrollView>(null);
  const dir2ScrollRef = useRef<ScrollView>(null);
  /** Measured `layout.y` of each direction-1 row wrapper (relative to scroll content). */
  const dir1RowTopRef = useRef<number[]>([]);
  const dir1ScrollRafRef = useRef<number | null>(null);
  const [dir1LineTick, setDir1LineTick] = useState(0);

  const { data: routeData, isLoading } = useRouteData(serviceNo, stopCode);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const stops = routeData?.dir1 ?? [];
  const oppositeStops = routeData?.dir2 ?? [];
  const dir1Terminal = routeData?.dir1Terminal ?? "Terminal";
  const dir2Terminal = routeData?.dir2Terminal ?? "Terminal";

  const activeTerminal = activeDirection === 1 ? dir1Terminal : dir2Terminal;

  const bookmarked = isBookmarked(stopCode, serviceNo);

  const originIndex = stops.length > 0
    ? Math.max(0, stops.findIndex((s) => s.stopCode === stopCode))
    : 0;

  const totalStops = stops.length;
  const stopsFromHere = totalStops - originIndex;

  const hasOpposite = oppositeStops.length > 0;

  useEffect(() => {
    dir1RowTopRef.current = new Array(stops.length);
  }, [serviceNo, stopCode, stops.length]);

  const dir1LineMetrics = useMemo(() => {
    const tops = dir1RowTopRef.current;
    const last = totalStops - 1;
    if (last < 0 || tops.length < totalStops) return null;
    if (
      typeof tops[originIndex] !== "number" ||
      typeof tops[last] !== "number" ||
      (originIndex > 0 && typeof tops[0] !== "number")
    ) {
      return null;
    }
    const greenTop = tops[originIndex] + DIR1_DOT_CY;
    const greenBottom = tops[last] + DIR1_DOT_CY;
    const greenHeight = Math.max(0, greenBottom - greenTop);
    const grey =
      originIndex > 0
        ? {
            top: tops[0] + DIR1_DOT_CY,
            height: Math.max(
              0,
              tops[originIndex] + DIR1_DOT_CY - (tops[0] + DIR1_DOT_CY)
            ),
          }
        : null;
    return { greenTop, greenHeight, grey };
  }, [dir1LineTick, originIndex, totalStops, stops.length]);

  useEffect(
    () => () => {
      if (dir1ScrollRafRef.current != null) {
        cancelAnimationFrame(dir1ScrollRafRef.current);
      }
    },
    []
  );

  const scheduleScrollDir1ToBoardingStop = useCallback(() => {
    if (!stops.length || activeDirection !== 1) return;
    if (dir1ScrollRafRef.current != null) {
      cancelAnimationFrame(dir1ScrollRafRef.current);
    }
    dir1ScrollRafRef.current = requestAnimationFrame(() => {
      dir1ScrollRafRef.current = null;
      const top = dir1RowTopRef.current[originIndex];
      if (typeof top === "number" && Number.isFinite(top)) {
        dir1ScrollRef.current?.scrollTo({
          y: Math.max(0, top - 20),
          animated: true,
        });
        return;
      }
      const y = Math.max(0, originIndex * 100 - 80);
      dir1ScrollRef.current?.scrollTo({ y, animated: true });
    });
  }, [activeDirection, originIndex, stops.length]);

  const scrollDir2ToBoardingStop = useCallback(() => {
    if (!oppositeStops.length) return;
    const idx = oppositeStops.findIndex((s) => s.stopCode === stopCode);
    if (idx < 0) return;
    const y = Math.max(0, 16 + idx * EST_DIR2_ROW_PX - 80);
    dir2ScrollRef.current?.scrollTo({ y, animated: true });
  }, [oppositeStops, stopCode]);

  useEffect(() => {
    if (isLoading) return;
    if (activeDirection === 1 && stops.length > 0) {
      const t = setTimeout(scheduleScrollDir1ToBoardingStop, 200);
      return () => clearTimeout(t);
    }
    if (activeDirection === 2 && oppositeStops.length > 0) {
      const t = setTimeout(scrollDir2ToBoardingStop, 120);
      return () => clearTimeout(t);
    }
  }, [
    isLoading,
    activeDirection,
    stops.length,
    oppositeStops.length,
    scheduleScrollDir1ToBoardingStop,
    scrollDir2ToBoardingStop,
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      {/* Header section */}
      <View
        style={{
          backgroundColor: colors.mutedBg,
          paddingTop: insets.top + 8,
          paddingBottom: 24,
          paddingHorizontal: 24,
          borderBottomLeftRadius: 28,
          borderBottomRightRadius: 28,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        {/* Nav row */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <Pressable
            onPress={safeRouterBack}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Iconify icon="solar:alt-arrow-left-linear" size={20} color={colors.fg} />
          </Pressable>

          <View style={{ alignItems: "center" }}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 4,
                backgroundColor: colors.primary,
                borderRadius: 12,
                marginBottom: 4,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 4,
              }}
            >
              <Text style={{ color: colors.surface, fontWeight: "900", fontSize: 24 }}>
                {serviceNo}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                fontWeight: "700",
                letterSpacing: 2,
                color: colors.mutedFg,
              }}
            >
              To {activeTerminal}
            </Text>
          </View>

          <Pressable
            onPress={() => {
              toggleBookmark({
                type: "service",
                stopCode,
                stopName,
                roadName: "",
                serviceNo,
                direction: `To ${dir1Terminal}`,
                bookmarkOrigin: "route",
              });
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Iconify
              icon={bookmarked ? "solar:star-bold" : "solar:star-linear"}
              size={20}
              color={bookmarked ? "#eab308" : colors.primary}
            />
          </Pressable>
        </View>

        {/* Direction toggle — only shown when there are two directions */}
        {hasOpposite && (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: colors.border,
              borderRadius: 24,
              padding: 4,
              marginBottom: 16,
            }}
          >
            {([1, 2] as const).map((dir) => {
              const active = activeDirection === dir;
              return (
                <Pressable
                  key={dir}
                  onPress={() => {
                    setActiveDirection(dir);
                  }}
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    borderRadius: 20,
                    backgroundColor: active ? colors.primary : "transparent",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <Text
                    style={{
                      color: active ? colors.surface : colors.mutedFg,
                      fontWeight: "700",
                      fontSize: 13,
                    }}
                  >
                    Direction {dir}
                  </Text>
                  {active && (
                    <View
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: colors.surface,
                      }}
                    />
                  )}
                </Pressable>
              );
            })}
          </View>
        )}

        {/* Stats */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 16,
            padding: 12,
            borderWidth: 1,
            borderColor: colors.border,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: `${colors.primary}1A`,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Iconify
              icon="solar:map-point-bold-duotone"
              size={20}
              color={colors.primary}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 10,
                color: colors.mutedFg,
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              {activeDirection === 1 ? "Remaining Stops" : "Total Stops"}
            </Text>
            <Text style={{ fontSize: 13, fontWeight: "700" }}>
              {activeDirection === 1
                ? `${stopsFromHere} to ${dir1Terminal}`
                : `${oppositeStops.length} to ${dir2Terminal}`}
            </Text>
          </View>
        </View>
      </View>

      {/* Route stops list */}
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      ) : activeDirection === 1 ? (
        /* ── Direction 1: full green route ── */
        <ScrollView
          ref={dir1ScrollRef}
          onContentSizeChange={() => {
            setDir1LineTick((t) => t + 1);
            scheduleScrollDir1ToBoardingStop();
          }}
          contentContainerStyle={{
            paddingHorizontal: 40,
            paddingTop: 40,
            paddingBottom: 120 + ADMOB_TAB_SCROLL_EXTRA,
          }}
        >
          {dir1LineMetrics?.grey && dir1LineMetrics.grey.height > 0 ? (
            <View
              style={{
                position: "absolute",
                left: 53,
                top: dir1LineMetrics.grey.top,
                height: dir1LineMetrics.grey.height,
                width: 6,
                backgroundColor: colors.mutedBg,
                borderRadius: 3,
              }}
            />
          ) : null}
          {dir1LineMetrics && dir1LineMetrics.greenHeight > 0 ? (
            <View
              style={{
                position: "absolute",
                left: 53,
                top: dir1LineMetrics.greenTop,
                height: dir1LineMetrics.greenHeight,
                width: 6,
                backgroundColor: colors.primary,
                borderRadius: 3,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
              }}
            />
          ) : null}

          {stops.map((stop, index) => (
            <View
              key={stop.stopCode + index}
              collapsable={false}
              onLayout={(e) => {
                dir1RowTopRef.current[index] = e.nativeEvent.layout.y;
                setDir1LineTick((t) => t + 1);
                if (index === originIndex) {
                  scheduleScrollDir1ToBoardingStop();
                }
              }}
            >
              <RouteStopItem
                stop={stop}
                index={index}
                originIndex={originIndex}
                totalStops={totalStops}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        /* ── Direction 2: plain opposite route, no green ── */
        <ScrollView
          ref={dir2ScrollRef}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 24,
            paddingBottom: 120 + ADMOB_TAB_SCROLL_EXTRA,
          }}
        >
          <Text style={{ fontSize: 12, color: "#9e9e9e", marginBottom: 16 }}>
            Cross the road to board this direction
          </Text>
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.border,
              paddingHorizontal: 16,
              paddingVertical: 4,
            }}
          >
            {oppositeStops.map((stop, index) => (
              <OppositeDirectionStop
                key={stop.stopCode + index}
                stop={stop}
                isLast={index === oppositeStops.length - 1}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
