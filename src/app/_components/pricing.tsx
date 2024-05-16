import React from "react";

export default function Pricing() {
  return (
    <div className="my-20 flex flex-col items-center gap-16">
      <div className="flex flex-col gap-5 text-center">
        <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          A good catching title here
        </h3>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
          deserunt molestiae. Quaerat tenetur repellendus similique.
        </p>
      </div>

      <div className="flex w-full items-stretch justify-center gap-5">
        <div className="flex w-1/3 flex-col items-center gap-5">
          <div className="flex w-full flex-col gap-5 rounded-md border-2 border-opacity-50 px-5 py-4">
            <h5 className="text-5xl font-bold">
              $10<span className="text-sm text-slate-500"> USD</span>
            </h5>

            <p className="text-xl text-slate-700">10 day pass</p>

            <ul className="mx-5 list-disc">
              <li>Item1</li>
              <li>Item3</li>
              <li>Item2</li>
            </ul>

            <button className="btn btn-neutral">Get LingoPilot</button>
          </div>

          <p>One time payment</p>
        </div>

        <div className="indicator w-1/3">
          <span className="text-md badge indicator-item badge-warning indicator-center p-3 font-semibold text-white">
            Popular
          </span>

          <div className="flex w-full flex-col items-center gap-5">
            <div className="flex w-full flex-col gap-5 rounded-md border-2 border-yellow-500 border-opacity-50 px-5 py-4">
              <h5 className="text-5xl font-bold">
                $50<span className="text-sm text-slate-500"> USD</span>
              </h5>

              <p className="text-xl text-slate-700">30 day pass</p>

              <ul className="mx-5 list-disc">
                <li>Item1</li>
                <li>Item3</li>
                <li>Item2</li>
              </ul>

              <button className="btn btn-neutral">Get LingoPilot</button>
            </div>

            <p>One time payment</p>
          </div>
        </div>
      </div>
    </div>
  );
}
