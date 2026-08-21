"use client";

import Image from "next/image";

type GabyCoachProps = {
  gabyQuestion: string;
  setGabyQuestion: (value: string) => void;
  gabyAnswer: string;
  isGabyTyping: boolean;
  askGaby: (question?: string) => void;
  questions: string[];
  upgradeRequired?: boolean;
};

export default function GabyCoach({
  gabyQuestion,
  setGabyQuestion,
  gabyAnswer,
  isGabyTyping,
  askGaby,
  questions,
  upgradeRequired = false,
}: GabyCoachProps) {
  async function upgrade() {
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  return (
    <div className="mt-5 rounded-[26px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-4 shadow-[0_0_35px_rgba(34,211,238,0.14)]">
      <div className="grid grid-cols-1 items-center gap-3 lg:grid-cols-[90px_1fr]">
        <div className="flex justify-center">
          <Image
            src="/gaby.png"
            alt="Gaby AI"
            width={120}
            height={120}
            className="h-[120px] w-[120px] object-contain"
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
                <p className="font-bold text-cyan-300">Gaby is typing...</p>
              </div>
            ) : (
              <>
                <p className="border-l-4 border-cyan-400 pl-3 text-sm leading-6 text-zinc-100">
                  {gabyAnswer}
                </p>

                {upgradeRequired && (
                  <button
                    onClick={upgrade}
                    className="mt-3 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-black text-black"
                  >
                    Upgrade to TradeNestX Pro
                  </button>
                )}
              </>
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
                className="min-h-[48px] rounded-xl border border-cyan-400/20 bg-[#0b1120] px-3 py-2 text-xs font-bold text-white hover:border-cyan-400 hover:text-cyan-300"
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
              className="w-full rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400 md:flex-1"
            />

            <button
              onClick={() => askGaby(gabyQuestion)}
              disabled={isGabyTyping}
              className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-black text-black disabled:opacity-50"
            >
              {isGabyTyping ? "Thinking..." : "Ask Gaby"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}