"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function EarningsPage() {
  const [revenue, setRevenue] = useState(100);
const [expenses, setExpenses] = useState(75);
const [sharesOutstanding, setSharesOutstanding] = useState(10);

const netIncome = revenue - expenses;
const eps =
  sharesOutstanding > 0 ? netIncome / sharesOutstanding : 0;
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black">Earnings</h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                Learn how revenue, expenses, profit, EPS, expectations, and
                guidance help investors understand company performance.
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
{/* WHAT ARE EARNINGS */}
{/* ====================================================== */}

<section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
  <div>
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      What Are Earnings?
    </p>

    <h2 className="mt-1 text-2xl font-black text-white">
      How Much Money Did the Company Actually Make?
    </h2>

    <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
      Revenue is the money a company brings in. After expenses are paid,
      what remains is profit — also called earnings.
    </p>
  </div>

  {/* SIMPLE FORMULA */}
  <div className="mt-5 grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        Revenue
      </p>

      <p className="mt-1 text-xl font-black text-white">
        $100M
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Money brought in
      </p>
    </div>

    <div className="text-center text-lg font-black text-zinc-500">
      −
    </div>

    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        Expenses
      </p>

      <p className="mt-1 text-xl font-black text-white">
        $75M
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Money spent
      </p>
    </div>

    <div className="text-center text-lg font-black text-zinc-500">
      =
    </div>

    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        Earnings
      </p>

      <p className="mt-1 text-xl font-black text-white">
        $25M
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Money left after expenses
      </p>
    </div>
  </div>

  {/* TAKEAWAY */}
  <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-3 md:flex-row md:gap-8">
    <p className="text-sm text-zinc-400">
      <span className="font-black text-white">Revenue:</span>{" "}
      shows how much money came in.
    </p>

    <p className="text-sm text-zinc-400">
      <span className="font-black text-white">Earnings:</span>{" "}
      show how much money remained after expenses.
    </p>
  </div>
</section>

{/* ====================================================== */}
{/* EARNINGS PER SHARE */}
{/* ====================================================== */}

<section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
  <div>
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Earnings Per Share
    </p>

    <h2 className="mt-1 text-2xl font-black text-white">
      How Much Profit Is There Per Share?
    </h2>

    <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
      EPS divides company earnings by shares outstanding to show how much
      profit was generated per share.
    </p>
  </div>

  {/* FORMULA */}
  <div className="mt-5 grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        Earnings
      </p>

      <p className="mt-1 text-xl font-black text-white">
        $25M
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Total company profit
      </p>
    </div>

    <div className="text-center text-lg font-black text-zinc-500">
      ÷
    </div>

    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        Shares Outstanding
      </p>

      <p className="mt-1 text-xl font-black text-white">
        10M
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Shares held by investors
      </p>
    </div>

    <div className="text-center text-lg font-black text-zinc-500">
      =
    </div>

    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        EPS
      </p>

      <p className="mt-1 text-xl font-black text-white">
        $2.50
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Earnings per share
      </p>
    </div>
  </div>

  {/* TAKEAWAY */}
  <div className="mt-4 grid gap-3 border-t border-white/10 pt-3 md:grid-cols-2">
    <div>
      <p className="text-sm font-black text-white">
        What does $2.50 EPS mean?
      </p>

      <p className="mt-1 text-sm leading-5 text-zinc-400">
        The company generated $2.50 of earnings for each outstanding share.
      </p>
    </div>

    <div>
      <p className="text-sm font-black text-white">
        Why EPS matters
      </p>

      <p className="mt-1 text-sm leading-5 text-zinc-400">
        EPS makes profit easier to compare on a per-share basis and across time.
      </p>
    </div>
  </div>

  <p className="mt-3 text-xs text-zinc-500">
    Rising EPS can indicate improving profit per share, while falling EPS can indicate weakening profit per share.
  </p>
</section>

{/* ====================================================== */}
{/* EARNINGS EXPECTATIONS */}
{/* ====================================================== */}

