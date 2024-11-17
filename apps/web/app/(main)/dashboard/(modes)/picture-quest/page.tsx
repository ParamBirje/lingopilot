"use client";

import { pictureQuestAtom } from "@/components/atoms";
import { useAtomValue } from "jotai";
import PictureQuestsDashboard from "./_components/quests-dashboard";
import QuestPlay from "./_components/quest-play";
import { useUser } from "@stackframe/stack";
import QuestResults from "./_components/quest-results";

export default async function Page() {
  const session = useAtomValue(pictureQuestAtom);

  const user = useUser({ or: "redirect" });
  const { accessToken } = await user.getAuthJson();

  if (!session) {
    return <PictureQuestsDashboard accessToken={accessToken!} />;
  } else if (session.ended) {
    return <QuestResults accessToken={accessToken!} />;
  } else {
    return <QuestPlay accessToken={accessToken!} />;
  }
}
