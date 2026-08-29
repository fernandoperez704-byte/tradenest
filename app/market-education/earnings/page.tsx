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
        <div className="mx-auto w-full max-w-[1400px]">
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

{/* WHAT ARE EARNINGS */}
<section className="mt-6 rounded-2xl border border-cyan-400/20 bg-[#020617] p-5">
  <div className="text-center">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      What Are Earnings?
    </p>

    <h2 className="mt-1 text-2xl font-black">
      How Much Money Did the Company Actually Make?
    </h2>

    <p className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
      A company earns revenue from its business. After paying the expenses
      needed to operate, what remains is profit — also called earnings.
    </p>
  </div>

  {/* SIMPLE FLOW */}
  <div className="mx-auto mt-5 grid max-w-5xl gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
    <div className="rounded-xl bg-[#111827] p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        Revenue
      </p>

      <p className="mt-1 text-2xl font-black">$100M</p>

      <p className="mt-1 text-xs text-zinc-500">
        Money the company brought in
      </p>
    </div>

    <div className="text-center text-xl font-black text-cyan-400">
      −
    </div>

    <div className="rounded-xl bg-[#111827] p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        Expenses
      </p>

      <p className="mt-1 text-2xl font-black">$75M</p>

      <p className="mt-1 text-xs text-zinc-500">
        Money the company spent
      </p>
    </div>

    <div className="text-center text-xl font-black text-cyan-400">
      =
    </div>

    <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        Earnings
      </p>

      <p className="mt-1 text-2xl font-black text-cyan-300">$25M</p>

      <p className="mt-1 text-xs text-zinc-500">
        Money left after expenses
      </p>
    </div>
  </div>

  {/* MAIN IDEA */}
  <div className="mx-auto mt-4 max-w-5xl rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-4">
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <p className="font-black text-cyan-300">
          Revenue is not earnings
        </p>

        <p className="mt-1 text-sm leading-5 text-zinc-400">
          Revenue tells you how much money came in. It does not tell you how
          much the company kept.
        </p>
      </div>

      <div className="md:border-l md:border-white/10 md:pl-4">
        <p className="font-black text-white">
          Earnings show what's left
        </p>

        <p className="mt-1 text-sm leading-5 text-zinc-400">
          If $100M comes in and $75M is spent, the company has $25M of
          earnings left.
        </p>
      </div>
    </div>
  </div>
</section>

{/* EARNINGS PER SHARE */}
<section className="mt-6 rounded-2xl border border-white/10 bg-[#0f172a] p-5">
  <div className="text-center">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Earnings Per Share
    </p>

    <h2 className="mt-1 text-2xl font-black">
      How Much Profit Is There Per Share?
    </h2>

    <p className="mx-auto mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
      EPS takes the company's earnings and divides them by its shares
      outstanding. The result shows how much earnings the company generated
      per share.
    </p>
  </div>

  {/* SIMPLE EPS FLOW */}
  <div className="mx-auto mt-5 grid max-w-5xl gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
    <div className="rounded-xl bg-[#111827] p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        Earnings
      </p>

      <p className="mt-1 text-2xl font-black">$25M</p>

      <p className="mt-1 text-xs text-zinc-500">
        Total company profit
      </p>
    </div>

    <div className="text-center text-xl font-black text-cyan-400">
      ÷
    </div>

    <div className="rounded-xl bg-[#111827] p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        Shares Outstanding
      </p>

      <p className="mt-1 text-2xl font-black">10M</p>

      <p className="mt-1 text-xs text-zinc-500">
        Shares held by investors
      </p>
    </div>

    <div className="text-center text-xl font-black text-cyan-400">
      =
    </div>

    <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        EPS
      </p>

      <p className="mt-1 text-2xl font-black text-cyan-300">
        $2.50
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Earnings per share
      </p>
    </div>
  </div>

  {/* WHAT IT MEANS */}
  <div className="mx-auto mt-4 grid max-w-5xl gap-3 md:grid-cols-2">
    <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">
      <p className="font-black text-cyan-300">
        What does $2.50 EPS mean?
      </p>

      <p className="mt-1 text-sm leading-5 text-zinc-400">
        The company generated $2.50 of earnings for each outstanding share.
      </p>
    </div>

    <div className="rounded-xl bg-[#111827] p-4">
      <p className="font-black text-white">
        Why EPS matters
      </p>

      <p className="mt-1 text-sm leading-5 text-zinc-400">
        EPS makes company profit easier to understand on a per-share basis and
        helps investors compare earnings over time.
      </p>
    </div>
  </div>

  <p className="mx-auto mt-3 max-w-4xl text-center text-xs leading-5 text-zinc-500">
    Rising EPS can show improving profit per share, while falling EPS can show
    weakening profit per share. EPS should not be evaluated by itself.
  </p>
