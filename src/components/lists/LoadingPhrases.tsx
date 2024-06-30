import { ActivityIndicator, View, StyleSheet } from "react-native";

import { PhraseListHeader } from "./PhraseListHeader";

import { theme } from "@/styles/theme";
import { StoryVersion } from "@/types/types";

interface LoadingPhrasesProps {
  title?: string;
  version?: StoryVersion;
}
export const LoadingPhrases = ({ title, version }: LoadingPhrasesProps) => {
  return (
    <View style={styles.root}>
      <PhraseListHeader title={title} version={version} />
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.teal} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bg3,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 48,
  },
});
