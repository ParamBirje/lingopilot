"use client";
import React, { useEffect, useRef } from "react";

import { subtitle } from "@/components/primitives";
import { Image } from "@nextui-org/image";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button } from "@nextui-org/button";
import { getVoiceResponse } from "@/services/api/ai-voice";
import { useUser } from "@stackframe/stack";

export default function VoiceChat() {
  const visualizerRef = useRef(null);
  const intervalRef = useRef<any>(null);

  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const user = useUser({ or: "redirect" });

  async function handleStopRecording() {
    const inputText = transcript;
    SpeechRecognition.stopListening();

    await getVoiceResponseFromAI(inputText);
  }

  async function getVoiceResponseFromAI(inputText: string) {
    const { accessToken } = await user.getAuthJson();
    const mediaSource = new MediaSource();

    const audio = new Audio();
    audio.src = URL.createObjectURL(mediaSource);

    mediaSource.addEventListener("sourceopen", async () => {
      const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");

      // Error handling for SourceBuffer
      sourceBuffer.addEventListener("error", (error) => {
        console.error("SourceBuffer error:", error);
      });

      const formData = new FormData();
      formData.append("input_text", inputText);

      const response = await getVoiceResponse(
        inputText,
        "en-US",
        "Alice",
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
          return; // Prevent re-entrance
        }

        isAppending = true; // Mark as appending
        sourceBuffer.appendBuffer(value); // Append the buffer
      }

      // Listen for when the source buffer has finished appending
      sourceBuffer.addEventListener("updateend", () => {
        isAppending = false; // Mark as not appending anymore

        // Check if there is more data to append
        // ignore this @typescript-eslint/no-floating-promises
        void readStream();
      });

      // Function to read the stream
      async function readStream() {
        if (!reader) return;
        const { done, value } = await reader.read();
        if (done) {
          // Check the MediaSource's readyState before ending the stream
          if (mediaSource.readyState === "open") {
            mediaSource.endOfStream();
          }
          return;
        }

        if (value) {
          appendBuffer(value); // Call appendBuffer to handle appending safely
        }
      }

      // Start reading the stream
      void readStream();
    });

    // Await the audio play promise and handle potential errors
    try {
      await audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  }

  useEffect(() => {
    if (!visualizerRef.current) return;

    const visualizer = visualizerRef.current!;
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
          className="z-10 rounded-xl bg-white mx-auto w-3/4 md:w-2/3 aspect-w-16 aspect-h-9"
          src="https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg"
          alt="placeholder"
        />

        <p
          className={subtitle({
            class: "z-10 text-2xl lg:text-3xl text-center",
          })}
        >
          {transcript || "..."}
        </p>

        {browserSupportsSpeechRecognition && isMicrophoneAvailable ? (
          <div className="z-10 flex items-center gap-5">
            <p className="text-2xl text-center">
              {listening ? "Listening..." : "Not Listening"}
            </p>

            <Button
              color="primary"
              onClick={() => {
                resetTranscript();
                SpeechRecognition.startListening({
                  language: "en-US",
                  continuous: true,
                });
              }}
            >
              Start Listening
            </Button>
            <Button color="danger" onClick={handleStopRecording}>
              Stop Listening
            </Button>
          </div>
        ) : (
          <p className="text-2xl text-center text-danger">
            Mic not found / Browser doesn&apos;t support speech recognition.
          </p>
        )}
      </div>
    </div>
  );
}
