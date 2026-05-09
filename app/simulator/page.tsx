"use client";

import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type PricePoint = {
  time: string;
  price: number;
};

type Trade = {
  type: string;
  coin: string;
  price: number;
  time: string;
};

const startingPrices = {
  BTC: 103000,
  ETH: 2500,
  SOL: 180,
};

const startingBalance = 10000;

export default function SimulatorPage() {
  const [selectedCoin, setSelectedCoin] =
    useState<"BTC" | "ETH" | "SOL">("BTC");

  const [prices, setPrices] = useState(startingPrices);

  const [history, setHistory] = useState<PricePoint[]>([]);

  const [balance, setBalance] =
    useState(startingBalance);

  const [owned, setOwned] = useState(0);

  const [message, setMessage] = useState("");

  const [trades, setTrades] = useState<Trade[]>([]);

  function updatePrices() {
    setPrices((prev) => {
      const updated = {
        BTC: Math.max(
          1000,
          prev.BTC + Math.floor(Math.random() * 800 - 400)
        ),

        ETH: Math.max(
          100,
          prev.ETH + Math.floor(Math.random() * 60 - 30)
        ),

        SOL: Math.max(
          10,
          prev.SOL + Math.floor(Math.random() * 20 - 10)
        ),
      };

      const selectedPrice = updated[selectedCoin];

      setHistory((old) => [
        ...old.slice(-29),
        {
          time: new Date().toLocaleTimeString(),
          price: selectedPrice,
        },
      ]);

      return updated;
    });
  }

  useEffect(() => {
    updatePrices();

    const interval = setInterval(updatePrices, 1000);

    return () => clearInterval(interval);
  }, [selectedCoin]);

  const currentPrice = prices[selectedCoin];

  function buyCoin() {
    const amount = 100;

    if (balance < amount) {
      setMessage("Not enough balance.");
      return;
    }

    setBalance((prev) => prev - amount);

    setOwned((prev) => prev + amount / currentPrice);

    setTrades((prev) => [
      {
        type: "BUY",
        coin: selectedCoin,
        price: currentPrice,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);

    setMessage(`Bought $100 of ${selectedCoin}`);
  }

  function sellCoin() {
    if (owned <= 0) {
      setMessage(`No ${selectedCoin} owned.`);
      return;
    }

    const value = owned * currentPrice;

    setBalance((prev) => prev + value);

    setOwned(0);

    setTrades((prev) => [
      {
        type: "SELL",
        coin: selectedCoin,
        price: currentPrice,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);

    setMessage(
      `Sold ${selectedCoin} for $${value.toFixed(2)}`
    );
  }

  const portfolioValue =
    balance + owned * currentPrice;

  const pnl =
    portfolioValue - startingBalance;

  const pnlPercent =
    (pnl / startingBalance) * 100;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-8">
        <h1 className="text-4xl font-bold text-cyan-400 text-center">
          Multi-Coin Simulator
        </h1>

        <div className="mt-6 flex justify-center gap-4">
          {["BTC", "ETH", "SOL"].map((coin) => (
            <button
              key={coin}
              onClick={() =>
                setSelectedCoin(
                  coin as "BTC" | "ETH" | "SOL"
                )
              }
              className={`px-6 py-2 rounded-xl font-bold ${
                selectedCoin === coin
                  ? "bg-cyan-500 text-black"
                  : "bg-zinc-800"
              }`}
            >
              {coin}
            </button>
          ))}
        </div>

        <div className="mt-6 text-center space-y-2">
          <p className="text-2xl">
            {selectedCoin} Price: $
            {currentPrice.toLocaleString()}
          </p>

          <p>Cash Balance: ${balance.toFixed(2)}</p>

          <p>
            {selectedCoin} Owned: {owned.toFixed(6)}
          </p>

          <p className="text-emerald-400 font-bold">
            Portfolio Value: $
            {portfolioValue.toFixed(2)}
          </p>

          <p
            className={`text-xl font-bold ${
              pnl >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            P/L: ${pnl.toFixed(2)} (
            {pnlPercent.toFixed(2)}%)
          </p>
        </div>

        <div className="mt-8 bg-zinc-900 rounded-2xl p-6 h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="time" hide />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="price"
                stroke="#22c55e"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {message && (
          <p className="text-center mt-6 text-xl font-bold">
            {message}
          </p>
        )}

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={buyCoin}
            className="px-8 py-3 bg-green-500 rounded-xl font-bold"
          >
            BUY $100
          </button>

          <button
            onClick={sellCoin}
            className="px-8 py-3 bg-red-500 rounded-xl font-bold"
          >
            SELL
          </button>
        </div>

        <div className="mt-12 bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">
            Trade History
          </h2>

          <div className="space-y-3">
            {trades.length === 0 && (
              <p className="text-gray-400">
                No trades yet.
              </p>
            )}

            {trades.map((trade, index) => (
              <div
                key={index}
                className="flex justify-between bg-zinc-800 p-4 rounded-xl"
              >
                <div>
                  <span
                    className={
                      trade.type === "BUY"
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {trade.type}
                  </span>{" "}
                  {trade.coin}
                </div>

                <div>
                  ${trade.price.toLocaleString()}
                </div>

                <div>{trade.time}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}