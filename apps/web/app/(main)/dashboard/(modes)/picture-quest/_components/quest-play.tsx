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
  PictureQuestSession,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createQuestions,
  getQuestions,
  updateAnswer,
  verifyAnswers,
} from "@/services/api/modes/picture-quest";
import { endSession } from "@/services/api/modes/session";
import Spinner from "@/components/spinner";
import { useUser } from "@stackframe/stack";
import { toast } from "sonner";

export default function QuestPlay() {
  const user = useUser({ or: "redirect" });
  const [session, setSession] = useAtom(pictureQuestAtom);
  const currentQuest = session!;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] =
    useState<PictureQuestQuestion | null>(null);
  const [answer, setAnswer] = useState(currentQuestion?.answer || "");

  const {
    data: questionsData,
    isLoading: isLoadingQuestions,
    isError,
  } = useQuery({
    queryKey: ["questions", currentQuest.id],
    queryFn: async () => {
      const { accessToken } = await user.getAuthJson();
      return await getQuestions(accessToken!, currentQuest.id);
    },
    enabled: !currentQuest.questions || currentQuest.questions.length <= 1,
  });

  useEffect(() => {
    let questions = currentQuest.questions || questionsData;
    if (questions) {
      setSession({
        ...currentQuest,
        questions,
      });
      setCurrentQuestion(questions[currentQuestionIndex]);
    }
  }, [questionsData]);

  useEffect(() => {
    let areAllVerified = currentQuest.questions?.every(
      (question) => question.answer,
    );

    if (areAllVerified) {
      endSessionMutation.mutate();
    }
  }, [currentQuestion]);

  const updateAnswerMutation = useMutation({
    mutationFn: async (params: PictureQuestAnswerUpdate) => {
      const { accessToken } = await user.getAuthJson();
      return await updateAnswer(accessToken!, params);
    },
    onSuccess: (data: PictureQuestQuestion) => {
      setSession({
        ...currentQuest,
        questions: currentQuest.questions?.map((question) =>
          question.id === data.id ? data : question,
        ),
      });
    },
    onError: () => {
      toast.error(
        "Something went wrong when submitting your answer. Try again.",
      );
    },
  });

  const endSessionMutation = useMutation({
    mutationFn: async () => {
      const { accessToken } = await user.getAuthJson();
      return await endSession(accessToken!, currentQuest.id);
    },
    onSuccess: (data: PictureQuestSession) => {
      setSession((prev) => ({ ...prev, ...data }));
    },
  });

  // const createQuestionsMutation = useMutation({
  //   mutationFn: async (params: PictureQuestQuestionCreate) =>
  //     await createQuestions(accessToken, params),
  //   onSuccess: (data: PictureQuestQuestion[]) => {
  //     setSession({
  //       ...currentQuest,
  //       questions: currentQuest.questions?.concat(data),
  //     });
  //     setCurrentQuestionIndex(currentQuestionIndex + 1);
  //     setCurrentQuestion(data[0]);
  //   },
  // });

  const verifyAnswersMutation = useMutation({
    mutationFn: async () => {
      const { accessToken } = await user.getAuthJson();
      return await verifyAnswers(accessToken!, currentQuest.id);
    },
  });

  async function handleSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!answer) return toast.error("Please enter an answer.");

    let cleanedAnswer = answer.replace(/[<>"']/g, "");
    toast.promise(
      updateAnswerMutation.mutateAsync({
        question_id: currentQuestion?.id!,
        answer: cleanedAnswer,
      }),
      {
        loading: "Saving...",
        success: "Answer saved!",
      },
    );

    verifyAnswersMutation.mutate();

    let didGo = goToNextQuestion();
    if (didGo) return;

    // DISCONTINUED: for now
    // createQuestionsMutation.mutate({
    //   session_id: currentQuest.id,
    //   num_questions: 1,
    // });
  }

  function goToNextQuestion() {
    if (
      currentQuest.questions &&
      currentQuest.questions.length > currentQuestionIndex + 1
    ) {
      setAnswer("");
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return true;
    }

    endSessionMutation.mutate();
    return false;
  }

  useEffect(() => {
    if (!currentQuest.questions) return;
    setCurrentQuestion(currentQuest.questions![currentQuestionIndex]);
  }, [currentQuestionIndex]);

  if (isError) return <p>Something went wrong. Try again?</p>;
  if (isLoadingQuestions) return <Spinner />;

  return (
    <div className="w-full md:w-2/3 mx-auto px-4 flex flex-col gap-8">
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
        {currentQuestion?.answer && (
          <span className="text-secondary block text-xs">Revision</span>
        )}
        {currentQuestion?.title}
      </h3>

      <form onSubmit={handleSubmission} className="flex flex-col gap-6">
        <Textarea
          autoFocus
          label="Answer"
          size="lg"
          placeholder="Let your thoughts flow here..."
          className="w-full"
          value={answer}
          onValueChange={setAnswer}
          disabled={
            updateAnswerMutation.isPending || endSessionMutation.isPending
          }
          errorMessage={
            updateAnswerMutation.isError
              ? "Something went wrong when submitting your answer. Try again."
              : undefined
          }
          description="Avoid one word answers. Be descriptive!"
        />

        <div className="flex justify-between items-center gap-4">
          <Button
            variant="bordered"
            size="lg"
            onClick={() => setSession(undefined)}
          >
            Continue Later
          </Button>

          <Button
            className="w-fit place-self-end"
            color="secondary"
            size="lg"
            type="submit"
            isLoading={
              updateAnswerMutation.isPending || endSessionMutation.isPending
            }
            endContent={<ArrowRightIcon size={16} />}
          >
            {currentQuest.questions &&
            currentQuest.questions.length === currentQuestionIndex + 1
              ? "Finish"
              : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
}
