"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/Navbar";


export default function LearnPage() {
  const [activeLesson, setActiveLesson] = useState("roadmap");
  const [selectedAsset, setSelectedAsset] = useState("stocks");
  const [selectedJourney, setSelectedJourney] = useState("crypto");
 const lessons = [
  { id: "roadmap", label: "Beginner Introduction" },

  { id: "buying", label: "What Are You Buying?" },

  { id: "market", label: "How The Market Works" },

  { id: "orders", label: "Market vs Limit Orders" },

  { id: "risk", label: "Protecting Your Capital" },

  { id: "timeframes", label: "Trading Timeframes" },

  { id: "candlesticks", label: "Candlestick Basics" },

  { id: "volume", label: "Volume Basics" },

  { id: "support", label: "Support & Resistance" },

  { id: "supplydemand", label: "Supply & Demand" },

  { id: "trends", label: "Market Trends" },

  { id: "technical", label: "Reading The Charts" },

  { id: "breakouts", label: "Breakouts vs Fakeouts" },

  { id: "setups", label: "Building A Trade Plan" },

  { id: "mistakes", label: "Common Beginner Mistakes" },

  { id: "psychology", label: "Trading Psychology" },

  { id: "longshort", label: "Bullish vs Bearish Trading" },

  { id: "vocabulary", label: "Essential Trading Terms" },

  { id: "quiz", label: "Trader Checkpoint" },

  { id: "practice", label: "TradeNestX Simulator Guide" },

  { id: "account", label: "Going Live" },
];
const activeLessonIndex = lessons.findIndex(
  (lesson) => lesson.id === activeLesson
);
  return (
    <>
      <Navbar />

      <main className="page-shell">
        <div className="page-container max-w-[1500px] 2xl:max-w-[1700px]">
  <div className="mt-6 grid grid-cols-1 xl:grid-cols-[240px_minmax(0,1fr)] 2xl:grid-cols-[280px_minmax(0,1fr)] gap-6 2xl:gap-8">
         <aside className="bg-[#111827] border border-zinc-700 rounded-2xl p-4 xl:sticky xl:top-24 h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide">
  <p className="text-sm font-black tracking-wide text-zinc-500 mb-4">
    LESSONS
  </p>

  <div className="space-y-2">
    {lessons.map((lesson) => (
      <button
        key={lesson.id}
        onClick={() => setActiveLesson(lesson.id)}
       className={`group relative w-full overflow-hidden rounded-2xl border px-4 py-4 text-left text-sm font-black tracking-wide transition-all duration-300 ${
  activeLesson === lesson.id
    ? "border-cyan-400 bg-cyan-400 text-black shadow-[0_0_25px_rgba(34,211,238,0.35)]"
    : "border-white/5 bg-[#0f172a] text-zinc-400 hover:border-cyan-400/30 hover:bg-[#131c2b] hover:text-cyan-300"
}`}
      >
        <div className="flex items-center justify-between">

  <span>
    {lesson.label}
  </span>

  <span
    className={`text-xs transition-all duration-300 ${
      activeLesson === lesson.id
        ? "text-black"
        : "text-zinc-600 group-hover:text-cyan-400"
    }`}
  >
    →
  </span>

</div>
      </button>
    ))}
  </div>
</aside>

<section className="min-w-0 h-[calc(100vh-120px)] overflow-y-auto pr-2 scrollbar-hide">
          
      
{activeLesson === "roadmap" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">
  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
  <span className="text-cyan-300">
    Welcome To
  </span>{" "}

  <span className="text-white">
    TradeNest
  </span>

  <span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]">
    X
  </span>
</h2>

  <p className="mt-4 max-w-4xl text-lg leading-8 text-zinc-400">
  A beginner-friendly trading academy built to help you learn the markets, practice safely, and build confidence before risking real money.
</p>

<div className="mt-8 grid gap-6">

  <div className="rounded-[28px] border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 via-[#131722] to-[#0f172a] p-7 backdrop-blur-sm">

   

    <h3 className="mt-4 text-xl md:text-2xl font-black leading-tight text-white">
  Build Real Trading Skills Without The Real Risk.
</h3>

    <p className="mt-5 max-w-5xl text-[17px] leading-8 text-zinc-300">
      Most beginners fail because they jump into live markets too quickly without understanding risk management, psychology, or market structure.
    </p>

    <p className="mt-5 max-w-5xl text-[17px] leading-8 text-zinc-400">
      TradeNestX gives beginners a safer way to learn through structured lessons, guided practice, and a realistic trading simulator designed to build confidence step by step.
    </p>

  </div>

 <div className="mt-10">

  <div className="flex items-center gap-3">
    <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.9)]" />

    <p className="text-sm font-black tracking-[0.25em] text-cyan-400">
      CHOOSE YOUR TRADING JOURNEY
    </p>
  </div>

  <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-4 gap-6">

    {[
      {
        id: "crypto",
        title: "Crypto",
        color: "text-orange-400",
        desc: "Fast-moving digital markets",
      },
      {
        id: "stocks",
        title: "Stocks",
        color: "text-cyan-400",
        desc: "Trade public companies",
      },
      {
        id: "daytrading",
        title: "Day Trading",
        color: "text-green-400",
        desc: "Short-term market moves",
      },
      {
        id: "swing",
        title: "Swing Trading",
        color: "text-red-400",
        desc: "Longer-term trend trading",
      },
    ].map((journey) => (
      <button
        key={journey.id}
        onClick={() => setSelectedJourney(journey.id)}
        className={`rounded-[28px] border p-7 text-left transition-all duration-300 ease-out hover:-translate-y-[4px] ${
          selectedJourney === journey.id
            ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
            : "border-white/5 bg-[#18181b] hover:border-cyan-400/30 hover:bg-[#1a1f2e]"
        }`}
      >
        <h3 className={`text-2xl font-black ${journey.color}`}>
          {journey.title}
        </h3>

        <p className="mt-3 text-zinc-400 leading-7">
          {journey.desc}
        </p>
      </button>
    ))}

  </div>

  <div className="mt-10 rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#111827] to-[#0f172a] p-8">

    {selectedJourney === "crypto" && (
      <div className="grid lg:grid-cols-2 gap-10 items-center">

        <div>
          <p className="text-sm font-black tracking-[0.25em] text-orange-400">
            CRYPTO MARKETS
          </p>

          <h3 className="mt-4 text-4xl font-black text-white leading-tight">
            Trade Fast-Moving Digital Assets
          </h3>

          <p className="mt-5 text-zinc-300 text-[17px] leading-8">
            Crypto markets operate 24/7 and are known for strong volatility, momentum, and rapid price movement.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">

            <p>• Open 24 hours a day</p>

            <p>• Higher volatility than stocks</p>

            <p>• Popular with beginner traders</p>

            <p>• Strong momentum opportunities</p>

          </div>
        </div>

        <div className="rounded-[28px] border border-orange-500/20 bg-[#050816] p-8">
          <div className="h-56 rounded-[24px] border border-white/5 bg-[#0f172a] flex items-center justify-center">

            <div className="h-36 w-36 rounded-full border-4 border-orange-400 flex items-center justify-center text-orange-400 text-6xl font-black shadow-[0_0_40px_rgba(251,146,60,0.25)]">
              ₿
            </div>

          </div>

          <p className="mt-5 text-center text-zinc-400 font-bold">
            High volatility digital market
          </p>
        </div>

      </div>
    )}

    {selectedJourney === "stocks" && (
      <div className="grid lg:grid-cols-2 gap-10 items-center">

        <div>
          <p className="text-sm font-black tracking-[0.25em] text-cyan-400">
            STOCK MARKET
          </p>

          <h3 className="mt-4 text-4xl font-black text-white leading-tight">
            Trade Public Companies
          </h3>

          <p className="mt-5 text-zinc-300 text-[17px] leading-8">
            Stock traders buy and sell shares in companies like Apple, Tesla, Nvidia, and Amazon.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">

            <p>• Company ownership shares</p>

            <p>• News and earnings affect prices</p>

            <p>• Popular long-term investment market</p>

            <p>• Structured market hours</p>

          </div>
        </div>

        <div className="rounded-[28px] border border-cyan-500/20 bg-[#050816] p-8">

          <div className="h-56 rounded-[24px] border border-white/5 bg-[#0f172a] flex items-end gap-4 px-8 py-6">

            <div className="w-12 h-20 rounded-t-xl bg-cyan-400" />
            <div className="w-12 h-32 rounded-t-xl bg-cyan-400" />
            <div className="w-12 h-24 rounded-t-xl bg-cyan-400" />
            <div className="w-12 h-40 rounded-t-xl bg-cyan-400" />
            <div className="w-12 h-36 rounded-t-xl bg-cyan-400" />

          </div>

          <p className="mt-5 text-center text-zinc-400 font-bold">
            Company growth over time
          </p>

        </div>

      </div>
    )}

    {selectedJourney === "daytrading" && (
      <div className="grid lg:grid-cols-2 gap-10 items-center">

        <div>
          <p className="text-sm font-black tracking-[0.25em] text-green-400">
            DAY TRADING
          </p>

          <h3 className="mt-4 text-4xl font-black text-white leading-tight">
            Fast Short-Term Trading
          </h3>

          <p className="mt-5 text-zinc-300 text-[17px] leading-8">
            Day traders open and close positions within the same day while focusing on momentum and short-term movement.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">

            <p>• Fast-paced environment</p>

            <p>• Lower timeframe charts</p>

            <p>• Requires discipline and focus</p>

            <p>• Strong risk management needed</p>

          </div>
        </div>

        <div className="rounded-[28px] border border-green-500/20 bg-[#050816] p-8">

          <div className="h-56 rounded-[24px] border border-white/5 bg-[#0f172a] flex items-center justify-center">

            <div className="flex gap-3 items-end">
              <div className="w-6 h-16 bg-green-400 rounded-t-md" />
              <div className="w-6 h-28 bg-green-400 rounded-t-md" />
              <div className="w-6 h-20 bg-green-400 rounded-t-md" />
              <div className="w-6 h-36 bg-green-400 rounded-t-md" />
              <div className="w-6 h-24 bg-green-400 rounded-t-md" />
              <div className="w-6 h-40 bg-green-400 rounded-t-md" />
            </div>

          </div>

          <p className="mt-5 text-center text-zinc-400 font-bold">
            Rapid intraday movement
          </p>

        </div>

      </div>
    )}

    {selectedJourney === "swing" && (
      <div className="grid lg:grid-cols-2 gap-10 items-center">

        <div>
          <p className="text-sm font-black tracking-[0.25em] text-red-400">
            SWING TRADING
          </p>

          <h3 className="mt-4 text-4xl font-black text-white leading-tight">
            Capture Larger Market Trends
          </h3>

          <p className="mt-5 text-zinc-300 text-[17px] leading-8">
            Swing traders hold trades longer and focus on broader trend movement instead of fast scalping.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">

            <p>• Longer-term positions</p>

            <p>• Higher timeframe analysis</p>

            <p>• Slower trading pace</p>

            <p>• Focus on trend structure</p>

          </div>
        </div>

        <div className="rounded-[28px] border border-red-500/20 bg-[#050816] p-8">

          <div className="h-56 rounded-[24px] border border-white/5 bg-[#0f172a] flex items-end gap-4 px-8 py-6">

            <div className="w-10 h-12 rounded-t-xl bg-red-400" />
            <div className="w-10 h-20 rounded-t-xl bg-red-400" />
            <div className="w-10 h-28 rounded-t-xl bg-red-400" />
            <div className="w-10 h-36 rounded-t-xl bg-red-400" />
            <div className="w-10 h-48 rounded-t-xl bg-red-400" />

          </div>

          <p className="mt-5 text-center text-zinc-400 font-bold">
            Longer-term trend structure
          </p>

        </div>

      </div>
    )}

  </div>

