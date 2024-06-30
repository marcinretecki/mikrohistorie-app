import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { Text } from "../../styles/typography";

import { theme } from "@/styles/theme";

interface KeyProps {
  letter: string;
  variant?: "default" | "uppercase" | "spacebar";
  onPress: (letter: string) => void;
}
export const Key = ({ letter, variant = "default", onPress }: KeyProps) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const isSpacebar = variant === "spacebar";
  const isUppercase = variant === "uppercase";

  const handlePress = () => {
    onPress(letter);
    console.log("pressed: ", letter, variant);
  };

  return (
    <Pressable
      onPress={() => handlePress()}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        styles.keyWrapper,
        isPressed && styles.keyWrapperStatePressed,
        isSpacebar && styles.keyWrapperSpacebar,
      ].filter(Boolean)}
    >
      <View
        style={[
          styles.keyContent,
          isUppercase && styles.keyContentUppercase,
          isSpacebar && styles.keyContentSpacebar,
        ].filter(Boolean)}
      >
        <Text
          style={styles.keyText}
          type={
            isUppercase ? "Lora21Reg" : isSpacebar ? "Lora16Reg" : "Lora24Reg"
          }
        >
          {isSpacebar ? "mellomrom" : letter}
        </Text>
      </View>
    </Pressable>
  );
};

export const KeyPlaceholder = () => {
  return <View style={styles.KeyPlaceholder} />;
};

const styles = StyleSheet.create({
  KeyPlaceholder: { width: 32, height: 42, minWidth: 0, minHeight: 0 },
  keyWrapper: {
    flex: 1,
    width: 32,
    height: 42,
    minWidth: 0,
    minHeight: 0,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.bgBlue,
  },
  keyWrapperStatePressed: {
    backgroundColor: theme.colors.bgBluePressed,
  },
  keyWrapperSpacebar: {
    flex: 5,
  },

  keyContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: -4 }],
  },
  keyContentUppercase: {
    transform: [{ translateY: -2 }],
  },

  keyContentSpacebar: {
    transform: [{ translateY: -2 }],
  },

  keyText: {
    textAlign: "center",
    verticalAlign: "middle",
  },
});
