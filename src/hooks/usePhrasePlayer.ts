import { Sound } from "expo-av/build/Audio";
import { useCallback, useReducer } from "react";

interface State {
  isPlaying: boolean;
  isChecked: boolean;
  playingPhrase: number;
  userInputValues: { [index: number]: string };
  phraseNumber: number;
}

type Action =
  | { type: "toggle_play"; playing: boolean; newPhrase?: number }
  | { type: "check" }
  | { type: "set_phrase_number"; number: number }
  | { type: "update_user_input"; index: number; text: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "toggle_play":
      return {
        ...state,
        isPlaying: action.playing,
        playingPhrase: action.playing
          ? action.newPhrase ?? state.playingPhrase
          : -1,
      };
    case "check":
      return { ...state, isChecked: true, phraseNumber: 1 };
    case "set_phrase_number":
      return { ...state, phraseNumber: action.number };
    case "update_user_input":
      return {
        ...state,
        userInputValues: {
          ...state.userInputValues,
          [action.index]: action.text,
        },
      };
    default:
      return state;
  }
}

export function usePhrasePlayer() {
  const initialState = {
    isPlaying: false,
    isChecked: false,
    playingPhrase: -1,
    userInputValues: {},
    phraseNumber: 1,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const togglePlay = useCallback((playing: boolean) => {
    dispatch({ type: "toggle_play", playing });
  }, []);

  const check = useCallback(() => {
    dispatch({ type: "check" });
  }, []);

  const setPhraseNumber = useCallback((number: number) => {
    dispatch({ type: "set_phrase_number", number });
  }, []);

  const updateUserInput = useCallback((index: number, text: string) => {
    dispatch({ type: "update_user_input", index, text });
  }, []);

  return { state, togglePlay, check, setPhraseNumber, updateUserInput };
}
