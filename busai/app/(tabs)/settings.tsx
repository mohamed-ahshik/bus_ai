import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { useAppTheme } from "../../lib/ThemeContext";
import { ADMOB_TAB_SCROLL_EXTRA } from "../../lib/adMobConfig";
import type { ThemePreference } from "../../lib/theme";

const PREFS: { key: ThemePreference; label: string }[] = [
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
  { key: "system", label: "System" },
];

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const version = Constants.expoConfig?.version ?? "—";
  const { colors, preference, setPreference } = useAppTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgSection }}>
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingBottom: 24,
          paddingHorizontal: 24,
          backgroundColor: colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.04,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 28, color: colors.fg, marginBottom: 8 }}>Settings</Text>
        <Text style={{ fontSize: 13, color: colors.mutedFg }}>Preferences and app information</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: insets.bottom + 100 + ADMOB_TAB_SCROLL_EXTRA,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingVertical: 14,
            paddingHorizontal: 16,
            backgroundColor: colors.surface,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: colors.border,
            gap: 12,
          }}
        >
          <Text style={{ fontSize: 11, fontWeight: "700", color: colors.mutedFg, letterSpacing: 0.8 }}>
            APPEARANCE
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "700", color: colors.fg }}>Dark mode</Text>
          <Text style={{ fontSize: 13, color: colors.mutedFg, lineHeight: 18 }}>
            Choose light, dark, or match your device setting.
          </Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {PREFS.map(({ key, label }) => {
              const selected = preference === key;
              return (
                <Pressable
                  key={key}
                  onPress={() => setPreference(key)}
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    borderRadius: 10,
                    backgroundColor: selected ? colors.primary : colors.mutedBg,
                    borderWidth: 1,
                    borderColor: selected ? colors.primary : colors.border,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "700",
                      color: selected ? colors.onPrimary : colors.fg,
                    }}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Text style={{ fontSize: 14, color: colors.mutedFg, lineHeight: 21 }}>
          More options will appear here in a future update.
        </Text>
        <View
          style={{
            paddingVertical: 14,
            paddingHorizontal: 16,
            backgroundColor: colors.surface,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ fontSize: 11, fontWeight: "700", color: colors.mutedFg, letterSpacing: 0.8 }}>
            VERSION
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "700", color: colors.fg, marginTop: 4 }}>{version}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