</div>
</div>
<div className="mt-12 rounded-[32px] border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-[#111827] to-[#0f172a] p-8">

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

    <div>

      <p className="text-sm font-black tracking-[0.25em] text-cyan-400">
        NEXT LESSON
      </p>

      <h3 className="mt-3 text-3xl font-black text-white">
        What Are You Buying?
      </h3>

      <p className="mt-4 max-w-2xl text-zinc-400 text-[17px] leading-8">
        Learn the difference between stocks, crypto, ETFs, and forex before entering the markets.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">

      

      </div>

    </div>

    <button
      onClick={() => setActiveLesson("buying")}
      className="rounded-[24px] bg-cyan-500 px-8 py-5 text-lg font-black text-black transition-all duration-300 ease-out hover:-translate-y-[4px] hover:bg-cyan-400 hover:shadow-[0_0_35px_rgba(34,211,238,0.35)]"
    >
      Continue Learning →
    </button>

  </div>

</div>
</div>
)}
{activeLesson === "buying" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
    What Are You Buying?
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Before trading anything, beginners should understand what type of asset they are actually buying or selling.
  </p>

  <div className="mt-10 grid md:grid-cols-2 gap-6">

    {[
      {
        id: "stocks",
        title: "Stocks",
        color: "text-cyan-400",
        border: "border-cyan-500/30",
        text: "Stocks represent ownership in a company. When you buy a stock, you are buying a small piece of that business.",
      },
      {
        id: "crypto",
        title: "Crypto",
        color: "text-orange-400",
        border: "border-orange-500/30",
        text: "Crypto assets trade 24/7 and can move quickly. They are known for volatility and fast price swings.",
      },
      {
        id: "etfs",
        title: "ETFs",
        color: "text-green-400",
        border: "border-green-500/30",
        text: "ETFs are baskets of assets grouped together. They let traders buy exposure to multiple stocks or sectors at once.",
      },
      {
        id: "forex",
        title: "Forex",
        color: "text-red-400",
        border: "border-red-500/30",
        text: "Forex means trading currencies. Traders watch exchange rates between global economies.",
      },
    ].map((asset) => (
      <button
        key={asset.id}
        onClick={() => setSelectedAsset(asset.id)}
        className={`text-left rounded-[28px] border bg-[#18181b] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] ${
          selectedAsset === asset.id
            ? `${asset.border} shadow-[0_0_30px_rgba(34,211,238,0.12)]`
            : "border-white/5 hover:border-cyan-400/30"
        }`}
      >
        <h3 className={`text-2xl font-black ${asset.color}`}>
          {asset.title}
        </h3>

        <p className="mt-4 text-zinc-300 text-[17px] leading-8">
          {asset.text}
        </p>
      </button>
    ))}

  </div>

  <div className="mt-10 rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#111827] to-[#0f172a] p-8">

    <p className="text-sm font-black tracking-[0.25em] text-cyan-400">
      VISUAL EXPLANATION
    </p>

    {selectedAsset === "stocks" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            Stocks = Ownership In A Company
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            When you buy a stock, you are buying a share of a company. Traders watch price movement, news, earnings, and market trends.
          </p>
        </div>

        <div className="rounded-[28px] border border-cyan-500/20 bg-[#050816] p-6">
          <div className="h-44 rounded-2xl bg-[#0f172a] border border-white/5 flex items-end gap-3 px-6 py-5">
            <div className="w-10 h-16 bg-cyan-400 rounded-t-lg"></div>
            <div className="w-10 h-24 bg-cyan-400 rounded-t-lg"></div>
            <div className="w-10 h-20 bg-cyan-400 rounded-t-lg"></div>
            <div className="w-10 h-32 bg-cyan-400 rounded-t-lg"></div>
            <div className="w-10 h-28 bg-cyan-400 rounded-t-lg"></div>
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Company value moving over time
          </p>
        </div>
      </div>
    )}

    {selectedAsset === "crypto" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            Crypto = Digital Asset Trading
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Crypto markets are open all day and all night. Prices can move fast, so risk management is very important.
          </p>
        </div>

        <div className="rounded-[28px] border border-orange-500/20 bg-[#050816] p-6">
          <div className="h-44 rounded-2xl bg-[#0f172a] border border-white/5 flex items-center justify-center">
            <div className="h-28 w-28 rounded-full border-4 border-orange-400 flex items-center justify-center text-orange-400 text-4xl font-black shadow-[0_0_30px_rgba(251,146,60,0.25)]">
              ₿
            </div>
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Fast-moving digital market
          </p>
        </div>
      </div>
    )}

    {selectedAsset === "etfs" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            ETFs = A Basket Of Assets
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            ETFs can hold many companies inside one product. This can make them useful for learning broad market movement.
          </p>
        </div>

        <div className="rounded-[28px] border border-green-500/20 bg-[#050816] p-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl bg-green-500/20 border border-green-400/30 p-5 text-center text-green-400 font-black">AAPL</div>
            <div className="rounded-2xl bg-green-500/20 border border-green-400/30 p-5 text-center text-green-400 font-black">MSFT</div>
            <div className="rounded-2xl bg-green-500/20 border border-green-400/30 p-5 text-center text-green-400 font-black">NVDA</div>
            <div className="rounded-2xl bg-green-500/20 border border-green-400/30 p-5 text-center text-green-400 font-black">TSLA</div>
            <div className="rounded-2xl bg-green-500/20 border border-green-400/30 p-5 text-center text-green-400 font-black">META</div>
            <div className="rounded-2xl bg-green-500/20 border border-green-400/30 p-5 text-center text-green-400 font-black">AMZN</div>
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Many assets inside one product
          </p>
        </div>
      </div>
    )}

    {selectedAsset === "forex" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            Forex = Currency vs Currency
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Forex traders compare one currency against another, like the U.S. dollar versus the euro.
          </p>
        </div>

        <div className="rounded-[28px] border border-red-500/20 bg-[#050816] p-6">
          <div className="flex items-center justify-center gap-6 h-44">
            <div className="h-24 w-24 rounded-full bg-red-500/20 border border-red-400/40 flex items-center justify-center text-red-400 text-3xl font-black">
              USD
            </div>

            <div className="text-zinc-500 text-3xl font-black">
              /
            </div>

            <div className="h-24 w-24 rounded-full bg-red-500/20 border border-red-400/40 flex items-center justify-center text-red-400 text-3xl font-black">
              EUR
            </div>
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            One currency compared to another
          </p>
        </div>
      </div>
    )}

  </div>

