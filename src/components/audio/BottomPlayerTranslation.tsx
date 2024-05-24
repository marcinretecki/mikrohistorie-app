import React, { useCallback, useEffect, useState } from "react";
import { LayoutAnimation, View, StyleSheet } from "react-native";

import { TranslationButton } from "@/components/buttons/TranslationButton";
import { Divider } from "@/components/lists/Divider";
import { useLocale } from "@/hooks/useLocale";
import { useStory } from "@/hooks/useStory";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";

// TODO: Add translations
interface BottomPlayerTranslationProps {
  isOpen: boolean;
}
export const BottomPlayerTranslation = ({
  isOpen,
}: BottomPlayerTranslationProps) => {
  const { story } = useStory();
  const [visible, setVisible] = useState(isOpen);
  const { defaultLanguage } = useLocale();
  const [translation, setTranslation] = useState<string>(defaultLanguage);

  // current translations
  // pl, en
  // check useLocale

  const translations = story?.translations;

  const handleTranslation = useCallback(
    (language: string) => {
      if (language === translation) return;

      // Animate layout changes when language changes
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setTranslation(language);
    },
    [translation],
  );

  useEffect(() => {
    // Animate layout changes when isOpen changes
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setVisible(isOpen);
  }, [isOpen]);

  if (!visible || !translations) return null;

  return (
    <View style={styles.translation}>
      <Divider />
      <View style={styles.translationButtons}>
        {translations.pl && (
          <TranslationButton
            active={translation === "pl"}
            onPress={() => handleTranslation("pl")}
          >
            Polski
          </TranslationButton>
        )}
        {translations.en && (
          <TranslationButton
            active={translation === "en"}
            onPress={() => handleTranslation("en")}
          >
            English
          </TranslationButton>
        )}
      </View>
      {translations[translation] && (
        <Text type="Lora14Reg">{translations[translation]}</Text>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  translation: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 24,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  translationButtons: {
    flexDirection: "row",
    gap: 8,
  },
});
