import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Iconify } from "react-native-iconify";
import { useQuery } from "@tanstack/react-query";
import type { RouteStop } from "../../lib/types";
import { getRouteStops } from "../../lib/api/ltaBusRoutes";
import { useBookmarks } from "../../lib/hooks/useBookmarks";
import { useBusArrivals } from "../../lib/hooks/useBusArrivals";
import { useCrowdLevel, type CrowdInfo } from "../../lib/hooks/useCrowdLevel";

const PRIMARY = "#2e7d32";
const MUTED_FG = "#757575";
const BORDER = "#eeeeee";
const WHITE = "#ffffff";
const FG = "#1a1a1a";
const MUTED_BG = "#f5f5f5";

function useRouteStops(serviceNo: string, originStopCode?: string) {
  return useQuery<RouteStop[]>({
    queryKey: ["routeStops", serviceNo, originStopCode],
    enabled: !!serviceNo,
    queryFn: async () => {
      const stops = await getRouteStops(serviceNo, originStopCode);
      const originIdx = originStopCode
        ? stops.findIndex((s) => s.stopCode === originStopCode)
        : 0;
      return stops.map((s, i) => ({
        ...s,
        estimatedMinutes:
          i < (originIdx < 0 ? 0 : originIdx) ? undefined : s.estimatedMinutes,
      }));
    },
    staleTime: 300000,
  });
}

function RouteStopItem({
  stop,
  index,
  originIndex,
  originDistance,
  totalStops,
  arrivedMinutes,
  crowd,
}: {
  stop: RouteStop;
  index: number;
  originIndex: number;
  originDistance: number;
  totalStops: number;
  arrivedMinutes: number;
  crowd?: CrowdInfo;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isPassed = index < originIndex;
  const isCurrent = index === originIndex;

  const dotColor = isPassed ? BORDER : PRIMARY;
  const opacity = isPassed ? 0.4 : isCurrent ? 1 : 0.7 - (index - originIndex) * 0.1;
  const distFromOrigin = Math.max(0, stop.distance - originDistance);
  const estMins = Math.round(distFromOrigin / 0.5);

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
            backgroundColor: WHITE,
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
                backgroundColor: PRIMARY,
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
              color: isCurrent ? PRIMARY : FG,
            }}
          >
            {stop.stopName}
          </Text>
          {isCurrent && (
            <Iconify icon="solar:map-point-bold" size={12} color={PRIMARY} />
          )}
        </View>
        <Text style={{ fontSize: 11, color: MUTED_FG, fontWeight: "500" }}>
          {isCurrent
            ? `Stop ${stop.stopCode} • Arriving in ${arrivedMinutes}m`
            : !isPassed && index > originIndex
            ? `+${estMins} mins • ${distFromOrigin.toFixed(1)} km`
            : `Stop ${stop.stopCode}`}
        </Text>
      </View>

      {/* Crowd indicator */}
      {crowd && !isPassed && (
        <View style={{ position: "relative" }}>
          <Pressable
            onPress={() => setShowTooltip(!showTooltip)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: `${crowd.color}1A`,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: `${crowd.color}33`,
            }}
          >
            <Iconify icon="solar:users-group-rounded-bold" size={18} color={crowd.color} />
            <View
              style={{
                position: "absolute",
                bottom: 2,
                left: 4,
                right: 4,
                height: 3,
                borderRadius: 1.5,
                backgroundColor: crowd.color,
              }}
            />
          </Pressable>

          {showTooltip && (
            <Pressable
              onPress={() => setShowTooltip(false)}
              style={{
                position: "absolute",
                right: 48,
                top: -4,
                backgroundColor: FG,
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: 8,
                minWidth: 140,
                zIndex: 100,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 6,
                elevation: 8,
              }}
            >
              <Text style={{ color: WHITE, fontWeight: "700", fontSize: 11, marginBottom: 4 }}>
                {crowd.label}
              </Text>
              <Text style={{ color: "#ccc", fontSize: 10 }}>
                Tap In: {crowd.tapIn.toLocaleString()}
              </Text>
              <Text style={{ color: "#ccc", fontSize: 10 }}>
                Tap Out: {crowd.tapOut.toLocaleString()}
              </Text>
            </Pressable>
          )}
        </View>
      )}

      {isCurrent && !crowd && (
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: `${PRIMARY}1A`,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Iconify icon="solar:bus-bold" size={20} color={PRIMARY} />
        </View>
      )}
    </View>
  );
}

