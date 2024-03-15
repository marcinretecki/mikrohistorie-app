import { useLocale } from "@/hooks/useLocale";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";
import { View, StyleSheet } from "react-native";

// TODO: Implement language
export const Language = () => {
  const deviceLanguage = useLocale();

  const languageMap = {
    pl: "Polski",
    en: "English",
  };

  return (
    <View style={styles.root}>
      <Text type="Lora12Reg" color={theme.colors.text}>
        {languageMap["pl"]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: theme.colors.bgBlue,
  },
});
