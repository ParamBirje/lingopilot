"use client";

import React from "react";
import { title } from "@/components/primitives";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import { GaugeIcon, HeartIcon, LanguagesIcon } from "lucide-react";

export default function Page() {
  const fromLang = [
    {
      key: "en",
      flag: "🇬🇧",
      label: "English",
      isDisabled: false,
    },
  ];

  const toLang = [
    {
      key: "de",
      flag: "🇩🇪",
      label: "German",
      isDisabled: false,
    },
    {
      key: "en",
      flag: "🇬🇧",
      label: "English",
      isDisabled: false,
    },
    {
      key: "es",
      flag: "🇪🇸",
      label: "Spanish",
      isDisabled: true,
    },
    {
      key: "fr",
      flag: "🇫🇷",
      label: "French",
      isDisabled: true,
    },
    {
      key: "it",
      flag: "🇮🇹",
      label: "Italian",
      isDisabled: true,
    },
  ];

  const difficulty = [
    {
      key: "super-easy",
      emoji: "🤗",
      label: "Super Easy",
    },
    {
      key: "easy",
      emoji: "😊",
      label: "Easy",
    },
    {
      key: "intermediate",
      emoji: "😌",
      label: "Intermediate",
    },
    {
      key: "fluent",
      emoji: "😎",
      label: "Fluent",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <h1 className={title()}>Onboarding</h1>

      <Card className="max-w-xl">
        <CardHeader className="flex gap-3">
          <Button disabled isIconOnly color="danger">
            <LanguagesIcon />
          </Button>
          <div className="flex flex-col">
            <p className="text-md">Language Setup</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="py-5 px-3 flex flex-col gap-4">
          <p className="text-default-500 text-sm">
            This will be the language that will be used to teach you the new
            language.
          </p>

          <Select
            disabledKeys={toLang
              .filter((lang) => lang.isDisabled)
              .map((lang) => lang.key)}
            label="Language You Speak"
            placeholder="Select here"
          >
            {fromLang.map((lang) => (
              <SelectItem key={lang.key} startContent={lang.flag}>
                {lang.label}
              </SelectItem>
            ))}
          </Select>

          <Divider />

          <p className="text-default-500 text-sm">
            This will be the language that will be taught to you.
          </p>

          <Select
            disabledKeys={toLang
              .filter((lang) => lang.isDisabled)
              .map((lang) => lang.key)}
            label="Language You Want to Learn"
            placeholder="Select here"
          >
            {toLang.map((lang) => (
              <SelectItem key={lang.key} startContent={lang.flag}>
                {lang.label}
              </SelectItem>
            ))}
          </Select>
        </CardBody>
      </Card>

      <Card className="max-w-xl">
        <CardHeader className="flex gap-3">
          <Button disabled isIconOnly color="warning">
            <GaugeIcon />
          </Button>

          <div className="flex flex-col">
            <p className="text-md">Difficulty</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="py-5 px-3 flex flex-col gap-4">
          <Select aria-label="difficulty" placeholder="Select here">
            {difficulty.map((lang) => (
              <SelectItem key={lang.key} startContent={lang.emoji}>
                {lang.label}
              </SelectItem>
            ))}
          </Select>

          <p className="text-default-500 text-sm">
            You can change the difficulty level at any time in the settings.
          </p>
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-end">
          <Button color="primary" variant="solid">
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