</div>
)}

{activeLesson === "market" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
    How The Market Works
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Markets move because buyers and sellers constantly compete to control price.
  </p>

  <div className="mt-10 space-y-6">

    <div className="rounded-[28px] border border-white/5 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-cyan-400">
        Buyers vs Sellers
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        Price moves higher when buyers become more aggressive than sellers. Price falls when sellers take control.
      </p>
    </div>

    <div className="rounded-[28px] border border-white/5 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-green-400">
        Supply And Demand
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        Markets react to supply and demand. Strong demand can push prices higher while excess supply can push prices lower.
      </p>
    </div>

    <div className="rounded-[28px] border border-white/5 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-orange-400">
        Volatility
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        Volatility measures how aggressively price moves. Higher volatility often creates larger trading opportunities and higher risk.
      </p>
    </div>

  </div>
</div>
)}

{activeLesson === "orders" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
    Market vs Limit Orders
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Understanding order types helps traders control entries, exits, and execution.
  </p>

  <div className="mt-10 grid md:grid-cols-2 gap-6">

    <div className="rounded-[28px] border border-green-500/20 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-green-400">
        Market Orders
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        A market order executes immediately at the current market price.
      </p>
    </div>

    <div className="rounded-[28px] border border-cyan-500/20 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-cyan-400">
        Limit Orders
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        A limit order allows traders to choose a specific entry or exit price before the order executes.
      </p>
    </div>

  </div>
</div>
)}
{activeLesson === "candlesticks" && (
<div className="mt-14 bg-[#131722] rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <div className="flex items-center gap-3">
    <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.9)]" />

    <p className="text-sm font-black tracking-[0.25em] text-cyan-400">
      MARKET FOUNDATIONS
    </p>
  </div>

  <h2 className="mt-5 text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
    Candlestick Basics
  </h2>

  <p className="text-zinc-500 text-lg mt-4 leading-8 max-w-4xl">
    Candlesticks help traders understand price movement, momentum, and market psychology by showing how buyers and sellers behaved during a specific period of time.
  </p>

  <div className="mt-12 grid xl:grid-cols-[1.1fr_0.9fr] gap-8">

    <div className="rounded-[32px] border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 via-[#131722] to-[#0f172a] p-8">

      <h3 className="text-3xl font-black text-white">
        Candle Anatomy
      </h3>

      <p className="mt-4 text-zinc-400 text-[17px] leading-8">
        Every candlestick contains four important pieces of information traders use to analyze market movement.
      </p>

      <div className="mt-8 space-y-5">

        <div className="rounded-2xl border border-white/5 bg-[#0f172a] p-5">
          <p className="text-cyan-400 font-black text-lg">
            Open Price
          </p>

          <p className="mt-2 text-zinc-300 leading-7">
            The price where the candle started trading.
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#0f172a] p-5">
          <p className="text-green-400 font-black text-lg">
            Close Price
          </p>

          <p className="mt-2 text-zinc-300 leading-7">
            The final trading price before the candle closes.
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#0f172a] p-5">
          <p className="text-orange-400 font-black text-lg">
            High Price
          </p>

          <p className="mt-2 text-zinc-300 leading-7">
            The highest price reached during the candle.
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#0f172a] p-5">
          <p className="text-red-400 font-black text-lg">
            Low Price
          </p>

          <p className="mt-2 text-zinc-300 leading-7">
            The lowest price reached during the candle.
          </p>
        </div>

      </div>
    </div>

    <div className="rounded-[32px] border border-white/5 bg-[#18181b] p-8 flex flex-col justify-center items-center">

      <p className="text-sm font-black tracking-[0.25em] text-zinc-500">
        BASIC CANDLE STRUCTURE
      </p>

      <div className="mt-10 flex items-end gap-20">

        <div className="flex flex-col items-center">
          <div className="w-[2px] h-20 bg-green-400" />

          <div className="w-16 h-40 rounded-md bg-green-400 shadow-[0_0_25px_rgba(34,197,94,0.35)]" />

          <div className="w-[2px] h-16 bg-green-400" />

          <p className="mt-5 text-green-400 font-black">
            Bullish
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-[2px] h-20 bg-red-400" />

          <div className="w-16 h-40 rounded-md bg-red-400 shadow-[0_0_25px_rgba(248,113,113,0.35)]" />

          <div className="w-[2px] h-16 bg-red-400" />

          <p className="mt-5 text-red-400 font-black">
            Bearish
          </p>
        </div>

      </div>

      <p className="mt-10 text-center text-zinc-400 leading-7 max-w-md">
        Green candles usually represent buying pressure while red candles represent selling pressure.
      </p>

    </div>

  </div>

  <div className="mt-14">

    <h3 className="text-3xl font-black text-white">
      Common Candlestick Patterns
    </h3>

    <p className="mt-4 text-zinc-500 text-lg leading-8 max-w-3xl">
      Traders use candlestick patterns to identify possible reversals, momentum shifts, and market indecision.
    </p>

    <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6">

      <div className="rounded-[28px] border border-cyan-500/10 bg-[#18181b] p-7 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-[3px]">
        <h4 className="text-2xl font-black text-cyan-400">
          Doji
        </h4>

        <p className="mt-4 text-zinc-300 leading-8">
          A doji shows strong indecision between buyers and sellers.
        </p>
      </div>

      <div className="rounded-[28px] border border-orange-500/10 bg-[#18181b] p-7 hover:border-orange-400/40 transition-all duration-300 hover:-translate-y-[3px]">
        <h4 className="text-2xl font-black text-orange-400">
          Hammer
        </h4>

        <p className="mt-4 text-zinc-300 leading-8">
          A hammer can signal a possible bullish reversal after heavy selling.
        </p>
      </div>

      <div className="rounded-[28px] border border-red-500/10 bg-[#18181b] p-7 hover:border-red-400/40 transition-all duration-300 hover:-translate-y-[3px]">
        <h4 className="text-2xl font-black text-red-400">
          Shooting Star
        </h4>

        <p className="mt-4 text-zinc-300 leading-8">
          A shooting star may signal bearish weakness after a strong move higher.
        </p>
      </div>

      <div className="rounded-[28px] border border-green-500/10 bg-[#18181b] p-7 hover:border-green-400/40 transition-all duration-300 hover:-translate-y-[3px]">
        <h4 className="text-2xl font-black text-green-400">
          Bullish Engulfing
        </h4>

        <p className="mt-4 text-zinc-300 leading-8">
          A bullish engulfing pattern may signal buyers taking control.
        </p>
      </div>

      <div className="rounded-[28px] border border-red-500/10 bg-[#18181b] p-7 hover:border-red-400/40 transition-all duration-300 hover:-translate-y-[3px]">
        <h4 className="text-2xl font-black text-red-400">
          Bearish Engulfing
        </h4>

        <p className="mt-4 text-zinc-300 leading-8">
          A bearish engulfing pattern may signal increasing selling pressure.
        </p>
      </div>

      <div className="rounded-[28px] border border-yellow-500/10 bg-[#18181b] p-7 hover:border-yellow-400/40 transition-all duration-300 hover:-translate-y-[3px]">
        <h4 className="text-2xl font-black text-yellow-400">
          Spinning Top
        </h4>

        <p className="mt-4 text-zinc-300 leading-8">
          A spinning top shows market hesitation and balanced pressure.
        </p>
      </div>

    </div>
  </div>

