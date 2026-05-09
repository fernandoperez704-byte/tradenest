import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-zinc-950 border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-emerald-400">
        TradeNest
      </Link>

      <div className="flex gap-6 text-sm">
        <Link href="/learn" className="hover:text-emerald-400">
          Learn
        </Link>

        <Link href="/simulator" className="hover:text-emerald-400">
          Simulator
        </Link>

        <Link href="/leaderboard" className="hover:text-emerald-400">
          Leaderboard
        </Link>
      </div>
    </nav>
  );
}