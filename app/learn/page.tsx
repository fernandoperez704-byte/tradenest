"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/Navbar";


export default function LearnPage() {
  const [activeLesson, setActiveLesson] = useState("roadmap");
  const lessons = [
  { id: "roadmap", label: "Beginner Roadmap" },
  { id: "candlesticks", label: "Candlestick Basics" },
  { id: "risk", label: "Beginner Risk Rules" },
  { id: "support", label: "Support & Resistance" },
  { id: "trends", label: "Market Trends" },
  { id: "longshort", label: "Long vs Short" },
  { id: "technical", label: "Technical Analysis" },
  { id: "breakouts", label: "Breakouts vs Fakeouts" },
  { id: "psychology", label: "Trading Psychology" },
  { id: "vocabulary", label: "Trading Vocabulary" },
  { id: "quiz", label: "Beginner Quiz" },
  { id: "practice", label: "Practice" },
  { id: "account", label: "Open Account" },
];
const activeLessonIndex = lessons.findIndex(
  (lesson) => lesson.id === activeLesson
);
  return (
    <>
      <Navbar />

      <main className="page-shell">
        <div className="page-container max-w-[1700px]">
  <div className="mt-10 grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)_300px] gap-8">
         <aside className="bg-[#111827] border border-zinc-700 rounded-2xl p-4 h-fit xl:sticky xl:top-24">
  <p className="text-sm font-black tracking-wide text-zinc-500 mb-4">
    LESSONS
  </p>

  <div className="space-y-2">
    {lessons.map((lesson) => (
      <button
        key={lesson.id}
        onClick={() => setActiveLesson(lesson.id)}
        className={`w-full rounded-xl px-4 py-3 text-left text-sm font-bold transition-all ${
          activeLesson === lesson.id
            ? "bg-cyan-500 text-black"
            : "bg-[#0f172a] text-zinc-400 hover:text-cyan-400"
        }`}
      >
        {lesson.label}
      </button>
    ))}
  </div>
</aside>

<section className="min-w-0 h-[calc(100vh-120px)] overflow-y-auto pr-2 scrollbar-hide">
          
      
{activeLesson === "roadmap" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">
  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-cyan-300 leading-tight">
    Beginner Roadmap
    
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Follow these simple steps to begin learning trading the right way.
  </p>

  <div className="mt-10 space-y-5">

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <p className="text-cyan-400 font-black text-xl">
        Step 1 — Learn The Basics
      </p>

      <p className="text-zinc-300 mt-3 text-[17px] leading-7">
        Start by learning what stocks, crypto, candlesticks, support, resistance, and trends mean before risking money.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
  <p className="text-cyan-400 font-black text-xl">
    Step 2 — Practice On A Simulator
  </p>

  <p className="text-zinc-300 mt-3 text-[17px] leading-7">
    Use TradeNestX to practice entering trades, reading charts, setting stop losses, and managing risk without using real money.
  </p>
</div>

<div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
  <p className="text-cyan-400 font-black text-xl">
    Step 3 — Open A Trading Account
  </p>

  <p className="text-zinc-300 mt-3 text-[17px] leading-7">
    Once you understand the basics and feel comfortable trading on the simulator, you can open a real trading account with a trusted broker or crypto exchange.
  </p>
</div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <p className="text-cyan-400 font-black text-xl">
        Step 4 — Focus On Risk Management
      </p>

      <p className="text-zinc-300 mt-3 text-[17px] leading-7">
        Professional traders protect their capital first. Never risk your full account on one trade.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <p className="text-cyan-400 font-black text-xl">
        Step 5 — Stay Consistent
      </p>

      <p className="text-zinc-300 mt-3 text-[17px] leading-7">
        Trading is a skill that takes time. Focus on consistency, discipline, and learning instead of chasing fast profits.
      </p>
    </div>

  </div>
</div>
)}
{activeLesson === "candlesticks" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">
  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-cyan-300 leading-tight">
    Candlestick Basics
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Candlesticks help traders understand price movement, momentum, and market psychology.
  </p>

  <div className="mt-10 bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
    <h3 className="text-2xl md:text-3xl font-black text-white">
      What Is A Candlestick?
    </h3>

    <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
      A candlestick is a visual representation of price movement during a certain period of time. Every candlestick shows four important prices:
    </p>

    <div className="mt-6 space-y-4">

      <div className="rounded-xl border border-white/5 bg-[#0f172a] p-4">
        <p className="text-cyan-400 font-bold text-lg">
          Open Price
        </p>

        <p className="text-zinc-300 mt-2">
          The price where the candle started.
        </p>
      </div>

      <div className="rounded-xl border border-white/5 bg-[#0f172a] p-4">
        <p className="text-green-400 font-bold text-lg">
          Close Price
        </p>

        <p className="text-zinc-300 mt-2">
          The price where the candle finished.
        </p>
      </div>

      <div className="rounded-xl border border-white/5 bg-[#0f172a] p-4">
        <p className="text-orange-400 font-bold text-lg">
          High Price
        </p>

        <p className="text-zinc-300 mt-2">
          The highest price reached during the candle.
        </p>
      </div>

      <div className="rounded-xl border border-white/5 bg-[#0f172a] p-4">
        <p className="text-red-400 font-bold text-lg">
          Low Price
        </p>

        <p className="text-zinc-300 mt-2">
          The lowest price reached during the candle.
        </p>
      </div>

    </div>
  </div>

  <div className="mt-10 grid md:grid-cols-2 gap-6">

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <h3 className="text-xl md:text-2xl font-bold text-green-400">
        Bullish Candle
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        A bullish candle means buyers pushed the price higher. The candle closes above the opening price.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <h3 className="text-xl md:text-2xl font-bold text-red-400">
        Bearish Candle
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        A bearish candle means sellers pushed the price lower. The candle closes below the opening price.
      </p>
    </div>

  </div>

  <div className="mt-12">
    <h3 className="text-2xl md:text-3xl font-black text-white">
      Common Candlestick Patterns
    </h3>

    <div className="mt-8 grid md:grid-cols-2 gap-6">

      <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
        <h4 className="text-xl md:text-2xl font-bold text-cyan-400">
          Doji
        </h4>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          A doji shows indecision between buyers and sellers. Price closes near where it opened.
        </p>
      </div>

      <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
        <h4 className="text-xl md:text-2xl font-bold text-orange-400">
          Hammer
        </h4>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          A hammer may signal a bullish reversal after price falls lower and buyers regain control.
        </p>
      </div>

      <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
        <h4 className="text-xl md:text-2xl font-bold text-red-400">
          Shooting Star
        </h4>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          A shooting star can signal weakness after a strong move higher and possible bearish reversal.
        </p>
      </div>

      <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
        <h4 className="text-xl md:text-2xl font-bold text-green-400">
          Bullish Engulfing
        </h4>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          A bullish engulfing pattern happens when a strong green candle completely covers the previous red candle.
        </p>
      </div>

      <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
        <h4 className="text-xl md:text-2xl font-bold text-red-400">
          Bearish Engulfing
        </h4>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          A bearish engulfing pattern happens when a strong red candle completely covers the previous green candle.
        </p>
      </div>

      <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
        <h4 className="text-xl md:text-2xl font-bold text-yellow-400">
          Spinning Top
        </h4>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          A spinning top candle shows market indecision with both buyers and sellers fighting for control.
        </p>
      </div>

    </div>
  </div>
</div>
)}
{activeLesson === "risk" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">
  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-cyan-300 leading-tight">
    Beginner Risk Rules
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Risk management is one of the most important parts of trading. Good traders protect their capital before focusing on profits.
  </p>

  <div className="mt-10 space-y-5">

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <h3 className="text-2xl md:text-3xl font-black text-white">
        What Is Risk Management?
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Risk management means controlling how much money you can lose on a trade. Even professional traders lose trades, so protecting your account is extremely important.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
        <p className="text-xl font-black text-green-400">
          Never Risk Everything
        </p>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          Never use your full account balance on one trade. One bad trade should never destroy your account.
        </p>
      </div>

      <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
        <p className="text-xl font-black text-cyan-400">
          Always Use A Stop Loss
        </p>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          A stop loss automatically closes your trade if price moves against you. This helps limit large losses.
        </p>
      </div>

      <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
        <p className="text-xl font-black text-orange-400">
          Use Proper Position Size
        </p>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          Position size means how much money you put into a trade. Smaller position sizes reduce risk.
        </p>
      </div>

      <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
        <p className="text-xl font-black text-red-400">
          Avoid Emotional Trading
        </p>

        <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
          Fear and greed can cause bad decisions. Traders should follow a plan instead of reacting emotionally.
        </p>
      </div>

    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <h3 className="text-2xl md:text-3xl font-black text-white">
        The 1% Rule
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Many traders risk only 1% of their account on a single trade. This helps protect the account during losing streaks.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
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

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <h3 className="text-2xl md:text-3xl font-black text-green-400">
        What Is Support?
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Support is a price area where buyers may step in and stop price from falling lower. Traders often look for buying opportunities near support levels.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
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

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
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
{activeLesson === "trends" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">
  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-cyan-300 leading-tight">
    Market Trends
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Understanding trends helps traders follow market direction instead of trading against momentum.
  </p>

  <div className="mt-10 space-y-5">

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <h3 className="text-2xl md:text-3xl font-black text-green-400">
        Uptrend
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        An uptrend happens when price continues making higher highs and higher lows. Buyers are in control during an uptrend.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <h3 className="text-2xl md:text-3xl font-black text-red-400">
        Downtrend
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        A downtrend happens when price continues making lower highs and lower lows. Sellers are controlling the market during a downtrend.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
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
    Long vs Short Trading
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Traders can make money in both rising and falling markets depending on the type of trade they enter.
  </p>

  <div className="mt-10 space-y-5">

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <h3 className="text-2xl md:text-3xl font-black text-green-400">
        What Is A Long Position?
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Going long means buying an asset because you believe the price will move higher. Traders profit if the market rises.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
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

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
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
    Technical Analysis Basics
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Technical analysis is the study of charts, price movement, and patterns to help traders make decisions.
  </p>

  <div className="mt-10 space-y-5">

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
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

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
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

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <h3 className="text-2xl md:text-3xl font-black text-green-400">
        What Is A Breakout?
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        A breakout happens when price moves strongly above resistance or below support with momentum.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
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

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
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

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <h3 className="text-2xl md:text-3xl font-black text-red-400">
        Fear
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Fear can cause traders to exit trades too early or avoid good opportunities because they are worried about losing money.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
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

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
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
    Trading Vocabulary
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Understanding common trading terms helps beginners read charts, follow markets, and communicate more confidently.
  </p>

  <div className="mt-10 grid md:grid-cols-2 gap-6">

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <h3 className="text-2xl font-black text-green-400">
        Bull Market
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        A bull market is when prices are generally rising and buyers are in control.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <h3 className="text-2xl font-black text-red-400">
        Bear Market
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        A bear market is when prices are generally falling and sellers are controlling the market.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <h3 className="text-2xl font-black text-cyan-400">
        Volatility
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Volatility measures how quickly price moves up or down.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <h3 className="text-2xl font-black text-orange-400">
        Liquidity
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Liquidity refers to how easily an asset can be bought or sold.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <h3 className="text-2xl font-black text-yellow-400">
        Market Order
      </h3>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        A market order buys or sells immediately at the current market price.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
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
    Quick Beginner Quiz
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Test your understanding before moving to the simulator.
  </p>

  <div className="mt-10 space-y-5">

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <p className="text-xl font-black text-white">
        1. What does buying mean?
      </p>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Buying means entering a trade because you believe the price may move higher.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <p className="text-xl font-black text-white">
        2. What does P/L stand for?
      </p>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        P/L stands for Profit and Loss. It shows how much money a trade gained or lost.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <p className="text-xl font-black text-white">
        3. Why is risk management important?
      </p>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Risk management helps protect your money and prevents one bad trade from damaging your account.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <p className="text-xl font-black text-white">
        4. What is a stop loss?
      </p>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        A stop loss is a price level where you exit a trade if it moves against you.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
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
    Ready To Practice?
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
      className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-10 py-5 text-xl font-black text-black transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:scale-[1.02] hover:bg-cyan-400"
    >
      Start Practicing On The Simulator
    </Link>
  </div>
</div>
)}
{activeLesson === "account" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">
  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-cyan-300 leading-tight">
    How To Open A Trading Account
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    After practicing consistently on the simulator, beginners can explore opening a real trading account.
  </p>

  <div className="mt-10 space-y-5">

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <p className="text-2xl font-black text-cyan-400">
        Step 1 — Choose A Broker Or Exchange
      </p>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Stock traders usually use brokers, while crypto traders use exchanges. Always choose trusted and regulated platforms.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <p className="text-2xl font-black text-cyan-400">
        Step 2 — Create Your Account
      </p>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Enter your personal information, create login credentials, and secure your account with strong passwords and two-factor authentication.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <p className="text-2xl font-black text-cyan-400">
        Step 3 — Verify Your Identity
      </p>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Most platforms require identity verification using documents such as a driver’s license or passport.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
      <p className="text-2xl font-black text-cyan-400">
        Step 4 — Fund Your Account
      </p>

      <p className="text-zinc-300 mt-4 text-[17px] leading-7 md:leading-8 max-w-4xl">
        Connect your bank account and start with small amounts while learning proper risk management.
      </p>
    </div>

    <div className="bg-[#18181b] border border-white/5 rounded-[28px] p-7 transition-all duration-200 hover:-translate-y-[2px] hover:-translate-y-[2px] hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-[#1a1f2e] hover:-translate-y-[2px]">
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

<aside className="bg-[#111827] border border-zinc-700 rounded-2xl p-5 h-fit xl:sticky xl:top-24">
  <p className="text-sm font-black tracking-wide text-zinc-500">
    COURSE PROGRESS
  </p>

  <div className="mt-5">
    <p className="text-4xl font-black text-cyan-400">
      {activeLessonIndex + 1}/{lessons.length}
    </p>

    <p className="mt-2 text-sm text-zinc-500">
      Current lesson progress
    </p>
  </div>

  <div className="mt-6 h-3 overflow-hidden rounded-full bg-[#0f172a]">
    <div
      className="h-full rounded-full bg-cyan-400 transition-all duration-300"
      style={{
        width: `${((activeLessonIndex + 1) / lessons.length) * 100}%`,
      }}
    />
  </div>

  <button
    onClick={() => {
      const nextIndex = Math.min(
        activeLessonIndex + 1,
        lessons.length - 1
      );

      setActiveLesson(lessons[nextIndex].id);
    }}
    className="mt-6 w-full rounded-xl bg-cyan-500 px-4 py-3 text-sm font-black text-black transition-all hover:bg-cyan-400"
  >
    Next Lesson
  </button>
</aside>

</div>
</div>
</main>



    </>
  );
}