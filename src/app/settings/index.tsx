import { Trans } from "@lingui/macro";
import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, LayoutAnimation } from "react-native";

import { Loading } from "../loading/Loading";

import { Header } from "@/components/header/Header";
import { LanguagePicker } from "@/components/picker/Picker";
import { useSession } from "@/hooks/useSession";
import { useSettings } from "@/hooks/useSettings";
import { useUser } from "@/hooks/useUser";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";

export default function Page() {
  const [visible, setVisible] = useState(false);
  const session = useSession();
  const user = useUser();
  const { isPending, settings, updateSettings } = useSettings();

  // useEffect(() => {
  //   // Animate layout changes when loading changes
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   setVisible(!isPending);
  // }, [isPending]);

  const handleUpdateSettings = (language: string) => {
    updateSettings.mutate({
      id: user.id,
      settings: { language },
    });
  };

  console.log("settings", settings);

  if (settings) {
    return (
      <View style={styles.root}>
        <ScrollView>
          <Header title="Settings" />

          <View style={styles.content}>
            <View style={styles.settingsItem}>
              <Text type="Lora12Reg" color={theme.colors.text80}>
                <Trans>Your account email</Trans>
              </Text>
              <Text type="Lora16Reg">{session?.user.email}</Text>
            </View>
            <LanguagePicker
              selectedLanguge={settings.language}
              handleChange={handleUpdateSettings}
            />
          </View>
        </ScrollView>
      </View>
    );
  } else if (!visible) {
    return <Loading />;
  } else {
    // TODO handle error
    return null;
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flexDirection: "column",
    gap: 48,
    paddingBottom: 48,
    paddingHorizontal: 16,
  },
  settingsItem: {
    flexDirection: "column",
    gap: 8,
  },
});
