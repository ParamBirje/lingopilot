import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { useOutletContext } from "@remix-run/react";
import { LogInIcon } from "lucide-react";
import Logo from "~/components/logo";
import { SupabaseOutletContext } from "~/types";

function Login() {
  const { supabase } = useOutletContext<SupabaseOutletContext>();

  async function handleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/resources/auth/callback`,
      },
    });

    if (error) {
      console.error("Error signing in", error);
      return;
    }
  }

  return (
    <div className="flex flex-col gap-10 min-h-screen w-full items-center justify-center">
      <Logo />

      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <p className="pb-2 text-xl font-medium">Log In</p>
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleSignIn}
            startContent={<LogInIcon size={16} />}
            variant="shadow"
            color="primary"
          >
            Continue with Google
          </Button>
        </div>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">NOTE</p>
          <Divider className="flex-1" />
        </div>
        <p className="text-center text-small text-default-500">
          We will automatically create an account for you if it&apos;s your
          first time logging in!
        </p>
      </div>
    </div>
  );
}

export default Login;
