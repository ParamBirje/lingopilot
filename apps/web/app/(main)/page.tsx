import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";

import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@nextui-org/button";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { Particles } from "@/components/ui/particles";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10 mt-16">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>The&nbsp;</span>
        <span className={title({ color: "violet" })}>
          conversation partner&nbsp;
        </span>
        <br className="hidden md:block" />
        <span className={title()}>you&apos;ve been waiting for.</span>
        <div className={subtitle({ class: "mt-6" })}>
          A voice-enabled A.I conversation partner that hones your language
          through speaking and comprehensible input through mini-games.
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-3">
          <Button
            as={Link}
            startContent={<ArrowRight size={20} />}
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.dashboard}
          >
            Get Started
          </Button>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href="https://www.youtube.com/watch?v=7lzxWziZY9I"
          >
            See how it works
          </Link>
        </div>

        <p className="text-center text-default-500 text-sm">
          🇬🇧 English available now! 🇩🇪 German coming soon!
        </p>
      </div>

      <HeroVideoDialog
        className="aspect-video w-full mt-12 border-none"
        videoSrc="https://www.youtube.com/embed/7lzxWziZY9I?si=5mjaTBp5iQoKjVh_"
        thumbnailSrc="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/149/560/datas/gallery.jpg"
      />

      <Particles
        className="absolute inset-0"
        quantity={200}
        ease={80}
        refresh
      />
    </section>
  );
}
