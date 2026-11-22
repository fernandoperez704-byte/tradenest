
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function DividendsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-black">
                Dividends
              </h1>

              <p className="mt-2 text-sm leading-7 text-zinc-400">
                Understand how dividends work, when shareholders
                receive payments, and how to evaluate dividend
                income and sustainability.
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
              src="/market-education/dividends.png"
              alt="Dividend investing and shareholder income"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          {/* INTRODUCTION */}
          <section className="mt-8 px-1 pb-8 md:px-2">
            <h2 className="text-2xl font-black">
              Understanding Dividends
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              A dividend is a distribution of money or
              other assets from a company to its shareholders.
              Companies may distribute part of their profits
              while retaining funds to support operations,
              expansion, or debt repayment.
            </p>


            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Dividends are commonly associated with
              established companies that generate
              consistent cash flow. However, not every
              profitable company pays dividends, and
              dividend payments are never guaranteed.
            </p>
          </section>


          {/* HOW DIVIDENDS WORK */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Shareholder Payments
            </span>

            <h2 className="mt-2 text-2xl font-black">
              How Dividend Payments Work
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              When a company declares a cash dividend,
              it specifies an amount to be paid for
              each eligible share. The total payment
              depends on the number of shares an
              investor owns.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              For example, if a company declares a
              $0.50 dividend per share and an investor
              owns 100 eligible shares, the investor
              receives $50 before any applicable taxes.
            </p>

            <p className="mt-4 text-sm font-bold text-white">
              100 shares × $0.50 = $50 dividend payment
            </p>
          </section>

          {/* PAYMENT FREQUENCY */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Payment Schedules
            </span>

            <h2 className="mt-2 text-2xl font-black">
              How Often Are Dividends Paid?
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Dividend payment schedules vary by company.
              Many U.S. companies pay quarterly, but
              other schedules are also common.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  Monthly Dividends
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Paid approximately 12 times per year,
                  generally once each month.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Quarterly Dividends
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Paid approximately four times per year,
                  generally once every three months.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Semiannual and Annual Dividends
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Semiannual dividends are paid twice
                  per year, while annual dividends
                  are paid once per year.
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-400">
              Companies may also issue special,
              one-time dividends outside their
              regular payment schedules.
            </p>
          </section>

          {/* DIVIDEND DATES */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Important Dividend Dates
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Understanding the Dividend Timeline
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Dividend payments follow several important
              dates that determine when the dividend
              is announced, who qualifies to receive it,
              and when the money is distributed.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  Declaration Date
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  The date when the company announces
                  its dividend, including the payment
                  amount and relevant dates.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Ex-Dividend Date
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  The first trading day when shares
                  trade without the right to the
                  upcoming dividend. Investors who
                  purchase shares on or after this
                  date generally do not qualify
                  for that payment.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Record Date
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  The date when the company determines
                  which shareholders are entitled to
                  receive the dividend.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Payment Date
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  The date when the company distributes
                  the dividend to eligible shareholders.
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-400">
              For ordinary U.S. cash dividends,
              the ex-dividend date is generally
              the same business day as the record date
              under current settlement rules.
              Special situations may follow different rules.
            </p>
          </section>

          {/* DIVIDEND YIELD */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Dividend Yield
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Measuring Dividend Income Relative to Price
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Dividend yield measures a stock&apos;s
              annual dividend per share as a percentage
              of its current market price. It helps
              investors compare dividend income
              across different stocks.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              For example, a stock trading at $50
              that pays $2 per share annually has
              a dividend yield of 4%.
            </p>

            <p className="mt-4 text-sm font-bold text-white">
              ($2 ÷ $50) × 100 = 4% dividend yield
            </p>
          </section>

          {/* DIVIDEND STABILITY */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Dividend Sustainability
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Can the Company Maintain Its Dividend?
            </h2>


            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Investors should evaluate whether a company
              can afford to continue paying dividends.
            </p>


            <h3 className="mt-6 text-lg font-bold">
              Dividend Payout Ratio
            </h3>

            <p className="mt-2 text-sm leading-7 text-zinc-400">
              The payout ratio compares dividends
              per share with earnings per share.
              It shows what percentage of reported
              earnings is distributed to shareholders.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              For example, if a company earns $5
              per share and pays a $2 annual dividend,
              its payout ratio is 40%.
            </p>

            <p className="mt-4 text-sm font-bold text-white">
              ($2 ÷ $5) × 100 = 40% payout ratio
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              A lower payout ratio may provide more
              flexibility to reinvest earnings or
              maintain payments during weaker periods.
              A very high ratio can leave less room
              for unexpected financial difficulties.
            </p>

            <h3 className="mt-6 text-lg font-bold">
              Cash Flow and Dividend History
            </h3>

            <p className="mt-2 text-sm leading-7 text-zinc-400">
              Investors also examine whether a company
              generates sufficient cash to support
              its dividends and whether it has
              maintained, increased, or reduced
              payments over time.
            </p>
          </section>

          {/* COMPARING DIVIDEND STOCKS */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Evaluating Dividend Stocks
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Why Dividend Yield Alone Is Not Enough
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Consider two hypothetical companies.
              Stock A offers a 4% dividend yield,
              a 40% payout ratio, and growing earnings.
              Stock B offers a 9% yield, a 95%
              payout ratio, and declining earnings.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Although Stock B offers a higher
              advertised yield, its dividend may
              face greater pressure if earnings
              continue to weaken. Stock A may
              have more financial flexibility,
              despite its lower yield.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              These figures are illustrative.
              Neither yield nor payout ratio alone
              determines whether a stock is a
              suitable investment.
            </p>
          </section>

          {/* CONCLUSION */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Important to Understand
            </span>


            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Dividends can provide income, but payments
              are not guaranteed. Investors should consider
              both dividend income and the risks of owning
              the stock.
            </p>


          </section>
        </div>
      </main>
    </>
  );
}
