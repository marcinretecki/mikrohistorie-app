import { typedClient } from "@/lib/supabase";
import { Stories, StoryVersion } from "@/types/types";

export const storiesRepository = {
  getStories: async () => {
    try {
      const { data, error, status } = await typedClient
        .from("stories")
        .select()
        .returns<Stories>();

      if (error || status !== 200) {
        throw new Error("Network response was not ok");
      } else if (!data) {
        throw new Error("No data returned");
      } else {
        const stories = data;
        return { stories, isError: false };
      }
    } catch (error) {
      console.error("Validation or Fetching Error:", error);
      return { isError: true, error };
    }
  },
  getVersions: async (storyId: string) => {
    try {
      const { data, error, status } = await typedClient
        .from("versions")
        .select()
        .eq("story_id", storyId)
        .returns<StoryVersion[]>();

      console.log("versions", data);
      console.log("error", error);

      if (error || status !== 200) {
        throw new Error("Network response was not ok");
      } else if (!data) {
        throw new Error("No data returned");
      } else {
        const versions = data;
        return { versions, isError: false };
      }
    } catch (error) {
      console.error("Validation or Fetching Error:", error);
      return { isError: true, error };
    }
  },
};
