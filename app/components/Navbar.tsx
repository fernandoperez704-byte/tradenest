"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  UserButton,
  useClerk,
  useUser,
} from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();
const { openSignIn } = useClerk();

const [showCommunity, setShowCommunity] = useState(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const [isPaid, setIsPaid] = useState(false);
const [showUpgrade, setShowUpgrade] = useState(false);

useEffect(() => {
  if (!isSignedIn) {
    setIsPaid(false);
    return;
  }

  fetch("/api/subscription/status")
    .then((res) => res.json())
    .then((data) => setIsPaid(Boolean(data.isPaid)))
    .catch(() => setIsPaid(false));
}, [isSignedIn]);

function handleProtectedLink(
  event: React.MouseEvent<HTMLAnchorElement>,
  destination: string
) {
  if (!isLoaded) {
    event.preventDefault();
    return;
  }

  if (!isSignedIn) {
    event.preventDefault();

openSignIn({
  forceRedirectUrl: destination,
});
  }
}

  return (
  <>
    <nav className="sticky top-0 z-50 w-full border-b border-cyan-500/10 bg-[#050816]/95 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.45)]">
      <div className="page-container relative flex h-[56px] items-center justify-between">

<button
  onClick={() => setMobileMenuOpen(true)}
  className="flex h-10 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-[#18181b] text-3xl font-black text-white md:hidden"
>
  ☰
</button>

        <div className="flex items-center gap-8 xl:gap-16">
          <Link
  href="/"
  onClick={(e) => {
    if (pathname === "/") {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }}
  className="group absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
>
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
  
  className={`flex h-10 items-center rounded-xl border px-4 text-[15px] font-bold transition-all duration-200 hover:-translate-y-[1px] xl:px-5 ${
    pathname === "/learn"
      ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
      : "border-zinc-800 bg-[#18181b] text-zinc-200 hover:border-cyan-500/40 hover:text-cyan-400"
  }`}
>
  Learn
</Link>

            <Link
              href="/simulator"
              
              className={`flex h-10 items-center rounded-xl border px-4 text-[15px] font-bold transition-all duration-200 hover:-translate-y-[1px] xl:px-5 ${
                pathname === "/simulator"
                  ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
                  : "border-zinc-800 bg-[#18181b] text-zinc-200 hover:border-cyan-500/40 hover:text-cyan-400"
              }`}
            >
              Simulator
            </Link>

<Link
  href="/market-education"
  className={`flex h-10 items-center rounded-xl border px-4 text-[15px] font-bold transition-all duration-200 hover:-translate-y-[1px] xl:px-5 ${
    pathname === "/market-education" ||
    pathname.startsWith("/market-education/")
      ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
      : "border-zinc-800 bg-[#18181b] text-zinc-200 hover:border-cyan-500/40 hover:text-cyan-400"
  }`}
>
  Market Education
</Link>

            <Link
              href="/news"
              
              className={`flex h-10 items-center rounded-xl border px-4 text-[15px] font-bold transition-all duration-200 hover:-translate-y-[1px] xl:px-5 ${
                pathname === "/news"
                  ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
                  : "border-zinc-800 bg-[#18181b] text-zinc-200 hover:border-cyan-500/40 hover:text-cyan-400"
              }`}
            >
              News
            </Link>

<Link
  href="/support"
  
  className={`flex h-10 items-center rounded-xl border px-4 text-[15px] font-bold transition-all duration-200 hover:-translate-y-[1px] xl:px-5 ${
    pathname === "/support"
      ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
      : "border-zinc-800 bg-[#18181b] text-zinc-200 hover:border-cyan-500/40 hover:text-cyan-400"
  }`}
>
  Support
</Link>
<button
  onClick={() => {
    setShowCommunity(true);
  }}
  className="flex h-10 items-center rounded-xl border border-zinc-800 bg-[#18181b] px-4 text-[15px] font-bold text-zinc-200 transition-all duration-200 hover:-translate-y-[1px] hover:border-cyan-500/40 hover:text-cyan-400 xl:px-5"
>
  Community
</button>
          </div>
        </div>

<div className="hidden min-w-[150px] items-center justify-end gap-4 md:flex">
  {!isLoaded ? (
    <div className="h-10 w-[92px]" />
  ) : isSignedIn ? (
    <div suppressHydrationWarning className="flex h-10 w-11 items-center justify-center">
<UserButton
  appearance={{
    elements: {
      avatarBox: "h-10 w-11 border border-zinc-700",
    },
  }}
>
  {isPaid && (
    <UserButton.MenuItems>
      <UserButton.Action
        label="Manage Subscription"
        labelIcon={<span>💳</span>}
        onClick={async () => {
          const res = await fetch("/api/stripe/portal", { method: "POST" });
          const data = await res.json();
          if (data.url) window.location.href = data.url;
        }}
      />
    </UserButton.MenuItems>
  )}
</UserButton>
    </div>
  ) : (
    <SignInButton mode="modal">
      <button className="h-10 rounded-xl bg-cyan-500 px-5 text-sm font-black text-black transition-all duration-200 hover:bg-cyan-400">
        Sign In
      </button>
    </SignInButton>
  )}
</div>



      </div>

{showCommunity && (
  <>

    {/* Desktop popup */}
    <div className="hidden md:block">
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

<button
  type="button"
  onClick={() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      setShowCommunity(false);

      const currentPage =
        window.location.pathname +
        window.location.search +
        window.location.hash;

      openSignIn({
        forceRedirectUrl: currentPage,
      });

      return;
    }

    if (!isPaid) {
      setShowCommunity(false);
      setShowUpgrade(true);
      return;
    }

    window.open(
      "https://discord.gg/QReDrKSEKS",
      "_blank",
      "noopener,noreferrer"
    );
  }}
  className="mt-6 flex h-14 w-full items-center justify-center rounded-2xl bg-cyan-500 text-base font-black text-black transition-all duration-200 hover:bg-cyan-400"
>
  Open Discord
</button>
      </div>
    </div>
  </>
)}
    </nav>

{showUpgrade && (
  <>
    <button
      type="button"
      onClick={() => setShowUpgrade(false)}
      className="fixed inset-0 z-[99998] bg-black/60 backdrop-blur-md"
      aria-label="Close upgrade"
    />

    <div className="fixed left-1/2 top-1/2 z-[99999] w-[90%] max-w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-cyan-500/20 bg-[#050816] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.55)]">
      <button
        type="button"
        onClick={() => setShowUpgrade(false)}
        className="absolute right-5 top-5 rounded-lg border border-zinc-700 px-3 py-1 text-zinc-400 hover:border-cyan-400 hover:text-white"
      >
        ✕
      </button>

<h2 className="pr-10 text-2xl font-black text-white">
  Community Access
</h2>

<p className="mt-3 text-sm leading-6 text-zinc-400">
  TradeNestX Community access is included with TradeNestX Pro.
</p>

      <button
        type="button"
        onClick={async () => {
          const res = await fetch("/api/stripe/checkout", {
            method: "POST",
          });

          const data = await res.json();

          if (data.url) {
            window.location.href = data.url;
          }
        }}
        className="mt-6 flex h-14 w-full items-center justify-center rounded-2xl bg-cyan-500 text-base font-black text-black transition hover:bg-cyan-400"
      >
        Upgrade to Pro
      </button>
    </div>
  </>
)}

{showCommunity && (
  <>
    {/* Mobile dedicated community screen */}
    <div className="fixed inset-0 z-[99999] bg-black text-white md:hidden">
      <button
        type="button"
        onClick={() => setShowCommunity(false)}
        className="fixed right-5 top-24 z-[100000] rounded-xl border border-zinc-700 bg-[#111827] px-4 py-2 text-2xl font-black text-zinc-300 transition-all hover:border-cyan-400 hover:text-white"
      >
        ×
      </button>

      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h2 className="text-4xl font-black leading-tight text-white">
          Join TradeNestX Discord
        </h2>

        <p className="mt-5 max-w-sm text-lg leading-8 text-zinc-400">
          Get lesson reminders, daily market headlines, community support, and direct access to Gaby.
        </p>

<button
  type="button"
  onClick={() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      setShowCommunity(false);

      const currentPage =
        window.location.pathname +
        window.location.search +
        window.location.hash;

      openSignIn({
        forceRedirectUrl: currentPage,
      });

      return;
    }

    if (!isPaid) {
      setShowCommunity(false);
      setShowUpgrade(true);
      return;
    }

    window.open(
      "https://discord.gg/QReDrKSEKS",
      "_blank",
      "noopener,noreferrer"
    );
  }}
  className="mt-8 flex h-16 w-full max-w-sm items-center justify-center rounded-2xl bg-cyan-500 text-xl font-black text-black transition-all duration-200 hover:bg-cyan-400"
>
  Open Discord
</button>
      </div>
    </div>
  </>
)}

