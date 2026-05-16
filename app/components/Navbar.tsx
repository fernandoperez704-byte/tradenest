"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-xl">
  <div className="max-w-[1800px] mx-auto flex items-center justify-between px-8 h-[72px]">

  <div className="flex items-center gap-16">

    <Link
      href="/"
      className="text-4xl font-black tracking-tight text-cyan-400 transition-all duration-300 hover:text-cyan-300"
    >
      TradeNestX
    </Link>

    <div className="flex items-center gap-4">

      <Link
        href="/learn"
        className={`px-5 h-11 flex items-center rounded-xl border text-sm font-semibold transition-all duration-200 hover:-translate-y-[1px] ${
          pathname === "/learn"
            ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
            : "border-zinc-800 bg-[#18181b] text-zinc-200 hover:border-cyan-500/40 hover:text-cyan-400"
        }`}
      >
        Learn
      </Link>

      <Link
        href="/simulator"
        className={`px-5 h-11 flex items-center rounded-xl border text-sm font-semibold transition-all duration-200 hover:-translate-y-[1px] ${
          pathname === "/simulator"
            ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
            : "border-zinc-800 bg-[#18181b] text-zinc-200 hover:border-cyan-500/40 hover:text-cyan-400"
        }`}
      >
        Simulator
      </Link>

      <Link
        href="/leaderboard"
        className={`px-5 h-11 flex items-center rounded-xl border text-sm font-semibold transition-all duration-200 hover:-translate-y-[1px] ${
          pathname === "/leaderboard"
            ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
            : "border-zinc-800 bg-[#18181b] text-zinc-200 hover:border-cyan-500/40 hover:text-cyan-400"
        }`}
      >
        Leaderboard
      </Link>

      <Link
        href="/news"
        className={`px-5 h-11 flex items-center rounded-xl border text-sm font-semibold transition-all duration-200 hover:-translate-y-[1px] ${
          pathname === "/news"
            ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
            : "border-zinc-800 bg-[#18181b] text-zinc-200 hover:border-cyan-500/40 hover:text-cyan-400"
        }`}
      >
        News
      </Link>

      <Link
        href="/profile"
        className={`px-5 h-11 flex items-center rounded-xl border text-sm font-semibold transition-all duration-200 hover:-translate-y-[1px] ${
          pathname === "/profile"
            ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
            : "border-zinc-800 bg-[#18181b] text-zinc-200 hover:border-cyan-500/40 hover:text-cyan-400"
        }`}
      >
        Profile
      </Link>

    </div>
  </div>

  <div className="flex items-center gap-4">

    <SignInButton mode="modal">
      <button className="h-11 px-5 rounded-xl bg-cyan-500 text-black text-sm font-black transition-all duration-200 hover:bg-cyan-400">
        Sign In
      </button>
    </SignInButton>

    <SignUpButton mode="modal">
      <button className="h-11 px-5 rounded-xl border border-zinc-700 bg-white text-black text-sm font-black transition-all duration-200 hover:bg-zinc-200">
        Sign Up
      </button>
    </SignUpButton>

    <div
      suppressHydrationWarning
      className="flex items-center justify-center"
    >
      <UserButton
        appearance={{
          elements: {
            avatarBox:
              "h-11 w-11 border border-zinc-700",
          },
        }}
      />
    </div>

  </div>

</div>
    </nav>
  );
}