import settingsIMG from "@assets/settings.png";
import { Trans } from "@lingui/macro";
import { Link } from "expo-router";
import { Pressable, View, StyleSheet, Image } from "react-native";

import { Flag } from "../flag/Flag";

import { useSettings } from "@/hooks/useSettings";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";

export const FrontFooter = () => {
  const { settings, isPending } = useSettings();

  if (isPending || !settings) return null;

  return (
    <View style={styles.root}>
      <Link
        href={{
          pathname: "/settings",
        }}
        asChild
      >
        <Pressable>
          <View style={styles.settingsItem}>
            <View style={styles.flagWrapper}>
              <Flag symbol={settings.language} />
            </View>
            <Text type="Lora14Reg" color={theme.colors.text}>
              <Trans>Settings</Trans>
            </Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.bg,
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  flagWrapper: {
    width: 16,
    overflow: "hidden",
    height: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
