import { Toasts } from "@backpackapp-io/react-native-toast";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Kitchensink } from "../kitchensink/Kitchensink";

import { Auth } from "@/components/auth/Auth";
import { useSession } from "@/hooks/useSession";
import { StoriesProvider } from "@/providers/storiesProvider";
import { UserProvider } from "@/providers/userProvider";
import { theme } from "@/styles/theme";

export const DefaultLayout = () => {
  const session = useSession();

  // return (
  //   <SafeAreaProvider>
  //     <Kitchensink />
  //   </SafeAreaProvider>
  // );

  if (!session) {
    return (
      <ThemeProvider value={DarkTheme}>
        <SafeAreaProvider>
          <Auth />
        </SafeAreaProvider>
      </ThemeProvider>
    );
  }

  return (
    <UserProvider session={session}>
      <StoriesProvider>
        <ThemeProvider value={DarkTheme}>
          <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Stack
                screenOptions={{
                  headerStyle: { backgroundColor: theme.colors.bg },
                  headerTintColor: theme.colors.text,
                  contentStyle: { backgroundColor: theme.colors.bg },
                  headerShown: false,
                }}
              />
              <Toasts overrideDarkMode={false} />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </ThemeProvider>
      </StoriesProvider>
    </UserProvider>
  );
};