</section>

{/* EARNINGS EXPECTATIONS */}
<section className="mt-6 rounded-2xl border border-cyan-400/20 bg-[#020617] p-5">
  <div className="text-center">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Earnings Expectations
    </p>

    <h2 className="mt-1 text-2xl font-black">
      Did the Company Beat or Miss Expectations?
    </h2>

    <p className="mx-auto mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
      Before earnings, analysts estimate results such as revenue and EPS.
      Investors then compare the reported numbers with those expectations.
    </p>
  </div>

  {/* EXPECTED VS ACTUAL */}
  <div className="mx-auto mt-5 grid max-w-5xl gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
    <div className="rounded-xl bg-[#111827] p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        Expected EPS
      </p>

      <p className="mt-1 text-2xl font-black">$2.20</p>

      <p className="mt-1 text-xs text-zinc-500">
        Analyst estimate
      </p>
    </div>

    <div className="text-center text-xl font-black text-cyan-400">
      →
    </div>

    <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        Actual EPS
      </p>

      <p className="mt-1 text-2xl font-black text-cyan-300">
        $2.50
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Company reported
      </p>
    </div>

    <div className="text-center text-xl font-black text-cyan-400">
      =
    </div>

    <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        Result
      </p>

      <p className="mt-1 text-2xl font-black text-cyan-300">
        BEAT
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Actual was higher
      </p>
    </div>
  </div>

  {/* BEAT / MEET / MISS */}
  <div className="mx-auto mt-4 grid max-w-5xl gap-2 md:grid-cols-3">
    <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3 text-center">
      <p className="font-black text-cyan-300">
        ↑ Beat
      </p>

      <p className="mt-1 text-xs leading-5 text-zinc-400">
        Actual results are higher than expected.
      </p>
    </div>

    <div className="rounded-xl bg-[#111827] p-3 text-center">
      <p className="font-black text-white">
        = Meet
      </p>

      <p className="mt-1 text-xs leading-5 text-zinc-400">
        Actual results are roughly in line with expectations.
      </p>
    </div>

    <div className="rounded-xl bg-[#111827] p-3 text-center">
      <p className="font-black text-white">
        ↓ Miss
      </p>

      <p className="mt-1 text-xs leading-5 text-zinc-400">
        Actual results are lower than expected.
      </p>
    </div>
  </div>

  {/* KEY IDEA */}
  <div className="mx-auto mt-4 max-w-5xl rounded-xl border border-white/10 bg-[#111827] px-5 py-4 text-center">
    <p className="font-black text-white">
      Good earnings do not automatically mean the stock goes up.
    </p>

    <p className="mx-auto mt-1 max-w-3xl text-sm leading-5 text-zinc-400">
      Markets react to how the results compare with expectations. A profitable
      company can still disappoint investors if they expected stronger results.
    </p>
  </div>
</section>

