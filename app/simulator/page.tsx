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
  amount: number;
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
  const [balance, setBalance] = useState(startingBalance);
  const [owned, setOwned] = useState(0);
  const [message, setMessage] = useState("");
  const [tradeAmount, setTradeAmount] = useState<number | "">(100);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [now, setNow] = useState(new Date());

  function updatePrices() {
    setPrices((prev) => {
      const updated = {
        BTC: Math.max(1000, prev.BTC + Math.floor(Math.random() * 800 - 400)),
        ETH: Math.max(100, prev.ETH + Math.floor(Math.random() * 60 - 30)),
        SOL: Math.max(10, prev.SOL + Math.floor(Math.random() * 20 - 10)),
      };

      setHistory((old) => [
        ...old.slice(-29),
        {
          time: new Date().toLocaleTimeString(),
          price: updated[selectedCoin],
        },
      ]);

      return updated;
    });
  }

  useEffect(() => {
    updatePrices();

    const priceInterval = setInterval(updatePrices, 1000);
    const clockInterval = setInterval(() => setNow(new Date()), 1000);

    return () => {
      clearInterval(priceInterval);
      clearInterval(clockInterval);
    };
  }, [selectedCoin]);

  const currentPrice = prices[selectedCoin];

  function buyCoin() {
    if (!tradeAmount || balance < tradeAmount) {
      setMessage("Invalid trade amount.");
      return;
    }

    setBalance((prev) => prev - tradeAmount);
    setOwned((prev) => prev + tradeAmount / currentPrice);

    setTrades((prev) => [
      {
        type: "BUY",
        coin: selectedCoin,
        amount: tradeAmount,
        price: currentPrice,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);

    setMessage(`Bought $${tradeAmount} of ${selectedCoin}`);
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
        amount: value,
        price: currentPrice,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);

    setMessage(`Sold ${selectedCoin} for $${value.toFixed(2)}`);
  }

  const portfolioValue = balance + owned * currentPrice;
  const totalPnl = portfolioValue - startingBalance;
  const totalPnlPercent = (totalPnl / startingBalance) * 100;

  const dailyPnl = totalPnl;
  const weeklyPnl = totalPnl * 1.8;
  const monthlyPnl = totalPnl * 3.5;

  function pnlColor(value: number) {
    return value >= 0 ? "text-green-400" : "text-red-400";
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-8">
        <h1 className="text-5xl font-bold text-cyan-400 text-center mt-6">
          Multi-Coin Simulator
        </h1>

        <div className="mt-8 grid md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <div className="bg-zinc-900 p-5 rounded-2xl text-center">
            <p className="text-gray-400">Today</p>
            <p className="text-xl font-bold">
              {now.toLocaleDateString()}
            </p>
            <p className="text-cyan-400">
              {now.toLocaleTimeString()}
            </p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-2xl text-center">
            <p className="text-gray-400">Daily P/L</p>
            <p className={`text-2xl font-bold ${pnlColor(dailyPnl)}`}>
              ${dailyPnl.toFixed(2)}
            </p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-2xl text-center">
            <p className="text-gray-400">Weekly P/L</p>
            <p className={`text-2xl font-bold ${pnlColor(weeklyPnl)}`}>
              ${weeklyPnl.toFixed(2)}
            </p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-2xl text-center">
            <p className="text-gray-400">Monthly P/L</p>
            <p className={`text-2xl font-bold ${pnlColor(monthlyPnl)}`}>
              ${monthlyPnl.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          {["BTC", "ETH", "SOL"].map((coin) => (
            <button
              key={coin}
              onClick={() =>
                setSelectedCoin(coin as "BTC" | "ETH" | "SOL")
              }
              className={`px-6 py-3 rounded-xl font-bold text-lg ${
                selectedCoin === coin
                  ? "bg-cyan-500 text-black"
                  : "bg-zinc-800"
              }`}
            >
              {coin}
            </button>
          ))}
        </div>

        <div className="mt-8 text-center space-y-3">
          <p className="text-4xl font-bold">
            {selectedCoin} Price: ${currentPrice.toLocaleString()}
          </p>

          <p className="text-xl">Cash Balance: ${balance.toFixed(2)}</p>

          <p className="text-xl">
            {selectedCoin} Owned: {owned.toFixed(6)}
          </p>

          <p className="text-2xl text-emerald-400 font-bold">
            Portfolio Value: ${portfolioValue.toFixed(2)}
          </p>

          <p className={`text-2xl font-bold ${pnlColor(totalPnl)}`}>
            Total P/L: ${totalPnl.toFixed(2)} ({totalPnlPercent.toFixed(2)}%)
          </p>
        </div>

        <div className="mt-10 bg-zinc-900 rounded-2xl p-6 h-[420px]">
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
                strokeWidth={4}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-10 flex justify-center">
          <input
            type="number"
            value={tradeAmount}
            placeholder="Enter amount"
            onChange={(e) => {
              const value = e.target.value;
              setTradeAmount(value === "" ? "" : Number(value));
            }}
            className="bg-zinc-800 text-white px-4 py-3 rounded-xl w-56 text-center text-xl"
          />
        </div>

        {message && (
          <p className="text-center mt-6 text-xl font-bold">
            {message}
          </p>
        )}

        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={buyCoin}
            className="px-10 py-4 bg-green-500 rounded-xl font-bold text-xl"
          >
            BUY
          </button>

          <button
            onClick={sellCoin}
            className="px-10 py-4 bg-red-500 rounded-xl font-bold text-xl"
          >
            SELL
          </button>
        </div>

        <div className="mt-14 bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-3xl font-bold mb-6">Trade History</h2>

          <div className="space-y-3">
            {trades.length === 0 && (
              <p className="text-gray-400">No trades yet.</p>
            )}

            {trades.map((trade, index) => (
              <div
                key={index}
                className="grid md:grid-cols-4 gap-4 bg-zinc-800 p-4 rounded-xl"
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

                <div>${trade.amount.toFixed(2)}</div>

                <div>@ ${trade.price.toLocaleString()}</div>

                <div>{trade.time}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}