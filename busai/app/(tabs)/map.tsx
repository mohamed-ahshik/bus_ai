import React, { useMemo } from "react";
import {
  View,
  Platform,
  ScrollView,
  Image,
  Dimensions,
  Text,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { WebView } from "react-native-webview";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MRT_MAP_BASE64 } from "../../lib/mrtMapBase64";
import { useAppTheme } from "../../lib/ThemeContext";
import {
  useTrainServiceAlerts,
  alertsToDisplayLines,
} from "../../lib/hooks/useTrainServiceAlerts";
import { getSupabase } from "../../lib/supabaseClient";
import { ADMOB_TAB_SCROLL_EXTRA } from "../../lib/adMobConfig";

/** Matches embedded SMRT/LTA SVG viewBox (0 0 960 ~960) for layout without loading dimensions. */
const MRT_MAP_ASPECT = 960 / 959.999988;
const MAP_WEBVIEW_H = Math.min(420, Math.round(Dimensions.get("window").height * 0.36));

function TrainServiceAlertsPanel() {
  const { colors } = useAppTheme();
  const webNeedsSupabase = Platform.OS === "web" && !getSupabase();
  const { data, isPending, isError, error, refetch, isFetching, dataUpdatedAt } =
    useTrainServiceAlerts();
  const lines = data ? alertsToDisplayLines(data) : [];
  const showAllClear =
    !webNeedsSupabase && !isPending && !isError && lines.length === 0;
  const updatedTime =
    dataUpdatedAt > 0
      ? new Date(dataUpdatedAt).toLocaleTimeString("en-SG", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      : null;

  if (webNeedsSupabase) {
    return (
      <View
        style={{
          marginHorizontal: 16,
          marginTop: 16,
          marginBottom: 8,
          padding: 16,
          borderRadius: 16,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text
          style={{
            fontSize: 11,
            fontWeight: "800",
            color: colors.mutedFg,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Train service alerts
        </Text>
        <Text style={{ fontSize: 13, color: colors.mutedFg }}>
          Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to load live alerts on web.
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 8,
        padding: 16,
        borderRadius: 16,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Text
        style={{
          fontSize: 11,
          fontWeight: "800",
          color: colors.mutedFg,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        Train service alerts
      </Text>

      {isPending && !data ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <ActivityIndicator color={colors.primary} size="small" />
          <Text style={{ fontSize: 13, color: colors.mutedFg }}>Loading…</Text>
        </View>
      ) : isError ? (
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 13, color: colors.fg }}>
            {error instanceof Error ? error.message : "Could not load alerts."}
          </Text>
          <Pressable onPress={() => refetch()}>
            <Text style={{ fontSize: 13, fontWeight: "700", color: colors.primary }}>Try again</Text>
          </Pressable>
        </View>
      ) : showAllClear ? (
        <Text style={{ fontSize: 14, fontWeight: "600", color: colors.fg }}>
          All MRT services are working.
        </Text>
      ) : (
        <View style={{ gap: 10 }}>
          {lines.map((line, i) => (
            <Text key={`train-alert-${i}`} style={{ fontSize: 14, color: colors.fg, lineHeight: 20 }}>
              • {line}
            </Text>
          ))}
          {isFetching && !isPending ? (
            <ActivityIndicator color={colors.mutedFg} size="small" style={{ alignSelf: "flex-start" }} />
          ) : null}
        </View>
      )}

      {updatedTime ? (
        <Text
          style={{
            fontSize: 10,
            color: colors.mutedFg,
            fontWeight: "700",
            marginTop: 10,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Updated: {updatedTime}
        </Text>
      ) : null}
    </View>
  );
}

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const webHtml = useMemo(
    () => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=6, user-scalable=yes">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: ${colors.mapBg}; }
    img { width: 100%; height: auto; display: block; }
  </style>
</head>
<body>
  <img src="${MRT_MAP_BASE64}" draggable="false" />
</body>
</html>`,
    [colors.mapBg],
  );

  const bottomPad = Math.max(insets.bottom, 12) + 72 + ADMOB_TAB_SCROLL_EXTRA;

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: colors.mapBg }}>
      {Platform.OS === "web" ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingBottom: bottomPad,
            backgroundColor: colors.mapBg,
          }}
          showsVerticalScrollIndicator
        >
          <Image
            source={{ uri: MRT_MAP_BASE64 }}
            accessibilityLabel="Singapore MRT and LRT system map"
            resizeMode="contain"
            style={{ width: "100%", aspectRatio: MRT_MAP_ASPECT }}
          />
          <TrainServiceAlertsPanel />
        </ScrollView>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingBottom: bottomPad,
            backgroundColor: colors.mapBg,
          }}
          showsVerticalScrollIndicator
        >
          <WebView
            source={{ html: webHtml }}
            scalesPageToFit={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{ width: "100%", height: MAP_WEBVIEW_H, backgroundColor: colors.mapBg }}
            nestedScrollEnabled
          />
          <TrainServiceAlertsPanel />
        </ScrollView>
      )}
    </View>
  );
}
