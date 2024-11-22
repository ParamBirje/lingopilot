"use client";
import React from "react";

import { PictureQuestSession, PictureQuestSessionCreate } from "@/types";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { createPictureQuestSession } from "@/services/api/modes/picture-quest";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import FakeProgressBar from "@/components/fake-progress-bar";
import { PlayIcon } from "lucide-react";
import { useSetAtom } from "jotai";
import { pictureQuestAtom } from "@/components/atoms";
import { useUser } from "@stackframe/stack";

const sampleTopics = [
  "Nature",
  "Music",
  "Art",
  "Food",
  "Travel",
  "Sports",
  "Technology",
  "Batman",
];

export default function PlayModal({
  label = "Start Quest",
}: {
  label?: string;
}) {
  const user = useUser({ or: "redirect" });
  const setSession = useSetAtom(pictureQuestAtom);
  const [topic, setTopic] = React.useState<string>("");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const createSession = useMutation({
    mutationFn: async (params: PictureQuestSessionCreate) => {
      const { accessToken } = await user.getAuthJson();
      return await createPictureQuestSession(accessToken!, params);
    },
    onSuccess: (data: PictureQuestSession) => {
      setSession(data);
      setTopic("");
      onClose();
    },
  });

  function handleSessionCreate() {
    if (!topic) return;

    let cleanedTopic = topic.replace(/[^\w\s]/gi, "");
    createSession.mutate({ topic: cleanedTopic });
  }

  return (
    <>
      <Button
        className="w-fit"
        color="primary"
        size="lg"
        startContent={<PlayIcon size={24} />}
        onClick={onOpen}
      >
        {label}
      </Button>

      <Modal
        isDismissable={!createSession.isPending}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() => setTopic("")}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Personalize your quest
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  type="text"
                  label="Topic here"
                  value={topic}
                  onValueChange={setTopic}
                />

                <p className="text-default-500 text-sm mt-2">Quick Start:</p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {sampleTopics.map((topic) => (
                    <Button
                      key={topic}
                      color="default"
                      radius="full"
                      size="sm"
                      onClick={() => setTopic(topic)}
                    >
                      {topic}
                    </Button>
                  ))}
                </div>

                {createSession.isError && (
                  <p className="text-danger text-sm mt-2">
                    Something went wrong. Try with a different topic?
                  </p>
                )}
              </ModalBody>
              <ModalFooter>
                {createSession.isPending && (
                  <FakeProgressBar
                    className="w-1/2 place-self-center h-full"
                    size="sm"
                  />
                )}

                <Button
                  disabled={createSession.isPending}
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>

                <Button
                  color="primary"
                  onPress={handleSessionCreate}
                  isLoading={createSession.isPending}
                >
                  Let&apos;s go!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