</div>
)}
{activeLesson === "timeframes" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
    Trading Timeframes
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Different timeframes help traders analyze short-term and long-term market movement.
  </p>

  <div className="mt-10 grid md:grid-cols-2 gap-6">

    <div className="rounded-[28px] border border-cyan-500/10 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-cyan-400">
        1 Minute Charts
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        Very fast-moving charts commonly used by scalpers and active day traders.
      </p>
    </div>

    <div className="rounded-[28px] border border-green-500/10 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-green-400">
        5 Minute Charts
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        Popular for intraday trading and identifying short-term momentum.
      </p>
    </div>

    <div className="rounded-[28px] border border-orange-500/10 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-orange-400">
        1 Hour Charts
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        Useful for swing traders looking for cleaner trend structure.
      </p>
    </div>

    <div className="rounded-[28px] border border-red-500/10 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-red-400">
        Daily Charts
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        Daily charts help traders focus on larger market trends and long-term structure.
      </p>
    </div>

  </div>
</div>
)}

{activeLesson === "volume" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
    Volume Basics
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Volume shows how much buying and selling activity is happening in the market.
  </p>

  <div className="mt-10 space-y-6">

    <div className="rounded-[28px] border border-white/5 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-cyan-400">
        Why Volume Matters
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        Strong volume can confirm breakouts, trends, and momentum moves.
      </p>
    </div>

    <div className="rounded-[28px] border border-white/5 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-green-400">
        High Volume
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        High volume often means stronger participation from traders and institutions.
      </p>
    </div>

    <div className="rounded-[28px] border border-white/5 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-orange-400">
        Low Volume
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        Low volume can signal weak momentum and less reliable price movement.
      </p>
    </div>

  </div>
</div>
)}

