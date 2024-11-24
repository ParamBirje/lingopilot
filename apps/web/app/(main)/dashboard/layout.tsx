import { Toaster } from "sonner";

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 py-8 md:py-10">
      <Toaster theme="dark" position="bottom-right" richColors />
      <div className="inline-block w-full max-w-5xl mx-auto justify-center">
        {children}
      </div>
    </section>
  );
}
