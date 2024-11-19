"use client";
import React from "react";
import { DicesIcon } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { createCharacterConvoSession } from "@/services/api/modes/character-convo";
import { CharacterConvoSession, CharacterConvoSessionCreate } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { sessionAtom } from "@/components/atoms";
import { useUser } from "@stackframe/stack";

export default async function RollCharacter() {
  const [session, setSession] = useAtom(sessionAtom);
  const user = useUser({ or: "redirect" });

  const createSession = useMutation({
    mutationFn: async (params: CharacterConvoSessionCreate) =>
      await createCharacterConvoSession(params),
    onSuccess: (data: CharacterConvoSession) => {
      setSession(data);
    },
  });

  const handleRoll = async () => {
    const { accessToken } = await user.getAuthJson();
    const payload = {
      access_token: accessToken!,
      language: user.clientMetadata?.onboardingData?.toLang.key || "en-US",
      difficulty:
        user.clientMetadata?.onboardingData?.difficulty.name || "Super Easy",
    };
    createSession.mutate(payload);
  };

  const handleLetsGo = () => {
    if (!session) return;
    setSession({ ...session, voice_chat_view: true });
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <Button
        className="w-fit"
        color="primary"
        onClick={handleRoll}
        isLoading={createSession.isPending}
        endContent={<DicesIcon />}
        size="lg"
      >
        {createSession.isSuccess && "Re-"}Roll
      </Button>

      {createSession.isSuccess && session && (
        <div className="h-full w-full flex justify-center items-center">
          <Card className="max-w-sm">
            <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">
                {session.character.name}
              </p>
              <small className="text-default-500">
                {session.character.description}
              </small>
            </CardHeader>
            <CardBody className="overflow-visible py-2 pb-0 flex flex-col gap-3">
              <p className="text-default-500 text-sm">
                Alice is waiting for the bus to go to home. Start by asking her
                about her day.
              </p>
              <Image
                alt="Card background"
                className="object-cover rounded-xl w-full aspect-video"
                src={
                  session.image ||
                  "https://nextui.org/images/hero-card-complete.jpeg"
                }
              />
            </CardBody>
            <CardFooter className="flex justify-end">
              <Button onClick={handleLetsGo} className="w-full" color="primary">
                Let&apos;s go!
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
