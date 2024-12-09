import { User } from "@supabase/supabase-js";
import { TypedSupabaseClient } from "./lib/supabase";

export type SupabaseOutletContext = {
  supabase: TypedSupabaseClient;
};

export type SupabaseUserOutletContext = SupabaseOutletContext & {
  user: User;
};

// API types

export type AccessToken = {
  accessToken: string;
};

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

export type Character = {
  id: number;
  name: string;
  description: string; // location
  meta: string; // character personality
  relation: string;
  image?: string;
  voice_name: string;
  voice_engine: string;
};

export type ConversationMessage = {
  role: "user" | "assistant";
  content: string;
};

// Mode: Character Convo

export type CharacterConvoSessionCreate = {
  language: string;
  difficulty: string;
} & AccessToken;

export type CharacterConvoSession = CharacterConvoSessionCreate & {
  session_id: number;
  character: Character;
  image: string | null;
};