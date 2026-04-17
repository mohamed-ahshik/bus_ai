export type ThemePreference = "light" | "dark" | "system";

export type AppColors = {
  primary: string;
  /** Text/icons on primary-colored controls */
  onPrimary: string;
  /** Main screen background */
  bg: string;
  /** Cards, sheets, headers */
  surface: string;
  mutedBg: string;
  fg: string;
  mutedFg: string;
  border: string;
  bgAlt: string;
  bgSection: string;
  blue: string;
  mapBg: string;
  webChromeOuter: string;
  webChromeInner: string;
  /** Selected route / success tint background */
  tintBg: string;
};

export const lightColors: AppColors = {
  primary: "#2e7d32",
  onPrimary: "#ffffff",
  bg: "#ffffff",
  surface: "#ffffff",
  mutedBg: "#f5f5f5",
  fg: "#1a1a1a",
  mutedFg: "#757575",
  border: "#eeeeee",
  bgAlt: "#fcfcfc",
  bgSection: "#f5f5f5",
  blue: "#1a73e8",
  mapBg: "#f0f4f8",
  webChromeOuter: "#e5e5e5",
  webChromeInner: "#ffffff",
  tintBg: "#f0fdf4",
};

export const darkColors: AppColors = {
  primary: "#66bb6a",
  onPrimary: "#0d1f12",
  bg: "#121212",
  surface: "#1e1e1e",
  mutedBg: "#2a2a2a",
  fg: "#f5f5f5",
  mutedFg: "#a3a3a3",
  border: "#333333",
  bgAlt: "#181818",
  bgSection: "#242424",
  blue: "#64b5f6",
  mapBg: "#0d1117",
  webChromeOuter: "#0a0a0a",
  webChromeInner: "#121212",
  tintBg: "#1b2e1f",
};

export function colorsForScheme(scheme: "light" | "dark"): AppColors {
  return scheme === "dark" ? darkColors : lightColors;
}
