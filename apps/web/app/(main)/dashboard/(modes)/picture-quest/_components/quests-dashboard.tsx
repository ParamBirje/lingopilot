"use client";

import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { subtitle, title } from "@/components/primitives";
import { useQuery } from "@tanstack/react-query";
import { getPreviousQuests } from "@/services/api/modes/picture-quest";
import { pictureQuestAtom } from "@/components/atoms";
import { useSetAtom } from "jotai";
import PlayModal from "./play-modal";
import Spinner from "@/components/spinner";
import { useUser } from "@stackframe/stack";

export default async function PictureQuestsDashboard() {
  const user = useUser({ or: "redirect" });
  const setSession = useSetAtom(pictureQuestAtom);

  const {
    data: previousQuests,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["previous-quests"],
    queryFn: async () => {
      const { accessToken } = await user.getAuthJson();
      return await getPreviousQuests(accessToken!);
    },
  });

  if (isError) return <p>Something went wrong. Try again?</p>;
  if (isLoading) return <Spinner />;

  return (
    <div className="w-full px-4 flex flex-col gap-8">
      <div>
        <h1 className={title({ class: "text-left" })}>Picture Quest</h1>
        <p className={subtitle()}>
          Answer questions based on a random picture.
        </p>
      </div>

      <PlayModal />

      <h3 className={subtitle({ class: "text-left" })}>Previous Quests</h3>

      <div className="gap-x-4 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {previousQuests?.map((quest) => (
          <Card
            onClick={() => setSession(quest)}
            key={quest.id}
            isPressable
            isFooterBlurred
            radius="lg"
            className="border-none md:w-[200px]"
          >
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={200}
              src={quest.image}
              width={200}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-medium text-center text-white/80">
                {quest.title}
              </p>
              <div />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
