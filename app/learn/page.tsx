"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";


export default function LearnPage() {
  const [activeLesson, setActiveLesson] = useState("roadmap");
  const [selectedAsset, setSelectedAsset] = useState("stocks");
  const [selectedJourney, setSelectedJourney] = useState("crypto");
  const [selectedSupportType, setSelectedSupportType] = useState("support");
  const [selectedTrendType, setSelectedTrendType] = useState("uptrend");
  const [selectedRiskType, setSelectedRiskType] = useState("stoploss");
  const [selectedTimeframe, setSelectedTimeframe] = useState("1min");
  const [selectedVolumeType, setSelectedVolumeType] = useState("high");
  const [selectedSupplyDemand, setSelectedSupplyDemand] = useState("demand");
  const [selectedMistake, setSelectedMistake] = useState("revenge");
  const [selectedBreakoutType, setSelectedBreakoutType] = useState("breakout");
  const [selectedCandleType, setSelectedCandleType] = useState("bullish");
  const [selectedOrderType, setSelectedOrderType] = useState("market");
  const [selectedPsychology, setSelectedPsychology] = useState("fear");
  const [selectedTradePlan, setSelectedTradePlan] = useState("entry");
  const [selectedBullBear, setSelectedBullBear] = useState("bullish");
  const [selectedMarketType, setSelectedMarketType] = useState("buyers");
  const [selectedChartReading, setSelectedChartReading] = useState("trend");
  const [selectedTradingTerm, setSelectedTradingTerm] = useState("spread");
  const [selectedCheckpoint, setSelectedCheckpoint] = useState("question1");
  const [selectedLiveTopic, setSelectedLiveTopic] = useState("small");
  const [selectedPainPoint, setSelectedPainPoint] = useState("charts");
  const [selectedMarketImage, setSelectedMarketImage] = useState(-1);
  const [marketSlide, setMarketSlide] = useState(0);
  const [marketLessonSlide, setMarketLessonSlide] = useState(-1);
  const [riskLessonSlide, setRiskLessonSlide] = useState(-1);
  const [gabyQuestion, setGabyQuestion] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");
const [gabyAnswer, setGabyAnswer] = useState(
  "Hi, I’m Gaby. Ask me anything about this lesson."
  
);
const [isGabyTyping, setIsGabyTyping] = useState(false);
useEffect(() => {
  setGabyAnswer("Hi, I’m Gaby. Ask me anything about this lesson.");
  setGabyQuestion("");
  setIsGabyTyping(false);
  setLastQuestion("");
}, []);
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


async function askGaby(customQuestion?: string) {
const question = (customQuestion || gabyQuestion).toLowerCase().trim();

const contextualQuestion =
  lastQuestion
    ? `Previous question: ${lastQuestion}\nCurrent question: ${question}`
    : question;
if (
  question.includes("market open") ||
  question.includes("stock market open") ||
  question.includes("market closed") ||
  question.includes("stock market closed")
) {
  setIsGabyTyping(true);

  try {
    const response = await fetch("/api/gaby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: contextualQuestion,
        lesson: activeLesson,
      }),
    });

    const data = await response.json();
    setGabyAnswer(data.answer);
  } catch (error) {
    setGabyAnswer("Gaby is having trouble responding right now.");
  }

  setIsGabyTyping(false);
setLastQuestion(question);
setGabyQuestion("");
return;
}
if (
  question.includes("stock") ||
  question.includes("crypto") ||
  question.includes("forex") ||
  question.includes("option") ||
  question.includes("supply and demand") ||
  question.includes("candlestick") ||
  question.includes("prices move") ||
  question.includes("volatility") ||
  question.includes("liquidity") ||
  question.includes("panic") ||
question.includes("market order") ||
question.includes("limit order") ||
question.includes("safer") ||
question.includes("limit orders") ||
question.includes("beginners focus") ||
question.includes("market open") ||
question.includes("stock market") ||
question.includes("risk management") ||
question.includes("stop losses") ||
question.includes("revenge trading") ||
question.includes("protecting capital") ||
question.includes("capital important") 
) {
  setIsGabyTyping(true);

setTimeout(() => {
  if (
  question.includes("best place") ||
  question.includes("where") ||
  question.includes("learn") ||
  question.includes("learning") 
  
) {
  setGabyAnswer(
    "The best place to start learning is inside TradeNestX. Start with the beginner lessons first, then practice safely on the TradeNestX simulator before risking real money. TradeNestX is built to help beginners learn charts, candlesticks, order types, volatility, risk management, and market basics step-by-step."
  );

} else if (
  question.includes("better than") ||
  question.includes("which is better") ||
  question.includes("better")
) {
  setGabyAnswer(
    "I can compare trading concepts for education, but I can’t tell you which asset is better to buy. Stocks and crypto have different risks. Stocks are tied to companies, while crypto is digital and usually more volatile. Beginners should learn both first and practice safely before risking real money."
  );

} else if (question.includes("stock")) {
  setGabyAnswer(
    "A stock represents small ownership in a company. When the company grows or loses value, the stock price can move up or down."
  );

} else if (
  question === "crypto" ||
  question === "what is crypto" ||
  question === "what is crypto?"
) {
  setGabyAnswer(
    "Crypto is a digital asset that trades online 24/7. Crypto markets can move very fast and are known for high volatility."
  );

} else if (
  question.includes("beginner") ||
  question.includes("focus")
) {
  setGabyAnswer(
    "Beginners should focus on risk management, learning chart basics, controlling emotions, and practicing safely before trading real money."
  );

} else if (
  question.includes("price") ||
  question.includes("prices move")
) {
  setGabyAnswer(
    "Prices move because buyers and sellers constantly compete. More buyers can push price higher, while more sellers can push price lower."
  );

} else if (
  question.includes("volatility")
) {
  setGabyAnswer(
    "Volatility means how fast and how much price moves. High volatility means bigger price swings and more risk."
  );

} else if (
  question.includes("supply") ||
  question.includes("demand")
) {
  setGabyAnswer(
    "Supply and demand means selling pressure versus buying pressure. More demand can push price up. More supply can push price down."
  );

} else if (
  question.includes("panic")
) {
  setGabyAnswer(
    "Markets panic when traders react emotionally to fear, bad news, uncertainty, or fast price drops."
  );

} else if (
  question === "market order" ||
  question === "what is a market order" ||
  question === "what is a market order?" ||
  question === "what is market order" ||
  question === "what is market order?"
) {
  setGabyAnswer(
    "A market order executes instantly at the current market price. Traders use it when speed matters more than precision."
  );

} else if (
  question === "limit order" ||
  question === "what is a limit order" ||
  question === "what is a limit order?" ||
  question === "what is limit order" ||
  question === "what is limit order?"
) {
  setGabyAnswer(
    "A limit order only executes at the exact price you choose. Traders use it when they want more price control."
  );

} else if (
  question.includes("safer")
) {
  setGabyAnswer(
    "Many beginners prefer limit orders because they control the exact entry price before entering a trade."
  );

} else if (
  question.includes("better")
) {
  setGabyAnswer(
    "Market orders focus on speed while limit orders focus on price precision and control."
  );

  } else if (
  question === "why do traders use limit orders" ||
  question === "why do traders use limit orders?"
) {
  setGabyAnswer(
    "Traders use limit orders to get better entries, reduce slippage, and wait for price to reach important levels."
  );

} else if (
  question.includes("forex")
) {
  setGabyAnswer(
    "Forex is the foreign exchange market where traders buy and sell currencies from around the world."
  );

} else if (
  question.includes("candlestick")
) {
  setGabyAnswer(
    "Candlesticks help traders understand price movement, momentum, and buyer versus seller behavior."
  );

} else if (
  question === "what is risk management" ||
  question === "what is risk management?"
) {
  setGabyAnswer(
    "Risk management helps traders protect their capital by controlling losses, position size, and emotional decisions."
  );

} else if (
  question === "why do traders use stop losses" ||
  question === "why do traders use stop losses?"
) {
  setGabyAnswer(
    "Traders use stop losses to automatically limit losses before one bad trade becomes too damaging."
  );

} else if (
  question === "what is revenge trading" ||
  question === "what is revenge trading?"
) {
  setGabyAnswer(
    "Revenge trading happens when traders become emotional after a loss and take impulsive trades trying to win money back quickly."
  );

} else if (
  question === "why is protecting capital important" ||
  question === "why is protecting capital important?"
) {
  setGabyAnswer(
    "Protecting capital helps traders survive long enough to improve. Good traders focus on consistency and risk control before profits."
  );

} else if (
  question.includes("risk")
) {
  setGabyAnswer(
    "Risk management helps traders protect their capital by controlling losses and position size."
  );

  
} else {
  setGabyAnswer(
    "The best place to start learning is directly inside TradeNestX. Begin with the beginner lessons to understand charts, candlesticks, volatility, market orders, limit orders, and risk management step-by-step. After learning the basics, practice safely on the TradeNestX simulator before risking real money. TradeNestX is designed to help beginners build confidence through education and practice first."
  );

}

setIsGabyTyping(false);
setLastQuestion(question);
setGabyQuestion("");
}, 800);

return;

  return;
}

if (!question.trim()) return;

setIsGabyTyping(true);

try {
  const response = await fetch("/api/gaby", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      message: contextualQuestion,
      lesson: activeLesson,
    }),
  });

  const data = await response.json();

  setGabyAnswer(data.answer);
} catch (error) {
  setGabyAnswer(
    "Gaby is having trouble responding right now."
  );
}

