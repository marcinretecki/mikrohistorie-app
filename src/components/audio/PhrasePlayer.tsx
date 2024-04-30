import { useState } from "react";
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
  const { story, version } = useStory();
  const { sound, isLoading, error } = useAudio({ uri: version?.audio_uri });
  const [isPlaying, setIsPlaying] = useState(false);

  let playbackPositionCheckInterval: NodeJS.Timeout | null = null;

  // Phrase base index 1
  const [phraseNumber, setPhraseNumber] = useState(1);
  const maxPosition = version?.phrases.length || 0;

  const [handleSetPhraseNumber] = throttle((newPosition: number) => {
    setPhraseNumber(newPosition);
    playPhrase();
  }, 300);

  // play the phrase for 1 second
  const playPhrase = async () => {
    if (!sound || !version) return;

    const timeStart = version.phrases[phraseNumber - 1].timeStart;
    const timeEnd = version.phrases[phraseNumber - 1].timeEnd;

    if (isPlaying) {
      setIsPlaying(false);
      await sound.pauseAsync();
    }

    await sound.setPositionAsync(timeStart);
    await sound.playAsync();
    setIsPlaying(true);

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
        if (playbackPositionCheckInterval) {
          clearInterval(playbackPositionCheckInterval);
          playbackPositionCheckInterval = null;
        }
      }
    }, 50);
  };

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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: theme.colors.bg,
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
