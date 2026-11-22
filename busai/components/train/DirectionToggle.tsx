import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../../lib/ThemeContext";
import { directionLabel } from "../../lib/train/resolve";
import type { TrainLine } from "../../lib/train/types";

type Props = {
  line: TrainLine;
  direction: "0" | "1";
  onChange: (direction: "0" | "1") => void;
};

export function DirectionToggle({ line, direction, onChange }: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.row}>
      {(["0", "1"] as const).map((value) => {
        const active = direction === value;
        return (
          <Pressable
            key={value}
            onPress={() => onChange(value)}
            style={[
              styles.button,
              {
                backgroundColor: active ? colors.primary : colors.surface,
                borderColor: active ? colors.primary : colors.border,
              },
            ]}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={directionLabel(line, value)}
          >
            <Text
              style={[
                styles.label,
                { color: active ? colors.onPrimary : colors.fg },
              ]}
              numberOfLines={2}
            >
              {directionLabel(line, value)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  button: {
    flex: 1,
    minHeight: 46,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
});