setIsGabyTyping(false);
setLastQuestion(question);
setGabyQuestion("");
}
  return (
    <>
      <Navbar />

      <main className="page-shell">
        <div className="mx-auto w-full max-w-[1650px] px-4">
  <div className="mt-6 grid grid-cols-1 xl:grid-cols-[240px_minmax(0,1fr)] gap-4">
         <aside className="bg-[#111827] border border-zinc-700 rounded-2xl p-4 xl:sticky xl:top-24 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide">
  <p className="text-sm font-black tracking-wide text-zinc-500 mb-4">
    LESSONS
  </p>

  <div className="space-y-2">
    {lessons.map((lesson) => (
      <button
        key={lesson.id}
onClick={() => {
  setActiveLesson(lesson.id);
  setGabyQuestion("");
  setIsGabyTyping(false);
  setGabyAnswer("Hi, I’m Gaby. Ask me anything about this lesson.");
  setMarketSlide(0);
  setSelectedMarketImage(-1);
  setMarketLessonSlide(-1);
  setRiskLessonSlide(-1);
}}
       className={`group relative w-full overflow-hidden rounded-2xl border px-4 py-4 text-left text-sm font-black tracking-wide transition-all duration-300 ${
  activeLesson === lesson.id
    ? "border-cyan-400 bg-cyan-400 text-black shadow-[0_0_25px_rgba(34,211,238,0.35)]"
    : "border-white/5 bg-[#0f172a] text-zinc-400 hover:border-cyan-400/30 hover:bg-[#131c2b] hover:text-cyan-300"
}`}
      >
        <div className="flex items-center">

  <span>
    {lesson.label}
  </span>



</div>
      </button>
    ))}
  </div>
</aside>

<section className="min-w-0 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 scrollbar-hide">
          
      
{activeLesson === "roadmap" && (
<>
<div className="mb-8 overflow-hidden rounded-[40px] border border-cyan-500/10 bg-[#0f172a] shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
  <img
    src="/learn/intro/tradenestx-education-intro.png"
    alt="TradeNestX Education Intro"
    className="block w-full object-contain"
  />
</div>



<div className="mt-8">

  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

    <button
      onClick={() => setSelectedPainPoint("charts")}
      className={`rounded-[22px] border px-6 py-5 text-left transition-all duration-300 hover:-translate-y-[2px] shadow-[0_0_18px_rgba(34,211,238,0.05)] hover:shadow-[0_0_25px_rgba(34,211,238,0.18)] ${
        selectedPainPoint === "charts"
          ? "border-cyan-400 bg-cyan-500/10"
          : "border-white/10 bg-[#18181b] text-white hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"
      }`}
    >
      <p className="text-white font-black text-[20px]">
        Confusing Charts
      </p>
    </button>

    <button
      onClick={() => setSelectedPainPoint("fear")}
      className={`rounded-[22px] border px-6 py-5 text-left transition-all duration-300 hover:-translate-y-[2px] shadow-[0_0_18px_rgba(34,211,238,0.05)] hover:shadow-[0_0_25px_rgba(34,211,238,0.18)] ${
        selectedPainPoint === "fear"
          ? "border-red-400 bg-red-500/10"
          : "border-white/10 bg-[#18181b] text-white hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
      }`}
    >
      <p className="text-white font-black text-[20px]">
        Fear Of Losing Money
      </p>
    </button>

    <button
      onClick={() => setSelectedPainPoint("info")}
      className={`rounded-[22px] border px-6 py-5 text-left transition-all duration-300 hover:-translate-y-[2px] shadow-[0_0_18px_rgba(34,211,238,0.05)] hover:shadow-[0_0_25px_rgba(34,211,238,0.18)] ${
        selectedPainPoint === "info"
          ? "border-orange-400 bg-orange-500/10"
          : "border-white/10 bg-[#18181b] text-white hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-300"
      }`}
    >
      <p className="text-white font-black text-[20px]">
        Too Much Information
      </p>
    </button>

    <button
      onClick={() => setSelectedPainPoint("roadmap")}
      className={`rounded-[22px] border px-6 py-5 text-left transition-all duration-300 hover:-translate-y-[2px] shadow-[0_0_18px_rgba(34,211,238,0.05)] hover:shadow-[0_0_25px_rgba(34,211,238,0.18)] ${
        selectedPainPoint === "roadmap"
          ? "border-emerald-400 bg-emerald-500/10"
          : "border-white/10 bg-[#18181b] text-white hover:border-emerald-400/40 hover:bg-emerald-500/10 hover:text-emerald-300"
      }`}
    >
      <p className="text-white font-black text-[20px]">
        No Clear Roadmap
      </p>
    </button>

  </div>

  <div className="mt-8 rounded-[40px] border border-white/5 bg-[#0d111a]/95 backdrop-blur-xl p-8 lg:p-10">

    <div className="grid lg:grid-cols-[380px_1fr] gap-8 items-start">

      <div>

        {selectedPainPoint === "charts" && (
          <>
            <h3 className="text-4xl font-black text-white leading-tight">
              Why Charts Feel Confusing
            </h3>

            <p className="mt-5 text-zinc-400 text-lg leading-8">
              Most beginners see random candles without understanding trend direction or market structure.
            </p>

            <div className="mt-8 space-y-5">

              <div className="flex gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 font-black">
                  1
                </div>

                <div>
                  <p className="text-white font-bold">
                    Too many candles
                  </p>

                  <p className="text-zinc-500 mt-1">
                    Hard to know what matters.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 font-black">
                  2
                </div>

                <div>
                  <p className="text-white font-bold">
                    No clear direction
                  </p>

                  <p className="text-zinc-500 mt-1">
                    Price moves up and down creating confusion.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 font-black">
                  3
                </div>

                <div>
                  <p className="text-white font-bold">
                    Lack of structure
                  </p>

                  <p className="text-zinc-500 mt-1">
                    Without support and resistance, charts feel random.
                  </p>
                </div>
              </div>

            </div>
          </>
        )}
{selectedPainPoint === "fear" && (
  <>
    <h3 className="text-4xl font-black text-white leading-tight">
      Why Beginners Fear Losing Money
    </h3>

    <p className="mt-5 text-zinc-400 text-lg leading-8">
      New traders often feel fear because they do not understand position size, stop losses, or how much money they are risking.
    </p>

    <div className="mt-8 space-y-5">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/10 text-red-400 font-black">1</div>
        <div>
          <p className="text-white font-bold">Risk feels unknown</p>
          <p className="text-zinc-500 mt-1">Beginners enter trades without knowing the possible loss.</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/10 text-red-400 font-black">2</div>
        <div>
          <p className="text-white font-bold">Emotions take over</p>
          <p className="text-zinc-500 mt-1">Fear can cause panic selling or avoiding good setups.</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/10 text-red-400 font-black">3</div>
        <div>
          <p className="text-white font-bold">No plan creates stress</p>
          <p className="text-zinc-500 mt-1">A trading plan helps reduce emotional decisions.</p>
        </div>
      </div>
    </div>
  </>
)}

{selectedPainPoint === "info" && (
  <>
    <h3 className="text-4xl font-black text-white leading-tight">
      Why Too Much Information Hurts Beginners
    </h3>

    <p className="mt-5 text-zinc-400 text-lg leading-8">
      Beginners often jump between strategies, videos, indicators, and opinions before mastering the basics.
    </p>

    <div className="mt-8 space-y-5">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10 text-orange-400 font-black">1</div>
        <div>
          <p className="text-white font-bold">Too many strategies</p>
          <p className="text-zinc-500 mt-1">Learning everything at once makes trading feel harder.</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10 text-orange-400 font-black">2</div>
        <div>
          <p className="text-white font-bold">Conflicting advice</p>
          <p className="text-zinc-500 mt-1">One person says buy, another says sell, and beginners get stuck.</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10 text-orange-400 font-black">3</div>
        <div>
          <p className="text-white font-bold">Basics get skipped</p>
          <p className="text-zinc-500 mt-1">TradeNestX teaches the foundation first before advanced ideas.</p>
        </div>
      </div>
    </div>
  </>
)}

{selectedPainPoint === "roadmap" && (
  <>
    <h3 className="text-4xl font-black text-white leading-tight">
      Why Beginners Need A Clear Roadmap
    </h3>

    <p className="mt-5 text-zinc-400 text-lg leading-8">
      Most new traders do not fail because they are not smart. They fail because they do not know what to learn first.
    </p>

    <div className="mt-8 space-y-5">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 font-black">1</div>
        <div>
          <p className="text-white font-bold">Start with foundations</p>
          <p className="text-zinc-500 mt-1">Learn what markets are, how orders work, and how charts move.</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 font-black">2</div>
        <div>
          <p className="text-white font-bold">Practice safely</p>
          <p className="text-zinc-500 mt-1">Use the simulator before risking real money.</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 font-black">3</div>
        <div>
          <p className="text-white font-bold">Build confidence slowly</p>
          <p className="text-zinc-500 mt-1">Progress comes from repetition, discipline, and structure.</p>
        </div>
      </div>
    </div>
  </>
)}
      </div>

      <div className="overflow-hidden rounded-[28px] border border-white/5 bg-[#0f172a]">

        <img
          src={
  selectedPainPoint === "charts"
    ? "/learn/pain/charts-confusing.png"
    : selectedPainPoint === "fear"
    ? "/learn/pain/fear-losing-money.png"
    : selectedPainPoint === "info"
    ? "/learn/pain/too-much-information.png"
    : "/learn/pain/no-roadmap.png"
}
          alt="Confusing Charts"
          className="h-full w-full object-cover"
        />

      </div>

    </div>

  </div>

</div>






</>
)}
{activeLesson === "buying" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">
      <div>
        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
          What Are You Buying?
        </h2>

        <p className="mt-5 text-zinc-400 text-[17px] leading-8 max-w-[280px]">
          Before placing a trade, beginners need to understand what they are actually buying and why the price moves.
        </p>

        <div className="mt-8 space-y-6 max-w-[290px]">
          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              1
            </div>
            <div>
              <h3 className="font-black text-white">You are buying ownership</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                A stock represents a small piece of a company. Crypto represents a digital asset.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              2
            </div>
            <div>
              <h3 className="font-black text-white">Price moves by supply and demand</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                If more buyers step in, price can rise. If more sellers take control, price can fall.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              3
            </div>
            <div>
              <h3 className="font-black text-white">You need a reason before entering</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Never buy just because price is moving. Know the setup, risk, and reason first.
              </p>
            </div>
          </div>
        </div>
      </div>

<div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
  <img
    src={
  selectedMarketImage === -1
    ? "/learn/markets/what-are-you-buying.png"
    : [
        "/learn/markets/stocks.png",
        "/learn/markets/crypto.png",
        "/learn/markets/forex.png",
        "/learn/markets/index.png",
        "/learn/markets/futures.png",
        "/learn/markets/options.png",
      ][selectedMarketImage]
}
    alt="Market example"
    className="block w-full h-auto object-contain"
  />

  <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 border-t border-white/10 bg-[#050816] px-4 py-3 -mt-1">
{[
  { name: "Stocks", icon: "📈", color: "text-cyan-300" },
  { name: "Crypto", icon: "₿", color: "text-orange-400" },
  { name: "Forex", icon: "$€", color: "text-emerald-400" },
  { name: "Index", icon: "▮▮▮", color: "text-purple-400" },
  { name: "Futures", icon: "📅", color: "text-yellow-400" },
  { name: "Options", icon: "↕", color: "text-pink-400" },
].map((market, index) => (
      <button
        key={market.name}
        onClick={() => setSelectedMarketImage(index)}
        className={`rounded-2xl border p-4 text-center transition-all duration-300 hover:-translate-y-[2px] ${
          selectedMarketImage === index
            ? "border-cyan-400 bg-cyan-500/10 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.2)]"
            : "border-white/10 bg-[#0b0f1a] text-zinc-400 hover:border-cyan-400/40 hover:text-white"
        }`}
      >
        <div className={`text-2xl font-black ${market.color}`}>
  {market.icon}
</div>

        <div className="mt-2 text-sm font-black">
          {market.name}
        </div>
      </button>
    ))}
  </div>
</div>

    </div>

 <div className="mt-8 rounded-[34px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-5 shadow-[0_0_45px_rgba(34,211,238,0.18)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_0_65px_rgba(34,211,238,0.28)]">
  <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-4 items-center">
<div className="flex items-center justify-center pl-2">
  <img
    src="/gaby.png"
    alt="Gaby AI"
    className="h-[210px] w-[210px] object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.35)]"
  />
</div>

    <div>
      <div className="rounded-2xl border border-cyan-400/30 bg-[#0f172a] p-5">
        {isGabyTyping ? (
  <div className="flex items-center gap-3 pl-4">
    <div className="flex gap-1">
      <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
      <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]"></span>
      <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]"></span>
    </div>

    <p className="text-cyan-300 font-bold">
      Gaby is typing...
    </p>
  </div>
) : (
  <p className="border-l-4 border-cyan-400 pl-4 text-zinc-100 leading-8">
    {gabyAnswer}
  </p>
)}
      </div>
<div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
  {[
    "What is a stock?",
    "Why do prices move?",
    "What is crypto?",
    "What should beginners focus on?",
  ].map((question) => (
    <button
      key={question}
      onClick={() => {
  askGaby(question);
  setGabyQuestion("");
}}
      className="rounded-xl border border-cyan-400/20 bg-[#0b1120] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
    >
      {question}
    </button>
  ))}
</div>

      <div className="mt-4 flex gap-3">
        <input
          value={gabyQuestion}
          onChange={(e) => setGabyQuestion(e.target.value)}
          placeholder="Ask Gaby anything about this lesson..."
          className="flex-1 rounded-2xl border border-white/10 bg-[#0f172a] px-5 py-4 text-white outline-none transition-all duration-300 focus:border-cyan-400"
        />

        <button
  onClick={() => askGaby(gabyQuestion)}
  disabled={isGabyTyping}
  className="rounded-2xl bg-cyan-400 px-6 font-black text-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
>
  {isGabyTyping ? "Thinking..." : "Ask Gaby"}
</button>
      </div>
    </div>

  </div>
</div>
    </div>
  
)}

{activeLesson === "longshort" && (
<div className="mt-14 bg-[#131722] rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
    Bullish vs Bearish Trading
  </h2>

  <p className="text-zinc-500 text-lg mt-4 leading-8 max-w-4xl">
    Markets constantly move between bullish and bearish conditions. Traders must learn who controls the market before entering trades.
  </p>

  <div className="mt-10 grid md:grid-cols-2 gap-6">

    <button
      onClick={() => setSelectedBullBear("bullish")}
      className={`text-left rounded-[28px] border bg-[#18181b] p-7 transition-all duration-300 hover:-translate-y-[4px] ${
        selectedBullBear === "bullish"
          ? "border-cyan-400 bg-cyan-500/10"
          : "border-white/5"
      }`}
    >
      <h3 className="text-2xl font-black text-green-400">
        Bullish Market
      </h3>

      <p className="mt-4 text-zinc-300 leading-7">
        Buyers are stronger and price trends upward.
      </p>
    </button>

    <button
      onClick={() => setSelectedBullBear("bearish")}
      className={`text-left rounded-[28px] border bg-[#18181b] p-7 transition-all duration-300 hover:-translate-y-[4px] ${
        selectedBullBear === "bearish"
          ? "border-cyan-400 bg-cyan-500/10"
          : "border-white/5"
      }`}
    >
      <h3 className="text-2xl font-black text-red-400">
        Bearish Market
      </h3>

      <p className="mt-4 text-zinc-300 leading-7">
        Sellers are stronger and price trends downward.
      </p>
    </button>

  </div>

  <div className="mt-10 rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#111827] to-[#0f172a] p-8">

    {selectedBullBear === "bullish" && (
      <div className="grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            Bullish = Buyers Control Price
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Bullish markets create higher highs and higher lows as buyers continue pushing price upward.
          </p>
        </div>

        <div className="rounded-[28px] border border-green-500/20 bg-[#050816] p-6">

          <div className="relative h-64 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">

            <div className="absolute left-8 bottom-16 h-16 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-24 bottom-24 h-24 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-40 bottom-34 h-28 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-56 bottom-46 h-36 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-72 bottom-60 h-44 w-6 rounded-sm bg-cyan-400" />

            <div className="absolute left-10 bottom-14 h-[3px] w-[300px] rotate-[-24deg] bg-green-400/70" />

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Bullish trend example
          </p>

        </div>

      </div>
    )}

    {selectedBullBear === "bearish" && (
      <div className="grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            Bearish = Sellers Control Price
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Bearish markets create lower highs and lower lows as sellers continue pushing price downward.
          </p>
        </div>

        <div className="rounded-[28px] border border-red-500/20 bg-[#050816] p-6">

          <div className="relative h-64 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">

            <div className="absolute left-8 bottom-58 h-42 w-6 rounded-sm bg-red-400" />
            <div className="absolute left-24 bottom-48 h-34 w-6 rounded-sm bg-red-400" />
            <div className="absolute left-40 bottom-40 h-28 w-6 rounded-sm bg-red-400" />
            <div className="absolute left-56 bottom-28 h-20 w-6 rounded-sm bg-red-400" />
            <div className="absolute left-72 bottom-16 h-16 w-6 rounded-sm bg-cyan-400" />

            <div className="absolute left-10 bottom-56 h-[3px] w-[300px] rotate-[24deg] bg-red-400/70" />

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Bearish trend example
          </p>

        </div>

      </div>
    )}

  </div>

</div>
)}
{activeLesson === "market" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

      <div>

        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
          How The Market Works
        </h2>

        <p className="mt-5 text-zinc-400 text-[17px] leading-8 max-w-[280px]">
          Learn how buyers and sellers move price, why volatility happens, and how supply and demand control the market.
        </p>

        <div className="mt-8 space-y-6 max-w-[290px]">

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              1
            </div>

            <div>
              <h3 className="font-black text-white">
                Buyers and sellers move price
              </h3>

              <p className="mt-1 text-zinc-500 leading-7">
                Markets rise when buyers become stronger than sellers.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              2
            </div>

            <div>
              <h3 className="font-black text-white">
                Supply and demand create movement
              </h3>

              <p className="mt-1 text-zinc-500 leading-7">
                Price changes when buying demand or selling pressure increases.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              3
            </div>

            <div>
              <h3 className="font-black text-white">
                Volatility creates opportunity and risk
              </h3>

              <p className="mt-1 text-zinc-500 leading-7">
                Crypto markets can move very fast during strong momentum.
              </p>
            </div>
          </div>

        </div>

      </div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">

        <img
src={
  marketLessonSlide === -1
    ? "/learn/market/how-market-works.png"
    : [
        "/learn/market/buyers.png",
        "/learn/market/sellers.png",
        "/learn/market/buyers-vs-sellers.png",
        "/learn/market/supply.png",
        "/learn/market/demand.png",
        "/learn/market/supply-vs-demand.png",
        "/learn/market/volatility.png",
      ][marketLessonSlide]
}
          alt="Market lesson"
          className="block w-full h-[625px] object-fill bg-white"
        />

<div className="flex items-center justify-between border-t border-white/10 bg-[#050816] px-6 py-4">

  <button
    onClick={() =>
      setMarketLessonSlide((prev) => (prev === -1 ? 6 : prev - 1))
    }
    className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
  >
    ← Previous
  </button>

  <div className="flex items-center gap-3">

    {[-1, 0, 1, 2, 3, 4, 5, 6].map((dot) => (
      <button
        key={dot}
        onClick={() => setMarketSlide(dot)}
        className={`h-3 w-3 rounded-full transition-all duration-300 ${
          marketLessonSlide === dot
            ? "bg-cyan-400 scale-125"
            : "bg-zinc-600 hover:bg-zinc-400"
        }`}
      />
    ))}

  </div>

  <button
    onClick={() =>
      setMarketLessonSlide((prev) => (prev === 6 ? -1 : prev + 1))
    }
    className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
  >
    Next →
  </button>

</div>

      </div>

    </div>

    <div className="mt-8 rounded-[34px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-5 shadow-[0_0_45px_rgba(34,211,238,0.18)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_0_65px_rgba(34,211,238,0.28)]">

      <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-4 items-center">

        <div className="flex items-center justify-center pl-2">
          <img
            src="/gaby.png"
            alt="Gaby AI"
            className="h-[210px] w-[210px] object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.35)]"
          />
        </div>

        <div>

         <div className="rounded-2xl border border-cyan-400/30 bg-[#0f172a] p-5">
  {isGabyTyping ? (
    <div className="flex items-center gap-3 pl-4">
      <div className="flex gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]"></span>
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]"></span>
      </div>

      <p className="text-cyan-300 font-bold">
        Gaby is typing...
      </p>
    </div>
  ) : (
    <p className="border-l-4 border-cyan-400 pl-4 text-zinc-100 leading-8">
      {gabyAnswer}
    </p>
  )}
