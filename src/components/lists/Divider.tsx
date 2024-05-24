import { View, StyleSheet } from "react-native";

import { theme } from "@/styles/theme";

interface DividerProps {
  color?: string;
}
export const Divider = ({ color = theme.colors.bg3 }: DividerProps) => (
  <View style={[styles.divider, { backgroundColor: color }]} />
);

const styles = StyleSheet.create({
  divider: {
    // height: StyleSheet.hairlineWidth,
    height: 1,
    alignSelf: "stretch",
  },
});
