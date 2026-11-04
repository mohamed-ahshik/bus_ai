import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Keyboard,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Iconify } from "react-native-iconify";
import GoogleMap, {
  type GoogleMapImperativeHandle,
  type MapMarker,
  type Region,
} from "../../components/GoogleMap";
import { useNearestStops } from "../../lib/hooks/useNearestStops";
import { usePrefetchNearby } from "../../lib/hooks/usePrefetchNearby";
import type { BusStop } from "../../lib/types";
import { getAllBusStops } from "../../lib/api/ltaBusStops";
import { getServiceNumbers } from "../../lib/api/ltaBusRoutes";
import { useAppTheme } from "../../lib/ThemeContext";
import type { AppColors } from "../../lib/theme";
import { ADMOB_TAB_SCROLL_EXTRA } from "../../lib/adMobConfig";

const MAP_DELTA = 0.012;
/** Max bus-stop pins on the home map (nearest first; list/prefetch still use more rows). */
const MAP_STOP_MARKER_LIMIT = 10;

function regionForLocation(latitude: number, longitude: number): Region {
  return {
    latitude,
    longitude,
    latitudeDelta: MAP_DELTA,
    longitudeDelta: MAP_DELTA,
  };
}

function BusStopRow({
  item,
  index,
  isFirst,
  colors,
}: {
  item: BusStop;
  index: number;
  isFirst: boolean;
  colors: AppColors;
}) {
  const isEven = index % 2 === 0;

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/stop/[id]",
          params: {
            id: item.BusStopCode,
            name: item.Description,
            road: item.RoadName,
          },
        })
      }
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: isEven ? colors.surface : colors.bgAlt,
        paddingHorizontal: 16,
        paddingVertical: 14,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      {/* Road name label (only shown on first in road group) */}
      <View style={{ width: 80, paddingRight: 8 }}>
        {isFirst ? (
          <Text
            style={{
              fontSize: 9,
              fontWeight: "700",
              color: colors.mutedFg,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            {item.RoadName}
          </Text>
        ) : null}
      </View>

      {/* Icon + stop info */}
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: colors.primary,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Iconify icon="solar:bus-bold" size={20} color={colors.onPrimary} />
        </View>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text
            numberOfLines={1}
            style={{ fontSize: 13, fontWeight: "700", color: colors.fg }}
          >
            {item.Description}
          </Text>
          <Text style={{ fontSize: 11, color: colors.mutedFg }}>
            {item.BusStopCode} • ~{item.distance?.toFixed(2)}km
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function NearestBusStops() {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const { stops, nearestStops, location, isOutsideSingapore, isLoading, refetch } =
    useNearestStops();
  const mapRef = useRef<GoogleMapImperativeHandle>(null);
  usePrefetchNearby(nearestStops);

  const mapMarkers = useMemo((): MapMarker[] => {
    return stops.slice(0, MAP_STOP_MARKER_LIMIT).map((stop) => ({
      id: stop.BusStopCode,
      coordinate: { latitude: stop.Latitude, longitude: stop.Longitude },
      title: stop.Description,
      description: stop.BusStopCode,
      pinColor: colors.primary,
      onPress: () =>
        router.push({
          pathname: "/stop/[id]",
          params: {
            id: stop.BusStopCode,
            name: stop.Description,
            road: stop.RoadName,
          },
        }),
    }));
  }, [stops, colors.primary]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allStops, setAllStops] = useState<BusStop[]>([]);
  const [serviceNumbers, setServiceNumbers] = useState<string[]>([]);
  const searchInputRef = useRef<TextInput>(null);

  useEffect(() => {
    getAllBusStops().then(setAllStops).catch(() => {});
  }, []);

  type SearchResult =
    | { type: "stop"; stop: BusStop }
    | { type: "service"; serviceNo: string };

  const searchResults = useMemo((): SearchResult[] => {
    const q = searchQuery.trim();
    if (!q) return [];
    const lower = q.toLowerCase();

    const matchedServices = serviceNumbers
      .filter((s) => s.toLowerCase().startsWith(lower))
      .slice(0, 5)
      .map((serviceNo): SearchResult => ({ type: "service", serviceNo }));

    const remainingSlots = 20 - matchedServices.length;
    const matchedStops = allStops
      .filter(
        (s) =>
          s.BusStopCode.startsWith(q) ||
          s.Description.toLowerCase().includes(lower)
      )
      .slice(0, remainingSlots)
      .map((stop): SearchResult => ({ type: "stop", stop }));

    return [...matchedServices, ...matchedStops];
  }, [searchQuery, allStops, serviceNumbers]);

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
    if (serviceNumbers.length === 0) {
      getServiceNumbers().then(setServiceNumbers).catch(() => {});
    }
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
    Keyboard.dismiss();
  };

  const handleStopSelect = (stop: BusStop) => {
    closeSearch();
    router.push({
      pathname: "/stop/[id]",
      params: { id: stop.BusStopCode, name: stop.Description, road: stop.RoadName },
    });
  };

  const handleServiceSelect = (serviceNo: string) => {
    closeSearch();
    router.push({
      pathname: "/route/[id]",
      params: { id: serviceNo },
    });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    const loc = await refetch();
    setRefreshing(false);
    if (loc) {
      mapRef.current?.animateToRegion(regionForLocation(loc.latitude, loc.longitude));
    }
  };

  const locationAddress = location?.address ?? "Locating...";
  const mapRegion = location
    ? regionForLocation(location.latitude, location.longitude)
    : regionForLocation(1.3521, 103.8198);

  const refreshLocationAndMap = useCallback(async () => {
    const loc = await refetch();
    if (loc) {
      mapRef.current?.animateToRegion(regionForLocation(loc.latitude, loc.longitude));
    }
  }, [refetch]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 12,
          paddingBottom: 12,
          paddingHorizontal: 24,
          backgroundColor: colors.surface,
          zIndex: 30,
        }}
      >
        {searchOpen ? (
          /* ── Search bar ── */
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.bgSection,
                borderRadius: 12,
                paddingHorizontal: 12,
                height: 42,
                gap: 8,
              }}
            >
              <Iconify icon="solar:magnifer-linear" size={18} color={colors.mutedFg} />
              <TextInput
                ref={searchInputRef}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Bus stop name or code…"
                placeholderTextColor={colors.mutedFg}
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: colors.fg,
                  paddingVertical: 0,
                  ...(Platform.OS === "android" ? { paddingTop: 0, paddingBottom: 0 } : {}),
                }}
                returnKeyType="search"
                autoCorrect={false}
                autoCapitalize="none"
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery("")}>
                  <Iconify icon="solar:close-circle-bold" size={18} color={colors.mutedFg} />
                </Pressable>
              )}
            </View>
            <Pressable onPress={closeSearch}>
              <Text style={{ fontSize: 14, fontWeight: "600", color: colors.primary }}>Cancel</Text>
            </Pressable>
          </View>
        ) : (
          /* ── Normal header ── */
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Iconify icon="solar:map-point-linear" size={22} color={colors.mutedFg} />
              <View>
                <Text style={{ fontSize: 15, fontWeight: "700", lineHeight: 20, color: colors.fg }}>
                  {locationAddress}
                </Text>
                <Text style={{ fontSize: 11, color: colors.mutedFg, fontWeight: "500" }}>
                  {location?.country || "Singapore"}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
              <Pressable onPress={openSearch}>
                <Iconify icon="solar:magnifer-linear" size={20} color={colors.mutedFg} />
              </Pressable>
            </View>
          </View>
        )}

        {/* ── Search results dropdown ── */}
        {searchOpen && searchQuery.trim().length > 0 && (
          <View
            style={{
              marginTop: 8,
              backgroundColor: colors.surface,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: colors.border,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 8,
              maxHeight: 320,
              overflow: "hidden",
            }}
          >
            {searchResults.length === 0 ? (
              <View style={{ padding: 16, alignItems: "center" }}>
                <Text style={{ fontSize: 13, color: colors.mutedFg }}>No stops found</Text>
              </View>
            ) : (
              <FlatList
                data={searchResults}
                keyExtractor={(item) =>
                  item.type === "stop" ? item.stop.BusStopCode : `svc-${item.serviceNo}`
                }
                keyboardShouldPersistTaps="handled"
                renderItem={({ item, index }) =>
                  item.type === "stop" ? (
                    <Pressable
                      onPress={() => handleStopSelect(item.stop)}
                      style={({ pressed }) => ({
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 14,
                        paddingVertical: 12,
                        gap: 12,
                        backgroundColor: pressed ? colors.bgSection : colors.surface,
                        borderTopWidth: index === 0 ? 0 : 1,
                        borderTopColor: colors.border,
                      })}
                    >
                      <View
                        style={{
                          width: 36,
                          height: 36,
                          backgroundColor: colors.primary,
                          borderRadius: 18,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Iconify icon="solar:bus-bold" size={18} color={colors.onPrimary} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text numberOfLines={1} style={{ fontSize: 13, fontWeight: "700", color: colors.fg }}>
                          {item.stop.Description}
                        </Text>
                        <Text style={{ fontSize: 11, color: colors.mutedFg }}>
                          {item.stop.BusStopCode} · {item.stop.RoadName}
                        </Text>
                      </View>
                      <Iconify icon="solar:alt-arrow-right-linear" size={16} color={colors.mutedFg} />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => handleServiceSelect(item.serviceNo)}
                      style={({ pressed }) => ({
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 14,
                        paddingVertical: 12,
                        gap: 12,
                        backgroundColor: pressed ? colors.bgSection : colors.surface,
                        borderTopWidth: index === 0 ? 0 : 1,
                        borderTopColor: colors.border,
                      })}
                    >
                      <View
                        style={{
                          width: 36,
                          height: 36,
                          backgroundColor: colors.primary,
                          borderRadius: 18,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Iconify icon="solar:route-bold" size={18} color={colors.onPrimary} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text numberOfLines={1} style={{ fontSize: 13, fontWeight: "700", color: colors.fg }}>
                          Bus {item.serviceNo}
                        </Text>
                        <Text style={{ fontSize: 11, color: colors.mutedFg }}>
                          Bus service
                        </Text>
                      </View>
                      <Iconify icon="solar:alt-arrow-right-linear" size={16} color={colors.mutedFg} />
                    </Pressable>
                  )
                }
              />
            )}
          </View>
        )}
      </View>

      {/* Map */}
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <View
          style={{
            width: "100%",
            aspectRatio: 16 / 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <GoogleMap
            ref={mapRef}
            style={{ flex: 1, borderRadius: 19 }}
            region={mapRegion}
            showsUserLocation
            showsMyLocationButton={false}
            markers={mapMarkers}
          />

          <Pressable
            onPress={refreshLocationAndMap}
            accessibilityLabel="Refresh GPS location"
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 40,
              height: 40,
              backgroundColor: colors.surface,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <Iconify icon="solar:gps-bold" size={18} color={colors.mutedFg} />
          </Pressable>
        </View>
      </View>

      {/* Stop list */}
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bgSection,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          overflow: "hidden",
        }}
      >
        {isLoading ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator color={colors.primary} size="large" />
          </View>
        ) : isOutsideSingapore ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 32,
              gap: 8,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: colors.fg, textAlign: "center" }}>
              You're outside Singapore
            </Text>
            <Text style={{ fontSize: 13, color: colors.mutedFg, textAlign: "center", lineHeight: 19 }}>
              SG Bus Flow only shows LTA bus stops in Singapore. Move within Singapore and refresh to see nearby stops.
            </Text>
            <Pressable onPress={handleRefresh} style={{ paddingVertical: 10, paddingHorizontal: 16 }}>
              <Text style={{ fontSize: 13, fontWeight: "700", color: colors.primary }}>Refresh location</Text>
            </Pressable>
          </View>
        ) : nearestStops.length === 0 ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 32,
              gap: 8,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: colors.fg, textAlign: "center" }}>
              No bus stops found nearby
            </Text>
            <Text style={{ fontSize: 13, color: colors.mutedFg, textAlign: "center", lineHeight: 19 }}>
              Try refreshing your location.
            </Text>
          </View>
        ) : (
          <FlatList
            data={nearestStops}
            keyExtractor={(item) => item.BusStopCode}
            contentContainerStyle={{ paddingBottom: 100 + ADMOB_TAB_SCROLL_EXTRA }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={colors.primary}
              />
            }
            renderItem={({ item, index }) => {
              const isFirst =
                index === 0 ||
                nearestStops[index - 1]?.RoadName !== item.RoadName;
              return (
                <BusStopRow item={item} index={index} isFirst={isFirst} colors={colors} />
              );
            }}
            ItemSeparatorComponent={() => (
              <View
                style={{ height: 1, backgroundColor: colors.border, marginLeft: 80 }}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}
