import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
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
import type { BusArrivalService } from "../../lib/types";
import { getAllBusStops } from "../../lib/api/ltaBusStops";
import { getServicesAtStop, isServiceInOperation } from "../../lib/api/ltaBusRoutes";
import { useQuery } from "@tanstack/react-query";
import type { BusArrivalTime } from "../../lib/types";

const PRIMARY = "#2e7d32";
const MUTED_FG = "#757575";
const BORDER = "#eeeeee";
const WHITE = "#ffffff";
const FG = "#1a1a1a";
const MUTED_BG = "#f5f5f5";

const BUS_DD_IMG = require("../../assets/bus-double-decker.png");
const BUS_SD_IMG = require("../../assets/bus-single-decker.png");

function BusArrivalRow({
  service,
  stopCode,
  stopName,
  destinationName,
  isOperating,
  onPress,
}: {
  service: BusArrivalService;
  stopCode: string;
  stopName: string;
  destinationName: string;
  isOperating?: boolean;
  onPress: () => void;
}) {
  const next = service.NextBus;
  const next2 = service.NextBus2;
  const mins1 = formatArrivalMinutes(next.arrivalMinutes);
  const mins2 = formatArrivalMinutes(next2.arrivalMinutes);
  const loadColor = getLoadColor(next.Load);
  const loadColor2 = getLoadColor(next2.Load);
  const isDoubleDeck = next.Type === "DD";
  const destination = destinationName || "—";
  const frequency = next.arrivalMinutes != null && next2.arrivalMinutes != null && next2.arrivalMinutes > 0
    ? `~${next2.arrivalMinutes - (next.arrivalMinutes ?? 0)}m`
    : "—";
  const isWAB = next.Feature === "WAB";
  const isScheduled = mins1 !== "—" && next.Monitored === 0;

  // "—" label when no live ETA: distinguish "No Est. Available" vs "Not In Operation"
  const noEtaLabel = isOperating === false ? "Not In Op." : "No Est.";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: `${BORDER}80`,
        backgroundColor: pressed ? MUTED_BG : WHITE,
      })}
    >
      {/* Service number + destination */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <View
          style={{
            width: 64,
            height: 48,
            backgroundColor: PRIMARY,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: WHITE,
              fontWeight: "900",
              fontSize: service.ServiceNo.length > 3 ? 18 : 24,
            }}
          >
            {service.ServiceNo}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "700", fontSize: 13, color: FG }}>
            {destination}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 }}>
            <Text style={{ fontSize: 11, color: MUTED_FG }}>
              {getBusTypeLabel(next.Type)}
            </Text>
            <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: MUTED_FG }} />
            <Text style={{ fontSize: 11, color: MUTED_FG }}>
              Freq: {frequency}
            </Text>
            {isWAB && (
              <Iconify icon="solar:accessibility-linear" size={13} color="#2563eb" />
            )}
            {isScheduled && (
              <Iconify icon="solar:clock-circle-linear" size={13} color="#d97706" />
            )}
          </View>
        </View>
      </View>

      {/* Arrival times */}
      <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
        <View style={{ alignItems: "flex-end" }}>
          {/* First bus */}
          <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 4 }}>
            <View style={{ width: 22, height: 14, justifyContent: "flex-end" }}>
              <Image
                source={isDoubleDeck ? BUS_DD_IMG : BUS_SD_IMG}
                style={{ width: 20, height: 14 }}
                resizeMode="contain"
              />
            </View>
            {mins1 === "—" ? (
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "700",
                  color: MUTED_FG,
                  minWidth: 44,
                  textAlign: "right",
                  marginBottom: 2,
                }}
              >
                {noEtaLabel}
              </Text>
            ) : (
              <>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "900",
                    color: FG,
                    minWidth: 44,
                    textAlign: "right",
                  }}
                >
                  {mins1}
                </Text>
                {mins1 !== "Arr" && (
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "700",
                      color: PRIMARY,
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    min
                  </Text>
                )}
                <View
                  style={{
                    width: 10,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: loadColor,
                    marginBottom: 4,
                  }}
                />
              </>
            )}
          </View>
          {/* Second bus */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              marginTop: 4,
            }}
          >
            <View style={{ width: 22, height: 11, justifyContent: "center" }}>
              <Image
                source={next2.Type === "DD" ? BUS_DD_IMG : BUS_SD_IMG}
                style={{ width: 16, height: 11 }}
                resizeMode="contain"
              />
            </View>
            <Text style={{ fontSize: 10, color: MUTED_FG, minWidth: 52 }}>
              {mins2 === "—" ? noEtaLabel : `Next: ${mins2}m`}
            </Text>
            {mins2 !== "—" && (
              <View
                style={{
                  width: 10,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: loadColor2,
                }}
              />
            )}
          </View>
        </View>
        <Iconify icon="solar:alt-arrow-right-linear" size={20} color={MUTED_FG} />
      </View>
    </Pressable>
  );
}

