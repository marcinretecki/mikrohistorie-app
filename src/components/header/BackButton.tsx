import BackPNG from "@assets/back.png";
import { useNavigation } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";

export const BackButton = () => {
  const navigation = useNavigation();

  if (navigation.canGoBack()) {
    return (
      <Pressable onPress={() => navigation.goBack()}>
        <Image style={styles.image} source={BackPNG} />
      </Pressable>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
  },
});
