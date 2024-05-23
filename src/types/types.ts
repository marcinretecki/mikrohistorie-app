import { SupabaseClient } from "@supabase/supabase-js";

import { Tables, Database, TablesInsert } from "./supabase";

export type TypedSupabaseClient = SupabaseClient<Database>;

export type User = Tables<"profiles">;

export type Settings = Tables<"settings">;

export type Progress = Tables<"progress">;
export type ProgressInsert = TablesInsert<"progress">;
export type ProgressInsertClean = Omit<ProgressInsert, "progress_id">;

export type StoryFromDB = Omit<Tables<"stories">, "translations"> & {
  translations: Translations;
  versions: StoryVersion[];
};

export type Story = StoryFromDB & {
  progresses: Progress[];
};

export type Stories = Story[];

// TODO: check if you can add audio here or needs to be separate
export type StoryVersion = Omit<Tables<"versions">, "phrases"> & {
  phrases: StoryPhrase[];
};

export type VersionAudio = {
  full: string;
  breaked: string;
};

export type Translations = {
  [key: string]: string;
  pl: string;
  en: string;
};

export type StoryPhrase = {
  phrase: string;
  timeStart: number;
  timeEnd: number;
};
