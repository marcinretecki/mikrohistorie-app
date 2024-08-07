import SchedulePNG from "@assets/schedule.png";
import TextFieldsPNG from "@assets/text-fields.png";
import React from "react";
import { View, StyleSheet, Image } from "react-native";

import { Steps } from "./Steps";

import { Text } from "@/styles/typography";
import { Progress, Story, StoryVersion } from "@/types/types";

interface IndicatorsProps {
  time: number;
  wordCount: number;
  progresses: Progress[];
  versions: StoryVersion[];
}
export function Indicators({
  time,
  wordCount,
  progresses,
  versions,
}: IndicatorsProps) {
  const styles = stylesheet;

  const minutes = Math.floor(time / 60 / 1000);
  const seconds = time % 60;
  const timeString = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return (
    <View style={styles.root}>
      <Steps versions={versions} versionsProgress={progresses} />
      <View style={styles.wrapper}>
        <Image source={SchedulePNG} style={styles.icon} />
        <Text type="RobotoMono10Medium">{timeString}</Text>
      </View>
      <View style={styles.wrapper}>
        <Image source={TextFieldsPNG} style={styles.icon} />
        <Text type="RobotoMono10Medium">{wordCount}</Text>
      </View>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    rowGap: 8,
    columnGap: 8,
  },
  icon: {
    width: 12,
    height: 12,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    rowGap: 4,
    columnGap: 4,
  },
});
