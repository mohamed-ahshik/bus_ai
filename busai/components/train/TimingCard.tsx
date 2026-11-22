import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../../lib/ThemeContext";
import {
  formatClock,
  formatCountdown,
  formatEta,
} from "../../lib/train/format";
import { LINE_META } from "../../lib/train/lines";
import { stationCode } from "../../lib/train/resolve";
import type {
  TrainDeparture,
  TrainLine,
  TrainStation,
} from "../../lib/train/types";

type Props = {
  station: TrainStation;
  line: TrainLine;
  departures: TrainDeparture[];
  scheduleAvailable: boolean;
};

export function TimingCard({
  station,
  line,
  departures,
  scheduleAvailable,
}: Props) {
  const { colors } = useAppTheme();
  const [now, setNow] = useState(Date.now());
  const info = LINE_META[line.code];
  const first = departures[0];
  const countdown = first
    ? formatCountdown(first.epochMs, now)
    : { value: "—", unit: "" };
  const code = stationCode(station, line.code);
  const platform = first?.platform ? ` · Platform ${first.platform}` : "";

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: `${info.color}88`,
        },
      ]}
    >
      <View
        style={[styles.tint, { backgroundColor: `${info.color}12` }]}
        pointerEvents="none"
      />
      <View style={styles.head}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={[styles.name, { color: colors.fg }]} numberOfLines={1}>
            {station.name}
          </Text>
          <Text style={[styles.code, { color: colors.mutedFg }]}>
            {code}
            {platform}
          </Text>
        </View>
        <View style={styles.countdown}>
          <Text style={[styles.countValue, { color: colors.fg }]}>
            {scheduleAvailable ? countdown.value : "—"}
          </Text>
          {scheduleAvailable && countdown.unit ? (
            <Text style={[styles.countUnit, { color: colors.mutedFg }]}>
              {countdown.unit}
            </Text>
          ) : null}
        </View>
      </View>

      {!scheduleAvailable ? (
        <Text
          style={[
            styles.message,
            { color: colors.mutedFg, borderTopColor: colors.border },
          ]}
        >
          Schedule not available for this date.
        </Text>
      ) : departures.length === 0 ? (
        <Text
          style={[
            styles.message,
            { color: colors.mutedFg, borderTopColor: colors.border },
          ]}
        >
          No scheduled departures in the next 24 hours.
        </Text>
      ) : (
        <View style={[styles.rows, { borderTopColor: colors.border }]}>
          {departures.slice(1, 5).map((departure) => (
            <View key={`${departure.tripId}-${departure.epochMs}`} style={styles.row}>
              <Text style={[styles.time, { color: colors.fg }]}>
                {formatClock(departure.scheduledAt)}
              </Text>
              <Text style={[styles.eta, { color: colors.mutedFg }]}>
                {formatEta(departure.epochMs, now)}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    borderRadius: 16,
    borderWidth: 1,
    padding: 13,
    paddingHorizontal: 14,
    overflow: "hidden",
  },
  tint: {
    ...StyleSheet.absoluteFillObject,
  },
  head: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.4,
  },
  code: {
    marginTop: 2,
    fontSize: 10.5,
  },
  countdown: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 3,
  },
  countValue: {
    fontSize: 31,
    fontWeight: "800",
    letterSpacing: -1,
    fontVariant: ["tabular-nums"],
  },
  countUnit: {
    fontSize: 12,
  },
  rows: {
    marginTop: 8,
    borderTopWidth: 1,
  },
  row: {
    minHeight: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  time: {
    fontSize: 14.5,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
  eta: {
    fontSize: 11,
    fontVariant: ["tabular-nums"],
  },
  message: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    fontSize: 11,
  },
});
