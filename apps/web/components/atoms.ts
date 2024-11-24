"use client";
import {
  CharacterConvoSession,
  PictureQuestSession,
  UserOnboarding,
} from "@/types";
import { atom } from "jotai";

export const sessionAtom = atom<CharacterConvoSession>();
export const onboardingAtom = atom<UserOnboarding>({});
export const pictureQuestAtom = atom<PictureQuestSession>();
