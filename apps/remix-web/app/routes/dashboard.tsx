import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { DashboardNavbar } from "~/components/navbar";
import { siteConfig } from "~/lib/siteConfig";
import { useSupabase } from "~/lib/supabase";
import {
  getSupabaseEnv,
  getSupabaseWithUserSessionAndHeaders,
} from "~/lib/supabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { serverSession, headers, user } =
    await getSupabaseWithUserSessionAndHeaders({ request });

  if (!user) {
    throw redirect(siteConfig.links.signin);
  }

  if (!user.user_metadata?.onboarding) {
    throw redirect(siteConfig.links.onboarding);
  }

  return {
    env: getSupabaseEnv(),
    serverSession,
    headers,
    user,
  };
}

export default function Dashboard() {
  const { env, serverSession, user } = useLoaderData<typeof loader>();
  const { supabase } = useSupabase({ env, session: serverSession });

  return (
    <div className="min-h-screen">
      <DashboardNavbar />
      <div className="max-w-5xl px-2 py-4 mx-auto pt-10">
        <Outlet context={{ supabase, user }} />
      </div>
    </div>
  );
}
