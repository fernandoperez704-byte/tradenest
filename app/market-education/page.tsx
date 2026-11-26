"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

const topics = [
{
  title: "Blockchain Technology",
  category: "crypto",
  description:
    "Understand how blockchain works, decentralization, network consensus, and real-world applications.",
  href: "/market-education/blockchain-technology",
  available: true,
  backgroundImage: "/market-education/blockchain-technology.png",
},
{
  title: "Stablecoins",
  category: "crypto",
  description:
    "Learn how stablecoins maintain their value, the different types, real-world uses, and important risks.",
  href: "/market-education/stablecoins",
  available: true,
  backgroundImage: "/market-education/stablecoins.png",
},

{
  title: "Cryptocurrency Wallets",
  category: "crypto",
  description:
    "Learn how crypto wallets work, wallet types, private keys, recovery methods, and security risks.",
  href: "/market-education/cryptocurrency-wallets",
  available: true,
  backgroundImage: "/market-education/cryptocurrency-wallets.png",
},

{
  title: "Tokenomics",
  category: "crypto",
  description:
    "Understand token supply, distribution, market capitalization, issuance, and economic incentives.",
  href: "/market-education/tokenomics",
  available: true,
  backgroundImage: "/market-education/tokenomics.png",
},

{
  title: "NFTs",
  category: "crypto",
  description:
    "Understand non-fungible tokens, digital ownership, minting, marketplaces, real-world applications, and risks.",
  href: "/market-education/nfts",
  available: true,
  backgroundImage: "/market-education/nfts.png",
},

{
  title: "Decentralized Finance (DeFi)",
  category: "crypto",
  description:
    "Learn how decentralized exchanges, liquidity pools, lending, borrowing, yield farming, and financial protocols work.",
  href: "/market-education/defi",
  available: true,
  backgroundImage: "/market-education/defi.png",
},

{
  title: "Bitcoin Halving",
  category: "crypto",
  description:
    "Understand Bitcoin halving, historical events, mining economics, issuance schedules, and market expectations.",
  href: "/market-education/bitcoin-halving",
  available: true,
  backgroundImage: "/market-education/bitcoin-halving.png",
},

{
  title: "Crypto Staking",
  category: "crypto",
  description:
    "Understand staking methods, validator rewards, withdrawal conditions, liquid staking, and financial risks.",
  href: "/market-education/crypto-staking",
  available: true,
  backgroundImage: "/market-education/crypto-staking.png",
},

{
  title: "Crypto Scams & Fraud",
  category: "crypto",
  description:
    "Understand cryptocurrency scams, fraudulent investment schemes, market manipulation, warning signs, and project verification.",
  href: "/market-education/crypto-scams",
  available: true,
  backgroundImage: "/market-education/crypto-scams.png",
},

{
  title: "Meme Coins",
  category: "crypto",
  description:
    "Understand meme coins, internet culture, community dynamics, speculative demand, popularity cycles, and financial risks.",
  href: "/market-education/meme-coins",
  available: true,
  backgroundImage: "/market-education/meme-coins.png",
},

{
  title: "Cryptocurrency White Papers",
  category: "crypto",
  description:
    "Learn how to interpret white papers, evaluate technical proposals, understand development roadmaps, and verify project claims.",
  href: "/market-education/white-papers",
  available: true,
  backgroundImage: "/market-education/white-papers.png",
},

{
  title: "Dividends",
  category: "stocks",
  description:
    "Learn how dividends work, payment schedules, important dates, dividend yield, payout ratios, and stability.",
  href: "/market-education/dividends",
  available: true,
  backgroundImage: "/market-education/dividends.png",
},
{
  title: "Earnings",
  category: "stocks",
  description:
    "Learn how revenue, profit, EPS, analyst expectations, guidance, and earnings reports affect how investors evaluate companies.",
  href: "/market-education/earnings",
  available: true,
   backgroundImage: "/market-education/earnings.png",

},
{
  title: "IPOs",
  category: "stocks",
  description:
    "IPO pricing, going public, listing day, lockups, and risks.",
  href: "/market-education/ipos",
  available: true,
  backgroundImage: "/market-education/ipos.png",
},
{
  title: "Fundamentals",
  category: "stocks",
  description:
    "Revenue, profit, cash flow, debt, EPS, P/E, and company health.",
  href: "/market-education/fundamentals",
  available: true,
  backgroundImage: "/market-education/fundamentals.png",
},
{
  title: "ETFs & Indexes",
  category: "stocks",
  description:
    "Diversification, expense ratios, sectors, ETFs, and major indexes.",
  href: "/market-education/etfs-indexes",
  available: true,
  backgroundImage: "/market-education/etfs-indexes.png",
},
{
  title: "Economic Events",
  category: "economic",
  description:
    "Inflation, interest rates, Fed decisions, jobs reports, and GDP.",
  href: "/market-education/economic-events",
  available: true,
  backgroundImage: "/market-education/economic-events.png",
},
{
  title: "Market Sectors",
  category: "stocks",
  description:
    "Technology, healthcare, financials, energy, consumer sectors, and sector rotation.",
  href: "/market-education/market-sectors",
  available: true,
  backgroundImage: "/market-education/market-sectors.png",
},
{
  title: "Stock Splits & Buybacks",
  category: "stocks",
  description:
    "Stock splits, reverse splits, share buybacks, and shares outstanding.",
  href: "/market-education/stock-splits-buybacks",
  available: true,
  backgroundImage: "/market-education/stock-splits-buybacks.png",
},

{
  title: "Bonds & Treasuries",
  category: "economic",
  description:
    "Bonds, Treasury securities, yields, maturity, interest rates, and bond prices.",
  href: "/market-education/bonds-treasuries",
  available: true,
  backgroundImage: "/market-education/bonds-treasuries.png",
},


];

