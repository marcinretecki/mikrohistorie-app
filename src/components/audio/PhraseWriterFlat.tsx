import { useCallback, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Loading } from "@/app/loading/Loading";
import { BottomPlayer } from "@/components/audio/BottomPlayer";
import { PhraseWriteList } from "@/components/lists/PhraseWriteFlatList";
import { useAudio } from "@/hooks/useAudio";
import { useStory } from "@/hooks/useStory";
import { theme } from "@/styles/theme";

interface UserInputValues {
  [index: number]: string;
}

export const PhraseWriter = () => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const { story, version, audio, handleProgress, versionProgress } = useStory();
  const { sound, isLoading, error } = useAudio({ uri: audio?.breaked });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [playingPhrase, setPlayingPhrase] = useState(0);
  const [userInputValues, setUserInputValues] = useState<UserInputValues>({});
  const [playbackPositionCheckInterval, setPlaybackPositionCheckInterval] =
    useState<NodeJS.Timeout | null>(null);

  // Phrase base index 1
  const [phraseNumber, setPhraseNumber] = useState(1);

  const maxPosition = version?.phrases.length ?? 0;

  const handleSetPhraseNumber = useCallback(
    (newPosition: number) => {
      if (newPosition < 1 || newPosition > maxPosition) return;
      setPhraseNumber(newPosition);
      playPhrase(newPosition);
    },
    [maxPosition],
  );

  const handleCheck = useCallback(() => {
    console.log("handleCheck");
    setPhraseNumber(1);
    setIsChecked(true);
    handleProgress({ type: "write" });
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  }, [handleProgress]);

  const handleUserInput = useCallback((index: number, text: string) => {
    setUserInputValues((prev) => ({ ...prev, [index]: text }));
  }, []);

  const handleKeyboardInput = useCallback((letter?: string) => {
    setUserInputValues((prev) => {
      const currentText = prev[phraseNumber] || "";

      let newText = "";
      if (letter === "") {
        newText = currentText.slice(0, -1); // handle backspace
      } else {
        newText = currentText + letter; // handle normal input
      }

      return {
        ...prev,
        [phraseNumber]: newText,
      };
    });
  }, []);

  // play the phrase for 1 second
  const playPhrase = async (newPosition: number) => {
    if (!sound || !version) return;

    console.log("playPhrase", newPosition);

    // Do not interrupt the current phrase if it's already playing
    if (playingPhrase === newPosition) {
      return;
    }

    // If other phrase is already playing, pause it
    if (isPlaying) {
      setIsPlaying(false);
      await sound.pauseAsync();
    }

    const timeStart = version.phrases[newPosition - 1].timeStart;
    const timeEnd = version.phrases[newPosition - 1].timeEnd;
    await sound.setPositionAsync(timeStart);
    await sound.playAsync();
    setIsPlaying(true);
    setPlayingPhrase(newPosition);

    // Clear any existing interval to avoid multiple intervals running
    if (playbackPositionCheckInterval) {
      clearInterval(playbackPositionCheckInterval);
      setPlaybackPositionCheckInterval(null);
    }

    setPlaybackPositionCheckInterval(
      setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded && status.positionMillis >= timeEnd) {
          await sound.pauseAsync();
          setIsPlaying(false);
          setPlayingPhrase(0);
          setPlaybackPositionCheckInterval(null);
        }
      }, 50),
    );
  };

  // TODO: add proper loading and error states
  if (!version || !story) {
    return <Loading />;
  }

  return (
    <View style={styles.root}>
      <PhraseWriteList
        title={story.title}
        handleSetPhraseNumber={handleSetPhraseNumber}
        handleUserInput={handleUserInput}
        userInputValues={userInputValues}
        version={version}
        currentPhraseNumber={phraseNumber}
        isPlaying={isPlaying}
        isChecked={isChecked}
        handleCheck={handleCheck}
      />

      <BottomPlayer
        position={phraseNumber}
        handleSetPhraseNumber={handleSetPhraseNumber}
        handleKeyboardInput={handleKeyboardInput}
        maxPosition={maxPosition}
        size={isChecked ? "big" : "small"}
        keyboardIsOpen={!isChecked}
        isPlaying={isPlaying}
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