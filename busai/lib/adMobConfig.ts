import { Platform } from "react-native";

/** Extra bottom padding for tab scroll areas so content clears the anchored banner + floating tab bar. */
export const ADMOB_TAB_SCROLL_EXTRA = Platform.OS === "web" ? 0 : 72;

/**
 * Native: reserve space above the physical bottom for root `AdMobBanner`; tab bar floats above this band.
 * Web: 0 (no banner).
 */
export const ROOT_BANNER_STRIP_RESERVE_PX = Platform.OS === "web" ? 0 : 76;

/** Google sample adaptive banner (Android) — safe default when env is unset. */
const FALLBACK_BANNER_TEST_UNIT = "ca-app-pub-3940256099942544/9214589741";

/**
 * Banner ad unit from `EXPO_PUBLIC_ADMOB_BANNER_UNIT_ID` in `.env`.
 * Swap the value when going to production.
 */
export function getBannerAdUnitId(): string {
  const fromEnv = process.env.EXPO_PUBLIC_ADMOB_BANNER_UNIT_ID?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : FALLBACK_BANNER_TEST_UNIT;
}
