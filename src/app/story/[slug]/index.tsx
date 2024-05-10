import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";

import { Loading } from "@/app/loading/Loading";
import { ChooseVersion } from "@/components/audio/ChooseVersion";
import { Player } from "@/components/audio/Player";
import { ButtonPrimary } from "@/components/buttons/ButtonPrimary";
import { Footer } from "@/components/footer/Footer";
import { BackButton } from "@/components/header/BackButton";
import { Indicators } from "@/components/indicators/Indicators";
import { StoryModes } from "@/components/lists/StoryModes";
import { useStory } from "@/hooks/useStory";
import { useUser } from "@/hooks/useUser";
import { theme } from "@/styles/theme";
import { Progress, ProgressInsert, StoryVersion } from "@/types/types";

export default function Page() {
  const {
    story,
    audio,
    version,
    versionProgress,
    handleSetVersion,
    storyImageUri,
    handleProgress,
  } = useStory();

  console.log("version in story index", version?.version_dialect);

  // TODO: Add story loading screen instead of generic loading
  if (!story || !version) {
    return <Loading />;
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        <View
          style={{ flexDirection: "column", gap: 16, alignItems: "center" }}
        >
          <View style={styles.audioPlayerWrapper}>
            <Image
              style={styles.backgroundImage}
              source={{
                uri: storyImageUri,
              }}
            />
            <View style={styles.audioPlayer}>
              <Player
                uri={audio?.full}
                story={story}
                progress={versionProgress}
                handleProgress={handleProgress}
              />
              <View style={styles.backWrapper}>
                <BackButton />
              </View>
            </View>
          </View>

          <Indicators
            time={version.time}
            wordCount={version.word_count}
            progresses={story.progresses}
            versions={story.versions}
          />
        </View>
        <ChooseVersion
          story={story}
          activeVersion={version}
          handleSetVersion={handleSetVersion}
        />
        <StoryModes version={version.version_dialect} story={story} />
        <Footer />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: 36,
    flex: 1,
    paddingBottom: 48,
  },
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
