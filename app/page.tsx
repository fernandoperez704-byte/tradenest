import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-emerald-400">
        TradeNest
      </h1>

      <p className="mt-4 text-xl">
        Learn and practice trading risk-free.
      </p>

      <div className="mt-10 flex flex-col gap-4">
        <Link
          href="/learn"
          className="px-8 py-3 bg-cyan-500 rounded-xl text-center"
        >
          Learn Trading
        </Link>

        <Link
          href="/simulator"
          className="px-8 py-3 bg-blue-500 rounded-xl text-center"
        >
          Trade Simulator
        </Link>

        <Link
          href="/leaderboard"
          className="px-8 py-3 bg-purple-300 text-black rounded-xl text-center"
        >
          Leaderboard
        </Link>
      </div>
    </div>
  );
}