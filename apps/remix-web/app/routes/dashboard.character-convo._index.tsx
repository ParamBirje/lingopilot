import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { DicesIcon } from "lucide-react";
import { subtitle, title } from "~/components/primitives";
import { Marquee } from "~/components/ui/marquee";
import { siteConfig } from "~/lib/siteConfig";
import {
  getSupabaseSessionAndHeaders,
  getSupabaseWithUserSessionAndHeaders,
} from "~/lib/supabase.server";
import { getCharacters } from "~/services/api/characters";
import { createCharacterConvoSession } from "~/services/api/modes/character-convo";
import { CharacterConvoSession, CharacterConvoSessionCreate } from "~/types";

export async function action({ request }: ActionFunctionArgs) {
  // TODO: can get diff and lang from user metadata in fastapi backend itself
  const { user } = await getSupabaseWithUserSessionAndHeaders({
    request,
  });

  const formData = await request.formData();
  const params = {
    accessToken: formData.get("accessToken") as string,
    difficulty: user?.user_metadata?.onboarding?.difficulty?.label,
    language: user?.user_metadata?.onboarding?.toLang?.key,
  };

  const session = await createCharacterConvoSession(params as CharacterConvoSessionCreate);
  return session;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { serverSession } = await getSupabaseSessionAndHeaders({
    request,
  });

  const characters = await getCharacters(serverSession?.access_token as string);

  return {
    characters,
    accessToken: serverSession?.access_token as string,
  };
}

export default function CharacterConvo() {
  const { characters, accessToken } = useLoaderData<typeof loader>();

  const fetcher = useFetcher();
  const session = fetcher.data as CharacterConvoSession;
  const isRolling = fetcher.state === "loading" || fetcher.state === "submitting";

  function handleRoll() {
    const formData = new FormData();
    formData.append("accessToken", accessToken);
    fetcher.submit(formData, { method: "POST" });
  }

  function handleLetsGo() {
    console.log("Let's go!");
  }

  return (
    <div className="max-w-full px-4 flex flex-col items-center gap-10">
      <div className="w-full text-center">
        <h1 className={title()}>Character Convo</h1>
        <p className={subtitle()}>
          Practice your conversational skills with different characters in various scenes.
        </p>
      </div>

      <div className="relative w-full">
        <Marquee className={`[--duration:15s] w-full`}>
          {characters?.map((character) => (
            <Card className="w-[230px]" key={character.id}>
              <CardHeader className="flex items-center gap-3">
                <Image
                  alt="Character"
                  className="rounded-full w-12 h-12 object-cover"
                  src={character.image}
                />
                <div className="flex flex-col">
                  <p className="text-md">{character.name}</p>
                  <p className="text-small text-default-500">{character.relation}</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>{character.description}</p>
              </CardBody>
            </Card>
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background" />
      </div>

      {!fetcher.data && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-default-500">Get started by pressing the button below!</p>

          <Button
            className="w-fit"
            color="primary"
            isLoading={isRolling}
            onClick={handleRoll}
            endContent={<DicesIcon />}
            size="lg"
          >
            Roll
          </Button>
        </div>
      )}

      {/* {createSession.isError && <p>Something went wrong. Try again?</p>} */}

      {session && (
        <div className="h-full w-full flex justify-center items-center">
          <Card className="max-w-xs md:max-w-sm">
            <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">{session.character.name}</p>
              <small className="text-default-500">{session.character.description}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2 pb-0 flex flex-col gap-3">
              <p className="text-default-500 text-sm normal-case">
                You came across{" "}
                <i>
                  {session.character.name} {session.character.description}.
                </i>{" "}
                Start a conversation with them!
              </p>
              <Image
                alt="Card background"
                className="object-cover rounded-xl w-full aspect-video"
                src={session.image || "https://nextui.org/images/hero-card-complete.jpeg"}
              />
            </CardBody>
            <CardFooter className="flex justify-end">
              <Button
                as={Link}
                href={siteConfig.links.modes.characterConvoSession(session.session_id)}
                onClick={handleLetsGo}
                className="w-full"
                color="primary"
              >
                Let&apos;s go!
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
