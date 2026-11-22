import React, { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../../lib/ThemeContext";
import { LINE_META } from "../../lib/train/lines";
import type { TrainLine } from "../../lib/train/types";

const STOP_WIDTH = 66;

type Props = {
  line: TrainLine;
  stationId: string | null;
  onSelect: (stationId: string) => void;
};

export function LineStrip({ line, stationId, onSelect }: Props) {
  const { colors } = useAppTheme();
  const info = LINE_META[line.code];
  const scrollRef = useRef<ScrollView>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const stations = line.stations;

  useEffect(() => {
    if (!viewportWidth || !stations.length) return;
    const index = stationId
      ? stations.findIndex((station) => station.id === stationId)
      : -1;

    // No selected stop (line browsing or a newly chosen line): start at the
    // first station instead of keeping the previous line's scroll offset.
    if (index < 0) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ x: 0, animated: false });
      });
      return;
    }

    const target = Math.max(
      0,
      index * STOP_WIDTH - (viewportWidth - STOP_WIDTH) / 2,
    );
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ x: target, animated: true });
    });
  }, [stationId, line.code, viewportWidth, stations.length]);

  if (!stations.length) return null;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onLayout={(event) => setViewportWidth(event.nativeEvent.layout.width)}
        style={{ alignSelf: "stretch", flexShrink: 1 }}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.track}>
          <View
            style={[styles.line, { backgroundColor: info.color }]}
            pointerEvents="none"
          />
          {stations.map((station) => {
            const selected = station.id === stationId;
            return (
              <Pressable
                key={station.id}
                onPress={() => onSelect(station.id)}
                style={styles.stop}
                accessibilityRole="button"
                accessibilityLabel={`${station.name}, ${station.code}`}
                accessibilityState={{ selected }}
              >
                <View
                  style={[
                    styles.dot,
                    {
                      borderColor: info.color,
                      backgroundColor: selected
                        ? info.color
                        : colors.surface,
                    },
                    selected && styles.dotSelected,
                  ]}
                />
                <Text
                  style={[
                    styles.code,
                    {
                      color: selected ? colors.fg : colors.mutedFg,
                      fontWeight: selected ? "800" : "600",
                    },
                  ]}
                >
                  {station.code}
                </Text>
                <Text
                  style={[
                    styles.name,
                    {
                      color: selected ? colors.fg : colors.mutedFg,
                      fontWeight: selected ? "800" : "400",
                    },
                  ]}
                  numberOfLines={1}
                >
                  {station.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 11,
    paddingHorizontal: 8,
    overflow: "hidden",
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
  track: {
    position: "relative",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  line: {
    position: "absolute",
    left: 20,
    right: 20,
    top: 7,
    height: 2,
    borderRadius: 1,
    opacity: 0.85,
  },
  stop: {
    width: STOP_WIDTH,
    minHeight: 44,
    alignItems: "center",
    gap: 2,
    zIndex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    marginTop: 1,
  },
  dotSelected: {
    width: 15,
    height: 15,
    borderRadius: 8,
    marginTop: -1,
  },
  code: {
    marginTop: 2,
    fontSize: 8.5,
  },
  name: {
    maxWidth: 64,
    fontSize: 8.5,
    textAlign: "center",
  },
});
