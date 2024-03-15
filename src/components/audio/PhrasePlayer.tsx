import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { BottomPlayer } from "@/components/audio/BottomPlayer";
import { BackButton } from "@/components/header/BackButton";
import { Reader } from "@/components/indicators/Reader";
import { PhraseList } from "@/components/lists/PhraseList";
import { useStory } from "@/hooks/useStory";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";
import { throttle } from "@/utilities/throttle";

export const PhrasePlayer = () => {
  const { story, version } = useStory();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  let playbackPositionCheckInterval: NodeJS.Timeout | null = null;

  // Phrase base index 1
  const [phraseNumber, setPhraseNumber] = useState(1);
  const maxPosition = version.text.phrases.length;
  const uri = version.audioURI;

  useEffect(() => {
    const loadAudio = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { sound: newSound, status } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: false }
        );

        if (status.isLoaded) {
          setSound(newSound);
          setIsLoading(false);
        }
      } catch (e) {
        setError("Could not load audio");
        setIsLoading(false);
      }
    };

    loadAudio();

    return () => {
      sound?.unloadAsync();
    };
  }, [uri]);

  const [handleSetPhraseNumber] = throttle((newPosition: number) => {
    setPhraseNumber(newPosition);
    playPhrase();
  }, 300);

  // play the phrase for 1 second
  const playPhrase = async () => {
    const timeStart = version.text.phrases[phraseNumber - 1].timeStart;
    const timeEnd = version.text.phrases[phraseNumber - 1].timeEnd;

    if (!sound) return;

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
