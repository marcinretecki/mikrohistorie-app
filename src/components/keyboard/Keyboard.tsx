import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, LayoutAnimation } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LowercaseLayout, NumericLayout, UppercaseLayout } from "./Layouts";

interface KeyboardProps {
  onKeyboardInput: (text?: string) => void;
  onNext: () => void;
  isOpen: boolean;
  enterIsActive: boolean;
}
export const Keyboard = ({
  onKeyboardInput,
  onNext,
  isOpen,
  enterIsActive = true,
}: KeyboardProps) => {
  const [visible, setVisible] = useState(isOpen);
  const [keyboardLayout, setKeyboardLayout] = useState<
    "lowercase" | "uppercase" | "numeric"
  >("lowercase");

  useEffect(() => {
    // Animate layout changes when isOpen changes
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setVisible(isOpen);
  }, [isOpen]);

  const handlePress = useCallback((letter?: string) => {
    onKeyboardInput(letter);
  }, []);

  const handleNext = useCallback(() => {
    onNext();
  }, []);

  if (!visible) return null;

  return (
    <SafeAreaView edges={["bottom"]} style={styles.keyboardWrapper}>
      {keyboardLayout === "lowercase" && (
        <LowercaseLayout
          setKeyboardLayout={setKeyboardLayout}
          onPress={handlePress}
          onPressNext={handleNext}
          enterIsActive={enterIsActive}
        />
      )}
      {keyboardLayout === "uppercase" && (
        <UppercaseLayout
          setKeyboardLayout={setKeyboardLayout}
          onPress={handlePress}
          onPressNext={handleNext}
          enterIsActive={enterIsActive}
        />
      )}
      {keyboardLayout === "numeric" && (
        <NumericLayout
          setKeyboardLayout={setKeyboardLayout}
          onPress={handlePress}
          onPressNext={handleNext}
          enterIsActive={enterIsActive}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardWrapper: {
    width: "100%",
    paddingTop: 8,
    paddingBottom: 0,
    paddingHorizontal: 2,
  },
});
