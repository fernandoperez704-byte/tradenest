"use client";

import Navbar from "../components/Navbar";

const traders = [
  { rank: 1, name: "Alex", profit: 1240, winRate: "72%" },
  { rank: 2, name: "Mia", profit: 980, winRate: "68%" },
  { rank: 3, name: "Jordan", profit: 720, winRate: "61%" },
  { rank: 4, name: "Sam", profit: 410, winRate: "55%" },
  { rank: 5, name: "You", profit: 0, winRate: "0%" },
];

export default function LeaderboardPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold text-cyan-400 text-center mt-6">
            Leaderboard
          </h1>

          <p className="text-center text-gray-400 mt-4 text-xl">
            Track top paper traders and improve your ranking.
          </p>

          <div className="mt-10 bg-zinc-900 rounded-2xl p-6">
            <div className="grid grid-cols-4 text-gray-400 font-bold border-b border-zinc-700 pb-4">
              <p>Rank</p>
              <p>Name</p>
              <p>Profit</p>
              <p>Win Rate</p>
            </div>

            <div className="space-y-3 mt-4">
              {traders.map((trader) => (
                <div
                  key={trader.rank}
                  className={`grid grid-cols-4 rounded-xl p-4 ${
                    trader.name === "You"
                      ? "bg-cyan-500 text-black font-bold"
                      : "bg-zinc-800"
                  }`}
                >
                  <p>#{trader.rank}</p>
                  <p>{trader.name}</p>
                  <p>${trader.profit.toLocaleString()}</p>
                  <p>{trader.winRate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}