import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-zinc-950 border-b border-zinc-800 px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-cyan-400">
        TradeNest
      </h1>

      <div className="flex gap-8 text-lg font-medium">
        <Link
          href="/learn"
          className="hover:text-cyan-400 transition"
        >
          Learn
        </Link>

        <Link
          href="/simulator"
          className="hover:text-cyan-400 transition"
        >
          Simulator
        </Link>

        <Link
          href="/leaderboard"
          className="hover:text-cyan-400 transition"
        >
          Leaderboard
        </Link>
      </div>
    </nav>
  );
}