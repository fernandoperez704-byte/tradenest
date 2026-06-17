"use client";

import { useState } from "react";

type GabySimulatorCoachProps = {
  mode: string;
  selectedCoin: string;
  trades: any[];
  futuresHistory: any[];
  positions: any;
  futuresPositions: any[];
  balance: number;
  marginUsed: number;

  marketIntelligence?: any;
  movingAverageAnalysis?: any;
  currentEntryQuality?: string | null;
  selectedTimeframe?: string;
  currentPrice?: number;
  priceLocation?: string | null;
};

export default function GabySimulatorCoach({
  mode,
  selectedCoin,
  trades,
  futuresHistory,
  positions,
  futuresPositions,
  balance,
  marginUsed,
  marketIntelligence,
  movingAverageAnalysis,
  currentEntryQuality,
  selectedTimeframe,
  currentPrice,
  priceLocation,
}: GabySimulatorCoachProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "Hi, I’m Gaby. I can help explain the simulator, spot trading, futures, leverage, liquidation, and review your practice trades."
  );
  const [loading, setLoading] = useState(false);
  
const [lastReviewData, setLastReviewData] = useState<any>(null);
const [conversationHistory, setConversationHistory] = useState<any[]>([]);
async function askGaby(customQuestion?: string) {
  let finalQuestion = customQuestion || question;

  if (!finalQuestion.trim()) return;

  const originalQuestion = finalQuestion.trim().toLowerCase();

  const reviewFollowUpWords = [
    "yes",
    "yeah",
    "yep",
    "more",
    "details",
    "why",
    "review",
    "this trade",
  ];

  const isReviewFollowUp =
    lastReviewData &&
    reviewFollowUpWords.some((word) =>
      originalQuestion.includes(word)
    );

  if (
    isReviewFollowUp &&
    ["yes", "yeah", "yep", "more", "details"].includes(
      originalQuestion
    )
  ) {
    finalQuestion =
      "Give more analysis about this review using the current chart facts.";
  }

  setLoading(true);

  try {
    const res = await fetch("/api/gaby-simulator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: finalQuestion,
        lastReviewData: isReviewFollowUp ? lastReviewData : null,
        conversationHistory: conversationHistory.slice(-4),
        simulatorContext: {
          mode,
          selectedCoin,
          balance,
          marginUsed,
          selectedTimeframe,
          currentPrice,
          priceLocation,
          marketDirection: movingAverageAnalysis?.direction,
          ma7: movingAverageAnalysis?.ma7,
          ma25: movingAverageAnalysis?.ma25,
          ma99: movingAverageAnalysis?.ma99,
          nearestSupport: marketIntelligence?.nearestSupport,
          nearestResistance: marketIntelligence?.nearestResistance,
          supportLevels: marketIntelligence?.supportLevels,
          resistanceLevels: marketIntelligence?.resistanceLevels,
          trades: trades.slice(-5),
          futuresHistory: futuresHistory.slice(-5),
          positions,
          futuresPositions,
        },
      }),
    });

    const data = await res.json();

const gabyAnswer = data.answer || "Gaby could not respond right now.";

setAnswer(gabyAnswer);

setConversationHistory((prev) => [
  ...prev.slice(-3),
  {
    user: finalQuestion,
    gaby: gabyAnswer,
  },
]);

setQuestion("");
  } catch (error) {
    setAnswer("Gaby is having trouble reviewing the simulator right now.");
  } finally {
    setLoading(false);
  }
}

