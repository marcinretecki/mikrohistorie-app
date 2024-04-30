import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { Waveform } from "./Waveform";

import { PlayPauseButton } from "@/components/buttons/PlayPauseButton";
import { SkipButton } from "@/components/buttons/SkipButton";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";
import { Story } from "@/types/types";

interface PlayerProps {
  uri: string;
  story: Story;
}

export const Player = ({ uri, story }: PlayerProps) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState<number | null>(null);
  const [position, setPosition] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { height, width } = useWindowDimensions();
  const [waveformWidth, setWaveformWidth] = useState(width); // Default to screenWidth, update with actual width

  const handleWaveformLayout = (width: number) => {
    setWaveformWidth(width);
  };

  useEffect(() => {
    const loadAudio = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { sound: newSound, status } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: false }
        );

        if (status.isLoaded && status.durationMillis) {
          setSound(newSound);
          setDuration(status.durationMillis);
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

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying && sound) {
      interval = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setPosition(status.positionMillis);
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, sound]);

  const playSound = async () => {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const skipForward = async () => {
    const newPosition = Math.min(position + 5000, duration ?? 0); // Skip forward 5 seconds, but not beyond the duration
    await sound?.setPositionAsync(newPosition);
    setPosition(newPosition);
  };

  const skipBackward = async () => {
    const newPosition = Math.max(position - 5000, 0); // Skip backward 5 seconds, but not less than 0
    await sound?.setPositionAsync(newPosition);
    setPosition(newPosition);
  };

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, "0")}`;
  };

  const handleSeek = (locationX: number) => {
    const progress = Math.max(0, Math.min(locationX / waveformWidth, 1));
    const newPosition = progress * (duration ?? 0);
    sound?.setPositionAsync(newPosition);
    setPosition(newPosition);
  };

  const currentProgress = duration ? position / duration : 0;

  return (
    <View style={styles.root}>
      {error ? (
        <View style={styles.centered}>
          <Text>Error: {error}</Text>
        </View>
      ) : (
        <View style={styles.centered}>
          <Text type="Lora32SemiBold">{story.title}</Text>
          <View style={styles.buttonWrapper}>
            {isLoading ? (
              <ActivityIndicator size="small" color={theme.colors.text60} />
            ) : (
              <>
                <SkipButton onPress={skipBackward} direction="backward" />
                <PlayPauseButton
                  onPress={isPlaying ? pauseSound : playSound}
                  isPlaying={isPlaying}
                />
                <SkipButton onPress={skipForward} direction="forward" />
              </>
            )}
          </View>
          <Text type="Lora14Reg">{story.description}</Text>
          <View style={styles.waveWrapper}>
            <Waveform
              progress={currentProgress}
              onSeek={handleSeek}
              onLayout={handleWaveformLayout}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  buttonWrapper: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  waveWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 64,
    paddingHorizontal: 16,
  },
});
