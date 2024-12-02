import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, redirect } from "@remix-run/react";
import { LandingNavbar } from "~/components/navbar";
import { siteConfig } from "~/lib/siteConfig";
import { getSupabaseWithUserSessionAndHeaders } from "~/lib/supabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { headers, user } = await getSupabaseWithUserSessionAndHeaders({
    request,
  });

  if (user) {
    throw redirect(siteConfig.links.dashboard, { headers });
  }

  return {
    success: true,
    headers,
  };
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <LandingNavbar />
      <Outlet />
    </div>
  );
}
