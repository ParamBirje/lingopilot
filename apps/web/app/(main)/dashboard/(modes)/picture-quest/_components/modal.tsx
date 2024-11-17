import React from "react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

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
  topic,
  setTopic,
  onSuccess,
  isButtonLoading,
  isOpen,
  onOpenChange,
}: {
  topic: string;
  setTopic: (value: string) => void;
  onSuccess: () => void;
  isButtonLoading?: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={onSuccess}
                isLoading={isButtonLoading}
              >
                Let&apos;s go!
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
