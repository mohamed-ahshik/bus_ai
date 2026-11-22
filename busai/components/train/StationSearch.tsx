import React from "react";
import { Platform, Pressable, StyleSheet, TextInput, View } from "react-native";
import { Iconify } from "react-native-iconify";
import { useAppTheme } from "../../lib/ThemeContext";

const APP_FONT = Platform.select({
  ios: "System",
  android: "sans-serif",
  web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  default: "System",
});

type Props = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

export function StationSearch({ value, onChange, onClear }: Props) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.wrap,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <Iconify
        icon="solar:magnifer-linear"
        size={17}
        color={colors.mutedFg}
      />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Search station"
        placeholderTextColor={colors.mutedFg}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="never"
        returnKeyType="search"
        style={[styles.input, { color: colors.fg }]}
        accessibilityLabel="Search station"
      />
      {value.length > 0 ? (
        <Pressable
          onPress={onClear}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Clear station search"
        >
          <Iconify
            icon="solar:close-circle-bold"
            size={18}
            color={colors.mutedFg}
          />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    fontFamily: APP_FONT,
    paddingVertical: 0,
  },
});
