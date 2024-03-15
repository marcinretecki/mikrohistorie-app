import pausePNG from "@assets/pause_circle.png";
import playPNG from "@assets/play_circle.png";
import { Pressable, View, StyleSheet, Image } from "react-native";

export const PlayPauseButton = ({ onPress, isPlaying }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.root}>
        <Image style={styles.image} source={isPlaying ? pausePNG : playPNG} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
});