{/* READING THE REPORT */}
<section className="mt-6 rounded-2xl border border-white/10 bg-[#0f172a] p-5">
  <div className="text-center">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Reading the Report
    </p>

    <h2 className="mt-1 text-2xl font-black">
      Revenue and EPS Can Tell Different Stories
    </h2>

    <p className="mx-auto mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
      Investors usually compare both revenue and EPS with expectations.
      One can beat while the other misses.
    </p>
  </div>

  {/* MAIN COMPARISON */}
  <div className="mx-auto mt-5 grid max-w-5xl gap-3 md:grid-cols-2">
    {/* REVENUE */}
    <div className="rounded-xl bg-[#111827] p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Revenue
          </p>

          <p className="mt-1 font-black">
            Sales Performance
          </p>
        </div>

        <span className="rounded-lg bg-white/5 px-3 py-1 text-xs font-black text-zinc-300">
          MISS
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-zinc-500">
            Expected
          </p>

          <p className="text-xl font-black">
            $105M
          </p>
        </div>

        <div className="text-lg font-black text-zinc-600">
          →
        </div>

        <div className="text-right">
          <p className="text-xs text-zinc-500">
            Actual
          </p>

          <p className="text-xl font-black">
            $100M
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-5 text-zinc-400">
        Revenue came in $5M below expectations.
      </p>
    </div>

    {/* EPS */}
    <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            EPS
          </p>

          <p className="mt-1 font-black">
            Profit Per Share
          </p>
        </div>

        <span className="rounded-lg bg-cyan-400/10 px-3 py-1 text-xs font-black text-cyan-300">
          BEAT
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-zinc-500">
            Expected
          </p>

          <p className="text-xl font-black">
            $2.20
          </p>
        </div>

        <div className="text-lg font-black text-cyan-400">
          →
        </div>

        <div className="text-right">
          <p className="text-xs text-zinc-500">
            Actual
          </p>

          <p className="text-xl font-black text-cyan-300">
            $2.50
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-5 text-zinc-400">
        EPS came in $0.30 above expectations.
      </p>
    </div>
  </div>

  {/* SIMPLE EXPLANATION */}
  <div className="mx-auto mt-4 max-w-5xl rounded-xl border border-white/10 bg-[#020617] px-5 py-4">
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <p className="font-black text-white">
          Revenue missed
        </p>

        <p className="mt-1 text-sm leading-5 text-zinc-400">
          The company sold less than analysts expected.
        </p>
      </div>

      <div className="md:border-l md:border-white/10 md:pl-4">
        <p className="font-black text-cyan-300">
          EPS beat
        </p>

        <p className="mt-1 text-sm leading-5 text-zinc-400">
          Profit per share was stronger than analysts expected.
        </p>
      </div>
    </div>
  </div>

  <p className="mx-auto mt-3 max-w-4xl text-center text-sm font-black text-cyan-300">
    One number does not tell the whole earnings story.
  </p>
</section>

{/* COMPANY GUIDANCE */}
<section className="mt-6 rounded-2xl border border-cyan-400/20 bg-[#020617] p-5">
  <div className="text-center">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Company Guidance
    </p>

    <h2 className="mt-1 text-2xl font-black">
      What Does Management Expect Next?
    </h2>

    <p className="mx-auto mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
      Guidance is management's outlook for the future. Investors compare that
      outlook with what analysts expected.
    </p>
  </div>

  {/* SIMPLE GUIDANCE FLOW */}
  <div className="mx-auto mt-5 grid max-w-5xl gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
    <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        Current Quarter
      </p>

      <p className="mt-1 text-2xl font-black text-cyan-300">
        EPS Beat
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Results were stronger than expected
      </p>
    </div>

    <div className="text-center text-xl font-black text-cyan-400">
      →
    </div>

    <div className="rounded-xl bg-[#111827] p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        Analysts Expected
      </p>

      <p className="mt-1 text-2xl font-black">
        $100M
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Next-quarter revenue
      </p>
    </div>

    <div className="text-center text-xl font-black text-cyan-400">
      →
    </div>

    <div className="rounded-xl bg-[#111827] p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        Company Guides
      </p>

      <p className="mt-1 text-2xl font-black">
        $90M
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Management's outlook
      </p>
    </div>
  </div>

  {/* RESULT */}
  <div className="mx-auto mt-4 grid max-w-5xl gap-3 md:grid-cols-2">
    <div className="rounded-xl bg-[#111827] p-4">
      <p className="font-black text-white">
        Current results were strong
      </p>

      <p className="mt-1 text-sm leading-5 text-zinc-400">
        The company beat EPS expectations for the quarter that just ended.
      </p>
    </div>

    <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">
      <p className="font-black text-cyan-300">
        Future guidance was weaker
      </p>

      <p className="mt-1 text-sm leading-5 text-zinc-400">
        Analysts expected $100M next quarter, but management guided to $90M.
      </p>
    </div>
  </div>

  <div className="mx-auto mt-4 max-w-5xl rounded-xl border border-white/10 bg-[#111827] px-5 py-4 text-center">
    <p className="font-black text-white">
      Why can the stock still fall?
    </p>

    <p className="mx-auto mt-1 max-w-3xl text-sm leading-5 text-zinc-400">
      Investors care about the future too. Strong current earnings can be
      overshadowed by a weaker-than-expected outlook.
    </p>
  </div>
