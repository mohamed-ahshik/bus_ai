import React from "react";
import {
  View,
  Platform,
  ScrollView,
  Text,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Iconify } from "react-native-iconify";
import { useAppTheme } from "../../lib/ThemeContext";
import {
  useTrainServiceAlerts,
  selectDisruptionAlerts,
  type TrainServiceAlertRecord,
} from "../../lib/hooks/useTrainServiceAlerts";
import { formatTrainAlertLine } from "../../lib/api/ltaTrainServiceAlertsShared";
import { getSupabase } from "../../lib/supabaseClient";
import { ADMOB_TAB_SCROLL_EXTRA } from "../../lib/adMobConfig";

const COLOR_DANGER = "#e53935";
const COLOR_WARNING = "#f57c00";

interface MrtLineInfo {
  code: string;
  name: string;
  color: string;
  matchKeys: string[];
}

const MRT_LINES: MrtLineInfo[] = [
  {
    code: "NSL",
    name: "North-South Line",
    color: "#D42E12",
    matchKeys: ["nsl", "north-south", "north south", "red"],
  },
  {
    code: "EWL",
    name: "East-West Line",
    color: "#009530",
    matchKeys: ["ewl", "east-west", "east west", "green"],
  },
  {
    code: "NEL",
    name: "North East Line",
    color: "#9900AA",
    matchKeys: ["nel", "north east", "north-east", "purple"],
  },
  {
    code: "CCL",
    name: "Circle Line",
    color: "#FA9E0D",
    matchKeys: ["ccl", "circle", "orange", "yellow"],
  },
  {
    code: "DTL",
    name: "Downtown Line",
    color: "#005EC4",
    matchKeys: ["dtl", "downtown", "blue"],
  },
  {
    code: "TEL",
    name: "Thomson-East Coast Line",
    color: "#9D5B25",
    matchKeys: ["tel", "thomson", "brown"],
  },
  {
    code: "BPL",
    name: "Bukit Panjang LRT",
    color: "#748577",
    matchKeys: ["bpl", "bukit panjang", "bp lrt"],
  },
  {
    code: "SKL",
    name: "Sengkang LRT",
    color: "#748577",
    matchKeys: ["skl", "sengkang", "sk lrt"],
  },
  {
    code: "PGL",
    name: "Punggol LRT",
    color: "#748577",
    matchKeys: ["pgl", "punggol", "pg lrt"],
  },
];

