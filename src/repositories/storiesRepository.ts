import { storiesSchema } from "@/schemas/storySchema";
import { Stories } from "@/types";

// TODO: Replace this with your API endpoint
export const storyRepository = {
  getStories: async () => {
    try {
      const response = await fetch("https://your-api-endpoint.com/stories");
      const data = await response.json();
      const stories = storiesSchema.parse(data) as Stories;
      return { stories, isError: false };
    } catch (error) {
      console.error("Validation or Fetching Error:", error);
      return { isError: true, error };
    }
  },
};
