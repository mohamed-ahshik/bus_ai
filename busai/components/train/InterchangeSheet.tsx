import React from "react";
import {
  Animated,
  Easing,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "../../lib/ThemeContext";
import { WEB_SHELL_MAX_WIDTH } from "../../lib/layout";
import { LINE_META } from "../../lib/train/lines";
import type {
  TrainLine,
  TrainLineCode,
  TrainStation,
} from "../../lib/train/types";

type Props = {
  visible: boolean;
  station: TrainStation | null;
  lines: TrainLine[];
  selectedLine: TrainLineCode | null;
  onSelect: (line: TrainLineCode) => void;
  onClose: () => void;
};

/** Far enough to keep the tallest sheet fully offscreen at rest. */
const SHEET_TRAVEL = 520;

export function InterchangeSheet({
  visible,
  station,
  lines,
  selectedLine,
  onSelect,
  onClose,
}: Props) {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const backdrop = React.useRef(new Animated.Value(0)).current;
  const sheet = React.useRef(new Animated.Value(0)).current;
  const closing = React.useRef(false);
  const useNativeDriver = Platform.OS !== "web";

  React.useEffect(() => {
    if (!visible) {
      backdrop.setValue(0);
      sheet.setValue(0);
      closing.current = false;
      return;
    }

    closing.current = false;
    backdrop.setValue(0);
    sheet.setValue(0);

    Animated.parallel([
      Animated.timing(backdrop, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.quad),
        useNativeDriver,
      }),
      Animated.timing(sheet, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver,
      }),
    ]).start();
  }, [visible, backdrop, sheet, useNativeDriver]);

  const animateOut = (done: () => void) => {
    if (closing.current) return;
    closing.current = true;

    Animated.parallel([
      Animated.timing(backdrop, {
        toValue: 0,
        duration: 180,
        easing: Easing.in(Easing.quad),
        useNativeDriver,
      }),
      Animated.timing(sheet, {
        toValue: 0,
        duration: 220,
        easing: Easing.in(Easing.cubic),
        useNativeDriver,
      }),
    ]).start(({ finished }) => {
      closing.current = false;
      if (finished) done();
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={() => animateOut(onClose)}
      presentationStyle="overFullScreen"
      statusBarTranslucent
    >
      <View style={styles.root}>
        <View
          style={[
            styles.frame,
            Platform.OS === "web" && styles.webFrame,
          ]}
        >
          <Animated.View
            style={[styles.backdrop, { opacity: backdrop }]}
          >
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => animateOut(onClose)}
              accessibilityRole="button"
              accessibilityLabel="Close line picker"
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.sheet,
              {
                backgroundColor: colors.surface,
                borderTopColor: colors.border,
                paddingBottom: Math.max(insets.bottom, 18),
                transform: [
                  {
                    translateY: sheet.interpolate({
                      inputRange: [0, 1],
                      outputRange: [SHEET_TRAVEL, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.grab} />
            <Text style={[styles.title, { color: colors.fg }]}>
              {station?.name ?? "Which line?"} · Which line?
            </Text>
            <Text style={[styles.subtitle, { color: colors.mutedFg }]}>
              This station is an interchange
            </Text>

            <ScrollView
              style={{ maxHeight: 360 }}
              contentContainerStyle={{ gap: 8 }}
              showsVerticalScrollIndicator={false}
            >
              {(station?.lines ?? []).map((lineCode) => {
                const line = lines.find((item) => item.code === lineCode);
                if (!line) return null;
                const info = LINE_META[lineCode];
                const first = line.stations[0]?.name ?? "—";
                const last =
                  line.stations[line.stations.length - 1]?.name ?? "—";
                const selected = selectedLine === lineCode;

                return (
                  <Pressable
                    key={lineCode}
                    onPress={() => animateOut(() => onSelect(lineCode))}
                    style={[
                      styles.lineButton,
                      {
                        backgroundColor: colors.mutedBg,
                        borderColor: selected ? info.color : colors.border,
                      },
                      selected && { borderWidth: 2, padding: 7 },
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={`${info.name}, To ${first} and ${last}`}
                    accessibilityState={{ selected }}
                  >
                    <View style={[styles.badge, { backgroundColor: info.color }]}>
                      <Text style={styles.badgeText}>{lineCode}</Text>
                    </View>
                    <View style={styles.copy}>
                      <Text style={[styles.lineName, { color: colors.fg }]}>
                        {info.name}
                      </Text>
                      <Text style={[styles.terminals, { color: colors.mutedFg }]}>
                        To {first} · {last}
                      </Text>
                    </View>
                    <Text style={[styles.chevron, { color: colors.mutedFg }]}>
                      ›
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  frame: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
  },
  webFrame: {
    maxWidth: WEB_SHELL_MAX_WIDTH,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  grab: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#4a4f4a",
    alignSelf: "center",
    marginBottom: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.6,
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 14,
    fontSize: 11.5,
  },
  lineButton: {
    minHeight: 64,
    borderRadius: 12,
    borderWidth: 1,
    padding: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  badge: {
    minWidth: 44,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  lineName: {
    fontSize: 13.5,
    fontWeight: "700",
  },
  terminals: {
    marginTop: 2,
    fontSize: 10,
  },
  chevron: {
    fontSize: 16,
  },
});
