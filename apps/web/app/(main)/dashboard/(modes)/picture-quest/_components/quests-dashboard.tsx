"use client";

import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { subtitle, title } from "@/components/primitives";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/button";
import { PlayIcon } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createPictureQuestSession,
  getPreviousQuests,
} from "@/services/api/modes/picture-quest";
import { PictureQuestSession, PictureQuestSessionCreate } from "@/types";
import { pictureQuestAtom } from "@/components/atoms";
import { useAtom } from "jotai";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import PlayModal from "./modal";

export default async function PictureQuestsDashboard({
  accessToken,
}: {
  accessToken: string;
}) {
  const [session, setSession] = useAtom(pictureQuestAtom);
  const [topic, setTopic] = useState<string>("");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const {
    data: previousQuests,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["previous-quests"],
    queryFn: async () => await getPreviousQuests(accessToken),
  });

  const createSession = useMutation({
    mutationFn: async (params: PictureQuestSessionCreate) =>
      await createPictureQuestSession(accessToken, params),
    onSuccess: (data: PictureQuestSession) => {
      setSession(data);
      setTopic("");
      onClose();
    },
  });

  function handleSessionCreate() {
    if (!topic) return;
    createSession.mutate({ topic: topic });
  }

  if (isError) return <p>Something went wrong. Try again?</p>;

  return (
    <div className="w-full px-8 flex flex-col gap-8">
      <div>
        <h1 className={title({ class: "text-left" })}>Picture Quest</h1>
        <p className={subtitle()}>
          Answer questions based on a random picture.
        </p>
      </div>

      <Button
        className="w-fit"
        color="primary"
        size="lg"
        startContent={<PlayIcon size={24} />}
        onClick={onOpen}
      >
        Start Quest
      </Button>

      <h3 className={subtitle({ class: "text-left" })}>Previous Quests</h3>

      <div className="gap-x-4 gap-y-8 grid grid-cols-1 md:grid-cols-3 place-items-center">
        {previousQuests?.map((quest) => (
          <Card
            onClick={() => setSession(quest)}
            key={quest.id}
            isPressable
            isFooterBlurred
            radius="lg"
            className="border-none w-[200px]"
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
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <PlayModal
        topic={topic}
        setTopic={setTopic}
        onSuccess={handleSessionCreate}
        isButtonLoading={createSession.isPending}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
