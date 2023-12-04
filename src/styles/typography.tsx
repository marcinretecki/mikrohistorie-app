import React, { PropsWithChildren } from "react";
import { Text as ReactText, StyleSheet } from "react-native";
import { theme } from "./theme";

export interface TypographyProps extends PropsWithChildren {
  color?: string;
  type?:
    | "BSInlineDisplay76Bold"
    | "BSInlineDisplay48Bold"
    | "BSText32Bold"
    | "BSInlineText24Bold"
    | "BSText24Bold"
    | "BSText20Bold"
    | "Lora14Reg"
    | "Lora32SemiBold"
    | "Lora20SemiBold"
    | "Lora16SemiBold"
    | "RobotoMono10Medium";
}

export const Text = ({
  type = "Lora14Reg",
  color,
  children,
}: TypographyProps) => {
  const textStyle = {
    ...styles[type],
    ...(color && { color }), // Apply color only if provided
  };

  return <ReactText style={textStyle}>{children}</ReactText>;
};

const styles = StyleSheet.create({
  BSInlineDisplay76Bold: {
    color: theme.colors.teal,
    fontFamily: "BigShouldersInlineDisplay_700Bold",
    fontSize: 76,

    ...theme.shadows.textShadowTealBig,
  },
  BSInlineDisplay48Bold: {
    color: theme.colors.teal,
    fontFamily: "BigShouldersInlineDisplay_700Bold",
    fontSize: 48,

    ...theme.shadows.textShadowTealMedium,
  },
  BSText32Bold: {
    color: theme.colors.text,
    fontFamily: "BigShouldersText_700Bold",
    fontSize: 32,
  },
  BSInlineText24Bold: {
    color: theme.colors.teal,
    fontFamily: "BigShouldersInlineText_700Bold",
    fontSize: 24,

    ...theme.shadows.textShadowTealMedium,
  },
  BSText24Bold: {
    color: theme.colors.text,
    fontFamily: "BigShouldersText_700Bold",
    fontSize: 24,
  },
  BSText20Bold: {
    color: theme.colors.text,
    fontFamily: "BigShouldersText_700Bold",
    fontSize: 20,
  },
  Lora14Reg: {
    color: theme.colors.text,
    fontFamily: "Lora_400Regular",
    fontSize: 12,
  },
  Lora32SemiBold: {
    color: theme.colors.text,
    fontFamily: "Lora_600SemiBold",
    fontSize: 32,
  },
  Lora20SemiBold: {
    color: theme.colors.text,
    fontFamily: "Lora_600SemiBold",
    fontSize: 20,
  },
  Lora16SemiBold: {
    color: theme.colors.text,
    fontFamily: "Lora_600SemiBold",
    fontSize: 16,
  },
  Lora12Reg: {
    color: theme.colors.text80,
    fontFamily: "Lora_400Regular",
    fontSize: 12,
  },
  RobotoMono10Medium: {
    color: theme.colors.text60,
    fontFamily: "RobotoMono_500Medium",
    fontSize: 10,
  },
});