</section>

{/* MARKET REACTION */}
<section className="mt-6 rounded-2xl border border-white/10 bg-[#0f172a] p-5">
  <div className="text-center">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Market Reaction
    </p>

    <h2 className="mt-1 text-2xl font-black">
      Why Can a Stock Move So Much After Earnings?
    </h2>

    <p className="mx-auto mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
      Investors look at the full report — actual results, expectations, and
      future guidance — not just one number.
    </p>
  </div>

  {/* REPORT SNAPSHOT */}
  <div className="mx-auto mt-5 grid max-w-5xl gap-3 md:grid-cols-3">
    <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        EPS
      </p>

      <p className="mt-1 text-2xl font-black text-cyan-300">
        BEAT
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        $2.50 actual vs $2.20 expected
      </p>
    </div>

    <div className="rounded-xl bg-[#111827] p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        Revenue
      </p>

      <p className="mt-1 text-2xl font-black">
        MISS
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        $100M actual vs $105M expected
      </p>
    </div>

    <div className="rounded-xl bg-[#111827] p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        Guidance
      </p>

      <p className="mt-1 text-2xl font-black">
        WEAKER
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        $90M outlook vs $100M expected
      </p>
    </div>
  </div>

  {/* SIMPLE READING */}
  <div className="mx-auto mt-4 grid max-w-5xl gap-3 md:grid-cols-3">
    <div className="rounded-xl bg-[#111827] p-4">
      <p className="font-black text-white">
        1. What happened?
      </p>

      <p className="mt-1 text-sm leading-5 text-zinc-400">
        Look at revenue, earnings, and EPS.
      </p>
    </div>

    <div className="rounded-xl bg-[#111827] p-4">
      <p className="font-black text-white">
        2. Was it expected?
      </p>

      <p className="mt-1 text-sm leading-5 text-zinc-400">
        Compare the actual numbers with analyst estimates.
      </p>
    </div>

    <div className="rounded-xl bg-[#111827] p-4">
      <p className="font-black text-white">
        3. What comes next?
      </p>

      <p className="mt-1 text-sm leading-5 text-zinc-400">
        Check management guidance and the future outlook.
      </p>
    </div>
  </div>

  {/* KEY IDEA */}
  <div className="mx-auto mt-4 max-w-5xl rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-4 text-center">
    <p className="font-black text-cyan-300">
      Earnings reactions are about the whole picture.
    </p>

    <p className="mx-auto mt-1 max-w-3xl text-sm leading-5 text-zinc-400">
      A company can beat EPS and still see its stock fall if revenue or future
      guidance disappoints investors.
    </p>
  </div>
</section>

