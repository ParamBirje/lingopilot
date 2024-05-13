import Navbar from "@/components/ui/navbar";
import Hero from "./_components/hero";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-5 py-5">
      <Navbar />

      <Hero />

      {/* Video/Screenshot placeholder */}
      <div className="bg-base-200 h-[60vh] w-full rounded-md" />
    </main>
  );
}
