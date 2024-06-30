import { StyleSheet, View } from "react-native";

import { LoadingPhrases } from "../lists/LoadingPhrases";

import { BottomPlayer } from "@/components/audio/BottomPlayer";
import { PhraseList } from "@/components/lists/PhraseList";
import { useAudio } from "@/hooks/useAudio";
import { usePhrasePlayer } from "@/hooks/usePhrasePlayer";
import { useStory } from "@/hooks/useStory";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";

export const PhrasePlayer = () => {
  const { story, version, audio } = useStory();
  const {
    sound,
    isLoading: soundIsLoading,
    error: soundError,
  } = useAudio({ uri: audio?.breaked });
  const { error, isError, state, play, pause, check, updateUserInput } =
    usePhrasePlayer({ sound, version });

  console.log("state", state);

  const maxPosition = version?.phrases.length ?? 0;

  // TODO: add proper loading and error states
  if (!story || !version || soundIsLoading) {
    return <LoadingPhrases title={story?.title} version={version} />;
  }

  if (error || soundError) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.root}>
      <PhraseList
        title={story.title}
        handlePlayPhrase={play}
        version={version}
        focusedPhrase={state.focusedPhrase}
        playingPhrase={state.playingPhrase}
        isPlaying={state.isPlaying}
      />
      <BottomPlayer
        focusedPhrase={state.focusedPhrase}
        handlePlayPhrase={play}
        maxPosition={maxPosition}
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
