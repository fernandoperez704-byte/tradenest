"use client";

import { useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Candle = {
  name: string;
  open: number;
  close: number;
  high: number;
  low: number;
};

function createCandles(): Candle[] {
  let price = 100;

  return Array.from({ length: 20 }, (_, i) => {
    const open = price;
    const close = open + Math.floor(Math.random() * 20 - 10);
    const high = Math.max(open, close) + Math.floor(Math.random() * 8);
    const low = Math.min(open, close) - Math.floor(Math.random() * 8);

    price = close;

    return {
      name: `${i + 1}`,
      open,
      close,
      high,
      low,
    };
  });
}

export default function SimulatorPage() {
  const [candles, setCandles] = useState<Candle[]>(createCandles());
  const [balance, setBalance] = useState(10000);
  const [result, setResult] = useState("");

  function trade(type: "BUY" | "SELL") {
    const last = candles[candles.length - 1];
    const win =
      (type === "BUY" && last.close > last.open) ||
      (type === "SELL" && last.close < last.open);

    if (win) {
      setBalance(balance + 100);
      setResult(`${type} won +$100`);
    } else {
      setBalance(balance - 100);
      setResult(`${type} lost -$100`);
    }

    setCandles(createCandles());
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-cyan-400 text-center">
        Trade Simulator
      </h1>

      <p className="text-center mt-4 text-xl">
        Balance: ${balance}
      </p>

      <div className="mt-8 bg-zinc-900 rounded-2xl p-6 h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={candles}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={["dataMin - 10", "dataMax + 10"]} />
            <Tooltip />
            <Line dataKey="high" stroke="#8884d8" dot={false} />
            <Line dataKey="low" stroke="#8884d8" dot={false} />
            <Bar dataKey="close" fill="#22c55e" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {result && (
        <p className="text-center mt-6 text-xl font-bold">
          {result}
        </p>
      )}

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => trade("BUY")}
          className="px-8 py-3 bg-green-500 rounded-xl font-bold"
        >
          BUY
        </button>

        <button
          onClick={() => trade("SELL")}
          className="px-8 py-3 bg-red-500 rounded-xl font-bold"
        >
          SELL
        </button>
      </div>
    </main>
  );
}