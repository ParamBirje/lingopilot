import { createBrowserClient } from "@supabase/ssr";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useRevalidator } from "@remix-run/react";

export type TypedSupabaseClient = SupabaseClient;

type SupabaseEnv = {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
};

type UseSupabase = {
  env: SupabaseEnv;
  session: Session | null;
};

export const useSupabase = ({ env, session }: UseSupabase) => {
  // Singleton
  const [supabase] = useState(() =>
    createBrowserClient(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!)
  );
  const revalidator = useRevalidator();

  const serverAccessToken = session?.access_token;

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event happened: ", event, session);

      if (session?.access_token !== serverAccessToken) {
        console.log("Access token changed, revalidating");
        revalidator.revalidate(); // call loaders
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, serverAccessToken, revalidator]);

  return { supabase };
};
