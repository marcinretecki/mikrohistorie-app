import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { Text } from "@/styles/typography";
import { theme } from "@/styles/theme";
import { BoxShadow } from "../shadow/BoxShadow";

export interface ButtonProps {
  disabled?: boolean;
  onPress: () => void;
  children: React.ReactNode;
}

export function ButtonPrimary({ onPress, disabled, children }: ButtonProps) {
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <BoxShadow shadow={isPressed ? "viewShadowTealMedium" : "viewShadowTeal"}>
      <Pressable
        onPress={() => onPress()}
        disabled={disabled}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        <View
          style={[
            styles.root,
            disabled && styles.rootStateInactive,
            isPressed && styles.rootStatePressed,
          ]}
        >
          <Text type="BSText24Bold" color={theme.colors.bg}>
            {children}
          </Text>
        </View>
      </Pressable>
    </BoxShadow>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    flex: 1,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: theme.colors.teal,
  },
  rootStatePressed: {
    backgroundColor: theme.colors.tealPressed,
  },
  rootStateInactive: {
    opacity: 0.25,
  },
});
