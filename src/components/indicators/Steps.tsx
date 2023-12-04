import { theme } from "@/styles/theme";
import React from "react";
import { View, StyleSheet } from "react-native";

export interface StepsProps {
  step: 1 | 2 | 3 | 0;
  testID?: string;
}

export function Steps(props: StepsProps) {
  const styles = stylesheet;

  return (
    <View style={styles.root} testID={props.testID}>
      <View style={styles.row} testID="30:1659">
        {[...Array(3)].map((_, index) => (
          <View
            key={index}
            style={index < props.step ? styles.circleActive : styles.circle}
          />
        ))}
      </View>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    rowGap: 4,
    columnGap: 4,
  },
  row: {
    flexDirection: "row",
    padding: 3,
    alignItems: "center",
    rowGap: 3,
    columnGap: 3,
    borderRadius: 8,
    backgroundColor: theme.colors.bgBlue,
  },
  circle: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: theme.colors.black60,
  },
  circleActive: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: theme.colors.teal,
  },
});
