import backwardPNG from "@assets/skipBackward.png";
import forwardPNG from "@assets/skipForward.png";
import { Pressable, View, StyleSheet, Image } from "react-native";

interface SkipButtonProps {
  onPress: () => void;
  direction: "forward" | "backward";
}

export const SkipButton = ({ onPress, direction }: SkipButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.root}>
        <Image
          style={styles.image}
          source={direction === "forward" ? forwardPNG : backwardPNG}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 36,
    height: 36,
  },
});
