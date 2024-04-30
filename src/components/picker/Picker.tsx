import { Trans } from "@lingui/macro";
import { Pressable, StyleSheet, View, Image } from "react-native";

import { Flag } from "../flag/Flag";
import { BoxShadow } from "../shadow/BoxShadow";

import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";

interface Language {
  symbol: string;
  name: string;
}

interface LanguagePickerProps {
  selectedLanguge: string;
  handleChange: (language: string) => void;
}

export const LanguagePicker = ({
  selectedLanguge,
  handleChange,
}: LanguagePickerProps) => {
  const languages = [
    { symbol: "no", name: "Norsk" },
    { symbol: "pl", name: "Polski" },
    {
      symbol: "en",
      name: "English",
    },
  ];

  console.log("selectedLanguge", selectedLanguge);

  return (
    <View style={styles.languagePickerRoot}>
      <Text type="Lora12Reg" color={theme.colors.text80}>
        <Trans>App language</Trans>
      </Text>
      <View style={styles.languagesRow}>
        {languages.map((language) => (
          <LanguageButton
            key={language.symbol}
            language={language}
            isActive={selectedLanguge === language.symbol}
            handleSetLanguage={handleChange}
          />
        ))}
      </View>
    </View>
  );
};

interface LanguageButtonProps {
  language: Language;
  isActive: boolean;
  handleSetLanguage: (selectedLanguage: string) => void;
}
export function LanguageButton({
  language,
  isActive,
  handleSetLanguage,
}: LanguageButtonProps) {
  return (
    <BoxShadow shadow={isActive ? "viewShadowTealMedium" : "viewShadowTeal"}>
      <Pressable onPress={() => handleSetLanguage(language.symbol)}>
        <View
          style={[
            styles.languageItemRoot,
            isActive && styles.languageItemRootActive,
          ].filter(Boolean)}
        >
          <View style={styles.flagWrapper}>
            <Flag symbol={language.symbol} />
          </View>
          <Text type="Lora14Reg" style={styles.languageItemText}>
            {language.name}
          </Text>
        </View>
      </Pressable>
    </BoxShadow>
  );
}

const styles = StyleSheet.create({
  languagePickerRoot: {
    flexDirection: "column",
    gap: 16,
  },
  languagesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  languageItemRoot: {
    width: 104,
    height: 76,
    gap: 8,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.bg2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "transparent",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  languageItemRootActive: {
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: "solid",
    borderColor: theme.colors.teal,
  },
  languageItemText: {},
  flagWrapper: {
    width: 20,
    height: 14,
  },
});
