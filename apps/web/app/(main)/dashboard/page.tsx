"use server";
import { Card, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { title } from "@/components/primitives";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import { stackServerApp } from "@/stack";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await stackServerApp.getUser({ or: "redirect" });
  if (!user.clientMetadata?.onboarded) {
    redirect(siteConfig.links.onboarding);
  }

  return (
    <div className="w-full px-4 flex flex-col gap-8">
      <h1 className={title({ class: "text-left" })}>Dashboard</h1>

      <div className="gap-2 grid grid-cols-12 grid-rows-2">
        <Card
          isPressable
          as={Link}
          href={siteConfig.links.modes.characterConvo}
          className="w-full h-[300px] col-span-12 sm:col-span-7"
        >
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Voice Mode</p>
            <h4 className="font-medium text-xl">Character Convo</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover"
            src="https://images.pexels.com/photos/13627231/pexels-photo-13627231.jpeg?auto=compress&fm=jpg&w=640&h=427"
          />
        </Card>
        <Card
          isPressable
          as={Link}
          href={siteConfig.links.modes.pictureQuest}
          className="w-full h-[300px] col-span-12 sm:col-span-5"
        >
          <CardHeader className="absolute z-10 top-1 flex-col items-start text-black">
            <p className="text-tiny uppercase font-bold">Writing Mode</p>
            <h4 className="font-medium text-xl">Picture Quest</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card example background"
            className="z-0 w-full h-full scale-125 -translate-y-6 object-cover scale-x-[-1]"
            src="https://images.pexels.com/photos/2962470/pexels-photo-2962470.jpeg?auto=compress&cs=tinysrgb&w=640&h=427&dpr=1"
          />
        </Card>
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">Mode</p>
            <h4 className="text-white font-medium text-large">Scenarios</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://images.pexels.com/photos/5711028/pexels-photo-5711028.jpeg?auto=compress&cs=tinysrgb&w=640&h=427&dpr=1"
          />
        </Card>
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">Mode</p>
            <h4 className="text-white font-medium text-large">Coming Soon</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://images.pexels.com/photos/5199818/pexels-photo-5199818.jpeg?auto=compress&cs=tinysrgb&w=640&h=427&dpr=1"
          />
        </Card>
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">Mode</p>
            <h4 className="text-white font-medium text-large">Coming Soon</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://images.pexels.com/photos/13347897/pexels-photo-13347897.jpeg?auto=compress&cs=tinysrgb&w=640&h=427&dpr=1"
          />
        </Card>
      </div>
    </div>
  );
}
