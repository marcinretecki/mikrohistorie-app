import backspaceIMG from "@assets/backspace.png";
import enterIMG from "@assets/enter.png";
import shiftIMG from "@assets/shift.png";
import shiftActiveIMG from "@assets/shift_active.png";
import React from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";

import { Text } from "../../styles/typography";

import { theme } from "@/styles/theme";

interface ModifierKeyProps {
  symbol:
    | "shift"
    | "shiftActive"
    | "backspace"
    | "enter"
    | "numbers"
    | "numbersActive";
  onPress: (letter: string) => void;
  disabled?: boolean;
}
export const ModifierKey = ({
  symbol,
  onPress,
  disabled = false,
}: ModifierKeyProps) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const isWide =
    symbol === "numbers" || symbol === "enter" || symbol === "numbersActive";
  const isActive = symbol === "numbersActive" || symbol === "shiftActive";
  const isEnter = symbol === "enter";

  const handlePress = () => {
    onPress("");
    console.log("pressed: ", symbol);
  };

  if (symbol === "backspace") {
    return <Backspace onPress={onPress} />;
  }

  console.log("enter disabled: ", disabled);

  return (
    <Pressable
      onPress={() => handlePress()}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <View
        style={[
          styles.keyWrapper,
          isPressed && styles.keyWrapperStatePressed,
          isWide && styles.keyWrapperWide,
          isActive && styles.keyWrapperActive,
          isEnter && styles.keyWrapperEnter,
          disabled && styles.keyWrapperStateDisabled,
        ].filter(Boolean)}
      >
        {symbol === "numbers" && (
          <View style={styles.keyContent}>
            <Text style={styles.keyModifierNumbers} type="Lora16Reg">
              123
            </Text>
          </View>
        )}
        {symbol === "numbersActive" && (
          <View style={styles.keyContent}>
            <Text style={styles.keyModifierNumbers} type="Lora16RegTeal">
              123
            </Text>
          </View>
        )}

        {symbol === "shift" && (
          <View style={styles.symbol}>
            <Image source={shiftIMG} />
          </View>
        )}
        {symbol === "shiftActive" && (
          <View style={styles.symbol}>
            <Image source={shiftActiveIMG} />
          </View>
        )}
        {symbol === "enter" && (
          <View style={styles.symbol}>
            <Image source={enterIMG} />
          </View>
        )}
      </View>
    </Pressable>
  );
};

const Backspace = ({ onPress }: { onPress: (letter: string) => void }) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout | null>(
    null,
  );

  const handlePress = () => {
    onPress("");
    console.log("pressed: ", "backspace");
  };

  const handleLongPress = () => {
    console.log("long pressed: ", "backspace");
    // Start the interval to continuously call handlePress
    const id = setInterval(handlePress, 100);
    setIntervalId(id);
  };

  const handlePressOut = () => {
    setIsPressed(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  return (
    <Pressable
      onPress={() => handlePress()}
      onLongPress={() => handleLongPress()}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => handlePressOut()}
    >
      <View
        style={[
          styles.keyWrapper,
          isPressed && styles.keyWrapperStatePressed,
        ].filter(Boolean)}
      >
        <View style={styles.symbol}>
          <Image source={backspaceIMG} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  keyWrapper: {
    width: 42,
    height: 42,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.bg3,
  },
  keyWrapperStateDisabled: {
    opacity: 0.33,
    backgroundColor: theme.colors.tealPressed,
  },
  keyWrapperStatePressed: {
    backgroundColor: theme.colors.bgBluePressed,
  },
  keyWrapperActive: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.teal,
  },
  keyWrapperWide: {
    width: 64,
  },
  keyWrapperEnter: {
    backgroundColor: theme.colors.teal,
  },

  keyContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: -2 }],
  },
  keyModifierNumbers: {
    textAlign: "center",
    verticalAlign: "middle",
  },

  symbol: {
    alignItems: "center",
    justifyContent: "center",
  },
});