function BusArrivalCard({
  service,
  destinationName,
  isOperating,
  onPress,
}: {
  service: BusArrivalService;
  destinationName: string;
  isOperating?: boolean;
  onPress: () => void;
}) {
  const next = service.NextBus;
  const next2 = service.NextBus2;
  const mins1 = formatArrivalMinutes(next.arrivalMinutes);
  const mins2 = formatArrivalMinutes(next2.arrivalMinutes);
  const loadColor = getLoadColor(next.Load);
  const noEtaLabel = isOperating === false ? "Not In Op." : "No Est.";
  const isWAB = next.Feature === "WAB";
  const isScheduled = mins1 !== "—" && next.Monitored === 0;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flex: 1,
        backgroundColor: pressed ? MUTED_BG : WHITE,
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: BORDER,
        alignItems: "center",
        gap: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
      })}
    >
      <View
        style={{
          width: 56,
          height: 42,
          backgroundColor: PRIMARY,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: WHITE,
            fontWeight: "900",
            fontSize: service.ServiceNo.length > 3 ? 16 : 22,
          }}
        >
          {service.ServiceNo}
        </Text>
      </View>

      <Text
        style={{ fontSize: 10, color: MUTED_FG, fontWeight: "500", textAlign: "center" }}
        numberOfLines={1}
      >
        {destinationName || "—"}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Text style={{ fontSize: 9, color: MUTED_FG, fontWeight: "600" }}>
          {getBusTypeLabel(next.Type)}
        </Text>
        {isWAB && (
          <Iconify icon="solar:accessibility-linear" size={12} color="#2563eb" />
        )}
        {isScheduled && (
          <Iconify icon="solar:clock-circle-linear" size={12} color="#d97706" />
        )}
      </View>

      {mins1 === "—" ? (
        <Text style={{ fontSize: 12, fontWeight: "700", color: MUTED_FG, textAlign: "center" }}>
          {noEtaLabel}
        </Text>
      ) : (
        <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 3 }}>
          <Text style={{ fontSize: 28, fontWeight: "900", color: FG, lineHeight: 32 }}>
            {mins1}
          </Text>
          {mins1 !== "Arr" && (
            <Text
              style={{
                fontSize: 10,
                fontWeight: "700",
                color: PRIMARY,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              min
            </Text>
          )}
        </View>
      )}

      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        {mins2 !== "—" && (
          <View
            style={{
              width: 10,
              height: 6,
              borderRadius: 3,
              backgroundColor: loadColor,
            }}
          />
        )}
        <Text style={{ fontSize: 10, color: MUTED_FG }}>
          {mins2 === "—" ? noEtaLabel : `Next: ${mins2}m`}
        </Text>
      </View>
    </Pressable>
  );
}

