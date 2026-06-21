"use client";

import Image from "next/image";

type GabyIntroProps = {
  onStartLesson: () => void;
};

export default function GabyIntro({ onStartLesson }: GabyIntroProps) {
  return (
    <div className="relative min-h-[calc(100vh-150px)] overflow-hidden rounded-[40px] border border-cyan-400/20 bg-[#070b14] p-6 lg:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)] flex items-center">
      <div className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[260px] w-[260px] rounded-full bg-blue-500/10 blur-[90px]" />

      <div className="relative grid w-full grid-cols-1 lg:grid-cols-[310px_1fr] gap-10 items-start">
        <div className="flex justify-start pt-10">
          <div className="relative animate-[gabyFloat_4s_ease-in-out_infinite]">
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-[80px] animate-[gabyPulse_3s_ease-in-out_infinite]" />

            <Image
              src="/gaby.png"
              alt="Gaby AI Coach"
              width={430}
              height={430}
              className="relative h-[390px] w-[390px] object-contain drop-shadow-[0_0_70px_rgba(34,211,238,0.45)]"
            />

<div className="mt-4 rounded-3xl border border-cyan-400/20 bg-[#0f172a]/80 p-5 text-center">
  <p className="text-cyan-300 font-black">
    Gaby guides every lesson, reinforces concepts in Discord, and helps you learn inside the simulator.
  </p>
</div>
          </div>
        </div>

        <div className="animate-[fadeUp_0.8s_ease-out_both]">
          <div className="flex items-center gap-3">
            <p className="text-3xl md:text-4xl font-black tracking-[0.18em] uppercase">
              <span className="text-white">Welcome To TradeNest</span>
              <span className="text-cyan-400">X</span>
            </p>

            <div className="h-[2px] flex-1 bg-gradient-to-r from-cyan-400/60 to-transparent" />
          </div>

          <div className="mt-4 grid gap-1">
            <div className="relative rounded-3xl border border-cyan-400/25 bg-[#0f172a]/90 p-6 shadow-[0_0_35px_rgba(34,211,238,0.08)] transition-all duration-300 hover:border-cyan-300/50 hover:shadow-[0_0_45px_rgba(34,211,238,0.16)]">
              <div className="hidden lg:block absolute -left-3 top-8 h-6 w-6 rotate-45 border-l border-b border-cyan-400/25 bg-[#0f172a]" />

              <p className="text-2xl font-black text-cyan-300">
                Hi, I&apos;m Gaby.
              </p>

              <p className="mt-3 text-zinc-300 text-lg leading-8">
                I&apos;ll guide you through TradeNestX step by step so you can
                learn first, practice safely, and build confidence before risking real money.
              </p>
            </div>

<div className="mt-3 rounded-3xl border border-cyan-400/20 bg-[#0f172a]/80 p-7">
  <h3 className="text-2xl font-black text-white">
    How TradeNest<span className="text-cyan-400">X</span> Works
  </h3>

  <p className="mt-4 text-zinc-300 text-lg leading-8">
    TradeNestX is designed to guide you step by step. You do not need to rush,
    guess, or jump between random trading advice.
  </p>

  <p className="mt-4 text-zinc-300 text-lg leading-8">
    Follow this process to get the best results:
  </p>

  <div className="mt-6 space-y-5">

    <div>
      <p className="font-black text-cyan-300">
        1. Complete Today's Lesson
      </p>
      <p className="text-zinc-400">
        Learn one concept at a time and build a strong foundation.
      </p>
    </div>

    <div>
      <p className="font-black text-cyan-300">
        2. Practice In The Simulator
      </p>
      <p className="text-zinc-400">
        Apply what you learn in a risk-free environment before using real money.
      </p>
    </div>

    <div>
      <p className="font-black text-cyan-300">
        3. Ask Gaby Questions
      </p>
      <p className="text-zinc-400">
        Gaby is available throughout the academy, simulator, and Discord to help explain concepts and answer questions.
      </p>
    </div>

    <div>
      <p className="font-black text-cyan-300">
        4. Continue Learning In Discord
      </p>
<p className="text-zinc-400">
  Discord is where you receive lesson reinforcement, educational reminders,
  simulator challenges, community support, platform updates, and direct access
  to Gaby. Members who actively use Discord get the most value from TradeNestX.
</p>
    </div>

    <div>
      <p className="font-black text-cyan-300">
        5. Follow The Learning Path
      </p>
      <p className="text-zinc-400">
        Lessons unlock one at a time. Even if you leave for weeks, only your next lesson becomes available. This keeps your learning focused and structured.
      </p>
    </div>

  </div>

  <p className="mt-6 text-cyan-300 font-black text-lg">
    Learn. Practice. Ask. Improve.
  </p>
</div>
</div>
          <div className="mt-3 rounded-3xl border border-orange-400/30 bg-orange-500/10 p-6">
            <h3 className="flex items-center gap-2 text-xl font-black text-orange-300">
              <span>⚠️</span>
              Important Disclaimer
            </h3>

            <p className="mt-3 text-zinc-300 leading-8">
              TradeNestX is education only. We do not provide financial advice,
              investment recommendations, or trading signals.
            </p>


          </div>

<div className="mt-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5">
  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
    <div className="w-full md:max-w-[520px]">
      <h3 className="text-lg font-black text-emerald-300">
        Ready To Start Your Journey?
      </h3>

      <p className="mt-2 text-sm text-zinc-300">
        Complete Lesson 1, join the Discord community, and begin building real
        trading skills one step at a time with Gaby guiding the way.
      </p>
    </div>

    <button
      onClick={onStartLesson}
      className="group w-full shrink-0 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-6 py-3 text-center font-black text-cyan-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] md:w-auto"
    >
      <span className="flex items-center justify-center gap-2">
        Start Lesson 1
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </button>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}