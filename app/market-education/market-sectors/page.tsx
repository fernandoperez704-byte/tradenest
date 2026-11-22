
import Link from "next/link";
import Navbar from "../../components/Navbar";

const sectors = [
  {
    name: "Technology",
    description:
      "Software, semiconductors, computer hardware, and information technology services.",
  },
  {
    name: "Healthcare",
    description:
      "Pharmaceuticals, biotechnology, medical devices, and healthcare services.",
  },
  {
    name: "Financials",
    description:
      "Banks, insurance companies, brokerage firms, and financial services.",
  },
  {
    name: "Consumer Discretionary",
    description:
      "Non-essential products and services, including automobiles, restaurants, and retail.",
  },
  {
    name: "Consumer Staples",
    description:
      "Essential products such as food, beverages, household goods, and personal care items.",
  },
  {
    name: "Energy",
    description:
      "Oil, natural gas, drilling, and energy-related equipment and services.",
  },
  {
    name: "Industrials",
    description:
      "Manufacturing, transportation, aerospace, machinery, and industrial services.",
  },
  {
    name: "Materials",
    description:
      "Chemicals, metals, mining, packaging, and construction materials.",
  },
  {
    name: "Utilities",
    description:
      "Electricity, natural gas, water utilities, and related services.",
  },
  {
    name: "Real Estate",
    description:
      "Property-related businesses and real estate investment trusts.",
  },
  {
    name: "Communication Services",
    description:
      "Telecommunications, media, entertainment, and digital communication businesses.",
  },
];

const rotationSteps = [
  {
    title: "Expectations Change",
    description:
      "Investors reassess economic growth, inflation, interest rates, or market risks.",
  },
  {
    title: "Capital Shifts",
    description:
      "Investors increase or reduce their exposure to different sectors.",
  },
  {
    title: "Leadership Changes",
    description:
      "Some sectors begin outperforming while others fall behind.",
  },
  {
    title: "Investors Reevaluate",
    description:
      "Investors monitor whether the new sector leadership is supported by earnings and economic data.",
  },
];

