import { Redo } from "lucide-react";
import React from "react";

export default function Problem() {
  return (
    <div className="flex flex-col gap-5 py-28 text-center">
      <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
        This is the consequence of not having a conversation partner.
      </h2>

      <p className="mx-auto w-2/4 text-lg tracking-wide">
        A fully interactive voice-enabled A.I language speaking assistant that
        refines & tones your language skills. Lorem ipsum dolor sit amet.
      </p>

      <div className="mx-auto mt-10 flex w-2/3 items-center justify-center gap-10 text-sm">
        <div className="flex w-full flex-col items-center gap-5">
          <p className="text-4xl">🙇</p>
          <p className="font-semibold">Step1 of something you do.</p>
        </div>

        <Redo className="w-full opacity-50" size={50} />

        <div className="flex w-full flex-col items-center gap-5">
          <p className="text-4xl">🥱</p>
          <p className="font-semibold">step2 of something you do.</p>
        </div>

        <Redo className="w-full opacity-50" size={50} />

        <div className="flex w-full flex-col items-center gap-5">
          <p className="text-4xl">😥</p>
          <p className="font-semibold">Step3 failure.</p>
        </div>
      </div>
    </div>
  );
}
