import {
  Stack,
  useLocalSearchParams,
  useNavigation,
  usePathname,
} from "expo-router";
import React from "react";
import { FlatList, View, StyleSheet } from "react-native";

import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";
import { Header } from "@/components/header/Header";
import { StoryListItem } from "@/components/lists/StoryListItem";
import { useStories } from "@/hooks/useFetchStories";

type ItemProps = { title: string };

export default function Page() {
  const { slug } = useLocalSearchParams();
  const storiesContext = useStories();
  const cleanSlug = slug instanceof Array ? slug[0] : slug;

  // search for all stories with the same level as the slug
  const stories = storiesContext.stories.filter(
    (story) => story.level === cleanSlug
  );

  const title = (level: string) => {
    if (level === "lett") {
      return "Lett";
    } else if (level === "ganske-tungt") {
      return "Ganske tungt";
    } else if (level === "hardt") {
      return "Hardt";
    } else {
      return "Ukjent";
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title={title(cleanSlug)} />
      <FlatList
        data={stories}
        renderItem={({ item }) => <StoryListItem story={item} size="Wide" />}
        keyExtractor={(item) => item.slug}
      />
    </View>
  );
}
