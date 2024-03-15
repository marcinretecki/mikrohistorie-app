import { Link } from "expo-router";
import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { Caret } from "@/components/icons/Caret";
import { BoxShadow } from "@/components/shadow/BoxShadow";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";

export interface StoryModeButtonProps {
  header: string;
  text: string;
  params: object;
  pathname: string;
}

export function StoryModeButton({
  header,
  text,
  params,
  pathname,
}: StoryModeButtonProps) {
  return (
    <Link
      href={{
        pathname,
        params,
      }}
      asChild
    >
      <Pressable>
        <BoxShadow shadow="viewShadowTeal">
          <View style={styles.root}>
            <View style={styles.frame}>
              <View style={styles.headerWrapper}>
                <Text type="BSInlineDisplay48Bold">{header}</Text>
              </View>
              <View style={styles.textWrapper}>
                <Text type="Lora14Reg">{text}</Text>
              </View>
            </View>
            <View style={styles.caretWrapper}>
              <Caret />
            </View>
          </View>
        </BoxShadow>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 16,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 8,
    columnGap: 8,
    backgroundColor: theme.colors.bg2,
  },
  rootStatePressed: {
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: "solid",
    borderColor: theme.colors.teal,
    backgroundColor: theme.colors.bg2,
  },
  frame: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 8,
    columnGap: 8,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    rowGap: 10,
    columnGap: 10,
    alignSelf: "stretch",
  },

  textWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    rowGap: 8,
    columnGap: 8,
    alignSelf: "stretch",
  },
  caretWrapper: {
    width: 48,
    height: 50,
  },
});
