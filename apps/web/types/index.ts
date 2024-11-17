import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
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

// Modes

export type Mode = "CHARACTER_CONVO" | "PICTURE_QUEST";

export type CharacterConvoSessionCreate = {
  language: string;
  difficulty: string;
};

export type CharacterConvoSession = CharacterConvoSessionCreate & {
  character: Character;
  session_id: number;
  image: string | null;

  voice_chat_view?: boolean; // for frontend use
};

export type PictureQuestSessionCreate = {
  topic: string;
};

export type PictureQuestSession = {
  id: number;
  image: string;
  title: string;
  ended: boolean | null;
  questions?: PictureQuestQuestion[];
};

export type PictureQuestAnswerUpdate = {
  question_id: number;
  answer: string;
};

export type PictureQuestQuestionCreate = {
  session_id: number;
  num_questions: number;
};

export type PictureQuestQuestion = {
  id: number;
  title: string;
  image: string;
  answer?: string;
  expected_answer?: string;
  reason?: string;
  verified?: boolean;
};