{activeLesson === "supplydemand" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
    Supply & Demand
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Supply and demand zones are areas where strong buying or selling activity previously entered the market.
  </p>

  <div className="mt-10 grid md:grid-cols-2 gap-6">

    <div className="rounded-[28px] border border-green-500/20 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-green-400">
        Demand Zones
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        Demand zones are areas where buyers previously stepped in aggressively and pushed price higher.
      </p>
    </div>

    <div className="rounded-[28px] border border-red-500/20 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-red-400">
        Supply Zones
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        Supply zones are areas where sellers previously entered heavily and pushed price lower.
      </p>
    </div>

  </div>
</div>
)}
{activeLesson === "risk" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">
  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-cyan-300 leading-tight">
    Protecting Your Capital
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Risk management is one of the most important parts of trading. Good traders protect their capital before focusing on profits.
  </p>

  <div className="mt-10 space-y-5">

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl md:text-3xl font-black text-white">
        What Is Risk Management?
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Risk management means controlling how much money you can lose on a trade. Even professional traders lose trades, so protecting your account is extremely important.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
        <p className="text-xl font-black text-green-400">
          Never Risk Everything
        </p>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          Never use your full account balance on one trade. One bad trade should never destroy your account.
        </p>
      </div>

      <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
        <p className="text-xl font-black text-cyan-400">
          Always Use A Stop Loss
        </p>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          A stop loss automatically closes your trade if price moves against you. This helps limit large losses.
        </p>
      </div>

      <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
        <p className="text-xl font-black text-orange-400">
          Use Proper Position Size
        </p>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          Position size means how much money you put into a trade. Smaller position sizes reduce risk.
        </p>
      </div>

      <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
        <p className="text-xl font-black text-red-400">
          Avoid Emotional Trading
        </p>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          Fear and greed can cause bad decisions. Traders should follow a plan instead of reacting emotionally.
        </p>
      </div>

    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl md:text-3xl font-black text-white">
        The 1% Rule
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Many traders risk only 1% of their account on a single trade. This helps protect the account during losing streaks.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl md:text-3xl font-black text-white">
        Why Consistency Matters
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Successful trading is about consistency over time, not trying to get rich from one trade. Small disciplined gains can grow steadily.
      </p>
    </div>

  </div>
</div>
)}
{activeLesson === "support" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">
  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-cyan-300 leading-tight">
    Support & Resistance
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Support and resistance are key price levels traders use to understand where price may react.
  </p>

  <div className="mt-10 space-y-5">

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl md:text-3xl font-black text-green-400">
        What Is Support?
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Support is a price area where buyers may step in and stop price from falling lower. Traders often look for buying opportunities near support levels.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl md:text-3xl font-black text-red-400">
        What Is Resistance?
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Resistance is a price area where sellers may step in and stop price from moving higher. Traders often watch resistance for possible selling pressure.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <h4 className="text-xl md:text-2xl font-bold text-cyan-400">
          Why Support Matters
        </h4>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          Support levels can help traders identify possible entry areas and lower-risk trades.
        </p>
      </div>

      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <h4 className="text-xl md:text-2xl font-bold text-orange-400">
          Why Resistance Matters
        </h4>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          Resistance levels can help traders identify possible exit areas or areas where momentum may slow down.
        </p>
      </div>

    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl md:text-3xl font-black text-white">
        Support Becoming Resistance
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        When price breaks below support, that same area can later act as resistance. This is a common concept traders watch closely.
      </p>
    </div>

  </div>
</div>
)}
{activeLesson === "setups" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
    Building A Trade Plan
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Successful traders follow structured plans instead of making emotional decisions.
  </p>

  <div className="mt-10 space-y-6">

    <div className="rounded-[28px] border border-cyan-500/10 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-cyan-400">
        Entry Strategy
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        Traders should define exactly why they are entering a trade before clicking buy or sell.
      </p>
    </div>

    <div className="rounded-[28px] border border-green-500/10 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-green-400">
        Stop Loss Plan
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        Every trade should include a stop loss level to control downside risk.
      </p>
    </div>

    <div className="rounded-[28px] border border-orange-500/10 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-orange-400">
        Profit Target
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        Traders should identify realistic areas where they may take profits.
      </p>
    </div>

    <div className="rounded-[28px] border border-red-500/10 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-red-400">
        Risk vs Reward
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        Strong trade plans often aim for higher potential reward compared to risk.
      </p>
    </div>

  </div>
</div>
)}

