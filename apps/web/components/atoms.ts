import { CharacterConvoSession, UserOnboarding } from "@/types";
import { atom } from "jotai";

export const sessionAtom = atom<CharacterConvoSession>();
export const onboardingAtom = atom<UserOnboarding>({});
