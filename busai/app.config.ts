import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "SG Bus Flow",
  slug: "busai",
  owner: "mohamed-ahshik",
  version: "1.0.0",
  scheme: "busai",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#000000",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.busai.app",
    config: {
      googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
    },
  },
  android: {
    package: "com.mohamedahshik.sgbusflow",
    versionCode: 6,
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#ffffff",
    },
    config: {
      googleMaps: {
        apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
      },
    },
  },
  web: {
    bundler: "metro",
    favicon: "./assets/icon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-location",
      {
        locationWhenInUsePermission:
          "SG Bus Flow needs your location to find nearby bus stops.",
      },
    ],
    [
      "react-native-maps",
      {
        androidGoogleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        iosGoogleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
      },
    ],
    [
      "react-native-google-mobile-ads",
      {
        androidAppId: "ca-app-pub-2348383927263826~5682267789",
        // Replace with your AdMob iOS app ID when you register the iOS app; sample ID avoids a missing plist crash in dev.
        iosAppId: "ca-app-pub-3940256099942544~1458002511",
      },
    ],
  ],
  extra: {
    eas: {
      projectId: "810d18c7-1bc4-438f-9502-55e7f04d433b",
    },
  },
  experiments: {
    typedRoutes: true,
  },
});