{activeLesson === "mistakes" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
    Common Beginner Mistakes
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Most beginners lose money because they trade emotionally, ignore risk, and lack patience.
  </p>

  <div className="mt-10 grid md:grid-cols-2 gap-6">

    <div className="rounded-[28px] border border-red-500/10 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-red-400">
        Overtrading
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        Taking too many trades often leads to emotional mistakes and unnecessary losses.
      </p>
    </div>

    <div className="rounded-[28px] border border-orange-500/10 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-orange-400">
        Revenge Trading
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        Some traders try to recover losses quickly and end up risking even more money.
      </p>
    </div>

    <div className="rounded-[28px] border border-cyan-500/10 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-cyan-400">
        Ignoring Risk
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        Beginners often focus only on profits instead of protecting capital.
      </p>
    </div>

    <div className="rounded-[28px] border border-green-500/10 bg-[#18181b] p-7">
      <h3 className="text-2xl font-black text-green-400">
        Lack Of Patience
      </h3>

      <p className="mt-4 text-zinc-300 text-[17px] leading-8">
        Many beginners force trades instead of waiting for quality setups.
      </p>
    </div>

  </div>
</div>
)}
{activeLesson === "trends" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">
  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-cyan-300 leading-tight">
    Market Trends
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Understanding trends helps traders follow market direction instead of trading against momentum.
  </p>

  <div className="mt-10 space-y-5">

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl md:text-3xl font-black text-green-400">
        Uptrend
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        An uptrend happens when price continues making higher highs and higher lows. Buyers are in control during an uptrend.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl md:text-3xl font-black text-red-400">
        Downtrend
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        A downtrend happens when price continues making lower highs and lower lows. Sellers are controlling the market during a downtrend.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl md:text-3xl font-black text-yellow-400">
        Sideways Market
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        A sideways market happens when price moves inside a range without a strong direction. These markets can be more difficult for beginners.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <h4 className="text-xl md:text-2xl font-bold text-cyan-400">
          Trend Following
        </h4>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          Many traders prefer trading with the trend because momentum is already moving in that direction.
        </p>
      </div>

      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <h4 className="text-xl md:text-2xl font-bold text-orange-400">
          Trend Reversals
        </h4>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          A trend reversal happens when the market changes direction from bullish to bearish or bearish to bullish.
        </p>
      </div>

    </div>

  </div>
</div>
)}
{activeLesson === "longshort" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">
  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-cyan-300 leading-tight">
    Bullish vs Bearish Trading
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Traders can make money in both rising and falling markets depending on the type of trade they enter.
  </p>

  <div className="mt-10 space-y-5">

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl md:text-3xl font-black text-green-400">
        What Is A Long Position?
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Going long means buying an asset because you believe the price will move higher. Traders profit if the market rises.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl md:text-3xl font-black text-red-400">
        What Is A Short Position?
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Going short means trading because you believe the price will move lower. Traders profit if the market falls.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <h4 className="text-xl md:text-2xl font-bold text-cyan-400">
          Bullish Traders
        </h4>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          Bullish traders expect prices to rise and usually look for long opportunities.
        </p>
      </div>

      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <h4 className="text-xl md:text-2xl font-bold text-orange-400">
          Bearish Traders
        </h4>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          Bearish traders expect prices to fall and usually look for short opportunities.
        </p>
      </div>

    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl md:text-3xl font-black text-white">
        Why Beginners Should Be Careful
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Short trading can move very quickly and may carry higher risk. Beginners should focus on learning risk management before using advanced strategies.
      </p>
    </div>

  </div>
</div>
)}
{activeLesson === "technical" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">
  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-cyan-300 leading-tight">
    Reading The Charts
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Technical analysis is the study of charts, price movement, and patterns to help traders make decisions.
  </p>

  <div className="mt-10 space-y-5">

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl md:text-3xl font-black text-white">
        What Is Technical Analysis?
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Traders use technical analysis to study historical price action and identify possible future market direction.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <h4 className="text-xl md:text-2xl font-bold text-cyan-400">
          Price Action
        </h4>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          Price action means studying candlestick movement without relying heavily on indicators.
        </p>
      </div>

      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <h4 className="text-xl md:text-2xl font-bold text-orange-400">
          Volume Analysis
        </h4>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          Volume helps traders understand how strong buying or selling pressure may be.
        </p>
      </div>

      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <h4 className="text-xl md:text-2xl font-bold text-green-400">
          Trendlines
        </h4>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          Trendlines help traders visualize market direction and possible breakout areas.
        </p>
      </div>

      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <h4 className="text-xl md:text-2xl font-bold text-red-400">
          Moving Averages
        </h4>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          Moving averages smooth out price movement and help traders identify trends more clearly.
        </p>
      </div>

    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl md:text-3xl font-black text-white">
        Why Technical Analysis Matters
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Technical analysis helps traders create structured plans instead of making random emotional decisions.
      </p>
    </div>

  </div>
</div>
)}
{activeLesson === "breakouts" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">
  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-cyan-300 leading-tight">
    Breakouts vs Fakeouts
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Traders watch breakouts closely because they can lead to strong price movement, but not every breakout is real.
  </p>

  <div className="mt-10 space-y-5">

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl md:text-3xl font-black text-green-400">
        What Is A Breakout?
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        A breakout happens when price moves strongly above resistance or below support with momentum.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl md:text-3xl font-black text-red-400">
        What Is A Fakeout?
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        A fakeout happens when price briefly breaks a level but quickly reverses back inside the range.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <h4 className="text-xl md:text-2xl font-bold text-cyan-400">
          Signs Of Strong Breakouts
        </h4>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          Strong breakouts often happen with higher volume, momentum, and strong candlestick closes.
        </p>
      </div>

      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <h4 className="text-xl md:text-2xl font-bold text-orange-400">
          Why Fakeouts Happen
        </h4>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          Markets can trap traders by briefly moving beyond important levels before reversing direction.
        </p>
      </div>

    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl md:text-3xl font-black text-white">
        Beginner Tip
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Many beginners wait for candle confirmation before entering breakout trades to reduce the chance of being trapped in a fakeout.
      </p>
    </div>

  </div>
</div>
)}
{activeLesson === "psychology" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">
  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-cyan-300 leading-tight">
    Trading Psychology
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Emotions play a major role in trading. Many beginner mistakes come from fear, greed, and lack of discipline.
  </p>

  <div className="mt-10 space-y-5">

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl md:text-3xl font-black text-red-400">
        Fear
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Fear can cause traders to exit trades too early or avoid good opportunities because they are worried about losing money.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl md:text-3xl font-black text-green-400">
        Greed
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Greed can cause traders to risk too much money or stay in trades too long hoping for larger profits.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <h4 className="text-xl md:text-2xl font-bold text-cyan-400">
          Discipline
        </h4>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          Discipline means following your trading plan even when emotions become strong.
        </p>
      </div>

      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <h4 className="text-xl md:text-2xl font-bold text-orange-400">
          Patience
        </h4>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          Good traders wait for quality setups instead of forcing random trades.
        </p>
      </div>

    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl md:text-3xl font-black text-white">
        Why Psychology Matters
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Many traders lose money not because they lack strategy, but because emotions cause poor decision making.
      </p>
    </div>

  </div>
</div>
)}
{activeLesson === "vocabulary" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">
  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-cyan-300 leading-tight">
    Essential Trading Terms
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Understanding common trading terms helps beginners read charts, follow markets, and communicate more confidently.
  </p>

  <div className="mt-10 grid md:grid-cols-2 gap-6">

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl font-black text-green-400">
        Bull Market
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        A bull market is when prices are generally rising and buyers are in control.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl font-black text-red-400">
        Bear Market
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        A bear market is when prices are generally falling and sellers are controlling the market.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl font-black text-cyan-400">
        Volatility
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Volatility measures how quickly price moves up or down.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl font-black text-orange-400">
        Liquidity
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Liquidity refers to how easily an asset can be bought or sold.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl font-black text-yellow-400">
        Market Order
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        A market order buys or sells immediately at the current market price.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <h3 className="text-2xl font-black text-purple-400">
        Limit Order
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        A limit order allows traders to choose the exact price where they want to buy or sell.
      </p>
    </div>

  </div>
</div>
)}
{activeLesson === "quiz" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-10 border border-white/5">
  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-cyan-300 leading-tight">
    Trader Checkpoint
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Test your understanding before moving to the simulator.
  </p>

  <div className="mt-10 space-y-5">

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <p className="text-xl font-black text-white">
        1. What does buying mean?
      </p>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Buying means entering a trade because you believe the price may move higher.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <p className="text-xl font-black text-white">
        2. What does P/L stand for?
      </p>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        P/L stands for Profit and Loss. It shows how much money a trade gained or lost.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <p className="text-xl font-black text-white">
        3. Why is risk management important?
      </p>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Risk management helps protect your money and prevents one bad trade from damaging your account.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <p className="text-xl font-black text-white">
        4. What is a stop loss?
      </p>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        A stop loss is a price level where you exit a trade if it moves against you.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <p className="text-xl font-black text-white">
        5. What is support?
      </p>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Support is a price area where buyers may step in and stop price from falling lower.
      </p>
    </div>

  </div>
</div>
)}
{activeLesson === "practice" && (
<div className="mt-14 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-[28px] border border-cyan-500/20 p-10 text-center">
  <h2 className="text-5xl font-black text-cyan-300">
    TradeNestX Simulator Guide
  </h2>

  <p className="mt-6 text-xl text-zinc-300 leading-9 max-w-4xl mx-auto">
    Now that you understand the basics of trading, candlestick patterns, risk management, trends, and technical analysis, the next step is practicing in the simulator.
  </p>

  <p className="mt-6 text-lg text-zinc-400 leading-8 max-w-4xl mx-auto">
    TradeNestX allows beginners to practice trading strategies, manage risk, and learn market behavior without using real money.
  </p>

  <div className="mt-10">
    <Link
      href="/simulator"
      className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-10 py-5 text-xl font-black text-black transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:scale-[1.02] hover:bg-cyan-400"
    >
      Start Practicing On The Simulator
    </Link>
  </div>
</div>
)}
{activeLesson === "account" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">
  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-cyan-300 leading-tight">
    Going Live
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    After practicing consistently on the simulator, beginners can explore opening a real trading account.
  </p>

  <div className="mt-10 space-y-5">

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <p className="text-2xl font-black text-cyan-400">
        Step 1 — Choose A Broker Or Exchange
      </p>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Stock traders usually use brokers, while crypto traders use exchanges. Always choose trusted and regulated platforms.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <p className="text-2xl font-black text-cyan-400">
        Step 2 — Create Your Account
      </p>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Enter your personal information, create login credentials, and secure your account with strong passwords and two-factor authentication.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <p className="text-2xl font-black text-cyan-400">
        Step 3 — Verify Your Identity
      </p>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Most platforms require identity verification using documents such as a driver’s license or passport.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <p className="text-2xl font-black text-cyan-400">
        Step 4 — Fund Your Account
      </p>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Connect your bank account and start with small amounts while learning proper risk management.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:-translate-y-[4px] hover:-translate-y-[4px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[4px]">
      <p className="text-2xl font-black text-cyan-400">
        Step 5 — Continue Learning
      </p>

 <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
  Even experienced traders continue studying markets, strategies, psychology, and risk management over time.
</p>
</div>
    </div>
  </div>
)}

</section>



</div>
</div>
</main>



    </>
  );
}