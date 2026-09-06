"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function MarketSectorsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* HEADER */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black">Market Sectors</h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                Learn how the stock market is divided into sectors, how different
                industries behave, and why sector leadership changes over time.
              </p>
            </div>

            <Link
              href="/market-education"
              className="rounded-xl border border-white/10 bg-[#111827] px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              ← Market Education
            </Link>
          </div>

          {/* WHAT ARE MARKET SECTORS */}
          <section className="mt-8 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              What Are Market Sectors?
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Companies Are Grouped by What They Do
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
              Market sectors group companies with similar business activities.
              This helps investors compare industries and understand which parts
              of the economy are leading or weakening.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["Sector", "A broad group of companies with similar business activity."],
                ["Industry", "A more specific group inside a sector."],
                ["Sector Performance", "Shows how one area of the market is performing relative to others."],
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

          {/* 11 MARKET SECTORS */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              The 11 Market Sectors
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Different Parts of the Economy
            </h2>

            <div className="mt-5 grid gap-x-8 gap-y-3 border-t border-white/10 pt-4 md:grid-cols-2">
              {[
                ["Technology", "Software, semiconductors, hardware, and IT services."],
                ["Healthcare", "Pharmaceuticals, biotech, medical devices, and healthcare services."],
                ["Financials", "Banks, insurance companies, brokers, and financial services."],
                ["Consumer Discretionary", "Non-essential products such as autos, retail, and entertainment."],
                ["Consumer Staples", "Essential products such as food, beverages, and household goods."],
                ["Energy", "Oil, natural gas, drilling, and energy services."],
                ["Industrials", "Manufacturing, transportation, aerospace, and machinery."],
                ["Materials", "Chemicals, metals, mining, packaging, and construction materials."],
                ["Utilities", "Electricity, natural gas, and water utilities."],
                ["Real Estate", "Property companies and real estate investment trusts."],
                ["Communication Services", "Telecom, media, entertainment, and digital communication companies."],
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

          {/* CYCLICAL VS DEFENSIVE */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Cyclical vs. Defensive
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Some Sectors React More to the Economy Than Others
            </h2>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-sm font-black text-white">
                  Cyclical Sectors
                </p>

                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Tend to be more sensitive to economic growth and consumer
                  spending. Examples include consumer discretionary, industrials,
                  financials, and materials.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
                <p className="text-sm font-black text-white">
                  Defensive Sectors
                </p>

                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Tend to provide products and services people continue using
                  even when economic growth slows. Examples include utilities,
                  consumer staples, and healthcare.
                </p>
              </div>
            </div>

            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-zinc-500">
              These are broad tendencies, not guarantees. Individual companies
              inside the same sector can behave very differently.
            </p>
          </section>

          {/* SECTOR PERFORMANCE */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Sector Performance
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Not Every Part of the Market Moves Together
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
              Investors compare sectors to see which areas are outperforming or
              underperforming the broader market.
            </p>

            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <div className="grid grid-cols-[1.2fr_1fr_1.5fr] bg-[#111827] px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
                <span>Sector</span>
                <span>Example Move</span>
                <span>Possible Driver</span>
              </div>

              {[
                ["Technology", "+8%", "Strong earnings or growth expectations"],
                ["Energy", "+5%", "Higher oil and gas prices"],
                ["Utilities", "-2%", "Changing interest-rate expectations"],
                ["Consumer Discretionary", "-4%", "Weak consumer spending expectations"],
              ].map(([sector, move, driver]) => (
                <div
                  key={sector}
                  className="grid grid-cols-[1.2fr_1fr_1.5fr] border-t border-white/10 px-4 py-3 text-sm"
                >
                  <span className="font-bold text-white">{sector}</span>
                  <span className="font-bold text-white">{move}</span>
                  <span className="text-zinc-400">{driver}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTOR ROTATION */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Sector Rotation
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Market Leadership Can Change
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-400">
              Sector rotation describes money shifting between different areas
              of the market as expectations for growth, inflation, interest
              rates, and risk change.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-4">
              {[
                ["01", "Expectations Change", "Economic or market expectations begin to shift."],
                ["02", "Capital Moves", "Investors increase or reduce exposure to certain sectors."],
                ["03", "Leadership Changes", "Some sectors begin outperforming others."],
                ["04", "Market Reprices", "Relative sector performance adjusts to the new environment."],
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

          {/* WHAT CAN AFFECT SECTORS */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              What Affects Sectors?
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Different Sectors Respond to Different Forces
            </h2>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["Interest Rates", "Can affect borrowing costs, valuations, banks, utilities, and real estate."],
                ["Commodity Prices", "Can strongly influence energy and materials companies."],
                ["Consumer Spending", "Can affect retailers, travel companies, restaurants, and other consumer businesses."],
                ["Economic Growth", "Can influence industrials, financials, materials, and cyclical businesses."],
                ["Technology Trends", "Can create growth opportunities or disrupt existing industries."],
                ["Government Policy", "Regulation, taxes, and spending can affect certain sectors differently."],
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

          {/* COMPARING SECTORS */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#020617] px-6 py-5 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
              Comparing Sectors
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Look at More Than Price Performance
            </h2>

            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <div className="grid grid-cols-[1fr_1.5fr] bg-[#111827] px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
                <span>Check</span>
                <span>Why It Matters</span>
              </div>

              {[
                ["Relative Performance", "Shows whether the sector is leading or lagging the broader market."],
                ["Earnings Growth", "Shows whether companies in the sector are improving financially."],
                ["Valuation", "Helps determine how much investors are paying for sector earnings or assets."],
                ["Economic Sensitivity", "Shows how dependent the sector may be on economic conditions."],
                ["Sector Weight", "Shows how much influence the sector has inside a broad market index."],
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
                The stock market is made up of different sectors, and leadership
                changes as economic conditions and investor expectations change.
                Understanding sectors helps explain what is driving the broader market.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}