import Navbar from "@/components/ui/navbar";
import Hero from "./_components/hero";
import Problem from "./_components/problem";
import Features from "./_components/features";
import FAQs from "./_components/faq";
import Pricing from "./_components/pricing";
import CTA from "./_components/cta";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-5 py-5">
      <Navbar />

      <Hero />

      {/* Video/Screenshot placeholder */}
      <div className="h-[60vh] w-full rounded-md bg-base-200" />

      <Problem />

      <Features />

      <Pricing />

      <FAQs />

      <CTA />
    </main>
  );
}
