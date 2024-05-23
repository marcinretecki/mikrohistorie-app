import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";

interface TranslationButtonProps {
  onPress: (language: string) => void;
  children: React.ReactNode;
}
export const TranslationButton = ({
  onPress,
  children,
}: TranslationButtonProps) => {
  return (
    <Pressable onPress={() => onPress}>
      <View style={styles.root}>
        <Text type="Lora12Reg" color={theme.colors.text}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: theme.colors.bgBlue,
  },
});
