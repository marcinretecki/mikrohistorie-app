import { View, StyleSheet } from "react-native";

import { BackButton } from "@/components/header/BackButton";
import { Reader } from "@/components/indicators/Reader";
import { Text } from "@/styles/typography";
import { StoryVersion } from "@/types/types";

interface PhraseListHeaderProps {
  title?: string;
  version?: StoryVersion;
}
export const PhraseListHeader = ({ title, version }: PhraseListHeaderProps) => (
  <View style={styles.header}>
    <View style={styles.backWrapper}>
      <BackButton />
    </View>
    <View style={styles.titleWrapper}>
      <Text type="Lora32SemiBold">{title ? title : ""}</Text>
      {version && <Reader version={version} />}
    </View>
  </View>
);

const styles = StyleSheet.create({
  backWrapper: {
    position: "absolute",
    top: 48,
    left: 16,
  },
  header: {
    paddingTop: 80,
    paddingBottom: 40,
    gap: 32,
  },
  titleWrapper: {
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 8,
  },
});
