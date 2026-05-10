import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-black border-b border-zinc-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-cyan-400">
          TradeNestX
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/learn" className="px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-cyan-500 hover:text-black">
            Learn
          </Link>

          <Link href="/simulator" className="px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-cyan-500 hover:text-black">
            Simulator
          </Link>

          <Link href="/leaderboard" className="px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-cyan-500 hover:text-black">
            Leaderboard
          </Link>

          <Link href="/news" className="px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-cyan-500 hover:text-black">
            News
          </Link>

          <Link href="/profile" className="px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-cyan-500 hover:text-black">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}