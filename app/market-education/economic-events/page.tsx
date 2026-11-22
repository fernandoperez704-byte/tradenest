
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function EconomicEventsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-black">
                Economic Events
              </h1>

              <p className="mt-2 text-sm leading-7 text-zinc-400">
                Understand how major economic reports, central bank
                decisions, and changing expectations influence
                financial markets.
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
              src="/market-education/economic-events.png"
              alt="Economic events calendar showing major economic indicators"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          {/* INTRODUCTION */}
          <section className="mt-8 px-1 pb-8 md:px-2">
            <h2 className="text-2xl font-black">
              Understanding Economic Events
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
              Economic events include scheduled data releases,
              government reports, and central bank announcements
              that provide insight into the condition of an economy.
              Investors follow these events to understand changes
              in inflation, employment, economic growth, and
              monetary policy.
            </p>


          </section>

          {/* INFLATION */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Inflation Indicators
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Consumer Price Index and PCE Inflation
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Inflation measures how the general level of
              prices changes over time. Two widely followed
              U.S. inflation indicators are the Consumer
              Price Index (CPI) and the Personal Consumption
              Expenditures (PCE) price index.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  Consumer Price Index (CPI)
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  CPI tracks changes in prices paid by urban
                  consumers for a basket of goods and services,
                  including housing, food, transportation,
                  and medical care.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Personal Consumption Expenditures (PCE)
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  The PCE price index measures price changes
                  across a broader range of consumer spending
                  and is the Federal Reserve&apos;s preferred
                  inflation measure for its 2% target.
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-400">
              Higher-than-expected inflation may increase
              expectations that interest rates will remain
              elevated, while softer inflation may reduce
              pressure for restrictive monetary policy.
            </p>
          </section>

          {/* INTEREST RATES */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Monetary Policy
            </span>

            <h2 className="mt-2 text-2xl font-black">
              How Interest Rates Influence the Economy
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Interest rates influence borrowing costs,
              savings returns, and how investors value
              financial assets.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  Higher Interest Rates
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Higher borrowing costs can discourage
                  spending and investment, potentially
                  slowing economic activity and reducing
                  inflationary pressure.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Lower Interest Rates
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Lower borrowing costs can encourage
                  lending, spending, and investment,
                  although their effects depend on
                  broader economic conditions.
                </p>
              </div>
            </div>
          </section>

          {/* FED DECISIONS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Federal Reserve
            </span>

            <h2 className="mt-2 text-2xl font-black">
              FOMC Meetings and Federal Reserve Decisions
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              The Federal Open Market Committee (FOMC)
              makes important U.S. monetary policy decisions,
              including setting the target range for the
              federal funds rate. Its decisions are influenced
              by inflation, employment, and economic conditions.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              At scheduled meetings, the committee may raise,
              lower, or maintain its policy rate. Investors
              also examine the accompanying statement,
              economic projections when released, and
              comments from the Federal Reserve chair
              for clues about future policy.
            </p>


          </section>

          {/* EMPLOYMENT */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Labor Market
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Employment Reports and Unemployment
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Employment reports help measure the strength
              of the labor market. In the United States,
              the monthly Employment Situation report
              provides several indicators that investors
              closely monitor.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  Nonfarm Payrolls (NFP)
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Measures the monthly change in the number
                  of paid employees across most nonfarm
                  industries. Strong job growth can indicate
                  expanding economic activity.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Unemployment Rate
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Represents the percentage of the labor
                  force that is unemployed, available
                  for work, and actively seeking employment.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Average Hourly Earnings
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Tracks changes in average hourly pay
                  for employees covered by the payroll
                  survey. Wage growth can provide
                  information about labor costs and
                  potential inflationary pressures.
                </p>
              </div>
            </div>
          </section>

          {/* GDP */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Economic Growth
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Gross Domestic Product (GDP)
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Gross domestic product measures the value
              of final goods and services produced within
              an economy over a specific period. It is
              one of the main indicators used to evaluate
              economic activity and growth.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Stronger GDP growth may reflect increased
              consumer spending, business investment,
              or other economic activity. Weak growth
              can indicate slowing demand, while a
              sustained contraction may raise concerns
              about a recession.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              GDP figures are often revised as additional
              information becomes available, so investors
              consider both initial estimates and later
              revisions.
            </p>
          </section>

          {/* EXPECTATIONS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Market Expectations
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Forecasts, Actual Results, and Market Reactions
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Before an economic report is published,
              analysts develop forecasts based on
              available information. Financial markets
              may already reflect those expectations
              before the official numbers are released.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  Previous
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  The reported figure from an earlier
                  period, which provides historical
                  context and may be revised.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Forecast
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  The expected result, often represented
                  by a consensus of economic analysts.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Actual
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  The official result published when
                  the economic report is released.
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-400">
              The difference between forecasts and actual
              results can change expectations for future
              economic conditions. Market reactions are
              not always predictable because positioning,
              revisions, and broader financial conditions
              also influence price movements.
            </p>
          </section>

          {/* ECONOMIC CALENDAR */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Following Economic Releases
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Understanding the Economic Calendar
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              An economic calendar helps investors track
              upcoming data releases and central bank
              announcements, including their scheduled
              dates, times, and reporting countries.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Some calendars also assign an expected
              impact level to each event. These labels
              indicate potential market sensitivity,
              not a guaranteed direction or size
              of price movement.
            </p>
          </section>

          {/* CONCLUSION */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Important to Understand
            </span>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Before making trading decisions, check the
              economic calendar for upcoming releases.
              Major announcements can increase market
              volatility, and their impact is not always
              predictable.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
