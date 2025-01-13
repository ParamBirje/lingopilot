import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSupabaseSessionAndHeaders } from "~/lib/supabase.server";
import { getCharacterConvoSession } from "~/services/api/modes/character-convo";
import { Image } from "@nextui-org/image";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import {
  Info,
  Lifebuoy,
  Microphone,
  MicrophoneSlash,
  Warning,
  UserCircle,
} from "phosphor-react";
import { Divider } from "@nextui-org/divider";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useState } from "react";
import { Alert } from "@nextui-org/alert";
import domain from "~/services/api/domain";
import {
  getLatestAssistantMessage,
  getVoiceResponse,
} from "~/services/api/modes/character-convo.client";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { serverSession } = await getSupabaseSessionAndHeaders({
    request,
  });

  const sessionId = Number(params.id);
  const accessToken = serverSession?.access_token as string;
  const domainUrl = domain;

  const session = await getCharacterConvoSession(accessToken, sessionId);
  if (!session) {
    return new Response("Invalid session", { status: 404 });
  }

  return { session, accessToken, domain: domainUrl };
}

export default function ConvoInterfacePage() {
  const { session, accessToken, domain } = useLoaderData<typeof loader>();
  const userToLang = "en-US";

  const {
    transcript,
    interimTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition: supportForSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const [
    browserSupportsSpeechRecognition,
    setBrowserSupportsSpeechRecognition,
  ] = useState(false);

  useEffect(() => {
    setBrowserSupportsSpeechRecognition(supportForSpeechRecognition);
  }, [supportForSpeechRecognition]);

  const [assistantMessage, setAssistantMessage] = useState<string>("");
  const [autoMic, setAutoMic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disableMic, setDisableMic] = useState(false);

  function handleStartRecording() {
    if (!isMicrophoneAvailable) return;
    if (disableMic) return;

    resetTranscript();
    console.log("Listening...");
    SpeechRecognition.startListening({
      language: userToLang,
      continuous: true,
    });
  }

  async function handleStopRecording() {
    const inputText = transcript;
    console.log("Transcript:", inputText);
    SpeechRecognition.stopListening();
    if (!inputText) return;
    if (loading) return;

    setLoading(true);
    await getVoiceResponseFromAI(inputText);
    setLoading(false);
  }

  async function getVoiceResponseFromAI(inputText: string) {
    const mediaSource = new MediaSource();

    const audio = new Audio();
    audio.src = URL.createObjectURL(mediaSource);

    mediaSource.addEventListener("sourceopen", async () => {
      const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");

      sourceBuffer.addEventListener("error", (error) => {
        console.error("SourceBuffer error:", error);
      });

      const response = await getVoiceResponse({
        text: inputText,
        language: userToLang,
        voice_name: session?.character.voice_name!,
        voice_engine: session?.character.voice_engine!,
        session_id: session?.session_id!,
        character: session?.character.name!,
        description: session?.character.description!,
        meta: session?.character.meta!,
        relation: session?.character.relation!,
        accessToken: accessToken!,
        domainUrl: domain,
      });

      if (!response) {
        // TODO: show toast
        console.error("Response not found");
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        console.error("Reader not available");
        return;
      }

      let isAppending = false; // Track appending state

      function appendBuffer(value: Uint8Array) {
        if (isAppending) {
          return;
        }

        isAppending = true;
        sourceBuffer.appendBuffer(value);
      }

      sourceBuffer.addEventListener("updateend", () => {
        isAppending = false;

        // ignore this @typescript-eslint/no-floating-promises
        void readStream();
      });

      async function readStream() {
        if (!reader) return;
        const { done, value } = await reader.read();
        if (done) {
          if (mediaSource.readyState === "open") {
            mediaSource.endOfStream();
          }
          return;
        }

        if (value) {
          appendBuffer(value);
        }
      }

      void readStream();
    });

    try {
      setDisableMic(true);
      await audio.play();
      let message = await getLatestAssistantMessage(
        domain,
        accessToken!,
        session?.session_id!
      );
      setAssistantMessage(message.content);

      audio.onended = () => {
        setDisableMic(false);
        if (autoMic) {
          handleStartRecording();
        }
      };
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  }

  return (
    <div className="w-full h-full">
      {!browserSupportsSpeechRecognition && (
        <div className="mb-8">
          <Alert
            color="danger"
            title="Your browser does not support speech recognition."
            description="Please use an updated version of Chrome for the best experience."
          />
        </div>
      )}

      {!isMicrophoneAvailable && (
        <div className="mb-8">
          <Alert
            color="warning"
            title="No microphone detected."
            description="Please connect a microphone or give permission to use the microphone."
          />
        </div>
      )}

      <div className="w-full flex justify-between items-stretch gap-6">
        <Card
          isFooterBlurred
          className="w-1/2 md:w-1/4 aspect-square col-span-12 sm:col-span-7"
        >
          <Image
            removeWrapper
            alt={session.character?.name}
            className="z-0 w-full h-full object-cover"
            src={
              session.character?.image ||
              "https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg"
            }
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10">
            <div className="flex flex-grow gap-2 items-center">
              <div className="flex flex-col">
                <p className="text-small font-bold text-white">
                  {session.character?.name}
                </p>
                <p className="text-tiny text-white/60">
                  {session.character?.description}
                </p>
              </div>
            </div>
            {browserSupportsSpeechRecognition && isMicrophoneAvailable ? (
              <div className="z-10 flex flex-col justify-center items-center gap-5">
                <Button
                  size="lg"
                  isIconOnly
                  color={
                    listening ? "primary" : disableMic ? "default" : "danger"
                  }
                  disabled={disableMic}
                  onPress={
                    listening
                      ? () => {
                          setAutoMic(false);
                          handleStopRecording();
                        }
                      : () => {
                          setAutoMic(true);
                          handleStartRecording();
                        }
                  }
                >
                  {listening ? (
                    <Microphone size={30} />
                  ) : (
                    <MicrophoneSlash size={30} />
                  )}
                </Button>
              </div>
            ) : (
              <Button size="lg" color="danger" disabled isIconOnly>
                <Warning size={25} />
              </Button>
            )}
          </CardFooter>
        </Card>

        <Card className="flex-1 max-h-full">
          <CardHeader className="flex gap-3">
            <Info size={25} />
            <div className="flex flex-col">
              <p className="text-md">{session.character?.name}'s Transcript</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-default-500">
              Start by saying hello to {session.character?.name}!
            </p>
          </CardBody>
        </Card>
      </div>

      <div className="mt-8 w-full max-h-full flex items-stretch justify-between gap-6">
        <Card className="flex-1">
          <CardHeader className="flex gap-3">
            <UserCircle size={28} />
            <div className="flex flex-col">
              <p className="text-md">Your Voice</p>
              <p className="text-small text-default-500">
                Whatever you say will be transcribed here.
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-default-500">{transcript || "..."}</p>
          </CardBody>
        </Card>

        <Card className="flex-1 max-h-full">
          <CardHeader className="flex gap-3">
            <Lifebuoy size={28} />
            <div className="flex flex-col">
              <p className="text-md">Help Box</p>
              <p className="text-small text-default-500">
                Get the meaning of a word or phrase that you don't understand.
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-default-500">Coming soon!</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