</div>

          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">

            {[
              "Why do prices move?",
              "What is volatility?",
              "What is supply and demand?",
              "Why do markets panic?",
            ].map((question) => (
              <button
                key={question}
                onClick={() => {
                  askGaby(question);
                  setGabyQuestion("");
                }}
                className="rounded-xl border border-cyan-400/20 bg-[#0b1120] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
              >
                {question}
              </button>
            ))}

          </div>
          <div className="mt-4 flex gap-3">
            <input
              value={gabyQuestion}
              onChange={(e) => setGabyQuestion(e.target.value)}
              placeholder="Ask Gaby anything about this lesson..."
              className="flex-1 rounded-2xl border border-white/10 bg-[#0f172a] px-5 py-4 text-white outline-none transition-all duration-300 focus:border-cyan-400"
            />

            <button
              onClick={() => askGaby(gabyQuestion)}
              disabled={isGabyTyping}
              className="rounded-2xl bg-cyan-400 px-6 font-black text-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGabyTyping ? "Thinking..." : "Ask Gaby"}
            </button>
          </div>
        </div>

      </div>

    </div>

  </div>
)}

{activeLesson === "orders" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">

      <div>

        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
          Market vs Limit Orders
        </h2>

        <p className="mt-5 text-zinc-400 text-[17px] leading-8 max-w-[280px]">
          Learn the difference between market and limit orders, how traders enter positions, and why order types matter.
        </p>

        <div className="mt-8 space-y-6 max-w-[290px]">

         <div className="flex gap-5">
  <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
    1
  </div>

  <div>
    <h3 className="font-black text-white">
      Market orders execute instantly
    </h3>

    <p className="mt-1 text-zinc-500 leading-7">
      A market order buys or sells immediately at the current price.
    </p>
  </div>
</div>

<div className="flex gap-5">
  <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
    2
  </div>

  <div>
    <h3 className="font-black text-white">
      Limit orders wait for your price
    </h3>

    <p className="mt-1 text-zinc-500 leading-7">
      A limit order only executes at the exact price you choose.
    </p>
  </div>
</div>

<div className="flex gap-5">
  <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
    3
  </div>

  <div>
    <h3 className="font-black text-white">
      Traders use both differently
    </h3>

    <p className="mt-1 text-zinc-500 leading-7">
      Market orders focus on speed while limit orders focus on price precision.
    </p>
  </div>
</div>

        </div>

      </div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">

        <img

 src={[
  "/learn/orders/market-order.png",
  "/learn/orders/limit-order.png",
  "/learn/orders/market-vs-limit.png",
  "/learn/orders/speed-vs-precision.png",
][marketSlide]}
alt="Orders lesson"
          className="block w-full h-[625px] object-fill bg-white"
        />

<div className="flex items-center justify-between border-t border-white/10 bg-[#050816] px-6 py-4">

  <button
    onClick={() =>
      setMarketSlide((prev) => (prev === 0 ? 3 : prev - 1))
    }
    className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
  >
    ← Previous
  </button>

  <div className="flex items-center gap-3">

    {[0, 1, 2, 3].map((dot) => (
      <button
        key={dot}
        onClick={() => setMarketSlide(dot)}
        className={`h-3 w-3 rounded-full transition-all duration-300 ${
          marketSlide === dot
            ? "bg-cyan-400 scale-125"
            : "bg-zinc-600 hover:bg-zinc-400"
        }`}
      />
    ))}

  </div>

  <button
    onClick={() =>
      setMarketSlide((prev) => (prev === 3 ? 0 : prev + 1))
    }
    className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
  >
    Next →
  </button>

</div>

      </div>

    </div>

    <div className="mt-8 rounded-[34px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-5 shadow-[0_0_45px_rgba(34,211,238,0.18)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_0_65px_rgba(34,211,238,0.28)]">

      <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-4 items-center">

        <div className="flex items-center justify-center pl-2">
          <img
            src="/gaby.png"
            alt="Gaby AI"
            className="h-[210px] w-[210px] object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.35)]"
          />
        </div>

        <div>

         <div className="rounded-2xl border border-cyan-400/30 bg-[#0f172a] p-5">
  {isGabyTyping ? (
    <div className="flex items-center gap-3 pl-4">
      <div className="flex gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]"></span>
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]"></span>
      </div>

      <p className="text-cyan-300 font-bold">
        Gaby is typing...
      </p>
    </div>
  ) : (
    <p className="border-l-4 border-cyan-400 pl-4 text-zinc-100 leading-8">
      {gabyAnswer}
    </p>
  )}
</div>

          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">

            {[
              "What is a market order?",
              "What is a limit order?",
              "Which order is safer?",
              "Why do traders use limit orders?",
            ].map((question) => (
              <button
                key={question}
                onClick={() => {
                  askGaby(question);
                  setGabyQuestion("");
                }}
                className="rounded-xl border border-cyan-400/20 bg-[#0b1120] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
              >
                {question}
              </button>
            ))}

          </div>
          <div className="mt-4 flex gap-3">
            <input
            value={gabyQuestion}
              
              onChange={(e) => setGabyQuestion(e.target.value)}
              placeholder="Ask Gaby anything about this lesson..."
              className="flex-1 rounded-2xl border border-white/10 bg-[#0f172a] px-5 py-4 text-white outline-none transition-all duration-300 focus:border-cyan-400"
            />

            <button
              onClick={() => askGaby(gabyQuestion)}
              disabled={isGabyTyping}
              className="rounded-2xl bg-cyan-400 px-6 font-black text-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGabyTyping ? "Thinking..." : "Ask Gaby"}
            </button>
          </div>
        </div>

      </div>

    </div>

  </div>
)}

{activeLesson === "candlesticks" && (
<div className="mt-6 bg-[#131722] rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

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

  <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-5 gap-6">

    {[
      {
        id: "bullish",
        title: "Bullish",
        color: "text-green-400",
        text: "Buyers pushed price higher.",
      },
      {
        id: "bearish",
        title: "Bearish",
        color: "text-red-400",
        text: "Sellers pushed price lower.",
      },
      {
        id: "doji",
        title: "Doji",
        color: "text-cyan-400",
        text: "Buyers and sellers are undecided.",
      },
      {
        id: "hammer",
        title: "Hammer",
        color: "text-orange-400",
        text: "Possible bullish reversal candle.",
      },
      {
        id: "engulfing",
        title: "Engulfing",
        color: "text-yellow-400",
        text: "One strong candle takes control.",
      },
    ].map((item) => (
      <button
        key={item.id}
        onClick={() => setSelectedCandleType(item.id)}
        className={`text-left rounded-[28px] border bg-[#18181b] p-6 transition-all duration-300 ease-out hover:-translate-y-[4px] ${
          selectedCandleType === item.id
            ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
            : "border-white/5 hover:border-cyan-400/30"
        }`}
      >
        <h3 className={`text-2xl font-black ${item.color}`}>
          {item.title}
        </h3>

        <p className="mt-4 text-zinc-300 text-[15px] leading-7">
          {item.text}
        </p>
      </button>
    ))}

  </div>

  <div className="mt-10 rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#111827] to-[#0f172a] p-8">

    <p className="text-sm font-black tracking-[0.25em] text-cyan-400">
      CANDLE VISUAL EXAMPLE
    </p>

    {selectedCandleType === "bullish" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            Bullish Candle = Buyers In Control
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            A bullish candle closes above where it opened. This means buyers pushed the price higher during that candle.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Close is above the open</p>
            <p>• Buyers controlled the candle</p>
            <p>• Usually shown as green</p>
            <p>• Can show upward momentum</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-green-500/20 bg-[#050816] p-6">
          <div className="relative h-72 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden flex items-center justify-center">

            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="relative flex flex-col items-center">
              <p className="mb-3 text-green-400 text-xs font-black tracking-wide">
                HIGH
              </p>

              <div className="w-[3px] h-12 bg-green-400" />

              <div className="w-20 h-32 rounded-md bg-green-400 shadow-[0_0_30px_rgba(74,222,128,0.35)]" />

              <div className="w-[3px] h-12 bg-green-400" />

              <p className="mt-3 text-green-400 text-xs font-black tracking-wide">
                LOW
              </p>
            </div>

            <p className="absolute right-8 top-20 text-green-400 font-black">
              Close ↑
            </p>

            <p className="absolute right-8 bottom-24 text-zinc-400 font-black">
              Open
            </p>

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Price opened lower and closed higher
          </p>
        </div>

      </div>
    )}

    {selectedCandleType === "bearish" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            Bearish Candle = Sellers In Control
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            A bearish candle closes below where it opened. This means sellers pushed the price lower during that candle.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Close is below the open</p>
            <p>• Sellers controlled the candle</p>
            <p>• Usually shown as red</p>
            <p>• Can show downward momentum</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-red-500/20 bg-[#050816] p-6">
          <div className="relative h-72 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden flex items-center justify-center">

            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="relative flex flex-col items-center">
              <p className="mb-3 text-red-400 text-xs font-black tracking-wide">
                HIGH
              </p>

              <div className="w-[3px] h-12 bg-red-400" />

              <div className="w-20 h-32 rounded-md bg-red-400 shadow-[0_0_30px_rgba(248,113,113,0.35)]" />

              <div className="w-[3px] h-12 bg-red-400" />

              <p className="mt-3 text-red-400 text-xs font-black tracking-wide">
                LOW
              </p>
            </div>

            <p className="absolute right-8 top-24 text-zinc-400 font-black">
              Open
            </p>

            <p className="absolute right-8 bottom-20 text-red-400 font-black">
              Close ↓
            </p>

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Price opened higher and closed lower
          </p>
        </div>

      </div>
    )}

    {selectedCandleType === "doji" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            Doji = Market Indecision
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            A doji candle forms when price opens and closes near the same level. It shows buyers and sellers are fighting without clear control.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Open and close are close together</p>
            <p>• Buyers and sellers are balanced</p>
            <p>• Can appear before reversals</p>
            <p>• Shows hesitation</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-cyan-500/20 bg-[#050816] p-6">
          <div className="relative h-72 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden flex items-center justify-center">

            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="relative flex flex-col items-center">
              <div className="w-[3px] h-24 bg-cyan-400" />
              <div className="w-24 h-[6px] rounded-full bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.35)]" />
              <div className="w-[3px] h-24 bg-cyan-400" />
            </div>

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Open and close are nearly equal
          </p>
        </div>

      </div>
    )}

    {selectedCandleType === "hammer" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            Hammer = Buyers Fight Back
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            A hammer has a small body near the top and a long lower wick. It can show sellers pushed price down, but buyers recovered.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Long lower wick</p>
            <p>• Small body near the top</p>
            <p>• Buyers rejected lower prices</p>
            <p>• Can signal reversal after a drop</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-orange-500/20 bg-[#050816] p-6">
          <div className="relative h-72 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden flex items-center justify-center">

            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="relative flex flex-col items-center">
              <div className="w-[3px] h-6 bg-orange-400" />
              <div className="w-20 h-12 rounded-md bg-orange-400 shadow-[0_0_25px_rgba(251,146,60,0.35)]" />
              <div className="w-[3px] h-36 bg-orange-400" />
            </div>

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Long lower wick shows rejection
          </p>
        </div>

      </div>
    )}

    {selectedCandleType === "engulfing" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            Engulfing = One Side Takes Control
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            An engulfing pattern happens when a strong candle completely overtakes the previous candle, showing a shift in control.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Larger candle covers prior candle</p>
            <p>• Shows stronger momentum</p>
            <p>• Can be bullish or bearish</p>
            <p>• Signals possible shift in control</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-yellow-500/20 bg-[#050816] p-6">
          <div className="relative h-72 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden flex items-center justify-center gap-8">

            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="relative flex flex-col items-center">
              <div className="w-[2px] h-8 bg-red-400" />
              <div className="w-12 h-20 rounded-md bg-red-400" />
              <div className="w-[2px] h-8 bg-red-400" />
            </div>

            <div className="relative flex flex-col items-center">
              <div className="w-[3px] h-10 bg-green-400" />
              <div className="w-20 h-36 rounded-md bg-green-400 shadow-[0_0_25px_rgba(74,222,128,0.35)]" />
              <div className="w-[3px] h-10 bg-green-400" />
            </div>

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Strong candle overtakes previous candle
          </p>
        </div>

      </div>
    )}

  </div>

</div>
)}
{activeLesson === "timeframes" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
    Trading Timeframes
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Different timeframes show different levels of market movement. Traders use timeframes based on their strategy and trading style.
  </p>

  <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-6">

    {[
      {
        id: "1min",
        title: "1 Minute",
        color: "text-red-400",
        text: "Very fast movement used mostly by scalpers and aggressive day traders.",
      },
      {
        id: "15min",
        title: "15 Minute",
        color: "text-orange-400",
        text: "Popular for intraday trading and short-term setups.",
      },
      {
        id: "1hour",
        title: "1 Hour",
        color: "text-cyan-400",
        text: "Helps traders see clearer trends and market structure.",
      },
      {
        id: "daily",
        title: "Daily",
        color: "text-green-400",
        text: "Shows the bigger picture and long-term market direction.",
      },
    ].map((item) => (
      <button
        key={item.id}
        onClick={() => setSelectedTimeframe(item.id)}
        className={`text-left rounded-[28px] border bg-[#18181b] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] ${
          selectedTimeframe === item.id
            ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
            : "border-white/5 hover:border-cyan-400/30"
        }`}
      >
        <h3 className={`text-2xl font-black ${item.color}`}>
          {item.title}
        </h3>

        <p className="mt-4 text-zinc-300 text-[16px] leading-7">
          {item.text}
        </p>
      </button>
    ))}

  </div>

  <div className="mt-10 rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#111827] to-[#0f172a] p-8">

    <p className="text-sm font-black tracking-[0.25em] text-cyan-400">
      TIMEFRAME EXAMPLE
    </p>

    {selectedTimeframe === "1min" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            1 Minute = Fast & Noisy
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Lower timeframes move quickly and contain more market noise. Beginners often struggle because price changes very fast.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Fast candle movement</p>
            <p>• High emotional pressure</p>
            <p>• More fakeouts</p>
            <p>• Requires fast decisions</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-red-500/20 bg-[#050816] p-6">
          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">

            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="absolute left-6 top-6 rounded-xl bg-red-500/20 border border-red-400/20 px-3 py-1 text-xs font-black text-red-400">
              HIGH VOLATILITY
            </div>

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Fast intraday movement
          </p>
        </div>

      </div>
    )}

    {selectedTimeframe === "15min" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            15 Minute = Balanced Intraday View
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Many traders use the 15-minute chart because it balances speed with cleaner market structure.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Cleaner setups</p>
            <p>• Good for day traders</p>
            <p>• Less noise than 1-minute</p>
            <p>• Better trend visibility</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-orange-500/20 bg-[#050816] p-6">
          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">

            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="absolute left-6 top-6 rounded-xl bg-orange-500/20 border border-orange-400/20 px-3 py-1 text-xs font-black text-orange-400">
              POPULAR DAY TRADING TIMEFRAME
            </div>

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Balanced market structure
          </p>
        </div>

      </div>
    )}

    {selectedTimeframe === "1hour" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            1 Hour = Clearer Trend Structure
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            The 1-hour chart helps traders see trends more clearly while filtering out smaller price fluctuations.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Cleaner trend direction</p>
            <p>• Less emotional trading</p>
            <p>• Better structure visibility</p>
            <p>• Popular swing timeframe</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-cyan-500/20 bg-[#050816] p-6">
          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">

            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="absolute left-6 top-6 rounded-xl bg-cyan-500/20 border border-cyan-400/20 px-3 py-1 text-xs font-black text-cyan-400">
              CLEANER TREND VIEW
            </div>

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Better market structure visibility
          </p>
        </div>

      </div>
    )}

    {selectedTimeframe === "daily" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            Daily = The Bigger Picture
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Daily charts focus on broader market direction and long-term trends instead of short-term noise.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Long-term market direction</p>
            <p>• Less emotional movement</p>
            <p>• Cleaner analysis</p>
            <p>• Stronger trend confirmation</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-green-500/20 bg-[#050816] p-6">
          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">

            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="absolute left-6 top-6 rounded-xl bg-green-500/20 border border-green-400/20 px-3 py-1 text-xs font-black text-green-400">
              BIGGER MARKET PICTURE
            </div>

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Long-term trend analysis
          </p>
        </div>

      </div>
    )}

  </div>

</div>
)}

