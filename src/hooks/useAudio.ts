import { Audio } from "expo-av";
import { useEffect, useState } from "react";

interface useAudioProps {
  uri?: string;
}
export const useAudio = ({ uri }: useAudioProps) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAudio = async () => {
      if (!uri) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);

      try {
        const { sound: newSound, status } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: false },
        );

        if (status.isLoaded) {
          setSound(newSound);
          setIsLoading(false);
        }
      } catch (e) {
        setError("Could not load audio");
        console.error("Error loading audio", e);
        setIsLoading(false);
      }
    };

    loadAudio();

    return () => {
      sound?.unloadAsync();
    };
  }, [uri]);

  return { sound, isLoading, error };
};
