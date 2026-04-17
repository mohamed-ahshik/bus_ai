import React from "react";
import { View, Pressable } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Iconify } from "react-native-iconify";
import { useAppTheme } from "../lib/ThemeContext";
import { ROOT_BANNER_STRIP_RESERVE_PX } from "../lib/adMobConfig";

const TABS = [
  {
    name: "index",
    activeIcon: "solar:compass-bold",
    inactiveIcon: "solar:compass-linear",
  },
  {
    name: "bookmarks",
    activeIcon: "solar:bookmark-bold",
    inactiveIcon: "solar:bookmark-linear",
  },
  {
    name: "map",
    activeIcon: "solar:map-bold",
    inactiveIcon: "solar:map-linear",
  },
  {
    name: "settings",
    activeIcon: "solar:settings-bold",
    inactiveIcon: "solar:settings-linear",
  },
];

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  return (
    <View
      style={{
        position: "absolute",
        bottom: insets.bottom + 16 + ROOT_BANNER_STRIP_RESERVE_PX,
        left: 0,
        right: 0,
        alignItems: "center",
        pointerEvents: "box-none",
      }}
    >
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 999,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 8,
          paddingVertical: 4,
          height: 64,
          width: "85%",
          maxWidth: 360,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          elevation: 8,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        {TABS.map((tab, index) => {
          const isFocused = state.index === index;
          const route = state.routes[index];

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route?.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route?.name ?? tab.name);
            }
          };

          return (
            <Pressable
              key={tab.name}
              onPress={onPress}
              style={{
                flex: 1,
                height: "100%",
                borderRadius: 999,
                backgroundColor: isFocused ? colors.primary : "transparent",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Iconify
                icon={isFocused ? tab.activeIcon : tab.inactiveIcon}
                size={26}
                color={isFocused ? colors.onPrimary : colors.primary}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