export default function MarketSectorsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-black">
                Market Sectors
              </h1>

              <p className="mt-2 text-sm leading-7 text-zinc-400">
                Understand how the stock market is
                divided into sectors, how industries
                respond to economic conditions,
                and why market leadership changes.
              </p>
            </div>

            <Link
              href="/market-education"
              className="w-fit shrink-0 rounded-xl border border-white/10 bg-[#111827] px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              ← Market Education
            </Link>
          </div>

          {/* HERO IMAGE */}
          <div className="relative mt-8 h-[220px] overflow-hidden rounded-2xl sm:h-[320px] md:h-[420px]">
            <img
              src="/market-education/market-sectors.png"
              alt="Stock market sectors and industries"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          {/* INTRODUCTION */}
          <section className="mt-8 px-1 pb-8 md:px-2">
            <h2 className="text-2xl font-black">
              Understanding Market Sectors
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Market sectors group publicly traded
              companies according to their primary
              business activities. These classifications
              help investors understand how different
              parts of the economy are represented
              in the stock market.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              A sector is a broad category,
              while an industry is a more
              specific group within that sector.
              For example, the Technology sector
              includes the semiconductor industry
              and the software industry.
            </p>
          </section>

          {/* ELEVEN SECTORS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Stock Market Classification
            </span>

            <h2 className="mt-2 text-2xl font-black">
              The 11 Major Market Sectors
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              The Global Industry Classification
              Standard, or GICS, organizes
              companies into 11 broad sectors.
              Each represents a different
              area of economic activity.
            </p>

            <div className="mt-7 grid gap-x-10 gap-y-6 md:grid-cols-2">
              {sectors.map((sector, index) => (
                <div key={sector.name} className="flex gap-3">
                  <span className="pt-1 text-xs font-bold text-cyan-400/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {sector.name}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-zinc-400">
                      {sector.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CYCLICAL AND DEFENSIVE */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Economic Sensitivity
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Cyclical vs. Defensive Sectors
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Some sectors are more sensitive
              to changes in economic activity
              than others.
            </p>

            <div className="mt-6 grid gap-7 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-bold">
                  Cyclical Sectors
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  These sectors tend to benefit
                  when the economy expands
                  and consumer or business
                  spending increases.
                  Examples include Consumer
                  Discretionary, Industrials,
                  Financials, and Materials.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Defensive Sectors
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  These sectors provide goods
                  and services that people
                  continue to need even
                  during economic slowdowns.
                  Examples include Consumer
                  Staples, Utilities,
                  and Healthcare.
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-400">
              These classifications describe
              general tendencies rather than
              guaranteed performance.
              Individual companies within
              the same sector may behave
              differently.
            </p>
          </section>

          {/* SECTOR PERFORMANCE */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Sector Performance
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Why Sectors Perform Differently
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Stock market sectors do not always
              move in the same direction.
              Their performance can differ
              because each industry responds
              to changing business conditions,
              investor expectations, and
              economic developments.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              For example, rising oil prices
              may support profits for some
              Energy companies, while
              increasing fuel costs may
              pressure Transportation companies.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Investors often compare sector
              returns with a broad-market
              benchmark to identify relative
              strength or weakness.
              Outperformance means a sector
              has delivered a higher return
              than the benchmark over
              the period being measured.
            </p>
          </section>

          {/* SECTOR ROTATION */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Sector Rotation
            </span>

            <h2 className="mt-2 text-2xl font-black">
              How Market Leadership Changes
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Sector rotation describes changes
              in investor allocation and relative
              performance among different
              sectors as market expectations
              evolve.
            </p>

            {/* ROTATION PROCESS */}
            <div className="mt-8 grid gap-6 md:grid-cols-4 md:gap-4">
              {rotationSteps.map((step, index) => (
                <div key={step.title}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 text-sm font-black text-cyan-300">
                      {index + 1}
                    </span>

                    {index < rotationSteps.length - 1 && (
                      <div className="hidden h-px flex-1 bg-cyan-400/40 md:block" />
                    )}
                  </div>

                  <h3 className="mt-4 text-base font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-zinc-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm leading-7 text-zinc-400">
              This is a simplified illustration.
              Sector rotation does not always
              follow a predictable sequence,
              and several sectors can lead
              or decline at the same time.
            </p>
          </section>

          {/* ECONOMIC INFLUENCES */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Economic Influences
            </span>

            <h2 className="mt-2 text-2xl font-black">
              What Can Affect Sector Performance?
            </h2>

            <div className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-bold">
                  Interest Rates
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Changes in borrowing costs
                  and discount rates can affect
                  valuations, banks,
                  Utilities, and Real Estate.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Commodity Prices
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Changes in oil, natural gas,
                  metals, and raw material
                  prices can influence Energy
                  and Materials companies.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Consumer Spending
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Household spending patterns
                  can influence retailers,
                  restaurants, travel companies,
                  and other consumer businesses.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Economic Growth
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Changes in business activity
                  can affect demand for
                  manufacturing, construction,
                  and financial services.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Technology Trends
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Innovation can create new
                  opportunities while disrupting
                  established companies
                  and industries.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Government Policy
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Regulation, taxation,
                  and government spending
                  can affect business
                  conditions across sectors.
                </p>
              </div>
            </div>
          </section>

          {/* COMPARING SECTORS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Comparing Sectors
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Looking Beyond Price Performance
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Strong recent performance does
              not necessarily mean a sector
              will continue outperforming.
              Investors can examine additional
              information to understand what
              may be driving its valuation.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  Earnings Growth
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Examine whether companies
                  in the sector are reporting
                  improving profits.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Valuation
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Compare stock prices
                  with company earnings,
                  assets, or other relevant
                  financial measures.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Sector Weight
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Consider how much of a
                  broad-market index is
                  represented by the sector.
                  Larger weights can have
                  a greater influence on
                  index performance.
                </p>
              </div>
            </div>
          </section>

          {/* CONCLUSION */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Important to Understand
            </span>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Sector trends can provide
              useful context about market
              conditions, but they do not
              guarantee the future performance
              of individual stocks or industries.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
