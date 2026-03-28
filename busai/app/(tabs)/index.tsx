import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Iconify } from "react-native-iconify";
import GoogleMap, { type MapMarker } from "../../components/GoogleMap";
import { useNearestStops } from "../../lib/hooks/useNearestStops";
import type { BusStop } from "../../lib/types";
import { useCrowdLevel, type CrowdInfo } from "../../lib/hooks/useCrowdLevel";

const PRIMARY = "#2e7d32";
const MUTED_FG = "#757575";
const BORDER = "#eeeeee";
const WHITE = "#ffffff";
const BG_ALT = "#fcfcfc";
const BG_SECTION = "#f5f5f5";
const FG = "#1a1a1a";

function BusStopRow({
  item,
  index,
  isFirst,
  crowd,
}: {
  item: BusStop;
  index: number;
  isFirst: boolean;
  crowd?: CrowdInfo;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isEven = index % 2 === 0;
  const barColor = crowd?.color ?? "#9e9e9e";

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: isEven ? WHITE : BG_ALT,
        paddingHorizontal: 16,
        paddingVertical: 14,
      }}
    >
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
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
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
              color: MUTED_FG,
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
            backgroundColor: PRIMARY,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Iconify icon="solar:bus-bold" size={20} color={WHITE} />
        </View>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text
            numberOfLines={1}
            style={{ fontSize: 13, fontWeight: "700", color: "#1a1a1a" }}
          >
            {item.Description}
          </Text>
          <Text style={{ fontSize: 11, color: MUTED_FG }}>
            {item.BusStopCode} • ~{item.distance?.toFixed(2)}km
          </Text>
        </View>
      </View>
      </Pressable>

      {/* Bus icon badge — crowd level; tap for tap in/out */}
      <View style={{ position: "relative" }}>
        <Pressable
          onPress={() => setShowTooltip(!showTooltip)}
          style={{
            width: 40,
            height: 40,
            borderWidth: 2,
            borderColor: `${PRIMARY}33`,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            backgroundColor: "#1a2e2a",
          }}
        >
          <Iconify icon="solar:bus-bold" size={18} color={WHITE} />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 4,
              backgroundColor: barColor,
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
              {crowd?.label ?? "Loading…"}
            </Text>
            <Text style={{ color: "#ccc", fontSize: 10 }}>
              Tap In: {(crowd?.tapIn ?? 0).toLocaleString()}
            </Text>
            <Text style={{ color: "#ccc", fontSize: 10 }}>
              Tap Out: {(crowd?.tapOut ?? 0).toLocaleString()}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default function NearestBusStops() {
  const insets = useSafeAreaInsets();
  const { stops, location, isLoading, refetch } = useNearestStops();
  const [refreshing, setRefreshing] = useState(false);

  const stopCodes = useMemo(
    () => stops.map((s) => s.BusStopCode),
    [stops]
  );
  const { data: crowdMap } = useCrowdLevel(stopCodes);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const locationAddress = location?.address ?? "Locating...";
  const mapRegion = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.012,
        longitudeDelta: 0.012,
      }
    : {
        latitude: 1.3521,
        longitude: 103.8198,
        latitudeDelta: 0.012,
        longitudeDelta: 0.012,
      };

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 12,
          paddingBottom: 12,
          paddingHorizontal: 24,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: WHITE,
          zIndex: 30,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Iconify icon="solar:map-point-linear" size={22} color={MUTED_FG} />
          <View>
            <Text style={{ fontSize: 15, fontWeight: "700", lineHeight: 20 }}>
              {locationAddress}
            </Text>
            <Text style={{ fontSize: 11, color: MUTED_FG, fontWeight: "500" }}>
              Singapore
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <Iconify icon="solar:magnifer-linear" size={20} color={MUTED_FG} />
          <Iconify icon="solar:info-circle-linear" size={20} color={MUTED_FG} />
        </View>
      </View>

      {/* Map */}
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <View
          style={{
            width: "100%",
            aspectRatio: 16 / 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: BORDER,
          }}
        >
          <GoogleMap
            style={{ flex: 1, borderRadius: 19 }}
            region={mapRegion}
            showsUserLocation
            showsMyLocationButton={false}
            markers={stops.map((stop): MapMarker => ({
              id: stop.BusStopCode,
              coordinate: { latitude: stop.Latitude, longitude: stop.Longitude },
              title: stop.Description,
              description: stop.BusStopCode,
              pinColor: PRIMARY,
              onPress: () =>
                router.push({
                  pathname: "/stop/[id]",
                  params: {
                    id: stop.BusStopCode,
                    name: stop.Description,
                    road: stop.RoadName,
                  },
                }),
            }))}
          />

          {/* GPS re-center button */}
          <Pressable
            onPress={() => refetch()}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 40,
              height: 40,
              backgroundColor: WHITE,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: BORDER,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <Iconify icon="solar:gps-bold" size={18} color={MUTED_FG} />
          </Pressable>
        </View>
      </View>

      {/* Stop list */}
      <View
        style={{
          flex: 1,
          backgroundColor: BG_SECTION,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          overflow: "hidden",
        }}
      >
        {isLoading ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator color={PRIMARY} size="large" />
          </View>
        ) : (
          <FlatList
            data={stops}
            keyExtractor={(item) => item.BusStopCode}
            contentContainerStyle={{ paddingBottom: 100 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={PRIMARY}
              />
            }
            renderItem={({ item, index }) => {
              const isFirst =
                index === 0 ||
                stops[index - 1]?.RoadName !== item.RoadName;
              return (
                <BusStopRow
                  item={item}
                  index={index}
                  isFirst={isFirst}
                  crowd={crowdMap?.get(item.BusStopCode)}
                />
              );
            }}
            ItemSeparatorComponent={() => (
              <View
                style={{ height: 1, backgroundColor: BORDER, marginLeft: 80 }}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}
