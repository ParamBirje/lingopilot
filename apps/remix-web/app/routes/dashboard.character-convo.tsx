import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { subtitle, title } from "~/components/primitives";
import { Marquee } from "~/components/ui/marquee";
import { getSupabaseSessionAndHeaders } from "~/lib/supabase.server";
import { getCharacters } from "~/services/api/characters";
import { Character } from "~/types";

export async function loader({ request }: LoaderFunctionArgs) {
  const { serverSession } = await getSupabaseSessionAndHeaders({
    request,
  });

  const characters = await getCharacters(serverSession?.access_token as string);
  return { characters };
}

export default function CharacterConvo() {
  const { characters } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-full px-4 flex flex-col items-center gap-10">
      <div className="w-full text-center">
        <h1 className={title()}>Character Convo</h1>
        <p className={subtitle()}>
          Practice your conversational skills with different characters in
          various scenes.
        </p>
      </div>

      <div className="relative w-full">
        <Marquee className={`[--duration:15s] w-full`}>
          {characters?.map((character: Character) => (
            <Card className="w-[230px]" key={character.id}>
              <CardHeader className="flex items-center gap-3">
                <Image
                  alt="Character"
                  className="rounded-full w-12 h-12 object-cover"
                  src={character.image}
                />
                <div className="flex flex-col">
                  <p className="text-md">{character.name}</p>
                  <p className="text-small text-default-500">
                    {character.relation}
                  </p>
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
    </div>
  );
}
