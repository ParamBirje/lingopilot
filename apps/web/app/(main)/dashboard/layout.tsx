export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 py-8 md:py-10">
      <div className="inline-block max-w-5xl mx-auto justify-center">
        {children}
      </div>
    </section>
  );
}