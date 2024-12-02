import { User } from "@supabase/supabase-js";
import { TypedSupabaseClient } from "./lib/supabase";

export type SupabaseOutletContext = {
  supabase: TypedSupabaseClient;
};

export type SupabaseUserOutletContext = SupabaseOutletContext & {
  user: User;
};

// API types

export type Language = {
  id: number;
  type?: string;
  flag: string;
  isDisabled: boolean;
  key: string;
  name: string;
};

export type Difficulty = {
  id: number;
  emoji: string;
  label: string;
};

export type UserOnboarding = {
  fromLang?: Language;
  toLang?: Language;
  difficulty?: Difficulty;
};
