import { Platform } from "react-native";
import { PROVIDER_DEFAULT } from "react-native-maps";

export const GOOGLE_MAPS_API_KEY =
  process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

// On native (iOS/Android), use PROVIDER_DEFAULT.
// Android already uses Google Maps by default, and this avoids conflicts
// with Expo Go's built-in API key configuration.
export const MAP_PROVIDER = PROVIDER_DEFAULT;
