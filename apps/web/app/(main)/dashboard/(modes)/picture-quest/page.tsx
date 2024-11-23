"use client";

import { pictureQuestAtom } from "@/components/atoms";
import { useAtomValue } from "jotai";
import PictureQuestsDashboard from "./_components/quests-dashboard";
import QuestPlay from "./_components/quest-play";
import QuestResults from "./_components/quest-results";

export default async function Page() {
  const session = useAtomValue(pictureQuestAtom);

  if (!session) {
    return <PictureQuestsDashboard />;
  } else if (session.ended) {
    return <QuestResults />;
  } else {
    return <QuestPlay />;
  }
}
