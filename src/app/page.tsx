import Hero from "./_components/hero";
import Problem from "./_components/problem";
import Features from "./_components/features";
import FAQs from "./_components/faq";
import Pricing from "./_components/pricing";
import CTA from "./_components/cta";

export default function HomePage() {
  return (
    <>
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-10 py-5">
        <Hero />

        {/* Video/Screenshot placeholder */}
        <div className="mt-5 h-[60vh] w-full rounded-md bg-slate-200" />

        <Problem />

        <Features />

        <Pricing />

        <FAQs />

        <CTA />
      </main>
    </>
  );
}