export default function RouteDetails() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    id: string;
    stopCode: string;
    stopName: string;
  }>();
  const serviceNo = params.id ?? "";
  const stopCode = params.stopCode ?? "";
  const stopName = params.stopName ?? "";

  const { data: stops, isLoading } = useRouteStops(serviceNo, stopCode);
  const { data: arrivals } = useBusArrivals(stopCode);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const stopCodes = useMemo(
    () => (stops ?? []).map((s) => s.stopCode),
    [stops]
  );
  const { data: crowdMap } = useCrowdLevel(stopCodes);

  // Derive destination from the direction-correct stops list rather than a
  // separate query, which would always return Direction 1's terminal.
  const destinationLabel =
    stops && stops.length > 0 ? stops[stops.length - 1].stopName : "Terminal";
  const bookmarked = isBookmarked(stopCode, serviceNo);

  const currentService = arrivals?.Services.find(
    (s) => s.ServiceNo === serviceNo
  );
  const arrivalMins = currentService?.NextBus.arrivalMinutes ?? 3;

  const originIndex = stops
    ? Math.max(0, stops.findIndex((s) => s.stopCode === stopCode))
    : 0;

  const totalStops = stops?.length ?? 0;
  const stopsFromHere = totalStops - originIndex;

  const originStop = stops?.[originIndex];
  const originDistance = originStop?.distance ?? 0;

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      {/* Header section */}
      <View
        style={{
          backgroundColor: MUTED_BG,
          paddingTop: insets.top + 8,
          paddingBottom: 24,
          paddingHorizontal: 24,
          borderBottomLeftRadius: 28,
          borderBottomRightRadius: 28,
          borderBottomWidth: 1,
          borderBottomColor: BORDER,
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
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: WHITE,
              borderWidth: 1,
              borderColor: BORDER,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Iconify icon="solar:alt-arrow-left-linear" size={20} color={FG} />
          </Pressable>

          <View style={{ alignItems: "center" }}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 4,
                backgroundColor: PRIMARY,
                borderRadius: 12,
                marginBottom: 4,
                shadowColor: PRIMARY,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 4,
              }}
            >
              <Text style={{ color: WHITE, fontWeight: "900", fontSize: 24 }}>
                {serviceNo}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                fontWeight: "700",
                letterSpacing: 2,
                color: MUTED_FG,
              }}
            >
              To {destinationLabel}
            </Text>
          </View>

          <Pressable
            onPress={() =>
              toggleBookmark({
                type: "service",
                stopCode,
                stopName,
                roadName: "",
                serviceNo,
                direction: `To ${destinationLabel}`,
              })
            }
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: WHITE,
              borderWidth: 1,
              borderColor: BORDER,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Iconify
              icon={bookmarked ? "solar:star-bold" : "solar:star-linear"}
              size={20}
              color={bookmarked ? "#eab308" : PRIMARY}
            />
          </Pressable>
        </View>

        {/* Stats */}
        <View
          style={{
            backgroundColor: WHITE,
            borderRadius: 16,
            padding: 12,
            borderWidth: 1,
            borderColor: BORDER,
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
              backgroundColor: `${PRIMARY}1A`,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Iconify
              icon="solar:map-point-bold-duotone"
              size={20}
              color={PRIMARY}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 10,
                color: MUTED_FG,
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              Remaining Stops
            </Text>
            <Text style={{ fontSize: 13, fontWeight: "700" }}>
              {stopsFromHere} to {destinationLabel}
            </Text>
          </View>
        </View>
      </View>

      {/* Route stops list */}
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={PRIMARY} size="large" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 40,
            paddingTop: 40,
            paddingBottom: 120,
          }}
        >
          {/* Gray line: passed stops (top to current) */}
          {originIndex > 0 && (
            <View
              style={{
                position: "absolute",
                left: 53,
                top: 50,
                height: `${(originIndex / Math.max(1, totalStops - 1)) * 100}%`,
                width: 6,
                backgroundColor: MUTED_BG,
                borderRadius: 3,
              }}
            />
          )}
          {/* Green line: current stop to terminal */}
          <View
            style={{
              position: "absolute",
              left: 53,
              top: `${((originIndex / Math.max(1, totalStops - 1)) * 100).toFixed(1)}%`,
              marginTop: 50,
              bottom: 80,
              width: 6,
              backgroundColor: PRIMARY,
              borderRadius: 3,
              shadowColor: PRIMARY,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            }}
          />

          {(stops ?? []).map((stop, index) => (
            <RouteStopItem
              key={stop.stopCode + index}
              stop={stop}
              index={index}
              originIndex={originIndex}
              originDistance={originDistance}
              totalStops={totalStops}
              arrivedMinutes={arrivalMins}
              crowd={crowdMap?.get(stop.stopCode)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
