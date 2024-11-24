"use client";

import CharacterSelector from "./_components/selector";
import VoiceChat from "./_components/voice-chat";
import { sessionAtom } from "@/components/atoms";
import { useAtomValue } from "jotai";

export default async function Page() {
  const session = useAtomValue(sessionAtom);

  if (session?.voice_chat_view) {
    return <VoiceChat />;
  } else {
    return <CharacterSelector />;
  }
}
