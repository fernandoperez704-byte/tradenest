
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ETFsIndexesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-black">
                ETFs &amp; Indexes
              </h1>

              <p className="mt-2 text-sm leading-7 text-zinc-400">
                Understand how exchange-traded funds,
                market indexes, diversification,
                and fund expenses affect investing.
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
              src="/market-education/etfs-indexes.png"
              alt="Exchange-traded funds and stock market indexes"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          {/* INTRODUCTION */}
          <section className="mt-8 px-1 pb-8 md:px-2">
            <h2 className="text-2xl font-black">
              Understanding ETFs and Indexes
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Exchange-traded funds, or ETFs,
              allow investors to buy shares
              of a fund that holds a collection
              of investments, such as stocks,
              bonds, or other assets.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              A market index measures the
              performance of a selected group
              of investments. Some ETFs are
              designed to track an index,
              while others follow different
              investment strategies.
            </p>
          </section>

          {/* ETF VS INDEX */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              ETF vs. Index
            </span>

            <h2 className="mt-2 text-2xl font-black">
              What's the Difference?
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              The key difference is that an
              ETF is a tradable investment
              product, while an index serves
              as a performance benchmark.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-bold">
                  ETF
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Investors can buy and sell
                  ETF shares through a brokerage
                  account. The fund owns or
                  obtains exposure to assets
                  according to its strategy.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Index
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  An index cannot be purchased
                  directly. Investors can gain
                  exposure through products
                  designed to follow it,
                  including index ETFs
                  and index mutual funds.
                </p>
              </div>
            </div>
          </section>

          {/* MAJOR INDEXES */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Market Indexes
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Understanding Major U.S. Stock Indexes
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Different indexes represent
              different groups of companies.
              Their performance can help
              investors understand trends
              across parts of the stock market.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  S&amp;P 500
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Tracks approximately 500
                  leading large-cap U.S.
                  companies across major
                  industries.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Nasdaq Composite
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Includes thousands of
                  stocks listed on the Nasdaq
                  exchange, with significant
                  exposure to technology
                  and growth-oriented companies.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Dow Jones Industrial Average
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Measures the performance
                  of 30 established U.S.
                  companies using a
                  price-weighted methodology.
                </p>
              </div>
            </div>
          </section>

          {/* DIVERSIFICATION */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Diversification
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Spreading Investment Risk
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Diversification means spreading
              investments across different
              companies, industries, regions,
              or asset classes rather than
              depending heavily on one holding.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              For example, an investor who
              owns shares of only one company
              is highly exposed to that
              company's performance.
              A broad-market ETF may hold
              hundreds of companies, reducing
              dependence on any single stock.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              However, the number of holdings
              alone does not determine how
              diversified a fund is. If a few
              companies represent most of its
              value, their performance can
              strongly influence the fund.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Diversification can reduce
              company-specific risk, but
              it cannot eliminate the risk
              of market-wide declines.
            </p>
          </section>

          {/* EXPENSE RATIOS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Expense Ratios
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Understanding ETF Costs
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              An expense ratio represents
              a fund's annual operating
              expenses as a percentage
              of its average net assets.
              These costs are reflected
              in the fund's performance
              rather than charged as a
              separate annual bill.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              For example, an investor holds
              $10,000 in an ETF with a
              0.20% annual expense ratio.
            </p>

            <p className="mt-4 text-sm font-bold text-white">
              $10,000 × 0.20% = approximately $20 per year
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              This is a simplified estimate
              assuming the investment value
              remains constant. Trading costs
              and other expenses may also apply.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Lower fees can help preserve
              long-term returns, but investors
              should also evaluate the fund's
              investment strategy and risks.
            </p>
          </section>

          {/* TYPES OF ETFS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Types of ETFs
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Different Funds, Different Exposure
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              ETFs can follow different
              investment strategies depending
              on the assets and markets
              they are designed to cover.
            </p>

            <div className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-bold">
                  Broad-Market ETFs
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Provide exposure to a large
                  portion of a stock market,
                  often through an index.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Sector ETFs
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Focus on a particular
                  industry, such as technology,
                  healthcare, or energy.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Bond ETFs
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Provide exposure to government,
                  corporate, or other
                  fixed-income securities.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  International ETFs
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Invest in companies or
                  securities from markets
                  outside the investor's
                  home country.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Commodity ETFs
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Provide exposure to
                  commodities such as gold
                  or oil, sometimes through
                  physical holdings or
                  futures contracts.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Thematic ETFs
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Focus on specific investment
                  themes, such as artificial
                  intelligence, clean energy,
                  or emerging technologies.
                </p>
              </div>
            </div>
          </section>

          {/* EVALUATING AN ETF */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Evaluating an ETF
            </span>

            <h2 className="mt-2 text-2xl font-black">
              What Investors Should Examine
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Two ETFs may have similar
              names while holding different
              investments or following
              different strategies.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  Fund Holdings
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Review which securities
                  the ETF owns and whether
                  a few large holdings
                  dominate its portfolio.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Index or Strategy
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Understand which benchmark
                  the fund tracks or which
                  investment approach
                  its managers follow.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Concentration
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Examine how much exposure
                  the fund has to particular
                  companies, sectors,
                  or geographic regions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Trading Liquidity
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Consider trading volume
                  and bid-ask spreads,
                  which can affect the
                  cost of buying or
                  selling ETF shares.
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
              ETFs are not guaranteed to
              generate positive returns.
              Their value can rise or fall
              with the investments and
              markets they represent.
            </p>

          </section>
        </div>
      </main>
    </>
  );
}
