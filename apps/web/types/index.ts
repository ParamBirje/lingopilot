import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
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

export type CharacterConvoSessionCreate = {
  language: string;
  difficulty: string;
};

export type CharacterConvoSession = CharacterConvoSessionCreate & {
  character: Character;
  session_id: string;
  image: string | null;

  voice_chat_view?: boolean; // for frontend use
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
