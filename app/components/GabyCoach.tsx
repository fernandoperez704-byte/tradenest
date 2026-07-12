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
  <div className="mt-5 rounded-[26px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-4 shadow-[0_0_35px_rgba(34,211,238,0.14)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_0_50px_rgba(34,211,238,0.22)]">
    <div className="grid grid-cols-1 items-center gap-3 lg:grid-cols-[90px_1fr]">
      <div className="flex items-center justify-center">
        <Image
          src="/gaby.png"
          alt="Gaby AI"
          width={120}
          height={120}
          className="h-[120px] w-[120px] object-contain drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]"
        />
      </div>

      <div>
        <div className="rounded-xl border border-cyan-400/30 bg-[#0f172a] px-4 py-3">
          {isGabyTyping ? (
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]" />
              </div>

              <p className="font-bold text-cyan-300">
                Gaby is typing...
              </p>
            </div>
          ) : (
            <p className="border-l-4 border-cyan-400 pl-3 text-sm leading-6 text-zinc-100">
              {gabyAnswer}
            </p>
          )}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {questions.map((question) => (
            <button
              key={question}
              onClick={() => {
                askGaby(question);
                setGabyQuestion("");
              }}
              className="min-h-[48px] rounded-xl border border-cyan-400/20 bg-[#0b1120] px-3 py-2 text-xs font-bold text-white transition-all duration-300 hover:-translate-y-[1px] hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              {question}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-col gap-2 md:flex-row">
          <input
            value={gabyQuestion}
            onChange={(e) => setGabyQuestion(e.target.value)}
            placeholder="Ask Gaby anything about this lesson..."
            className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-cyan-400 md:flex-1"
          />

          <button
            onClick={() => askGaby(gabyQuestion)}
            disabled={isGabyTyping}
            className="w-full shrink-0 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-black text-black transition-all duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
          >
            {isGabyTyping ? "Thinking..." : "Ask Gaby"}
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}