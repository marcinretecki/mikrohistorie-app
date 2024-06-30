import { Trans } from "@lingui/macro";
import { useEffect, useRef } from "react";
import { View, StyleSheet, Pressable, TextInput, FlatList } from "react-native";

import { Divider } from "./Divider";
import { PhraseListHeader } from "./PhraseListHeader";
import { ButtonPrimary } from "../buttons/ButtonPrimary";
import { BackButton } from "../header/BackButton";
import { Reader } from "../indicators/Reader";

import { PhrasePlayButton } from "@/components/buttons/PhrasePlayButton";
import { BoxShadow } from "@/components/shadow/BoxShadow";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";
import { StoryVersion, StoryPhrase } from "@/types/types";

interface PhraseWriteListProps {
  version: StoryVersion;
  title: string;
  focusedPhrase: number;
  isPlaying: boolean;
  isChecked: boolean;
  userInputValues: { [index: number]: string };
  handlePlayPhrase: (phrase: number) => void;
  handleCheck: () => void;
}
export const PhraseWriteList = ({
  version,
  title,
  focusedPhrase,
  isPlaying,
  isChecked,
  userInputValues,
  handlePlayPhrase,
  handleCheck,
}: PhraseWriteListProps) => {
  const flatListRef = useRef(null);
  const phrases = version.phrases;

  // TODO: add layout lengh on isChecked

  return (
    <FlatList
      ref={flatListRef}
      data={phrases}
      getItemLayout={(data, index) => ({
        length: 80,
        offset: 80 * index,
        index,
      })}
      renderItem={({
        item: phrase,
        index,
      }: {
        item: StoryPhrase;
        index: number;
      }) => {
        const baseIndex = index + 1;

        if (isChecked) {
          return (
            <View style={styles.listItemWrapper}>
              <FragmentChecked
                key={baseIndex}
                phrase={phrase}
                userInput={userInputValues[baseIndex] || ""}
                isCurrent={baseIndex === focusedPhrase}
                isPlaying={baseIndex === focusedPhrase && isPlaying}
                pressHandler={() => handlePlayPhrase(baseIndex)}
              />
            </View>
          );
        }

        return (
          <View style={styles.listItemWrapper}>
            <FragmentWrite
              key={baseIndex}
              isCurrent={baseIndex === focusedPhrase}
              isPlaying={baseIndex === focusedPhrase && isPlaying}
              isNotDone={baseIndex > focusedPhrase}
              onPress={() => handlePlayPhrase(baseIndex)}
              value={userInputValues[baseIndex] || ""}
              index={baseIndex}
              onNext={() => handlePlayPhrase(baseIndex + 1)}
            />
          </View>
        );
      }}
      ListHeaderComponent={() => (
        <PhraseListHeader title={title} version={version} />
      )}
      ListFooterComponent={() =>
        !isChecked ? (
          <View style={styles.footerWrapper}>
            <ButtonPrimary
              onPress={() => {
                handleCheck();
              }}
            >
              <Trans>Check</Trans>
            </ButtonPrimary>
          </View>
        ) : null
      }
    />
  );
};

interface FragmentProps {
  isPlaying: boolean;
  isCurrent: boolean;
  isNotDone: boolean;
  index: number;
  value: string;
  onPress: () => void;
  onNext: () => void;
}
export const FragmentWrite = ({
  isPlaying,
  isCurrent,
  isNotDone,
  index,
  value,
  onPress,
  onNext,
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
        style={[
          styles.phraseWrapper,
          isCurrent && styles.phraseWrapperCurrent,
        ].filter(Boolean)}
      >
        <Pressable onPress={() => onPress()}>
          <PhrasePlayButton isPlaying={isPlaying} isActive={!isNotDone} />
        </Pressable>
        <TextInput
          style={[styles.phraseInput, styles.phraseContent]}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          value={value}
          spellCheck={false}
          autoFocus={isCurrent}
          cursorColor={theme.colors.teal}
          inputMode="none"
          keyboardType="default"
          contextMenuHidden
          returnKeyType="next"
          ref={inputRef}
          onFocus={() => onPress()}
          blurOnSubmit={false}
          onSubmitEditing={() => onNext()}
          keyboardAppearance="dark"
          importantForAutofill="no"
          showSoftInputOnFocus={false}
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
    userInput,
  );

  return (
    <BoxShadow shadow={isCurrent ? "viewShadowTealMedium" : "viewShadowTeal"}>
      <Pressable onPress={() => pressHandler()}>
        <View style={styles.phraseWrapper}>
          <PhrasePlayButton isPlaying={isPlaying} isActive />

          <View style={styles.phraseCheckedContent}>
            <Text
              type="Lora14Reg"
              color={theme.colors.text}
              style={styles.textTest}
            >
              {comparisonResult}
            </Text>
            <Divider />
            <Text
              type="Lora14Reg"
              color={theme.colors.text80}
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
      <Text
        style={[match && styles.correctText].filter(Boolean)}
        key={word + index}
      >
        {word + " "}
      </Text>
    );
  });
};

const styles = StyleSheet.create({
  backWrapper: {
    position: "absolute",
    top: 48,
    left: 16,
  },
  header: {
    paddingTop: 80,
    paddingBottom: 40,
    gap: 32,
    flex: 1,
  },
  titleWrapper: {
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 8,
  },
  footerWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  listItemWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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
  textTest: {
    textAlignVertical: "center",
    includeFontPadding: false,
    lineHeight: 24,
  },
  correctText: {
    color: theme.colors.green,
  },
});
