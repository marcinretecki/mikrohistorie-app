import { Trans } from "@lingui/macro";
import { useCallback, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { ButtonPrimary } from "../buttons/ButtonPrimary";

import { BottomPlayer } from "@/components/audio/BottomPlayer";
import { BackButton } from "@/components/header/BackButton";
import { Reader } from "@/components/indicators/Reader";
import { PhraseWriteList } from "@/components/lists/PhraseWriteList";
import { useAudio } from "@/hooks/useAudio";
import { useStory } from "@/hooks/useStory";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";

interface UserInputValues {
  [index: number]: string;
}

export const PhraseWriter = () => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const { story, version } = useStory();
  const { sound, isLoading, error } = useAudio({ uri: version.audioURI });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [playingPhrase, setPlayingPhrase] = useState(0);
  const [userInputValues, setUserInputValues] = useState<UserInputValues>({});

  let playbackPositionCheckInterval: NodeJS.Timeout | null = null;

  // Phrase base index 1
  const [phraseNumber, setPhraseNumber] = useState(1);
  const maxPosition = version.text.phrases.length;

  const handleSetPhraseNumber = (newPosition: number) => {
    if (newPosition < 1 || newPosition > maxPosition) return;
    setPhraseNumber(newPosition);
    playPhrase(newPosition);
  };

  const handleCheck = () => {
    console.log("handleCheck");
    setIsChecked(true);
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  const handleUserInput = useCallback((index: number, text: string) => {
    setUserInputValues((prev) => ({ ...prev, [index]: text }));
  }, []);

  // play the phrase for 1 second
  const playPhrase = async (newPosition: number) => {
    if (!sound) return;

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

    const timeStart = version.text.phrases[newPosition - 1].timeStart;
    const timeEnd = version.text.phrases[newPosition - 1].timeEnd;
    await sound.setPositionAsync(timeStart);
    await sound.playAsync();
    setIsPlaying(true);
    setPlayingPhrase(newPosition);

    // Clear any existing interval to avoid multiple intervals running
    if (playbackPositionCheckInterval) {
      clearInterval(playbackPositionCheckInterval);
      playbackPositionCheckInterval = null;
    }

    playbackPositionCheckInterval = setInterval(async () => {
      const status = await sound.getStatusAsync();

      if (status.isLoaded && status.positionMillis >= timeEnd) {
        await sound.pauseAsync();
        setIsPlaying(false);
        setPlayingPhrase(0);

        if (playbackPositionCheckInterval) {
          clearInterval(playbackPositionCheckInterval);
          playbackPositionCheckInterval = null;
        }
      }
    }, 50);
  };

  return (
    <View style={styles.scrollView}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <View style={styles.root}>
          <View style={styles.backWrapper}>
            <BackButton />
          </View>
          <View style={styles.titleWrapper}>
            <Text type="Lora32SemiBold">{story.title}</Text>
            <Reader version={version} />
          </View>
          <View style={styles.contentWrapper}>
            <PhraseWriteList
              handleSetPhraseNumber={handleSetPhraseNumber}
              handleUserInput={handleUserInput}
              userInputValues={userInputValues}
              version={version}
              currentPhraseNumber={phraseNumber}
              isPlaying={isPlaying}
              isChecked={isChecked}
            />
          </View>
          <View style={styles.contentWrapper}>
            <ButtonPrimary
              onPress={() => {
                handleCheck();
              }}
            >
              <Trans>Check</Trans>
            </ButtonPrimary>
          </View>
        </View>
      </ScrollView>
      <BottomPlayer
        position={phraseNumber}
        handleSetPhraseNumber={handleSetPhraseNumber}
        maxPosition={maxPosition}
        size={isChecked ? "big" : "small"}
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
