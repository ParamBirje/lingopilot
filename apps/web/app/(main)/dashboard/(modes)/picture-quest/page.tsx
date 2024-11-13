import { Image } from "@nextui-org/image";
import { subtitle, title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { ArrowRightIcon } from "lucide-react";
import { Textarea } from "@nextui-org/input";

export default async function Page() {
  const currentQuest = {
    id: 4,
    title: "The Great Wall of China",
    image: "https://nextui.org/images/hero-card.jpeg",
    questions: [
      {
        id: 1,
        title: "What is the name of this place?",
        image: "https://nextui.org/images/hero-card.jpeg",
      },
      {
        id: 2,
        title: "Where is this place located?",
        image: "https://nextui.org/images/hero-card.jpeg",
      },
    ],
  };

  return (
    <div className="w-full px-8 flex flex-col gap-8">
      <div>
        <h1 className={title({ class: "text-left" })}>{currentQuest.title}</h1>
        <p className={subtitle()}>Picture Quest</p>
      </div>

      <Image
        alt=""
        className="object-cover w-full aspect-video rounded-lg"
        src={currentQuest.image}
      />

      <h3 className={subtitle({ class: "text-left" })}>
        {currentQuest.questions[0].title}
      </h3>

      <form className="flex flex-col gap-6">
        <Textarea
          label="Answer"
          size="lg"
          placeholder="Enter your response here"
          className="w-full"
        />

        <Button
          className="w-fit place-self-end"
          color="secondary"
          size="lg"
          type="submit"
          endContent={<ArrowRightIcon size={16} />}
        >
          Next
        </Button>
      </form>
    </div>
  );
}
