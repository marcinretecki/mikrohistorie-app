import { StyleSheet, View } from "react-native";

import { LoadingPhrases } from "../lists/LoadingPhrases";

import { BottomPlayer } from "@/components/audio/BottomPlayer";
import { PhraseWriteList } from "@/components/lists/PhraseWriteList";
import { useAudio } from "@/hooks/useAudio";
import { usePhrasePlayer } from "@/hooks/usePhrasePlayer";
import { useStory } from "@/hooks/useStory";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";

interface UserInputValues {
  [index: number]: string;
}

export const PhraseWriter = () => {
  const { story, version, audio } = useStory();
  const {
    sound,
    isLoading: soundIsLoading,
    error: soundError,
  } = useAudio({ uri: audio?.breaked });

  const { error, isError, state, play, pause, check, updateUserInput } =
    usePhrasePlayer({ sound, version });

  console.log("sound", sound ? "loaded" : "not loaded");
  console.log("state", state);
  console.log("error", error);

  const maxPosition = version?.phrases.length ?? 0;

  // TODO: add proper loading and error states
  if (!version || !story || soundIsLoading) {
    return <LoadingPhrases title={story?.title} version={version} />;
  }

  if (error || soundError) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.root}>
      <PhraseWriteList
        title={story.title}
        handlePlayPhrase={play}
        userInputValues={state.userInputValues}
        version={version}
        focusedPhrase={state.focusedPhrase}
        isPlaying={state.isPlaying}
        isChecked={state.isChecked}
        handleCheck={check}
      />

      <BottomPlayer
        focusedPhrase={state.focusedPhrase}
        handlePlayPhrase={play}
        handleKeyboardInput={updateUserInput}
        maxPosition={maxPosition}
        size={state.isChecked ? "big" : "small"}
        keyboardIsOpen={!state.isChecked}
        isPlaying={state.isPlaying}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.bg3,
    flex: 1,
  },
});
