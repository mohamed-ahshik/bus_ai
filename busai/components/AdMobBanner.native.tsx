import React from "react";
import { View, StyleSheet } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { getBannerAdUnitId } from "../lib/adMobConfig";

/**
 * Anchored adaptive banner at the root layout (native only; all routes).
 */
export function AdMobBanner() {
  return (
    <View style={styles.wrap} pointerEvents="box-none">
      <BannerAd unitId={getBannerAdUnitId()} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    maxWidth: 430,
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
