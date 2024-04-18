import React from "react";
import { View, StyleSheet } from "react-native";

import { Key, KeyPlaceholder } from "./Key";
import { ModifierKey } from "./ModifierKey";

interface KeyboardLayoutProps {
  setKeyboardLayout: (layout: "lowercase" | "uppercase" | "numeric") => void;
  onPress: (text: string) => void;
}

export const LowercaseLayout = ({
  setKeyboardLayout,
  onPress,
}: KeyboardLayoutProps) => {
  return (
    <View style={styles.rowWrapper}>
      <View style={styles.row}>
        <Key letter="q" onPress={onPress} />
        <Key letter="w" onPress={onPress} />
        <Key letter="e" onPress={onPress} />
        <Key letter="r" onPress={onPress} />
        <Key letter="t" onPress={onPress} />
        <Key letter="y" onPress={onPress} />
        <Key letter="u" onPress={onPress} />
        <Key letter="i" onPress={onPress} />
        <Key letter="o" onPress={onPress} />
        <Key letter="p" onPress={onPress} />
        <Key letter="å" onPress={onPress} />
      </View>
      <View style={styles.row}>
        <Key letter="a" onPress={onPress} />
        <Key letter="s" onPress={onPress} />
        <Key letter="d" onPress={onPress} />
        <Key letter="f" onPress={onPress} />
        <Key letter="g" onPress={onPress} />
        <Key letter="h" onPress={onPress} />
        <Key letter="j" onPress={onPress} />
        <Key letter="k" onPress={onPress} />
        <Key letter="l" onPress={onPress} />
        <Key letter="ø" onPress={onPress} />
        <Key letter="æ" onPress={onPress} />
      </View>
      <View style={styles.row}>
        <View style={styles.positionLeft}>
          <ModifierKey
            symbol="shift"
            onPress={() => setKeyboardLayout("uppercase")}
          />
        </View>
        <KeyPlaceholder />
        <KeyPlaceholder />
        <Key letter="z" onPress={onPress} />
        <Key letter="x" onPress={onPress} />
        <Key letter="c" onPress={onPress} />
        <Key letter="v" onPress={onPress} />
        <Key letter="b" onPress={onPress} />
        <Key letter="n" onPress={onPress} />
        <Key letter="m" onPress={onPress} />
        <KeyPlaceholder />
        <KeyPlaceholder />
        <View style={styles.positionRight}>
          <ModifierKey symbol="backspace" onPress={onPress} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.positionLeft}>
          <ModifierKey
            symbol="numbers"
            onPress={() => setKeyboardLayout("numeric")}
          />
        </View>
        <KeyPlaceholder />
        <KeyPlaceholder />
        <Key letter="," variant="uppercase" onPress={onPress} />
        <Key letter=" " variant="spacebar" onPress={onPress} />
        <Key letter="." variant="uppercase" onPress={onPress} />
        <KeyPlaceholder />
        <KeyPlaceholder />
        <View style={styles.positionRight}>
          <ModifierKey symbol="enter" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

export const UppercaseLayout = ({
  setKeyboardLayout,
  onPress,
}: KeyboardLayoutProps) => {
  const handlePress = (letter: string) => {
    onPress(letter);
    setKeyboardLayout("lowercase");
  };
  return (
    <View style={styles.rowWrapper}>
      <View style={styles.row}>
        <Key letter="Q" variant="uppercase" onPress={handlePress} />
        <Key letter="W" variant="uppercase" onPress={handlePress} />
        <Key letter="E" variant="uppercase" onPress={handlePress} />
        <Key letter="R" variant="uppercase" onPress={handlePress} />
        <Key letter="T" variant="uppercase" onPress={handlePress} />
        <Key letter="Y" variant="uppercase" onPress={handlePress} />
        <Key letter="U" variant="uppercase" onPress={handlePress} />
        <Key letter="I" variant="uppercase" onPress={handlePress} />
        <Key letter="O" variant="uppercase" onPress={handlePress} />
        <Key letter="P" variant="uppercase" onPress={handlePress} />
        <Key letter="Å" variant="uppercase" onPress={handlePress} />
      </View>
      <View style={styles.row}>
        <Key letter="A" variant="uppercase" onPress={handlePress} />
        <Key letter="S" variant="uppercase" onPress={handlePress} />
        <Key letter="D" variant="uppercase" onPress={handlePress} />
        <Key letter="F" variant="uppercase" onPress={handlePress} />
        <Key letter="G" variant="uppercase" onPress={handlePress} />
        <Key letter="H" variant="uppercase" onPress={handlePress} />
        <Key letter="J" variant="uppercase" onPress={handlePress} />
        <Key letter="K" variant="uppercase" onPress={handlePress} />
        <Key letter="L" variant="uppercase" onPress={handlePress} />
        <Key letter="Ø" variant="uppercase" onPress={handlePress} />
        <Key letter="Æ" variant="uppercase" onPress={handlePress} />
      </View>
      <View style={styles.row}>
        <View style={styles.positionLeft}>
          <ModifierKey
            symbol="shiftActive"
            onPress={() => setKeyboardLayout("lowercase")}
          />
        </View>
        <KeyPlaceholder />
        <KeyPlaceholder />
        <Key letter="Z" variant="uppercase" onPress={handlePress} />
        <Key letter="X" variant="uppercase" onPress={handlePress} />
        <Key letter="C" variant="uppercase" onPress={handlePress} />
        <Key letter="V" variant="uppercase" onPress={handlePress} />
        <Key letter="B" variant="uppercase" onPress={handlePress} />
        <Key letter="N" variant="uppercase" onPress={handlePress} />
        <Key letter="M" variant="uppercase" onPress={handlePress} />
        <KeyPlaceholder />
        <KeyPlaceholder />
        <View style={styles.positionRight}>
          <ModifierKey symbol="backspace" onPress={handlePress} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.positionLeft}>
          <ModifierKey
            symbol="numbers"
            onPress={() => setKeyboardLayout("numeric")}
          />
        </View>
        <KeyPlaceholder />
        <KeyPlaceholder />
        <Key letter="," variant="uppercase" onPress={handlePress} />
        <Key letter=" " variant="spacebar" onPress={handlePress} />
        <Key letter="." variant="uppercase" onPress={handlePress} />
        <KeyPlaceholder />
        <KeyPlaceholder />
        <View style={styles.positionRight}>
          <ModifierKey symbol="enter" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

export const NumericLayout = ({
  setKeyboardLayout,
  onPress,
}: KeyboardLayoutProps) => {
  return (
    <View style={styles.rowWrapper}>
      <View style={styles.row}>
        <Key letter="1" variant="uppercase" onPress={onPress} />
        <Key letter="2" variant="uppercase" onPress={onPress} />
        <Key letter="3" variant="uppercase" onPress={onPress} />
        <Key letter="4" variant="uppercase" onPress={onPress} />
        <Key letter="5" variant="uppercase" onPress={onPress} />
        <Key letter="6" variant="uppercase" onPress={onPress} />
        <Key letter="7" variant="uppercase" onPress={onPress} />
        <Key letter="8" variant="uppercase" onPress={onPress} />
        <Key letter="9" variant="uppercase" onPress={onPress} />
        <Key letter="0" variant="uppercase" onPress={onPress} />
      </View>
      <View style={styles.row}>
        <Key letter="-" variant="uppercase" onPress={onPress} />
        <Key letter="/" variant="uppercase" onPress={onPress} />
        <Key letter=":" variant="uppercase" onPress={onPress} />
        <Key letter=";" variant="uppercase" onPress={onPress} />
        <Key letter="(" variant="uppercase" onPress={onPress} />
        <Key letter=")" variant="uppercase" onPress={onPress} />
        <Key letter="=" variant="uppercase" onPress={onPress} />
        <Key letter="+" variant="uppercase" onPress={onPress} />
        <Key letter="*" variant="uppercase" onPress={onPress} />
        <Key letter="@" variant="uppercase" onPress={onPress} />
      </View>
      <View style={styles.row}>
        <View style={styles.positionLeft}>
          <ModifierKey
            symbol="shift"
            onPress={() => setKeyboardLayout("uppercase")}
          />
        </View>
        <KeyPlaceholder />
        <KeyPlaceholder />
        <Key letter="." variant="uppercase" onPress={onPress} />
        <Key letter="," variant="uppercase" onPress={onPress} />
        <Key letter="?" variant="uppercase" onPress={onPress} />
        <Key letter="!" variant="uppercase" onPress={onPress} />
        <Key letter="«" variant="uppercase" onPress={onPress} />
        <Key letter="»" variant="uppercase" onPress={onPress} />
        <KeyPlaceholder />
        <KeyPlaceholder />
        <View style={styles.positionRight}>
          <ModifierKey symbol="backspace" onPress={onPress} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.positionLeft}>
          <ModifierKey
            symbol="numbersActive"
            onPress={() => setKeyboardLayout("lowercase")}
          />
        </View>
        <KeyPlaceholder />
        <KeyPlaceholder />
        <KeyPlaceholder />
        <Key letter=" " variant="spacebar" onPress={onPress} />
        <KeyPlaceholder />
        <KeyPlaceholder />
        <KeyPlaceholder />
        <View style={styles.positionRight}>
          <ModifierKey symbol="enter" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowWrapper: {
    width: "100%",
    gap: 6,
    flexDirection: "column",
    overflow: "hidden",
    flexShrink: 0,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    flexShrink: 0,
  },
  positionLeft: {
    position: "absolute",
    left: 0,
  },
  positionRight: {
    position: "absolute",
    right: 0,
  },
});
