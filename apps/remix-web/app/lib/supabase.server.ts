import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";

export const getSupabaseEnv = () => ({
  SUPABASE_URL: process.env.SUPABASE_URL!,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
});

export function getSupabaseWithHeaders({ request }: { request: Request }) {
  const headers = new Headers();

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "");
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            headers.append(
              "Set-Cookie",
              serializeCookieHeader(name, value, options)
            )
          );
        },
      },
    }
  );

  return { supabase, headers };
}

export async function getSupabaseWithUserSessionAndHeaders({
  request,
}: {
  request: Request;
}) {
  const { supabase, headers } = getSupabaseWithHeaders({
    request,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { user, headers, supabase, serverSession: session };
}

export async function getSupabaseSessionAndHeaders({
  request,
}: {
  request: Request;
}) {
  const { supabase, headers } = getSupabaseWithHeaders({
    request,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { headers, supabase, serverSession: session };
}