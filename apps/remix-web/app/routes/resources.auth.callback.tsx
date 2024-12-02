import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { siteConfig } from "~/lib/siteConfig";
import { getSupabaseWithHeaders } from "~/lib/supabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next =
    requestUrl.searchParams.get("next") || siteConfig.links.dashboard;

  if (code) {
    const { headers, supabase } = getSupabaseWithHeaders({
      request,
    });

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    console.log("Error: auth callback ", error);

    if (!error) {
      return redirect(next, { headers });
    }
  }

  // return the user to an error page with instructions
  return redirect(siteConfig.links.signin);
}

function AuthCallback() {
  return <></>;
}

export default AuthCallback;
