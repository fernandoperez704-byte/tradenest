"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

type Frequency = "MONTHLY" | "QUARTERLY" | "SEMIANNUAL" | "ANNUAL";

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const frequencyConfig: Record<
  Frequency,
  {
    label: string;
    paymentMonths: number[];
    payments: number;
    description: string;
  }
> = {
  MONTHLY: {
    label: "Monthly",
    paymentMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    payments: 12,
    description: "A monthly dividend pays shareholders 12 times per year.",
  },

  QUARTERLY: {
    label: "Quarterly",
    paymentMonths: [2, 5, 8, 11],
    payments: 4,
    description:
      "Quarterly dividends are generally paid four times per year.",
  },

  SEMIANNUAL: {
    label: "Semiannual",
    paymentMonths: [5, 11],
    payments: 2,
    description: "A semiannual dividend pays twice per year.",
  },

  ANNUAL: {
    label: "Annual",
    paymentMonths: [11],
    payments: 1,
    description: "An annual dividend pays once per year.",
  },
};

export default function DividendsPage() {
  
  const [shares, setShares] = useState(100);
  const [frequency, setFrequency] = useState<Frequency>("QUARTERLY");

const stockPrice = 50;
const dividendPerShare = 0.5;

const positionValue = shares * stockPrice;
const dividendPayment = shares * dividendPerShare;

  const selectedFrequency = frequencyConfig[frequency];



  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">

          {/* HEADER */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black">Dividends</h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                Learn what dividends are, how shareholders receive them, how
                often companies may pay them, and how to evaluate dividend
                income.
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
{/* WHAT IS A DIVIDEND */}
{/* ====================================================== */}

<section className="mt-8 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
  {/* HEADER */}
  <div className="text-center">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      What Is a Dividend?
    </p>

    <h2 className="mt-1 text-2xl font-black">
      A Company Can Share Part of Its Earnings
    </h2>

    <p className="mx-auto mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
      Some companies return part of their earnings to shareholders as dividends,
      while keeping the rest to reinvest in the business.
    </p>
  </div>

  {/* FLOW */}
  <div className="mx-auto mt-5 max-w-4xl">
    {/* EARNINGS */}
    <div className="mx-auto max-w-xs rounded-xl border border-white/10 bg-[#111827] px-5 py-3 text-center">
      <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
        Company Earnings
      </p>

      <p className="mt-1 text-xl font-black">
        $1,000,000
      </p>
    </div>

    {/* CONNECTOR */}
    <div className="mx-auto hidden h-4 w-px bg-zinc-700 md:block" />

    <div className="relative mx-auto hidden h-px w-1/2 bg-zinc-700 md:block">
      <div className="absolute left-0 h-3 w-px bg-zinc-700" />
      <div className="absolute right-0 h-3 w-px bg-zinc-700" />
    </div>

    {/* EARNINGS USE */}
    <div className="mt-3 grid gap-3 md:grid-cols-2">
      <div className="rounded-xl border border-white/10 bg-[#020617] px-5 py-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
          Keep in the Business
        </p>

        <h3 className="mt-1 text-lg font-black">
          Reinvest
        </h3>

        <p className="mt-1 text-sm leading-5 text-zinc-400">
          Fund growth, employees, equipment, acquisitions, or debt reduction.
        </p>
      </div>

      <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/[0.04] px-5 py-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
          Return to Shareholders
        </p>

<h3 className="mt-1 text-lg font-black text-white">
  Pay a Dividend
</h3>

        <p className="mt-1 text-sm leading-5 text-zinc-400">
          Distribute part of the company's earnings to eligible shareholders.
        </p>
      </div>
    </div>

    {/* NOTE */}
    <p className="mt-3 border-t border-white/10 pt-3 text-center text-xs text-zinc-500">
      Dividends are not guaranteed and may be increased, reduced, suspended, or eliminated.
    </p>
  </div>
</section>

{/* ====================================================== */}
{/* OWNERSHIP → PAYMENT */}
{/* ====================================================== */}

<section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
  {/* HEADER */}
  <div>
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      How Dividends Work
    </p>

    <h2 className="mt-1 text-2xl font-black text-white">
      Your Payment Depends on How Many Shares You Own
    </h2>

    <p className="mt-2 text-sm text-zinc-400">
      If a company declares a $0.50 dividend per share, each eligible
      share receives $0.50.
    </p>
  </div>

  {/* CALCULATOR */}
  <div className="mt-5 rounded-xl border border-white/10 bg-[#020617] p-5">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

      {/* SHARES */}
      <div className="flex-1">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Shares Owned
            </p>

            <p className="mt-1 text-xl font-black text-white">
              {shares} Shares
            </p>
          </div>

          <p className="text-sm text-zinc-500">
            1 – 500
          </p>
        </div>

        <input
          type="range"
          min="1"
          max="500"
          value={shares}
          onChange={(e) => setShares(Number(e.target.value))}
          className="mt-4 w-full accent-cyan-400"
        />
      </div>

      {/* DIVIDER */}
      <div className="hidden h-20 w-px bg-white/10 lg:block" />

      {/* RESULTS */}
      <div className="grid flex-1 grid-cols-2 gap-3">
        <div className="rounded-lg bg-[#111827] px-4 py-3">
          <p className="text-xs text-zinc-500">
            Position Value
          </p>

          <p className="mt-1 text-lg font-black text-white">
            ${positionValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            {shares} × ${stockPrice.toFixed(2)}
          </p>
        </div>

        <div className="rounded-lg bg-[#111827] px-4 py-3">
          <p className="text-xs text-zinc-500">
            Dividend Payment
          </p>

          <p className="mt-1 text-lg font-black text-white">
            ${dividendPayment.toFixed(2)}
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            {shares} × ${dividendPerShare.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ====================================================== */}
{/* PAYMENT FREQUENCY */}
{/* ====================================================== */}

<section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
  {/* HEADER */}
  <div>
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      How Often Are Dividends Paid?
    </p>

    <h2 className="mt-1 text-2xl font-black text-white">
      Payment Schedules Can Be Different
    </h2>

    <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
      Common schedules include monthly, quarterly, semiannual, and annual payments.
      Companies may also declare special one-time dividends.
    </p>
  </div>

  {/* CONTROLS + SUMMARY */}
  <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div className="flex flex-wrap gap-2">
      {(Object.keys(frequencyConfig) as Frequency[]).map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => setFrequency(key)}
          className={`rounded-lg border px-4 py-2 text-sm font-bold transition ${
            frequency === key
              ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
              : "border-white/10 bg-[#111827] text-zinc-400 hover:text-white"
          }`}
        >
          {frequencyConfig[key].label}
        </button>
      ))}
    </div>

    <div className="text-left lg:text-right">
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        Payments Per Year
      </p>

      <p className="mt-1 text-2xl font-black text-white">
        {selectedFrequency.payments}
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        {selectedFrequency.description}
      </p>
    </div>
  </div>

  {/* MONTHS */}
  <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-12">
    {months.map((month, index) => {
      const active = selectedFrequency.paymentMonths.includes(index);

      return (
        <div
          key={month}
          className={`rounded-lg border px-2 py-3 text-center ${
            active
              ? "border-white/10 bg-[#111827]"
              : "border-white/10 bg-[#020617]"
          }`}
        >
          <p className="text-[11px] font-black text-zinc-400">
            {month}
          </p>

          <div className="mt-2 flex h-5 items-center justify-center">
            {active ? (
              <span className="text-sm font-black text-cyan-300">$</span>
            ) : (
              <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
            )}
          </div>
        </div>
      );
    })}
  </div>

  {/* NOTE */}
  <p className="mt-4 border-t border-white/10 pt-3 text-xs text-zinc-500">
    Highlighted months are examples only. Actual payment dates depend on the company.
  </p>
