"use client";
import React, { useEffect, useRef } from "react";

import { subtitle } from "@/components/primitives";
import { Image } from "@nextui-org/image";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button } from "@nextui-org/button";

export default function VoiceChat() {
  const visualizerRef = useRef(null);
  const intervalRef = useRef<any>(null);

  const {
    transcript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const tempText =
    "This is how the subtitle looks like. As you speak, the text will be updated here. AI's voice's text will be displayed here but in a different color.";

  useEffect(() => {
    if (!visualizerRef.current) return;

    const visualizer = visualizerRef.current!;
    if (listening) {
      let intervalTime = 200;
      intervalRef.current = setInterval(() => {
        visualizer.style.width = `${Math.floor(Math.random() * 10) + 50}%`;
        intervalTime = Math.floor(Math.random() * 100) + 200;
      }, intervalTime);
    } else {
      clearInterval(intervalRef.current!);
      visualizer.style.width = "50%";
    }
  }, [listening]);

  return (
    <div className="w-full h-full">
      <div className="fixed bottom-[-70%] left-0 flex justify-center items-center h-full w-full">
        <div
          ref={visualizerRef}
          className="duration-150 bg-gradient-to-br from-primary-500 to-primary-700 opacity-10 w-[50%] aspect-square rounded-full blur-lg"
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
          {transcript || tempText}
        </p>

        {browserSupportsSpeechRecognition && isMicrophoneAvailable ? (
          <div className="z-10 flex items-center gap-5">
            <p className="text-2xl text-center">
              {listening ? "Listening..." : "Not Listening"}
            </p>

            <Button
              color="primary"
              onClick={() => {
                SpeechRecognition.startListening({
                  language: "en-US",
                  continuous: true,
                });
              }}
            >
              Start Listening
            </Button>
            <Button color="danger" onClick={SpeechRecognition.stopListening}>
              Stop Listening
            </Button>
          </div>
        ) : (
          <p className="text-2xl text-center text-danger">
            Mic not found / Browser doesn&apos;t support speech recog.
          </p>
        )}
      </div>
    </div>
  );
}
