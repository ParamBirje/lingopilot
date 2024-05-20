"use client";

import { Mic, MicOff } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [isMicOn, setIsMicOn] = useState(false);

  function handleMicClick() {
    setIsMicOn((prev) => !prev);
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10">
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
        Voice Engine
      </h1>

      <div className="flex gap-10">
        <div className="h-[50vh] w-1/2 rounded-md bg-slate-300">
          {/* Visualizer */}
          <div className="h-[80%] rounded-t-md bg-slate-200"></div>

          <div className="flex h-[20%] items-center justify-end gap-3 p-5">
            <button
              onClick={handleMicClick}
              className={`btn btn-circle btn-outline h-fit ${isMicOn && "bg-neutral text-white"}`}
            >
              {isMicOn ? <Mic size={25} /> : <MicOff size={25} />}
            </button>
          </div>
        </div>

        <div className="flex w-1/2 flex-col gap-5">
          <h3 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-3xl">
            Transcript
          </h3>

          <div>
            <p>This is where the transcript of what lingopilot is saying.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
