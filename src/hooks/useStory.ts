import { useLocalSearchParams } from "expo-router";

import { useStories } from "@/hooks/useFetchStories";

// hook taht will take slug prop and return only one strory
export const useStory = () => {
  const stories = useStories();
  const { slug, version } = useLocalSearchParams();

  const cleanSlug = slug instanceof Array ? slug[0] : slug;
  const cleanVersion = version instanceof Array ? version[0] : version;
  const storyObj = stories.stories.find((story) => story.slug === cleanSlug);
  const versionObj = storyObj.versions.find((v) => v.version === cleanVersion);

  if (stories === undefined) {
    throw new Error("useStory must be used within a StoriesProvider");
  }

  return { story: storyObj, version: versionObj };
};
