import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Iconify } from "react-native-iconify";
import {
  selectDisruptionAlerts,
  useTrainServiceAlerts,
  type TrainServiceAlertRecord,
} from "../../lib/hooks/useTrainServiceAlerts";
import { formatTrainAlertLine } from "../../lib/api/ltaTrainServiceAlertsShared";
import { useAppTheme } from "../../lib/ThemeContext";
import { formatUpdatedAt } from "../../lib/train/format";
import { TRAIN_LINES, type MrtLineInfo } from "../../lib/train/lines";

const COLOR_DANGER = "#e53935";
const COLOR_WARNING = "#f57c00";

type AlertsQuery = ReturnType<typeof useTrainServiceAlerts>;

function alertsForLine(
  line: MrtLineInfo,
  alerts: TrainServiceAlertRecord[],
): TrainServiceAlertRecord[] {
  return alerts.filter((alert) => {
    const rawLine = String(alert.Line ?? alert.line ?? "").toLowerCase();
    const rawMessage = String(
      alert.Content ?? alert.Message ?? alert.Text ?? "",
    ).toLowerCase();
    return line.matchKeys.some(
      (key) => rawLine.includes(key) || rawMessage.includes(key),
    );
  });
}

export function StatusView({ query }: { query: AlertsQuery }) {
  const { colors } = useAppTheme();
  const { data, isPending, isError, error, refetch, dataUpdatedAt } = query;
  const disruptionAlerts = data ? selectDisruptionAlerts(data) : [];

  const updatedLabel = dataUpdatedAt
    ? formatUpdatedAt(dataUpdatedAt)
    : "—";

  return (
    <View>
      {isPending && !data ? (
        <View
          style={[
            styles.stateCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <ActivityIndicator color={colors.primary} size="small" />
          <Text style={{ fontSize: 13, color: colors.mutedFg }}>
            Checking train network status…
          </Text>
        </View>
      ) : isError ? (
        <View
          style={[
            styles.stateCard,
            {
              backgroundColor: `${COLOR_DANGER}15`,
              borderColor: `${COLOR_DANGER}40`,
              gap: 6,
            },
          ]}
        >
          <Text style={{ fontSize: 13, fontWeight: "600", color: COLOR_DANGER }}>
            {error instanceof Error ? error.message : "Could not load alerts."}
          </Text>
          <Pressable onPress={() => refetch()}>
            <Text style={{ fontSize: 12, fontWeight: "700", color: colors.primary }}>
              Tap to retry
            </Text>
          </Pressable>
        </View>
      ) : disruptionAlerts.length === 0 ? (
        <View
          style={[
            styles.banner,
            {
              backgroundColor: `${colors.primary}15`,
              borderColor: `${colors.primary}40`,
            },
          ]}
        >
          <Iconify icon="solar:gps-bold" size={20} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontSize: 14, fontWeight: "700", color: colors.primary }}
            >
              Normal service
            </Text>
            <Text
              style={{ fontSize: 12, color: colors.mutedFg, marginTop: 1 }}
            >
              All MRT and LRT lines operating normally
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.banner,
            {
              backgroundColor: `${COLOR_WARNING}18`,
              borderColor: `${COLOR_WARNING}60`,
              alignItems: "flex-start",
              flexDirection: "column",
              gap: 4,
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Iconify
              icon="solar:danger-triangle-bold"
              size={20}
              color={COLOR_WARNING}
            />
            <Text
              style={{ fontSize: 14, fontWeight: "700", color: COLOR_WARNING }}
            >
              Service disruptions reported
            </Text>
          </View>
          <Text style={{ fontSize: 12, color: colors.fg, marginTop: 4 }}>
            {disruptionAlerts.length} active service advisory / disruption
            notice{disruptionAlerts.length > 1 ? "s" : ""}.
          </Text>
        </View>
      )}

      <View style={{ gap: 9 }}>
        {TRAIN_LINES.map((line) => {
          const lineAlerts = alertsForLine(line, disruptionAlerts);
          const hasAlert = lineAlerts.length > 0;

          return (
            <View
              key={line.code}
              style={[
                styles.lineCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: hasAlert ? COLOR_WARNING : colors.border,
                },
              ]}
            >
              <View style={styles.lineRow}>
                <View style={styles.lineLeft}>
                  <View
                    style={[styles.lineBadge, { backgroundColor: line.color }]}
                  >
                    <Text style={styles.lineBadgeText}>{line.code}</Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "700",
                      color: colors.fg,
                      flexShrink: 1,
                    }}
                    numberOfLines={1}
                  >
                    {line.name}
                  </Text>
                </View>
                <View style={styles.lineStatus}>
                  <View
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 4,
                      backgroundColor: hasAlert ? COLOR_WARNING : colors.primary,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: hasAlert ? COLOR_WARNING : colors.primary,
                    }}
                  >
                    {hasAlert ? "Disrupted" : "Normal"}
                  </Text>
                </View>
              </View>

              {hasAlert ? (
                <View
                  style={[styles.alertBox, { borderTopColor: colors.border }]}
                >
                  {lineAlerts.map((alert, index) => (
                    <Text
                      key={`line-alert-${index}`}
                      style={{ fontSize: 12, color: colors.fg, lineHeight: 18 }}
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

      <View style={styles.footer}>
        <Text style={{ fontSize: 10.5, color: colors.mutedFg }}>
          Last updated: {updatedLabel}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: colors.mutedFg,
            textAlign: "center",
            lineHeight: 14,
            marginTop: 4,
          }}
        >
          Train alerts powered by LTA DataMall, Singapore Open Data Licence v1.0.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stateCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  banner: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  lineCard: {
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  lineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  lineLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexShrink: 1,
  },
  lineBadge: {
    minWidth: 44,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: "center",
  },
  lineBadgeText: {
    fontSize: 11.5,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 0.4,
  },
  lineStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  alertBox: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    gap: 6,
  },
  footer: {
    marginTop: 20,
    marginBottom: 8,
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(255,255,255,0.08)",
  },
});
