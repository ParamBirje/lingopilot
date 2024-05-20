"use client";

export default function Page() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl">
        Voice Engine
      </h1>

      {/* Visualizer */}
      <div className="h-[60vh] w-full rounded-md bg-base-200" />

      <div>
        <h3 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
          Transcript
        </h3>

        <p>This is where the transcript of what lingopilot is saying.</p>
      </div>
    </main>
  );
}