export default function BusStopDetails() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ id: string; name: string; road: string }>();
  const stopCode = params.id ?? "";
  const stopName = params.name ?? stopCode;
  const roadName = params.road ?? "";

  const { data, isLoading, dataUpdatedAt, refetch } = useBusArrivals(stopCode);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [aiQuery, setAiQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

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
    if (live.length > 0) return live;
    if (!staticServices?.length) return live;
    // Night-time: build ghost entries from static route data
    return staticServices.map((s) => ({
      ServiceNo: s.ServiceNo,
      Operator: s.Operator,
      NextBus: { ...EMPTY_ARRIVAL, VisitNumber: "1" },
      NextBus2: { ...EMPTY_ARRIVAL, VisitNumber: "2" },
      NextBus3: { ...EMPTY_ARRIVAL, VisitNumber: "3" },
    }));
  }, [data?.Services, staticServices]);

  const bookmarked = isBookmarked(stopCode);
  const updatedTime = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString("en-SG", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : "—";

  const handleAISubmit = () => {
    if (aiQuery.trim()) {
      router.push({
        pathname: "/trip/navigate",
        params: {
          query: aiQuery.trim(),
          fromStop: stopCode,
          fromStopName: stopName,
          fromRoad: roadName,
        },
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: WHITE }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Sticky header */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingBottom: 16,
          paddingHorizontal: 24,
          backgroundColor: `${WHITE}E8`,
          borderBottomWidth: 1,
          borderBottomColor: BORDER,
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
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: MUTED_BG,
              borderWidth: 1,
              borderColor: BORDER,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Iconify icon="solar:alt-arrow-left-linear" size={20} color={FG} />
          </Pressable>

          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "700", fontSize: 18, lineHeight: 24 }} numberOfLines={1}>
              {stopName}
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: MUTED_FG,
                textTransform: "uppercase",
                fontWeight: "500",
              }}
            >
              Stop {stopCode} • {roadName}
            </Text>
          </View>

          <Pressable
            onPress={() =>
              toggleBookmark({
                type: "stop",
                stopCode,
                stopName,
                roadName,
              })
            }
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: MUTED_BG,
              borderWidth: 1,
              borderColor: BORDER,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Iconify
              icon={bookmarked ? "solar:star-bold" : "solar:star-linear"}
              size={20}
              color={bookmarked ? "#eab308" : MUTED_FG}
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
            <Iconify icon="solar:refresh-linear" size={14} color={MUTED_FG} />
            <Text
              style={{
                fontSize: 10,
                color: MUTED_FG,
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
              backgroundColor: MUTED_BG,
              borderRadius: 999,
              padding: 4,
              borderWidth: 1,
              borderColor: BORDER,
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
                  backgroundColor: viewMode === mode ? PRIMARY : "transparent",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "700",
                    textTransform: "uppercase",
                    color: viewMode === mode ? WHITE : MUTED_FG,
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
          <ActivityIndicator color={PRIMARY} size="large" />
        </View>
      ) : viewMode === "grid" ? (
        <FlatList
          key="grid"
          data={mergedServices}
          keyExtractor={(item) => item.ServiceNo}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={{ padding: 16, paddingBottom: 180, gap: 12 }}
          renderItem={({ item }) => (
            <BusArrivalCard
              service={item}
              destinationName={
                stopMap?.get(item.NextBus.DestinationCode) ?? (item.NextBus.DestinationCode || "—")
              }
              isOperating={operatingMap.get(item.ServiceNo)}
              onPress={() =>
                router.push({
                  pathname: "/route/[id]",
                  params: { id: item.ServiceNo, stopCode, stopName },
                })
              }
            />
          )}
          ListEmptyComponent={
            <View style={{ padding: 32, alignItems: "center", gap: 8 }}>
              <Iconify icon="solar:bus-broken" size={32} color={MUTED_FG} />
              <Text style={{ color: MUTED_FG, fontSize: 14, fontWeight: "600" }}>
                No bus services available
              </Text>
            </View>
          }
        />
      ) : (
        <FlatList
          key="list"
          data={mergedServices}
          keyExtractor={(item) => item.ServiceNo}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 180 }}
          renderItem={({ item }) => (
            <BusArrivalRow
              service={item}
              stopCode={stopCode}
              stopName={stopName}
              destinationName={
                stopMap?.get(item.NextBus.DestinationCode) ?? (item.NextBus.DestinationCode || "—")
              }
              isOperating={operatingMap.get(item.ServiceNo)}
              onPress={() =>
                router.push({
                  pathname: "/route/[id]",
                  params: { id: item.ServiceNo, stopCode, stopName },
                })
              }
            />
          )}
          ListEmptyComponent={
            <View style={{ padding: 32, alignItems: "center", gap: 8 }}>
              <Iconify icon="solar:bus-broken" size={32} color={MUTED_FG} />
              <Text style={{ color: MUTED_FG, fontSize: 14, fontWeight: "600" }}>
                No bus services available
              </Text>
            </View>
          }
        />
      )}

      {/* AI Search Bar */}
      <View
        style={{
          position: "absolute",
          bottom: insets.bottom + 90,
          left: 16,
          right: 16,
          zIndex: 40,
        }}
      >
        <View
          style={{
            backgroundColor: `${WHITE}F2`,
            borderWidth: 1,
            borderColor: `${PRIMARY}33`,
            borderRadius: 16,
            height: 56,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            gap: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <Iconify icon="solar:magic-stick-3-bold" size={24} color={PRIMARY} />
          <TextInput
            style={{ flex: 1, fontSize: 13, color: FG, height: "100%" }}
            placeholder="How do I get to the National Museum?"
            placeholderTextColor={`${MUTED_FG}99`}
            value={aiQuery}
            onChangeText={setAiQuery}
            onSubmitEditing={handleAISubmit}
            returnKeyType="go"
          />
          <Pressable
            onPress={handleAISubmit}
            style={({ pressed }) => ({
              backgroundColor: PRIMARY,
              padding: 8,
              borderRadius: 12,
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Iconify icon="solar:arrow-up-bold" size={18} color={WHITE} />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
