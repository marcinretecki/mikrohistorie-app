import { Sound } from "expo-av/build/Audio";
import { useCallback, useReducer } from "react";

import { StoryVersion } from "@/types/types";

interface State {
  isPlaying: boolean;
  isChecked: boolean;
  focusedPhrase: number;
  playingPhrase: number;
  playedPhrases: Set<number>;
  userInputValues: { [phrase: number]: string };
}

type Action =
  | { type: "play"; phrase: number }
  | { type: "pause" }
  | { type: "check" }
  | { type: "update_user_input"; letter: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "play":
      return {
        ...state,
        isPlaying: true,
        playingPhrase: action.phrase,
        focusedPhrase: action.phrase,
        playedPhrases: new Set([...state.playedPhrases, action.phrase]),
      };
    case "pause":
      return { ...state, isPlaying: false, playingPhrase: -1 };
    case "check":
      return { ...state, isChecked: true, focusedPhrase: 1 };
    case "update_user_input": {
      const currentText = state.userInputValues[state.focusedPhrase] || "";
      const newText =
        action.letter === ""
          ? currentText.slice(0, -1) // handle backspace
          : currentText + (action.letter || ""); // handle normal input

      return {
        ...state,
        userInputValues: {
          ...state.userInputValues,
          [state.focusedPhrase]: newText,
        },
      };
    }
    default:
      return state;
  }
}

interface PhrasePlayerProps {
  sound: Sound | null;
  version: StoryVersion | undefined;
}
interface PhrasePlayerValue {
  error: string | null;
  isError: boolean;
  state: State;
  play: (phrase: number) => void;
  pause: () => void;
  check: () => void;
  updateUserInput: (letter: string) => void;
}

export function usePhrasePlayer({
  sound,
  version,
}: PhrasePlayerProps): PhrasePlayerValue {
  const initialState = {
    isPlaying: false,
    isChecked: false,
    playingPhrase: -1,
    focusedPhrase: 1,
    userInputValues: {},
    playedPhrases: new Set<number>(),
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  let playbackPositionCheckInterval: NodeJS.Timeout | null = null;

  // OBS: phrase numbers are 1-based
  const play = useCallback(
    (phrase: number) => {
      if (!sound || !version) {
        console.log("Play: Sound or version is not ready");
        return;
      }
      // Do not interrupt the current phrase if it's already playing
      if (state.isPlaying && state.playingPhrase === phrase) {
        console.log("Phrase is already playing");
        console.log(
          "Playing phrase",
          state.playingPhrase,
          "New phrase",
          phrase,
        );
        return;
      }

      if (phrase < 1 || phrase > version?.phrases.length) {
        console.log(
          "Invalid phrase number",
          phrase,
          "/",
          version?.phrases.length,
        );
        return;
      }

      // If other phrase is already playing, pause it
      if (state.isPlaying) {
        pause();
      }

      _play(phrase);
    },
    [sound, version],
  );

  const _play = async (phrase: number) => {
    if (!sound || !version) return;

    const timeStart = version.phrases[phrase - 1].timeStart;
    const timeEnd = version.phrases[phrase - 1].timeEnd;

    // Clear any existing interval to avoid multiple intervals running
    if (playbackPositionCheckInterval) {
      clearInterval(playbackPositionCheckInterval);
      playbackPositionCheckInterval = null;
    }

    await sound.setPositionAsync(timeStart);
    await sound.playAsync();
    dispatch({ type: "play", phrase });

    // Check the playback position every 50 ms
    playbackPositionCheckInterval = setInterval(async () => {
      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.positionMillis >= timeEnd) {
        await pause();

        if (playbackPositionCheckInterval) {
          clearInterval(playbackPositionCheckInterval);
          playbackPositionCheckInterval = null;
        }
      }
    }, 50);
  };

  const pause = useCallback(async () => {
    if (!sound || !version) {
      console.log("Sound or version is not ready");
      return;
    }

    await sound.pauseAsync();
    dispatch({ type: "pause" });

    console.log("Played phrases", state.playedPhrases);
    if (state.playedPhrases.size === version.phrases.length) {
      console.log("All phrases have been played!");
    }
  }, [sound, version]);

  const check = useCallback(() => {
    dispatch({ type: "check" });
  }, []);

  const updateUserInput = useCallback((letter: string) => {
    dispatch({ type: "update_user_input", letter });
  }, []);

  if (!sound || !version) {
    console.log("usePhrasePlayer: Sound or version is not ready");
    return {
      error: "Sound or version is not provided",
      isError: true,
      state: initialState,
      play: () => {},
      pause: () => {},
      check: () => {},
      updateUserInput: () => {},
    };
  }

  console.log("usePhrasePlayer: Ready");

  return {
    error: null,
    isError: false,
    state,
    play,
    pause,
    check,
    updateUserInput,
  };
}
