"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function StockSplitsBuybacksPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black">Stock Splits & Buybacks</h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                Learn how stock splits, reverse splits, share repurchases, and
                shares outstanding can affect how investors understand a company.
              </p>
            </div>

            <Link
              href="/market-education"
              className="rounded-xl border border-white/10 bg-[#111827] px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              ← Market Education
            </Link>
          </div>

          {/* STOCK SPLITS */}
          <section className="mt-8 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Stock Splits
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              More Shares, Lower Price Per Share
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
              A stock split increases the number of shares outstanding while
              reducing the price per share proportionally.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Before Split
                </p>
                <p className="mt-1 text-xl font-black text-white">
                  1 Share × $100
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  2-for-1 Split
                </p>
                <p className="mt-1 text-xl font-black text-white">
                  2 Shares × $50
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Total Value
                </p>
                <p className="mt-1 text-xl font-black text-white">$100</p>
              </div>
            </div>

            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-zinc-500">
              A split changes the number of shares and price per share, but does
              not by itself change the total value of the position.
            </p>
          </section>

          {/* WHY COMPANIES SPLIT */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Why Companies Split Shares
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              A Lower Share Price Can Be Easier to Access
            </h2>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                [
                  "Accessibility",
                  "A lower share price can make whole shares easier for some investors to purchase.",
                ],
                [
                  "Liquidity",
                  "More shares outstanding can sometimes support trading activity.",
                ],
                [
                  "Market Perception",
                  "Companies may prefer a share price that appears more accessible.",
                ],
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
          </section>

          {/* REVERSE SPLITS */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Reverse Splits
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Fewer Shares, Higher Price Per Share
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
              A reverse stock split reduces the number of shares outstanding
              while increasing the price per share proportionally.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Before
                </p>
                <p className="mt-1 text-xl font-black text-white">
                  10 Shares × $5
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  1-for-5 Reverse Split
                </p>
                <p className="mt-1 text-xl font-black text-white">
                  2 Shares × $25
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Total Value
                </p>
                <p className="mt-1 text-xl font-black text-white">$50</p>
              </div>
            </div>

            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-zinc-500">
              Reverse splits can be used when a company wants to increase its
              quoted share price, but the split itself does not improve the
              underlying business.
            </p>
          </section>

          {/* BUYBACKS */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Share Buybacks
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              A Company Can Repurchase Its Own Shares
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
              A share buyback happens when a company uses cash to repurchase
              some of its outstanding shares from the market.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                [
                  "Company Cash",
                  "The business uses available cash to purchase shares.",
                ],
                [
                  "Shares Repurchased",
                  "Some publicly traded shares are bought back.",
                ],
                [
                  "Shares Outstanding",
                  "The number of shares remaining in the market may decrease.",
                ],
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
          </section>

          {/* SHARES OUTSTANDING */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Shares Outstanding
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              How Many Shares Exist?
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
              Shares outstanding are the shares currently held by investors,
              insiders, and institutions.
            </p>

            <div className="mt-5 grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Before Buyback
                </p>
                <p className="mt-1 text-xl font-black text-white">100M Shares</p>
              </div>

              <span className="text-center text-zinc-500">−</span>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Repurchased
                </p>
                <p className="mt-1 text-xl font-black text-white">10M Shares</p>
              </div>

              <span className="text-center text-zinc-500">=</span>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Remaining
                </p>
                <p className="mt-1 text-xl font-black text-white">90M Shares</p>
              </div>
            </div>
          </section>

          {/* EPS IMPACT */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Buybacks & EPS
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Fewer Shares Can Change Earnings Per Share
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
              Earnings per share divides company profit by shares outstanding.
              If profit stays the same while the share count falls, EPS can increase.
            </p>

            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-[#111827] px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
                <span>Metric</span>
                <span>Before</span>
                <span>After Buyback</span>
              </div>

              {[
                ["Net Income", "$100M", "$100M"],
                ["Shares Outstanding", "100M", "90M"],
                ["EPS", "$1.00", "$1.11"],
              ].map(([metric, before, after]) => (
                <div
                  key={metric}
                  className="grid grid-cols-[1.2fr_1fr_1fr] border-t border-white/10 px-4 py-3 text-sm"
                >
                  <span className="font-bold text-white">{metric}</span>
                  <span className="text-zinc-400">{before}</span>
                  <span className="font-bold text-white">{after}</span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-zinc-500">
              EPS growth created by a lower share count is different from EPS
              growth created by higher company profits.
            </p>
          </section>

          {/* WHY COMPANIES BUY BACK SHARES */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Why Buy Back Shares?
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Companies Have Different Reasons
            </h2>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                [
                  "Return Capital",
                  "A company may choose buybacks as one way to return capital to shareholders.",
                ],
                [
                  "Reduce Share Count",
                  "Repurchases can reduce shares outstanding and affect per-share metrics.",
                ],
                [
                  "Offset Dilution",
                  "Buybacks may offset new shares issued through employee compensation or other programs.",
                ],
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
          </section>

          {/* WHAT TO CHECK */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              What Investors Should Check
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Understand What Is Actually Changing
            </h2>

            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <div className="grid grid-cols-[1fr_1.5fr] bg-[#111827] px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
                <span>Check</span>
                <span>Why It Matters</span>
              </div>

              {[
                [
                  "Split Ratio",
                  "Shows how the number of shares and price per share will change.",
                ],
                [
                  "Shares Outstanding",
                  "Shows whether the company's share count is rising or falling.",
                ],
                [
                  "Buyback Size",
                  "Shows how significant the repurchase program is relative to the company.",
                ],
                [
                  "Cash Position",
                  "Shows whether the company can afford repurchases without weakening its finances.",
                ],
                [
                  "Debt",
                  "Heavy borrowing used for buybacks can increase financial risk.",
                ],
                [
                  "EPS Growth",
                  "Helps separate business growth from changes caused by a lower share count.",
                ],
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
                Stock splits change the number of shares and price per share,
                while buybacks can change the number of shares outstanding.
                Neither should be judged alone—always connect them back to the
                company&apos;s fundamentals and financial condition.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}