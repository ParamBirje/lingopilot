import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";

import { GithubIcon } from "@/components/icons";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@nextui-org/button";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-16">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>The&nbsp;</span>
        <span className={title({ color: "violet" })}>copilot&nbsp;</span>
        <br />
        <span className={title()}>that supercharges language learning.</span>
        <div className={subtitle({ class: "mt-6" })}>
          A fully interactive voice-enabled A.I language speaking assistant that
          refines & tones your language skills.
        </div>
      </div>

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
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
    </section>
  );
}