{/* INTERACTIVE EARNINGS CALCULATOR */}
<section className="mt-6 rounded-2xl border border-cyan-400/20 bg-[#020617] p-5">
  <div className="text-center">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Interactive Example
    </p>

    <h2 className="mt-1 text-2xl font-black">
      Build an Earnings Report
    </h2>

    <p className="mx-auto mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
      Change the numbers to see how revenue, expenses, and share count affect
      earnings and EPS.
    </p>
  </div>

  {/* INPUTS */}
  <div className="mx-auto mt-5 grid max-w-5xl gap-3 lg:grid-cols-3">
    <div className="rounded-xl bg-[#111827] p-4">
      <div className="flex items-center justify-between">
        <p className="font-black">Revenue</p>

        <p className="text-xl font-black text-cyan-300">
          ${revenue}M
        </p>
      </div>

      <input
        type="range"
        min="20"
        max="200"
        step="5"
        value={revenue}
        onChange={(e) => setRevenue(Number(e.target.value))}
        className="mt-4 w-full accent-cyan-400"
      />

      <div className="mt-1 flex justify-between text-[11px] text-zinc-600">
        <span>$20M</span>
        <span>$200M</span>
      </div>
    </div>

    <div className="rounded-xl bg-[#111827] p-4">
      <div className="flex items-center justify-between">
        <p className="font-black">Expenses</p>

        <p className="text-xl font-black">
          ${expenses}M
        </p>
      </div>

      <input
        type="range"
        min="10"
        max="180"
        step="5"
        value={expenses}
        onChange={(e) => setExpenses(Number(e.target.value))}
        className="mt-4 w-full accent-cyan-400"
      />

      <div className="mt-1 flex justify-between text-[11px] text-zinc-600">
        <span>$10M</span>
        <span>$180M</span>
      </div>
    </div>

    <div className="rounded-xl bg-[#111827] p-4">
      <div className="flex items-center justify-between">
        <p className="font-black">Shares Outstanding</p>

        <p className="text-xl font-black">
          {sharesOutstanding}M
        </p>
      </div>

      <input
        type="range"
        min="1"
        max="50"
        step="1"
        value={sharesOutstanding}
        onChange={(e) =>
          setSharesOutstanding(Number(e.target.value))
        }
        className="mt-4 w-full accent-cyan-400"
      />

      <div className="mt-1 flex justify-between text-[11px] text-zinc-600">
        <span>1M</span>
        <span>50M</span>
      </div>
    </div>
  </div>

  {/* LIVE CALCULATION */}
  <div className="mx-auto mt-4 grid max-w-5xl gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
    <div className="rounded-xl bg-[#111827] p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        Net Income
      </p>

      <p
        className={`mt-1 text-2xl font-black ${
          netIncome >= 0 ? "text-cyan-300" : "text-zinc-300"
        }`}
      >
        ${netIncome}M
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        ${revenue}M revenue − ${expenses}M expenses
      </p>
    </div>

    <div className="text-center text-xl font-black text-cyan-400">
      →
    </div>

    <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        Earnings Per Share
      </p>

      <p className="mt-1 text-2xl font-black text-cyan-300">
        ${eps.toFixed(2)}
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        ${netIncome}M ÷ {sharesOutstanding}M shares
      </p>
    </div>
  </div>

  <p className="mx-auto mt-3 max-w-4xl text-center text-xs leading-5 text-zinc-500">
    Higher revenue does not automatically mean higher earnings. Expenses affect
    profit, and share count affects EPS.
  </p>
</section>

{/* KEY EARNINGS LESSONS */}
<section className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6">
  <div className="text-center">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Key Lessons
    </p>

    <h2 className="mt-2 text-2xl font-black text-white">
      How to Think About Earnings
    </h2>

    <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
      An earnings report tells a bigger story than whether a company made or
      lost money. Understanding the report means connecting several pieces.
    </p>
  </div>

  <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
    <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
      <p className="text-sm font-black text-cyan-300">
        01 — Revenue
      </p>

      <p className="mt-2 text-sm leading-6 text-zinc-400">
        Shows how much money the company generated from its business before
        expenses are subtracted.
      </p>
    </div>

    <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
      <p className="text-sm font-black text-cyan-300">
        02 — Earnings
      </p>

      <p className="mt-2 text-sm leading-6 text-zinc-400">
        Shows how much profit remains after the company's costs and expenses
        are accounted for.
      </p>
    </div>

    <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
      <p className="text-sm font-black text-cyan-300">
        03 — EPS
      </p>

      <p className="mt-2 text-sm leading-6 text-zinc-400">
        Shows earnings on a per-share basis, helping investors understand
        profit relative to the company's share count.
      </p>
    </div>

    <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
      <p className="text-sm font-black text-cyan-300">
        04 — Expectations
      </p>

      <p className="mt-2 text-sm leading-6 text-zinc-400">
        Actual results are compared with what analysts and investors expected
        before the report.
      </p>
    </div>

    <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
      <p className="text-sm font-black text-cyan-300">
        05 — Guidance
      </p>

      <p className="mt-2 text-sm leading-6 text-zinc-400">
        Management's outlook can change how investors think about future
        revenue, earnings, margins, and growth.
      </p>
    </div>

    <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
      <p className="text-sm font-black text-cyan-300">
        06 — Market Reaction
      </p>

      <p className="mt-2 text-sm leading-6 text-zinc-400">
        Stock prices can react to the difference between expectations, actual
        results, and the company's future outlook.
      </p>
    </div>
  </div>

  <div className="mt-5 rounded-xl border border-cyan-400/30 bg-[#020617] px-5 py-5 text-center">
    <p className="text-lg font-black text-cyan-300">
      Don't ask only: “Did the company make money?”
    </p>

    <p className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
      Ask what happened to revenue and earnings, how the results compared with
      expectations, and what management says about the future.
    </p>
  </div>
</section>

        </div>
      </main>
    </>
  );
}