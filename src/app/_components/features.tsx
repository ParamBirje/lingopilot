import React from "react";

export default function Features() {
  return (
    <div className="flex flex-col gap-12 rounded-md bg-base-content px-10 py-12 text-base-100">
      <div className="flex flex-col gap-5">
        <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Your language learning copilot.
        </h2>
        <p className="w-[40%] tracking-wide">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quia ad
          libero hic provident alias minima corrupti!
        </p>
      </div>

      <div className="flex gap-3">
        <div className="flex h-80 w-full items-center justify-center rounded-md border border-base-200 border-opacity-40 duration-150 hover:border-opacity-100">
          <p>feature1</p>
        </div>
        <div className="flex h-80 w-full items-center justify-center rounded-md border border-base-200 border-opacity-40 duration-150 hover:border-opacity-100">
          <p>feature2</p>
        </div>
        <div className="flex h-80 w-full items-center justify-center rounded-md border border-base-200 border-opacity-40 duration-150 hover:border-opacity-100">
          <p>feature3</p>
        </div>
      </div>
    </div>
  );
}
