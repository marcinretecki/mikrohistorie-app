import React from "react";
import { View, StyleSheet } from "react-native";

import { theme } from "@/styles/theme";
import { Progress, StoryVersion } from "@/types/types";

export interface StepsProps {
  versions: StoryVersion[];
  versionsProgress: Progress[];
}

export function Steps({ versionsProgress, versions }: StepsProps) {
  const styles = stylesheet;

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        {versions.map((version, index) => {
          const progress = versionsProgress.find(
            (progress) => progress.version_id === version.version_id,
          );

          const step1 = progress?.repeat || progress?.write;
          const step2 = progress?.repeat && progress?.write;

          return (
            <View
              key={index}
              style={[
                styles.circle,
                step1 && styles.circleStep1,
                step2 && styles.circleStep2,
              ].filter(Boolean)}
            />
          );
        })}
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
  circleStep1: {
    backgroundColor: theme.colors.teal,
    opacity: 0.33,
  },
  circleStep2: {
    backgroundColor: theme.colors.teal,
    opacity: 1,
  },
});
