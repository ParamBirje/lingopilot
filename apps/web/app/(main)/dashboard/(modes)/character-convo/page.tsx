import React from "react";
import { subtitle, title } from "@/components/primitives";
import { Marquee } from "@/components/ui/marquee";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";

export default function Page() {
  const characters = [
    { key: "1", name: "Alice", role: "Friend", scene: "Bus Stop" },
    { key: "2", name: "Bob", role: "Barista", scene: "Coffee Shop" },
    { key: "3", name: "Charlie", role: "Student", scene: "Library" },
    { key: "4", name: "Diana", role: "Friend", scene: "Park" },
    { key: "5", name: "Eve", role: "Stranger", scene: "Beach" },
  ];

  return (
    <div className="flex flex-col gap-12">
      <div className="text-center">
        <h1 className={title()}>Character Convo</h1>
        <p className={subtitle()}>
          Practice your conversational skills with different characters in
          various scenes.
        </p>
      </div>

      <div>
        <Marquee className="[--duration:20s]">
          {characters.map((character) => (
            <Card key={character.key}>
              <CardHeader>
                <div className="flex flex-col">
                  <p className="text-md">{character.name}</p>
                  <p className="text-small text-default-500">
                    {character.role}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>
                  You are at the {character.scene} with {character.name}.
                </p>
              </CardBody>
            </Card>
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background" />
      </div>

      <div className="h-full w-full flex justify-center items-center">
        <Card className="max-w-sm">
          <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Alice</p>
            <small className="text-default-500">At the Bus Stop</small>
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
            <Button className="w-full" color="primary">
              Let&apos;s go!
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