{activeLesson === "volume" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
    Volume Basics
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Volume shows how much trading activity is happening. It helps traders understand whether a move is strong or weak.
  </p>

  <div className="mt-10 grid md:grid-cols-3 gap-6">

    {[
      {
        id: "high",
        title: "High Volume",
        color: "text-green-400",
        text: "Strong participation from buyers or sellers.",
      },
      {
        id: "low",
        title: "Low Volume",
        color: "text-yellow-400",
        text: "Weak participation and less reliable movement.",
      },
      {
        id: "breakout",
        title: "Volume Breakout",
        color: "text-cyan-400",
        text: "A breakout is stronger when volume increases.",
      },
    ].map((item) => (
      <button
        key={item.id}
        onClick={() => setSelectedVolumeType(item.id)}
        className={`text-left rounded-[28px] border bg-[#18181b] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] ${
          selectedVolumeType === item.id
            ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
            : "border-white/5 hover:border-cyan-400/30"
        }`}
      >
        <h3 className={`text-2xl font-black ${item.color}`}>
          {item.title}
        </h3>

        <p className="mt-4 text-zinc-300 text-[16px] leading-7">
          {item.text}
        </p>
      </button>
    ))}

  </div>

  <div className="mt-10 rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#111827] to-[#0f172a] p-8">

    <p className="text-sm font-black tracking-[0.25em] text-cyan-400">
      VOLUME EXAMPLE
    </p>

    {selectedVolumeType === "high" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            High Volume = Strong Participation
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            High volume means many traders are involved. When price moves with high volume, the move is usually more meaningful.
          </p>
        </div>

        <div className="rounded-[28px] border border-green-500/20 bg-[#050816] p-6">
          <div className="h-56 rounded-2xl bg-[#0f172a] border border-white/5 flex items-end gap-3 px-6 py-5">
            <div className="w-8 h-12 bg-green-400 rounded-t-lg" />
            <div className="w-8 h-20 bg-green-400 rounded-t-lg" />
            <div className="w-8 h-28 bg-green-400 rounded-t-lg" />
            <div className="w-8 h-36 bg-green-400 rounded-t-lg" />
            <div className="w-8 h-44 bg-green-400 rounded-t-lg shadow-[0_0_20px_rgba(74,222,128,0.35)]" />
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Volume increasing with strength
          </p>
        </div>
      </div>
    )}

    {selectedVolumeType === "low" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            Low Volume = Weak Participation
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Low volume means fewer traders are involved. Moves with low volume may be weaker and less reliable.
          </p>
        </div>

        <div className="rounded-[28px] border border-yellow-500/20 bg-[#050816] p-6">
          <div className="h-56 rounded-2xl bg-[#0f172a] border border-white/5 flex items-end gap-3 px-6 py-5">
            <div className="w-8 h-12 bg-yellow-400 rounded-t-lg" />
            <div className="w-8 h-16 bg-yellow-400 rounded-t-lg" />
            <div className="w-8 h-10 bg-yellow-400 rounded-t-lg" />
            <div className="w-8 h-14 bg-yellow-400 rounded-t-lg" />
            <div className="w-8 h-11 bg-yellow-400 rounded-t-lg" />
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Lower activity and weaker confirmation
          </p>
        </div>
      </div>
    )}

    {selectedVolumeType === "breakout" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            Breakouts Need Volume Confirmation
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            A breakout with rising volume can show stronger demand. A breakout with weak volume may fail more easily.
          </p>
        </div>

        <div className="rounded-[28px] border border-cyan-500/20 bg-[#050816] p-6">
          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">
            <div className="absolute left-6 right-6 top-24 h-[3px] bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]" />

            <div className="absolute left-8 bottom-20 h-16 w-8 rounded-t-md bg-green-400" />
            <div className="absolute left-24 bottom-28 h-24 w-8 rounded-t-md bg-green-400" />
            <div className="absolute left-40 bottom-36 h-28 w-8 rounded-t-md bg-green-400" />
            <div className="absolute left-56 bottom-44 h-36 w-8 rounded-t-md bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.35)]" />

            <div className="absolute left-8 bottom-4 h-4 w-8 bg-cyan-400/60" />
            <div className="absolute left-24 bottom-4 h-7 w-8 bg-cyan-400/60" />
            <div className="absolute left-40 bottom-4 h-10 w-8 bg-cyan-400/60" />
            <div className="absolute left-56 bottom-4 h-16 w-8 bg-cyan-400/80" />
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Breakout confirmed by volume
          </p>
        </div>
      </div>
    )}

  </div>

</div>
)}