function getAlertsForLine(
  line: MrtLineInfo,
  alerts: TrainServiceAlertRecord[]
): TrainServiceAlertRecord[] {
  return alerts.filter((alert) => {
    const rawLine = String(alert.Line ?? alert.line ?? "").toLowerCase();
    const rawMsg = String(
      alert.Content ?? alert.Message ?? alert.Text ?? ""
    ).toLowerCase();

    return line.matchKeys.some(
      (key) => rawLine.includes(key) || rawMsg.includes(key)
    );
  });
}

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const webNeedsSupabase = Platform.OS === "web" && !getSupabase();

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
    dataUpdatedAt,
  } = useTrainServiceAlerts();

  const disruptionAlerts = data ? selectDisruptionAlerts(data) : [];

  const updatedTime =
    dataUpdatedAt > 0
      ? new Date(dataUpdatedAt).toLocaleTimeString("en-SG", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      : null;

  const bottomPad = Math.max(insets.bottom, 12) + 72 + ADMOB_TAB_SCROLL_EXTRA;

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: colors.bgSection,
      }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: bottomPad,
          paddingHorizontal: 16,
          backgroundColor: colors.bgSection,
        }}
        showsVerticalScrollIndicator
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 16,
            marginBottom: 16,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "800",
                color: colors.fg,
                letterSpacing: -0.5,
              }}
            >
              Train Status
            </Text>
            <Text style={{ fontSize: 13, color: colors.mutedFg, marginTop: 2 }}>
              Real-time MRT & LRT network status
            </Text>
            {updatedTime ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  marginTop: 4,
                }}
              >
                <Iconify
                  icon="solar:clock-circle-linear"
                  size={13}
                  color={colors.mutedFg}
                />
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "600",
                    color: colors.mutedFg,
                  }}
                >
                  Updated {updatedTime}
                </Text>
              </View>
            ) : null}
          </View>
          <Pressable
            onPress={() => refetch()}
            disabled={isFetching}
            style={{
              padding: 8,
              borderRadius: 12,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Iconify
              icon="solar:refresh-linear"
              size={20}
              color={colors.primary}
            />
          </Pressable>
        </View>

        {/* Global Network Status Banner */}
        {webNeedsSupabase ? (
          <View
            style={{
              padding: 14,
              borderRadius: 16,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: 14,
            }}
          >
            <Text style={{ fontSize: 13, color: colors.mutedFg }}>
              Set Supabase credentials to view live status on web.
            </Text>
          </View>
        ) : isPending && !data ? (
          <View
            style={{
              padding: 16,
              borderRadius: 16,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <ActivityIndicator color={colors.primary} size="small" />
            <Text style={{ fontSize: 13, color: colors.mutedFg }}>
              Checking train network status…
            </Text>
          </View>
        ) : isError ? (
          <View
            style={{
              padding: 14,
              borderRadius: 16,
              backgroundColor: `${COLOR_DANGER}15`,
              borderWidth: 1,
              borderColor: `${COLOR_DANGER}40`,
              marginBottom: 14,
              gap: 6,
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: "600", color: COLOR_DANGER }}>
              {error instanceof Error ? error.message : "Could not load alerts."}
            </Text>
            <Pressable onPress={() => refetch()}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color: colors.primary,
                }}
              >
                Tap to retry
              </Text>
            </Pressable>
          </View>
        ) : disruptionAlerts.length === 0 ? (
          <View
            style={{
              padding: 14,
              borderRadius: 16,
              backgroundColor: `${colors.primary}15`,
              borderWidth: 1,
              borderColor: `${colors.primary}40`,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <Iconify
              icon="solar:gps-bold"
              size={20}
              color={colors.primary}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: colors.primary,
                }}
              >
                Normal Service
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.mutedFg,
                  marginTop: 1,
                }}
              >
                All MRT and LRT lines operating normally
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={{
              padding: 14,
              borderRadius: 16,
              backgroundColor: `${COLOR_WARNING}18`,
              borderWidth: 1,
              borderColor: `${COLOR_WARNING}60`,
              marginBottom: 16,
              gap: 4,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Iconify
                icon="solar:danger-triangle-bold"
                size={20}
                color={COLOR_WARNING}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: COLOR_WARNING,
                }}
              >
                Service Disruptions Reported
              </Text>
            </View>
            <Text style={{ fontSize: 12, color: colors.fg, marginTop: 4 }}>
              {disruptionAlerts.length} active service advisory / disruption
              notice{disruptionAlerts.length > 1 ? "s" : ""}.
            </Text>
          </View>
        )}

        {/* Individual Line Status Cards */}
        <View style={{ gap: 10 }}>
          {MRT_LINES.map((line) => {
            const lineAlerts = getAlertsForLine(line, disruptionAlerts);
            const hasAlert = lineAlerts.length > 0;

            return (
              <View
                key={line.code}
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: hasAlert ? COLOR_WARNING : colors.border,
                  padding: 14,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    {/* Line Badge */}
                    <View
                      style={{
                        backgroundColor: line.color,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 8,
                        minWidth: 44,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: "800",
                          color: "#ffffff",
                          letterSpacing: 0.5,
                        }}
                      >
                        {line.code}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "700",
                        color: colors.fg,
                      }}
                    >
                      {line.name}
                    </Text>
                  </View>

                  {/* Status Indicator */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: hasAlert
                          ? COLOR_WARNING
                          : colors.primary,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: hasAlert ? COLOR_WARNING : colors.primary,
                      }}
                    >
                      {hasAlert ? "Disrupted" : "Normal"}
                    </Text>
                  </View>
                </View>

                {/* Disruptions details if any */}
                {hasAlert ? (
                  <View
                    style={{
                      marginTop: 4,
                      paddingTop: 8,
                      borderTopWidth: 1,
                      borderTopColor: colors.border,
                      gap: 6,
                    }}
                  >
                    {lineAlerts.map((alert, idx) => (
                      <Text
                        key={`line-alert-${idx}`}
                        style={{
                          fontSize: 12,
                          color: colors.fg,
                          lineHeight: 18,
                        }}
                      >
                        {formatTrainAlertLine(alert)}
                      </Text>
                    ))}
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>

        {/* Footer info & attribution */}
        <View style={{ marginTop: 20, marginBottom: 8, gap: 4 }}>
          {updatedTime ? (
            <Text
              style={{
                fontSize: 11,
                color: colors.mutedFg,
                textAlign: "center",
              }}
            >
              Last updated: {updatedTime}
            </Text>
          ) : null}
          <Text
            style={{
              fontSize: 10,
              color: colors.mutedFg,
              textAlign: "center",
              lineHeight: 14,
            }}
          >
            Train alerts powered by LTA DataMall, Singapore Open Data Licence
            v1.0.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
