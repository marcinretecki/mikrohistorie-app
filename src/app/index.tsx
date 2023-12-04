import { Link, Stack } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Image,
  useWindowDimensions,
  StyleSheet,
  PixelRatio,
} from "react-native";

import { Text } from "@/styles/typography";
import { theme } from "@/styles/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { StoryModeButton } from "@/components/buttons/ButtonStoryMode";
import { Steps } from "@/components/indicators/Steps";
import { Indicators } from "@/components/indicators/Indicators";
import { StoryListItem } from "@/components/lists/StoryListItem";
import MirakelHusetJPG from "@assets/mirakelhuset.jpg";
import { Header } from "@/components/header/Header";

const MirakelHusetJPGURI = Image.resolveAssetSource(MirakelHusetJPG).uri;

import { mockStories } from "@mocks/stories";
import { StoryHorizontalList } from "@/components/lists/StoryHorizontalList";
import { useStories } from "@/hooks/useFetchStories";

export default function Page() {
  const storiesContext = useStories();

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
