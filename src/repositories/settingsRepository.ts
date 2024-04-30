import { typedClient } from "@/lib/supabase";
import { Settings } from "@/types/types";

interface GetSettingsProps {
  id: string;
}
interface UpdateSettingsProps {
  id: string;
  settings: Partial<Settings>;
}
interface InsertSettingsProps {
  settings: Partial<Settings>;
}
export const settingsRepository = {
  getSettings: async ({ id }: GetSettingsProps) => {
    return typedClient
      .from("settings")
      .select()
      .eq("id", id)
      .returns<Settings[]>()
      .throwOnError();
  },
  updateSettings: async ({ id, settings }: UpdateSettingsProps) => {
    const updates = {
      ...settings,
      updated_at: new Date().toISOString(),
    };

    return typedClient
      .from("settings")
      .update(updates)
      .eq("id", id)
      .throwOnError()
      .select()
      .returns<Settings[]>();
  },
  insertSettings: async ({ settings }: InsertSettingsProps) => {
    return typedClient
      .from("settings")
      .insert({ ...settings })
      .throwOnError()
      .select()
      .returns<Settings[]>();
  },
};
