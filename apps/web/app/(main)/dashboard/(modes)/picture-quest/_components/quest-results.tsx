import { pictureQuestAtom } from "@/components/atoms";
import { Image } from "@nextui-org/image";
import { subtitle, title } from "@/components/primitives";
import { getQuestions } from "@/services/api/modes/picture-quest";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { CheckIcon, InfoIcon, UserIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { CircularProgress } from "@nextui-org/progress";
import Spinner from "@/components/spinner";
import PlayModal from "./play-modal";
import { Button } from "@nextui-org/button";

export default function QuestResults({ accessToken }: { accessToken: string }) {
  const [session, setSession] = useAtom(pictureQuestAtom);
  const currentQuest = session!;

  const {
    data: questionsData,
    isLoading: isLoadingQuestions,
    isError,
  } = useQuery({
    queryKey: ["questions", currentQuest.id],
    queryFn: async () => await getQuestions(accessToken, currentQuest.id),
  });

  if (isError) return <p>Something went wrong. Try again?</p>;
  if (isLoadingQuestions) return <Spinner />;
  if (!questionsData) return <p>No questions found.</p>;

  return (
    <div className="w-full px-4 flex flex-col gap-8">
      <div>
        <h1 className={title({ class: "text-left" })}>Results</h1>
      </div>

      <Card>
        <CardBody className="py-5 px-6">
          <div className="w-full flex items-center gap-5">
            <CircularProgress
              aria-label="accuracy"
              size="lg"
              value={
                (questionsData.filter(
                  (question) => question.expected_answer === null,
                ).length /
                  questionsData.length) *
                100
              }
              classNames={{
                svg: "w-24 h-24",
                value: "text-lg font-medium",
              }}
              color="success"
              showValueLabel={true}
            />
            <h4 className={subtitle()}>Correctness</h4>
          </div>
        </CardBody>
      </Card>

      <div className="mt-4 flex items-center gap-4">
        <PlayModal label="New Quest" accessToken={accessToken} />
        <Button
          variant="bordered"
          size="lg"
          onClick={() => setSession(undefined)}
        >
          Back to Quests
        </Button>
      </div>

      <div className="gap-y-10 gap-x-6 grid grid-cols-12 grid-rows-2 mt-6">
        {questionsData?.map((question) => (
          <div
            key={question.id}
            className="col-span-12 sm:col-span-6 flex flex-col gap-4"
          >
            <Image
              alt="Picture Quest Image"
              className="object-cover w-full aspect-video rounded-lg"
              src={question.image}
            />

            <h4 className="text-lg font-medium">{question.title}</h4>

            <Card
              className={
                question.expected_answer
                  ? "bg-warning text-black"
                  : "bg-success text-black"
              }
            >
              <CardBody>
                <div className="flex items-center gap-2">
                  <UserIcon size={16} />
                  <p>{question.answer}</p>
                </div>
              </CardBody>
            </Card>

            {question.expected_answer && (
              <Popover>
                <PopoverTrigger>
                  <Card isHoverable isPressable>
                    <CardHeader className="flex items-center justify-between">
                      <div className="inline-flex items-center">
                        <CheckIcon size={16} className="mr-2" />
                        <p>Correction</p>
                      </div>

                      <InfoIcon size={16} />
                    </CardHeader>
                    <Divider />
                    <CardBody>{question.expected_answer}</CardBody>
                  </Card>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2 max-w-56">
                    <div className="text-small font-bold">Reason</div>
                    <div className="text-tiny">{question.reason}</div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
