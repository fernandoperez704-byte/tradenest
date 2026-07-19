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

function formatPublishedDate(
  publishedAt?: string
) {
  if (!publishedAt) {
    return "Publication time unavailable";
  }

  const date = new Date(publishedAt);

  if (Number.isNaN(date.getTime())) {
    return "Publication time unavailable";
  }

  return date.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}

export default async function NewsPage() {
  let brief: DailyMarketBrief | null =
    null;

  let error = false;

  try {
    brief =
      await getDailyMarketBrief();
  } catch (loadError) {
    console.error(
      "Failed to load daily market brief:",
      loadError
    );

    error = true;
  }

  const headlines =
    Array.isArray(brief?.headlines)
      ? brief.headlines
      : [];

  const concepts =
    Array.isArray(brief?.concepts)
      ? brief.concepts
      : [];

  const categories =
    Array.isArray(brief?.categories)
      ? brief.categories
      : [];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 xl:px-10">
          {error && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
              <p className="text-sm font-semibold text-red-300">
                The daily market brief
                could not be loaded.
              </p>
            </div>
          )}

          {!error && !brief && (
            <div className="rounded-2xl border border-zinc-800 bg-[#0b101b] p-8 text-center">
              <p className="text-lg font-black text-white">
                Today&apos;s brief is not
                available yet.
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                Check back after the daily
                market update is published.
              </p>
            </div>
          )}

          {!error && brief && (
            <>
<header className="border-b border-zinc-800 pb-7">
  <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

    <div className="relative">
      <div className="pointer-events-none absolute -left-10 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-400">
          TradeNestX News
        </p>

        <h1 className="mt-3 bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl lg:text-5xl">
          Daily Market Brief
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400 sm:text-base">
          Today&apos;s important market headlines with one educational
          breakdown from Gaby.
        </p>

        <div className="mt-6 h-px w-40 bg-gradient-to-r from-cyan-400 via-cyan-400/40 to-transparent" />
      </div>
    </div>

    <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 px-6 py-4 shadow-[0_0_30px_rgba(34,211,238,0.06)] lg:text-right">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">
        Published
      </p>

      <p className="mt-2 text-sm font-bold text-white">
        {brief.displayDate}
      </p>
    </div>

  </div>

                {categories.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {categories.map(
                      (category) => (
                        <span
                          key={category}
                          className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-2 text-xs font-bold text-cyan-300 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/15"
                        >
                          {category}
                        </span>
                      )
                    )}
                  </div>
                )}
              </header>

              <section className="py-9">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                      Latest News
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                      Today&apos;s Headlines
                    </h2>
                  </div>

                  <p className="hidden text-sm text-zinc-500 sm:block">
                    {headlines.length} articles
                  </p>
                </div>

{headlines.length > 0 ? (
  <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 md:grid-cols-2 xl:grid-cols-3">
    {headlines.map(
      (
        headline,
        index
      ) => (
        <article
          key={`${headline.title}-${index}`}
          className="group relative min-h-[340px] overflow-hidden bg-[#090d15] p-6 transition-all duration-300 ease-out hover:z-10 hover:-translate-y-1 hover:bg-[#0d1420] hover:shadow-[0_18px_50px_rgba(0,0,0,0.55)] sm:p-7"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />

          <div className="flex items-start justify-between gap-5">
            <span className="text-xs font-black text-cyan-400">
              {String(
                index + 1
              ).padStart(
                2,
                "0"
              )}
            </span>

            <div className="h-2 w-2 rounded-full bg-zinc-700 transition-all duration-300 group-hover:scale-150 group-hover:bg-cyan-400 group-hover:shadow-[0_0_14px_rgba(34,211,238,0.85)]" />
          </div>

          <h3 className="mt-8 text-lg font-black leading-7 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-300 sm:text-xl">
            {headline.title}
          </h3>

          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
            <span className="font-bold uppercase tracking-[0.14em] text-zinc-400">
              {headline.source ||
                "CoinDesk"}
            </span>

            <span className="h-1 w-1 rounded-full bg-zinc-700" />

            <time className="text-zinc-500">
              {formatPublishedDate(
                headline.publishedAt
              )}
            </time>
          </div>

          <div className="mt-7 border-t border-zinc-800 pt-5">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-400">
              💡 Gaby&apos;s Insight
            </p>

            <p className="mt-4 text-lg leading-9 text-zinc-300">
              {headline.gabyInsight ||
                "Gaby's insight is not available for this headline yet."}
            </p>
          </div>

        </article>
      )
    )}

    {brief.lookBack && (
      <article className="group relative min-h-[340px] overflow-hidden bg-gradient-to-br from-[#0b111c] via-[#09111a] to-[#07161a] p-6 transition-all duration-300 ease-out hover:z-10 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.55)] sm:p-7">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />

        <div className="relative">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                {brief.lookBack.label ===
                "ON_THIS_DAY"
                  ? "On This Day"
                  : "Look Back"}
              </p>

              <p className="mt-2 text-sm font-bold text-zinc-400">
                {brief.lookBack.dateLabel}
                {" · "}
                {brief.lookBack.year}
              </p>
            </div>

            <span
              aria-hidden="true"
              className="text-2xl"
            >
              📜
            </span>
          </div>

          <h3 className="mt-7 text-xl font-black leading-8 text-white transition-colors duration-300 group-hover:text-cyan-300">
            {brief.lookBack.title}
          </h3>

          <div className="mt-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-400">
              What Happened
            </p>

            <p className="mt-3 text-base leading-7 text-zinc-300">
              {brief.lookBack.whatHappened}
            </p>
          </div>

          <div className="mt-6 border-t border-zinc-800 pt-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-400">
              Why It Matters
            </p>

            <p className="mt-3 text-base leading-7 text-zinc-300">
              {brief.lookBack.whyItMatters}
            </p>
          </div>
        </div>
      </article>
    )}
  </div>
) : (

  <div className="mt-6 rounded-2xl border border-zinc-800 bg-[#090d15] p-8">
    <p className="text-sm text-zinc-500">
      No headlines are available for this brief.
    </p>
  </div>
)}

              </section>

              <section className="border-t border-zinc-800 py-10">
                <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[340px_minmax(0,1fr)]">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-xl">
                      💡
                    </div>

                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                      Educational Analysis
                    </p>

                    <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl">
                      Gaby&apos;s Market
                      Breakdown
                    </h2>

<p className="mt-4 text-base leading-8 text-zinc-300">
  One combined explanation connecting the main themes across today's headlines.
</p>
                  </div>

                  <article className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#0b111c] p-6 transition-all duration-500 hover:border-cyan-500/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:p-8 lg:p-10">
                    <div className="absolute inset-y-0 left-0 w-1 bg-cyan-400 transition-all duration-500 group-hover:w-1.5 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]" />

                    <p className="text-base leading-8 text-zinc-200 sm:text-lg sm:leading-9">
                      {brief.breakdown}
                    </p>

                    <div className="mt-8 border-t border-zinc-800 pt-5">
<p className="text-sm leading-7 text-zinc-300">
  This breakdown explains current news for educational purposes. It does not predict market direction or provide trading signals.
</p>
                    </div>
                  </article>
                </div>
              </section>

              <section className="border-t border-zinc-800 py-10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                    Learn From The News
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                    Key Concepts
                  </h2>

                  <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
                    Important market ideas
                    mentioned across today&apos;s
                    stories, explained in
                    beginner-friendly language.
                  </p>
                </div>

                {concepts.length > 0 ? (
                  <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {concepts.map(
                      (
                        concept,
                        index
                      ) => (
                        <article
                          key={`${concept.title}-${index}`}
                          className="group rounded-2xl border border-zinc-800 bg-[#090d15] p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-[#0d121c] hover:shadow-[0_16px_45px_rgba(0,0,0,0.45)]"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-xs font-black text-zinc-600">
                              {String(
                                index + 1
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            <div className="h-2 w-2 rounded-full bg-cyan-400 transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
                          </div>

                          <h3 className="mt-7 text-lg font-black text-cyan-400 transition-transform duration-300 group-hover:translate-x-1">
                            {concept.title}
                          </h3>

                          <p className="mt-5 text-lg leading-9 text-zinc-300">
                            {
                              concept.explanation
                            }
                          </p>
                        </article>
                      )
                    )}
                  </div>
                ) : (
                  <div className="mt-7 rounded-2xl border border-zinc-800 bg-[#090d15] p-8">
                    <p className="text-sm text-zinc-500">
                      No key concepts are
                      available for this brief.
                    </p>
                  </div>
                )}
              </section>

<footer className="border-t border-zinc-800 py-8">
  <p className="text-base font-medium text-zinc-200 whitespace-nowrap">
                  Market updates are provided
                  for educational purposes only
                  and do not represent financial
                  advice, investment
                  recommendations, predictions,
                  or trading signals.
                </p>
              </footer>
            </>
          )}
        </div>
      </main>
    </>
  );
}