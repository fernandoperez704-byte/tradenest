import Navbar from "../components/Navbar";

const traders = [
  { name: "Fernando", score: 1240, level: 8 },
  { name: "Alex", score: 980, level: 6 },
  { name: "Mia", score: 760, level: 5 },
  { name: "Jay", score: 540, level: 4 },
];

export default function LeaderboardPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-10">
        <h1 className="text-5xl font-bold text-purple-400 text-center">
          Leaderboard
        </h1>

        <p className="text-center text-gray-400 mt-4">
          Top TradeNest practice traders.
        </p>

        <div className="max-w-2xl mx-auto mt-10 space-y-4">
          {traders.map((trader, index) => (
            <div
              key={trader.name}
              className="bg-zinc-900 rounded-2xl p-5 flex justify-between items-center"
            >
              <div>
                <p className="text-xl font-bold">
                  #{index + 1} {trader.name}
                </p>
                <p className="text-gray-400">Level {trader.level}</p>
              </div>

              <p className="text-emerald-400 font-bold text-xl">
                {trader.score} XP
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}