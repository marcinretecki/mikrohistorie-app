import languageIMG from "@assets/language.png";
import languageTealIMG from "@assets/language_teal.png";
import playArrowIMG from "@assets/play_arrow.png";
import skipNextIMG from "@assets/skip_next.png";
import skipPreviousIMG from "@assets/skip_previous.png";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { Language } from "../indicators/Language";

import { useStory } from "@/hooks/useStory";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";

export interface BottomPlayerProps {
  position: number;
  maxPosition: number;
  handleSetPhraseNumber: (newPosition: number) => void;
}

export const BottomPlayer = ({
  position,
  maxPosition,
  handleSetPhraseNumber,
}: BottomPlayerProps) => {
  const [translationIsOpen, setTranslationIsOpen] = React.useState(false);

  const previousPositionHandler = () => {
    if (position > 1) handleSetPhraseNumber(position - 1);
  };

  const nextPositionHandler = () => {
    if (position < maxPosition) handleSetPhraseNumber(position + 1);
  };

  const currentPositionHandler = () => {
    handleSetPhraseNumber(position);
  };

  return (
    <View style={styles.root}>
      <View style={styles.player}>
        <View style={styles.buttonWrapper}>
          <Text type="RobotoMono10Medium">
            {position.toString() + "/" + maxPosition}
          </Text>
        </View>
        <BottomPlayerButton onPress={() => previousPositionHandler()}>
          <Image style={styles.playImage} source={skipPreviousIMG} />
        </BottomPlayerButton>
        <BottomPlayerButton onPress={() => currentPositionHandler()}>
          <Image style={styles.playImage} source={playArrowIMG} />
        </BottomPlayerButton>
        <BottomPlayerButton onPress={() => nextPositionHandler()}>
          <Image style={styles.playImage} source={skipNextIMG} />
        </BottomPlayerButton>
        <BottomPlayerButton
          onPress={() => setTranslationIsOpen(!translationIsOpen)}
        >
          <LanguageButtonContent language="PL" active={translationIsOpen} />
        </BottomPlayerButton>
      </View>
      <BottomPlayerTranslation isOpen={translationIsOpen} />
    </View>
  );
};

interface LanguageButtonProps {
  language: string;
  active: boolean;
}
const LanguageButtonContent = ({ language, active }: LanguageButtonProps) => {
  return (
    <View style={styles.languageButtonContent}>
      {active ? (
        <Image style={styles.languageButtonImage} source={languageTealIMG} />
      ) : (
        <Image style={styles.languageButtonImage} source={languageIMG} />
      )}
      <View style={styles.languageButtonTextWrapper}>
        <Text
          type="RobotoMono10Medium"
          style={styles.languageText}
          color={active && theme.colors.teal}
        >
          {language}
        </Text>
      </View>
    </View>
  );
};

interface BottomPlayerButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

export const BottomPlayerButton = ({
  children,
  onPress,
}: BottomPlayerButtonProps) => {
  return (
    <Pressable onPress={() => onPress()} style={styles.buttonWrapper}>
      <View>{children}</View>
    </Pressable>
  );
};

// TODO: Add translations
interface BottomPlayerTranslationProps {
  isOpen: boolean;
}
export const BottomPlayerTranslation = ({
  isOpen,
}: BottomPlayerTranslationProps) => {
  const { story } = useStory();
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    // Animate layout changes when isOpen changes
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setVisible(isOpen);
  }, [isOpen]);

  if (!visible) return null;

  return (
    <View style={styles.translation}>
      <Language />
      <Text type="Lora14Reg">{story.translations.pl}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingBottom: 24,
    backgroundColor: theme.colors.bg,
  },
  player: {
    flexDirection: "row",
    height: 128,
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
  },
  translation: {
    paddingTop: 0,
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 16,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  buttonWrapper: {
    width: 56,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  languageButtonContent: {
    width: 56,
    height: 64,
    position: "relative",
  },
  languageButtonTextWrapper: {
    paddingTop: 36,
  },
  languageText: {
    textAlign: "center",
  },

  languageButtonImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  $335: {
    color: theme.colors.text80,
    fontFamily: "Roboto Mono",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "500",
    letterSpacing: 0.3,
  },

  playerStateTranslation: {
    paddingTop: 0,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 48,
    flexDirection: "column",
    alignItems: "flex-end",
    rowGap: 16,
    columnGap: 16,
  },
  position: {
    flexDirection: "row",
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 10,
    columnGap: 10,
    flexShrink: 0,
  },
  pl: {
    color: theme.colors.text,
    textAlign: "center",
    fontFamily: "Roboto Mono",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  plStateTranslation: {
    color: theme.colors.teal,
  },
  position2: {
    width: 36,
    height: 36,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  playImage: {
    width: 56,
    height: 64,
  },
  skipImage: {
    width: 36,
    height: 36,
  },
});
function setVisible(isOpen: boolean) {
  throw new Error("Function not implemented.");
}
