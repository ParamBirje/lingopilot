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

  voice_chat_view?: boolean; // for frontend use
};