{activeLesson === "supplydemand" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
    Supply & Demand
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Markets move because of buyers and sellers. Supply and demand zones help traders identify where strong reactions may happen.
  </p>

  <div className="mt-10 grid md:grid-cols-3 gap-6">

    {[
      {
        id: "demand",
        title: "Demand Zone",
        color: "text-green-400",
        text: "An area where buyers become aggressive and push price higher.",
      },
      {
        id: "supply",
        title: "Supply Zone",
        color: "text-red-400",
        text: "An area where sellers enter and push price lower.",
      },
      {
        id: "imbalance",
        title: "Market Imbalance",
        color: "text-cyan-400",
        text: "When one side becomes much stronger than the other.",
      },
    ].map((item) => (
      <button
        key={item.id}
        onClick={() => setSelectedSupplyDemand(item.id)}
        className={`text-left rounded-[28px] border bg-[#18181b] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] ${
          selectedSupplyDemand === item.id
            ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
            : "border-white/5 hover:border-cyan-400/30"
        }`}
      >
        <h3 className={`text-2xl font-black ${item.color}`}>
          {item.title}
        </h3>

        <p className="mt-4 text-zinc-300 text-[16px] leading-7">
          {item.text}
        </p>
      </button>
    ))}

  </div>

  <div className="mt-10 rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#111827] to-[#0f172a] p-8">

    <p className="text-sm font-black tracking-[0.25em] text-cyan-400">
      MARKET EXAMPLE
    </p>

    {selectedSupplyDemand === "demand" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            Demand Zone = Buyers Step In
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Demand zones are areas where buyers become aggressive and push price upward. Traders watch these areas for possible rebounds.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Strong buying activity</p>
            <p>• Price rejection lower</p>
            <p>• Momentum shifts upward</p>
            <p>• Possible support reaction</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-green-500/20 bg-[#050816] p-6">
          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">

            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="absolute left-6 right-6 bottom-20 h-[3px] bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.4)]" />

            <div className="absolute left-8 bottom-28 h-12 w-6 rounded-sm bg-red-400" />
            <div className="absolute left-24 bottom-20 h-14 w-6 rounded-sm bg-red-400" />
            <div className="absolute left-40 bottom-16 h-20 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-56 bottom-32 h-24 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-72 bottom-48 h-30 w-6 rounded-sm bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.35)]" />

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Buyers defend the demand zone
          </p>
        </div>

      </div>
    )}

    {selectedSupplyDemand === "supply" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            Supply Zone = Sellers Take Control
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Supply zones are areas where sellers overwhelm buyers and force price downward.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Heavy selling pressure</p>
            <p>• Price rejection higher</p>
            <p>• Momentum shifts downward</p>
            <p>• Possible resistance reaction</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-red-500/20 bg-[#050816] p-6">
          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">

            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="absolute left-6 right-6 top-20 h-[3px] bg-red-400 shadow-[0_0_20px_rgba(248,113,113,0.4)]" />

            <div className="absolute left-8 bottom-20 h-20 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-24 bottom-36 h-24 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-40 bottom-44 h-20 w-6 rounded-sm bg-red-400" />
            <div className="absolute left-56 bottom-28 h-26 w-6 rounded-sm bg-red-400" />
            <div className="absolute left-72 bottom-12 h-30 w-6 rounded-sm bg-red-400 shadow-[0_0_20px_rgba(248,113,113,0.35)]" />

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Sellers defend the supply zone
          </p>
        </div>

      </div>
    )}

    {selectedSupplyDemand === "imbalance" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            Imbalance = One Side Dominates
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Imbalances happen when buyers or sellers become much stronger, causing fast movement in one direction.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Explosive momentum</p>
            <p>• Strong directional movement</p>
            <p>• Aggressive market participation</p>
            <p>• Often leads to breakouts</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-cyan-500/20 bg-[#050816] p-6">
          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">

            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="absolute left-8 bottom-18 h-16 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-24 bottom-24 h-22 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-40 bottom-32 h-28 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-56 bottom-42 h-38 w-6 rounded-sm bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.4)]" />
            <div className="absolute left-72 bottom-58 h-44 w-6 rounded-sm bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)]" />

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Strong imbalance creates momentum
          </p>
        </div>

      </div>
    )}

  </div>

</div>
)}
{activeLesson === "risk" && (
  <div className="rounded-[40px] border border-white/10 bg-[#0b0f1a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">
      <div>
        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
          Protecting Your Capital
        </h2>

        <p className="mt-5 text-zinc-400 text-[17px] leading-8 max-w-[280px]">
          Protecting your money is more important than making fast money. Good traders survive by controlling risk first.
        </p>

        <div className="mt-8 space-y-6 max-w-[290px]">
          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              1
            </div>
            <div>
              <h3 className="font-black text-white">Small losses are normal</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Every trader loses sometimes. Good traders keep losses small and controlled.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              2
            </div>
            <div>
              <h3 className="font-black text-white">Protect your account first</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Risking too much on one trade can destroy weeks of progress.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-black">
              3
            </div>
            <div>
              <h3 className="font-black text-white">Discipline beats emotions</h3>
              <p className="mt-1 text-zinc-500 leading-7">
                Fear and revenge trading often cause bigger losses than bad strategies.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black">
        <img
          src={
            riskLessonSlide === -1
              ? "/learn/risk/protecting-your-capital.png"
              : [
                  "/learn/risk/small-risk-vs-big-risk.png",
                  "/learn/risk/stop-loss-protection.png",
                  "/learn/risk/revenge-trading.png",               
                  "/learn/risk/risk-to-reward.png",
                  "/learn/risk/overtrading-warning.png",
                  "/learn/risk/protecting-capital-pyramid.png",
                  "/learn/risk/one-bad-trade.png",
                  "/learn/risk/demo-first.png",
                ][riskLessonSlide]
          }
          alt="Protecting Your Capital"
          className="block w-full h-[625px] object-fill bg-white"
        />

        <div className="flex items-center justify-between border-t border-white/10 bg-[#050816] px-6 py-4">
          <button
            onClick={() =>
              setRiskLessonSlide((prev) => (prev === -1 ? 7 : prev - 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-3">
            {[-1, 0, 1, 2, 3, 4, 5, 6, 7].map((dot) => (
              <button
                key={dot}
                onClick={() => setRiskLessonSlide(dot)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  riskLessonSlide === dot
                    ? "bg-cyan-400 scale-125"
                    : "bg-zinc-600 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setRiskLessonSlide((prev) => (prev === 7 ? -1 : prev + 1))
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-3 font-bold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
          >
            Next →
          </button>
        </div>
      </div>
    </div>


<div className="mt-8 rounded-[34px] border border-cyan-400/40 bg-gradient-to-r from-[#07111f] via-[#0b1120] to-[#050816] p-5 shadow-[0_0_45px_rgba(34,211,238,0.18)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_0_65px_rgba(34,211,238,0.28)]">
  <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-4 items-center">

    <div className="flex items-center justify-center pl-2">
      <img
        src="/gaby.png"
        alt="Gaby AI"
        className="h-[210px] w-[210px] object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.35)]"
      />
    </div>

    <div>
      <div className="rounded-2xl border border-cyan-400/30 bg-[#0f172a] p-5">
        {isGabyTyping ? (
          <div className="flex items-center gap-3 pl-4">
            <div className="flex gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]"></span>
              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]"></span>
            </div>

            <p className="text-cyan-300 font-bold">
              Gaby is typing...
            </p>
          </div>
        ) : (
          <p className="border-l-4 border-cyan-400 pl-4 text-zinc-100 leading-8">
            {gabyAnswer}
          </p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          "What is risk management?",
          "Why do traders use stop losses?",
          "What is revenge trading?",
          "Why is protecting capital important?",
        ].map((question) => (
          <button
            key={question}
            onClick={() => {
              askGaby(question);
              setGabyQuestion("");
            }}
            className="rounded-xl border border-cyan-400/20 bg-[#0b1120] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
          >
            {question}
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-3">
        <input
          value={gabyQuestion}
          onChange={(e) => setGabyQuestion(e.target.value)}
          placeholder="Ask Gaby anything about this lesson..."
          className="flex-1 rounded-2xl border border-white/10 bg-[#0f172a] px-5 py-4 text-white outline-none transition-all duration-300 focus:border-cyan-400"
        />

        <button
          onClick={() => askGaby(gabyQuestion)}
          disabled={isGabyTyping}
          className="rounded-2xl bg-cyan-400 px-6 font-black text-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isGabyTyping ? "Thinking..." : "Ask Gaby"}
        </button>
      </div>
    </div>

  </div>
</div>

</div>
)}
{activeLesson === "support" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
    Support & Resistance
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Support and resistance are important price zones where buyers and sellers may react.
  </p>

  <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-6">

    {[
      {
        id: "support",
        title: "Support",
        color: "text-green-400",
        text: "A price area where buyers may step in and stop price from falling.",
      },
      {
        id: "resistance",
        title: "Resistance",
        color: "text-red-400",
        text: "A price area where sellers may step in and stop price from rising.",
      },
      {
        id: "breakout",
        title: "Breakout",
        color: "text-cyan-400",
        text: "When price pushes strongly through an important level.",
      },
      {
        id: "retest",
        title: "Retest",
        color: "text-orange-400",
        text: "When price returns to test a broken level before continuing.",
      },
    ].map((item) => (
      <button
        key={item.id}
        onClick={() => setSelectedSupportType(item.id)}
        className={`text-left rounded-[28px] border bg-[#18181b] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] ${
          selectedSupportType === item.id
            ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
            : "border-white/5 hover:border-cyan-400/30"
        }`}
      >
        <h3 className={`text-2xl font-black ${item.color}`}>
          {item.title}
        </h3>

        <p className="mt-4 text-zinc-300 text-[16px] leading-7">
          {item.text}
        </p>
      </button>
    ))}

  </div>

  <div className="mt-10 rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#111827] to-[#0f172a] p-8">

    <p className="text-sm font-black tracking-[0.25em] text-cyan-400">
      VISUAL MARKET EXAMPLE
    </p>

    {selectedSupportType === "support" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            Support = Buyers Defend A Price Area
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Support is where price stops falling because buyers become interested. Beginners often look for price reactions near support.
          </p>
        </div>

        <div className="rounded-[28px] border border-green-500/20 bg-[#050816] p-6">
          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">
            <div className="absolute left-6 right-6 bottom-16 h-[3px] bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.5)]" />
            <div className="absolute left-8 bottom-28 h-16 w-4 rounded-t-md bg-red-400" />
            <div className="absolute left-24 bottom-20 h-24 w-4 rounded-t-md bg-red-400" />
            <div className="absolute left-40 bottom-16 h-20 w-4 rounded-t-md bg-green-400" />
            <div className="absolute left-56 bottom-24 h-32 w-4 rounded-t-md bg-green-400" />
            <div className="absolute left-72 bottom-36 h-20 w-4 rounded-t-md bg-green-400" />
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Price bounces from support
          </p>
        </div>
      </div>
    )}

    {selectedSupportType === "resistance" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            Resistance = Sellers Defend A Price Area
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Resistance is where price stops rising because sellers become active. Traders watch these areas for weakness or rejection.
          </p>
        </div>

        <div className="rounded-[28px] border border-red-500/20 bg-[#050816] p-6">
          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">
            <div className="absolute left-6 right-6 top-16 h-[3px] bg-red-400 shadow-[0_0_20px_rgba(248,113,113,0.5)]" />
            <div className="absolute left-8 bottom-20 h-20 w-4 rounded-t-md bg-green-400" />
            <div className="absolute left-24 bottom-32 h-28 w-4 rounded-t-md bg-green-400" />
            <div className="absolute left-40 bottom-36 h-20 w-4 rounded-t-md bg-red-400" />
            <div className="absolute left-56 bottom-24 h-28 w-4 rounded-t-md bg-red-400" />
            <div className="absolute left-72 bottom-16 h-20 w-4 rounded-t-md bg-red-400" />
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Price rejects from resistance
          </p>
        </div>
      </div>
    )}

    {selectedSupportType === "breakout" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            Breakout = Price Pushes Through A Level
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            A breakout happens when price moves strongly above resistance or below support. Strong breakouts often happen with momentum.
          </p>
        </div>

        <div className="rounded-[28px] border border-cyan-500/20 bg-[#050816] p-6">
          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">
            <div className="absolute left-6 right-6 top-24 h-[3px] bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
            <div className="absolute left-8 bottom-20 h-16 w-4 rounded-t-md bg-green-400" />
            <div className="absolute left-24 bottom-28 h-24 w-4 rounded-t-md bg-green-400" />
            <div className="absolute left-40 bottom-36 h-28 w-4 rounded-t-md bg-green-400" />
            <div className="absolute left-56 bottom-44 h-36 w-4 rounded-t-md bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.35)]" />
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Price breaks above resistance
          </p>
        </div>
      </div>
    )}

    {selectedSupportType === "retest" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            Retest = Price Checks A Broken Level
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            After a breakout, price may return to the old level before continuing. This is called a retest.
          </p>
        </div>

        <div className="rounded-[28px] border border-orange-500/20 bg-[#050816] p-6">
          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">
            <div className="absolute left-6 right-6 bottom-24 h-[3px] bg-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.5)]" />
            <div className="absolute left-8 bottom-20 h-20 w-4 rounded-t-md bg-green-400" />
            <div className="absolute left-24 bottom-32 h-32 w-4 rounded-t-md bg-green-400" />
            <div className="absolute left-40 bottom-40 h-28 w-4 rounded-t-md bg-red-400" />
            <div className="absolute left-56 bottom-24 h-20 w-4 rounded-t-md bg-orange-400" />
            <div className="absolute left-72 bottom-36 h-36 w-4 rounded-t-md bg-green-400" />
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Broken level becomes support
          </p>
        </div>
      </div>
    )}

  </div>

</div>
)}
{activeLesson === "setups" && (
<div className="mt-14 bg-[#131722] rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
    Building A Trade Plan
  </h2>

  <p className="text-zinc-500 text-lg mt-4 leading-8 max-w-4xl">
    A trade plan helps traders make decisions before emotions take over. Every trade should have a clear entry, stop loss, target, and risk plan.
  </p>

  <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-6">

    {[
      {
        id: "entry",
        title: "Entry",
        color: "text-cyan-400",
        text: "Where you plan to enter the trade.",
      },
      {
        id: "stop",
        title: "Stop Loss",
        color: "text-red-400",
        text: "Where you exit if the trade goes wrong.",
      },
      {
        id: "target",
        title: "Profit Target",
        color: "text-green-400",
        text: "Where you may take profit if the trade works.",
      },
      {
        id: "risk",
        title: "Risk Plan",
        color: "text-orange-400",
        text: "How much you are willing to risk.",
      },
    ].map((item) => (
      <button
        key={item.id}
        onClick={() => setSelectedTradePlan(item.id)}
        className={`text-left rounded-[28px] border bg-[#18181b] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] ${
          selectedTradePlan === item.id
            ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
            : "border-white/5 hover:border-cyan-400/30"
        }`}
      >
        <h3 className={`text-2xl font-black ${item.color}`}>
          {item.title}
        </h3>

        <p className="mt-4 text-zinc-300 text-[16px] leading-7">
          {item.text}
        </p>
      </button>
    ))}

  </div>

  <div className="mt-10 rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#111827] to-[#0f172a] p-8">

    <p className="text-sm font-black tracking-[0.25em] text-cyan-400">
      TRADE PLAN EXAMPLE
    </p>

    {selectedTradePlan === "entry" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            Entry = Your Planned Starting Point
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            A good entry is not random. Traders enter when price reaches an area that matches their plan.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Enter near a planned level</p>
            <p>• Avoid chasing late moves</p>
            <p>• Wait for confirmation</p>
            <p>• Follow your setup rules</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-cyan-500/20 bg-[#050816] p-6">
          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">
            <div className="absolute left-8 right-8 bottom-28 h-[3px] bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]" />

            <div className="absolute right-8 bottom-36 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-cyan-400 font-black">
              ENTRY
            </div>
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Plan your entry before the trade
          </p>
        </div>
      </div>
    )}

    {selectedTradePlan === "stop" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            Stop Loss = Your Protection Level
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Your stop loss defines the point where the trade idea is wrong. It protects your account from large damage.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Protects your account</p>
            <p>• Prevents oversized losses</p>
            <p>• Removes emotional guessing</p>
            <p>• Defines trade risk</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-red-500/20 bg-[#050816] p-6">
          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">
            <div className="absolute left-8 right-8 bottom-32 h-[3px] bg-cyan-400" />
            <div className="absolute left-8 right-8 bottom-18 h-[3px] bg-red-400 shadow-[0_0_20px_rgba(248,113,113,0.4)]" />

            <p className="absolute right-8 bottom-40 text-cyan-400 font-black">
              ENTRY
            </p>

            <p className="absolute right-8 bottom-8 text-red-400 font-black">
              STOP LOSS
            </p>
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Stop loss defines controlled risk
          </p>
        </div>
      </div>
    )}

    {selectedTradePlan === "target" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            Profit Target = Your Planned Exit
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            A profit target helps traders know where they may take gains before greed takes over.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Defines where to take profit</p>
            <p>• Reduces greed-based decisions</p>
            <p>• Creates structure</p>
            <p>• Helps measure risk/reward</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-green-500/20 bg-[#050816] p-6">
          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">
            <div className="absolute left-8 right-8 top-18 h-[3px] bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.4)]" />
            <div className="absolute left-8 right-8 bottom-32 h-[3px] bg-cyan-400" />

            <p className="absolute right-8 top-8 text-green-400 font-black">
              TARGET
            </p>

            <p className="absolute right-8 bottom-40 text-cyan-400 font-black">
              ENTRY
            </p>
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Target defines planned profit
          </p>
        </div>
      </div>
    )}

    {selectedTradePlan === "risk" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            Risk Plan = Know The Loss Before Entry
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Before entering, traders decide how much they are willing to lose. This helps avoid emotional and oversized trades.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Decide risk before entry</p>
            <p>• Use smaller position sizes</p>
            <p>• Avoid risking the full account</p>
            <p>• Protect long-term consistency</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-orange-500/20 bg-[#050816] p-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-green-400/20 bg-green-500/10 p-5 text-center">
              <p className="text-green-400 text-2xl font-black">1%</p>
              <p className="mt-2 text-zinc-500 text-xs font-bold">LOW RISK</p>
            </div>

            <div className="rounded-2xl border border-orange-400/20 bg-orange-500/10 p-5 text-center">
              <p className="text-orange-400 text-2xl font-black">5%</p>
              <p className="mt-2 text-zinc-500 text-xs font-bold">HIGHER</p>
            </div>

            <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-5 text-center">
              <p className="text-red-400 text-2xl font-black">20%</p>
              <p className="mt-2 text-zinc-500 text-xs font-bold">DANGER</p>
            </div>
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Risk must be controlled before entry
          </p>
        </div>
      </div>
    )}

  </div>

</div>
)}

{activeLesson === "mistakes" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
    Common Beginner Mistakes
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Most beginner losses come from emotional decisions, poor risk management, and rushing into trades without a plan.
  </p>

  <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-6">

    {[
      {
        id: "revenge",
        title: "Revenge Trading",
        color: "text-red-400",
        text: "Trying to win back losses quickly after a bad trade.",
      },
      {
        id: "overtrading",
        title: "Overtrading",
        color: "text-orange-400",
        text: "Taking too many trades instead of waiting for quality setups.",
      },
      {
        id: "fomo",
        title: "FOMO",
        color: "text-cyan-400",
        text: "Entering late because you are afraid of missing the move.",
      },
      {
        id: "norisk",
        title: "Ignoring Risk",
        color: "text-green-400",
        text: "Focusing only on profit while forgetting account protection.",
      },
    ].map((item) => (
      <button
        key={item.id}
        onClick={() => setSelectedMistake(item.id)}
        className={`text-left rounded-[28px] border bg-[#18181b] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] ${
          selectedMistake === item.id
            ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
            : "border-white/5 hover:border-cyan-400/30"
        }`}
      >
        <h3 className={`text-2xl font-black ${item.color}`}>
          {item.title}
        </h3>

        <p className="mt-4 text-zinc-300 text-[16px] leading-7">
          {item.text}
        </p>
      </button>
    ))}

  </div>

  <div className="mt-10 rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#111827] to-[#0f172a] p-8">

    <p className="text-sm font-black tracking-[0.25em] text-cyan-400">
      COACHING EXAMPLE
    </p>

    {selectedMistake === "revenge" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            Revenge Trading = Trading Angry
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            After a loss, beginners may try to force another trade to win the money back. This usually leads to bigger losses.
          </p>

          <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
            <p className="text-red-400 font-black">
              Coach Tip
            </p>
            <p className="mt-2 text-zinc-300 leading-7">
              After a loss, pause. Review the trade. Do not enter another trade just because you are frustrated.
            </p>
          </div>
        </div>

        <div className="rounded-[28px] border border-red-500/20 bg-[#050816] p-6">
          <div className="grid gap-4">
            <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-5">
              <p className="text-red-400 text-xl font-black">Loss</p>
              <p className="mt-2 text-zinc-400">Trader gets emotional</p>
            </div>

            <div className="rounded-2xl border border-orange-400/20 bg-orange-500/10 p-5">
              <p className="text-orange-400 text-xl font-black">Forced Trade</p>
              <p className="mt-2 text-zinc-400">No setup, no plan</p>
            </div>

            <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-5">
              <p className="text-red-400 text-xl font-black">Bigger Loss</p>
              <p className="mt-2 text-zinc-400">Emotion damages account</p>
            </div>
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Emotional trading creates a loss cycle
          </p>
        </div>
      </div>
    )}

    {selectedMistake === "overtrading" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            Overtrading = Too Many Low-Quality Trades
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            More trades does not mean more profits. Beginners often trade too much because they feel they need to always be active.
          </p>

          <div className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5">
            <p className="text-orange-400 font-black">
              Coach Tip
            </p>
            <p className="mt-2 text-zinc-300 leading-7">
              Wait for clean setups. A disciplined trader does not need to trade every candle.
            </p>
          </div>
        </div>

        <div className="rounded-[28px] border border-orange-500/20 bg-[#050816] p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-orange-500/10 border border-orange-400/20 p-5 text-center">
              <p className="text-orange-400 text-3xl font-black">12</p>
              <p className="mt-2 text-zinc-500 text-xs font-bold">RANDOM TRADES</p>
            </div>
            <div className="rounded-2xl bg-green-500/10 border border-green-400/20 p-5 text-center">
              <p className="text-green-400 text-3xl font-black">2</p>
              <p className="mt-2 text-zinc-500 text-xs font-bold">QUALITY SETUPS</p>
            </div>
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Quality beats quantity
          </p>
        </div>
      </div>
    )}

    {selectedMistake === "fomo" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            FOMO = Chasing Late Entries
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            FOMO happens when a trader enters after price already moved because they are afraid of missing out.
          </p>

          <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
            <p className="text-cyan-400 font-black">
              Coach Tip
            </p>
            <p className="mt-2 text-zinc-300 leading-7">
              If the move is already gone, let it go. Wait for the next clean setup.
            </p>
          </div>
        </div>

        <div className="rounded-[28px] border border-cyan-500/20 bg-[#050816] p-6">
          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">
            <div className="absolute left-10 bottom-16 h-[3px] w-[260px] rotate-[-25deg] bg-green-400/70" />
            <div className="absolute left-10 bottom-10 h-10 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-24 bottom-24 h-14 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-38 bottom-42 h-20 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-52 bottom-66 h-28 w-6 rounded-sm bg-green-400" />
            <div className="absolute right-12 top-10 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-red-400 font-black">
              Late Entry
            </div>
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Chasing after the move increases risk
          </p>
        </div>
      </div>
    )}

    {selectedMistake === "norisk" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            Ignoring Risk = Trading Without Protection
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Beginners sometimes focus only on how much they can make, but professional traders focus first on how much they can lose.
          </p>

          <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
            <p className="text-green-400 font-black">
              Coach Tip
            </p>
            <p className="mt-2 text-zinc-300 leading-7">
              Before every trade, know your entry, stop loss, target, and position size.
            </p>
          </div>
        </div>

        <div className="rounded-[28px] border border-green-500/20 bg-[#050816] p-6">
          <div className="grid gap-4">
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-5">
              <p className="text-cyan-400 text-xl font-black">Entry</p>
              <p className="mt-2 text-zinc-400">Where trade starts</p>
            </div>

            <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-5">
              <p className="text-red-400 text-xl font-black">Stop Loss</p>
              <p className="mt-2 text-zinc-400">Where risk is controlled</p>
            </div>

            <div className="rounded-2xl border border-green-400/20 bg-green-500/10 p-5">
              <p className="text-green-400 text-xl font-black">Target</p>
              <p className="mt-2 text-zinc-400">Where profit may be taken</p>
            </div>
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Plan the risk before the reward
          </p>
        </div>
      </div>
    )}

  </div>

</div>
)}
{activeLesson === "trends" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
    Market Trends
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Trends help traders understand the direction of the market and avoid trading against momentum.
  </p>

  <div className="mt-10 grid md:grid-cols-3 gap-6">

    {[
      {
        id: "uptrend",
        title: "Uptrend",
        color: "text-green-400",
        text: "Price makes higher highs and higher lows.",
      },
      {
        id: "downtrend",
        title: "Downtrend",
        color: "text-red-400",
        text: "Price makes lower highs and lower lows.",
      },
      {
        id: "sideways",
        title: "Sideways",
        color: "text-yellow-400",
        text: "Price moves inside a range without clear direction.",
      },
    ].map((trend) => (
      <button
        key={trend.id}
        onClick={() => setSelectedTrendType(trend.id)}
        className={`text-left rounded-[28px] border bg-[#18181b] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] ${
          selectedTrendType === trend.id
            ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
            : "border-white/5 hover:border-cyan-400/30"
        }`}
      >
        <h3 className={`text-2xl font-black ${trend.color}`}>
          {trend.title}
        </h3>

        <p className="mt-4 text-zinc-300 text-[16px] leading-7">
          {trend.text}
        </p>
      </button>
    ))}

  </div>

  <div className="mt-10 rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#111827] to-[#0f172a] p-8">

    <p className="text-sm font-black tracking-[0.25em] text-cyan-400">
      VISUAL TREND EXAMPLE
    </p>

    {selectedTrendType === "uptrend" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            Uptrend = Buyers Control The Market
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            In an uptrend, price keeps creating higher highs and higher lows. Traders often look for buying opportunities with the trend.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Higher highs</p>
            <p>• Higher lows</p>
            <p>• Buying pressure</p>
            <p>• Momentum moving upward</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-green-500/20 bg-[#050816] p-6">
          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">
          <div className="absolute left-8 bottom-10 h-12 w-6 rounded-t-md bg-green-400" />
<div className="absolute left-20 bottom-18 h-18 w-6 rounded-t-md bg-green-400" />
<div className="absolute left-32 bottom-14 h-14 w-6 rounded-t-md bg-red-400" />
<div className="absolute left-44 bottom-26 h-24 w-6 rounded-t-md bg-green-400" />
<div className="absolute left-56 bottom-22 h-18 w-6 rounded-t-md bg-red-400" />
<div className="absolute left-68 bottom-34 h-30 w-6 rounded-t-md bg-green-400" />
<div className="absolute left-80 bottom-28 h-20 w-6 rounded-t-md bg-red-400" />
<div className="absolute left-92 bottom-42 h-36 w-6 rounded-t-md bg-green-400" />
<div className="absolute left-[26rem] bottom-36 h-24 w-6 rounded-t-md bg-red-400" />
<div className="absolute left-[30rem] bottom-52 h-40 w-6 rounded-t-md bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.35)]" />
            <div className="absolute left-10 bottom-16 h-[3px] w-[330px] rotate-[-24deg] bg-green-400/70 shadow-[0_0_20px_rgba(74,222,128,0.4)]" />
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Higher highs and higher lows
          </p>
        </div>

      </div>
    )}

    {selectedTrendType === "downtrend" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            Downtrend = Sellers Control The Market
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            In a downtrend, price keeps creating lower highs and lower lows. Traders avoid forcing bullish trades against strong selling pressure.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Lower highs</p>
            <p>• Lower lows</p>
            <p>• Selling pressure</p>
            <p>• Momentum moving downward</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-red-500/20 bg-[#050816] p-6">
 <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">

  <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

  {[
    { x: 20, y: 160, h: 44, wick: 72, color: "red" },
    { x: 38, y: 148, h: 40, wick: 68, color: "red" },
    { x: 56, y: 152, h: 24, wick: 52, color: "green" },
    { x: 74, y: 132, h: 42, wick: 70, color: "red" },
    { x: 92, y: 136, h: 22, wick: 54, color: "green" },
    { x: 110, y: 116, h: 36, wick: 60, color: "red" },
    { x: 128, y: 120, h: 20, wick: 46, color: "green" },
    { x: 146, y: 98, h: 34, wick: 56, color: "red" },
    { x: 164, y: 104, h: 18, wick: 42, color: "green" },
    { x: 182, y: 82, h: 30, wick: 52, color: "red" },
    { x: 200, y: 88, h: 16, wick: 40, color: "green" },
    { x: 218, y: 66, h: 34, wick: 58, color: "red" },
    { x: 236, y: 72, h: 18, wick: 42, color: "green" },
    { x: 254, y: 50, h: 32, wick: 56, color: "red" },
    { x: 272, y: 56, h: 18, wick: 44, color: "green" },
    { x: 290, y: 34, h: 38, wick: 64, color: "red" },
  ].map((candle, index) => (
    <div key={index}>

      <div
        className={`absolute w-[1px] ${
          candle.color === "green" ? "bg-green-400" : "bg-red-400"
        }`}
        style={{
          left: `${candle.x + 5}px`,
          bottom: `${candle.y - 10}px`,
          height: `${candle.wick}px`,
        }}
      />

      <div
        className={`absolute w-[10px] rounded-sm ${
          candle.color === "green" ? "bg-green-400" : "bg-red-400"
        }`}
        style={{
          left: `${candle.x}px`,
          bottom: `${candle.y}px`,
          height: `${candle.h}px`,
        }}
      />

    </div>
  ))}

  <div className="absolute left-10 bottom-44 h-[3px] w-[330px] rotate-[24deg] bg-red-400/70 shadow-[0_0_20px_rgba(248,113,113,0.4)]" />

</div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Lower highs and lower lows
          </p>
        </div>

      </div>
    )}

    {selectedTrendType === "sideways" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            Sideways Market = No Clear Direction
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            In a sideways market, price moves inside a range. Beginners should be careful because fakeouts are common when momentum is weak.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Price moves between support and resistance</p>
            <p>• Momentum is weaker</p>
            <p>• Breakouts can fail</p>
            <p>• Patience matters</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-yellow-500/20 bg-[#050816] p-6">
          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">
            <div className="absolute left-6 right-6 top-16 h-[3px] bg-yellow-400/70" />
            <div className="absolute left-6 right-6 bottom-16 h-[3px] bg-yellow-400/70" />

            <div className="absolute left-8 bottom-20 h-20 w-4 rounded-t-md bg-green-400" />
            <div className="absolute left-24 bottom-32 h-28 w-4 rounded-t-md bg-red-400" />
            <div className="absolute left-40 bottom-24 h-20 w-4 rounded-t-md bg-green-400" />
            <div className="absolute left-56 bottom-36 h-24 w-4 rounded-t-md bg-red-400" />
            <div className="absolute left-72 bottom-20 h-18 w-4 rounded-t-md bg-green-400" />
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Price moves inside a range
          </p>
        </div>

      </div>
    )}

  </div>

</div>
)}

