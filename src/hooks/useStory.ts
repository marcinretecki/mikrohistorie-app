import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";

import { useStories } from "@/hooks/useFetchStories";

// hook taht will take slug prop and return only one strory
export const useStory = () => {
  const stories = useStories();
  const { slug, version } = useLocalSearchParams();

  const cleanSlug = slug instanceof Array ? slug[0] : slug;
  const cleanVersion = version instanceof Array ? version[0] : version;
  // add use memo to storyObj and versionObj
  const storyObj = useMemo(
    () => stories.stories.find((story) => story.slug === cleanSlug),
    [cleanSlug, stories]
  );
  const versionObj = useMemo(
    () => storyObj.versions.find((v) => v.version === cleanVersion),
    [cleanSlug, stories]
  );

  if (stories === undefined) {
    throw new Error("useStory must be used within a StoriesProvider");
  }

  return { story: storyObj, version: versionObj };
};
