// Web-only — no react-native-maps import (avoids codegenNativeComponent crash on web)
export const GOOGLE_MAPS_API_KEY =
  process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

export const MAP_PROVIDER = null;