{mobileMenuOpen && (
  <div className="fixed inset-0 z-[9999] md:hidden">
    {/* Dark backdrop */}
    <button
      type="button"
      aria-label="Close navigation menu"
      onClick={() => setMobileMenuOpen(false)}
      className="absolute inset-0 bg-black/70 backdrop-blur-sm"
    />

    {/* Slide-in menu */}
    <div className="relative flex h-full w-[86%] max-w-[360px] flex-col border-r border-white/10 bg-[#050816] text-white shadow-[20px_0_60px_rgba(0,0,0,0.55)]">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="text-2xl font-black tracking-tight"
        >
          TradeNest<span className="text-cyan-400">X</span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-2xl font-bold text-zinc-300 transition hover:border-cyan-400/40 hover:text-white"
        >
          ×
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
{[
  {
    label: "Learn",
    href: "/learn",
    requiresSignIn: false,
  },
  {
    label: "Simulator",
    href: "/simulator",
    requiresSignIn: false,
  },
{
  label: "Market Education",
  href: "/market-education",
  requiresSignIn: false,
},
  {
    label: "News",
    href: "/news",
    requiresSignIn: false,
  },
  {
    label: "Support",
    href: "/support",
    requiresSignIn: false,
  },
].map(({ label, href, requiresSignIn }) => {
  const active = pathname === href;

  return (
    <Link
      key={href}
      href={href}
      onClick={(event) => {
        if (requiresSignIn) {
          handleProtectedLink(event, href);

          if (!isLoaded || !isSignedIn) {
            setMobileMenuOpen(false);
            return;
          }
        }

        setMobileMenuOpen(false);
      }}
      className={`mb-2 flex h-14 items-center justify-between rounded-xl px-4 text-lg font-bold transition-all ${
        active
          ? "border border-cyan-400/30 bg-cyan-500/10 text-cyan-400"
          : "border border-transparent text-zinc-200 hover:border-white/10 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span>{label}</span>
      <span className="text-xl text-zinc-500">›</span>
    </Link>
  );
})}

<button
  type="button"
  onClick={() => {
    setMobileMenuOpen(false);
    setShowCommunity(true);
  }}
  className="mb-2 flex h-14 w-full items-center justify-between rounded-xl border border-transparent px-4 text-left text-lg font-bold text-zinc-200 transition-all hover:border-white/10 hover:bg-white/5 hover:text-white"
>
  <span>Community</span>
  <span className="text-xl text-zinc-500">›</span>
</button>
      </div>

      {/* Account section */}
      <div className="border-t border-white/10 p-4">
        {!isLoaded ? (
          <div className="h-12 w-full animate-pulse rounded-xl bg-white/5" />
        ) : isSignedIn ? (
          <div className="flex h-14 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4">
<UserButton
  appearance={{
    elements: {
      avatarBox: "h-10 w-10 border border-zinc-700",
    },
  }}
>
  {isPaid && (
    <UserButton.MenuItems>
      <UserButton.Action
        label="Manage Subscription"
        labelIcon={<span>💳</span>}
        onClick={async () => {
          const res = await fetch("/api/stripe/portal", { method: "POST" });
          const data = await res.json();
          if (data.url) window.location.href = data.url;
        }}
      />
    </UserButton.MenuItems>
  )}
</UserButton>

            <span className="text-base font-bold text-zinc-200">
              Account
            </span>
          </div>
        ) : (
          <SignInButton mode="modal">
            <button className="h-12 w-full rounded-xl border border-cyan-400/30 bg-cyan-500/90 text-base font-black text-black shadow-[0_0_20px_rgba(6,182,212,0.18)] transition-all duration-200 hover:bg-cyan-400 active:scale-[0.98]">
              Sign In
            </button>
          </SignInButton>
        )}
      </div>
    </div>
  </div>
)}
  </>
);
}