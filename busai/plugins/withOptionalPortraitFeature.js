const { withAndroidManifest } = require("@expo/config-plugins");

/**
 * Keep the app portrait-only while telling Google Play that portrait support
 * is not a required hardware feature. Without this, Play restricts the app to
 * devices that declare android.hardware.screen.portrait.
 */
module.exports = function withOptionalPortraitFeature(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;
    const features = manifest["uses-feature"] ?? [];

    const existing = features.find(
      (item) =>
        item.$?.["android:name"] === "android.hardware.screen.portrait",
    );

    if (existing) {
      existing.$["android:required"] = "false";
    } else {
      features.push({
        $: {
          "android:name": "android.hardware.screen.portrait",
          "android:required": "false",
        },
      });
    }

    manifest["uses-feature"] = features;
    return config;
  });
};
