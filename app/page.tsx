"use client";

import { useEffect, useState } from "react";

type Candle = {
  bullish: boolean;
  height: number;
};

export default function Home() {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");

  useEffect(() => {
    generateCandles();
  }, []);

  function generateCandles() {
    const newCandles = Array.from({ length: 12 }, () => {
      const bullish = Math.random() > 0.5;

      return {
        bullish,
        height: Math.floor(Math.random() * 120) + 20,
      };
    });

    setCandles(newCandles);
  }

  function trade(choice: "BUY" | "SELL") {
    const next = candles[Math.floor(Math.random() * candles.length)];

    const win =
      (choice === "BUY" && next.bullish) ||
      (choice === "SELL" && !next.bullish);

    if (win) {
      setScore((s) => s + 1);
      setResult("WIN ✅");
    } else {
      setResult("LOSS ❌");
    }

    generateCandles();
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold text-emerald-400">
        TradeNest
      </h1>

      <p className="mt-4 text-center text-gray-300">
        Practice trading before risking real money.
      </p>

      <div className="mt-10 bg-zinc-900 p-6 rounded-2xl w-full max-w-3xl">
        <div className="flex items-end justify-center gap-2 h-56">
          {candles.map((c, i) => (
            <div
              key={i}
              className={c.bullish ? "bg-emerald-400 w-6" : "bg-red-500 w-6"}
              style={{
                height: `${c.height}px`,
              }}
            />
          ))}
        </div>
      </div>

      <p className="mt-6 text-xl font-bold">
        Score: {score}
      </p>

      {result && (
        <p className="mt-3 text-lg">
          {result}
        </p>
      )}

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => trade("BUY")}
          className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-bold"
        >
          BUY
        </button>

        <button
          onClick={() => trade("SELL")}
          className="px-8 py-3 bg-red-500 hover:bg-red-600 rounded-xl font-bold"
        >
          SELL
        </button>
      </div>
    </main>
  );
}