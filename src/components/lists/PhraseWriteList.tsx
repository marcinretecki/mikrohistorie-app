import { View, StyleSheet, Pressable, TextInput } from "react-native";

import { PhrasePlayButton } from "@/components/buttons/PhrasePlayButton";
import { BoxShadow } from "@/components/shadow/BoxShadow";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";
import { StoryVersion, StoryPhrase } from "@/types";
import { useRef, useState } from "react";

interface PhraseWriteListProps {
  version: StoryVersion;
  currentPhraseNumber: number;
  isPlaying: boolean;
  isChecked: boolean;
  handleSetPhraseNumber: (newPosition: number) => void;
}
export const PhraseWriteList = ({
  version,
  currentPhraseNumber,
  isPlaying,
  isChecked,
  handleSetPhraseNumber,
}: PhraseWriteListProps) => {
  const phrases = version.text.phrases;

  return (
    <View style={styles.root}>
      {phrases.map((phrase: StoryPhrase, index: number) => {
        const baseIndex = index + 1;

        return (
          <FragmentWrite
            key={baseIndex}
            phrase={phrase}
            isCurrent={baseIndex === currentPhraseNumber}
            isPlaying={baseIndex === currentPhraseNumber && isPlaying}
            isNotDone={baseIndex > currentPhraseNumber}
            pressHandler={() => handleSetPhraseNumber(baseIndex)}
          />
        );
      })}
    </View>
  );
};

interface FragmentProps {
  phrase: StoryPhrase;
  isPlaying: boolean;
  isCurrent: boolean;
  isNotDone: boolean;
  pressHandler: () => void;
}
const FragmentWrite = ({
  phrase,
  isPlaying,
  isCurrent,
  isNotDone,
  pressHandler,
}: FragmentProps) => {
  const [text, onChangeText] = useState("");
  const ref_input = useRef<TextInput | null>(null);

  const onPress = () => {
    if (ref_input.current) {
      ref_input.current.focus();
    }
    pressHandler();
  };

  return (
    <BoxShadow shadow={isCurrent ? "viewShadowTealMedium" : "viewShadowTeal"}>
      <Pressable onPress={onPress}>
        <View
          style={[
            styles.phraseWrapper,
            isCurrent && styles.phraseWrapperCurrent,
          ]}
        >
          <PhrasePlayButton isPlaying={isPlaying} isActive={!isNotDone} />

          <TextInput
            style={[styles.phraseInput, styles.phraseContent]}
            onChangeText={onChangeText}
            value={text}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            spellCheck={false}
            autoFocus={isCurrent}
            cursorColor={theme.colors.teal}
            inputMode="text"
            keyboardType="default"
            contextMenuHidden={true}
            returnKeyType="next"
            onFocus={onPress}
            ref={ref_input}
          />
        </View>
      </Pressable>
    </BoxShadow>
  );
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
});