<section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
  <div>
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Earnings Expectations
    </p>

    <h2 className="mt-1 text-2xl font-black text-white">
      Did the Company Beat or Miss Expectations?
    </h2>

    <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
      Analysts estimate results before earnings. Investors then compare those
      estimates with the numbers the company actually reports.
    </p>
  </div>

  {/* EXPECTED → ACTUAL → RESULT */}
  <div className="mt-5 grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        Expected EPS
      </p>

      <p className="mt-1 text-xl font-black text-white">
        $2.20
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Analyst estimate
      </p>
    </div>

    <span className="text-center text-zinc-500">→</span>

    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        Actual EPS
      </p>

      <p className="mt-1 text-xl font-black text-white">
        $2.50
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Company reported
      </p>
    </div>

    <span className="text-center text-zinc-500">=</span>

    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        Result
      </p>

      <p className="mt-1 text-xl font-black text-white">
        Beat
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Actual was higher
      </p>
    </div>
  </div>

  {/* DEFINITIONS */}
  <div className="mt-4 grid gap-3 border-t border-white/10 pt-3 md:grid-cols-3">
    <div>
      <p className="text-sm font-black text-white">Beat</p>
      <p className="mt-1 text-xs text-zinc-500">
        Actual results are higher than expected.
      </p>
    </div>

    <div>
      <p className="text-sm font-black text-white">Meet</p>
      <p className="mt-1 text-xs text-zinc-500">
        Results are roughly in line with expectations.
      </p>
    </div>

    <div>
      <p className="text-sm font-black text-white">Miss</p>
      <p className="mt-1 text-xs text-zinc-500">
        Actual results are lower than expected.
      </p>
    </div>
  </div>

  {/* IMPORTANT */}
  <p className="mt-3 text-xs leading-5 text-zinc-500">
    <span className="font-bold text-white">
      Good earnings do not automatically mean the stock goes up.
    </span>{" "}
    Markets react to how results compare with expectations.
  </p>
</section>

{/* ====================================================== */}
{/* READING THE REPORT */}
{/* ====================================================== */}

<section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
  <div>
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Reading the Report
    </p>

    <h2 className="mt-1 text-2xl font-black text-white">
      Revenue and EPS Can Tell Different Stories
    </h2>

    <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
      Investors compare both revenue and EPS with expectations. One can beat
      while the other misses.
    </p>
  </div>

  {/* COMPARISON */}
  <div className="mt-5 grid gap-3 md:grid-cols-2">
    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Revenue
          </p>

          <p className="mt-1 font-black text-white">
            Sales Performance
          </p>
        </div>

        <span className="text-xs font-black text-white">
          MISS
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-500">Expected</p>
          <p className="mt-1 text-lg font-black text-white">$105M</p>
        </div>

        <span className="text-zinc-600">→</span>

        <div className="text-right">
          <p className="text-xs text-zinc-500">Actual</p>
          <p className="mt-1 text-lg font-black text-white">$100M</p>
        </div>
      </div>

      <p className="mt-2 text-xs text-zinc-500">
        Revenue came in $5M below expectations.
      </p>
    </div>

    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            EPS
          </p>

          <p className="mt-1 font-black text-white">
            Profit Per Share
          </p>
        </div>

        <span className="text-xs font-black text-white">
          BEAT
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-500">Expected</p>
          <p className="mt-1 text-lg font-black text-white">$2.20</p>
        </div>

        <span className="text-zinc-600">→</span>

        <div className="text-right">
          <p className="text-xs text-zinc-500">Actual</p>
          <p className="mt-1 text-lg font-black text-white">$2.50</p>
        </div>
      </div>

      <p className="mt-2 text-xs text-zinc-500">
        EPS came in $0.30 above expectations.
      </p>
    </div>
  </div>

  {/* TAKEAWAY */}
  <div className="mt-4 grid gap-3 border-t border-white/10 pt-3 md:grid-cols-2">
    <p className="text-sm text-zinc-400">
      <span className="font-black text-white">Revenue missed:</span>{" "}
      the company sold less than analysts expected.
    </p>

    <p className="text-sm text-zinc-400">
      <span className="font-black text-white">EPS beat:</span>{" "}
      profit per share was stronger than expected.
    </p>
  </div>

  <p className="mt-3 text-xs text-zinc-500">
    One number does not tell the whole earnings story.
  </p>
</section>

{/* ====================================================== */}
{/* COMPANY GUIDANCE */}
{/* ====================================================== */}

