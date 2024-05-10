import languageIMG from "@assets/language.png";
import languageTealIMG from "@assets/language_teal.png";
import playArrowIMG from "@assets/play_arrow.png";
import playArrowActiveIMG from "@assets/play_arrow_active.png";
import skipNextIMG from "@assets/skip_next.png";
import skipPreviousIMG from "@assets/skip_previous.png";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Image,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { Language } from "../indicators/Language";
import { Keyboard } from "../keyboard/Keyboard";

import { useStory } from "@/hooks/useStory";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";

export interface BottomPlayerProps {
  size?: "small" | "big";
  position: number;
  maxPosition: number;
  keyboardIsOpen?: boolean;
  isPlaying?: boolean;
  handleSetPhraseNumber: (newPosition: number) => void;
  handleKeyboardInput?: (letter?: string) => void;
}

export const BottomPlayer = ({
  size = "big",
  position,
  maxPosition,
  isPlaying = false,
  keyboardIsOpen = false,
  handleSetPhraseNumber,
  handleKeyboardInput,
}: BottomPlayerProps) => {
  const [translationIsOpen, setTranslationIsOpen] = React.useState(false);
  const isLast = useMemo(
    () => position === maxPosition,
    [position, maxPosition],
  );

  const previousPositionHandler = useCallback(() => {
    if (position > 1) handleSetPhraseNumber(position - 1);
  }, [position]);

  const nextPositionHandler = useCallback(() => {
    if (position < maxPosition) handleSetPhraseNumber(position + 1);
  }, [position, maxPosition]);

  const currentPositionHandler = useCallback(() => {
    handleSetPhraseNumber(position);
  }, [position]);

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.player,
          size === "small" && styles.playerSmall,
          keyboardIsOpen && styles.playerWifKeyboard,
        ].filter(Boolean)}
      >
        <View style={styles.buttonWrapper}>
          <Text type="RobotoMono10Medium">
            {position.toString() + "/" + maxPosition}
          </Text>
        </View>
        <BottomPlayerButton onPress={() => previousPositionHandler()}>
          <Image style={styles.playImage} source={skipPreviousIMG} />
        </BottomPlayerButton>
        <BottomPlayerButton onPress={() => currentPositionHandler()}>
          {isPlaying ? (
            <Image style={styles.playImage} source={playArrowActiveIMG} />
          ) : (
            <Image style={styles.playImage} source={playArrowIMG} />
          )}
        </BottomPlayerButton>
        <BottomPlayerButton
          onPress={() => nextPositionHandler()}
          disabled={isLast}
        >
          <Image style={styles.playImage} source={skipNextIMG} />
        </BottomPlayerButton>
        {size === "big" ? (
          <BottomPlayerButton
            onPress={() => setTranslationIsOpen(!translationIsOpen)}
          >
            <LanguageButtonContent language="PL" active={translationIsOpen} />
          </BottomPlayerButton>
        ) : (
          <View style={styles.buttonWrapper} />
        )}
      </View>
      {handleKeyboardInput && (
        <Keyboard
          isOpen={keyboardIsOpen}
          onKeyboardInput={handleKeyboardInput}
          onNext={nextPositionHandler}
          enterIsActive={!isLast}
        />
      )}
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
          color={active ? theme.colors.teal : undefined}
        >
          {language}
        </Text>
      </View>
    </View>
  );
};

interface BottomPlayerButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onPress: () => void;
}

export const BottomPlayerButton = ({
  children,
  disabled = false,
  onPress,
}: BottomPlayerButtonProps) => {
  return (
    <Pressable
      onPress={() => onPress()}
      style={[
        styles.buttonWrapper,
        disabled && styles.buttonWrapperDisabled,
      ].filter(Boolean)}
    >
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
      <Text type="Lora14Reg">{story?.translations.pl}</Text>
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
  playerSmall: {
    height: 64,
    paddingTop: 0,
    paddingBottom: 0,
  },
  playerWifKeyboard: {
    height: 64,
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
  buttonWrapperDisabled: {
    opacity: 0.33,
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
