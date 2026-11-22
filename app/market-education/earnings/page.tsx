
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function EarningsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-black">
                Earnings
              </h1>

              <p className="mt-2 text-sm leading-7 text-zinc-400">
                Understand how companies report financial
                performance, how investors evaluate results,
                and why earnings announcements move stocks.
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
              src="/market-education/earnings.png"
              alt="Corporate earnings and financial performance"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          {/* INTRODUCTION */}
          <section className="mt-8 px-1 pb-8 md:px-2">
            <h2 className="text-2xl font-black">
              Understanding Company Earnings
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Earnings represent a company&apos;s profit
              after accounting for its expenses.

              Earnings are a key measure of
              a company&apos;s financial performance.

            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Public companies typically release
              financial results every quarter and
              provide annual reports. These reports
              contain information about revenue,
              expenses, profitability, and the
              company&apos;s financial condition.
            </p>
          </section>

          {/* REVENUE AND PROFIT */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Revenue and Profit
            </span>

            <h2 className="mt-2 text-2xl font-black">
              How Much Money Did the Company Make?
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Revenue is the total amount a company
              earns from selling products or services
              before deducting expenses. Net income
              is the profit remaining after accounting
              for all expenses and applicable taxes.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              For example, a company reports $100 million
              in revenue and $75 million in total expenses,
              including taxes.
            </p>

            {/* EARNINGS CALCULATION */}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm sm:text-base">
              <div>
                <p className="text-xs text-zinc-500">
                  Revenue
                </p>
                <p className="mt-1 text-xl font-black text-white">
                  $100M
                </p>
              </div>

              <span className="text-xl text-zinc-500">−</span>

              <div>
                <p className="text-xs text-zinc-500">
                  Total Expenses
                </p>
                <p className="mt-1 text-xl font-black text-white">
                  $75M
                </p>
              </div>

              <span className="text-xl text-zinc-500">=</span>

              <div>
                <p className="text-xs text-zinc-500">
                  Net Income
                </p>
                <p className="mt-1 text-xl font-black text-cyan-300">
                  $25M
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-400">
              Revenue growth can indicate increasing
              sales, but rising revenue does not
              always mean rising profit. Expenses
              may increase faster than sales.
            </p>
          </section>

          {/* EARNINGS PER SHARE */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Earnings Per Share
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Understanding EPS
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Earnings per share, or EPS, measures
              how much profit a company generates
              for each share of common stock.
              Basic EPS generally divides earnings
              available to common shareholders by
              the weighted-average number of common
              shares outstanding during the period.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              In a simplified example, a company
              generates $25 million in earnings
              available to common shareholders
              and has 10 million weighted-average
              common shares outstanding.
            </p>

            <p className="mt-4 text-sm font-bold text-white">
              $25 million ÷ 10 million shares = $2.50 EPS
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Investors compare EPS across reporting
              periods to evaluate changes in
              profitability per share. However,
              EPS can also change when a company
              issues or repurchases shares.
            </p>
          </section>

          {/* EARNINGS EXPECTATIONS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Analyst Expectations
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Earnings Beats and Misses
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Before earnings announcements,
              financial analysts publish estimates
              of a company&apos;s expected revenue
              and earnings. Investors compare
              the reported results with those
              expectations.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  Earnings Beat
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  The company reports earnings
                  above analysts&apos; expectations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Earnings Meet
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Reported earnings are approximately
                  in line with expectations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Earnings Miss
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  The company reports earnings
                  below analysts&apos; expectations.
                </p>
              </div>
            </div>
          </section>

          {/* READING THE REPORT */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Reading Earnings Reports
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Revenue and EPS Can Tell Different Stories
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              A company can exceed earnings
              expectations while reporting
              weaker-than-expected revenue.
              This can happen when costs fall
              or profit margins improve.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-bold">
                  Revenue Miss
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Expected revenue: $105 million
                </p>

                <p className="mt-1 text-sm leading-7 text-zinc-400">
                  Actual revenue: $100 million
                </p>

                <p className="mt-2 text-sm font-bold text-orange-400">
                  $5 million below expectations
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  EPS Beat
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Expected EPS: $2.20
                </p>

                <p className="mt-1 text-sm leading-7 text-zinc-400">
                  Actual EPS: $2.50
                </p>

                <p className="mt-2 text-sm font-bold text-cyan-300">
                  $0.30 above expectations
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-400">
              Examining both figures helps investors
              distinguish changes in sales from
              changes in profitability.
            </p>
          </section>

          {/* COMPANY GUIDANCE */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Company Guidance
            </span>

            <h2 className="mt-2 text-2xl font-black">
              What Does Management Expect Next?
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Company guidance refers to management&apos;s
              expectations for future financial
              performance. It may include forecasts
              for revenue, earnings, expenses,
              or business growth.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              For example, analysts expect $100 million
              in revenue next quarter, but management
              forecasts only $90 million.
              Even if the company beats current
              earnings expectations, weaker
              guidance may disappoint investors.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Guidance is a forecast rather than
              a guarantee. Unexpected economic
              conditions, competition, and
              operating challenges can affect
              actual results.
            </p>
          </section>

          {/* MARKET REACTION */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Market Reaction
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Why Stocks Move After Earnings
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Earnings announcements can trigger
              rapid changes in stock prices as
              investors reassess a company&apos;s
              performance and future prospects.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              A company may report strong profits
              and still see its stock price fall
              if investors expected even better
              results. Likewise, a company with
              disappointing earnings may see
              its shares rise if the outlook
              improves or results are less
              negative than anticipated.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Earnings announcements can create
              sharp price movements and increased
              volatility, particularly when
              results differ significantly
              from market expectations.
            </p>
          </section>

          {/* CONCLUSION */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Important to Understand
            </span>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              An earnings report provides insight
              into a company&apos;s financial performance,
              but no single number tells the
              complete story. Revenue, profitability,
              expectations, and future guidance
              should be evaluated together.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
