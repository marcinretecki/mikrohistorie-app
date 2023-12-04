import {
  Stack,
  useLocalSearchParams,
  useNavigation,
  usePathname,
} from "expo-router";
import React from "react";
import { FlatList, View, StyleSheet, Image } from "react-native";

import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";
import { Header } from "@/components/header/Header";
import { useStories } from "@/hooks/useFetchStories";
import { BackButton } from "@/components/header/BackButton";
import { Player } from "@/components/audio/Player";

export default function Page() {
  const { slug } = useLocalSearchParams();
  const storiesContext = useStories();
  // check if slug is an array, if yes then use the first element
  const cleanSlug = slug instanceof Array ? slug[0] : slug;

  // search for the story with the slug
  const story = storiesContext.stories.find(
    (story) => story.slug === cleanSlug
  );

  const storyVersion = story?.versions[0];

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.audioPlayerWrapper}>
        <Image
          style={styles.backgroundImage}
          source={{
            uri: story.imageURI,
          }}
        />
        <View style={styles.audioPlayer}>
          <Text type="Lora32SemiBold">{story.title}</Text>
          <Player uri={storyVersion.audioURI} />
          <View style={styles.backWrapper}>
            <BackButton />
          </View>
        </View>
      </View>
      <Text type="Lora14Reg">{story.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  audioPlayerWrapper: {
    backgroundColor: theme.colors.pink,
    width: "100%",
    aspectRatio: 1,
  },
  audioPlayer: {
    backgroundColor: theme.colors.overlayBG,
    flexDirection: "column",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  backWrapper: {
    position: "absolute",
    top: 48,
    left: 16,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
});
