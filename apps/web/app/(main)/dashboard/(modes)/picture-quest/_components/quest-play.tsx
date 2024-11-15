import React, { useEffect, useState } from "react";
import { Image } from "@nextui-org/image";
import { subtitle, title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { ArrowRightIcon } from "lucide-react";
import { Textarea } from "@nextui-org/input";
import { pictureQuestAtom } from "@/components/atoms";
import { useAtom } from "jotai";
import {
  PictureQuestAnswerUpdate,
  PictureQuestQuestion,
  PictureQuestQuestionCreate,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createQuestions,
  getQuestions,
  updateAnswer,
} from "@/services/api/modes/picture-quest";

export default function QuestPlay({ accessToken }: { accessToken: string }) {
  const [session, setSession] = useAtom(pictureQuestAtom);
  const currentQuest = session!;
  // const shouldFetchQuestions =
  //   !currentQuest.questions || currentQuest.questions.length <= 1;

  // const {
  //   data: questions,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["questions", currentQuest.id],
  //   queryFn: async () => await getQuestions(accessToken, currentQuest.id),
  //   enabled: shouldFetchQuestions,
  // });
  //
  // useEffect(() => {
  //   if (questions) {
  //     setSession({
  //       ...currentQuest,
  //       questions,
  //     });
  //   }
  // }, [questions]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<PictureQuestQuestion>(
    currentQuest.questions![currentQuestionIndex],
  );
  const [answer, setAnswer] = useState(currentQuestion.answer || "");

  const updateAnswerMutation = useMutation({
    mutationFn: async (params: PictureQuestAnswerUpdate) =>
      await updateAnswer(accessToken, params),
    onSuccess: (data: PictureQuestQuestion) => {
      setSession({
        ...currentQuest,
        questions: currentQuest.questions?.map((question) =>
          question.id === data.id ? data : question,
        ),
      });
    },
  });

  const createQuestionsMutation = useMutation({
    mutationFn: async (params: PictureQuestQuestionCreate) =>
      await createQuestions(accessToken, params),
    onSuccess: (data: PictureQuestQuestion[]) => {
      console.log("success", currentQuest.questions?.concat(data));
      setSession({
        ...currentQuest,
        questions: currentQuest.questions?.concat(data),
      });
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentQuestion(data[0]);
    },
  });

  async function handleSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!answer) return;

    updateAnswerMutation.mutate({
      question_id: currentQuestion.id,
      answer,
    });

    let didGo = goToNextQuestion();
    if (didGo) return;

    createQuestionsMutation.mutate({
      session_id: currentQuest.id,
      num_questions: 1,
    });

    // async send the answer for checking
  }

  function goToNextQuestion() {
    setAnswer("");
    if (
      currentQuest.questions &&
      currentQuest.questions.length > currentQuestionIndex + 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return true;
    }
    return false;
  }

  useEffect(() => {
    setCurrentQuestion(currentQuest.questions![currentQuestionIndex]);
  }, [currentQuestionIndex]);

  return (
    <div className="w-2/3 mx-auto px-8 flex flex-col gap-8">
      <div>
        <h1 className={title({ class: "text-left" })}>{currentQuest.title}</h1>
        <p className={subtitle()}>Picture Quest</p>
      </div>

      <Image
        alt="Picture Quest Image"
        className="object-cover w-full aspect-video rounded-lg"
        src={currentQuestion?.image}
      />

      <h3 className={subtitle({ class: "text-left" })}>
        {currentQuestion.title}
      </h3>

      <form onSubmit={handleSubmission} className="flex flex-col gap-6">
        <Textarea
          label="Answer"
          size="lg"
          placeholder="Enter your response here"
          className="w-full"
          value={answer}
          onValueChange={setAnswer}
          disabled={
            updateAnswerMutation.isPending || createQuestionsMutation.isPending
          }
        />

        <Button
          className="w-fit place-self-end"
          color="secondary"
          size="lg"
          type="submit"
          isLoading={
            updateAnswerMutation.isPending || createQuestionsMutation.isPending
          }
          endContent={<ArrowRightIcon size={16} />}
        >
          Next
        </Button>
      </form>
    </div>
  );
}
