import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { siteConfig } from "~/lib/siteConfig";
import { useSupabase } from "~/lib/supabase";
import {
  getSupabaseEnv,
  getSupabaseWithUserSessionAndHeaders,
} from "~/lib/supabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { serverSession, user, headers } =
    await getSupabaseWithUserSessionAndHeaders({ request });

  if (user) {
    throw redirect(siteConfig.links.dashboard, { headers });
  }

  return {
    env: getSupabaseEnv(),
    serverSession,
    headers,
  };
}

export default function Auth() {
  const { env, serverSession } = useLoaderData<typeof loader>();
  const { supabase } = useSupabase({ env, session: serverSession });

  return (
    <div className="min-h-screen">
      <Outlet context={{ supabase }} />
    </div>
  );
}
