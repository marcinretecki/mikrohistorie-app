// import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { useLocale } from "./useLocale";
import { useUser } from "./useUser";

import { settingsRepository } from "@/repositories/settingsRepository";
import { errorToast, successToast } from "@/toasts/toasts";
import { Settings } from "@/types/types";

export const useSettings = () => {
  const deviceLanguage = useLocale();
  const queryClient = useQueryClient();
  const user = useUser();
  const settingsKey = ["settings", user.id];

  const {
    isError,
    data: settings,
    error,
    isPending,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: settingsKey,
    queryFn: async () => {
      const { data } = await settingsRepository.getSettings({ id: user.id });
      return data;
    },
    enabled: !!user.id,
  });

  // not working as intended
  useEffect(() => {
    queryClient.setQueryData(settingsKey, settings);
  }, [settings]);

  const updateSettings = useMutation({
    mutationFn: settingsRepository.updateSettings,
    scope: {
      id: "settings" + user.id,
    },
    onMutate: async (updateSettingsProps) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: settingsKey });
      const newSettings = updateSettingsProps.settings;

      // Snapshot the previous value
      const previousSettings = queryClient.getQueryData(settingsKey);
      console.log(`optimistic update`, previousSettings);

      // Optimistically update to the new value
      queryClient.setQueryData(settingsKey, (oldSettings: Settings[]) => [
        { ...oldSettings, ...newSettings },
      ]);

      return { previousSettings };
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`rolling back optimistic update`, error);
      errorToast("Failed to update settings");

      queryClient.setQueryData(settingsKey, context?.previousSettings);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: settingsKey });
    },
    onSuccess: async (data, variables, context) => {
      // Boom baby!
      successToast("Settings updated");
    },
  });

  // init settings
  const insertSettings = useMutation({
    mutationFn: settingsRepository.insertSettings,
    scope: {
      id: user.id,
    },
  });

  useEffect(() => {
    // check if the user has settings
    if (!isPending && !isFetching && !settings && deviceLanguage) {
      insertSettings.mutate({
        settings: { language: deviceLanguage },
      });
    }
  }, [settings, deviceLanguage]);

  return {
    settings: settings ? settings[0] : null,
    error,
    updateSettings,
    isPending,
    isError,
  };
};
