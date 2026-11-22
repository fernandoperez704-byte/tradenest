
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function BondsTreasuriesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-black">
                Bonds &amp; Treasuries
              </h1>

              <p className="mt-2 text-sm leading-7 text-zinc-400">
                Understand how bonds work, the different types of
                U.S. Treasury securities, and how interest rates,
                yields, and risks affect their value.
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
              src="/market-education/bonds-treasuries.png"
              alt="Bonds and U.S. Treasury securities"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          {/* INTRODUCTION */}
          <section className="mt-8 px-1 pb-8 md:px-2">
            <h2 className="text-2xl font-black">
              Understanding Bonds
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              A bond is a debt investment. When an investor
              purchases a bond, they lend money to a government,
              corporation, or another issuer. In return, the
              issuer agrees to repay the principal according
              to the bond&apos;s terms and may make interest
              payments along the way.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Governments and companies use bonds to
              raise money, while investors may use them
              to earn income and diversify their portfolios.
            </p>
          </section>

          {/* BOND STRUCTURE */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Bond Fundamentals
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Principal, Coupon, and Maturity
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  Principal (Face Value)
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  The amount the issuer promises to repay
                  at maturity, assuming it meets its
                  obligations. Many bonds have a face
                  value of $1,000.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Coupon Rate
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  The stated annual interest rate applied
                  to a bond&apos;s face value. For example,
                  a $1,000 bond with a 4% annual coupon
                  pays $40 in interest per year, typically
                  in scheduled installments.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Maturity Date
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  The date when the issuer is scheduled
                  to repay the principal. Bonds may have
                  short, intermediate, or long maturities.
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-400">
              Not all bonds pay periodic interest.
              Some are issued at a discount and return
              their face value at maturity.
            </p>
          </section>

          {/* TREASURIES */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              U.S. Government Debt
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Types of U.S. Treasury Securities
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              U.S. Treasury securities are issued by the
              federal government to finance government
              operations and obligations. The main
              categories differ by their maturity
              and payment structure.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  Treasury Bills (T-Bills)
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Short-term securities with maturities
                  of one year or less. They do not make
                  periodic coupon payments and are
                  generally sold at a discount or at par.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Treasury Notes (T-Notes)
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Securities generally issued with
                  maturities of 2, 3, 5, 7, or 10 years.
                  They pay fixed interest every six months.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Treasury Bonds (T-Bonds)
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Long-term securities generally issued
                  with maturities of 20 or 30 years.
                  They also pay fixed interest every
                  six months.
                </p>
              </div>
            </div>
          </section>

          {/* PRICE AND YIELD */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Bond Pricing
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Understanding Bond Prices and Yields
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              A bond&apos;s market price can change after
              issuance. Its yield reflects the return
              associated with its current price and
              expected payments, depending on the
              yield measure being used.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              For fixed-rate bonds, market prices and
              yields generally move in opposite directions,
              assuming other factors remain unchanged.
            </p>

            <div className="mt-6 space-y-4">
              <p className="text-lg font-bold text-white">
                Price ↑ → Yield ↓
              </p>

              <p className="text-lg font-bold text-white">
                Price ↓ → Yield ↑
              </p>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-400">
              For example, if an existing bond pays
              $40 annually and trades for $800,
              its current yield is 5%, compared with
              4% when priced at $1,000. Current yield
              does not account for all components of
              an investor&apos;s total return.
            </p>
          </section>

          {/* INTEREST RATES */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Interest Rate Risk
            </span>

            <h2 className="mt-2 text-2xl font-black">
              How Interest Rates Affect Existing Bonds
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              When newly issued bonds offer higher
              interest rates, older fixed-rate bonds
              with lower payments may become less
              attractive, putting downward pressure
              on their market prices.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              When market interest rates fall,
              existing bonds offering higher fixed
              payments may become more attractive,
              supporting higher prices.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Longer-maturity fixed-rate bonds
              generally experience larger price
              changes in response to interest-rate
              movements than comparable shorter-maturity
              bonds. Coupon rates and other factors
              also affect this sensitivity.
            </p>
          </section>

          {/* CREDIT RISK */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Investment Risks
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Credit Risk and Other Bond Risks
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Credit risk is the possibility that a
              bond issuer will fail to make required
              interest or principal payments.
              Different issuers carry different
              levels of credit risk.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  U.S. Treasury Securities
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Backed by the full faith and credit
                  of the U.S. government and generally
                  considered to have very low credit risk.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Corporate Bonds
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Their credit risk depends on the
                  financial strength of the issuing
                  company. Bonds from financially
                  weaker companies generally offer
                  higher yields to compensate investors
                  for additional risk.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Inflation and Liquidity Risks
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Inflation can reduce the purchasing
                  power of fixed payments. Liquidity
                  risk arises when an investor cannot
                  easily sell a bond at a reasonable
                  market price.
                </p>
              </div>
            </div>
          </section>

          {/* YIELD CURVE */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Treasury Yield Curve
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Comparing Yields Across Maturities
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              The Treasury yield curve compares
              yields across different maturities,
              helping investors understand the
              relationship between short-term
              and long-term interest rates.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  Normal Yield Curve
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Longer-term Treasury yields are
                  generally higher than shorter-term
                  yields.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Flat Yield Curve
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Short-term and long-term yields
                  are relatively close together.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Inverted Yield Curve
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Some shorter-term yields exceed
                  longer-term yields. An inverted
                  yield curve has historically
                  preceded some U.S. recessions,
                  but it does not guarantee one.
                </p>
              </div>
            </div>
          </section>

          {/* BROADER MARKET */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Market Connections
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Why Investors Watch Treasury Yields
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Treasury yields serve as important
              reference rates across financial
              markets. Changes in yields can
              influence mortgage rates, corporate
              borrowing costs, and the valuation
              of stocks and other investments.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Differences in interest rates between
              countries can also influence currency
              demand and international capital flows.
            </p>
          </section>

          {/* CONCLUSION */}
          <section className="border-t border-white/10 px-1 py-8 md:px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Important to Understand
            </span>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Before investing in a bond, consider
              its issuer, maturity, yield, credit
              quality, and interest-rate sensitivity.
              If you may need to sell before maturity,
              remember that its market price could
              be higher or lower than what you paid.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
