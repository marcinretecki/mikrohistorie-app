import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";

interface TranslationButtonProps {
  onPress: () => void;
  active: boolean;
  children: React.ReactNode;
}
export const TranslationButton = ({
  onPress,
  active,
  children,
}: TranslationButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.root, active && styles.active].filter(Boolean)}>
        <Text type="Lora12Reg" color={theme.colors.text}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.bgBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: theme.colors.bgBluePressed,
  },
});
