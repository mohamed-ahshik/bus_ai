import React, { useState } from "react";
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
import { useBookmarks } from "../../lib/hooks/useBookmarks";
import { useBusArrivals, formatArrivalMinutes, getLoadColor } from "../../lib/hooks/useBusArrivals";
import type { Bookmark } from "../../lib/types";

const PRIMARY = "#2e7d32";
const MUTED_FG = "#757575";
const BORDER = "#eeeeee";
const WHITE = "#ffffff";
const FG = "#1a1a1a";
const BG = "#f5f5f5";

function BookmarkCard({
  bookmark,
  onPress,
  onRemove,
  editMode,
}: {
  bookmark: Bookmark;
  onPress: () => void;
  onRemove: () => void;
  editMode: boolean;
}) {
  const { data } = useBusArrivals(bookmark.stopCode);
  const service = bookmark.serviceNo
    ? data?.Services.find((s) => s.ServiceNo === bookmark.serviceNo)
    : data?.Services[0];

  const mins = service
    ? formatArrivalMinutes(service.NextBus.arrivalMinutes)
    : "—";
  const loadColor = service ? getLoadColor(service.NextBus.Load) : "#9e9e9e";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: pressed ? "#f5f5f5" : WHITE,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: BORDER,
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
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        {/* Service number or stop icon */}
        <View
          style={{
            width: 48,
            height: 48,
            backgroundColor: `${PRIMARY}1A`,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: `${PRIMARY}33`,
          }}
        >
          {bookmark.serviceNo ? (
            <Text
              style={{
                fontWeight: "900",
                fontSize: bookmark.serviceNo.length > 3 ? 14 : 20,
                color: PRIMARY,
              }}
            >
              {bookmark.serviceNo}
            </Text>
          ) : (
            <Iconify icon="solar:bus-bold" size={22} color={PRIMARY} />
          )}
        </View>

        <View>
          <Text style={{ fontWeight: "700", fontSize: 13, color: FG }}>
            {bookmark.stopName}
          </Text>
          <Text style={{ fontSize: 10, color: MUTED_FG, fontWeight: "500" }}>
            {bookmark.direction ?? bookmark.roadName}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        {/* Live arrival */}
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ fontSize: 20, fontWeight: "900", color: FG }}>
            {mins}
            {mins !== "Arr" && mins !== "—" && (
              <Text style={{ fontSize: 10, color: PRIMARY, fontWeight: "700" }}>
                {" "}
                min
              </Text>
            )}
          </Text>
          <View style={{ flexDirection: "row", gap: 4, marginTop: 2 }}>
            <View
              style={{
                width: 12,
                height: 4,
                borderRadius: 2,
                backgroundColor: loadColor,
              }}
            />
          </View>
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
          <Iconify icon="solar:alt-arrow-right-linear" size={20} color={MUTED_FG} />
        )}
      </View>
    </Pressable>
  );
}

const SECTION_ICONS: Record<string, string> = {
  "Home Routes": "solar:home-2-bold",
  "Work Routes": "solar:case-round-bold",
  Favourites: "solar:star-bold",
};

export default function BookmarksScreen() {
  const insets = useSafeAreaInsets();
  const { bookmarks, loaded, removeBookmark } = useBookmarks();
  const [editMode, setEditMode] = useState(false);

  // Group bookmarks: service bookmarks → "Home Routes", stop bookmarks → "Stops"
  const serviceBookmarks = bookmarks.filter((b) => b.type === "service");
  const stopBookmarks = bookmarks.filter((b) => b.type === "stop");

  const sections = [
    ...(serviceBookmarks.length > 0
      ? [{ title: "Home Routes", data: serviceBookmarks }]
      : []),
    ...(stopBookmarks.length > 0
      ? [{ title: "Saved Stops", data: stopBookmarks }]
      : []),
  ];

  const navigate = (bm: Bookmark) => {
    if (bm.type === "service" && bm.serviceNo) {
      router.push({
        pathname: "/stop/[id]",
        params: { id: bm.stopCode, name: bm.stopName, road: bm.roadName },
      });
    } else {
      router.push({
        pathname: "/stop/[id]",
        params: { id: bm.stopCode, name: bm.stopName, road: bm.roadName },
      });
    }
  };

  if (!loaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={PRIMARY} size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingBottom: 24,
          paddingHorizontal: 24,
          backgroundColor: WHITE,
          borderBottomWidth: 1,
          borderBottomColor: BORDER,
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
          <Text style={{ fontWeight: "700", fontSize: 28, color: FG }}>
            Bookmarks
          </Text>
          <Pressable onPress={() => setEditMode(!editMode)}>
            <Text
              style={{
                color: PRIMARY,
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
        <Text style={{ fontSize: 13, color: MUTED_FG }}>
          Your frequently used services and stops
        </Text>
      </View>

      {/* Content */}
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
          <Iconify icon="solar:bookmark-linear" size={48} color={`${MUTED_FG}66`} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: MUTED_FG,
              textAlign: "center",
            }}
          >
            No bookmarks yet
          </Text>
          <Text
            style={{ fontSize: 13, color: `${MUTED_FG}99`, textAlign: "center" }}
          >
            Star a bus stop or service to save it here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={sections}
          keyExtractor={(item) => item.title}
          contentContainerStyle={{ padding: 16, paddingBottom: 100, gap: 24 }}
          renderItem={({ item: section }) => (
            <View style={{ gap: 12 }}>
              {/* Section header */}
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
                  color={PRIMARY}
                />
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    color: MUTED_FG,
                  }}
                >
                  {section.title}
                </Text>
              </View>

              {/* Cards */}
              <View style={{ gap: 12 }}>
                {section.data.map((bm) => (
                  <BookmarkCard
                    key={bm.id}
                    bookmark={bm}
                    onPress={() => navigate(bm)}
                    onRemove={() => removeBookmark(bm.id)}
                    editMode={editMode}
                  />
                ))}
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
