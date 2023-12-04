import { Link } from "expo-router";
import React from "react";
import {
  View,
  ViewStyle,
  TextStyle,
  StyleSheet,
  Pressable,
} from "react-native";

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

export function StoryModeButton(props: StoryModeButtonProps) {
  const style = stylesheet;

  return (
    <Link
      href={{
        pathname: props.pathname,
        params: props.params,
      }}
      asChild
    >
      <Pressable>
        <BoxShadow shadowBlur={16}>
          <View style={style.root}>
            <View style={style.frame}>
              <View style={style.headerWrapper}>
                <Text type="BSInlineDisplay48Bold">{props.header}</Text>
              </View>
              <View style={style.textWrapper}>
                <Text type="Lora14Reg">{props.text}</Text>
              </View>
            </View>
            <View style={style.caretWrapper}>
              <Caret />
            </View>
          </View>
        </BoxShadow>
      </Pressable>
    </Link>
  );
}

const stylesheet = StyleSheet.create({
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
