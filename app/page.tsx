"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";

function TradeNestXName({
  pro = false,
  className = "",
}: {
  pro?: boolean;
  className?: string;
}) {
  return (
    <span className={className}>
      <span className="text-white">TradeNest</span>
      <span className="text-cyan-400">X</span>
      {pro && <span className="text-white"> Pro</span>}
    </span>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="bg-black text-white">

{/* HERO */}
<section className="relative min-h-[calc(100vh-56px)] overflow-hidden">
  {/* Mobile Hero Image */}
  <img
    src="/learn/hero/mobile-tradenestx-hero.png"
    alt="TradeNestX - Trade Smarter, Stay Ahead"
    className="absolute inset-0 h-full w-full object-cover md:hidden"
  />

  {/* Desktop Hero Image */}
  <img
    src="/learn/hero/tradenestx-hero-banner-4k.png"
    alt="TradeNestX - Trade Smarter, Stay Ahead"
    className="absolute inset-0 hidden h-full w-full object-cover md:block"
  />

  {/* Fade */}
  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

  {/* HERO CONTENT */}
  <div className="relative z-10 min-h-[calc(100vh-56px)]">
    {/* TITLE */}
    <div className="absolute left-1/2 top-[48%] w-full -translate-x-1/2 -translate-y-1/2 px-5 text-center md:left-14 md:top-[43%] md:w-auto md:translate-x-0 md:text-left xl:left-20">
      <h1 className="whitespace-nowrap text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
        TRADE SMARTER
      </h1>

      <p className="mt-2 text-center text-lg font-bold tracking-[0.35em] text-white sm:text-xl md:text-2xl">
        STAY AHEAD
      </p>

      {/* Mobile Education Text */}
      <div className="mt-5 space-y-1 text-center text-sm font-semibold text-cyan-300 md:hidden">
        <p>Trading Education</p>
        <p>Risk-Free Practice</p>
        <p>AI-Powered Learning</p>
      </div>

{/* Desktop Education Text */}
<p className="mt-4 hidden text-center text-sm font-semibold tracking-wide text-cyan-300/90 md:block md:text-base">
  Trading Education • Risk-Free Practice • AI-Powered Learning
</p>
    </div>

    {/* BUTTONS */}
    <div className="absolute left-1/2 top-5 flex w-auto -translate-x-1/2 justify-center gap-3 md:bottom-40 md:left-[18.5%] md:top-auto md:-translate-x-1/2 xl:left-[25.5%]">
      <Link
        href="/learn"
        className="flex h-12 min-w-[135px] items-center justify-center rounded-xl bg-cyan-400 px-7 text-sm font-black text-black transition hover:bg-cyan-300"
      >
        Start Now
      </Link>

      <a
        href="#pro"
        className="flex h-12 min-w-[135px] items-center justify-center rounded-xl border border-white/20 bg-black/40 px-7 text-sm font-black text-white backdrop-blur-md transition hover:border-cyan-400 hover:text-cyan-300"
      >
        Explore Pro
      </a>
    </div>
  </div>
</section>
        {/* PLATFORM VIDEO */}
        <section className="px-5 py-10 md:px-10 md:py-12">
          <div className="mx-auto grid max-w-[1400px] items-center gap-8 md:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em]">
                <TradeNestXName />
              </p>

              <h2 className="mt-2 text-3xl font-black md:text-4xl">
                See It in Action
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-400">
                See how TradeNestX brings education, simulator practice,
                trade review, market learning, and Gaby together in one
                trading education platform.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Learn",
                  "Practice",
                  "Review",
                  "Market Education",
                  "Gaby",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/10 bg-[#111827] px-3 py-1.5 text-xs font-bold text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#0f172a]">
              <div className="flex aspect-video items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-xl text-cyan-300">
                    ▶
                  </div>

                  <p className="mt-3 text-sm font-black">
                    <TradeNestXName /> Platform Overview
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Video coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FREE VS PRO */}
        <section id="pro" className="px-5 py-8 md:px-10 md:py-10">
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center">
              <h2 className="text-2xl font-black md:text-3xl">
                <span className="text-white">Free vs </span>
                <TradeNestXName pro />
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                Start free. Upgrade when you want the complete TradeNestX
                experience.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {/* FREE */}
              <div className="flex flex-col rounded-2xl border border-white/10 bg-[#0f172a] p-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-zinc-500">
                    Free
                  </p>

                  <div className="mt-1 flex items-end gap-2">
                    <span className="text-3xl font-black">$0</span>
                    <span className="pb-1 text-xs font-bold text-zinc-500">
                      / month
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-zinc-400">
                    Explore TradeNestX and start learning.
                  </p>
                </div>

                <div className="mt-4 grid gap-2 text-sm text-zinc-300 sm:grid-cols-2">
                  <p>✓ Market Education</p>
                  <p>✓ Practice Simulator</p>
                  <p>✓ 5 Gaby questions</p>
                  <p>✓ Support Gaby</p>
                  <p>✓ Free learning access</p>
                  <p className="text-zinc-500">
                    — No Community access
                  </p>
                </div>

                <Link
                  href="/learn"
                  className="mt-5 flex h-11 items-center justify-center rounded-xl border border-white/15 bg-[#111827] text-sm font-black transition hover:border-cyan-400 hover:text-cyan-300"
                >
                  Start Free
                </Link>
              </div>

              {/* PRO */}
              <div className="flex flex-col rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5 shadow-[0_0_30px_rgba(34,211,238,0.08)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider">
                      <TradeNestXName pro />
                    </p>

                    <div className="mt-1 flex items-end gap-2">
                      <span className="text-3xl font-black">$24.99</span>
                      <span className="pb-1 text-xs font-bold text-zinc-500">
                        / month
                      </span>
                    </div>
                  </div>

                  <span className="rounded-full bg-cyan-400 px-2.5 py-1 text-[9px] font-black text-black">
                    FULL ACCESS
                  </span>
                </div>

                <p className="mt-2 text-sm text-zinc-400">
                  Unlock the complete learning, practice, Gaby, and community
                  experience.
                </p>

                <div className="mt-4 grid gap-2 text-sm text-zinc-200 sm:grid-cols-2">
                  
                  <p>✓ Full Academy access</p>
                  <p>✓ Unlimited Gaby</p>
                  <p>✓ Saved simulator data</p>
                  <p>✓ Trade history & reviews</p>
                  <p>✓ Gaby conversation memory</p>
                  <p>✓ Trader development</p>
                  <p>✓ Community access</p>
                </div>

                <button
                  onClick={async () => {
                    const res = await fetch("/api/stripe/checkout", {
                      method: "POST",
                    });

                    const data = await res.json();

                    if (data.url) {
                      window.location.href = data.url;
                    }
                  }}
                  className="mt-5 flex h-11 w-full items-center justify-center rounded-xl bg-cyan-400 text-sm font-black text-black transition hover:bg-cyan-300"
                >
                  Upgrade to Pro
                </button>

                <p className="mt-2 text-center text-[11px] leading-4 text-zinc-500">
                  Monthly subscription. Cancel anytime. Pro access remains
                  active through the end of the paid billing period.
                </p>
              </div>
            </div>
          </div>
        </section>

{/* FOOTER */}
<footer className="border-t border-white/10 bg-[#050816] px-5 py-6 md:px-10">
  <div className="mx-auto max-w-[1400px]">

    {/* TOP */}
    <div className="grid gap-5 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
      <div>
        <p className="text-xl font-black">
          <TradeNestXName />
        </p>

        <p className="mt-2 max-w-sm text-base leading-6 text-zinc-400">
          Trading education, market learning, simulator practice, and
          AI-powered explanations in one platform.
        </p>
      </div>

      {/* PLATFORM */}
      <div>
        <p className="text-sm font-black uppercase tracking-wider text-zinc-300">
          Platform
        </p>

        <div className="mt-2 space-y-1.5 text-base text-zinc-400">
          <p>
            <Link href="/learn" className="hover:text-cyan-300">
              Learn
            </Link>
          </p>

          <p>
            <Link href="/simulator" className="hover:text-cyan-300">
              Simulator
            </Link>
          </p>

          <p>
            <Link
              href="/market-education"
              className="hover:text-cyan-300"
            >
              Market Education
            </Link>
          </p>

          <p>
            <Link href="/news" className="hover:text-cyan-300">
              News
            </Link>
          </p>
        </div>
      </div>

      {/* HELP */}
      <div>
        <p className="text-sm font-black uppercase tracking-wider text-zinc-300">
          Help
        </p>

        <div className="mt-2 space-y-1.5 text-base text-zinc-400">
          <p>
            <Link href="/support" className="hover:text-cyan-300">
              Support
            </Link>
          </p>

          <p>
            <a
              href="mailto:support@tradenestxacademy.com"
              className="hover:text-cyan-300"
            >
              Contact
            </a>
          </p>
        </div>
      </div>

{/* LEGAL */}
<div>
  <p className="text-sm font-black uppercase tracking-wider text-zinc-300">
    Legal
  </p>

  <div className="mt-2 text-base text-zinc-400">
    <Link
      href="/legal"
      className="transition hover:text-cyan-300"
    >
      Legal & Disclosures
    </Link>
  </div>
</div>
    </div>

    {/* DISCLOSURES */}
    <div className="mt-5 grid gap-4 border-t border-white/10 pt-4 text-sm leading-5 text-zinc-400 md:grid-cols-3">
      <p>
        <span className="font-bold text-zinc-300">
          Educational Use:
        </span>{" "}
        TradeNestX provides educational and informational content only and
        does not provide personalized financial, investment, tax, or legal
        advice.
      </p>

      <p>
        <span className="font-bold text-zinc-300">
          Trading Risk:
        </span>{" "}
        Trading and investing involve risk, including possible loss of
        capital. Past performance and simulated results do not guarantee
        future results.
      </p>

      <p>
        <span className="font-bold text-zinc-300">
          Simulator & AI:
        </span>{" "}
        Simulator funds and trades are not real money. Gaby uses AI and may
        produce inaccurate information. Important financial information
        should be independently verified.
      </p>
    </div>

    {/* BOTTOM */}
    <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} TradeNestX. All rights reserved.
      </p>

      <p>support@tradenestxacademy.com</p>
    </div>

  </div>
</footer>

      </main>
    </>
  );
}