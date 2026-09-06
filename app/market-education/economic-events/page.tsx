"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function EconomicEventsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black">Economic Events</h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                Learn how inflation, interest rates, Fed decisions, jobs reports,
                and GDP can influence financial markets.
              </p>
            </div>

            <Link
              href="/market-education"
              className="rounded-xl border border-white/10 bg-[#111827] px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              ← Market Education
            </Link>
          </div>

          {/* ====================================================== */}
          {/* WHAT ARE ECONOMIC EVENTS */}
          {/* ====================================================== */}

          <section className="mt-8 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                What Are Economic Events?
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                Data Releases Can Change Market Expectations
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
                Economic reports help investors understand inflation, growth,
                employment, and interest-rate conditions. Markets often react
                when the data differs from what investors expected.
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["Economic Data", "Measures conditions such as inflation, jobs, and growth."],
                ["Expectations", "Investors compare reported data with forecasts."],
                ["Market Reaction", "Prices may move when expectations change."],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3"
                >
                  <p className="text-sm font-black text-white">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    {description}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-zinc-500">
              The number itself matters, but the difference between the result
              and market expectations often matters just as much.
            </p>
          </section>

          {/* ====================================================== */}
          {/* INFLATION */}
          {/* ====================================================== */}

          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                Inflation
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                How Fast Are Prices Rising?
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
                Inflation measures how prices change over time. Common reports
                include CPI and PCE inflation data.
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Previous
                </p>
                <p className="mt-1 text-xl font-black text-white">3.2%</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Expected
                </p>
                <p className="mt-1 text-xl font-black text-white">3.1%</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Actual
                </p>
                <p className="mt-1 text-xl font-black text-white">3.4%</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 border-t border-white/10 pt-3 md:grid-cols-2">
              <p className="text-sm text-zinc-400">
                <span className="font-black text-white">
                  Higher-than-expected inflation:
                </span>{" "}
                can increase expectations for tighter monetary policy.
              </p>

              <p className="text-sm text-zinc-400">
                <span className="font-black text-white">
                  Lower-than-expected inflation:
                </span>{" "}
                can reduce pressure for restrictive policy.
              </p>
            </div>
          </section>

          {/* ====================================================== */}
          {/* INTEREST RATES */}
          {/* ====================================================== */}

          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                Interest Rates
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                The Cost of Borrowing Affects the Economy
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
                Interest rates influence borrowing, spending, investment, and
                the value investors place on future earnings.
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-sm font-black text-white">
                  Higher Rates
                </p>
                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Borrowing becomes more expensive, which can slow spending and
                  business investment.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-sm font-black text-white">
                  Lower Rates
                </p>
                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Borrowing becomes cheaper, which can support spending and
                  investment.
                </p>
              </div>
            </div>

            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-zinc-500">
              Markets care about both the current rate and what investors expect
              rates to do next.
            </p>
          </section>

          {/* ====================================================== */}
          {/* FED DECISIONS */}
          {/* ====================================================== */}

          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                Fed Decisions
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                Hold, Raise, or Cut?
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
                The Federal Reserve adjusts monetary policy based on inflation,
                employment, growth, and financial conditions.
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["Raise", "Rates move higher to make financial conditions tighter."],
                ["Hold", "Policy stays unchanged while the Fed evaluates new data."],
                ["Cut", "Rates move lower to make financial conditions easier."],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3"
                >
                  <p className="text-sm font-black text-white">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    {description}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-zinc-500">
              Markets can react not only to the rate decision, but also to the
              Fed&apos;s statement, projections, and comments about future policy.
            </p>
          </section>

          {/* ====================================================== */}
          {/* JOBS REPORT */}
          {/* ====================================================== */}

          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                Jobs Reports
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                How Strong Is the Labor Market?
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
                Employment reports help show whether businesses are hiring,
                unemployment is rising or falling, and wage pressure is changing.
              </p>
            </div>

            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-[#111827] px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
                <span>Metric</span>
                <span>What It Shows</span>
                <span>Example</span>
              </div>

              {[
                ["Payrolls", "Jobs added or lost", "+180K"],
                ["Unemployment Rate", "Share of labor force unemployed", "4.0%"],
                ["Wage Growth", "Change in worker earnings", "3.8%"],
              ].map(([label, meaning, example]) => (
                <div
                  key={label}
                  className="grid grid-cols-[1.2fr_1fr_1fr] border-t border-white/10 px-4 py-3 text-sm"
                >
                  <span className="font-bold text-white">{label}</span>
                  <span className="text-zinc-400">{meaning}</span>
                  <span className="font-bold text-white">{example}</span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-zinc-500">
              A very strong labor market can support economic growth, but it can
              also contribute to wage and inflation pressure.
            </p>
          </section>

          {/* ====================================================== */}
          {/* GDP */}
          {/* ====================================================== */}

          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                GDP
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                How Fast Is the Economy Growing?
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
                Gross domestic product measures the value of goods and services
                produced in the economy.
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Previous
                </p>
                <p className="mt-1 text-xl font-black text-white">2.4%</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Expected
                </p>
                <p className="mt-1 text-xl font-black text-white">2.0%</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Actual
                </p>
                <p className="mt-1 text-xl font-black text-white">1.6%</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 border-t border-white/10 pt-3 md:grid-cols-2">
              <p className="text-sm text-zinc-400">
                <span className="font-black text-white">
                  Stronger growth:
                </span>{" "}
                can support corporate revenue and employment.
              </p>

              <p className="text-sm text-zinc-400">
                <span className="font-black text-white">
                  Weaker growth:
                </span>{" "}
                can signal slower demand and economic activity.
              </p>
            </div>
          </section>

          {/* ====================================================== */}
          {/* HOW MARKETS REACT */}
          {/* ====================================================== */}

          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                How Markets React
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                Expectations Connect the Data to Price Movement
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
                Markets are forward-looking. Investors use economic data to
                update expectations for growth, inflation, interest rates, and
                company earnings.
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-sm font-black text-white">
                  1. Forecast
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Investors form expectations before the release.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-sm font-black text-white">
                  2. Actual Data
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  The official result is released.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-sm font-black text-white">
                  3. New Expectations
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Markets adjust expectations based on the difference.
                </p>
              </div>
            </div>

            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-zinc-500">
              The same economic number can produce different market reactions
              depending on what investors expected beforehand.
            </p>
          </section>

          {/* FINAL LESSON */}
          <section className="mt-6 border-t border-white/10 px-2 py-4">
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
              <p className="shrink-0 text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                Key Lesson
              </p>

              <p className="text-sm leading-5 text-zinc-400">
                Economic events matter because they can change expectations for
                inflation, growth, interest rates, and future company performance.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}