export default function MarketEducationPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "crypto", title: "Crypto Market" },
    { id: "stocks", title: "Stock Market" },
    { id: "economic", title: "Economic Calendar" },
  ];

  const visibleCategories =
    selectedCategory === "all"
      ? categories
      : categories.filter((category) => category.id === selectedCategory);

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100dvh-64px)] bg-black px-6 py-8 text-white xl:px-10">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col">
          <div className="sticky top-0 z-50 bg-black pb-4">
            <div className="text-center">
              <h1 className="text-4xl font-black text-white">
                Market Education
            </h1>

            <p className="mx-auto mt-2 max-w-2xl text-sm text-zinc-400">
              Learn how companies, investments, and financial markets work.
            </p>
          </div>


          {/* CATEGORY NAVIGATION */}
          <div className="mt-8 grid grid-cols-4 gap-1.5 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
            {[
              { id: "all", title: "All Lessons" },
              { id: "crypto", title: "Crypto Market" },
              { id: "stocks", title: "Stock Market" },
              { id: "economic", title: "Economic Calendar" },
            ].map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                aria-pressed={selectedCategory === category.id}
                className={`flex min-w-0 items-center justify-center whitespace-nowrap rounded-lg border px-0.5 py-3 text-[11px] font-bold tracking-tight transition-all duration-200 sm:rounded-xl sm:px-5 sm:text-sm sm:tracking-normal ${
                  selectedCategory === category.id
                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                    : "border-white/10 bg-[#111827] text-zinc-400 hover:border-white/30 hover:text-white"
                }`}
              >
                {category.id === "economic" ? (
                  <>
                    <span className="sm:hidden">Economy</span>
                    <span className="hidden sm:inline">Economic Calendar</span>
                  </>
                ) : (
                  category.title
                )}
              </button>
            ))}

          </div>
          </div>

          <div className="mt-6 border-t border-white/20 pt-8">
            <div className="grid w-full content-start auto-rows-max gap-10">

{visibleCategories.map((category, index) => (
  <section
    key={category.id}
    className={`space-y-4 ${
      index > 0 ? "border-t border-white/10 pt-8" : ""
    }`}
  >
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h2 className="text-2xl font-black text-white">
        {category.title}
      </h2>


    </div>

    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
    {topics
      .filter((topic) => topic.category === category.id)
      .map((topic) =>
  topic.available ? (
    <Link
      key={topic.title}
      href={topic.href}
      className="group relative flex min-h-[48px] flex-col justify-center border-b border-white/10 bg-transparent bg-[length:0_0] bg-no-repeat px-1 py-3 transition-all duration-200 hover:text-cyan-400 sm:h-[175px] sm:justify-end sm:overflow-hidden sm:rounded-xl sm:border sm:border-white/10 sm:bg-cover sm:bg-center sm:p-4 sm:hover:-translate-y-1 sm:hover:border-cyan-400/50"
      style={
        topic.backgroundImage
          ? {
              backgroundImage: `linear-gradient(
                to top,
                rgba(0, 0, 0, 0.98) 0%,
                rgba(0, 0, 0, 0.85) 25%,
                rgba(0, 0, 0, 0.25) 65%,
                rgba(0, 0, 0, 0.05) 100%
              ), url("${topic.backgroundImage}")`,
            }
          : undefined
      }
    >

      <h3 className="text-base font-black text-white">
        {topic.title}
      </h3>


    </Link>
  ) : (
    <div
      key={topic.title}
      className="relative flex min-h-[200px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a] p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-black text-white">
          {topic.title}
        </h2>

        <span className="shrink-0 rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-black text-zinc-500">
          COMING SOON
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        {topic.description}
      </p>

      <div className="mt-auto pt-5">
        <span className="text-xs font-bold text-zinc-600">
          Coming soon
        </span>
      </div>
    </div>
      )
    )}
    </div>

  </section>

))}
            </div>
          </div>

        </div>
        <style jsx global>{`
          .market-lessons-scroll {
            scrollbar-width: thin;
            scrollbar-color: #475569 transparent;
          }

          .market-lessons-scroll::-webkit-scrollbar {
            width: 6px;
          }

          .market-lessons-scroll::-webkit-scrollbar-track {
            background: transparent;
          }

          .market-lessons-scroll::-webkit-scrollbar-thumb {
            background: #475569;
            border-radius: 999px;
          }

          .market-lessons-scroll::-webkit-scrollbar-thumb:hover {
            background: #64748b;
          }
        `}</style>
      </main>
    </>
  );
}