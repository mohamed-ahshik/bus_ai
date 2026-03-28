import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Iconify } from "react-native-iconify";
import GoogleMap from "../../components/GoogleMap";

const PRIMARY = "#2e7d32";
const MUTED_FG = "#757575";
const BORDER = "#eeeeee";
const WHITE = "#ffffff";
const FG = "#1a1a1a";
const MUTED_BG = "#f5f5f5";
const BLUE = "#3b82f6";

const QUICK_QUERIES = [
  "How do I get to Orchard MRT?",
  "Fastest bus to City Hall",
  "Bus to National Museum",
  "Route to Botanic Gardens",
];

const SINGAPORE_REGION = {
  latitude: 1.3521,
  longitude: 103.8198,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

// Mock route polyline (Orchard Rd area)
const ROUTE_COORDS = [
  { latitude: 1.29863, longitude: 103.84583 },
  { latitude: 1.2993, longitude: 103.8462 },
  { latitude: 1.30001, longitude: 103.84399 },
  { latitude: 1.30058, longitude: 103.8434 },
  { latitude: 1.30117, longitude: 103.84226 },
  { latitude: 1.30046, longitude: 103.83895 },
];

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (q: string) => {
    const finalQuery = q || query;
    if (finalQuery.trim()) {
      router.push({
        pathname: "/trip/navigate",
        params: { query: finalQuery.trim(), fromStop: "08057" },
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      {/* Full-screen map */}
      <GoogleMap
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        initialRegion={SINGAPORE_REGION}
        showsUserLocation
        showsMyLocationButton={false}
        polylines={[
          { coordinates: ROUTE_COORDS, strokeColor: PRIMARY, strokeWidth: 4 },
        ]}
        markers={ROUTE_COORDS.map((coord, i) => ({
          id: `route-${i}`,
          coordinate: coord,
          pinColor: i === 0 ? BLUE : PRIMARY,
        }))}
      />

      {/* Top search card */}
      <View
        style={{
          position: "absolute",
          top: insets.top + 12,
          left: 16,
          right: 16,
          zIndex: 40,
        }}
      >
        <View
          style={{
            backgroundColor: WHITE,
            borderRadius: 20,
            padding: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 16,
            elevation: 8,
            borderWidth: 1,
            borderColor: BORDER,
            gap: 12,
          }}
        >
          {/* Title */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Iconify icon="solar:magic-stick-3-bold" size={22} color={PRIMARY} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "700", fontSize: 15, color: FG }}>
                OmniBus AI
              </Text>
              <Text style={{ fontSize: 11, color: MUTED_FG }}>
                Ask me how to get anywhere in Singapore
              </Text>
            </View>
          </View>

          {/* Input row */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: MUTED_BG,
              borderRadius: 14,
              paddingHorizontal: 14,
              height: 48,
              gap: 10,
              borderWidth: 1,
              borderColor: BORDER,
            }}
          >
            <Iconify icon="solar:magnifer-linear" size={18} color={MUTED_FG} />
            <TextInput
              style={{ flex: 1, fontSize: 13, color: FG, height: "100%" }}
              placeholder="Where do you want to go?"
              placeholderTextColor={`${MUTED_FG}99`}
              value={query}
              onChangeText={(t) => {
                setQuery(t);
                setShowSuggestions(t.length > 0);
              }}
              onFocus={() => setShowSuggestions(query.length > 0)}
              onSubmitEditing={() => {
                setShowSuggestions(false);
                handleSearch(query);
              }}
              returnKeyType="search"
            />
            {query.length > 0 && (
              <Pressable
                onPress={() => {
                  setQuery("");
                  setShowSuggestions(false);
                }}
              >
                <Iconify icon="solar:close-circle-bold" size={18} color={MUTED_FG} />
              </Pressable>
            )}
          </View>

          {/* Quick query pills */}
          {!showSuggestions && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", gap: 8 }}>
                {QUICK_QUERIES.map((q) => (
                  <Pressable
                    key={q}
                    onPress={() => handleSearch(q)}
                    style={({ pressed }) => ({
                      backgroundColor: pressed ? `${PRIMARY}22` : `${PRIMARY}11`,
                      borderRadius: 20,
                      paddingHorizontal: 14,
                      paddingVertical: 8,
                      borderWidth: 1,
                      borderColor: `${PRIMARY}22`,
                    })}
                  >
                    <Text
                      style={{ fontSize: 12, color: PRIMARY, fontWeight: "600" }}
                    >
                      {q}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          )}
        </View>

        {/* Suggestions dropdown */}
        {showSuggestions && (
          <View
            style={{
              backgroundColor: WHITE,
              borderRadius: 16,
              marginTop: 8,
              borderWidth: 1,
              borderColor: BORDER,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 6,
              overflow: "hidden",
            }}
          >
            {QUICK_QUERIES.filter((q) =>
              q.toLowerCase().includes(query.toLowerCase())
            ).map((q, i, arr) => (
              <Pressable
                key={q}
                onPress={() => {
                  setQuery(q);
                  setShowSuggestions(false);
                  handleSearch(q);
                }}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  padding: 16,
                  backgroundColor: pressed ? MUTED_BG : WHITE,
                  borderBottomWidth: i < arr.length - 1 ? 1 : 0,
                  borderBottomColor: BORDER,
                })}
              >
                <Iconify
                  icon="solar:map-point-linear"
                  size={18}
                  color={MUTED_FG}
                />
                <Text style={{ fontSize: 13, color: FG, flex: 1 }}>{q}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* Bottom info card */}
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
            backgroundColor: WHITE,
            borderRadius: 20,
            padding: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 16,
            elevation: 8,
            borderWidth: 1,
            borderColor: BORDER,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 15, color: FG }}>
              Nearby Stops
            </Text>
            <Pressable onPress={() => router.push("/(tabs)")}>
              <Text style={{ fontSize: 12, color: PRIMARY, fontWeight: "600" }}>
                View All
              </Text>
            </Pressable>
          </View>

          {/* Mini stop list */}
          {[
            { code: "08057", name: "Plaza Singapura", dist: "0.14km" },
            { code: "08058", name: "Aft Dhoby Ghaut Stn", dist: "0.23km" },
            { code: "08138", name: "Concorde Hotel", dist: "0.38km" },
          ].map((stop, i, arr) => (
            <Pressable
              key={stop.code}
              onPress={() =>
                router.push({
                  pathname: "/stop/[id]",
                  params: {
                    id: stop.code,
                    name: stop.name,
                    road: "Orchard Rd",
                  },
                })
              }
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                paddingVertical: 10,
                borderBottomWidth: i < arr.length - 1 ? 1 : 0,
                borderBottomColor: BORDER,
                backgroundColor: pressed ? MUTED_BG : "transparent",
              })}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: PRIMARY,
                  borderRadius: 18,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Iconify icon="solar:bus-bold" size={18} color={WHITE} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 13, fontWeight: "600", color: FG }}
                >
                  {stop.name}
                </Text>
                <Text style={{ fontSize: 11, color: MUTED_FG }}>{stop.code}</Text>
              </View>
              <Text style={{ fontSize: 11, color: MUTED_FG, fontWeight: "500" }}>
                {stop.dist}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}