</section>

{/* ====================================================== */}
{/* IMPORTANT DIVIDEND DATES */}
{/* ====================================================== */}

<section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
  <div>
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Important Dividend Dates
    </p>

    <h2 className="mt-1 text-2xl font-black text-white">
      The Dividend Timeline
    </h2>

    <p className="mt-2 text-sm text-zinc-400">
      A dividend moves through four key dates from announcement to payment.
    </p>
  </div>

  {/* TIMELINE */}
  <div className="mt-5 grid gap-3 md:grid-cols-4">
    {[
      {
        step: "1",
        title: "Declaration",
        date: "March 1",
        text: "Company announces the dividend and important dates.",
      },
      {
        step: "2",
        title: "Ex-Dividend",
        date: "March 14",
        text: "Buying on or after this date generally means you will not receive this dividend.",
      },
      {
        step: "3",
        title: "Record",
        date: "March 14",
        text: "Company identifies eligible shareholders.",
      },
      {
        step: "4",
        title: "Payment",
        date: "April 1",
        text: "Eligible shareholders receive the dividend.",
      },
    ].map((item) => (
      <div
        key={item.step}
        className="rounded-xl border border-white/10 bg-[#020617] px-4 py-3"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-xs font-black text-cyan-300">
            {item.step}
          </div>

          <div>
            <p className="font-black text-white">
              {item.title}
            </p>

            <p className="text-xs font-bold text-zinc-400">
              {item.date}
            </p>
          </div>
        </div>

        <p className="mt-3 text-xs leading-5 text-zinc-500">
          {item.text}
        </p>
      </div>
    ))}
  </div>

  {/* EXAMPLE */}
  <div className="mt-4 flex flex-col gap-1 border-t border-white/10 pt-3 text-sm md:flex-row md:items-center md:justify-between">
    <span className="font-bold text-white">
      Example: 100 eligible shares
    </span>

    <span className="text-zinc-400">
      100 × $0.50 dividend = <span className="font-black text-white">$50 payment</span>
    </span>
  </div>
