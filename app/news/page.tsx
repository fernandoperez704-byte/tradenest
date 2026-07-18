import Navbar from "../components/Navbar";

import {
  DailyMarketBrief,
  getDailyMarketBrief,
} from "@/lib/news/getDailyMarketBrief";

export const metadata = {
  title: "Daily Market Brief | TradeNestX",
  description:
    "Daily crypto market headlines explained for educational purposes.",
};


export default async function NewsPage() {
  let brief: DailyMarketBrief | null = null;
  let error = false;

  try {
    brief = await getDailyMarketBrief();
  } catch (loadError) {
    console.error(
      "Failed to load daily market brief:",
      loadError
    );

    error = true;
  }


  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-3 py-8 text-white sm:px-6 sm:py-12">
        <div className="mx-auto max-w-5xl">
          {error && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
              <p className="text-sm font-semibold text-red-300">
                The daily market brief could not be loaded.
              </p>
            </div>
          )}

          {!error && !brief && (
            <div className="rounded-2xl border border-zinc-800 bg-[#0f172a] p-8 text-center">
              <p className="text-lg font-black text-white">
                Today&apos;s brief is not available yet.
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                Check back after the daily market update is
                published.
              </p>
            </div>
          )}

          {!error && brief && (
            <>
              <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#0f172a] shadow-2xl">
                <header className="border-b border-zinc-800 px-5 py-5 sm:px-8">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
                    Daily Market Brief
                  </p>

                  <p className="mt-2 text-sm text-zinc-500">
                    {brief.displayDate}
                  </p>
                </header>

                <div className="space-y-8 px-5 py-6 sm:px-8 sm:py-8">
                  <section>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-lg">
                        📰
                      </div>

                      <h1 className="text-xl font-black text-white sm:text-2xl">
                        Today&apos;s Headlines
                      </h1>
                    </div>

                    {brief.headlines.length > 0 ? (
                      <div className="mt-5 space-y-3">
                        {brief.headlines.map((headline, index) => (
                          <article
                            key={`${headline.title}-${index}`}
                            className="rounded-xl border border-zinc-800 bg-black/30 p-5"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10 text-sm font-black text-cyan-400">
                                {index + 1}
                              </div>

                              <div className="min-w-0">
                                <h2 className="text-base font-black leading-7 text-white sm:text-lg">
                                  {headline.title}
                                </h2>

                                {headline.source && (
                                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    {headline.source}
                                  </p>
                                )}
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-5 text-sm text-zinc-500">
                        No headlines are available for this brief.
                      </p>
                    )}
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
                      {brief.breakdown}
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

                    {brief.concepts.length > 0 ? (
                      <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {brief.concepts.map((concept) => (
                          <article
                            key={concept.title}
                            className="rounded-xl border border-zinc-800 bg-black/30 p-5"
                          >
                            <h3 className="font-black text-cyan-400">
                              {concept.title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-zinc-400">
                              {concept.explanation}
                            </p>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-5 text-sm text-zinc-500">
                        No key concepts are available for this
                        brief.
                      </p>
                    )}
                  </section>
                </div>
              </section>

              <p className="mt-5 text-center text-xs leading-5 text-zinc-600">
                Market updates are provided for educational
                purposes and do not represent financial advice or
                trading signals.
              </p>
            </>
          )}
        </div>
      </main>
    </>
  );
}