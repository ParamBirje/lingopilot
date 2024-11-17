"use client";

import { pictureQuestAtom } from "@/components/atoms";
import { useAtom, useAtomValue } from "jotai";
import PictureQuestsDashboard from "./_components/quests-dashboard";
import QuestPlay from "./_components/quest-play";
import { useUser } from "@stackframe/stack";

export default async function Page() {
  const session = useAtomValue(pictureQuestAtom);

  const user = useUser({ or: "redirect" });
  const { accessToken } = await user.getAuthJson();

  if (!session) {
    return <PictureQuestsDashboard accessToken={accessToken!} />;
  } else if (session.ended) {
    return <p>Session ended</p>;
  } else {
    return <QuestPlay accessToken={accessToken!} />;
  }
}
