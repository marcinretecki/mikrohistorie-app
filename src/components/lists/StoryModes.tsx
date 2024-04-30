import { StyleSheet, View } from "react-native";

import { StoryModeButton } from "@/components/buttons/StoryModeButton";
import { TitleContentSection } from "@/components/lists/TitleContentSection";
import { Story } from "@/types/types";

interface StoryModesProps {
  story: Story;
  version: string;
}
export const StoryModes = ({ version, story }: StoryModesProps) => {
  return (
    <TitleContentSection title="Ćwiczenia">
      <View style={styles.root}>
        <StoryModeButton
          header="Pisanie"
          text="Zapisz to co słyszysz, fraza po frazie."
          params={{ version }}
          pathname={`/story/${story.slug}/write`}
          key="writing"
        />
        <StoryModeButton
          header="Powtarzanie"
          text="Powtórz na głos każdy fragment."
          params={{ version }}
          pathname={`/story/${story.slug}/repeat`}
          key="repeating"
        />
      </View>
    </TitleContentSection>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 24,
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
