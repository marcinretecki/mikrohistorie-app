import CaretPNG from "@assets/caret-right.png";
import React from "react";
import { View, StyleSheet, Image } from "react-native";

export function Caret() {
  const styles = stylesheet;

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={CaretPNG} />
    </View>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
  },
});
