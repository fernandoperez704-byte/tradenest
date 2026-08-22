"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";

const sections = [
  {
    title: "What Is a Dividend?",
    text:
      "A dividend is a payment some companies make to shareholders. The amount is usually based on how many shares you own.",
  },
  {
    title: "How Dividends Work",
    text:
      "If a company pays $0.50 per share and you own 100 shares, you receive $50 for that payment. If it pays quarterly, four similar payments would equal $200 per year.",
  },
  {
    title: "How Often Are Dividends Paid?",
    text:
      "Companies may pay monthly, quarterly, semiannually, annually, or occasionally through a special dividend. Payment schedules vary by company.",
  },
  {
    title: "Important Dividend Dates",
    text:
      "The declaration date announces the dividend, the ex-dividend date determines eligibility for the upcoming payment, the record date identifies eligible shareholders, and the payment date is when the dividend is distributed.",
  },
  {
    title: "Dividend Yield",
    text:
      "Dividend yield compares annual dividend income with the current stock price. A higher yield can provide more income, but a high yield does not automatically mean the dividend is stronger or safer.",
  },
  {
    title: "Dividend Stability",
    text:
      "Consistency matters. Look at payment history, dividend increases or cuts, earnings, free cash flow, payout ratio, debt, and the company's ability to continue supporting the dividend.",
  },
  {
    title: "How To Compare Dividend Stocks",
    text:
      "Consider your income goal, payment frequency, yield, dividend history, growth, financial health, capital required, risk, and diversification instead of choosing only the highest yield.",
  },
];

export default function DividendsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black">Dividends</h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                Learn how dividend income works, how companies pay it, and how
                to evaluate dividend consistency and sustainability.
              </p>
            </div>

            <Link
              href="/market-education"
              className="rounded-xl border border-white/10 bg-[#111827] px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              ← Market Education
            </Link>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-white/10 bg-[#0f172a] p-6"
              >
                <h2 className="text-xl font-black text-white">
                  {section.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {section.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-[#020617] p-6">
            <h2 className="text-xl font-black text-cyan-300">
              Dividend Income Example
            </h2>

            <div className="mt-4 grid gap-3 text-sm md:grid-cols-4">
              <div className="rounded-xl bg-[#111827] p-4">
                <p className="text-zinc-500">Shares</p>
                <p className="mt-1 text-xl font-black">100</p>
              </div>

              <div className="rounded-xl bg-[#111827] p-4">
                <p className="text-zinc-500">Dividend / Share</p>
                <p className="mt-1 text-xl font-black">$0.50</p>
              </div>

              <div className="rounded-xl bg-[#111827] p-4">
                <p className="text-zinc-500">Per Payment</p>
                <p className="mt-1 text-xl font-black">$50</p>
              </div>

              <div className="rounded-xl bg-[#111827] p-4">
                <p className="text-zinc-500">Quarterly Annual Total</p>
                <p className="mt-1 text-xl font-black">$200</p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#111827] p-6">
            <h2 className="text-xl font-black">How Do I Know Which Fits Me?</h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Start with the income you want, then compare how much capital is
              required, how often the dividend is paid, how consistent the
              company's dividend history has been, and whether the company's
              earnings and cash flow appear capable of supporting the payment.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-4 text-center">
            <p className="text-sm font-black text-cyan-300">
              A higher dividend yield is not automatically a better dividend.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}