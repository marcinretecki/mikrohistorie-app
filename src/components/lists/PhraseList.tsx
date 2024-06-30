import { useRef } from "react";
import { View, StyleSheet, Pressable, FlatList } from "react-native";

import { PhraseListHeader } from "./PhraseListHeader";

import { PhrasePlayButton } from "@/components/buttons/PhrasePlayButton";
import { BackButton } from "@/components/header/BackButton";
import { Reader } from "@/components/indicators/Reader";
import { BoxShadow } from "@/components/shadow/BoxShadow";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";
import { StoryVersion, StoryPhrase } from "@/types/types";

interface PhraseListProps {
  version: StoryVersion;
  title: string;
  focusedPhrase: number;
  playingPhrase: number;
  isPlaying: boolean;
  handlePlayPhrase: (newPosition: number) => void;
}
export const PhraseList = ({
  version,
  title,
  focusedPhrase,
  playingPhrase,
  isPlaying,
  handlePlayPhrase,
}: PhraseListProps) => {
  const flatListRef = useRef(null);
  const phrases = version.phrases;

  // TODO: check getItemLayout value
  // TODO: move ref to parent component
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
        return (
          <View style={styles.listItemWrapper}>
            <Fragment
              key={baseIndex}
              phrase={phrase}
              isCurrent={baseIndex === focusedPhrase}
              isPlaying={baseIndex === playingPhrase && isPlaying}
              isNotDone={baseIndex > focusedPhrase}
              pressHandler={() => handlePlayPhrase(baseIndex)}
            />
          </View>
        );
      }}
      ListHeaderComponent={() => (
        <PhraseListHeader title={title} version={version} />
      )}
    />
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
