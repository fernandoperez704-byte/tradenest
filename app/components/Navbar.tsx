"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();
const [showCommunity, setShowCommunity] = useState(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

          <div className="hidden items-center gap-4 md:flex">
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
  href="/support"
  className={`flex h-11 items-center rounded-xl border px-4 text-[15px] font-bold transition-all duration-200 hover:-translate-y-[1px] xl:px-5 ${
    pathname === "/support"
      ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
      : "border-zinc-800 bg-[#18181b] text-zinc-200 hover:border-cyan-500/40 hover:text-cyan-400"
  }`}
>
  Support
</Link>
            <button
  onClick={() => setShowCommunity(true)}
 className="flex h-11 items-center rounded-xl border border-zinc-800 bg-[#18181b] px-4 text-[15px] font-bold text-zinc-200 transition-all duration-200 hover:-translate-y-[1px] hover:border-cyan-500/40 hover:text-cyan-400 xl:px-5"
>
  Community
</button>
          </div>
        </div>

<div className="hidden min-w-[150px] items-center justify-end gap-4 md:flex">
  {!isLoaded ? (
    <div className="h-11 w-[92px]" />
  ) : isSignedIn ? (
    <div suppressHydrationWarning className="flex h-11 w-11 items-center justify-center">
      <UserButton
        appearance={{
          elements: {
            avatarBox: "h-11 w-11 border border-zinc-700",
          },
        }}
      />
    </div>
  ) : (
    <SignInButton mode="modal">
      <button className="h-11 rounded-xl bg-cyan-500 px-5 text-sm font-black text-black transition-all duration-200 hover:bg-cyan-400">
        Sign In
      </button>
    </SignInButton>
  )}
</div>

<button
  onClick={() => setMobileMenuOpen(true)}
  className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-[#18181b] text-3xl font-black text-white md:hidden"
>
  ☰
</button>

      </div>

{mobileMenuOpen && (
  <div className="fixed inset-0 z-[9999] bg-black text-white md:hidden">
    <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
      <Link
        href="/"
        onClick={() => setMobileMenuOpen(false)}
        className="text-3xl font-black"
      >
        TradeNest<span className="text-cyan-400">X</span>
      </Link>

      <button
        onClick={() => setMobileMenuOpen(false)}
        className="text-4xl font-black text-white"
      >
        ×
      </button>
    </div>

    <div className="flex flex-col">
      {[
        ["Learn", "/learn"],
        ["Simulator", "/simulator"],
        ["Leaderboard", "/leaderboard"],
        ["News", "/news"],
        ["Support", "/support"],
      ].map(([label, href]) => (
        <Link
          key={href}
          href={href}
          onClick={() => setMobileMenuOpen(false)}
          className="border-b border-white/10 px-6 py-6 text-3xl font-black"
        >
          {label}
        </Link>
      ))}

      <button
        onClick={() => {
          setMobileMenuOpen(false);
          setShowCommunity(true);
        }}
        className="border-b border-white/10 px-6 py-6 text-left text-3xl font-black"
      >
        Community
      </button>

      <div className="px-6 py-6">
        {!isLoaded ? (
          <div className="h-14 w-full rounded-2xl bg-zinc-800" />
        ) : isSignedIn ? (
          <div className="flex items-center gap-4">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-14 w-14 border border-zinc-700",
                },
              }}
            />
            <span className="text-xl font-black text-zinc-300">
              Account
            </span>
          </div>
        ) : (
          <SignInButton mode="modal">
            <button className="w-full rounded-2xl bg-cyan-500 px-6 py-5 text-2xl font-black text-black">
              Sign In
            </button>
          </SignInButton>
        )}
      </div>
    </div>
  </div>
)}


      {showCommunity && (
  <>
    <div
      onClick={() => setShowCommunity(false)}
      className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
    />

    <div className="fixed right-5 top-5 z-50 w-[360px] rounded-[28px] border border-cyan-500/20 bg-[#050816]/95 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.55)]">
      <button
        onClick={() => setShowCommunity(false)}
        className="absolute right-5 top-5 rounded-lg border border-zinc-700 px-3 py-1 text-zinc-400 transition hover:border-cyan-400 hover:text-white"
      >
        ✕
      </button>

      <h2 className="pr-10 text-2xl font-black text-white">
        Join TradeNestX Discord
      </h2>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        Get lesson reminders, daily market headlines, community support, and direct access to Gaby.
      </p>

      <a
        href="https://discord.gg/QReDrKSEKS"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex h-14 w-full items-center justify-center rounded-2xl bg-cyan-500 text-base font-black text-black transition-all duration-200 hover:bg-cyan-400"
      >
        Open Discord
      </a>
    </div>
  </>
)}
    </nav>
  );
}