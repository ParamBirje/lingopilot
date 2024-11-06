"use client";

import { CharacterConvoSession } from "@/types";
import CharacterSelector from "./_components/selector";
import VoiceChat from "./_components/voice-chat";
import { useState } from "react";
import { useUser } from "@stackframe/stack";

export default async function Page() {
  const [session, setSession] = useState<CharacterConvoSession>();

  const user = useUser({ or: "redirect" });
  const { accessToken } = await user.getAuthJson();

  if (session?.voice_chat_view) {
    return <VoiceChat />;
  } else {
    return (
      <CharacterSelector
        session={session!}
        setSession={setSession}
        accessToken={accessToken!}
      />
    );
  }
}