</section>

{/* ====================================================== */}
{/* DIVIDEND YIELD */}
{/* ====================================================== */}

<section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
  <div>
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Dividend Yield
    </p>

    <h2 className="mt-1 text-2xl font-black text-white">
      How Much Income Relative to the Stock Price?
    </h2>

    <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
      Dividend yield compares the annual dividend with the stock price.
    </p>
  </div>

  {/* METRICS */}
  <div className="mt-5 grid gap-3 md:grid-cols-3">
    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <p className="text-xs text-zinc-500">Stock Price</p>
      <p className="mt-1 text-xl font-black text-white">$50</p>
    </div>

    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <p className="text-xs text-zinc-500">Annual Dividend</p>
      <p className="mt-1 text-xl font-black text-white">$2.00</p>
    </div>

    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <p className="text-xs text-zinc-500">Dividend Yield</p>
      <p className="mt-1 text-xl font-black text-white">4%</p>
    </div>
  </div>

  {/* FORMULA */}
  <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
    <span className="font-bold text-white">$2 Dividend</span>
    <span className="text-zinc-500">÷</span>
    <span className="font-bold text-white">$50 Stock Price</span>
    <span className="text-zinc-500">× 100</span>
    <span className="text-zinc-500">=</span>
    <span className="font-black text-white">4% Yield</span>
  </div>

  {/* EXPLANATION */}
  <div className="mt-4 border-t border-white/10 pt-3">
    <p className="text-sm leading-5 text-zinc-400">
      At a $50 stock price, a $2 annual dividend equals 4% of the share price.
      For 100 shares, that would be $200 in annual dividends if the dividend remains unchanged.
    </p>

    <p className="mt-2 text-xs text-zinc-500">
      A higher yield is not automatically better. A falling stock price can increase the yield even when the company is becoming weaker.
    </p>
  </div>
</section>

{/* ====================================================== */}
{/* DIVIDEND STABILITY */}
{/* ====================================================== */}

