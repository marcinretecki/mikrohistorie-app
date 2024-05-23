import React, { useCallback, useEffect, useState } from "react";
import { LayoutAnimation, View, StyleSheet } from "react-native";

import { TranslationButton } from "../buttons/TranslationButton";

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
  const [translation, setTranslation] = useState<string>("pl");

  const translations = story?.translations;

  const handleTranslation = useCallback((language: string) => {
    setTranslation(language);
  }, []);

  useEffect(() => {
    // Animate layout changes when isOpen changes
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setVisible(isOpen);
  }, [isOpen]);

  if (!visible || !translations) return null;

  return (
    <View style={styles.translation}>
      {translations.pl && (
        <TranslationButton onPress={() => handleTranslation("pl")}>
          Polski
        </TranslationButton>
      )}
      {translations.en && (
        <TranslationButton onPress={() => handleTranslation("en")}>
          English
        </TranslationButton>
      )}
      {translations[translation] && (
        <Text type="Lora14Reg">{translations[translation]}</Text>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  translation: {
    paddingTop: 0,
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 16,
    flexDirection: "column",
    alignItems: "flex-start",
  },
});
