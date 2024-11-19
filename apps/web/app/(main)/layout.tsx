import { Navbar } from "@/components/navbar/navbar";
import { Link } from "@nextui-org/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://parameater.co/"
        >
          <span className="text-default-600">Built with ❤️ by</span>
          <p className="text-primary">Param Birje</p>
        </Link>
      </footer>
    </div>
  );
}
