import Navbar from "@/components/ui/navbar";
import Hero from "./_components/hero";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-5">
      <Navbar />

      <Hero />
    </main>
  );
}
