
import Link from "next/link";
import Navbar from "../../components/Navbar";

const ipoSteps = [
  {
    title: "Preparation",
    description:
      "The company works with advisors and prepares financial disclosures for potential investors.",
  },
  {
    title: "Valuation",
    description:
      "The company and its underwriters assess the business and determine an estimated offering price range.",
  },
  {
    title: "Pricing",
    description:
      "The final IPO offer price is established before shares begin trading publicly.",
  },
  {
    title: "Public Trading",
    description:
      "Shares begin trading on a stock exchange, where market demand influences their price.",
  },
];

export default function IPOsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-black">
                IPOs
              </h1>

              <p className="mt-2 text-sm leading-7 text-zinc-400">
                Understand how companies go public,
                how IPO shares are priced, and what
                investors should know about newly
                listed stocks.
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
              src="/market-education/ipos.png"
              alt="Initial public offering and stock market listing"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          {/* INTRODUCTION */}
          <section className="mt-8 px-1 pb-8 md:px-2">
            <h2 className="text-2xl font-black">
              What Is an IPO?
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              An initial public offering, or IPO,
              is the process through which a private
              company offers shares to public investors
              for the first time.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              After completing the offering and
              listing process, the company&apos;s
              shares can trade on a public stock
              exchange. Public ownership also
              brings ongoing financial reporting
              and regulatory responsibilities.
            </p>
          </section>

          {/* WHY COMPANIES GO PUBLIC */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Going Public
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Why Companies Choose an IPO
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Going public can provide a company
              with opportunities that may not
              be available while privately held.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  Raising Capital
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  By issuing new shares, a company
                  can raise funds to expand operations,
                  invest in products, repay debt,
                  or support other business needs.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Shareholder Liquidity
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Public trading can eventually
                  provide founders, employees,
                  and early investors with
                  opportunities to sell shares,
                  subject to applicable restrictions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Greater Market Visibility
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  A public listing can increase
                  recognition among investors,
                  customers, and business partners.
                </p>
              </div>
            </div>
          </section>

          {/* IPO PROCESS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              How an IPO Works
            </span>

            <h2 className="mt-2 text-2xl font-black">
              From Private Company to Public Trading
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Going public involves financial
              preparation, regulatory disclosures,
              valuation, and pricing before
              shares begin trading on an exchange.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-4 md:gap-4">
              {ipoSteps.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 text-sm font-black text-cyan-300">
                      {index + 1}
                    </span>

                    {index < ipoSteps.length - 1 && (
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
          </section>

          {/* IPO PRICING */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              IPO Pricing
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Offer Price vs. Market Price
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              The IPO offer price is established
              before public trading begins.
              Once the shares start trading,
              their market price is determined
              by supply and demand.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              For example, a company sets its
              IPO offer price at $20 per share,
              but the first public trade occurs
              at $26.
            </p>

            <p className="mt-4 text-sm font-bold text-white">
              $26 opening price − $20 offer price = $6 difference
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              This represents a 30% increase
              from the offering price. However,
              investors buying at the public
              opening price would pay $26,
              not the original $20 offer price.
              Access to IPO allocations varies
              by brokerage and offering.
            </p>
          </section>

          {/* LISTING DAY */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Listing Day
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Why the First Trading Day Can Be Volatile
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Newly listed stocks can experience
              sharp price movements as investors
              react to the company&apos;s valuation,
              business prospects, and available
              supply of shares.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Strong demand may push the price
              above the offering price, while
              weaker demand can cause shares
              to trade below it. The opening
              price does not guarantee where
              the stock will trade later.
            </p>
          </section>

          {/* LOCKUP PERIODS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Lockup Periods
            </span>

            <h2 className="mt-2 text-2xl font-black">
              When Can Insiders Sell Their Shares?
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              IPO lockup agreements may temporarily
              prevent certain founders, employees,
              and early investors from selling
              their shares after the company
              becomes publicly traded.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Lockup periods vary by offering,
              although 180 days is a common
              example. When restrictions expire,
              additional shares may become
              eligible for sale.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Lockup expiration does not mean
              insiders will necessarily sell.
              It simply changes when certain
              shareholders are permitted
              to sell their holdings.
            </p>
          </section>

          {/* IPO RISKS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              IPO Risks
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Risks of Investing in Newly Public Companies
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Investing in newly public companies
              involves several risks that investors
              should understand before making
              decisions.
            </p>

            <div className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-bold">
                  Valuation Risk
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  High growth expectations may
                  result in a stock price that
                  is difficult to justify using
                  current financial performance.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Limited Trading History
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Newly listed companies have
                  little public price history,
                  making historical trading
                  patterns harder to evaluate.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Business Uncertainty
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Some newly public companies
                  are still developing their
                  business models or operating
                  without consistent profits.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Market Conditions
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Changes in interest rates,
                  investor sentiment, or broader
                  market conditions can affect
                  demand for newly listed stocks.
                </p>
              </div>
            </div>
          </section>

          {/* EVALUATING AN IPO */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Evaluating an IPO
            </span>

            <h2 className="mt-2 text-2xl font-black">
              What Investors Should Examine
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Investors should look beyond
              listing-day excitement and
              evaluate the underlying business.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  Financial Performance
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Review revenue growth,
                  profitability, cash flow,
                  and debt obligations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Company Valuation
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Compare the company&apos;s
                  valuation with its financial
                  results, growth expectations,
                  and similar businesses.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Use of IPO Proceeds
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Examine how the company plans
                  to use the money raised,
                  including investments,
                  expansion, or debt repayment.
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
              An IPO gives investors an opportunity
              to participate in a newly public
              company, but a new listing does
              not automatically make a stock
              a good investment. Business
              fundamentals, valuation, and
              risks remain important.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
