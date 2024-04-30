import React, { useCallback, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import { ButtonPrimary } from "../buttons/ButtonPrimary";
import { Steps } from "../indicators/Steps";
import { Keyboard } from "../keyboard/Keyboard";
import { FragmentWrite } from "../lists/PhraseWriteList";

import { Progress } from "@/types/types";

interface UserInputValues {
  [index: number]: string;
}

export const Kitchensink = () => {
  const [userInputValues, setUserInputValues] = useState<UserInputValues>({});
  const [index, setIndex] = useState(1);

  const handleUserInput = useCallback((index: number, text: string) => {
    setUserInputValues((prev) => ({ ...prev, [index]: text }));
  }, []);

  const handleNext = () => {
    setIndex((prev) => prev + 1);
  };

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

  const versionsProgress: Progress[] = [
    {
      user_id: "1",
      created_at: "1",
      listen: true,
      progress_id: "1",
      repeat: true,
      write: false,
      version_id: "1",
      updated_at: null,
    },
    {
      user_id: "1",
      created_at: "1",
      listen: true,
      progress_id: "2",
      repeat: true,
      write: true,
      version_id: "2",
      updated_at: null,
    },
    {
      user_id: "1",
      created_at: "1",
      listen: true,
      progress_id: "3",
      repeat: false,
      write: true,
      version_id: "3",
      updated_at: null,
    },
    {
      user_id: "1",
      created_at: "1",
      listen: true,
      progress_id: "3",
      repeat: false,
      write: false,
      version_id: "3",
      updated_at: null,
    },
  ];

  return (
    <View style={styles.root}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Steps versionsProgress={versionsProgress} />
        </View>
        <View style={styles.content}>
          <FragmentWrite
            key={1}
            isCurrent={index === 1}
            isPlaying={false}
            isNotDone
            onPress={() => setIndex(1)}
            value={userInputValues[1] || ""}
            index={1}
            onNext={handleNext}
          />
          <FragmentWrite
            key={2}
            isCurrent={index === 2}
            isPlaying={false}
            isNotDone
            onPress={() => setIndex(2)}
            value={userInputValues[2] || ""}
            index={2}
            onNext={handleNext}
          />
        </View>

        {/* <Keyboard onKeyboardInput={handleKeyboardInput} onNext={handleNext} /> */}
        <View style={styles.content}>
          <ButtonPrimary onPress={() => {}}>Test button</ButtonPrimary>
        </View>
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
    gap: 16,
  },
});
