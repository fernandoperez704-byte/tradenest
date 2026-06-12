"use client";

import { useState } from "react";

type GabySimulatorCoachProps = {
  mode: string;
  selectedCoin: string;
  trades: any[];
  futuresHistory: any[];
  positions: any;
  futuresPositions: any[];
  balance: number;
  marginUsed: number;
};

export default function GabySimulatorCoach({
  mode,
  selectedCoin,
  trades,
  futuresHistory,
  positions,
  futuresPositions,
  balance,
  marginUsed,
}: GabySimulatorCoachProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "Hi, I’m Gaby. I can help explain the simulator, spot trading, futures, leverage, liquidation, and review your practice trades."
  );
  const [loading, setLoading] = useState(false);

  async function askGaby(customQuestion?: string) {
    const finalQuestion = customQuestion || question;

    if (!finalQuestion.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/gaby-simulator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: finalQuestion,
          simulatorContext: {
            mode,
            selectedCoin,
            balance,
            marginUsed,
            trades: trades.slice(-5),
            futuresHistory: futuresHistory.slice(-5),
            positions,
            futuresPositions,
          },
        }),
      });

      const data = await res.json();

      setAnswer(data.answer || "Gaby could not respond right now.");
      setQuestion("");
    } catch (error) {
      setAnswer("Gaby is having trouble reviewing the simulator right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-cyan-400/20 bg-[#0f172a]/90 p-5 shadow-[0_0_35px_rgba(34,211,238,0.08)]">


      <div className="rounded-2xl border border-zinc-800 bg-[#020617] p-5 text-base leading-7 text-zinc-200">
        {loading ? "Gaby is reviewing..." : answer}
      </div>

<div className="mt-4 flex gap-2">
  <button
    onClick={() => window.dispatchEvent(new Event("startSimulatorTour"))}
    className="h-11 rounded-xl border border-zinc-800 bg-[#111827] px-4 text-sm font-bold text-zinc-300 hover:border-cyan-400 hover:text-cyan-300"
  >
    Explain Panel
  </button>

  <button
    onClick={() => askGaby("Review my latest practice trade.")}
    className="h-11 rounded-xl border border-zinc-800 bg-[#111827] px-4 text-sm font-bold text-zinc-300 hover:border-cyan-400 hover:text-cyan-300"
  >
    Review Trade
  </button>
</div>

      <div className="mt-4 flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") askGaby();
          }}
          placeholder="Ask me about the simulator or review a practice trade."
          className="h-11 flex-1 rounded-xl border border-zinc-800 bg-[#020617] px-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-cyan-400"
        />

        <button
          onClick={() => askGaby()}
          disabled={loading}
          className="h-11 rounded-xl bg-cyan-500 px-4 text-sm font-black text-black hover:bg-cyan-400 disabled:opacity-50"
        >
          Ask
        </button>
      </div>
    </div>
  );
}