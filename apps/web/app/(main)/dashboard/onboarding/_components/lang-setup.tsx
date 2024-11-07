"use client";
import React from "react";

import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import { LanguagesIcon } from "lucide-react";
import { Language } from "@/types";
import { useSetAtom } from "jotai";
import { onboardingAtom } from "@/components/atoms";

export default function LanguageSetup({
  fromLang,
  toLang,
}: {
  fromLang: Language[];
  toLang: Language[];
}) {
  const setOnboarding = useSetAtom(onboardingAtom);

  return (
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
          onSelectionChange={(keys) => {
            let selectedKey = keys.currentKey;
            setOnboarding((prev) => ({
              ...prev,
              fromLang: fromLang.find((lang) => lang.key === selectedKey),
            }));
          }}
        >
          {fromLang.map((lang) => (
            <SelectItem key={lang.key} startContent={lang.flag}>
              {lang.name}
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
          onSelectionChange={(keys) => {
            let selectedKey = keys.currentKey;
            setOnboarding((prev) => ({
              ...prev,
              toLang: toLang.find((lang) => lang.key === selectedKey),
            }));
          }}
        >
          {toLang.map((lang) => (
            <SelectItem key={lang.key} startContent={lang.flag}>
              {lang.name}
            </SelectItem>
          ))}
        </Select>
      </CardBody>
    </Card>
  );
}
