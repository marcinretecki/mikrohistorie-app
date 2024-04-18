import React, { useCallback, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import { Keyboard } from "../keyboard/Keyboard";
import { FragmentWrite } from "../lists/PhraseWriteList";

interface UserInputValues {
  [index: number]: string;
}

export const Kitchensink = () => {
  const [userInputValues, setUserInputValues] = useState<UserInputValues>({});

  const handleUserInput = useCallback((index: number, text: string) => {
    setUserInputValues((prev) => ({ ...prev, [index]: text }));
  }, []);

  const index = 1;

  const handleKeyboardInput = (letter: string) => {
    setUserInputValues((prev) => {
      const currentText = prev[index] || "";

      let newText = "";
      if (letter === "") {
        newText = currentText.slice(0, -1); // handle backspace
      } else {
        newText = currentText + letter; // handle normal input
      }

      return {
        ...prev,
        [index]: newText,
      };
    });
  };

  return (
    <View style={styles.root}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <FragmentWrite
            key={index}
            isCurrent
            isPlaying={false}
            isNotDone
            pressHandler={() => {}}
            value={userInputValues[index] || ""}
            index={index}
            nextHandler={() => {}}
            userInputHandler={() => {}}
          />
        </View>

        <Keyboard handleKeyboardInput={handleKeyboardInput} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 16,
  },
  scrollView: {
    flex: 1,
    paddingVertical: 64,
    gap: 16,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
});
