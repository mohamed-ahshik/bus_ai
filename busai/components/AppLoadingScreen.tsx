import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

/**
 * Full-screen loading art from `assets/loading_page.png`. Shown over the root navigator briefly on cold start.
 *
 * Uses `contain` so the whole image stays visible on any aspect ratio (black bars if needed).
 * Use `cover` instead if you prefer edge-to-edge fill with possible cropping.
 */
export function AppLoadingScreen() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <Image
        source={require("../assets/loading_page.png")}
        style={styles.image}
        resizeMode="contain"
        accessibilityLabel="Loading"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000000",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
