import { Trans } from "@lingui/macro";
import { Link } from "expo-router";
import React from "react";
import { ScrollView, View, StyleSheet, Pressable } from "react-native";

import { FrontFooter } from "@/components/footer/FrontFooter";
import { Header } from "@/components/header/Header";
import { StoryHorizontalList } from "@/components/lists/StoryHorizontalList";
import { useStories } from "@/hooks/useStories";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";

export default function Page() {
  const { stories, isLoading, isError, error, progress } = useStories();

  if (!stories) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.root}>
      <ScrollView style={styles.root} contentContainerStyle={styles.root}>
        <Header title="Mikrohistorie" />
        <View style={styles.content}>
          <StoryHorizontalList
            slug="lett"
            title="Lett"
            stories={stories.filter((story) => story.level === "lett")}
          />
          <StoryHorizontalList
            slug="ganske-tungt"
            title="Ganske tungt"
            stories={stories.filter((story) => story.level === "ganske-tungt")}
          />
          <StoryHorizontalList
            slug="hardt"
            title="Hardt"
            stories={stories.filter((story) => story.level === "hardt")}
          />
        </View>

        <FrontFooter />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flexDirection: "column",
    gap: 48,
  },
});
