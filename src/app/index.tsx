import { mockStories } from "@mocks/stories";
import React from "react";
import { ScrollView, View } from "react-native";

import { Header } from "@/components/header/Header";
import { StoryHorizontalList } from "@/components/lists/StoryHorizontalList";

export default function Page() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Header title="Mikrohistorie" />
        <View style={{ flexDirection: "column", gap: 48, paddingBottom: 48 }}>
          <StoryHorizontalList slug="lett" title="Lett" stories={mockStories} />
          <StoryHorizontalList
            slug="ganske-tungt"
            title="Ganske tungt"
            stories={mockStories}
          />
          <StoryHorizontalList
            slug="hardt"
            title="Hardt"
            stories={mockStories}
          />
        </View>
      </ScrollView>
    </View>
  );
}
