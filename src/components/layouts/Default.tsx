import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Auth } from "@/components/auth/Auth";
import { StoriesProvider } from "@/hooks/useFetchStories";
import { useSession } from "@/hooks/useSession";
import { theme } from "@/styles/theme";
import { Kitchensink } from "../kitchensink/Kitchensink";

export const DefaultLayout = () => {
  const session = useSession();

  if (!session) {
    return (
      <SafeAreaProvider>
        <Kitchensink />
      </SafeAreaProvider>
    );
    // return <Auth />;
  }

  return (
    <StoriesProvider>
      <ThemeProvider value={DarkTheme}>
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
};