<section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
  <div>
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Dividend Stability
    </p>

    <h2 className="mt-1 text-2xl font-black text-white">
      Can the Company Support the Payment?
    </h2>

    <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
      The payout ratio shows how much of a company's earnings are being paid
      to shareholders as dividends.
    </p>
  </div>

  {/* METRICS */}
  <div className="mt-5 grid gap-3 md:grid-cols-3">
    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <p className="text-xs text-zinc-500">Earnings Per Share</p>
      <p className="mt-1 text-xl font-black text-white">$5.00</p>
    </div>

    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <p className="text-xs text-zinc-500">Dividend Per Share</p>
      <p className="mt-1 text-xl font-black text-white">$2.00</p>
    </div>

    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <p className="text-xs text-zinc-500">Earnings Kept</p>
      <p className="mt-1 text-xl font-black text-white">$3.00</p>
    </div>
  </div>

  {/* PAYOUT BAR */}
  <div className="mt-4">
    <div className="flex h-9 overflow-hidden rounded-lg bg-[#111827]">
      <div
        className="flex items-center justify-center bg-cyan-400/15 text-xs font-black text-white"
        style={{ width: "40%" }}
      >
        40% Paid
      </div>

      <div
        className="flex items-center justify-center text-xs font-black text-white"
        style={{ width: "60%" }}
      >
        60% Kept
      </div>
    </div>
  </div>

  {/* FORMULA */}
  <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
    <span className="font-bold text-white">$2 Dividend</span>
    <span className="text-zinc-500">÷</span>
    <span className="font-bold text-white">$5 Earnings</span>
    <span className="text-zinc-500">× 100</span>
    <span className="text-zinc-500">=</span>
    <span className="font-black text-white">40% Payout Ratio</span>
  </div>

  {/* WHY IT MATTERS */}
  <div className="mt-4 grid gap-3 border-t border-white/10 pt-3 md:grid-cols-2">
    <div>
      <p className="text-sm font-black text-white">
        More Room
      </p>

      <p className="mt-1 text-sm leading-5 text-zinc-400">
        When earnings are well above the dividend, the company has more room
        to reinvest or handle weaker periods.
      </p>
    </div>

    <div>
      <p className="text-sm font-black text-white">
        Less Room for Error
      </p>

      <p className="mt-1 text-sm leading-5 text-zinc-400">
        When most earnings are already being paid out, falling earnings can
        make the dividend harder to maintain.
      </p>
    </div>
  </div>

  <p className="mt-3 text-xs text-zinc-500">
    Also consider cash flow, debt, earnings trends, and dividend history.
    Payout ratio alone does not determine whether a dividend is sustainable.
  </p>
</section>

{/* ====================================================== */}
{/* STOCK COMPARISON */}
{/* ====================================================== */}

<section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
  <div>
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Comparing Dividend Stocks
    </p>

    <h2 className="mt-1 text-2xl font-black text-white">
      Don't Compare Yield Alone
    </h2>

    <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
      A higher yield can look attractive, but dividend quality also depends on
      earnings, cash flow, payout ratio, and dividend history.
    </p>
  </div>

  <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
    <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-[#111827] px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
      <span>Metric</span>
      <span>Stock A</span>
      <span>Stock B</span>
    </div>

    {[
      ["Yield", "4%", "9%"],
      ["Payout Ratio", "40%", "95%"],
      ["Earnings", "Growing", "Declining"],
      ["Free Cash Flow", "Positive", "Weak"],
      ["Dividend History", "Consistent", "Recent Cut"],
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
    <div>
      <p className="text-sm font-black text-white">Stock A</p>
      <p className="mt-1 text-sm leading-5 text-zinc-400">
        Lower yield, but stronger earnings, cash flow, and payout room.
      </p>
    </div>

    <div>
      <p className="text-sm font-black text-white">Stock B</p>
      <p className="mt-1 text-sm leading-5 text-zinc-400">
        Higher yield, but weaker fundamentals and less room for error.
      </p>
    </div>
  </div>

  <p className="mt-3 border-t border-white/10 pt-3 text-xs text-zinc-500">
    Higher yield does not automatically mean better dividend quality.
  </p>
</section>

{/* FINAL LESSON */}
<section className="mt-6 border-t border-white/10 px-2 py-4">
  <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
    <p className="shrink-0 text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Key Lesson
    </p>

    <p className="text-sm leading-5 text-zinc-400">
      Dividends can provide income, but yield is only part of the picture.
      The company's earnings, cash flow, and ability to support the dividend matter too.
    </p>
  </div>
</section>

        </div>
      </main>
    </>
  );
}