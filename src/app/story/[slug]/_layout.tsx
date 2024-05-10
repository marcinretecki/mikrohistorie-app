import { Slot, useLocalSearchParams } from "expo-router";

import { StoryProvider } from "@/providers/storyProvider";

export default function StoryLayout() {
  const { slug } = useLocalSearchParams();
  const cleanSlug = slug instanceof Array ? slug[0] : slug;

  if (!cleanSlug) {
    throw new Error("Wrong path.");
  }

  return (
    <StoryProvider slug={cleanSlug}>
      <Slot />
    </StoryProvider>
  );
}
