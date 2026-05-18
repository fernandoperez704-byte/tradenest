"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-cyan-500/10 bg-[#050816]/95 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.45)]">
      <div className="page-container flex h-[78px] items-center justify-between">
        <div className="flex items-center gap-8 xl:gap-16">
          <Link href="/" className="group flex items-center">
            <div className="relative flex items-center text-3xl font-black tracking-tight md:text-4xl">
              <span className="text-white transition-all duration-300 group-hover:text-zinc-100">
                TradeNest
              </span>

              <span className="text-cyan-400 drop-shadow-[0_0_18px_rgba(34,211,238,0.75)] transition-all duration-300 group-hover:text-cyan-300">
                X
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/learn"
              className={`flex h-11 items-center rounded-xl border px-4 text-[15px] font-bold transition-all duration-200 hover:-translate-y-[1px] xl:px-5 ${
                pathname === "/learn"
                  ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
                  : "border-zinc-800 bg-[#18181b] text-zinc-200 hover:border-cyan-500/40 hover:text-cyan-400"
              }`}
            >
              Learn
            </Link>

            <Link
              href="/simulator"
              className={`flex h-11 items-center rounded-xl border px-4 text-[15px] font-bold transition-all duration-200 hover:-translate-y-[1px] xl:px-5 ${
                pathname === "/simulator"
                  ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
                  : "border-zinc-800 bg-[#18181b] text-zinc-200 hover:border-cyan-500/40 hover:text-cyan-400"
              }`}
            >
              Simulator
            </Link>

            <Link
              href="/leaderboard"
              className={`flex h-11 items-center rounded-xl border px-4 text-[15px] font-bold transition-all duration-200 hover:-translate-y-[1px] xl:px-5 ${
                pathname === "/leaderboard"
                  ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
                  : "border-zinc-800 bg-[#18181b] text-zinc-200 hover:border-cyan-500/40 hover:text-cyan-400"
              }`}
            >
              Leaderboard
            </Link>

            <Link
              href="/news"
              className={`flex h-11 items-center rounded-xl border px-4 text-[15px] font-bold transition-all duration-200 hover:-translate-y-[1px] xl:px-5 ${
                pathname === "/news"
                  ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
                  : "border-zinc-800 bg-[#18181b] text-zinc-200 hover:border-cyan-500/40 hover:text-cyan-400"
              }`}
            >
              News
            </Link>

            <Link
              href="/profile"
              className={`flex h-11 items-center rounded-xl border px-4 text-[15px] font-bold transition-all duration-200 hover:-translate-y-[1px] xl:px-5 ${
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
            <button className="h-11 rounded-xl bg-cyan-500 px-5 text-sm font-black text-black transition-all duration-200 hover:bg-cyan-400">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="h-11 rounded-xl border border-zinc-700 bg-white px-5 text-sm font-black text-black transition-all duration-200 hover:bg-zinc-200">
              Sign Up
            </button>
          </SignUpButton>

          <div suppressHydrationWarning className="flex items-center justify-center">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-11 w-11 border border-zinc-700",
                },
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}