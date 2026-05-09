"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [btc, setBtc] = useState<number | null>(null);
  const [eth, setEth] = useState<number | null>(null);

  useEffect(() => {
    async function fetchPrices() {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
      );

      const data = await res.json();

      setBtc(data.bitcoin.usd);
      setEth(data.ethereum.usd);
    }

    fetchPrices();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-emerald-400">
          TradeNest
        </h1>

        <p className="mt-5 text-xl text-gray-300">
          Learn trading without risking real money.
        </p>

        {/* LIVE PRICES */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          <div className="bg-zinc-900 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-yellow-400">
              Bitcoin
            </h2>

            <p className="mt-3 text-3xl font-bold">
              {btc ? `$${btc.toLocaleString()}` : "Loading..."}
            </p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-blue-400">
              Ethereum
            </h2>

            <p className="mt-3 text-3xl font-bold">
              {eth ? `$${eth.toLocaleString()}` : "Loading..."}
            </p>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/learn"
            className="bg-emerald-500 hover:bg-emerald-600 px-8 py-4 rounded-2xl font-bold"
          >
            Learn Trading
          </Link>

          <Link
            href="/simulator"
            className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-2xl font-bold"
          >
            Trade Simulator
          </Link>

          <Link
            href="/leaderboard"
            className="bg-purple-500 hover:bg-purple-600 px-8 py-4 rounded-2xl font-bold"
          >
            Leaderboard
          </Link>
        </div>
      </div>
    </main>
  );
}