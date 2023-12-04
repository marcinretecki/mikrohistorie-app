import React, { useEffect, useState } from "react";
import { View, Button, useWindowDimensions, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { Text } from "@/styles/typography";
import { theme } from "@/styles/theme";
import { Waveform } from "./Waveform";

export const Player = ({ uri }: { uri: string }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState<number | null>(null);
  const [position, setPosition] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { height, width } = useWindowDimensions();
  const [waveformWidth, setWaveformWidth] = useState(width); // Default to screenWidth, update with actual width

  const handleWaveformLayout = (width) => {
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

        setSound(newSound);
        setDuration(status.durationMillis);
        setIsLoading(false);
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

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, "0")}`;
  };

  const handleSeek = (locationX) => {
    const progress = Math.max(0, Math.min(locationX / waveformWidth, 1));
    const newPosition = progress * (duration ?? 0);
    sound?.setPositionAsync(newPosition);
    setPosition(newPosition);
  };

  const currentProgress = duration ? position / duration : 0;

  return (
    <View style={styles.root}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <View style={styles.centered}>
          <Button
            title={isPlaying ? "Pause" : "Play"}
            onPress={isPlaying ? pauseSound : playSound}
          />
          <Text>
            Time: {formatTime(position)} /{" "}
            {duration ? formatTime(duration) : "--:--"}
          </Text>
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
  },
  waveWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 64,
    paddingHorizontal: 16,
  },
  wave: { flex: 1, backgroundColor: theme.colors.teal },
});
