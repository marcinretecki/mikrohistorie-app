import { BigShouldersInlineDisplay_700Bold } from "@expo-google-fonts/big-shoulders-inline-display";
import { BigShouldersInlineText_700Bold } from "@expo-google-fonts/big-shoulders-inline-text";
import { BigShouldersText_700Bold } from "@expo-google-fonts/big-shoulders-text";
import { Lora_400Regular, Lora_600SemiBold } from "@expo-google-fonts/lora";
import { RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Text as ReactText } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";
import { StoriesProvider } from "@/hooks/useFetchStories";

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
  if (!fontsLoaded && !fontError) {
    return <ReactText>Loading</ReactText>;
  }
  console.log("fontsLoaded", fontsLoaded);

  return (
    <StoriesProvider>
      <ThemeProvider value={DarkTheme}>
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
      </ThemeProvider>
    </StoriesProvider>
  );
}
