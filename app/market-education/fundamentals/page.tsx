
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function FundamentalsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-black">
                Fundamentals
              </h1>

              <p className="mt-2 text-sm leading-7 text-zinc-400">
                Understand how investors evaluate
                a company&apos;s financial performance,
                financial strength, and stock valuation.
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
              src="/market-education/fundamentals.png"
              alt="Fundamental analysis and company financial performance"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          {/* INTRODUCTION */}
          <section className="mt-8 px-1 pb-8 md:px-2">
            <h2 className="text-2xl font-black">
              Understanding Fundamental Analysis
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Fundamental analysis is the process
              of examining a company&apos;s business,
              financial statements, and economic
              conditions to evaluate its financial
              health and potential value.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Unlike technical analysis, which
              focuses on price movements and
              trading volume, fundamental analysis
              helps investors assess whether
              a stock&apos;s price is reasonable
              relative to the company&apos;s value.
            </p>

          </section>

          {/* REVENUE AND PROFIT */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Business Performance
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Revenue, Profit, and Growth
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Revenue represents the money
              generated from a company&apos;s
              business activities before
              deducting expenses. Net income
              is the profit remaining after
              accounting for expenses and taxes.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              For example, a company generates
              $100 million in revenue and
              reports $75 million in total
              expenses, including taxes.
            </p>

            <p className="mt-4 text-sm font-bold text-white">
              $100 million − $75 million = $25 million net income
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Investors examine whether revenue
              and profit are increasing over time.
              Revenue growth may indicate stronger
              sales, while profit growth can
              reflect improving efficiency
              or higher profit margins.
            </p>
          </section>

          {/* CASH FLOW */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Cash Flow
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Is the Company Generating Cash?
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              A company can report accounting
              profits without receiving the
              same amount in cash. Cash flow
              shows how money enters and
              leaves the business.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  Operating Cash Flow
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Cash generated or used by
                  the company&apos;s regular
                  business operations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Capital Expenditures
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Money spent on long-term
                  assets such as equipment,
                  buildings, and infrastructure.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Free Cash Flow
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  A commonly used measure of
                  cash remaining after capital
                  expenditures are subtracted
                  from operating cash flow.
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-400">
              For example, a company generates
              $30 million in operating cash
              flow and spends $10 million
              on capital expenditures.
            </p>

            <p className="mt-4 text-sm font-bold text-white">
              $30 million − $10 million = $20 million free cash flow
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Positive free cash flow can
              provide flexibility to reinvest
              in the business, repay debt,
              or return money to shareholders.
            </p>
          </section>

          {/* DEBT */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Financial Strength
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Understanding Company Debt
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Companies borrow money to finance
              operations, expansion, and
              investments. Debt can support
              growth, but excessive borrowing
              increases financial risk.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              One useful measure is net debt,
              which subtracts cash and cash
              equivalents from total debt.
            </p>

            <p className="mt-4 text-sm font-bold text-white">
              $60 million total debt − $40 million cash = $20 million net debt
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Investors also consider whether
              the company generates enough
              earnings and cash flow to
              meet its debt payments and
              interest obligations.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Debt levels should be evaluated
              in the context of the company&apos;s
              industry, financial stability,
              and borrowing costs.
            </p>
          </section>

          {/* VALUATION */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Stock Valuation
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Understanding the P/E Ratio
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              The price-to-earnings ratio,
              or P/E ratio, compares a company&apos;s
              stock price with its earnings
              per share. It helps investors
              understand how much they are
              paying for each dollar of earnings.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              For example, a stock trades at
              $50 per share and reports
              $2.50 in annual earnings per share.
            </p>

            <p className="mt-4 text-sm font-bold text-white">
              $50 stock price ÷ $2.50 EPS = 20× P/E ratio
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  Higher P/E Ratio
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Investors may expect stronger
                  future earnings growth, but
                  the stock is also priced
                  higher relative to current
                  earnings.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Lower P/E Ratio
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  The stock may appear less
                  expensive relative to earnings,
                  but the lower valuation
                  could reflect slower growth
                  or additional business risks.
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-400">
              P/E ratios are generally more
              useful when comparing companies
              with similar business models,
              growth prospects, and profitability.
              They are less informative when
              earnings are negative.
            </p>
          </section>

          {/* COMPANY COMPARISON */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Comparing Companies
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Why One Financial Metric Is Not Enough
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Consider two hypothetical companies
              operating in the same industry.
              Company A has growing revenue,
              rising profits, positive free
              cash flow, and manageable debt,
              but trades at a P/E ratio of 20.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Company B trades at a lower
              P/E ratio of 12, but its revenue
              is declining, profits are falling,
              and debt obligations are higher.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Although Company B appears cheaper
              based on its P/E ratio, that
              does not automatically make it
              a better investment. Investors
              should consider financial
              performance and risk alongside
              valuation.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              These figures are illustrative
              and do not determine which
              company is a suitable investment.
            </p>
          </section>

          {/* CONCLUSION */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Important to Understand
            </span>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Strong financial performance
              does not guarantee future returns,
              and an attractive valuation
              does not eliminate investment risk.
            </p>

          </section>
        </div>
      </main>
    </>
  );
}
