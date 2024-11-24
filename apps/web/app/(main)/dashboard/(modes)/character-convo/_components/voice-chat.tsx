"use client";
import React, { useEffect, useRef, useState } from "react";

import { subtitle } from "@/components/primitives";
import { Image } from "@nextui-org/image";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button } from "@nextui-org/button";
import { getVoiceResponse } from "@/services/api/ai-voice";
import { useUser } from "@stackframe/stack";
import { MicIcon, MicOffIcon } from "lucide-react";
import { sessionAtom } from "@/components/atoms";
import { useAtom } from "jotai";
import { getLatestAssistantMessage } from "@/services/api/modes/character-convo";
import { WordFadeIn } from "@/components/ui/word-fade-in";

export default function VoiceChat() {
  const [session, setSession] = useAtom(sessionAtom);
  const user = useUser({ or: "redirect" });
  // const userToLang =
  //   user.clientMetadata?.onboardingData?.toLang?.key || "default en-US";
  const userToLang = "en-US"; // TODO: use lang from the character

  const visualizerRef = useRef(null);
  const intervalRef = useRef<any>(null);

  const [assistantMessage, setAssistantMessage] = useState<string>("");
  const [autoMic, setAutoMic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disableMic, setDisableMic] = useState(false);

  const {
    transcript,
    interimTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  useEffect(() => {
    const delayOffset = 800;

    if (!interimTranscript) {
      setTimeout(() => {
        if (!interimTranscript && autoMic) {
          handleStopRecording();
        }
      }, delayOffset);
    }
  }, [interimTranscript]);

  function handleStartRecording() {
    if (!isMicrophoneAvailable) return;
    if (disableMic) return;

    resetTranscript();
    console.log("Listening...");
    SpeechRecognition.startListening({
      language: "en-US",
      continuous: true,
    });
  }

  async function handleStopRecording() {
    const inputText = transcript;
    SpeechRecognition.stopListening();
    if (!inputText) return;
    if (loading) return;

    setLoading(true);
    console.log("Transcript:", inputText);
    await getVoiceResponseFromAI(inputText);
    setLoading(false);
  }

  async function getVoiceResponseFromAI(inputText: string) {
    const { accessToken } = await user.getAuthJson();
    const mediaSource = new MediaSource();

    const audio = new Audio();
    audio.src = URL.createObjectURL(mediaSource);

    mediaSource.addEventListener("sourceopen", async () => {
      const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");

      sourceBuffer.addEventListener("error", (error) => {
        console.error("SourceBuffer error:", error);
      });

      const response = await getVoiceResponse(
        inputText,
        userToLang,
        session?.character.voice_name!,
        session?.character.voice_engine!,
        session?.session_id!,
        session?.character.name!,
        session?.character.description!,
        session?.character.meta!,
        session?.character.relation!,
        accessToken!,
      );

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
        accessToken!,
        session?.session_id!,
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

  useEffect(() => {
    if (!visualizerRef.current) return;

    const visualizer = visualizerRef.current! as HTMLDivElement;
    if (listening) {
      let intervalTime = 200;
      intervalRef.current = setInterval(() => {
        visualizer.style.width = `${Math.floor(Math.random() * 10) + 60}%`;
        intervalTime = Math.floor(Math.random() * 100) + 200;
      }, intervalTime);
    } else {
      clearInterval(intervalRef.current!);
      visualizer.style.width = "60%";
    }
  }, [listening]);

  return (
    <div className="w-full h-full">
      <div className="fixed bottom-[-60%] left-0 flex justify-center items-center h-full w-full">
        <div
          ref={visualizerRef}
          className="duration-150 bg-gradient-to-br from-primary-500 to-primary-700 opacity-[0.09] w-[50%] aspect-square rounded-full blur-3xl"
        />
      </div>

      <div className="my-auto h-full w-full flex flex-col justify-center items-center gap-10">
        <Image
          className="z-10 rounded-full bg-white mx-auto w-1/2 md:w-1/4 aspect-square object-cover"
          src={
            session?.character?.image ||
            "https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg"
          }
          alt="placeholder"
        />

        <div className={subtitle({ class: "text-center" })}>
          <p className="font-extrabold text-2xl">{session?.character?.name}</p>
          <p>{session?.character?.description}</p>
        </div>

        {!browserSupportsSpeechRecognition && (
          <p className="text-2xl text-center text-danger">
            Browser doesn&apos;t support speech recognition. Please use an
            updated Chrome browser for the best experience.
          </p>
        )}

        {!isMicrophoneAvailable && (
          <p className="text-2xl text-center text-danger">
            Mic not found. Please connect a microphone.
          </p>
        )}

        {browserSupportsSpeechRecognition && isMicrophoneAvailable ? (
          <div className="z-10 flex flex-col justify-center items-center gap-5">
            <Button
              size="lg"
              isIconOnly
              color={listening ? "primary" : disableMic ? "default" : "danger"}
              disabled={disableMic}
              onClick={
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
              {listening ? <MicIcon size={30} /> : <MicOffIcon size={30} />}
            </Button>

            <p className="text-lg text-center">
              {listening ? "Listening" : "Not Listening"}
            </p>
          </div>
        ) : (
          <p className="text-2xl text-center text-danger">
            Mic not found / Browser doesn&apos;t support speech recognition.
          </p>
        )}

        <div className="min-h-[100px] lg:min-h-[200px] place-content-center">
          {loading && (
            <div className="z-10 flex justify-center items-center gap-3">
              <div className="w-3 h-3 bg-warning-500 rounded-full animate-pulse" />
              <div className="w-3 h-3 bg-warning-500 rounded-full animate-pulse" />
              <div className="w-3 h-3 bg-warning-500 rounded-full animate-pulse" />
            </div>
          )}

          {!loading && (
            <WordFadeIn
              key={assistantMessage}
              delay={0.21}
              className={subtitle({
                class: "z-10 text-xl lg:text-3xl text-center text-warning-500",
              })}
              words={assistantMessage}
            />
          )}
        </div>

        <p
          className={subtitle({
            class: "z-10 text-xl lg:text-3xl text-center",
          })}
        >
          <p>{transcript || "..."}</p>
        </p>
      </div>
    </div>
  );
}
