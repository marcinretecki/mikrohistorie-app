import ForwardPNG from "@assets/forward.png";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View, FlatList, Image, Pressable } from "react-native";

import { StoryListItem } from "./StoryListItem";

import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";
import { Story } from "@/types";

export interface StoryListProps {
  stories: Story[];
  title: string;
  slug: string;
}

export function StoryHorizontalList({ stories, title, slug }: StoryListProps) {
  return (
    <View style={styles.root}>
      <View style={styles.titleWrapper}>
        <Text type="BSText32Bold">{title}</Text>
        <MoreButton pathname={"/level/" + slug} params={{}} />
      </View>
      <FlatList
        data={stories}
        renderItem={renderItem}
        keyExtractor={(item) => item.slug}
        horizontal
      />
    </View>
  );
}

const renderItem = ({ item, index }) => (
  <View style={{ marginRight: 16 }}>
    <StoryListItem story={item} size="Narrow" />
  </View>
);

const styles = StyleSheet.create({
  root: { gap: 16, paddingLeft: 16 },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 16,
  },
  moreButtonWrapper: {
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  forwardImage: {
    width: 18,
    height: 18,
  },
});

interface MoreButtonProps {
  pathname: string;
  params: object;
}

function MoreButton({ pathname, params }: MoreButtonProps) {
  return (
    <Link
      href={{
        pathname,
        params,
      }}
      asChild
    >
      <Pressable>
        <View style={styles.moreButtonWrapper}>
          <Text type="Lora14Reg" color={theme.colors.text}>
            Więcej
          </Text>

          <Image style={styles.forwardImage} source={ForwardPNG} />
        </View>
      </Pressable>
    </Link>
  );
}
