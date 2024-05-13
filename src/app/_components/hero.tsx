import Image from "next/image";
import lightning from "@/lib/lightning.png";

export default function Hero() {
  return (
    <div className="my-10 flex">
      <div className="flex w-2/3 flex-col gap-5">
        <div className="badge badge-secondary p-3 text-xs font-bold uppercase tracking-wide text-white">
          The language learning copilot
        </div>

        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl">
          <span className=" italic">Supercharge</span> your language learning!
        </h1>

        <p className="my-2 w-[70%] text-lg tracking-wide">
          A fully interactive voice-enabled A.I language speaking assistant that
          refines & tones your language skills.
        </p>

        <div className="flex items-center gap-8">
          <button className="btn btn-primary text-white">
            <p>Get Started</p>
          </button>

          <button className="btn btn-primary btn-outline">
            <p>See LingoPilot in action</p>
          </button>

          <div className="flex items-center gap-1">
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              <div className="avatar">
                <div className="w-11">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-11">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-11">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-12">
                  <span>+102</span>
                </div>
              </div>
            </div>

            <p className="font-medium">enthusiasts learn faster!</p>
          </div>
        </div>
      </div>

      <Image
        src={lightning}
        width={lightning.width + 40}
        height={lightning.height}
        alt={"Lightning_image"}
      />
    </div>
  );
}
