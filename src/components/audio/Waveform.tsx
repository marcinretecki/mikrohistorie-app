import { theme } from "@/styles/theme";
import React, { useMemo, useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

const WaveformBar = ({ height, style }) => (
  <View style={[styles.bar, { height: `${height * 100}%` }, style]} />
);

const StaticWaveform = ({ bars }) => {
  return (
    <View style={styles.waveformContainer}>
      {bars.map((height, index) => (
        <WaveformBar key={index} height={height} style={{}} />
      ))}
    </View>
  );
};

const PlaybackWaveform = ({ progress, bars }) => {
  // Use absolute positioning to overlay the playback bars on top of the static bars
  return (
    <View
      style={[
        styles.waveformContainer,
        styles.playbackContainer,
        { width: `${progress * 100}%` },
      ]}
    >
      {bars.map((height, index) => (
        <View
          key={index}
          style={[styles.bar, styles.playedBar, { height: `${height * 100}%` }]}
        />
      ))}
    </View>
  );
};

export const Waveform = ({ progress, onSeek, onLayout }) => {
  const [waveformWidth, setWaveformWidth] = useState(0);

  const handleTouch = (evt) => {
    const { locationX } = evt.nativeEvent;
    onSeek(locationX);
  };

  const bars = useMemo(() => {
    const numberOfBars = Math.max(Math.floor(waveformWidth / 2), 2);
    const gradualBars = 4;

    return Array.from({ length: numberOfBars }, (_, index) => {
      if (index < gradualBars) {
        // Gradually increasing height for the first few bars
        return 0 + (index / gradualBars) * 0.7;
      } else if (index >= numberOfBars - gradualBars) {
        // Gradually decreasing height for the last few bars
        return 0.7 - (gradualBars / (numberOfBars - index - 1)) * 0.3;
      } else {
        // Random height for the middle bars
        return 0.7 + Math.random() * 0.3;
      }
    });
  }, [waveformWidth]);

  const handleLayout = (evt) => {
    const { width } = evt.nativeEvent.layout;
    onLayout(width); // Call the callback function with the measured width
    setWaveformWidth(width);
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouch}>
      <View style={styles.waveWrapper} onLayout={handleLayout}>
        <StaticWaveform bars={bars} />
        <PlaybackWaveform progress={progress} bars={bars} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  waveWrapper: {
    flex: 1,
    height: 64,
  },
  waveformContainer: {
    flexDirection: "row",
    flex: 1,
    height: "100%",
    alignItems: "flex-end",
    gap: 1,
  },
  playbackContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    overflow: "hidden", // This is crucial for the masking effect
  },
  bar: {
    width: 1, // Set the width of each bar
    backgroundColor: theme.colors.text60,
    pointerEvents: "none",
  },
  playedBar: {
    backgroundColor: theme.colors.teal,
  },
});
