import { BigShouldersInlineDisplay_700Bold } from "@expo-google-fonts/big-shoulders-inline-display";
import { BigShouldersInlineText_700Bold } from "@expo-google-fonts/big-shoulders-inline-text";
import { BigShouldersText_700Bold } from "@expo-google-fonts/big-shoulders-text";
import { Lora_400Regular, Lora_600SemiBold } from "@expo-google-fonts/lora";
import { RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { Platform, UIManager } from "react-native";

import { DefaultLayout } from "@/components/layouts/Default";
import { LoadingLayout } from "@/components/layouts/Loading";
import { SessionProvider } from "@/hooks/useSession";
import { messages } from "@/locales/en/messages";

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
      <I18nProvider i18n={i18n}>
        <SessionProvider>
          <DefaultLayout />
        </SessionProvider>
      </I18nProvider>
    );
  }

  return (
    <I18nProvider i18n={i18n}>
      <LoadingLayout />
    </I18nProvider>
  );
}
