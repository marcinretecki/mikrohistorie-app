import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useMemo } from "react";

import { useUser } from "@/hooks/useUser";
import { storiesRepository } from "@/repositories/storiesRepository";
import { errorToast } from "@/toasts/toasts";
import {
  Progress,
  ProgressInsert,
  ProgressInsertClean,
  Stories,
  Story,
  StoryFromDB,
} from "@/types/types";

interface StoriesContextType {
  stories?: Stories | null;
  isError: boolean;
  error: Error | null;
  isPending: boolean;
  isFetching: boolean;
  isLoading: boolean;
  progress: {
    isErrorProgress: boolean;
    errorProgress: Error | null;
    isPendingProgress: boolean;
    isFetchingProgress: boolean;
    isLoadingProgress: boolean;
    upsertProgress: (progress: ProgressInsertClean) => void;
  };
}

// Context
export const StoriesContext = createContext<StoriesContextType | undefined>(
  undefined,
);

// Provider
interface StoriesProviderProps {
  children: React.ReactNode;
}
export const StoriesProvider = ({ children }: StoriesProviderProps) => {
  const user = useUser();
  const queryClient = useQueryClient();
  const storiesKey = ["stories", user.id];
  const progressKey = ["progress", user.id];

  const {
    data: storiesData,
    isError,
    error,
    isPending,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: storiesKey,
    queryFn: async () => {
      const { data } = await storiesRepository.getStories();
      return data;
    },
    enabled: !!user.id,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const {
    data: progressData,
    isError: isErrorProgress,
    error: errorProgress,
    isPending: isPendingProgress,
    isFetching: isFetchingProgress,
    isLoading: isLoadingProgress,
  } = useQuery({
    queryKey: progressKey,
    queryFn: async () => {
      const { data } = await storiesRepository.getProgress();
      return data;
    },
    enabled: !!user.id,
    staleTime: 1000 * 60 * 10,
  });

  const mutateProgress = useMutation({
    mutationFn: storiesRepository.upsertProgress,
    scope: {
      id: "progress" + user.id,
    },
    onMutate: async (updateProgressProps) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: progressKey });
      const newProgress = updateProgressProps;

      // Snapshot the previous value
      const previousProgress: Progress[] | null | undefined =
        queryClient.getQueryData(progressKey);
      console.log(`optimistic update`, previousProgress);

      // Optimistically update to the new value
      queryClient.setQueryData(progressKey, (oldProgress: ProgressInsert[]) => {
        // check if the progress already exists in oldProgress and update it
        const newProgressWithId = {
          ...newProgress,
          progress_id: newProgress.user_id + "-" + newProgress.version_id,
        };
        const progressIndex = oldProgress.findIndex(
          (progress) => progress.progress_id === newProgressWithId.progress_id,
        );
        if (progressIndex > -1) {
          oldProgress[progressIndex] = newProgressWithId;
          return [...oldProgress];
        }
        // if progress does not exist, add it to the oldProgress
        return [...oldProgress, newProgressWithId];
      });

      return { previousProgress };
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`rolling back optimistic update`, error);
      errorToast("Failed to save progress");

      queryClient.setQueryData(progressKey, context?.previousProgress);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: progressKey });
    },
  });

  const upsertProgress = (progress: ProgressInsertClean) => {
    mutateProgress.mutate(progress);
  };

  const storiesWithProgresses = useMemo<Stories | null>(() => {
    // Map over each story
    if (!storiesData) return null;

    return storiesData.map((story: StoryFromDB) => {
      // Filter progresses that match any version_id in this story's versions
      const filteredProgresses: Progress[] = progressData
        ? progressData.filter((progress: Progress) =>
            story.versions.some(
              (version) => version.version_id === progress.version_id,
            ),
          )
        : [];

      // Return a new object combining the story with its progresses
      return {
        ...story,
        progresses: filteredProgresses,
      } as Story;
    });
  }, [storiesData, progressData]);





  return (
    <StoriesContext.Provider
      value={{
        stories: storiesWithProgresses,
        isError,
        error,
        isPending,
        isFetching,
        isLoading,
        progress: {
          isErrorProgress,
          errorProgress,
          isPendingProgress,
          isFetchingProgress,
          isLoadingProgress,
          upsertProgress,
        },
      }}
    >
      {children}
    </StoriesContext.Provider>
  );
};
