"use client";

import { useState } from "react";

export default function SimulatorPage() {
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");

  function trade(action: string) {
    const success = Math.random() > 0.5;

    if (success) {
      setScore(score + 1);
      setResult(`${action} trade won`);
    } else {
      setScore(score - 1);
      setResult(`${action} trade lost`);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-emerald-400">
        Trade Simulator
      </h1>

      <p className="mt-6 text-xl">
        Practice trading risk-free.
      </p>

      <div className="mt-10 flex gap-2 items-end h-40">
        <div className="bg-green-500 w-10 h-24"></div>
        <div className="bg-red-500 w-10 h-32"></div>
        <div className="bg-green-500 w-10 h-20"></div>
        <div className="bg-red-500 w-10 h-28"></div>
      </div>

      <p className="mt-6 text-2xl font-bold">
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
          className="px-8 py-3 bg-emerald-500 rounded-xl"
        >
          BUY
        </button>

        <button
          onClick={() => trade("SELL")}
          className="px-8 py-3 bg-red-500 rounded-xl"
        >
          SELL
        </button>
      </div>
    </div>
  );
}