{activeLesson === "technical" && (
<div className="mt-14 bg-[#131722] rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
    Reading The Charts
  </h2>

  <p className="text-zinc-500 text-lg mt-4 leading-8 max-w-4xl">
    Charts help traders understand market direction, key price levels, momentum, and possible trading opportunities.
  </p>

  <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-6">

    {[
      {
        id: "trend",
        title: "Trend Direction",
        color: "text-green-400",
        text: "Shows whether price is moving up, down, or sideways.",
      },
      {
        id: "levels",
        title: "Key Levels",
        color: "text-cyan-400",
        text: "Support and resistance areas where price may react.",
      },
      {
        id: "volume",
        title: "Volume",
        color: "text-orange-400",
        text: "Shows how much trading activity supports the move.",
      },
      {
        id: "structure",
        title: "Market Structure",
        color: "text-red-400",
        text: "Helps identify higher highs, lower lows, and trend changes.",
      },
    ].map((item) => (
      <button
        key={item.id}
        onClick={() => setSelectedChartReading(item.id)}
        className={`text-left rounded-[28px] border bg-[#18181b] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] ${
          selectedChartReading === item.id
            ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
            : "border-white/5 hover:border-cyan-400/30"
        }`}
      >
        <h3 className={`text-2xl font-black ${item.color}`}>
          {item.title}
        </h3>

        <p className="mt-4 text-zinc-300 text-[16px] leading-7">
          {item.text}
        </p>
      </button>
    ))}

  </div>

  <div className="mt-10 rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#111827] to-[#0f172a] p-8">

    <p className="text-sm font-black tracking-[0.25em] text-cyan-400">
      CHART READING EXAMPLE
    </p>

    {selectedChartReading === "trend" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            Trend Direction = The Market’s Path
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            The first thing traders look for is direction. Is price moving higher, lower, or sideways?
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Uptrend means buyers are stronger</p>
            <p>• Downtrend means sellers are stronger</p>
            <p>• Sideways means no clear direction</p>
            <p>• Trade with the trend when possible</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-green-500/20 bg-[#050816] p-6">
          <div className="relative h-64 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">

            <div className="absolute left-8 bottom-18 h-16 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-24 bottom-26 h-22 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-40 bottom-34 h-28 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-56 bottom-46 h-36 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-72 bottom-60 h-44 w-6 rounded-sm bg-cyan-400" />

            <div className="absolute left-10 bottom-16 h-[3px] w-[300px] rotate-[-24deg] bg-green-400/70" />

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Trend shows market direction
          </p>
        </div>
      </div>
    )}

    {selectedChartReading === "levels" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            Key Levels = Areas Where Price Reacts
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Support and resistance levels help traders find areas where price may bounce, reject, or break through.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Support can stop price from falling</p>
            <p>• Resistance can stop price from rising</p>
            <p>• Broken levels can become new levels</p>
            <p>• Levels help plan entries and exits</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-cyan-500/20 bg-[#050816] p-6">
          <div className="relative h-64 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">
            <div className="absolute left-6 right-6 top-20 h-[3px] bg-red-400" />
            <div className="absolute left-6 right-6 bottom-20 h-[3px] bg-green-400" />

            <p className="absolute left-8 top-10 text-red-400 font-black">
              Resistance
            </p>

            <p className="absolute left-8 bottom-10 text-green-400 font-black">
              Support
            </p>
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Price reacts around key levels
          </p>
        </div>
      </div>
    )}

    {selectedChartReading === "volume" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            Volume = Strength Behind The Move
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Volume helps confirm whether a move has strong participation or weak interest.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• High volume gives stronger confirmation</p>
            <p>• Low volume can signal weakness</p>
            <p>• Breakouts need volume</p>
            <p>• Volume helps judge momentum</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-orange-500/20 bg-[#050816] p-6">
          <div className="h-64 rounded-2xl bg-[#0f172a] border border-white/5 flex items-end gap-4 px-8 py-6">
            <div className="w-8 h-12 bg-orange-400 rounded-t-lg" />
            <div className="w-8 h-20 bg-orange-400 rounded-t-lg" />
            <div className="w-8 h-28 bg-orange-400 rounded-t-lg" />
            <div className="w-8 h-40 bg-orange-400 rounded-t-lg" />
            <div className="w-8 h-52 bg-orange-400 rounded-t-lg" />
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Rising volume confirms strength
          </p>
        </div>
      </div>
    )}

    {selectedChartReading === "structure" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-black text-white">
            Market Structure = How Price Builds A Trend
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Market structure helps traders understand whether price is continuing a trend or starting to reverse.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Higher highs show bullish structure</p>
            <p>• Lower lows show bearish structure</p>
            <p>• Broken structure can warn of reversal</p>
            <p>• Structure gives context before entry</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-red-500/20 bg-[#050816] p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-green-400/20 bg-green-500/10 p-5 text-center">
              <p className="text-green-400 text-2xl font-black">HH</p>
              <p className="mt-2 text-zinc-500 text-xs font-bold">HIGHER HIGH</p>
            </div>

            <div className="rounded-2xl border border-green-400/20 bg-green-500/10 p-5 text-center">
              <p className="text-green-400 text-2xl font-black">HL</p>
              <p className="mt-2 text-zinc-500 text-xs font-bold">HIGHER LOW</p>
            </div>

            <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-5 text-center">
              <p className="text-red-400 text-2xl font-black">LH</p>
              <p className="mt-2 text-zinc-500 text-xs font-bold">LOWER HIGH</p>
            </div>

            <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-5 text-center">
              <p className="text-red-400 text-2xl font-black">LL</p>
              <p className="mt-2 text-zinc-500 text-xs font-bold">LOWER LOW</p>
            </div>
          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Structure explains trend behavior
          </p>
        </div>
      </div>
    )}

  </div>

</div>
)}
{activeLesson === "breakouts" && (
<div className="mt-14 bg-[#131722] rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
    Breakouts vs Fakeouts
  </h2>

  <p className="text-zinc-500 text-lg mt-3 leading-8 max-w-3xl">
    Not every breakout succeeds. Traders must learn the difference between real momentum and false moves.
  </p>

  <div className="mt-10 grid md:grid-cols-2 gap-6">

    {[
      {
        id: "breakout",
        title: "Real Breakout",
        color: "text-green-400",
        text: "Price breaks a level with strong momentum and participation.",
      },
      {
        id: "fakeout",
        title: "Fakeout",
        color: "text-red-400",
        text: "Price briefly breaks a level but quickly reverses.",
      },
    ].map((item) => (
      <button
        key={item.id}
        onClick={() => setSelectedBreakoutType(item.id)}
        className={`text-left rounded-[28px] border bg-[#18181b] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] ${
          selectedBreakoutType === item.id
            ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
            : "border-white/5 hover:border-cyan-400/30"
        }`}
      >
        <h3 className={`text-2xl font-black ${item.color}`}>
          {item.title}
        </h3>

        <p className="mt-4 text-zinc-300 text-[16px] leading-7">
          {item.text}
        </p>
      </button>
    ))}

  </div>

  <div className="mt-10 rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#111827] to-[#0f172a] p-8">

    <p className="text-sm font-black tracking-[0.25em] text-cyan-400">
      BREAKOUT EXAMPLE
    </p>

    {selectedBreakoutType === "breakout" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            Real Breakout = Strong Momentum
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Real breakouts usually happen with strong momentum, increasing volume, and continued price movement after the breakout.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Strong momentum</p>
            <p>• Higher volume</p>
            <p>• Buyers stay in control</p>
            <p>• Price continues higher</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-green-500/20 bg-[#050816] p-6">

          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">

            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="absolute left-6 right-6 top-28 h-[3px] bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]" />

            <div className="absolute left-8 bottom-24 h-18 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-24 bottom-28 h-22 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-40 bottom-34 h-28 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-56 bottom-46 h-38 w-6 rounded-sm bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.5)]" />
            <div className="absolute left-72 bottom-64 h-44 w-6 rounded-sm bg-green-400 shadow-[0_0_25px_rgba(74,222,128,0.5)]" />

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Price continues after the breakout
          </p>

        </div>

      </div>
    )}

    {selectedBreakoutType === "fakeout" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            Fakeout = Failed Breakout
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Fakeouts trap traders by breaking a level briefly before reversing back inside the range.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Weak continuation</p>
            <p>• Traders trapped</p>
            <p>• Fast reversal</p>
            <p>• False momentum</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-red-500/20 bg-[#050816] p-6">

          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">

            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="absolute left-6 right-6 top-28 h-[3px] bg-red-400 shadow-[0_0_20px_rgba(248,113,113,0.4)]" />

            <div className="absolute left-8 bottom-24 h-18 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-24 bottom-30 h-24 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-40 bottom-42 h-38 w-6 rounded-sm bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.5)]" />
            <div className="absolute left-56 bottom-26 h-26 w-6 rounded-sm bg-red-400 shadow-[0_0_25px_rgba(248,113,113,0.5)]" />
            <div className="absolute left-72 bottom-12 h-30 w-6 rounded-sm bg-red-400" />

            <div className="absolute right-8 top-8 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-red-400 font-black">
              Trap
            </div>

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Price fails and reverses
          </p>

        </div>

      </div>
    )}

  </div>

</div>
)}
{activeLesson === "psychology" && (
<div className="mt-14 bg-[#131722] rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
    Trading Psychology
  </h2>

  <p className="text-zinc-500 text-lg mt-4 leading-8 max-w-4xl">
    Trading is not only about charts and strategies. Emotions heavily influence decision making and can impact performance.
  </p>

  <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-6">

    {[
      {
        id: "fear",
        title: "Fear",
        color: "text-red-400",
        text: "Fear can cause traders to exit too early or avoid good setups.",
      },
      {
        id: "greed",
        title: "Greed",
        color: "text-green-400",
        text: "Greed can push traders to risk too much chasing profits.",
      },
      {
        id: "discipline",
        title: "Discipline",
        color: "text-cyan-400",
        text: "Discipline helps traders follow their plan consistently.",
      },
      {
        id: "patience",
        title: "Patience",
        color: "text-orange-400",
        text: "Good traders wait for quality setups instead of forcing trades.",
      },
    ].map((item) => (
      <button
        key={item.id}
        onClick={() => setSelectedPsychology(item.id)}
        className={`text-left rounded-[28px] border bg-[#18181b] p-7 transition-all duration-300 ease-out hover:-translate-y-[4px] ${
          selectedPsychology === item.id
            ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
            : "border-white/5 hover:border-cyan-400/30"
        }`}
      >
        <h3 className={`text-2xl font-black ${item.color}`}>
          {item.title}
        </h3>

        <p className="mt-4 text-zinc-300 text-[16px] leading-7">
          {item.text}
        </p>
      </button>
    ))}

  </div>

  <div className="mt-10 rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#111827] to-[#0f172a] p-8">

    <p className="text-sm font-black tracking-[0.25em] text-cyan-400">
      MINDSET EXAMPLE
    </p>

    {selectedPsychology === "fear" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>

          <h3 className="text-3xl font-black text-white">
            Fear = Hesitation & Panic
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Fear can make traders close winning trades too early or panic during temporary market pullbacks.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Panic selling</p>
            <p>• Closing trades too early</p>
            <p>• Avoiding valid setups</p>
            <p>• Emotional decision making</p>
          </div>

        </div>

        <div className="rounded-[28px] border border-red-500/20 bg-[#050816] p-6">

          <div className="grid gap-4">

            <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-5">
              <p className="text-red-400 text-2xl font-black">
                Panic Exit
              </p>

              <p className="mt-2 text-zinc-400">
                Trader exits before the setup finishes.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-400/20 bg-orange-500/10 p-5">
              <p className="text-orange-400 text-2xl font-black">
                Emotional Reaction
              </p>

              <p className="mt-2 text-zinc-400">
                Decisions become emotional instead of logical.
              </p>
            </div>

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Fear weakens discipline
          </p>

        </div>

      </div>
    )}

    {selectedPsychology === "greed" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>

          <h3 className="text-3xl font-black text-white">
            Greed = Risking Too Much
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Greed pushes traders to overtrade, increase position sizes, and chase unrealistic profits.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Oversized positions</p>
            <p>• Chasing profits</p>
            <p>• Ignoring risk management</p>
            <p>• Taking impulsive trades</p>
          </div>

        </div>

        <div className="rounded-[28px] border border-green-500/20 bg-[#050816] p-6">

          <div className="grid gap-4">

            <div className="rounded-2xl border border-green-400/20 bg-green-500/10 p-5">
              <p className="text-green-400 text-2xl font-black">
                Bigger Position
              </p>

              <p className="mt-2 text-zinc-400">
                Trader risks too much trying to make more money.
              </p>
            </div>

            <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-5">
              <p className="text-red-400 text-2xl font-black">
                Bigger Loss
              </p>

              <p className="mt-2 text-zinc-400">
                Greed increases account damage when wrong.
              </p>
            </div>

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Greed increases unnecessary risk
          </p>

        </div>

      </div>
    )}

    {selectedPsychology === "discipline" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>

          <h3 className="text-3xl font-black text-white">
            Discipline = Following The Plan
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Discipline helps traders stay consistent even during emotional market conditions.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Following the strategy</p>
            <p>• Respecting stop losses</p>
            <p>• Staying consistent</p>
            <p>• Avoiding emotional trades</p>
          </div>

        </div>

        <div className="rounded-[28px] border border-cyan-500/20 bg-[#050816] p-6">

          <div className="grid gap-4">

            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-5">
              <p className="text-cyan-400 text-2xl font-black">
                Trading Plan
              </p>

              <p className="mt-2 text-zinc-400">
                Trader follows rules before entering trades.
              </p>
            </div>

            <div className="rounded-2xl border border-green-400/20 bg-green-500/10 p-5">
              <p className="text-green-400 text-2xl font-black">
                Consistency
              </p>

              <p className="mt-2 text-zinc-400">
                Long-term success comes from repeated discipline.
              </p>
            </div>

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Discipline builds consistency
          </p>

        </div>

      </div>
    )}

    {selectedPsychology === "patience" && (
      <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">

        <div>

          <h3 className="text-3xl font-black text-white">
            Patience = Waiting For Quality
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Patient traders wait for strong setups instead of forcing trades during weak conditions.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Waiting for clean setups</p>
            <p>• Avoiding random trades</p>
            <p>• Better trade selection</p>
            <p>• Lower emotional pressure</p>
          </div>

        </div>

        <div className="rounded-[28px] border border-orange-500/20 bg-[#050816] p-6">

          <div className="grid gap-4">

            <div className="rounded-2xl border border-orange-400/20 bg-orange-500/10 p-5">
              <p className="text-orange-400 text-2xl font-black">
                Waiting
              </p>

              <p className="mt-2 text-zinc-400">
                Trader ignores weak setups and waits patiently.
              </p>
            </div>

            <div className="rounded-2xl border border-green-400/20 bg-green-500/10 p-5">
              <p className="text-green-400 text-2xl font-black">
                Quality Setup
              </p>

              <p className="mt-2 text-zinc-400">
                Better opportunities appear with patience.
              </p>
            </div>

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Patience improves decision quality
          </p>

        </div>

      </div>
    )}

  </div>

