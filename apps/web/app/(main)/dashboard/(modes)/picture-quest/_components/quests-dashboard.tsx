import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { subtitle, title } from "@/components/primitives";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/button";
import { PlayIcon } from "lucide-react";

export default async function PictureQuestsDashboard() {
  const previousQuests = [
    {
      id: 1,
      title: "The Wonderful Butterfly",
      image: "https://nextui.org/images/hero-card.jpeg",
    },
    {
      id: 2,
      title: "Delicious Pancake",
      image: "https://nextui.org/images/hero-card.jpeg",
    },
    {
      id: 3,
      title: "The Great Wall of China",
      image: "https://nextui.org/images/hero-card.jpeg",
    },
  ];

  return (
    <div className="w-full px-8 flex flex-col gap-8">
      <div>
        <h1 className={title({ class: "text-left" })}>Picture Quest</h1>
        <p className={subtitle()}>
          Answer questions based on a random picture.
        </p>
      </div>

      <Button
        className="w-fit"
        color="primary"
        size="lg"
        startContent={<PlayIcon size={24} />}
      >
        Start Quest
      </Button>

      <h3 className={subtitle({ class: "text-left" })}>Previous Quests</h3>

      <div className="gap-x-2 gap-y-6 grid grid-cols-1 md:grid-cols-3 place-items-center">
        {previousQuests.map((quest) => (
          <Card
            key={quest.id}
            isPressable
            isFooterBlurred
            radius="lg"
            className="border-none w-[200px]"
          >
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={200}
              src={quest.image}
              width={200}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-medium text-center text-white/80">
                {quest.title}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
