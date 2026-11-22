import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../../lib/ThemeContext";
import { LINE_META } from "../../lib/train/lines";
import { stationCode } from "../../lib/train/resolve";
import type { TrainLineCode, TrainStation } from "../../lib/train/types";

type Props = {
  station: TrainStation;
  selectedLine: TrainLineCode;
  onSwitch: () => void;
};

export function AlsoAtRow({ station, selectedLine, onSwitch }: Props) {
  const { colors } = useAppTheme();
  const otherLine = station.lines.find((line) => line !== selectedLine);
  if (!otherLine) return null;

  const info = LINE_META[otherLine];
  const code = stationCode(station, otherLine);

  return (
    <View
      style={[
        styles.row,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <View style={[styles.badge, { backgroundColor: info.color }]}>
        <Text style={styles.badgeText}>{otherLine}</Text>
      </View>
      <Text style={[styles.text, { color: colors.fg }]} numberOfLines={1}>
        Also at {station.name} · {code}
      </Text>
      <Pressable
        onPress={onSwitch}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={`Switch line at ${station.name}`}
      >
        <Text style={[styles.switch, { color: colors.primary }]}>
          Switch ›
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: 8,
    minHeight: 44,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  badge: {
    minWidth: 40,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  text: {
    flex: 1,
    minWidth: 0,
    fontSize: 11.5,
    fontWeight: "500",
  },
  switch: {
    fontSize: 11.5,
    fontWeight: "700",
  },
});
