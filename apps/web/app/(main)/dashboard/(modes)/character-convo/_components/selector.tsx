"use client";

import { subtitle, title } from "@/components/primitives";
import { Marquee } from "@/components/ui/marquee";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import {
  Character,
  CharacterConvoSession,
  CharacterConvoSessionCreate,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCharacters } from "@/services/api/characters";
import { createCharacterConvoSession } from "@/services/api/modes/character-convo";
import { useEffect, useState } from "react";
import { DicesIcon } from "lucide-react";

export default async function CharacterSelector({
  accessToken,
  session,
  setSession,
}: {
  accessToken: string;
  session: CharacterConvoSession;
  setSession: (session: CharacterConvoSession) => void;
}) {
  const {
    data: characters,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["characters"],
    queryFn: async () => await getCharacters(accessToken),
  });

  const createSession = useMutation({
    mutationFn: async (params: CharacterConvoSessionCreate) =>
      await createCharacterConvoSession(accessToken, params),
    onSuccess: (data: CharacterConvoSession) => {
      setSession(data);
    },
  });

  const handleRoll = () => {
    // TODO: take this from user settings
    createSession.mutate({
      language: "English",
      difficulty: "Super Easy",
    });
  };

  const handleLetsGo = () => {
    setSession({ ...session, voice_chat_view: true });
  };

  if (isError) return <p>Something went wrong. Try again?</p>;

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="text-center">
        <h1 className={title()}>Character Convo</h1>
        <p className={subtitle()}>
          Practice your conversational skills with different characters in
          various scenes.
        </p>
      </div>

      <div className="relative">
        <Marquee className={`[--duration:10s]`}>
          {characters?.map((character: Character) => (
            <Card className="w-[230px]" key={character.id}>
              <CardHeader className="flex items-center gap-3">
                <Image
                  alt="Character"
                  className="rounded-full w-12 h-12 object-cover"
                  src={character.image}
                />
                <div className="flex flex-col">
                  <p className="text-md">{character.name}</p>
                  <p className="text-small text-default-500">
                    {character.relation}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>{character.description}</p>
              </CardBody>
            </Card>
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background" />
      </div>

      <Button
        className="w-fit"
        color="primary"
        onClick={handleRoll}
        endContent={<DicesIcon />}
        size="lg"
      >
        {createSession.isSuccess && "Re-"}Roll
      </Button>

      {createSession.isSuccess && (
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
                className="object-cover rounded-xl w-full"
                src="https://nextui.org/images/hero-card-complete.jpeg"
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
