import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useAppTheme } from "../../lib/ThemeContext";
import { WEB_SHELL_MAX_WIDTH } from "../../lib/layout";
import { LINE_META, TRAIN_LINES } from "../../lib/train/lines";
import type { TrainLineCode } from "../../lib/train/types";

const GAP = 2;
const MIN_CHIP_WIDTH = 36;
const MAX_CHIP_WIDTH = 56;
const SCREEN_PADDING = 32;

type Props = {
  selectedLine: TrainLineCode | null;
  onSelect: (line: TrainLineCode) => void;
};

export function LineBrowser({ selectedLine, onSelect }: Props) {
  const { colors } = useAppTheme();
  const { width } = useWindowDimensions();
  const availableWidth = Math.max(
    0,
    Math.min(width, WEB_SHELL_MAX_WIDTH) - SCREEN_PADDING,
  );
  const fittedWidth =
    (availableWidth - GAP * (TRAIN_LINES.length - 1)) / TRAIN_LINES.length;
  const chipWidth = Math.min(
    MAX_CHIP_WIDTH,
    Math.max(MIN_CHIP_WIDTH, fittedWidth),
  );
  const contentWidth =
    chipWidth * TRAIN_LINES.length + GAP * (TRAIN_LINES.length - 1);
  const centered = contentWidth <= availableWidth;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ alignSelf: "stretch", flexShrink: 1 }}
      contentContainerStyle={[
        styles.row,
        { gap: GAP },
        centered && styles.rowCentered,
      ]}
    >
      {TRAIN_LINES.map((line) => {
        const selected = selectedLine === line.code;
        return (
          <Pressable
            key={line.code}
            onPress={() => onSelect(line.code)}
            hitSlop={6}
            accessibilityRole="button"
            accessibilityLabel={`Browse ${line.name}`}
            accessibilityState={{ selected }}
            style={[
              styles.chip,
              {
                width: chipWidth,
                backgroundColor: colors.surface,
                borderColor: selected ? line.color : colors.border,
              },
              selected && { borderWidth: 2, paddingHorizontal: 2 },
            ]}
          >
            {!selected ? (
              <View style={[styles.dot, { backgroundColor: line.color }]} />
            ) : null}
            <Text style={[styles.label, { color: colors.fg }]}>
              {line.code}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingBottom: 2,
  },
  rowCentered: {
    flexGrow: 1,
    justifyContent: "center",
  },
  chip: {
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: 9.5,
    fontWeight: "800",
    letterSpacing: 0.02,
  },
});
