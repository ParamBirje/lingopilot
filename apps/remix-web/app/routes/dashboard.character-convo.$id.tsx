import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSupabaseSessionAndHeaders } from "~/lib/supabase.server";
import { getCharacterConvoSession } from "~/services/api/modes/character-convo";
import { Image } from "@nextui-org/image";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { InfoIcon, LifeBuoyIcon, UserRoundIcon } from "lucide-react";
import { Divider } from "@nextui-org/divider";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { serverSession } = await getSupabaseSessionAndHeaders({
    request,
  });

  const sessionId = Number(params.id);
  const accessToken = serverSession?.access_token as string;

  const session = await getCharacterConvoSession(accessToken, sessionId);
  if (!session) {
    return new Response("Invalid session", { status: 404 });
  }

  return { session };
}

export default function ConvoInterfacePage() {
  const { session } = useLoaderData<typeof loader>();

  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-between items-stretch gap-6">
        <Card isFooterBlurred className="w-1/2 md:w-1/4 aspect-square col-span-12 sm:col-span-7">
          <Image
            removeWrapper
            alt={session.character?.name}
            className="z-0 w-full h-full object-cover"
            src={
              session.character?.image ||
              "https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg"
            }
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-2 items-center">
              <Image
                alt="Breathing app icon"
                className="rounded-full w-10 h-11 bg-black"
                src="https://nextui.org/images/breathing-app-icon.jpeg"
              />
              <div className="flex flex-col">
                <p className="text-small font-bold text-white">{session.character?.name}</p>
                <p className="text-tiny text-white/60">{session.character?.description}</p>
              </div>
            </div>
            <Button radius="full" size="sm">
              Get App
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex-1 max-h-full">
          <CardHeader className="flex gap-3">
            <InfoIcon size={25} />
            <div className="flex flex-col">
              <p className="text-md">Transcript</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-default-500">Start by saying hello to {session.character?.name}!</p>
          </CardBody>
        </Card>
      </div>

      <div className="mt-8 w-full max-h-full flex items-stretch justify-between gap-6">
        <Card className="flex-1">
          <CardHeader className="flex gap-3">
            <UserRoundIcon size={28} />
            <div className="flex flex-col">
              <p className="text-md">Your Voice</p>
              <p className="text-small text-default-500">
                Whatever you say will be transcribed here.
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-default-500">Start by saying hello to {session.character?.name}!</p>
          </CardBody>
        </Card>

        <Card className="flex-1 max-h-full">
          <CardHeader className="flex gap-3">
            <LifeBuoyIcon size={28} />
            <div className="flex flex-col">
              <p className="text-md">Help Box</p>
              <p className="text-small text-default-500">
                Get the meaning of a word or phrase that you don't understand.
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-default-500">Start by saying hello to {session.character?.name}!</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
