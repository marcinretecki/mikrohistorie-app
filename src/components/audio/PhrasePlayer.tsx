import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Loading } from "@/app/loading/Loading";
import { BottomPlayer } from "@/components/audio/BottomPlayer";
import { BackButton } from "@/components/header/BackButton";
import { Reader } from "@/components/indicators/Reader";
import { PhraseList } from "@/components/lists/PhraseList";
import { useAudio } from "@/hooks/useAudio";
import { useStory } from "@/hooks/useStory";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";
import { throttle } from "@/utilities/throttle";

// TODO: add debounce to handleSetPhraseNumber
export const PhrasePlayer = () => {
  const { story, version, audio } = useStory();
  const { sound, isLoading, error } = useAudio({ uri: audio?.breaked });
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingPhrase, setPlayingPhrase] = useState(0);

  let playbackPositionCheckInterval: NodeJS.Timeout | null = null;

  // Phrase base index 1
  const [phraseNumber, setPhraseNumber] = useState(1);
  const [playedPhrases, setPlayedPhrases] = useState(new Set<number>());
  const maxPosition = version?.phrases.length ?? 0;

  const handleSetPhraseNumber = useCallback(
    (newPosition: number) => {
      console.log("handleSetPhraseNumber", newPosition);
      if (newPosition < 1 || newPosition > maxPosition) return;
      setPhraseNumber(newPosition);
      playPhrase(newPosition);
    },
    [maxPosition],
  );

  // play the phrase
  const playPhrase = async (newPosition: number) => {
    if (!sound || !version) {
      console.log("Sound or version is not ready");
      return;
    }

    // Do not interrupt the current phrase if it's already playing
    if (playingPhrase === newPosition) {
      console.log("Phrase is already playing");
      console.log("Playing phrase", playingPhrase, "New position", newPosition);
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
      playbackPositionCheckInterval = null;
    }

    // Check the playback position every 100 ms
    playbackPositionCheckInterval = setInterval(async () => {
      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.positionMillis >= timeEnd) {
        await sound.pauseAsync();
        setIsPlaying(false);
        setPlayingPhrase(0);
        setPlayedPhrases((prev) => new Set(prev.add(newPosition)));

        if (playbackPositionCheckInterval) {
          clearInterval(playbackPositionCheckInterval);
          playbackPositionCheckInterval = null;
        }

        console.log("Played phrases", playedPhrases);

        if (playedPhrases.size === version.phrases.length) {
          console.log("All phrases have been played!");
        }
      }
    }, 50);
  };

  // TODO: add proper loading and error states
  if (!story || !version) {
    return <Loading />;
  }

  return (
    <View style={styles.scrollView}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.root}>
          <View style={styles.backWrapper}>
            <BackButton />
          </View>
          <View style={styles.titleWrapper}>
            <Text type="Lora32SemiBold">{story.title}</Text>
            <Reader version={version} />
          </View>
          <View style={styles.contentWrapper}>
            <PhraseList
              handleSetPhraseNumber={handleSetPhraseNumber}
              version={version}
              currentPhraseNumber={phraseNumber}
              isPlaying={isPlaying}
            />
          </View>
        </View>
      </ScrollView>
      <BottomPlayer
        position={phraseNumber}
        handleSetPhraseNumber={handleSetPhraseNumber}
        maxPosition={maxPosition}
        isPlaying={isPlaying}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: theme.colors.bg3,
    flex: 1,
  },
  backWrapper: {
    position: "absolute",
    top: 48,
    left: 16,
  },
  root: {
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
  contentWrapper: {
    paddingHorizontal: 16,
  },
});
