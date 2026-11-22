import React, { useRef, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ADMOB_TAB_SCROLL_EXTRA } from "../../lib/adMobConfig";
import { useTrainServiceAlerts } from "../../lib/hooks/useTrainServiceAlerts";
import { useAppTheme } from "../../lib/ThemeContext";
import { formatUpdatedAt } from "../../lib/train/format";
import { StatusView } from "./StatusView";
import { TimingsView } from "./TimingsView";

type ViewMode = "status" | "timings";

export function TrainScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const alertsQuery = useTrainServiceAlerts();
  const params = useLocalSearchParams<{ view?: string }>();
  const [view, setView] = useState<ViewMode>(
    params.view === "timings" ? "timings" : "status",
  );
  const [refreshToken, setRefreshToken] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const updated = alertsQuery.dataUpdatedAt
    ? formatUpdatedAt(alertsQuery.dataUpdatedAt)
    : "—";

  const headerSub =
    view === "status"
      ? `Updated ${updated} SGT`
      : "Scheduled departures";

  const onChangeView = (next: ViewMode) => {
    if (next === view) return;
    setView(next);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshToken((token) => token + 1);
    try {
      await alertsQuery.refetch();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgSection, paddingTop: insets.top }}>
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, 12) + 72 + ADMOB_TAB_SCROLL_EXTRA,
          alignItems: "stretch",
        }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.headerBlock}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.fg }]}>Train</Text>

          <View
            style={[
              styles.modeSwitch,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            {(["status", "timings"] as const).map((mode) => {
              const active = view === mode;
              return (
                <Pressable
                  key={mode}
                  onPress={() => onChangeView(mode)}
                  style={[
                    styles.modeButton,
                    active && { backgroundColor: colors.primary },
                  ]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  accessibilityLabel={mode === "status" ? "Status" : "Timings"}
                >
                  <Text
                    style={[
                      styles.modeLabel,
                      { color: active ? colors.onPrimary : colors.mutedFg },
                    ]}
                  >
                    {mode === "status" ? "Status" : "Timings"}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Text style={[styles.headerSub, { color: colors.mutedFg }]}>
          {headerSub}
        </Text>
        </View>

        <View style={{ display: view === "status" ? "flex" : "none" }}>
          <StatusView query={alertsQuery} />
        </View>
        <View style={{ display: view === "timings" ? "flex" : "none" }}>
          <TimingsView refreshToken={refreshToken} />
        </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBlock: {
    paddingHorizontal: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 8,
  },
  title: {
    flexShrink: 0,
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  modeSwitch: {
    flex: 1,
    flexShrink: 1,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    padding: 3,
    flexDirection: "row",
    minWidth: 0,
  },
  modeButton: {
    flex: 1,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  modeLabel: {
    fontSize: 12.5,
    fontWeight: "600",
  },
  headerSub: {
    marginTop: 8,
    marginBottom: 16,
    fontSize: 13,
    fontVariant: ["tabular-nums"],
  },
});
