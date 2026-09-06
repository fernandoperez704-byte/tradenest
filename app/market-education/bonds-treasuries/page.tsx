"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function BondsTreasuriesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black">Bonds & Treasuries</h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                Learn how bonds work, what Treasury securities are, and how
                yields, maturity, interest rates, and bond prices connect.
              </p>
            </div>

            <Link
              href="/market-education"
              className="rounded-xl border border-white/10 bg-[#111827] px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              ← Market Education
            </Link>
          </div>

          {/* WHAT IS A BOND */}
          <section className="mt-8 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              What Is a Bond?
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              A Bond Is a Form of Lending
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
              When an investor buys a bond, they are lending money to an issuer.
              In return, the issuer agrees to repay the principal according to
              the bond&apos;s terms and may also make interest payments.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["Investor", "Provides money by purchasing the bond."],
                ["Issuer", "Borrows the money and issues the bond."],
                ["Repayment", "The bond's terms determine interest and principal payments."],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3"
                >
                  <p className="text-sm font-black text-white">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* HOW BONDS WORK */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              How Bonds Work
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Principal, Coupon, and Maturity
            </h2>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["Principal", "The amount the issuer agrees to repay according to the bond's terms."],
                ["Coupon", "The stated interest payment associated with a coupon-paying bond."],
                ["Maturity", "The date when the bond reaches the end of its term and principal is due."],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3"
                >
                  <p className="text-sm font-black text-white">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    {description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-white/10 pt-3">
              <p className="text-xs text-zinc-500">
                Bond structures vary. Some bonds make periodic coupon payments,
                while others may be issued differently.
              </p>
            </div>
          </section>

          {/* TREASURIES */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Treasury Securities
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Debt Issued by the U.S. Government
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
              U.S. Treasury securities are debt obligations issued by the
              federal government. Their names differ mainly according to maturity.
            </p>

            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <div className="grid grid-cols-[1fr_1fr_1.4fr] bg-[#111827] px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
                <span>Type</span>
                <span>Maturity</span>
                <span>Basic Structure</span>
              </div>

              {[
                ["Treasury Bills", "1 year or less", "Short-term securities generally sold at a discount or at par."],
                ["Treasury Notes", "2–10 years", "Intermediate-term securities that pay interest every six months."],
                ["Treasury Bonds", "20 or 30 years", "Long-term securities that pay interest every six months."],
              ].map(([type, maturity, structure]) => (
                <div
                  key={type}
                  className="grid grid-cols-[1fr_1fr_1.4fr] border-t border-white/10 px-4 py-3 text-sm"
                >
                  <span className="font-bold text-white">{type}</span>
                  <span className="text-zinc-400">{maturity}</span>
                  <span className="text-zinc-400">{structure}</span>
                </div>
              ))}
            </div>
          </section>

          {/* PRICE AND YIELD */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Bond Prices & Yields
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Price and Yield Generally Move in Opposite Directions
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
              When the market price of an existing bond rises, its yield falls.
              When its market price falls, its yield rises, all else being equal.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Bond Price
                </p>
                <p className="mt-1 text-xl font-black text-white">
                  Price ↑
                </p>
                <p className="mt-2 text-sm font-bold text-white">
                  Yield ↓
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Bond Price
                </p>
                <p className="mt-1 text-xl font-black text-white">
                  Price ↓
                </p>
                <p className="mt-2 text-sm font-bold text-white">
                  Yield ↑
                </p>
              </div>
            </div>

            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-zinc-500">
              This inverse relationship is one of the most important concepts
              when learning about bonds.
            </p>
          </section>

          {/* INTEREST RATES */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Interest Rates & Bonds
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              New Rates Can Change the Value of Existing Bonds
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
              Changes in prevailing interest rates can make the payments from
              existing fixed-rate bonds more or less attractive compared with
              newly issued bonds.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-sm font-black text-white">
                  Market Rates Rise
                </p>

                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Existing fixed-rate bonds may become less attractive relative
                  to newly issued bonds with higher rates, putting downward
                  pressure on their market prices.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-sm font-black text-white">
                  Market Rates Fall
                </p>

                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Existing bonds with higher fixed payments may become more
                  attractive, which can support higher market prices.
                </p>
              </div>
            </div>
          </section>

          {/* MATURITY */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Maturity
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              How Long Until Principal Is Due?
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
              Maturity tells investors how long the bond remains outstanding.
              Longer-maturity bonds generally have greater sensitivity to
              changes in interest rates than shorter-maturity bonds, all else equal.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["Short Term", "Principal is due relatively soon and interest-rate sensitivity is generally lower."],
                ["Intermediate Term", "Falls between short- and long-term maturities."],
                ["Long Term", "Principal is due farther in the future and price sensitivity to rates is generally greater."],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3"
                >
                  <p className="text-sm font-black text-white">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CREDIT RISK */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Credit Risk
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Who Issued the Bond Matters
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
              Credit risk is the risk that an issuer may fail to make required
              interest or principal payments.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-sm font-black text-white">
                  U.S. Treasuries
                </p>

                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Backed by the full faith and credit of the U.S. government and
                  generally considered to have very low credit risk.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-sm font-black text-white">
                  Corporate Bonds
                </p>

                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Credit risk depends on the financial strength and ability of
                  the issuing company to meet its obligations.
                </p>
              </div>
            </div>
          </section>

          {/* YIELD CURVE */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              The Yield Curve
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Compare Treasury Yields Across Maturities
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
              The Treasury yield curve compares yields across different
              maturities. Its shape can reflect expectations about interest
              rates, inflation, growth, and economic conditions.
            </p>

            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <div className="grid grid-cols-[1fr_1.5fr] bg-[#111827] px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
                <span>Shape</span>
                <span>What It Means</span>
              </div>

              {[
                ["Normal", "Longer-term yields are generally above shorter-term yields."],
                ["Flat", "Short- and long-term yields are relatively close together."],
                ["Inverted", "Some shorter-term yields are above longer-term yields."],
              ].map(([shape, meaning]) => (
                <div
                  key={shape}
                  className="grid grid-cols-[1fr_1.5fr] border-t border-white/10 px-4 py-3 text-sm"
                >
                  <span className="font-bold text-white">{shape}</span>
                  <span className="text-zinc-400">{meaning}</span>
                </div>
              ))}
            </div>
          </section>

          {/* WHY MARKETS WATCH YIELDS */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Why Markets Watch Treasury Yields
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Treasury Yields Connect to the Broader Market
            </h2>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {[
                ["Borrowing Costs", "Treasury yields can influence interest rates across many areas of the economy."],
                ["Stock Valuations", "Changes in yields can affect how investors value future company earnings."],
                ["Economic Expectations", "Yield movements can reflect changing expectations for growth and inflation."],
                ["Currencies", "Interest-rate expectations can influence demand for currencies and global capital flows."],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3"
                >
                  <p className="text-sm font-black text-white">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FINAL LESSON */}
          <section className="mt-6 border-t border-white/10 px-2 py-4">
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
              <p className="shrink-0 text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                Key Lesson
              </p>

              <p className="text-sm leading-5 text-zinc-400">
                Bonds are loans that can trade in financial markets. To
                understand them, look at the issuer, maturity, price, yield,
                interest-rate sensitivity, and credit risk together.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}