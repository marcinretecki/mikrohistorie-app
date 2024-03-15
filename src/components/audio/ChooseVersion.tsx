import { useMemo } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";

import { BoxShadow } from "@/components/shadow/BoxShadow";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";
import { Story, StoryVersion } from "@/types";
import { TitleContentSection } from "@/components/lists/TitleContentSection";

interface ChooseVersionProps {
  story: Story;
  handleSetVersion: (selectedVersion: StoryVersion) => void;
  activeVersion: StoryVersion;
}

export const ChooseVersion = ({
  story,
  handleSetVersion,
  activeVersion,
}: ChooseVersionProps) => {
  const versions = story.versions;
  return (
    <TitleContentSection title="Dialekt">
      <ScrollView
        horizontal
        style={styles.scrollView}
        contentContainerStyle={{
          paddingVertical: 16,
          paddingLeft: 16,
          overflow: "visible",
        }}
      >
        {versions.map((version) => {
          const isActive = version.version === activeVersion.version;
          return (
            <View style={{ marginRight: 8 }} key={version.audioURI}>
              <StoryVersionItem
                version={version}
                isActive={isActive}
                handleSetVersion={handleSetVersion}
              />
            </View>
          );
        })}
      </ScrollView>
    </TitleContentSection>
  );
};

interface StoryVersionItemProps {
  version: StoryVersion;
  isActive: boolean;
  handleSetVersion: (selectedVersion: StoryVersion) => void;
}
const StoryVersionItem = ({ version, isActive, handleSetVersion }) => {
  const versionItemRoot = useMemo(
    () =>
      StyleSheet.flatten([
        styles.versionItemRoot,
        isActive && styles.versionItemRootActive,
      ]),
    [isActive]
  );

  return (
    <BoxShadow shadow={isActive ? "viewShadowTealMedium" : "viewShadowTeal"}>
      <Pressable onPress={() => handleSetVersion(version)}>
        <View style={versionItemRoot}>
          <Text type="BSInlineText24Bold" style={styles.versionItemText}>
            {version.version}
          </Text>
          <Text type="Lora12Reg" style={styles.versionItemText}>
            {version.reader}
          </Text>
        </View>
      </Pressable>
    </BoxShadow>
  );
};

const styles = StyleSheet.create({
  root: { gap: 0, paddingLeft: 0 },
  titleWrapper: {
    paddingLeft: 16,
  },
  scrollView: {
    overflow: "visible",
  },
  versionItemRoot: {
    width: 128,
    height: 76,
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: theme.colors.bg2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "transparent",
  },
  versionItemRootActive: {
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: "solid",
    borderColor: theme.colors.teal,
  },
  versionItemText: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
