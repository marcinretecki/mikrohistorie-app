import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Mikrohistorie",
  slug: "mikrohistorie",
  scheme: "com.mikrohistorie",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  backgroundColor: "#110e16",
  primaryColor: "#6bdffe",
  androidStatusBar: {
    barStyle: "dark-content",
  },
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#110e16",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    userInterfaceStyle: "dark",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#110e16",
    },
    userInterfaceStyle: "dark",
    backgroundColor: "#110e16",
  },
  web: {
    favicon: "./assets/favicon.png",
    bundler: "metro",
  },
  experiments: {
    tsconfigPaths: true,
  },
  plugins: ["expo-localization", "expo-font"],
};

export default config;
