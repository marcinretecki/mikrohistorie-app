import React from "react";
import { View, StyleSheet, Pressable, ActivityIndicator } from "react-native";

import { BoxShadow } from "../shadow/BoxShadow";

import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";

export interface ButtonProps {
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
  children: React.ReactNode;
}

export function ButtonPrimary({
  onPress,
  disabled,
  children,
  loading,
}: ButtonProps) {
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <BoxShadow shadow={isPressed ? "viewShadowTealMedium" : "viewShadowTeal"}>
      <Pressable
        onPress={() => onPress()}
        disabled={disabled || loading}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={[
          styles.root,
          disabled && styles.rootStateInactive,
          isPressed && styles.rootStatePressed,
        ].filter(Boolean)}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.colors.bg} />
        ) : (
          <Text type="BSText24Bold" color={theme.colors.bg}>
            {children}
          </Text>
        )}
      </Pressable>
    </BoxShadow>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    width: "100%",
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
