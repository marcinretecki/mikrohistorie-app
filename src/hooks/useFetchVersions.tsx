import { useEffect, useReducer } from "react";

import { storiesRepository } from "../repositories/storiesRepository";

import { errorToast } from "@/toasts/toasts";
import { StoryVersion } from "@/types/types";

type VersionsState = {
  versions: StoryVersion[];
  loading: boolean;
  error: boolean;
};

type VersionsAction =
  | { type: "LOADING" }
  | { type: "SUCCESS"; payload: StoryVersion[] }
  | { type: "FAILURE" };

// Action Creators
const versionsActionCreators = {
  loading: (): VersionsAction => ({ type: "LOADING" }),
  success: (versions: StoryVersion[]): VersionsAction => ({
    type: "SUCCESS",
    payload: versions,
  }),
  failure: (): VersionsAction => ({ type: "FAILURE" }),
};

// Initial State
const versionsInitialState: VersionsState = {
  versions: [],
  loading: false,
  error: false,
};

// Reducer
const versionsReducer = (
  state: VersionsState,
  action: VersionsAction
): VersionsState => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: false };
    case "SUCCESS":
      return { ...state, versions: action.payload, loading: false };
    case "FAILURE":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

// Custom Hook
export const useFetchVersions = (storyId?: string): VersionsState => {
  const [state, dispatch] = useReducer(versionsReducer, versionsInitialState);

  useEffect(() => {
    const fetchStories = async () => {
      dispatch(versionsActionCreators.loading());

      try {
        if (!storyId) {
          throw new Error("No storyId provided");
        }
        const response = await storiesRepository.getVersions(storyId);
        if (response.isError) {
          throw new Error("Network response was not ok");
        }
        const versions = response.versions;
        if (!versions) throw new Error("No versions returned");

        dispatch(versionsActionCreators.success(versions));
      } catch (error) {
        console.error("Fetching versions failed:", error);
        errorToast(error.message);
        dispatch(versionsActionCreators.failure());
      }
    };

    fetchStories();
  }, []);

  return state;
};