</div>
)}
{activeLesson === "vocabulary" && (
<div className="mt-14 bg-[#131722] rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
    Essential Trading Terms
  </h2>

  <p className="text-zinc-500 text-lg mt-4 leading-8 max-w-4xl">
    Traders use specific terms every day. Understanding this language helps beginners read charts, follow lessons, and communicate more confidently.
  </p>

  <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-6">

    {[
      {
        id: "spread",
        title: "Spread",
        color: "text-cyan-400",
        text: "Difference between buy and sell price.",
      },
      {
        id: "liquidity",
        title: "Liquidity",
        color: "text-green-400",
        text: "How easily an asset can be traded.",
      },
      {
        id: "slippage",
        title: "Slippage",
        color: "text-orange-400",
        text: "Unexpected change in execution price.",
      },
      {
        id: "marketcap",
        title: "Market Cap",
        color: "text-red-400",
        text: "Total value of a company or asset.",
      },
    ].map((item) => (
      <button
        key={item.id}
        onClick={() => setSelectedTradingTerm(item.id)}
        className={`text-left rounded-[28px] border bg-[#18181b] p-7 transition-all duration-300 hover:-translate-y-[4px] ${
          selectedTradingTerm === item.id
            ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
            : "border-white/5 hover:border-cyan-400/30"
        }`}
      >
        <h3 className={`text-2xl font-black ${item.color}`}>
          {item.title}
        </h3>

        <p className="mt-4 text-zinc-300 leading-7">
          {item.text}
        </p>
      </button>
    ))}

  </div>

  <div className="mt-10 rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#111827] to-[#0f172a] p-8">

    {selectedTradingTerm === "spread" && (
      <div className="grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            Spread = Buy vs Sell Difference
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            The spread is the small gap between the highest buyer price and the lowest seller price.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Smaller spreads are usually better</p>
            <p>• High liquidity lowers spreads</p>
            <p>• Spread affects trade cost</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-cyan-500/20 bg-[#050816] p-6">

          <div className="grid gap-4">

            <div className="rounded-2xl bg-green-500/10 border border-green-400/20 p-5">
              <p className="text-green-400 text-2xl font-black">
                BUY = $100.00
              </p>
            </div>

            <div className="rounded-2xl bg-red-500/10 border border-red-400/20 p-5">
              <p className="text-red-400 text-2xl font-black">
                SELL = $99.95
              </p>
            </div>

          </div>

        </div>

      </div>
    )}

    {selectedTradingTerm === "liquidity" && (
      <div className="grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            Liquidity = Easy Trading
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            High liquidity means traders can quickly buy or sell without heavily moving the price.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• More buyers and sellers</p>
            <p>• Faster order execution</p>
            <p>• Usually smaller spreads</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-green-500/20 bg-[#050816] p-6">
          <div className="grid grid-cols-3 gap-4 h-56">

            <div className="rounded-2xl bg-green-500/10 border border-green-400/20 flex items-center justify-center text-green-400 text-4xl font-black">
              $
            </div>

            <div className="rounded-2xl bg-green-500/10 border border-green-400/20 flex items-center justify-center text-green-400 text-4xl font-black">
              $
            </div>

            <div className="rounded-2xl bg-green-500/10 border border-green-400/20 flex items-center justify-center text-green-400 text-4xl font-black">
              $
            </div>

          </div>
        </div>

      </div>
    )}

    {selectedTradingTerm === "slippage" && (
      <div className="grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            Slippage = Unexpected Price Change
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Slippage happens when price changes before the order finishes executing.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Common during volatility</p>
            <p>• Fast movement increases slippage</p>
            <p>• Market orders are more exposed</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-orange-500/20 bg-[#050816] p-6">

          <div className="grid gap-4">

            <div className="rounded-2xl bg-cyan-500/10 border border-cyan-400/20 p-5">
              <p className="text-cyan-400 text-2xl font-black">
                Expected = $100
              </p>
            </div>

            <div className="rounded-2xl bg-orange-500/10 border border-orange-400/20 p-5">
              <p className="text-orange-400 text-2xl font-black">
                Executed = $101
              </p>
            </div>

          </div>

        </div>

      </div>
    )}

    {selectedTradingTerm === "marketcap" && (
      <div className="grid lg:grid-cols-2 gap-8 items-center">

        <div>
          <h3 className="text-3xl font-black text-white">
            Market Cap = Total Market Value
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Market capitalization measures the total value of a company or cryptocurrency.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Large market caps are often more stable</p>
            <p>• Small caps move faster</p>
            <p>• Measures company or asset size</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-red-500/20 bg-[#050816] p-6 flex items-center justify-center h-56">

          <div className="h-40 w-40 rounded-full border-4 border-red-400 flex items-center justify-center text-red-400 text-3xl font-black shadow-[0_0_40px_rgba(248,113,113,0.35)]">
            $1T
          </div>

        </div>

      </div>
    )}

  </div>

</div>
)}

{activeLesson === "quiz" && (
<div className="mt-14 bg-[#131722] rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
    Trader Checkpoint
  </h2>

  <p className="text-zinc-500 text-lg mt-4 leading-8 max-w-4xl">
    Before moving forward, traders should review the most important beginner concepts learned so far.
  </p>

  <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-6">

    {[
      {
        id: "question1",
        title: "Market Direction",
        color: "text-green-400",
        text: "Can you identify bullish and bearish trends?",
      },
      {
        id: "question2",
        title: "Risk Management",
        color: "text-red-400",
        text: "Do you understand stop losses and risk?",
      },
      {
        id: "question3",
        title: "Chart Reading",
        color: "text-cyan-400",
        text: "Can you identify trends and key levels?",
      },
      {
        id: "question4",
        title: "Trading Psychology",
        color: "text-orange-400",
        text: "Can emotions affect trading decisions?",
      },
    ].map((item) => (
      <button
        key={item.id}
        onClick={() => setSelectedCheckpoint(item.id)}
        className={`text-left rounded-[28px] border bg-[#18181b] p-7 transition-all duration-300 hover:-translate-y-[4px] ${
          selectedCheckpoint === item.id
            ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
            : "border-white/5 hover:border-cyan-400/30"
        }`}
      >
        <h3 className={`text-2xl font-black ${item.color}`}>
          {item.title}
        </h3>

        <p className="mt-4 text-zinc-300 leading-7">
          {item.text}
        </p>
      </button>
    ))}

  </div>

  <div className="mt-10 rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#111827] to-[#0f172a] p-8">

    {selectedCheckpoint === "question1" && (
      <div className="grid lg:grid-cols-2 gap-8 items-center">

        <div>

          <h3 className="text-3xl font-black text-white">
            Can You Identify Market Direction?
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Traders should recognize whether buyers or sellers are controlling the market before entering trades.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Bullish = higher highs</p>
            <p>• Bearish = lower lows</p>
            <p>• Trend direction matters</p>
          </div>

        </div>

        <div className="rounded-[28px] border border-green-500/20 bg-[#050816] p-6">

          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">

            <div className="absolute left-8 bottom-18 h-16 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-24 bottom-26 h-22 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-40 bottom-34 h-28 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-56 bottom-46 h-36 w-6 rounded-sm bg-green-400" />
            <div className="absolute left-72 bottom-60 h-44 w-6 rounded-sm bg-cyan-400" />

          </div>

        </div>

      </div>
    )}

    {selectedCheckpoint === "question2" && (
      <div className="grid lg:grid-cols-2 gap-8 items-center">

        <div>

          <h3 className="text-3xl font-black text-white">
            Do You Understand Risk Management?
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Protecting your account is one of the most important parts of trading.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Stop losses protect capital</p>
            <p>• Smaller risk improves survival</p>
            <p>• Never risk everything on one trade</p>
          </div>

        </div>

        <div className="rounded-[28px] border border-red-500/20 bg-[#050816] p-6">

          <div className="grid grid-cols-3 gap-4 h-56">

            <div className="rounded-2xl bg-green-500/10 border border-green-400/20 flex items-center justify-center text-green-400 text-2xl font-black">
              1%
            </div>

            <div className="rounded-2xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center text-orange-400 text-2xl font-black">
              5%
            </div>

            <div className="rounded-2xl bg-red-500/10 border border-red-400/20 flex items-center justify-center text-red-400 text-2xl font-black">
              20%
            </div>

          </div>

        </div>

      </div>
    )}

    {selectedCheckpoint === "question3" && (
      <div className="grid lg:grid-cols-2 gap-8 items-center">

        <div>

          <h3 className="text-3xl font-black text-white">
            Can You Read A Basic Chart?
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Traders should understand trends, support, resistance, and market structure before trading.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Identify support and resistance</p>
            <p>• Understand trend direction</p>
            <p>• Watch market structure</p>
          </div>

        </div>

        <div className="rounded-[28px] border border-cyan-500/20 bg-[#050816] p-6">

          <div className="relative h-56 rounded-2xl bg-[#0f172a] border border-white/5 overflow-hidden">

            <div className="absolute left-6 right-6 top-20 h-[3px] bg-red-400" />
            <div className="absolute left-6 right-6 bottom-20 h-[3px] bg-green-400" />

          </div>

        </div>

      </div>
    )}

    {selectedCheckpoint === "question4" && (
      <div className="grid lg:grid-cols-2 gap-8 items-center">

        <div>

          <h3 className="text-3xl font-black text-white">
            Can Emotions Affect Trading?
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Fear, greed, impatience, and revenge trading can heavily affect decision making.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Fear causes hesitation</p>
            <p>• Greed increases risk</p>
            <p>• Discipline improves consistency</p>
          </div>

        </div>

        <div className="rounded-[28px] border border-orange-500/20 bg-[#050816] p-6">

          <div className="grid gap-4 h-56">

            <div className="rounded-2xl bg-red-500/10 border border-red-400/20 flex items-center justify-center text-red-400 text-2xl font-black">
              FEAR
            </div>

            <div className="rounded-2xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center text-orange-400 text-2xl font-black">
              GREED
            </div>

          </div>

        </div>

      </div>
    )}

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
<div className="mt-14 bg-[#131722] rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 border border-white/5">

  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
    Going Live
  </h2>

  <p className="text-zinc-500 text-lg mt-4 leading-8 max-w-4xl">
    Trading with real money feels very different from paper trading. Beginners should transition slowly and focus on consistency instead of fast profits.
  </p>

  <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-6">

    {[
      {
        id: "small",
        title: "Start Small",
        color: "text-green-400",
        text: "Use small position sizes while learning.",
      },
      {
        id: "emotion",
        title: "Real Emotions",
        color: "text-red-400",
        text: "Real money creates fear and greed.",
      },
      {
        id: "expectations",
        title: "Realistic Expectations",
        color: "text-cyan-400",
        text: "Consistency matters more than fast profits.",
      },
      {
        id: "discipline",
        title: "Discipline",
        color: "text-orange-400",
        text: "Avoid revenge trading and overtrading.",
      },
    ].map((item) => (
      <button
        key={item.id}
        onClick={() => setSelectedLiveTopic(item.id)}
        className={`text-left rounded-[28px] border bg-[#18181b] p-7 transition-all duration-300 hover:-translate-y-[4px] ${
          selectedLiveTopic === item.id
            ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
            : "border-white/5 hover:border-cyan-400/30"
        }`}
      >
        <h3 className={`text-2xl font-black ${item.color}`}>
          {item.title}
        </h3>

        <p className="mt-4 text-zinc-300 leading-7">
          {item.text}
        </p>
      </button>
    ))}

  </div>

  <div className="mt-10 rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#111827] to-[#0f172a] p-8">

    {selectedLiveTopic === "small" && (
      <div className="grid lg:grid-cols-2 gap-8 items-center">

        <div>

          <h3 className="text-3xl font-black text-white">
            Start With Small Risk
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            New traders should begin with very small position sizes while adjusting to real market emotions and execution.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Protect your capital first</p>
            <p>• Focus on consistency</p>
            <p>• Build confidence slowly</p>
            <p>• Avoid oversized trades</p>
          </div>

        </div>

        <div className="rounded-[28px] border border-green-500/20 bg-[#050816] p-6">

          <div className="grid grid-cols-3 gap-4 h-56">

            <div className="rounded-2xl bg-green-500/10 border border-green-400/20 flex items-center justify-center text-green-400 text-2xl font-black">
              1%
            </div>

            <div className="rounded-2xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center text-orange-400 text-2xl font-black">
              2%
            </div>

            <div className="rounded-2xl bg-red-500/10 border border-red-400/20 flex items-center justify-center text-red-400 text-2xl font-black">
              10%
            </div>

          </div>

          <p className="mt-4 text-center text-zinc-400 font-bold">
            Smaller risk improves survival
          </p>

        </div>

      </div>
    )}

    {selectedLiveTopic === "emotion" && (
      <div className="grid lg:grid-cols-2 gap-8 items-center">

        <div>

          <h3 className="text-3xl font-black text-white">
            Real Money Changes Emotions
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Fear and greed become much stronger when real money is involved. Emotional control is critical.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Fear causes hesitation</p>
            <p>• Greed increases risk</p>
            <p>• Emotional trading creates mistakes</p>
            <p>• Discipline matters more than excitement</p>
          </div>

        </div>

        <div className="rounded-[28px] border border-red-500/20 bg-[#050816] p-6">

          <div className="grid gap-4 h-56">

            <div className="rounded-2xl bg-red-500/10 border border-red-400/20 flex items-center justify-center text-red-400 text-2xl font-black">
              FEAR
            </div>

            <div className="rounded-2xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center text-orange-400 text-2xl font-black">
              GREED
            </div>

          </div>

        </div>

      </div>
    )}

    {selectedLiveTopic === "expectations" && (
      <div className="grid lg:grid-cols-2 gap-8 items-center">

        <div>

          <h3 className="text-3xl font-black text-white">
            Keep Realistic Expectations
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Trading is a skill that takes time to develop. Beginners should focus on improving decision making instead of chasing fast profits.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Consistency matters most</p>
            <p>• Avoid unrealistic profit goals</p>
            <p>• Small progress compounds</p>
            <p>• Long-term survival is the goal</p>
          </div>

        </div>

        <div className="rounded-[28px] border border-cyan-500/20 bg-[#050816] p-6 flex items-center justify-center h-56">

          <div className="text-center">
            <p className="text-cyan-400 text-5xl font-black">
              +1%
            </p>

            <p className="mt-4 text-zinc-400 font-bold">
              Small consistent growth
            </p>
          </div>

        </div>

      </div>
    )}

    {selectedLiveTopic === "discipline" && (
      <div className="grid lg:grid-cols-2 gap-8 items-center">

        <div>

          <h3 className="text-3xl font-black text-white">
            Discipline Protects Traders
          </h3>

          <p className="mt-4 text-zinc-300 text-[17px] leading-8">
            Overtrading, revenge trading, and emotional decisions often destroy beginner accounts.
          </p>

          <div className="mt-6 space-y-3 text-zinc-400">
            <p>• Follow your trade plan</p>
            <p>• Avoid emotional revenge trades</p>
            <p>• Patience improves execution</p>
            <p>• Discipline builds consistency</p>
          </div>

        </div>

        <div className="rounded-[28px] border border-orange-500/20 bg-[#050816] p-6">

          <div className="grid gap-4 h-56">

            <div className="rounded-2xl bg-green-500/10 border border-green-400/20 flex items-center justify-center text-green-400 text-2xl font-black">
              PLAN
            </div>

            <div className="rounded-2xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center text-orange-400 text-2xl font-black">
              PATIENCE
            </div>

            <div className="rounded-2xl bg-red-500/10 border border-red-400/20 flex items-center justify-center text-red-400 text-2xl font-black">
              REVENGE
            </div>

          </div>

        </div>

      </div>
    )}

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