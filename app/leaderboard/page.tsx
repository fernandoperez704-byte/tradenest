"use client";

import Navbar from "../components/Navbar";

const traders = [
  {
    name: "Fernando",
    pnl: 2450,
    winRate: 68,
  },
  {
    name: "Alex",
    pnl: 1820,
    winRate: 61,
  },
  {
    name: "Sarah",
    pnl: 1390,
    winRate: 57,
  },
];

export default function LeaderboardPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold text-cyan-400 text-center mt-6">
            Global Leaderboard
          </h1>

          <div className="mt-10 space-y-4">
            {traders.map((trader, index) => (
              <div
                key={trader.name}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold text-2xl">
                    #{index + 1}
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">
                      {trader.name}
                    </h2>

                    <p className="text-gray-400">
                      Win Rate: {trader.winRate}%
                    </p>
                  </div>
                </div>

                <div className="text-green-400 text-3xl font-bold">
                  +${trader.pnl.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}