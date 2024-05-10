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
  version: StoryVersion | undefined;
  versionProgress: Progress | undefined;
  storyImageUri: string;
  audio: VersionAudio | undefined;
  handleProgress: ({ type }: HandleProgressProps) => void;
  handleSetVersion: (selectedVersion: StoryVersion) => void;
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
  const [version, setVersion] = useState<StoryVersion | undefined>(undefined);

  const story = useMemo(
    () => stories?.find((story) => story.slug === slug),
    [slug, stories],
  );

  const versionProgress = useMemo(() => {
    if (story && version) {
      return story.progresses.find(
        (progress) => progress.version_id === version.version_id,
      );
    }
  }, [story, version]);

  const storyImageUri = useMemo(() => getStoryImageUri(slug, "large"), [slug]);

  useEffect(() => {
    if (story?.versions) {
      setVersion(story.versions[0]);
    }
  }, []);

  const handleSetVersion = (selectedVersion: StoryVersion) => {
    setVersion(selectedVersion);
  };

  const handleProgress = ({ type }: HandleProgressProps) => {
    if (story && version && progress && user) {
      const progressBase: ProgressInsert = {
        progress_id: user.id + "_" + version.version_id,
        version_id: version.version_id,
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
    queryKey: ["audiottt", version],
    queryFn: async () => {
      if (!version) {
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
    enabled: !!version,
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
