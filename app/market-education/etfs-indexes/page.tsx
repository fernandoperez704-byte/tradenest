"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ETFsIndexesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black">ETFs & Indexes</h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                Learn how ETFs, indexes, diversification, sectors, and expense
                ratios help investors understand broad market exposure.
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
          {/* WHAT IS AN ETF */}
          {/* ====================================================== */}

          <section className="mt-8 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                What Is an ETF?
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                One Fund Can Hold Many Investments
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
                An exchange-traded fund, or ETF, is an investment fund that
                trades on an exchange and can hold stocks, bonds, commodities,
                or other assets.
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["ETF", "One fund investors can buy and sell like a stock."],
                ["Holdings", "The investments owned inside the fund."],
                ["Exposure", "The market, sector, region, or asset class the fund represents."],
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
              Buying one ETF can provide exposure to many investments at the same time.
            </p>
          </section>

          {/* ====================================================== */}
          {/* WHAT IS AN INDEX */}
          {/* ====================================================== */}

          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                What Is an Index?
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                A Benchmark That Tracks a Group of Investments
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
                An index measures the performance of a selected group of
                investments. It is used as a benchmark for understanding how
                part of the market is performing.
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  S&P 500
                </p>
                <p className="mt-1 text-lg font-black text-white">
                  Large U.S. Companies
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Nasdaq Composite
                </p>
                <p className="mt-1 text-lg font-black text-white">
                  Nasdaq-Listed Companies
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Dow Jones
                </p>
                <p className="mt-1 text-lg font-black text-white">
                  30 Large U.S. Companies
                </p>
              </div>
            </div>

            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-zinc-500">
              An index itself is a measurement. Investors usually gain exposure through
              products such as ETFs or index funds that track it.
            </p>
          </section>

          {/* ====================================================== */}
          {/* ETF VS INDEX */}
          {/* ====================================================== */}

          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                ETF vs. Index
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                They Are Related, but They Are Not the Same
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
                An index is a benchmark. An ETF is an investment product that
                may be designed to follow that benchmark.
              </p>
            </div>

            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-[#111827] px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
                <span>Feature</span>
                <span>Index</span>
                <span>ETF</span>
              </div>

              {[
                ["What it is", "Benchmark", "Investment fund"],
                ["Trades directly", "No", "Yes"],
                ["Can hold assets", "No", "Yes"],
                ["Can track a market", "Yes", "Yes"],
              ].map(([label, indexValue, etfValue]) => (
                <div
                  key={label}
                  className="grid grid-cols-[1.2fr_1fr_1fr] border-t border-white/10 px-4 py-3 text-sm"
                >
                  <span className="text-zinc-400">{label}</span>
                  <span className="font-bold text-white">{indexValue}</span>
                  <span className="font-bold text-white">{etfValue}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ====================================================== */}
          {/* DIVERSIFICATION */}
          {/* ====================================================== */}

          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                Diversification
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                Spread Exposure Across More Than One Investment
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
                Diversification spreads exposure across multiple companies,
                sectors, regions, or asset classes instead of relying on one investment.
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-sm font-black text-white">
                  Concentrated
                </p>
                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  A portfolio focused heavily on one company, industry, or theme
                  may be more affected by problems in that area.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-sm font-black text-white">
                  Diversified
                </p>
                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Exposure spread across many investments can reduce dependence
                  on the performance of one company or sector.
                </p>
              </div>
            </div>

            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-zinc-500">
              Diversification can reduce concentration risk, but it does not eliminate market risk.
            </p>
          </section>

          {/* ====================================================== */}
          {/* EXPENSE RATIOS */}
          {/* ====================================================== */}

          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                Expense Ratios
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                What Does the Fund Cost Each Year?
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
                The expense ratio is the annual operating cost of a fund,
                expressed as a percentage of the amount invested.
              </p>
            </div>

            <div className="mt-5 grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Investment
                </p>
                <p className="mt-1 text-xl font-black text-white">$10,000</p>
              </div>

              <span className="text-center text-zinc-500">×</span>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Expense Ratio
                </p>
                <p className="mt-1 text-xl font-black text-white">0.20%</p>
              </div>

              <span className="text-center text-zinc-500">=</span>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Approx. Annual Cost
                </p>
                <p className="mt-1 text-xl font-black text-white">$20</p>
              </div>
            </div>

            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-zinc-500">
              Lower fees leave more of the investment return with the investor,
              but cost should be considered together with what the fund owns and how it is managed.
            </p>
          </section>

          {/* ====================================================== */}
          {/* TYPES OF ETFs */}
          {/* ====================================================== */}

          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                Types of ETFs
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                Different Funds Provide Different Exposure
              </h2>
            </div>

            <div className="mt-5 grid gap-x-8 gap-y-3 border-t border-white/10 pt-4 md:grid-cols-2">
              {[
                ["Broad Market", "Tracks a large portion of the stock market."],
                ["Sector", "Focuses on one industry such as technology or energy."],
                ["Bond", "Holds government, corporate, or other fixed-income securities."],
                ["International", "Provides exposure to companies outside the home country."],
                ["Commodity", "Provides exposure related to commodities such as gold or oil."],
                ["Thematic", "Focuses on a specific trend, technology, or investment theme."],
              ].map(([title, description], index) => (
                <div key={title} className="flex gap-3">
                  <span className="text-xs font-black text-zinc-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <p className="text-sm font-black text-white">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ====================================================== */}
          {/* WHAT TO CHECK */}
          {/* ====================================================== */}

          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                Evaluating an ETF
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                Know What You Actually Own
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
                Two ETFs can look similar while providing very different exposure.
              </p>
            </div>

            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <div className="grid grid-cols-[1fr_1.5fr] bg-[#111827] px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
                <span>Check</span>
                <span>Why It Matters</span>
              </div>

              {[
                ["Holdings", "Shows which investments are actually inside the fund."],
                ["Index Tracked", "Explains the benchmark the ETF is designed to follow."],
                ["Expense Ratio", "Shows the annual operating cost of the fund."],
                ["Sector Weight", "Helps identify whether the fund is concentrated in one industry."],
                ["Top Holdings", "Shows whether a few companies dominate the fund."],
              ].map(([label, meaning]) => (
                <div
                  key={label}
                  className="grid grid-cols-[1fr_1.5fr] border-t border-white/10 px-4 py-3 text-sm"
                >
                  <span className="font-bold text-white">{label}</span>
                  <span className="text-zinc-400">{meaning}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FINAL LESSON */}
          <section className="mt-6 border-t border-white/10 px-2 py-4">
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
              <p className="shrink-0 text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                Key Lesson
              </p>

              <p className="text-sm leading-5 text-zinc-400">
                Before evaluating an ETF, understand what it owns, what it tracks,
                how concentrated it is, and what it costs.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}