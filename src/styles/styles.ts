import { StyleSheet } from "react-native";

import { theme } from "./theme";

// TODO: this is example code, replace it with your own.
export const globalStyles = StyleSheet.create({
  primaryColor: {
    color: "#5C6BC0",
  },
  // More styles...
});

export const toastStyles = StyleSheet.create({
  pressable: { borderRadius: 0, backgroundColor: theme.colors.bgBlue },
  view: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    position: "relative",
  },
  text: {
    color: theme.colors.text,
    fontFamily: "Lora_400Regular",
    fontSize: 14,
    lineHeight: 20,
  },
  indicator: {},
  indicatorError: {
    height: 2,
    width: "auto",
    backgroundColor: theme.colors.pink,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    borderRadius: 0,
    marginRight: 0,
  },
  indicatorSuccess: {
    height: 2,
    width: "auto",
    backgroundColor: theme.colors.green,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    borderRadius: 0,
    marginRight: 0,
  },
});
