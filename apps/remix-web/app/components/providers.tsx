import { NextUIProvider } from "@nextui-org/react";
import { useHref, useNavigate } from "@remix-run/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <NextUIProvider navigate={navigate} useHref={useHref}>
        {children}
      </NextUIProvider>
    ); // Render children without ThemeProvider during SSR
  }
  
  return (
    <NextUIProvider navigate={navigate} useHref={useHref}>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
