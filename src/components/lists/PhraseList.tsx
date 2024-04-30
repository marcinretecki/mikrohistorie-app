import { View, StyleSheet, Pressable } from "react-native";

import { PhrasePlayButton } from "@/components/buttons/PhrasePlayButton";
import { BoxShadow } from "@/components/shadow/BoxShadow";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";
import { StoryVersion, StoryPhrase } from "@/types/types";

interface PhraseListProps {
  version: StoryVersion;
  currentPhraseNumber: number;
  isPlaying: boolean;
  handleSetPhraseNumber: (newPosition: number) => void;
}
export const PhraseList = ({
  version,
  currentPhraseNumber,
  isPlaying,
  handleSetPhraseNumber,
}: PhraseListProps) => {
  const phrases = version.phrases;

  return (
    <View style={styles.root}>
      {phrases.map((phrase: StoryPhrase, index: number) => {
        const baseIndex = index + 1;

        return (
          <Fragment
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
const Fragment = ({
  phrase,
  isPlaying,
  isCurrent,
  isNotDone,
  pressHandler,
}: FragmentProps) => {
  return (
    <BoxShadow shadow={isCurrent ? "viewShadowTealMedium" : "viewShadowTeal"}>
      <Pressable onPress={pressHandler}>
        <View
          style={[
            styles.phraseWrapper,
            isCurrent && styles.phraseWrapperCurrent,
          ]}
        >
          <PhrasePlayButton isPlaying={isPlaying} isActive={!isNotDone} />
          <View style={styles.phraseContent}>
            <Text
              type="Lora14Reg"
              color={isNotDone ? theme.colors.text60 : theme.colors.text}
            >
              {phrase.phrase}
            </Text>
          </View>
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
});
