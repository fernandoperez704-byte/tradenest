"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function FundamentalsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black">Fundamentals</h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                Learn how revenue, profit, cash flow, debt, valuation, and
                financial strength help investors understand a company.
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
          {/* WHAT ARE FUNDAMENTALS */}
          {/* ====================================================== */}

          <section className="mt-8 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                What Are Fundamentals?
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                Understand the Business Behind the Stock
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
                Fundamental analysis looks at the company itself — how much
                money it generates, what it spends, what it owns, what it owes,
                and how the market values the business.
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["Business Performance", "Revenue, profit, margins, and growth."],
                ["Financial Strength", "Cash flow, debt, and balance sheet health."],
                ["Valuation", "What investors are paying for the company."],
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
              No single metric tells the whole story. Fundamentals are most useful
              when several pieces are evaluated together.
            </p>
          </section>

          {/* ====================================================== */}
          {/* REVENUE AND PROFIT */}
          {/* ====================================================== */}

          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                Revenue & Profit
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                Is the Business Growing and Making Money?
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
                Revenue shows how much money the company generates. Profit shows
                how much remains after costs and expenses.
              </p>
            </div>

            <div className="mt-5 grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Revenue
                </p>
                <p className="mt-1 text-xl font-black text-white">$100M</p>
                <p className="mt-1 text-xs text-zinc-500">Money generated</p>
              </div>

              <span className="text-center text-zinc-500">−</span>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Costs & Expenses
                </p>
                <p className="mt-1 text-xl font-black text-white">$75M</p>
                <p className="mt-1 text-xs text-zinc-500">Money spent</p>
              </div>

              <span className="text-center text-zinc-500">=</span>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Profit
                </p>
                <p className="mt-1 text-xl font-black text-white">$25M</p>
                <p className="mt-1 text-xs text-zinc-500">Money remaining</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 border-t border-white/10 pt-3 md:grid-cols-2">
              <p className="text-sm text-zinc-400">
                <span className="font-black text-white">
                  Growing revenue:
                </span>{" "}
                can show increasing demand or business expansion.
              </p>

              <p className="text-sm text-zinc-400">
                <span className="font-black text-white">
                  Growing profit:
                </span>{" "}
                shows the company is keeping more of what it generates.
              </p>
            </div>
          </section>

          {/* ====================================================== */}
          {/* CASH FLOW */}
          {/* ====================================================== */}

          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                Cash Flow
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                Is the Business Actually Generating Cash?
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
                A company can report accounting profit while still struggling
                with cash. Cash flow helps show how money actually moves through
                the business.
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                [
                  "Operating Cash Flow",
                  "$30M",
                  "Cash generated from normal business operations.",
                ],
                [
                  "Capital Spending",
                  "$10M",
                  "Cash spent on equipment, buildings, or other long-term assets.",
                ],
                [
                  "Free Cash Flow",
                  "$20M",
                  "Cash remaining after operating needs and capital spending.",
                ],
              ].map(([title, value, description]) => (
                <div
                  key={title}
                  className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3"
                >
                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    {title}
                  </p>

                  <p className="mt-1 text-xl font-black text-white">{value}</p>

                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    {description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-3 text-sm">
              <span className="font-bold text-white">$30M Operating Cash Flow</span>
              <span className="text-zinc-500">−</span>
              <span className="font-bold text-white">$10M Capital Spending</span>
              <span className="text-zinc-500">=</span>
              <span className="font-black text-white">$20M Free Cash Flow</span>
            </div>

            <p className="mt-3 text-xs text-zinc-500">
              Positive free cash flow can give a company more flexibility to
              reinvest, reduce debt, repurchase shares, or pay dividends.
            </p>
          </section>

          {/* ====================================================== */}
          {/* DEBT */}
          {/* ====================================================== */}

          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                Debt
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                How Much Does the Company Owe?
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
                Debt can help a company grow, but too much debt can make the
                business more vulnerable when earnings weaken or interest costs rise.
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Cash
                </p>
                <p className="mt-1 text-xl font-black text-white">$40M</p>
                <p className="mt-1 text-xs text-zinc-500">
                  Money available to the company
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Total Debt
                </p>
                <p className="mt-1 text-xl font-black text-white">$60M</p>
                <p className="mt-1 text-xs text-zinc-500">
                  Borrowed money the company owes
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Net Debt
                </p>
                <p className="mt-1 text-xl font-black text-white">$20M</p>
                <p className="mt-1 text-xs text-zinc-500">
                  Debt remaining after available cash
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 border-t border-white/10 pt-3 md:grid-cols-2">
              <p className="text-sm text-zinc-400">
                <span className="font-black text-white">
                  Manageable debt:
                </span>{" "}
                can be useful when a company has strong earnings and cash flow.
              </p>

              <p className="text-sm text-zinc-400">
                <span className="font-black text-white">
                  Heavy debt:
                </span>{" "}
                can create pressure when profits fall or borrowing becomes more expensive.
              </p>
            </div>

            <p className="mt-3 text-xs text-zinc-500">
              Debt should be compared with cash flow, earnings, interest costs,
              and the type of business.
            </p>
          </section>

          {/* ====================================================== */}
          {/* VALUATION */}
          {/* ====================================================== */}

          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                Valuation
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                What Are Investors Paying for the Earnings?
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
                The price-to-earnings ratio, or P/E, compares the stock price
                with the company&apos;s earnings per share.
              </p>
            </div>

            <div className="mt-5 grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Stock Price
                </p>
                <p className="mt-1 text-xl font-black text-white">$50</p>
              </div>

              <span className="text-center text-zinc-500">÷</span>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  EPS
                </p>
                <p className="mt-1 text-xl font-black text-white">$2.50</p>
              </div>

              <span className="text-center text-zinc-500">=</span>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  P/E Ratio
                </p>
                <p className="mt-1 text-xl font-black text-white">20×</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 border-t border-white/10 pt-3 md:grid-cols-2">
              <div>
                <p className="text-sm font-black text-white">Higher P/E</p>
                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Investors may expect stronger growth, but they are also paying
                  more for each dollar of earnings.
                </p>
              </div>

              <div>
                <p className="text-sm font-black text-white">Lower P/E</p>
                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  The stock may be cheaper relative to earnings, but the lower
                  valuation can also reflect weaker expectations.
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs text-zinc-500">
              P/E should not be used alone. Compare companies with similar
              businesses, growth rates, profitability, and financial strength.
            </p>
          </section>

          {/* ====================================================== */}
          {/* PUTTING IT TOGETHER */}
          {/* ====================================================== */}

          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                Putting It Together
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                Company Health Is More Than One Number
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
                Strong fundamentals usually come from several healthy pieces
                working together.
              </p>
            </div>

            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-[#111827] px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
                <span>Metric</span>
                <span>Company A</span>
                <span>Company B</span>
              </div>

              {[
                ["Revenue", "Growing", "Declining"],
                ["Profit", "Growing", "Falling"],
                ["Free Cash Flow", "Positive", "Weak"],
                ["Debt", "Manageable", "Heavy"],
                ["P/E", "20×", "12×"],
              ].map(([label, a, b]) => (
                <div
                  key={label}
                  className="grid grid-cols-[1.2fr_1fr_1fr] border-t border-white/10 px-4 py-3 text-sm"
                >
                  <span className="text-zinc-400">{label}</span>
                  <span className="font-bold text-white">{a}</span>
                  <span className="font-bold text-white">{b}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <p className="text-sm text-zinc-400">
                <span className="font-black text-white">Company A:</span>{" "}
                stronger growth, cash flow, and debt profile, but investors are
                paying a higher valuation.
              </p>

              <p className="text-sm text-zinc-400">
                <span className="font-black text-white">Company B:</span>{" "}
                cheaper valuation, but weaker business performance and greater
                financial pressure.
              </p>
            </div>

            <p className="mt-3 border-t border-white/10 pt-3 text-xs text-zinc-500">
              A lower valuation does not automatically mean a better company,
              and strong growth does not automatically mean a stock is fairly priced.
            </p>
          </section>

          {/* FINAL LESSON */}
          <section className="mt-6 border-t border-white/10 px-2 py-4">
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
              <p className="shrink-0 text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                Key Lesson
              </p>

              <p className="text-sm leading-5 text-zinc-400">
                Strong fundamental analysis connects business performance,
                financial strength, and valuation instead of relying on one metric.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}