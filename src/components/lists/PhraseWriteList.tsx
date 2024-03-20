import { useEffect, useRef } from "react";
import { View, StyleSheet, Pressable, TextInput } from "react-native";

import { PhrasePlayButton } from "@/components/buttons/PhrasePlayButton";
import { BoxShadow } from "@/components/shadow/BoxShadow";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";
import { StoryVersion, StoryPhrase } from "@/types";

interface PhraseWriteListProps {
  version: StoryVersion;
  currentPhraseNumber: number;
  isPlaying: boolean;
  isChecked: boolean;
  userInputValues: { [index: number]: string };
  handleSetPhraseNumber: (newPosition: number) => void;
  handleUserInput: (index: number, text: string) => void;
}
export const PhraseWriteList = ({
  version,
  currentPhraseNumber,
  isPlaying,
  isChecked,
  userInputValues,
  handleSetPhraseNumber,
  handleUserInput,
}: PhraseWriteListProps) => {
  const phrases = version.text.phrases;

  return (
    <View style={styles.root}>
      {phrases.map((phrase: StoryPhrase, index: number) => {
        const baseIndex = index + 1;

        if (isChecked) {
          return (
            <FragmentChecked
              key={baseIndex}
              phrase={phrase}
              userInput={userInputValues[baseIndex] || ""}
              isCurrent={baseIndex === currentPhraseNumber}
              isPlaying={baseIndex === currentPhraseNumber && isPlaying}
              pressHandler={() => handleSetPhraseNumber(baseIndex)}
            />
          );
        }

        return (
          <FragmentWrite
            key={baseIndex}
            isCurrent={baseIndex === currentPhraseNumber}
            isPlaying={baseIndex === currentPhraseNumber && isPlaying}
            isNotDone={baseIndex > currentPhraseNumber}
            pressHandler={() => handleSetPhraseNumber(baseIndex)}
            userInputHandler={handleUserInput}
            index={baseIndex}
            nextHandler={() => handleSetPhraseNumber(baseIndex + 1)}
          />
        );
      })}
    </View>
  );
};

interface FragmentProps {
  isPlaying: boolean;
  isCurrent: boolean;
  isNotDone: boolean;
  index: number;
  pressHandler: () => void;
  nextHandler: () => void;
  userInputHandler: (index: number, text: string) => void;
}
const FragmentWrite = ({
  isPlaying,
  isCurrent,
  isNotDone,
  index,
  pressHandler,
  nextHandler,
  userInputHandler,
}: FragmentProps) => {
  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    if (isCurrent) {
      inputRef.current?.focus();
      console.log("focus");
    }
  }, [isCurrent]);

  return (
    <BoxShadow shadow={isCurrent ? "viewShadowTealMedium" : "viewShadowTeal"}>
      <View
        style={[styles.phraseWrapper, isCurrent && styles.phraseWrapperCurrent]}
      >
        <Pressable onPress={() => pressHandler()}>
          <PhrasePlayButton isPlaying={isPlaying} isActive={!isNotDone} />
        </Pressable>
        <TextInput
          style={[styles.phraseInput, styles.phraseContent]}
          onChangeText={(text) => userInputHandler(index, text)}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          spellCheck={false}
          autoFocus={isCurrent}
          cursorColor={theme.colors.teal}
          inputMode="text"
          keyboardType="default"
          contextMenuHidden
          returnKeyType="next"
          ref={inputRef}
          onFocus={() => pressHandler()}
          blurOnSubmit={false}
          onSubmitEditing={() => nextHandler()}
          keyboardAppearance="dark"
        />
      </View>
    </BoxShadow>
  );
};

interface FragmentCheckedProps {
  phrase: StoryPhrase;
  userInput: string;
  isCurrent: boolean;
  isPlaying: boolean;
  pressHandler: () => void;
}
const FragmentChecked = ({
  phrase,
  userInput,
  isCurrent,
  isPlaying,
  pressHandler,
}: FragmentCheckedProps) => {
  const comparisonResult = compareAndGenerateComponents(
    phrase.phrase,
    userInput
  );

  return (
    <BoxShadow shadow={isCurrent ? "viewShadowTealMedium" : "viewShadowTeal"}>
      <Pressable onPress={() => pressHandler()}>
        <View style={[styles.phraseWrapper]}>
          <PhrasePlayButton isPlaying={isPlaying} isActive />

          <View style={styles.phraseCheckedContent}>
            <Text
              type="Lora14Reg"
              color={theme.colors.text}
              style={styles.textTest}
            >
              {comparisonResult}
            </Text>
            <View style={styles.divider} />
            <Text
              type="Lora14Reg"
              color={theme.colors.text}
              style={styles.textTest}
            >
              {phrase.phrase}
            </Text>
          </View>
        </View>
      </Pressable>
    </BoxShadow>
  );
};

const compareAndGenerateComponents = (phrase: string, userInput: string) => {
  const phraseWords = phrase.split(" ");
  const inputWords = userInput.split(" ");

  return inputWords.map((word, index) => {
    const match = phraseWords[index].toLowerCase() === word.toLowerCase();
    return (
      <Text style={match && styles.correctText} key={word + index}>
        {word + " "}
      </Text>
    );
  });
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 16,
  },
  phraseWrapper: {
    flexDirection: "row",
    alignSelf: "stretch",
    backgroundColor: theme.colors.bg2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "transparent",
    alignItems: "center",
  },
  phraseWrapperCurrent: {
    borderColor: theme.colors.teal,
  },
  phraseNotDone: {
    opacity: 0.5,
    alignSelf: "stretch",
  },
  phrasePlay: {
    width: 48,
    height: 48,
  },
  phraseContent: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  phraseInput: {
    color: theme.colors.text,
    fontFamily: "Lora_400Regular",
    fontSize: 14,
    lineHeight: 20,
  },
  phraseCheckedContent: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: "column",
    justifyContent: "center",
    gap: 2,
    height: 68,
  },
  divider: {
    // height: StyleSheet.hairlineWidth,
    height: 1,
    backgroundColor: theme.colors.bg3,
  },
  textTest: {
    textAlignVertical: "center",
    includeFontPadding: false,
    lineHeight: 24,
  },
  correctText: {
    color: theme.colors.green,
  },
});
