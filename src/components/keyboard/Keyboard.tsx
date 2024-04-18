import React from "react";
import { View, StyleSheet } from "react-native";

import { LowercaseLayout, NumericLayout, UppercaseLayout } from "./Layouts";

interface KeyboardProps {
  handleKeyboardInput: (text: string) => void;
}
export const Keyboard = ({ handleKeyboardInput }: KeyboardProps) => {
  const [keyboardLayout, setKeyboardLayout] = React.useState<
    "lowercase" | "uppercase" | "numeric"
  >("lowercase");

  const handlePress = (letter: string) => {
    handleKeyboardInput(letter);
  };

  return (
    <View style={styles.keyboardWrapper}>
      {keyboardLayout === "lowercase" && (
        <LowercaseLayout
          setKeyboardLayout={setKeyboardLayout}
          onPress={handlePress}
        />
      )}
      {keyboardLayout === "uppercase" && (
        <UppercaseLayout
          setKeyboardLayout={setKeyboardLayout}
          onPress={handlePress}
        />
      )}
      {keyboardLayout === "numeric" && (
        <NumericLayout
          setKeyboardLayout={setKeyboardLayout}
          onPress={handlePress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardWrapper: {
    width: "100%",
    height: 292,
    paddingTop: 6,
    paddingBottom: 78,
    paddingHorizontal: 2,
  },
});
