"use client";

import Navbar from "../components/Navbar";

const dailyBrief = {
  date: "July 18, 2026",

  headlines: [
    "Bitcoin holds near recent highs as institutional demand remains active.",
    "Ethereum traders continue watching network activity and ETF flows.",
    "Global markets react to changing expectations around interest rates.",
  ],

  breakdown:
    "Today’s market remains focused on institutional demand, liquidity, and the broader economic environment. Bitcoin and Ethereum continue to receive the most attention, while interest-rate expectations may influence risk assets across both traditional and crypto markets. These headlines provide useful context, but no single event should be used alone to judge overall market direction.",

  concepts: [
    {
      name: "Institutional Demand",
      explanation:
        "Buying or selling activity from large organizations such as funds, banks, and investment firms.",
    },
    {
      name: "Liquidity",
      explanation:
        "How easily an asset can be bought or sold without causing a large price movement.",
    },
    {
      name: "Interest Rates",
      explanation:
        "The cost of borrowing money, which can influence investor demand for risk assets.",
    },
    {
      name: "Market Context",
      explanation:
        "The wider conditions surrounding price movement, including trend, volume, news, and the economy.",
    },
  ],
};

export default function NewsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-3 py-8 text-white sm:px-6 sm:py-12">
        <div className="mx-auto max-w-5xl">
          <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#0f172a] shadow-2xl">
            <div className="border-b border-zinc-800 px-5 py-5 sm:px-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
                Daily Market Brief
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                {dailyBrief.date}
              </p>
            </div>

            <div className="space-y-8 px-5 py-6 sm:px-8 sm:py-8">
              <section>
                <h2 className="text-xl font-black text-white sm:text-2xl">
                  Top Headlines
                </h2>

                <div className="mt-4 space-y-3">
                  {dailyBrief.headlines.map((headline, index) => (
                    <div
                      key={headline}
                      className="flex gap-3 rounded-xl border border-zinc-800 bg-black/30 p-4"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-xs font-black text-cyan-400">
                        {index + 1}
                      </span>

                      <p className="text-sm font-semibold leading-6 text-zinc-200 sm:text-base">
                        {headline}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="border-t border-zinc-800 pt-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-lg">
                    💡
                  </div>

                  <h2 className="text-xl font-black text-white sm:text-2xl">
                    Gaby&apos;s Market Breakdown
                  </h2>
                </div>

                <p className="mt-4 max-w-4xl text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8">
                  {dailyBrief.breakdown}
                </p>
              </section>

              <section className="border-t border-zinc-800 pt-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-lg">
                    📚
                  </div>

                  <h2 className="text-xl font-black text-white sm:text-2xl">
                    Key Concepts
                  </h2>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {dailyBrief.concepts.map((concept) => (
                    <article
                      key={concept.name}
                      className="rounded-xl border border-zinc-800 bg-black/30 p-5"
                    >
                      <h3 className="font-black text-cyan-400">
                        {concept.name}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        {concept.explanation}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </section>

          <p className="mt-5 text-center text-xs leading-5 text-zinc-600">
            Market updates are provided for educational purposes and do not
            represent financial advice or trading signals.
          </p>
        </div>
      </main>
    </>
  );
}