import { Languages } from "lucide-react";
import React from "react";

export default function CTA() {
  return (
    <div className="my-10 flex justify-between rounded-md bg-base-content px-10 py-8 text-white">
      <div className="flex flex-col gap-7">
        <div className="w-fit rounded-full bg-[#c989ac] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
          The language learning copilot
        </div>

        <h3 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
          Stop juggling and <br />
          focus on what matters.
        </h3>

        <ul className="mx-5 list-disc">
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
        </ul>
      </div>

      <div className="flex w-1/3 flex-col items-center justify-between">
        <Languages size={140} />
        <button className="btn-base-200 btn w-full">Get LingoPilot</button>
      </div>
    </div>
  );
}
