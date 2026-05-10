import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-zinc-950 border-b border-zinc-800 px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition"
        >
          TradeNest
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/learn"
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-cyan-500 hover:text-black transition"
          >
            Learn
          </Link>

          <Link
            href="/simulator"
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-cyan-500 hover:text-black transition"
          >
            Simulator
          </Link>

          <Link
            href="/leaderboard"
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-cyan-500 hover:text-black transition"
          >
            Leaderboard
          </Link>
        <a href="/news" className="hover:text-cyan-400">
  News
</a>
<Link
  href="/profile"
  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-cyan-500 hover:text-black transition"
>
  Profile
</Link>
        </div>
      </div>
    </nav>
  );
}