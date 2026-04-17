import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Appearance, AppState, type AppStateStatus } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorsForScheme, type AppColors, type ThemePreference } from "./theme";

const STORAGE_KEY = "@busai/theme_preference";

type ThemeContextValue = {
  preference: ThemePreference;
  setPreference: (p: ThemePreference) => void;
  resolvedScheme: "light" | "dark";
  colors: AppColors;
  hydrated: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveScheme(pref: ThemePreference): "light" | "dark" {
  if (pref === "system") {
    return Appearance.getColorScheme() === "dark" ? "dark" : "light";
  }
  return pref;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>("system");
  const [hydrated, setHydrated] = useState(false);
  const [systemTick, setSystemTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (cancelled) return;
        if (raw === "light" || raw === "dark" || raw === "system") {
          setPreferenceState(raw);
        }
      } catch {
        /* ignore */
      } finally {
        if (!cancelled) setHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (preference !== "system") return;
    const sub = Appearance.addChangeListener(() => setSystemTick((t) => t + 1));
    return () => sub.remove();
  }, [preference]);

  useEffect(() => {
    if (preference !== "system") return;
    const onApp = (s: AppStateStatus) => {
      if (s === "active") setSystemTick((t) => t + 1);
    };
    const sub = AppState.addEventListener("change", onApp);
    return () => sub.remove();
  }, [preference]);

  const resolvedScheme = useMemo(
    () => resolveScheme(preference),
    [preference, systemTick],
  );

  const colors = useMemo(() => colorsForScheme(resolvedScheme), [resolvedScheme]);

  const setPreference = useCallback((p: ThemePreference) => {
    setPreferenceState(p);
    AsyncStorage.setItem(STORAGE_KEY, p).catch(() => {});
  }, []);

  const value = useMemo(
    () => ({
      preference,
      setPreference,
      resolvedScheme,
      colors,
      hydrated,
    }),
    [preference, setPreference, resolvedScheme, colors, hydrated],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useAppTheme must be used within ThemeProvider");
  }
  return ctx;
}
