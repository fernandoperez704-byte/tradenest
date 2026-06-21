"use client";

import Image from "next/image";

type GabyCoachProps = {
  gabyQuestion: string;
  setGabyQuestion: (value: string) => void;
  gabyAnswer: string;
  isGabyTyping: boolean;
  askGaby: (question?: string) => void;
  questions: string[];
};

export default function GabyCoach({
  gabyQuestion,
  setGabyQuestion,
  gabyAnswer,
  isGabyTyping,
  askGaby,
  questions,
}: GabyCoachProps) {
  return (
    <div className="mt-8 rounded-[34px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-5 shadow-[0_0_45px_rgba(34,211,238,0.18)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_0_65px_rgba(34,211,238,0.28)]">
      <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-4 items-center">
        <div className="flex items-center justify-center pl-2">
          <Image
            src="/gaby.png"
            alt="Gaby AI"
            width={210}
            height={210}
            className="h-[210px] w-[210px] object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.35)]"
          />
        </div>

        <div>
          <div className="rounded-2xl border border-cyan-400/30 bg-[#0f172a] p-5">
            {isGabyTyping ? (
              <div className="flex items-center gap-3 pl-4">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]"></span>
                </div>

                <p className="text-cyan-300 font-bold">
                  Gaby is typing...
                </p>
              </div>
            ) : (
              <p className="border-l-4 border-cyan-400 pl-4 text-zinc-100 leading-8">
                {gabyAnswer}
              </p>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {questions.map((question) => (
              <button
                key={question}
                onClick={() => {
                  askGaby(question);
                  setGabyQuestion("");
                }}
                className="rounded-xl border border-cyan-400/20 bg-[#0b1120] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
              >
                {question}
              </button>
            ))}
          </div>

<div className="mt-4 flex flex-col gap-3 md:flex-row">
  <input
    value={gabyQuestion}
    onChange={(e) => setGabyQuestion(e.target.value)}
    placeholder="Ask Gaby anything about this lesson..."
    className="w-full min-w-0 rounded-2xl border border-white/10 bg-[#0f172a] px-5 py-4 text-white outline-none transition-all duration-300 focus:border-cyan-400 md:flex-1"
  />

  <button
    onClick={() => askGaby(gabyQuestion)}
    disabled={isGabyTyping}
    className="w-full shrink-0 rounded-2xl bg-cyan-400 px-6 py-4 font-black text-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
  >
    {isGabyTyping ? "Thinking..." : "Ask Gaby"}
  </button>
</div>
        </div>
      </div>
    </div>
  );
}