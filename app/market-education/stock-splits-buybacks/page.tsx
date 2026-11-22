
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function StockSplitsBuybacksPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-black">
                Stock Splits &amp; Buybacks
              </h1>

              <p className="mt-2 text-sm leading-7 text-zinc-400">
                Understand how stock splits, reverse splits,
                share repurchases, and shares outstanding
                affect investors and company valuations.
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
              src="/market-education/stock-splits-buybacks.png"
              alt="Stock splits and share buybacks"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          {/* INTRODUCTION */}
          <section className="mt-8 px-1 pb-8 md:px-2">
            <h2 className="text-2xl font-black">
              Understanding Stock Splits &amp; Buybacks
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Companies can change the number of
              shares outstanding through corporate
              actions such as stock splits and
              share repurchases.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              These actions can affect the share
              price, ownership calculations, and
              financial metrics without necessarily
              changing the underlying profitability
              of the business.
            </p>
          </section>

          {/* STOCK SPLITS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Stock Splits
            </span>

            <h2 className="mt-2 text-2xl font-black">
              More Shares, Lower Price Per Share
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              A forward stock split increases
              the number of shares while
              reducing the price per share
              proportionally.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              For example, an investor owns
              one share worth $100 before
              a 2-for-1 stock split.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Before Split
                </h3>
                <p className="mt-2 text-lg font-black text-cyan-300">
                  1 Share × $100
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">
                  After 2-for-1 Split
                </h3>
                <p className="mt-2 text-lg font-black text-cyan-300">
                  2 Shares × $50
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">
                  Total Position Value
                </h3>
                <p className="mt-2 text-lg font-black text-cyan-300">
                  $100
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-400">
              The investor owns more shares,
              but the split itself does not
              increase the total value of
              the investment.
            </p>
          </section>

          {/* WHY COMPANIES SPLIT */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Why Companies Split Shares
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Making Shares More Accessible
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Companies may split their shares
              to reduce the price of an
              individual share, making whole
              shares easier to purchase for
              investors who do not use
              fractional-share trading.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              A lower quoted share price may
              also influence investor perception
              and trading activity, although
              increased liquidity is not guaranteed.
            </p>
          </section>

          {/* REVERSE SPLITS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Reverse Stock Splits
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Fewer Shares, Higher Price Per Share
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              A reverse stock split combines
              existing shares into a smaller
              number of shares while increasing
              the price per share proportionally.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              For example, an investor owns
              10 shares worth $5 each before
              a 1-for-5 reverse split.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Before Reverse Split
                </h3>
                <p className="mt-2 text-lg font-black text-cyan-300">
                  10 Shares × $5
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">
                  After 1-for-5 Split
                </h3>
                <p className="mt-2 text-lg font-black text-cyan-300">
                  2 Shares × $25
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">
                  Total Position Value
                </h3>
                <p className="mt-2 text-lg font-black text-cyan-300">
                  $50
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-400">
              Companies sometimes use reverse
              splits to raise their quoted
              share price or address stock
              exchange listing requirements.
              The action does not improve
              the company&apos;s financial
              condition by itself.
            </p>
          </section>

          {/* SHARE BUYBACKS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Share Buybacks
            </span>

            <h2 className="mt-2 text-2xl font-black">
              When Companies Repurchase Their Shares
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              A share buyback occurs when a
              company repurchases its own
              stock, often through purchases
              in the open market.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Companies may use buybacks to
              return capital to shareholders,
              reduce the number of shares
              outstanding, or offset dilution
              from employee stock compensation.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Repurchased shares may be held
              as treasury stock or retired.
              The effect on shares outstanding
              depends on how the repurchases
              and any new share issuances
              are handled.
            </p>
          </section>

          {/* SHARES OUTSTANDING */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Shares Outstanding
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Understanding the Share Count
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Shares outstanding represent
              the company&apos;s issued shares
              held by shareholders, excluding
              treasury shares.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Suppose a company has
              100 million shares outstanding
              and repurchases 10 million
              shares without issuing new ones.
            </p>

            <p className="mt-5 text-lg font-black text-cyan-300">
              100M − 10M = 90M Shares
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Shareholders who do not sell
              their shares may own a larger
              percentage of the company
              after the repurchase.
            </p>

          </section>

          {/* EPS IMPACT */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Earnings Per Share
            </span>

            <h2 className="mt-2 text-2xl font-black">
              How Buybacks Can Affect EPS
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Earnings per share, or EPS,
              measures how much company
              profit is attributable to
              each share. Basic EPS generally
              uses the weighted-average
              shares outstanding during
              the reporting period.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Consider a simplified example
              in which a company earns
              $100 million and the share
              count decreases from
              100 million to 90 million.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-bold">
                  Before Buyback
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  $100M profit ÷ 100M shares
                </p>

                <p className="mt-2 text-lg font-black text-cyan-300">
                  EPS = $1.00
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  After Buyback
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  $100M profit ÷ 90M shares
                </p>

                <p className="mt-2 text-lg font-black text-cyan-300">
                  EPS ≈ $1.11
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-400">
              This simplified comparison
              assumes the lower share count
              applies throughout the relevant
              period. Actual reported EPS
              depends on weighted-average
              shares and other accounting factors.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              EPS can increase even when
              total company profits remain
              unchanged. Investors should
              distinguish improvements in
              business earnings from changes
              caused by a smaller share count.
            </p>
          </section>

          {/* EVALUATING CORPORATE ACTIONS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Evaluating Corporate Actions
            </span>

            <h2 className="mt-2 text-2xl font-black">
              What Investors Should Examine
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Corporate actions should be
              evaluated alongside a company&apos;s
              financial condition and
              long-term business performance.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  Split Ratio
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Understand how the split
                  changes the number of shares
                  and the quoted price per share.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Buyback Size
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Compare the amount of shares
                  repurchased with the
                  company&apos;s total share count.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Cash and Debt
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Examine whether repurchases
                  are supported by available
                  cash or financed through
                  additional borrowing.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Share Issuance
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Check whether newly issued
                  shares offset the reduction
                  from company buybacks.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Business Performance
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Review revenue, profits,
                  and cash flow to understand
                  whether the underlying
                  business is improving.
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
              A lower share price after a
              split does not automatically
              make a stock cheaper in terms
              of valuation. Similarly,
              a buyback does not guarantee
              higher stock returns.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
