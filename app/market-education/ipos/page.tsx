"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function IPOsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black">IPOs</h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                Learn how companies go public, how IPO pricing works, what
                happens on listing day, and what risks investors should understand.
              </p>
            </div>

            <Link
              href="/market-education"
              className="rounded-xl border border-white/10 bg-[#111827] px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              ← Market Education
            </Link>
          </div>

          {/* WHAT IS AN IPO */}
          <section className="mt-8 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              What Is an IPO?
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              A Private Company Becomes Public
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
              An initial public offering, or IPO, is the process of offering
              shares of a private company to public investors for the first time.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["Private Company", "Shares are not broadly traded on a public exchange."],
                ["IPO", "Shares are offered to public investors."],
                ["Public Company", "Shares can trade on a public stock exchange."],
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

          {/* WHY GO PUBLIC */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Why Companies Go Public
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Public Markets Can Provide Access to Capital
            </h2>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["Raise Capital", "Companies can sell shares to raise money for growth, expansion, or other business needs."],
                ["Create Liquidity", "Early investors and employees may eventually gain a way to sell shares."],
                ["Increase Visibility", "Public companies can gain broader recognition and market access."],
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

          {/* HOW IPO WORKS */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              How an IPO Works
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              From Preparation to Public Trading
            </h2>

            <div className="mt-5 grid gap-3 md:grid-cols-4">
              {[
                ["01", "Preparation", "The company prepares financial disclosures and works with advisors."],
                ["02", "Valuation", "The company and underwriters estimate an appropriate valuation range."],
                ["03", "Pricing", "An IPO offer price is set before public trading begins."],
                ["04", "Listing", "Shares begin trading on a public exchange."],
              ].map(([step, title, description]) => (
                <div
                  key={step}
                  className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3"
                >
                  <p className="text-xs font-black text-zinc-600">{step}</p>
                  <p className="mt-1 text-sm font-black text-white">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* IPO PRICING */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              IPO Pricing
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Offer Price and Market Price Are Different
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
              The IPO offer price is the price assigned before public trading.
              Once shares begin trading, supply and demand determine the market price.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  IPO Offer Price
                </p>
                <p className="mt-1 text-xl font-black text-white">$20</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Opening Trade
                </p>
                <p className="mt-1 text-xl font-black text-white">$26</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Difference
                </p>
                <p className="mt-1 text-xl font-black text-white">+$6</p>
              </div>
            </div>

            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-zinc-500">
              Public investors may not always be able to buy shares at the original IPO offer price.
            </p>
          </section>

          {/* LISTING DAY */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Listing Day
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              The First Trading Day Can Be Volatile
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
              When public trading begins, buyers and sellers establish the first
              market prices. Heavy demand or limited supply can create large moves.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-sm font-black text-white">
                  Strong Demand
                </p>
                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  The opening price may trade above the IPO offer price.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-sm font-black text-white">
                  Weak Demand
                </p>
                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  The market price can fall toward or below the IPO offer price.
                </p>
              </div>
            </div>
          </section>

          {/* LOCKUPS */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Lockup Periods
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Some Insiders Cannot Sell Immediately
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
              IPO lockup agreements can temporarily restrict founders,
              employees, and early investors from selling certain shares.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["Before Expiration", "Some insider shares remain restricted from sale."],
                ["Expiration", "Restrictions on certain shares may end."],
                ["After Expiration", "More shares can potentially enter the public market."],
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

            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-zinc-500">
              Lockup expiration does not guarantee selling, but it can increase
              the number of shares that are eligible to be sold.
            </p>
          </section>

          {/* IPO RISKS */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              IPO Risks
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              New Public Companies Can Carry Extra Uncertainty
            </h2>

            <div className="mt-5 grid gap-x-8 gap-y-3 border-t border-white/10 pt-4 md:grid-cols-2">
              {[
                ["Limited Public History", "There may be less public trading history available for evaluation."],
                ["High Volatility", "Prices can move sharply as the market searches for a fair value."],
                ["Valuation Uncertainty", "Growth expectations can make valuation difficult to judge."],
                ["Early Selling Pressure", "More shares may become available after restrictions expire."],
                ["Business Risk", "Some newly public companies may still be unprofitable or rapidly changing."],
                ["Market Conditions", "Broader market sentiment can strongly affect IPO performance."],
              ].map(([title, description], index) => (
                <div key={title} className="flex gap-3">
                  <span className="text-xs font-black text-zinc-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <p className="text-sm font-black text-white">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EVALUATING IPO */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Evaluating an IPO
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Look Beyond the Listing-Day Excitement
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
              Evaluating an IPO still requires understanding the underlying business.
            </p>

            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <div className="grid grid-cols-[1fr_1.5fr] bg-[#111827] px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
                <span>Check</span>
                <span>Why It Matters</span>
              </div>

              {[
                ["Revenue", "Shows the scale and direction of company sales."],
                ["Profitability", "Shows whether the business is generating profit."],
                ["Growth", "Helps evaluate how quickly the company is expanding."],
                ["Debt", "Shows financial obligations and balance-sheet pressure."],
                ["Valuation", "Helps compare the market value with company fundamentals."],
                ["Use of Proceeds", "Explains how the company plans to use money raised in the IPO."],
              ].map(([label, meaning]) => (
                <div
                  key={label}
                  className="grid grid-cols-[1fr_1.5fr] border-t border-white/10 px-4 py-3 text-sm"
                >
                  <span className="font-bold text-white">{label}</span>
                  <span className="text-zinc-400">{meaning}</span>
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
                An IPO marks a company&apos;s transition to public ownership.
                The fact that a company is newly listed does not automatically
                make it a strong or weak investment—the business, valuation,
                risks, and financial condition still matter.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}