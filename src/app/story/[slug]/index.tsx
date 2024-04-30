import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";

import { Loading } from "@/app/loading/Loading";
import { ChooseVersion } from "@/components/audio/ChooseVersion";
import { Player } from "@/components/audio/Player";
import { Footer } from "@/components/footer/Footer";
import { BackButton } from "@/components/header/BackButton";
import { Indicators } from "@/components/indicators/Indicators";
import { StoryModes } from "@/components/lists/StoryModes";
import { useStory } from "@/hooks/useStory";
import { theme } from "@/styles/theme";
import { StoryVersion } from "@/types/types";

export default function Page() {
  const { story, versions } = useStory();

  const [version, setVersion] = useState<StoryVersion | null>(null);

  useEffect(() => {
    if (versions) {
      setVersion(versions[0]);
    }
  }, [versions]);

  const handleSetVersion = (selectedVersion: StoryVersion) => {
    setVersion(selectedVersion);
  };

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
                uri: story.image_uri,
              }}
            />
            <View style={styles.audioPlayer}>
              <Player uri={version.audio_uri} story={story} />
              <View style={styles.backWrapper}>
                <BackButton />
              </View>
            </View>
          </View>

          <Indicators time={0} wordCount={0} step={0} />
        </View>
        <ChooseVersion
          story={story}
          versions={versions}
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
