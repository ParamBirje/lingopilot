"use server";

import { siteConfig } from "@/config/site";
import { stackServerApp } from "@/stack";
import { redirect } from "next/navigation";

export async function ServerCheckOnboarded() {
  const user = await stackServerApp.getUser({ or: "redirect" });
  if (!user.clientMetadata?.onboarded) {
    redirect(siteConfig.links.onboarding);
  }

  return {
    user,
    onboarded: user.clientMetadata?.onboarded,
    onboardingData: user.clientMetadata?.onboardingData,
  };
}
