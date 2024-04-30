import { useEffect, useReducer, createContext, useContext } from "react";

import { storiesRepository } from "../repositories/storiesRepository";

import { errorToast } from "@/toasts/toasts";
import { Stories } from "@/types/types";

type StoriesState = {
  stories: Stories;
  loading: boolean;
  error: boolean;
};

type StoriesAction =
  | { type: "LOADING" }
  | { type: "SUCCESS"; payload: Stories }
  | { type: "FAILURE" };

// Action Creators
const storiesActionCreators = {
  loading: (): StoriesAction => ({ type: "LOADING" }),
  success: (stories: Stories): StoriesAction => ({
    type: "SUCCESS",
    payload: stories,
  }),
  failure: (): StoriesAction => ({ type: "FAILURE" }),
};

// Initial State
const storiesInitialState: StoriesState = {
  stories: [],
  loading: false,
  error: false,
};

// Reducer
const storiesReducer = (
  state: StoriesState,
  action: StoriesAction
): StoriesState => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: false };
    case "SUCCESS":
      return { ...state, stories: action.payload, loading: false };
    case "FAILURE":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

// Custom Hook
const useFetchStories = (): StoriesState => {
  const [state, dispatch] = useReducer(storiesReducer, storiesInitialState);

  useEffect(() => {
    const fetchStories = async () => {
      dispatch(storiesActionCreators.loading());

      try {
        const response = await storiesRepository.getStories();
        if (response.isError) {
          throw new Error("Network response was not ok");
        }
        const stories = response.stories;
        if (!stories) {
          throw new Error("No data returned");
        }
        dispatch(storiesActionCreators.success(stories));
      } catch (error) {
        console.error("Fetching stories failed:", error);
        errorToast(error.message);
        dispatch(storiesActionCreators.failure());
      }
    };

    fetchStories();
  }, []);

  return state;
};

// Context
const StoriesContext = createContext<StoriesState | undefined>(undefined);

// Provider
interface StoriesProviderProps {
  children: React.ReactNode;
}
export const StoriesProvider = ({ children }: StoriesProviderProps) => {
  const state = useFetchStories();

  return (
    <StoriesContext.Provider value={state}>{children}</StoriesContext.Provider>
  );
};

// Custom Hook for Context
export const useStories = (): StoriesState => {
  const context = useContext(StoriesContext);
  if (context === undefined) {
    throw new Error("useStories must be used within a StoriesProvider");
  }
  return context;
};
