import React from "react";
import { View, StyleSheet } from "react-native";

import { Text } from "@/styles/typography";
import { theme } from "@/styles/theme";

export interface ButtonProps {
  label: string;
  state: "Default" | "Inactive" | "Pressed";
}

export function ButtonPrimary(props: ButtonProps) {
  return (
    <View style={stylesheet.root}>
      <View style={stylesheet.frame2}>
        <Text type="BSText24Bold">{props.label}</Text>
      </View>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  root: {
    flexDirection: "row",
    width: 5012,
    height: 672,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: theme.colors.teal,
    shadowColor: "rgba(0, 84, 111, 0.4000000059604645)",
    shadowRadius: 0,
    shadowOffset: null,
  },
  rootStatePressed: {
    backgroundColor: theme.colors.teal,
  },
  rootStateInactive: {
    opacity: 0.25,
  },
  frame2: {
    flexDirection: "row",
    paddingTop: 0,
    paddingLeft: 224,
    paddingRight: 224,
    paddingBottom: 0,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 112,
    columnGap: 112,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    alignSelf: "stretch",
  },
});
