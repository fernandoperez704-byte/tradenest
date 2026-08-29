"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";

const topics = [
{
  title: "Dividends",
  description:
    "Learn how dividends work, payment schedules, important dates, dividend yield, payout ratios, and stability.",
  href: "/market-education/dividends",
  available: true,
  backgroundImage: "/market-education/dividends-bg.png",
},
{
  title: "Earnings",
  description:
    "Learn how revenue, profit, EPS, analyst expectations, guidance, and earnings reports affect how investors evaluate companies.",
  href: "/market-education/earnings",
  available: true,
  backgroundImage: "/market-education/earnings-bg.png",
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
  className="relative flex min-h-[200px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a] bg-cover bg-center p-6 transition hover:border-cyan-400/50"
  style={
    topic.backgroundImage
      ? {
          backgroundImage: `linear-gradient(
            90deg,
            rgba(15, 23, 42, 0.98) 0%,
            rgba(15, 23, 42, 0.88) 42%,
            rgba(15, 23, 42, 0.35) 70%,
            rgba(15, 23, 42, 0.10) 100%
          ), url("${topic.backgroundImage}")`,
        }
      : undefined
  }
>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-black text-white">
                    {topic.title}
                  </h2>
{!topic.available && (
  <span className="shrink-0 rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-black text-zinc-500">
    COMING SOON
  </span>
)}

                </div>

<p
  className={`mt-3 text-sm leading-6 ${
    topic.available
      ? "font-medium text-zinc-200"
      : "text-zinc-400"
  }`}
>
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