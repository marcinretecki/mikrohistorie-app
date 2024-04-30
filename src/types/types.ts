import { SupabaseClient } from "@supabase/supabase-js";

import { Tables, Database } from "./supabase";

export type TypedSupabaseClient = SupabaseClient<Database>;

export type User = Tables<"profiles">;

export type Stories = Story[];

export type Settings = Tables<"settings">;

export type Progress = Tables<"progress">;

export type Story = Omit<Tables<"stories">, "translations"> & {
  translations: Translations;
};

export type StoryVersion = Omit<Tables<"versions">, "phrases"> & {
  phrases: StoryPhrase[];
};
export type Translations = {
  pl: string;
  en?: string;
};

export type StoryPhrase = {
  phrase: string;
  timeStart: number;
  timeEnd: number;
};

export type Indicator = {
  time: number;
  wordCount: number;
  step: 0 | 1 | 2 | 3;
};
