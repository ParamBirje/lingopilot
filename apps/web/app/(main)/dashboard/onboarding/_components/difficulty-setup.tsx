"use client";
import React from "react";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import { GaugeIcon } from "lucide-react";
import { Difficulty } from "@/types";
import { onboardingAtom } from "@/components/atoms";
import { useAtom } from "jotai";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";

export default function DifficultySetup({
  difficulty,
}: {
  difficulty: Difficulty[];
}) {
  const [onboarding, setOnboarding] = useAtom(onboardingAtom);
  const user = useUser({ or: "redirect" });
  const router = useRouter();

  async function handleSave() {
    // TODO: show toast
    if (!onboarding?.fromLang) return;
    if (!onboarding?.toLang) return;
    if (!onboarding?.difficulty) return;

    await user.update({
      clientMetadata: {
        onboardingData: onboarding,
        onboarded: true,
      },
    });
    router.push(siteConfig.links.dashboard);
  }

  return (
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
        <Select
          aria-label="difficulty"
          placeholder="Select here"
          selectionMode="single"
          onSelectionChange={(keys) => {
            let selectedKey = Number(keys.currentKey);
            setOnboarding((prev) => ({
              ...prev,
              difficulty: difficulty.find((diff) => diff.id === selectedKey),
            }));
          }}
        >
          {difficulty.map((diff) => (
            <SelectItem key={diff.id} startContent={diff.emoji}>
              {diff.label}
            </SelectItem>
          ))}
        </Select>

        <p className="text-default-500 text-sm">
          You can change the difficulty level at any time in the settings.
        </p>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-end">
        <Button onClick={handleSave} color="primary" variant="solid">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
