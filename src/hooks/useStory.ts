import { useContext } from "react";

import { StoryContext } from "@/providers/StoryProvider";

export const useStory = () => {
  const context = useContext(StoryContext);

  if (context === undefined) {
    throw new Error("useStory must be used within a StoryProvider");
  }

  return context;
};
