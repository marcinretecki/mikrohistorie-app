import { storiesSchema } from "@/schemas/storySchema";
import { Stories } from "@/types";
import { mockStoriesJSON } from "@mocks/stories";

export const storiesRepository = {
  getStories: async () => {
    try {
      const data = JSON.parse(mockStoriesJSON);
      const stories = storiesSchema.parse(data) as Stories;
      return { stories, isError: false };
    } catch (error) {
      console.error("Validation or Fetching Error:", error);
      return { isError: true, error };
    }
  },
};
