import fragmentPlayArrowActiveIMG from "@assets/fragment_play_arrow=Active.png";
import fragmentPlayArrowIMG from "@assets/fragment_play_arrow=Default.png";
import fragmentRotationIMG from "@assets/fragment_play_arrow=Rotation.png";
import { useEffect, useRef } from "react";
import { Animated, Image, View, StyleSheet, Easing } from "react-native";

interface PhrasePlayButtonProps {
  isPlaying: boolean;
  isActive: boolean;
}
export const PhrasePlayButton = ({
  isPlaying,
  isActive,
}: PhrasePlayButtonProps) => {
  return (
    <View style={styles.root}>
      {isPlaying && <RotationView />}
      {isPlaying ? (
        <Image
          style={[styles.playIcon, !isActive && styles.playIconInactive].filter(
            Boolean,
          )}
          source={fragmentPlayArrowActiveIMG}
        />
      ) : (
        <Image
          style={[styles.playIcon, !isActive && styles.playIconInactive].filter(
            Boolean,
          )}
          source={fragmentPlayArrowIMG}
        />
      )}
    </View>
  );
};

const RotationView = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={{ transform: [{ rotate: spin }, { perspective: 1000 }] }}
    >
      <Image style={styles.rotation} source={fragmentRotationIMG} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 48,
    height: 48,
    position: "relative",
  },
  playIcon: {
    width: 48,
    height: 48,
    position: "absolute",
    top: 0,
    left: 0,
  },
  playIconInactive: {
    opacity: 0.5,
  },
  rotation: {
    width: 48,
    height: 48,
  },
});
