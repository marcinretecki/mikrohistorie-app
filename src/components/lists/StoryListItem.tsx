import { Link } from "expo-router";
import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";

import { Indicators } from "@/components/indicators/Indicators";
import { Text } from "@/styles/typography";
import { Story } from "@/types/types";
import { getStoryImageUri } from "@/utilities/getStoryImageUri";

export interface StoryListItemProps {
  story: Story;
  size: "Wide" | "Narrow";
}

export function StoryListItem({ story, size }: StoryListItemProps) {
  const styles = stylesheet;
  const isWide = size === "Wide";
  const imageUri = getStoryImageUri(story.slug, "small");

  const indicators = story.versions[0];

  return (
    <Link
      href={{
        pathname: "/story/" + story.slug,
      }}
      asChild
    >
      <Pressable>
        <View style={isWide ? styles.wide : styles.narrow}>
          <Image
            source={{
              uri: imageUri,
            }}
            style={
              isWide ? { width: 104, height: 104 } : { width: 128, height: 128 }
            }
          />

          <View style={styles.info}>
            <Text type={isWide ? "Lora20SemiBold" : "Lora16SemiBold"}>
              {story.title}
            </Text>
            <Indicators
              time={indicators.time}
              wordCount={indicators.word_count}
              progresses={story.progresses}
              versions={story.versions}
            />
            {isWide && <Text type="Lora14Reg">{story.description}</Text>}
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const stylesheet = StyleSheet.create({
  wide: {
    flexDirection: "row",
    flex: 1,
    padding: 16,
    alignItems: "flex-start",
    rowGap: 16,
    columnGap: 16,
  },
  narrow: {
    width: 128,
    padding: 0,
    flexDirection: "column",
    rowGap: 8,
    columnGap: 8,
  },

  info: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    alignSelf: "stretch",
  },
});
