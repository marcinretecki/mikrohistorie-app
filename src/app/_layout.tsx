import { BigShouldersInlineDisplay_700Bold } from "@expo-google-fonts/big-shoulders-inline-display";
import { BigShouldersInlineText_700Bold } from "@expo-google-fonts/big-shoulders-inline-text";
import { BigShouldersText_700Bold } from "@expo-google-fonts/big-shoulders-text";
import { Lora_400Regular, Lora_600SemiBold } from "@expo-google-fonts/lora";
import { RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import { i18n } from "@lingui/core";
import { Trans } from "@lingui/macro";
import { I18nProvider } from "@lingui/react";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Platform, Text as ReactText, UIManager } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { StoriesProvider } from "@/hooks/useFetchStories";
import { messages } from "@/locales/en/messages";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

i18n.loadAndActivate({ locale: "pl", messages });
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    BigShouldersInlineText_700Bold,
    BigShouldersInlineDisplay_700Bold,
    BigShouldersText_700Bold,
    RobotoMono_500Medium,
    Lora_400Regular,
    Lora_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (fontsLoaded && !fontError) {
    console.log("fontsLoaded", fontsLoaded);

    return (
      // centered test text

      <StoriesProvider>
        <ThemeProvider value={DarkTheme}>
          <I18nProvider i18n={i18n}>
            {/* <Header /> */}
            <SafeAreaProvider>
              <Stack
                screenOptions={{
                  headerStyle: { backgroundColor: theme.colors.bg },
                  headerTintColor: theme.colors.text,
                  contentStyle: { backgroundColor: theme.colors.bg },
                  headerShown: false,
                }}
              />
            </SafeAreaProvider>
          </I18nProvider>
        </ThemeProvider>
      </StoriesProvider>
    );
  }

  return (
    <I18nProvider i18n={i18n}>
      <ReactText>
        <Trans>Loading</Trans>
      </ReactText>
    </I18nProvider>
  );
}
