import { useQuery } from "@tanstack/react-query";
import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { useStories } from "@/hooks/useStories";
import { useUser } from "@/hooks/useUser";
import { storiesRepository } from "@/repositories/storiesRepository";
import {
  ProgressInsert,
  Progress,
  Story,
  StoryVersion,
  VersionAudio,
} from "@/types/types";
import { getStoryImageUri } from "@/utilities/getStoryImageUri";

export interface HandleProgressProps {
  type: "listen" | "repeat" | "write";
}

interface StoryContextType {
  story: Story | undefined;
  versionId: string | undefined;
  version: StoryVersion | undefined;
  versionProgress: Progress | undefined;
  storyImageUri: string;
  audio: VersionAudio | undefined;
  handleProgress: ({ type }: HandleProgressProps) => void;
  handleSetVersion: (selectedVersionId: string) => void;
}

export const StoryContext = createContext<StoryContextType | undefined>(
  undefined,
);

interface StoryProviderProps {
  slug: string;
  children: ReactNode;
}
export const StoryProvider = ({ children, slug }: StoryProviderProps) => {
  const user = useUser();
  const { stories, progress } = useStories();
  const [versionId, setVersionId] = useState<string | undefined>(undefined);

  const story = useMemo(
    () => stories?.find((story) => story.slug === slug),
    [slug, stories],
  );

  const version = useMemo(() => {
    if (story && versionId) {
      return story?.versions.find(
        (version) => version.version_id === versionId,
      );
    }
  }, [story, versionId]);

  const versionProgress = useMemo(() => {
    if (story && versionId) {
      return story.progresses.find(
        (progress) => progress.version_id === versionId,
      );
    }
  }, [story, versionId]);

  const storyImageUri = useMemo(() => getStoryImageUri(slug, "large"), [slug]);

  useEffect(() => {
    if (story?.versions) {
      setVersionId(story.versions[0].version_id);
    }
  }, []);

  const handleSetVersion = (selectedVersionId: string) => {
    setVersionId(selectedVersionId);
  };

  const handleProgress = ({ type }: HandleProgressProps) => {
    if (story && versionId && progress && user) {
      const progressBase: ProgressInsert = {
        progress_id: user.id + "_" + versionId,
        version_id: versionId,
        user_id: user.id,
      };

      let progressData: ProgressInsert = { ...progressBase };

      if (type === "listen") {
        if (progressData.listen) {
          return;
        }
        progressData = { ...progressData, listen: true };
      } else if (type === "repeat") {
        if (progressData.repeat) {
          return;
        }
        progressData = { ...progressData, repeat: true };
      } else if (type === "write") {
        if (progressData.write) {
          return;
        }
        progressData = { ...progressData, write: true };
      }

      console.log("handleProgress", progressData);
      progress.upsertProgress(progressData);
    }
  };

  const { data: audioData, error: audioError } = useQuery({
    queryKey: ["audiottt", versionId],
    queryFn: async () => {
      if (!versionId) {
        return;
      }
      const { data } = await storiesRepository.getAudioURL({
        storySlug: "det_er_pa_tide",
        versionSlug: "ostnorsk",
      });
      if (!data) {
        return;
      }
      const versionAudio: VersionAudio = {
        full: data[0].signedUrl,
        breaked: data[1].signedUrl,
      };
      return versionAudio;
    },
    enabled: !!versionId,
    staleTime: 0,
    refetchOnMount: "always",
  });

  if (!stories) {
    throw new Error("StoryProvider must be used within a StoriesProvider");
  }

  return (
    <StoryContext.Provider
      value={{
        story,
        versionId,
        version,
        audio: audioData,
        storyImageUri,
        versionProgress,
        handleProgress,
        handleSetVersion,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};
