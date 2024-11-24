"use client";

import { siteConfig } from "@/config/site";
import { UserOnboarding } from "@/types";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";

export const useOnboarded = () => {
  const user = useUser({ or: "redirect" });
  const router = useRouter();
  if (!user.clientMetadata?.onboarded) {
    router.push(siteConfig.links.onboarding);
  }

  return {
    user,
    onboarded: user.clientMetadata?.onboarded as boolean,
    onboardingData: user.clientMetadata?.onboardingData as UserOnboarding,
  };
};
