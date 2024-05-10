import { typedClient } from "@/lib/supabase";
import {
  StoryFromDB,
  StoryVersion,
  Progress,
  ProgressInsert,
  ProgressInsertClean,
} from "@/types/types";

interface GetAudioURLProps {
  storySlug: string;
  versionSlug: string;
}

export const storiesRepository = {
  getStories: async () =>
    typedClient
      .from("stories")
      .select(
        `
      *,
      versions:versions(*)
      `,
      )
      .returns<StoryFromDB[]>(),

  getProgress: async () =>
    typedClient.from("progress").select().returns<Progress[]>(),

  upsertProgress: async (progress: ProgressInsertClean) => {
    const updates: ProgressInsert = {
      ...progress,
      progress_id: progress.user_id + "-" + progress.version_id,
      updated_at: new Date().toISOString(),
    };

    return typedClient
      .from("progress")
      .upsert(updates)
      .throwOnError()
      .select()
      .returns<Progress[]>();
  },

  getVersions: async (storyId: string) =>
    typedClient
      .from("versions")
      .select()
      .eq("story_id", storyId)
      .returns<StoryVersion[]>(),

  getAudioURL: async ({ storySlug, versionSlug }: GetAudioURLProps) => {
    const full = `${storySlug}/${versionSlug}/${storySlug}.m4a`;
    const breaked = `${storySlug}/${versionSlug}/${storySlug}_breaked.m4a`;
    console.log("full", full, "breaked", breaked);

    return typedClient.storage
      .from("stories")
      .createSignedUrls([full, breaked], 60 * 60);
  },
};
