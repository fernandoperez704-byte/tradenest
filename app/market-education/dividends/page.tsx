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
  const [animationStep, setAnimationStep] = useState(0);
  const [shares, setShares] = useState(100);
  const [frequency, setFrequency] = useState<Frequency>("QUARTERLY");

const stockPrice = 50;
const dividendPerShare = 0.5;

const positionValue = shares * stockPrice;
const dividendPayment = shares * dividendPerShare;

  const selectedFrequency = frequencyConfig[frequency];

  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimationStep(1), 300),
      setTimeout(() => setAnimationStep(2), 900),
      setTimeout(() => setAnimationStep(3), 1500),
      setTimeout(() => setAnimationStep(4), 2100),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1400px]">

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

          <section className="mt-8 rounded-2xl border border-cyan-400/20 bg-[#020617] p-6">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                What Is a Dividend?
              </p>

              <h2 className="mt-2 text-2xl font-black">
                A Company Can Share Part of Its Earnings
              </h2>

              <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
                Some companies return part of their earnings to shareholders.
                That payment is called a dividend. The company may also keep
                part of its money to reinvest in the business.
              </p>
            </div>

            {/* COMPANY */}
            <div
              className={`mx-auto mt-8 max-w-md rounded-2xl border border-white/10 bg-[#111827] p-5 text-center transition-all duration-700 ${
                animationStep >= 1
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="text-3xl">🏢</div>

              <p className="mt-2 text-sm text-zinc-500">Company</p>

              <p className="mt-1 text-xl font-black">
                Generates Earnings
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                Example: $1,000,000
              </p>
            </div>

            {/* SPLIT */}
            <div
              className={`mt-5 grid gap-4 transition-all duration-700 md:grid-cols-2 ${
                animationStep >= 2
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="rounded-2xl border border-white/10 bg-[#111827] p-5 text-center">
                <div className="text-2xl">↻</div>

                <p className="mt-2 text-sm text-zinc-500">
                  Keep in the Business
                </p>

                <p className="mt-1 text-xl font-black">
                  Reinvest
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Money can be used for growth, employees, equipment,
                  acquisitions, debt reduction, or other business needs.
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5 text-center">
                <div className="text-2xl text-cyan-300">$</div>

                <p className="mt-2 text-sm text-zinc-500">
                  Return to Shareholders
                </p>

                <p className="mt-1 text-xl font-black text-cyan-300">
                  Pay a Dividend
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  The company may distribute part of its money to people who
                  own shares.
                </p>
              </div>
            </div>

            <div
              className={`mt-5 rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-center transition-all duration-700 ${
                animationStep >= 3 ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-sm text-zinc-300">
                Companies are generally not required to pay ordinary dividends.
                A dividend can be increased, reduced, suspended, or eliminated.
              </p>
            </div>
          </section>

          {/* ====================================================== */}
          {/* OWNERSHIP → PAYMENT */}
          {/* ====================================================== */}

          <section className="mt-6 rounded-2xl border border-white/10 bg-[#0f172a] p-6">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                How Dividends Work
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Your Payment Depends on How Many Shares You Own
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
                If the company declares a $0.50 dividend per share, each
                eligible share receives $0.50.
              </p>
            </div>


            {/* INTERACTIVE SHARE EXAMPLE */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-[#020617] p-5">
              <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
                <div>
                  <p className="text-sm font-black text-white">
                    Try It Yourself
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    Move the slider to change the number of shares.
                  </p>
                </div>

                <div className="text-center md:text-right">
                  <p className="text-xs text-zinc-500">
                    Dividend Payment
                  </p>

                  <p className="text-3xl font-black text-cyan-300">
                    ${dividendPayment.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <input
                  type="range"
                  min="1"
                  max="500"
                  value={shares}
                  onChange={(e) => setShares(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />

{/* POSITION VALUE */}
<div className="mt-5">
  <p className="mb-2 text-center text-xs font-bold uppercase tracking-wider text-zinc-500">
    Position Value
  </p>

  <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
    <span className="rounded-lg bg-[#111827] px-4 py-2 font-black">
      {shares} Shares
    </span>

    <span className="font-black text-cyan-400">×</span>

    <span className="rounded-lg bg-[#111827] px-4 py-2 font-black">
      ${stockPrice.toFixed(2)} Stock Price
    </span>

    <span className="font-black text-cyan-400">=</span>

    <span className="rounded-lg border border-white/10 bg-[#111827] px-4 py-2 font-black text-white">
      ${positionValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  </div>
</div>

{/* DIVIDEND PAYMENT */}
<div className="mt-4">
  <p className="mb-2 text-center text-xs font-bold uppercase tracking-wider text-zinc-500">
    Dividend Payment
  </p>

  <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
    <span className="rounded-lg bg-[#111827] px-4 py-2 font-black">
      {shares} Shares
    </span>

    <span className="font-black text-cyan-400">×</span>

    <span className="rounded-lg bg-[#111827] px-4 py-2 font-black">
      ${dividendPerShare.toFixed(2)} Dividend Per Share
    </span>

    <span className="font-black text-cyan-400">=</span>

    <span className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 font-black text-cyan-300">
      ${dividendPayment.toFixed(2)}
    </span>
  </div>
</div>
              </div>
            </div>
          </section>

          {/* ====================================================== */}
          {/* PAYMENT FREQUENCY */}
          {/* ====================================================== */}

          <section className="mt-6 rounded-2xl border border-cyan-400/20 bg-[#020617] p-6">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                How Often Are Dividends Paid?
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Payment Schedules Can Be Different
              </h2>

              <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
                Companies choose their own dividend schedules. Common schedules
                include monthly, quarterly, semiannual, and annual payments.
                Companies may also declare special one-time dividends.
              </p>
            </div>

            {/* FREQUENCY BUTTONS */}
            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {(Object.keys(frequencyConfig) as Frequency[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFrequency(key)}
                  className={`rounded-xl border px-4 py-2 text-sm font-black transition ${
                    frequency === key
                      ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                      : "border-white/10 bg-[#111827] text-zinc-400 hover:text-white"
                  }`}
                >
                  {frequencyConfig[key].label}
                </button>
              ))}
            </div>

            {/* CALENDAR */}
            <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
              {months.map((month, index) => {
                const active =
                  selectedFrequency.paymentMonths.includes(index);

                return (
                  <div
                    key={month}
                    className={`rounded-xl border p-3 text-center transition-all duration-300 ${
                      active
                        ? "scale-105 border-cyan-400/40 bg-cyan-400/10"
                        : "border-white/10 bg-[#111827]"
                    }`}
                  >
                    <p
                      className={`text-xs font-black ${
                        active ? "text-cyan-300" : "text-zinc-500"
                      }`}
                    >
                      {month}
                    </p>

                    <div className="mt-3 flex h-8 items-center justify-center">
                      {active ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/10 font-black text-cyan-300">
                          $
                        </div>
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-white/10" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 text-center">
              <p className="text-3xl font-black text-cyan-300">
                {selectedFrequency.payments}
              </p>

              <p className="mt-1 text-sm font-bold text-white">
                {selectedFrequency.payments === 1
                  ? "Payment Per Year"
                  : "Payments Per Year"}
              </p>

              <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-500">
                {selectedFrequency.description}
              </p>
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-[#111827] px-5 py-4 text-center">
              <p className="text-sm text-zinc-400">
                The highlighted months are examples used to demonstrate
                frequency. Actual payment months and dates depend on the
                company.
              </p>
            </div>
          </section>

          {/* ====================================================== */}
          {/* IMPORTANT DATES */}
          {/* ====================================================== */}

<section className="mt-6 rounded-2xl border border-white/10 bg-[#0f172a] p-6">
  <div className="text-center">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Important Dividend Dates
    </p>

    <h2 className="mt-2 text-2xl font-black">
      The Dividend Timeline
    </h2>

    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
      Here is an example of how a dividend can move from announcement to
      payment.
    </p>
  </div>

  <div className="mt-6 grid gap-3 md:grid-cols-7 md:items-center">
    {/* DECLARATION */}
    <div className="rounded-2xl bg-[#111827] p-5 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 font-black text-cyan-300">
        1
      </div>

      <p className="mt-3 font-black">Declaration</p>

      <p className="mt-1 text-sm font-black text-cyan-300">
        March 1
      </p>

      <p className="mt-2 text-xs leading-5 text-zinc-500">
        Company announces a $0.50 dividend and the important dates.
      </p>
    </div>

    <div className="text-center text-xl font-black text-cyan-400">
      →
    </div>

    {/* EX-DIVIDEND */}
    <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 font-black text-cyan-300">
        2
      </div>

      <p className="mt-3 font-black text-cyan-300">
        Ex-Dividend
      </p>

      <p className="mt-1 text-sm font-black text-cyan-300">
        March 14
      </p>

      <p className="mt-2 text-xs leading-5 text-zinc-500">
        Buy on or after this date and you generally will not receive this
        dividend.
      </p>
    </div>

    <div className="text-center text-xl font-black text-cyan-400">
      →
    </div>

    {/* RECORD */}
    <div className="rounded-2xl bg-[#111827] p-5 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 font-black text-cyan-300">
        3
      </div>

      <p className="mt-3 font-black">Record</p>

      <p className="mt-1 text-sm font-black text-cyan-300">
        March 14
      </p>

      <p className="mt-2 text-xs leading-5 text-zinc-500">
        Company identifies the shareholders eligible for the dividend.
      </p>
    </div>

    <div className="text-center text-xl font-black text-cyan-400">
      →
    </div>

    {/* PAYMENT */}
    <div className="rounded-2xl bg-[#111827] p-5 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 font-black text-cyan-300">
        4
      </div>

      <p className="mt-3 font-black">Payment</p>

      <p className="mt-1 text-sm font-black text-cyan-300">
        April 1
      </p>

      <p className="mt-2 text-xs leading-5 text-zinc-500">
        Eligible shareholders receive the $0.50-per-share dividend.
      </p>
    </div>
  </div>

  {/* SIMPLE EXAMPLE */}
  <div className="mt-5 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-4 text-center">
    <p className="text-sm font-black text-cyan-300">
      Example: You own 100 eligible shares
    </p>

    <p className="mt-2 text-sm text-zinc-400">
      100 shares × $0.50 dividend ={" "}
      <span className="font-black text-white">$50 payment</span>
    </p>
  </div>

  <p className="mt-3 text-center text-xs text-zinc-500">
    Example dates for learning purposes. Actual dividend dates vary by company.
  </p>
</section>

          {/* ====================================================== */}
          {/* DIVIDEND YIELD */}
          {/* ====================================================== */}

<section className="mt-6 rounded-2xl border border-cyan-400/20 bg-[#020617] p-6">
  <div className="text-center">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Dividend Yield
    </p>

    <h2 className="mt-2 text-2xl font-black">
      How Much Income Relative to the Stock Price?
    </h2>

    <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
      Dividend yield shows the annual dividend as a percentage of the stock
      price. It helps compare dividend income relative to the price paid for
      one share.
    </p>
  </div>

  <div className="mt-6 grid gap-3 md:grid-cols-3">
    <div className="rounded-xl bg-[#111827] p-4 text-center">
      <p className="text-sm text-zinc-500">Stock Price</p>
      <p className="mt-1 text-2xl font-black">$50</p>
      <p className="mt-1 text-xs text-zinc-500">Cost of one share</p>
    </div>

    <div className="rounded-xl bg-[#111827] p-4 text-center">
      <p className="text-sm text-zinc-500">Annual Dividend</p>
      <p className="mt-1 text-2xl font-black">$2.00</p>
      <p className="mt-1 text-xs text-zinc-500">Paid per share each year</p>
    </div>

    <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 p-4 text-center">
      <p className="text-sm text-zinc-500">Dividend Yield</p>
      <p className="mt-1 text-2xl font-black text-cyan-300">4%</p>
      <p className="mt-1 text-xs text-zinc-500">Annual yield at $50</p>
    </div>
  </div>

  <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
    <span className="rounded-lg bg-[#111827] px-3 py-2 font-black">
      $2 Dividend
    </span>

    <span className="font-black text-cyan-400">÷</span>

    <span className="rounded-lg bg-[#111827] px-3 py-2 font-black">
      $50 Stock Price
    </span>

    <span className="font-black text-cyan-400">× 100 =</span>

    <span className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 font-black text-cyan-300">
      4% Yield
    </span>
  </div>

  {/* WHAT 4% MEANS */}
  <div className="mt-5 rounded-xl border border-white/10 bg-[#111827] p-4 text-center">
    <p className="font-black text-white">
      What does 4% mean?
    </p>

    <p className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
      At a $50 stock price, a $2 annual dividend equals 4% of the share price.
      For example, 100 shares would cost $5,000 and would produce $200 in
      annual dividends if the dividend remains unchanged.
    </p>

    <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm">
      <span className="font-black">100 Shares × $50 = $5,000</span>
      <span className="text-cyan-400">→</span>
      <span className="font-black text-cyan-300">
        $200 Annual Dividend
      </span>
    </div>
  </div>

  <div className="mt-4 rounded-xl border border-yellow-400/10 bg-yellow-400/5 px-5 py-3 text-center">
    <p className="text-sm text-zinc-400">
      <span className="font-black text-white">Important:</span> A higher yield
      is not automatically better. If the stock price falls while the dividend
      stays the same, the yield rises even though the company may be facing
      greater risk.
    </p>
  </div>
</section>

          {/* ====================================================== */}
          {/* DIVIDEND STABILITY */}
          {/* ====================================================== */}

<section className="mt-6 rounded-2xl border border-white/10 bg-[#0f172a] p-6">
  <div className="text-center">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Dividend Stability
    </p>

    <h2 className="mt-2 text-2xl font-black">
      Can the Company Support the Payment?
    </h2>

    <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
      The payout ratio shows how much of a company's earnings are being paid
      to shareholders as dividends.
    </p>
  </div>

  {/* EARNINGS SPLIT */}
  <div className="mt-6 grid gap-3 md:grid-cols-3">
    <div className="rounded-xl bg-[#111827] p-4 text-center">
      <p className="text-sm text-zinc-500">Earnings Per Share</p>
      <p className="mt-1 text-2xl font-black">$5.00</p>
      <p className="mt-1 text-xs text-zinc-500">Company earns</p>
    </div>

    <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 p-4 text-center">
      <p className="text-sm text-zinc-500">Dividend Per Share</p>
      <p className="mt-1 text-2xl font-black text-cyan-300">$2.00</p>
      <p className="mt-1 text-xs text-zinc-500">Paid to shareholders</p>
    </div>

    <div className="rounded-xl bg-[#111827] p-4 text-center">
      <p className="text-sm text-zinc-500">Earnings Kept</p>
      <p className="mt-1 text-2xl font-black">$3.00</p>
      <p className="mt-1 text-xs text-zinc-500">Remains with company</p>
    </div>
  </div>

  {/* VISUAL PAYOUT */}
  <div className="mx-auto mt-5 max-w-4xl">
    <div className="flex h-12 overflow-hidden rounded-xl">
      <div
        className="flex items-center justify-center bg-cyan-400/20 text-sm font-black text-cyan-300"
        style={{ width: "40%" }}
      >
        40% Paid
      </div>

      <div
        className="flex items-center justify-center bg-white/5 text-sm font-black text-zinc-300"
        style={{ width: "60%" }}
      >
        60% Kept
      </div>
    </div>

    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
      <span className="rounded-lg bg-[#111827] px-3 py-2 font-black">
        $2 Dividend
      </span>

      <span className="font-black text-cyan-400">÷</span>

      <span className="rounded-lg bg-[#111827] px-3 py-2 font-black">
        $5 Earnings
      </span>

      <span className="font-black text-cyan-400">× 100 =</span>

      <span className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 font-black text-cyan-300">
        40% Payout Ratio
      </span>
    </div>

    <p className="mt-3 text-center text-sm text-zinc-400">
      The company pays 40% of its earnings as dividends and keeps the
      remaining 60%.
    </p>
  </div>

  {/* WHY IT MATTERS */}
  <div className="mt-5 grid gap-3 md:grid-cols-2">
    <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">
      <p className="font-black text-cyan-300">More Room</p>
      <p className="mt-1 text-sm leading-6 text-zinc-400">
        When earnings are well above the dividend, the company has more room
        to reinvest or handle weaker periods.
      </p>
    </div>

    <div className="rounded-xl bg-[#111827] p-4">
      <p className="font-black">Less Room for Error</p>
      <p className="mt-1 text-sm leading-6 text-zinc-400">
        When most earnings are already being paid out, falling earnings can
        make the dividend harder to maintain.
      </p>
    </div>
  </div>

  <p className="mt-5 text-center text-xs text-zinc-500">
    Also consider cash flow, debt, earnings trends, and dividend history.
    Payout ratio alone does not determine whether a dividend is sustainable.
  </p>
</section>
          {/* ====================================================== */}
          {/* STOCK COMPARISON */}
          {/* ====================================================== */}

<section className="mt-6 rounded-2xl border border-cyan-400/20 bg-[#020617] p-6">
  <div className="text-center">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
      Comparing Dividend Stocks
    </p>

    <h2 className="mt-2 text-2xl font-black">
      Don't Compare Yield Alone
    </h2>

    <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
      A higher yield can look attractive, but the dividend is stronger when the
      company also has earnings, cash flow, and room to support the payment.
    </p>
  </div>

  <div className="mt-6 grid gap-4 md:grid-cols-2">
    {/* STOCK A */}
    <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-500">Example</p>
          <h3 className="mt-1 text-xl font-black">Stock A</h3>
        </div>

        <div className="rounded-xl bg-cyan-400/10 px-4 py-2 text-center">
          <p className="text-xs text-zinc-500">Yield</p>
          <p className="text-xl font-black text-cyan-300">4%</p>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {[
          ["Payout Ratio", "40%", "Keeps more earnings"],
          ["Earnings", "Growing", "Profits are improving"],
          ["Free Cash Flow", "Positive", "Cash supports the business"],
          ["Dividend History", "Consistent", "Payment has been steady"],
        ].map(([label, value, meaning]) => (
          <div
            key={label}
            className="rounded-xl bg-[#111827] px-4 py-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">{label}</span>
              <span className="font-black text-cyan-300">{value}</span>
            </div>

            <p className="mt-1 text-xs text-zinc-500">
              {meaning}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3">
        <p className="text-sm font-black text-cyan-300">
          More supporting strength
        </p>

        <p className="mt-1 text-xs leading-5 text-zinc-400">
          The yield is lower, but this example shows more room to support the
          dividend.
        </p>
      </div>
    </div>

    {/* STOCK B */}
    <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-500">Example</p>
          <h3 className="mt-1 text-xl font-black">Stock B</h3>
        </div>

        <div className="rounded-xl bg-white/5 px-4 py-2 text-center">
          <p className="text-xs text-zinc-500">Yield</p>
          <p className="text-xl font-black">9%</p>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {[
          ["Payout Ratio", "95%", "Most earnings are already paid out"],
          ["Earnings", "Declining", "Profits are weakening"],
          ["Free Cash Flow", "Weak", "Less cash flexibility"],
          ["Dividend History", "Recent Cut", "Payment was reduced"],
        ].map(([label, value, meaning]) => (
          <div
            key={label}
            className="rounded-xl bg-[#020617] px-4 py-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">{label}</span>
              <span className="font-black text-white">{value}</span>
            </div>

            <p className="mt-1 text-xs text-zinc-500">
              {meaning}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-[#020617] px-4 py-3">
        <p className="text-sm font-black text-white">
          Less room for error
        </p>

        <p className="mt-1 text-xs leading-5 text-zinc-400">
          The yield is higher, but weaker fundamentals could make the payment
          harder to maintain.
        </p>
      </div>
    </div>
  </div>

  <div className="mt-5 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-4 text-center">
    <p className="text-sm font-black text-cyan-300">
      Higher yield does not automatically mean better dividend quality.
    </p>

    <p className="mt-2 text-xs leading-5 text-zinc-400">
      Compare yield together with payout ratio, earnings, cash flow, debt, and
      dividend history.
    </p>
  </div>
</section>

          {/* FINAL LESSON */}
          <section className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-6 py-5 text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Key Lesson
            </p>

            <p className="mx-auto mt-2 max-w-3xl text-sm font-bold leading-6 text-zinc-300">
              Dividends can provide income, but the size of the yield is only
              one part of the picture. Understanding the company behind the
              dividend matters too.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}