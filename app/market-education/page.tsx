"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";

const topics = [
  {
    title: "Dividends",
    description:
      "Income, yield, payment frequency, important dates, and dividend stability.",
    href: "/market-education/dividends",
    available: true,
  },
  {
    title: "Earnings",
    description:
      "Revenue, EPS, expectations, guidance, and earnings reports.",
    href: "#",
    available: false,
  },
  {
    title: "IPOs",
    description:
      "IPO pricing, going public, listing day, lockups, and risks.",
    href: "#",
    available: false,
  },
  {
    title: "Fundamentals",
    description:
      "Revenue, profit, cash flow, debt, EPS, P/E, and company health.",
    href: "#",
    available: false,
  },
  {
    title: "ETFs & Indexes",
    description:
      "Diversification, expense ratios, sectors, ETFs, and major indexes.",
    href: "#",
    available: false,
  },
  {
    title: "Economic Events",
    description:
      "Inflation, interest rates, Fed decisions, jobs reports, and GDP.",
    href: "#",
    available: false,
  },
];

export default function MarketEducationPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="text-center">
            <h1 className="text-4xl font-black text-white">
              Market Education
            </h1>

            <p className="mx-auto mt-2 max-w-2xl text-sm text-zinc-400">
              Learn how companies, investments, and financial markets work.
            </p>
          </div>

          <div className="mt-7 grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
            {topics.map((topic) => (
              <div
                key={topic.title}
                className="flex min-h-[200px] flex-col rounded-2xl border border-white/10 bg-[#0f172a] p-6 transition hover:border-cyan-400/50"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-black text-white">
                    {topic.title}
                  </h2>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black ${
                      topic.available
                        ? "bg-cyan-400/10 text-cyan-300"
                        : "bg-white/5 text-zinc-500"
                    }`}
                  >
                    {topic.available ? "AVAILABLE" : "COMING SOON"}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {topic.description}
                </p>

                <div className="mt-auto pt-5">
                  {topic.available ? (
                    <Link
                      href={topic.href}
                      className="text-sm font-black text-cyan-400 transition hover:text-cyan-300"
                    >
                      Start Learning →
                    </Link>
                  ) : (
                    <span className="text-xs font-bold text-zinc-600">
                      Coming soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-4 text-center">
            <p className="text-sm font-black text-cyan-300">
              Learn the concept. Understand the data. Make your own decisions.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}