function reviewTrade() {
const closedTrades =
  mode === "FUTURES"
    ? futuresHistory.filter(
        (trade) =>
          trade.coin === selectedCoin &&
          trade.status !== "OPEN" &&
          trade.pnl !== null &&
          trade.pnl !== undefined
      )
    : trades.filter(
        (trade) =>
          trade.coin === selectedCoin &&
          trade.type === "SELL" &&
          trade.pnl !== null &&
          trade.pnl !== undefined
      );

  const latestTrade = [...closedTrades].sort((a, b) => {
    const timeA = new Date(
      a.closedAt ?? a.createdAt ?? a.time ?? a.date ?? 0
    ).getTime();

    const timeB = new Date(
      b.closedAt ?? b.createdAt ?? b.time ?? b.date ?? 0
    ).getTime();

    return timeB - timeA;
  })[0];

  if (!latestTrade) {
    setAnswer(`Place a completed ${selectedCoin} practice trade first and I'll review it.`);
    return;
  }

const marketDirection =
  movingAverageAnalysis?.direction || "TRANSITION";

const coin = latestTrade.coin || selectedCoin;

const directionLabel =
  marketDirection === "BULLISH"
    ? "Bullish"
    : marketDirection === "BEARISH"
    ? "Bearish"
    : "Transition";

const timeframeText = selectedTimeframe || "1M";

let analystSentence = "";

if (marketDirection === "BULLISH") {
  analystSentence = `${coin} was bullish on the ${timeframeText} timeframe because MA 7 was above MA 25 and MA 25 was above MA 99.`;
}

if (marketDirection === "BEARISH") {
  analystSentence = `${coin} was bearish on the ${timeframeText} timeframe because MA 7 was below MA 25 and MA 25 was below MA 99.`;
}

if (marketDirection === "TRANSITION") {
  analystSentence = `Market direction was unclear on the ${timeframeText} timeframe because MA 7, MA 25, and MA 99 were not fully aligned.`;
}

  const tradeDirection =
    mode === "FUTURES"
      ? latestTrade.side || "UNKNOWN"
      : "LONG";

  const alignedWithDirection =
    marketDirection === "BULLISH"
      ? tradeDirection === "LONG"
      : marketDirection === "BEARISH"
      ? tradeDirection === "SHORT"
      : false;

  const tradeDirectionText =
    marketDirection === "TRANSITION"
      ? `You opened a ${tradeDirection} position while market direction was unclear.`
      : alignedWithDirection
      ? `You opened a ${tradeDirection} position, so this trade was aligned with the market direction.`
      : `You opened a ${tradeDirection} position, so this trade was against the market direction.`;

  const accountSize = Number(
    latestTrade.balanceAtEntry ??
      latestTrade.balanceAtClose ??
      balance ??
      10000
  );

  let riskLabel = "Controlled";
  let riskText = "";
  let gabyReview = "";

const entryPrice = Number(
  latestTrade.entryPrice ?? latestTrade.price ?? 0
);

const supportPrice = Number(
  marketIntelligence?.nearestSupport ?? 0
);

const resistancePrice = Number(
  marketIntelligence?.nearestResistance ?? 0
);

let tradeLocation = "UNKNOWN";

if (entryPrice && supportPrice && resistancePrice) {
  const supportDistance = Math.abs(entryPrice - supportPrice);
  const resistanceDistance = Math.abs(entryPrice - resistancePrice);

  tradeLocation =
    supportDistance < resistanceDistance
      ? "NEAR_SUPPORT"
      : "NEAR_RESISTANCE";
}

  if (mode === "FUTURES") {
    const marginUsedAmount = Number(
      latestTrade.margin ?? latestTrade.amount ?? 0
    );

    const leverageUsed = Number(latestTrade.leverage ?? 1);

    const positionSize = Number(
      latestTrade.positionSize ?? marginUsedAmount * leverageUsed
    );

    const exposurePercent =
      accountSize > 0 ? (positionSize / accountSize) * 100 : 0;

    riskLabel =
      exposurePercent > 75 || leverageUsed > 20
        ? "High"
        : exposurePercent > 25
        ? "Moderate"
        : "Controlled";

    riskText = `Margin Used: $${marginUsedAmount.toFixed(2)}
Leverage: ${leverageUsed}x
Position Size: $${positionSize.toFixed(2)}
Account Size: $${accountSize.toFixed(2)}
Exposure: ${exposurePercent.toFixed(1)}% of account`;

    if (!alignedWithDirection && marketDirection !== "TRANSITION") {
      gabyReview = `The trade was against the market direction while using leverage.`;
    } else if (riskLabel === "High") {
      gabyReview = `The main concern was leverage.

${leverageUsed}x leverage created more risk than necessary for this setup.`;
    } else {
      gabyReview = `This was a disciplined trade.`;
    }
  }

  if (mode === "SPOT") {
    const tradeValue = Number(
      latestTrade.amount ?? latestTrade.value ?? 0
    );

    const exposurePercent =
      accountSize > 0 ? (tradeValue / accountSize) * 100 : 0;

    riskLabel =
      exposurePercent > 50
        ? "High"
        : exposurePercent > 25
        ? "Moderate"
        : "Controlled";

    riskText = `Position Size: $${tradeValue.toFixed(2)}
Account Size: $${accountSize.toFixed(2)}
Exposure: ${exposurePercent.toFixed(1)}% of account`;

    if (!alignedWithDirection && marketDirection !== "TRANSITION") {
      gabyReview = `The trade was against the market direction.`;
    } else if (riskLabel === "High") {
      gabyReview = `The main concern was risk exposure.

Too much of the account was committed to a single trade.`;
    } else {
      gabyReview = `This was a disciplined trade.`;
    }
  }

  const reviewText = `
Market Direction: ${directionLabel}
Timeframe: ${timeframeText}
Trade Direction: ${tradeDirection}
Risk Exposure: ${riskLabel}
${riskText}
Gaby Analysis:
${analystSentence}

Want more details?
`;

setLastReviewData({
  marketDirection,
  tradeDirection,
  alignedWithDirection,
  riskExposure: riskLabel,
  riskText,
  gabyReview,
  mode,
  coin,
entryPrice,
supportPrice,
resistancePrice,
tradeLocation,
timeframe: timeframeText,

});

  setAnswer(reviewText.trim());
}
  return (
    <div className="rounded-3xl border border-cyan-400/20 bg-[#0f172a]/90 p-5 shadow-[0_0_35px_rgba(34,211,238,0.08)]">


      <div className="whitespace-pre-line rounded-2xl border border-zinc-800 bg-[#020617] p-5 text-base leading-6 text-zinc-200">
        {loading ? "Gaby is reviewing..." : answer}
      </div>

<div className="mt-4 flex gap-2">
  <button
    onClick={() => window.dispatchEvent(new Event("startSimulatorTour"))}
    className="h-11 rounded-xl border border-zinc-800 bg-[#111827] px-4 text-sm font-bold text-zinc-300 hover:border-cyan-400 hover:text-cyan-300"
  >
    Explain Panel
  </button>

  <button
    onClick={reviewTrade}
    className="h-11 rounded-xl border border-zinc-800 bg-[#111827] px-4 text-sm font-bold text-zinc-300 hover:border-cyan-400 hover:text-cyan-300"
  >
    Review Trade
  </button>
</div>

      <div className="mt-4 flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") askGaby();
          }}
          placeholder="Ask me about the simulator or review a practice trade."
          className="h-11 flex-1 rounded-xl border border-zinc-800 bg-[#020617] px-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-cyan-400"
        />

        <button
          onClick={() => askGaby()}
          disabled={loading}
          className="h-11 rounded-xl bg-cyan-500 px-4 text-sm font-black text-black hover:bg-cyan-400 disabled:opacity-50"
        >
          Ask
        </button>
      </div>
    </div>
  );
}