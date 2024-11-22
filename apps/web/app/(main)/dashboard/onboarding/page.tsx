import React from "react";
import { title } from "@/components/primitives";
import LanguageSetup from "./_components/lang-setup";
import DifficultySetup from "./_components/difficulty-setup";
import { getFromLanguages, getToLanguages } from "@/services/api/languages";
import { getAvailableDifficulty } from "@/services/api/difficulty";
import { stackServerApp } from "@/stack";
import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site";

export default async function Page() {
  const user = await stackServerApp.getUser({ or: "redirect" });
  if (user.clientMetadata?.onboarded) {
    redirect(siteConfig.links.dashboard);
  }

  let fromLang = await getFromLanguages();
  let toLang = await getToLanguages();
  let difficulty = await getAvailableDifficulty();

  return (
    <div className="flex flex-col gap-8 items-center">
      <h1 className={title()}>Onboarding</h1>

      <LanguageSetup fromLang={fromLang} toLang={toLang} />
      <DifficultySetup difficulty={difficulty} />
    </div>
  );
}
