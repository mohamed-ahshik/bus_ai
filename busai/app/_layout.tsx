import "../global.css";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { BookmarksProvider } from "../lib/hooks/useBookmarks";
import { View, Platform, StyleSheet } from "react-native";
import { ThemeProvider, useAppTheme } from "../lib/ThemeContext";
import { AppLoadingScreen } from "../components/AppLoadingScreen";
import { AdMobBanner } from "../components/AdMobBanner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
});

function ThemedShell({ children }: { children: React.ReactNode }) {
  const { resolvedScheme, colors } = useAppTheme();
  const statusStyle = resolvedScheme === "dark" ? "light" : "dark";

  if (Platform.OS === "web") {
    return (
      <>
        <StatusBar style={statusStyle} />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: colors.webChromeOuter,
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              maxWidth: 430,
              backgroundColor: colors.webChromeInner,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.15,
              shadowRadius: 24,
            }}
          >
            {children}
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <StatusBar style={statusStyle} />
      {children}
    </>
  );
}

const BOOT_OVERLAY_MS = 1700;

/** One anchored banner for every route (tabs + stack). Tab bar offset uses `ROOT_BANNER_STRIP_RESERVE_PX`. */
function RootAdMobBanner() {
  const insets = useSafeAreaInsets();
  if (Platform.OS === "web") return null;
  return (
    <View
      pointerEvents="box-none"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: Math.max(insets.bottom, 4),
        alignItems: "center",
        zIndex: 50,
        elevation: 50,
      }}
    >
      <AdMobBanner />
    </View>
  );
}

export default function RootLayout() {
  const [showBootOverlay, setShowBootOverlay] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowBootOverlay(false), BOOT_OVERLAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (Platform.OS === "web") return;
    let cancelled = false;
    void import("react-native-google-mobile-ads").then(({ default: mobileAds }) => {
      if (!cancelled) void mobileAds().initialize();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const stack = (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="stop/[id]" options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="route/[id]" options={{ headerShown: false, animation: "slide_from_right" }} />
    </Stack>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BookmarksProvider>
        <SafeAreaProvider>
          <ThemeProvider>
            <View style={layoutStyles.rootFill}>
              <ThemedShell>{stack}</ThemedShell>
              <RootAdMobBanner />
              {showBootOverlay ? (
                <View style={layoutStyles.bootOverlay} pointerEvents="auto">
                  <AppLoadingScreen />
                </View>
              ) : null}
            </View>
          </ThemeProvider>
        </SafeAreaProvider>
      </BookmarksProvider>
    </QueryClientProvider>
  );
}

const layoutStyles = StyleSheet.create({
  rootFill: {
    flex: 1,
  },
  bootOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    elevation: 9999,
  },
});
