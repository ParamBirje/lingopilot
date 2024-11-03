"use client";
import React from "react";

import { subtitle } from "@/components/primitives";
import { Image } from "@nextui-org/image";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button } from "@nextui-org/button";

export default function VoiceChat() {
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

  return (
    <div className="my-auto h-full w-full flex flex-col justify-center items-center gap-10">
      <Image
        className="rounded-xl bg-white mx-auto w-3/4 md:w-2/3 aspect-w-16 aspect-h-9"
        src="https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg"
        alt="placeholder"
      />

      <p className={subtitle({ class: "text-2xl lg:text-3xl text-center" })}>
        {transcript || tempText}
      </p>

      {browserSupportsSpeechRecognition && isMicrophoneAvailable && (
        <div className="flex items-center gap-5">
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
      )}
    </div>
  );
}
