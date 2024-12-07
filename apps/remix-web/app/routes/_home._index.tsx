import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { type MetaFunction } from "@remix-run/node";
import { ArrowRightIcon } from "lucide-react";
import { subtitle, title } from "~/components/primitives";
import { siteConfig } from "~/lib/siteConfig";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

function Index() {
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10 mt-16">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>The&nbsp;</span>
        <span className={title({ color: "violet" })}>conversation partner&nbsp;</span>
        <br className="hidden md:block" />
        <span className={title()}>you&apos;ve been waiting for.</span>
        <div className={subtitle({ class: "mt-6" })}>
          An A.I language learning conversation partner to practice speaking whenever and whenever
          you want!
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-3">
          <Button
            as={Link}
            startContent={<ArrowRightIcon size={20} />}
            color="primary"
            radius="full"
            variant="shadow"
            href={siteConfig.links.dashboard}
          >
            Get Started
          </Button>
          <Button as={Link} isExternal radius="full" variant="bordered" href="#">
            See how it works
          </Button>
        </div>

        <p className="text-center text-default-500 text-sm">It&apos;s totally free!</p>
      </div>
    </section>
  );
}

export default Index;
