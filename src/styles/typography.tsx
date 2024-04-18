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
    | "Lora12Reg"
    | "RobotoMono10Medium"
    | "Lora24Reg"
    | "Lora21Reg"
    | "Lora16Reg"
    | "Lora16RegTeal";
  style?: object;
}

export const Text = ({
  type = "Lora14Reg",
  color,
  children,
  style,
}: TypographyProps) => {
  const textStyle = {
    ...styles[type],
    ...(style && style), // Apply style only if provided) ,
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
    fontSize: 14,
    lineHeight: 20,
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
    lineHeight: 12,
  },

  // Keyboard
  Lora24Reg: {
    color: theme.colors.text,
    fontFamily: "Lora_400Regular",
    fontSize: 24,
  },
  Lora21Reg: {
    color: theme.colors.text,
    fontFamily: "Lora_400Regular",
    fontSize: 21,
  },
  Lora16Reg: {
    color: theme.colors.text,
    fontFamily: "Lora_400Regular",
    fontSize: 16,
  },
  Lora16RegTeal: {
    color: theme.colors.teal,
    fontFamily: "Lora_400Regular",
    fontSize: 16,

    ...theme.shadows.textShadowTealMedium,
  },
});