<section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
  <div>
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Company Guidance
    </p>

    <h2 className="mt-1 text-2xl font-black text-white">
      What Does Management Expect Next?
    </h2>

    <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
      Guidance is management&apos;s outlook for the future. Investors compare
      that outlook with what analysts expected.
    </p>
  </div>

  {/* CURRENT RESULTS → EXPECTATIONS → GUIDANCE */}
  <div className="mt-5 grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        Current Quarter
      </p>

      <p className="mt-1 text-xl font-black text-white">
        EPS Beat
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Results were stronger than expected
      </p>
    </div>

    <span className="text-center text-zinc-500">→</span>

    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        Analysts Expected
      </p>

      <p className="mt-1 text-xl font-black text-white">
        $100M
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Next-quarter revenue
      </p>
    </div>

    <span className="text-center text-zinc-500">→</span>

    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        Company Guides
      </p>

      <p className="mt-1 text-xl font-black text-white">
        $90M
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Management&apos;s outlook
      </p>
    </div>
  </div>

  {/* TAKEAWAY */}
  <div className="mt-4 grid gap-3 border-t border-white/10 pt-3 md:grid-cols-2">
    <p className="text-sm text-zinc-400">
      <span className="font-black text-white">
        Current results were strong:
      </span>{" "}
      the company beat EPS expectations.
    </p>

    <p className="text-sm text-zinc-400">
      <span className="font-black text-white">
        Future guidance was weaker:
      </span>{" "}
      analysts expected $100M, but management guided to $90M.
    </p>
  </div>

  <p className="mt-3 text-xs leading-5 text-zinc-500">
    A stock can still fall after strong earnings because investors also care
    about what management expects next.
  </p>
</section>

{/* ====================================================== */}
{/* MARKET REACTION */}
{/* ====================================================== */}

<section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
  <div>
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Market Reaction
    </p>

    <h2 className="mt-1 text-2xl font-black text-white">
      Why Can a Stock Move So Much After Earnings?
    </h2>

    <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
      Investors look at the full report — actual results, expectations,
      and future guidance — not just one number.
    </p>
  </div>

  {/* REPORT SNAPSHOT */}
  <div className="mt-5 grid gap-3 md:grid-cols-3">
    {[
      {
        label: "EPS",
        result: "BEAT",
        detail: "$2.50 actual vs $2.20 expected",
      },
      {
        label: "Revenue",
        result: "MISS",
        detail: "$100M actual vs $105M expected",
      },
      {
        label: "Guidance",
        result: "WEAKER",
        detail: "$90M outlook vs $100M expected",
      },
    ].map((item) => (
      <div
        key={item.label}
        className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3"
      >
        <p className="text-xs uppercase tracking-wider text-zinc-500">
          {item.label}
        </p>

        <p className="mt-1 text-xl font-black text-white">
          {item.result}
        </p>

        <p className="mt-1 text-xs text-zinc-500">
          {item.detail}
        </p>
      </div>
    ))}
  </div>

  {/* HOW TO READ IT */}
  <div className="mt-4 grid gap-3 border-t border-white/10 pt-3 md:grid-cols-3">
    <div>
      <p className="text-sm font-black text-white">
        1. What happened?
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Look at revenue, earnings, and EPS.
      </p>
    </div>

    <div>
      <p className="text-sm font-black text-white">
        2. Was it expected?
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Compare actual results with analyst estimates.
      </p>
    </div>

    <div>
      <p className="text-sm font-black text-white">
        3. What comes next?
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Check management guidance and the future outlook.
      </p>
    </div>
  </div>

  <p className="mt-3 text-xs leading-5 text-zinc-500">
    A company can beat EPS and still see its stock fall if revenue
    or future guidance disappoints investors.
  </p>
</section>

{/* ====================================================== */}
{/* KEY LESSONS */}
{/* ====================================================== */}

<section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
  <div>
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Key Lessons
    </p>

    <h2 className="mt-1 text-2xl font-black text-white">
      How to Think About Earnings
    </h2>

    <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
      An earnings report tells a bigger story than whether a company simply
      made or lost money.
    </p>
  </div>

  {/* RECAP */}
  <div className="mt-5 grid gap-x-8 gap-y-3 border-t border-white/10 pt-4 md:grid-cols-2">
    {[
      ["Revenue", "How much money the business generated before expenses."],
      ["Earnings", "How much profit remained after costs and expenses."],
      ["EPS", "How much earnings were generated on a per-share basis."],
      ["Expectations", "How actual results compared with analyst estimates."],
      ["Guidance", "What management expects from the business going forward."],
      ["Market Reaction", "How investors respond to the complete earnings picture."],
    ].map(([title, description], index) => (
      <div key={title} className="flex gap-3">
        <span className="text-xs font-black text-zinc-600">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div>
          <p className="text-sm font-black text-white">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-zinc-500">
            {description}
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* FINAL TAKEAWAY */}
  <p className="mt-4 border-t border-white/10 pt-3 text-sm text-zinc-400">
    <span className="font-black text-white">
      Don't ask only, “Did the company make money?”
    </span>{" "}
    Look at revenue, earnings, expectations, and what management says about the future.
  </p>
</section>


        </div>
      </main>
    </>
  );
}