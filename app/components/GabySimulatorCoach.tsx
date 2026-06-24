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
const [lastReferencedLevel, setLastReferencedLevel] = useState<any>(null);
const [lastTopic, setLastTopic] = useState<string | null>(null);
async function askGaby(customQuestion?: string) {
  let finalQuestion = customQuestion || question;

  if (!finalQuestion.trim()) return;

  const originalQuestion = finalQuestion.trim().toLowerCase();

if (originalQuestion.includes("support")) {
  setLastTopic("SUPPORT");
}

if (originalQuestion.includes("resistance")) {
  setLastTopic("RESISTANCE");
}

if (
  originalQuestion.includes("direction") ||
  originalQuestion.includes("bullish") ||
  originalQuestion.includes("bearish") ||
  originalQuestion.includes("transition")
) {
  setLastTopic("DIRECTION");
}

if (
  originalQuestion.includes("review") ||
  originalQuestion.includes("trade") ||
  originalQuestion.includes("entry")
) {
  setLastTopic("REVIEW");
}

  if (originalQuestion.includes("support")) {
  setLastReferencedLevel({
    type: "SUPPORT",
    index: 0,
  });
}

if (originalQuestion.includes("resistance")) {
  setLastReferencedLevel({
    type: "RESISTANCE",
    index: 0,
  });
}

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
        lastReferencedLevel,
        lastReviewData: isReviewFollowUp ? lastReviewData : null,
        conversationHistory: conversationHistory.slice(-8),
        simulatorContext: {
          lastTopic,
          mode,
          selectedCoin,
          balance,
          marginUsed,
          selectedTimeframe,
          currentPrice,
          priceLocation,
          marketDirection: movingAverageAnalysis?.direction,
          structure: marketIntelligence?.structure,
          ma7: movingAverageAnalysis?.ma7,
          ma25: movingAverageAnalysis?.ma25,
          ma99: movingAverageAnalysis?.ma99,
          nearestSupport: marketIntelligence?.nearestSupport,
          nearestResistance: marketIntelligence?.nearestResistance,
          supportLevels: marketIntelligence?.supportLevels,
          resistanceLevels: marketIntelligence?.resistanceLevels,
          patternAnalysis: marketIntelligence?.patternAnalysis,
momentumAnalysis: marketIntelligence?.momentumAnalysis,
volumeAnalysis: marketIntelligence?.volumeAnalysis,
rsiAnalysis: marketIntelligence?.rsiAnalysis,
marketConviction: marketIntelligence?.marketConviction,

marketState: marketIntelligence?.marketState,
controlStrength: marketIntelligence?.controlStrength,
moveCondition: marketIntelligence?.moveCondition,

maStructureExtension:
  marketIntelligence?.maStructureExtension,

fallForce:
  marketIntelligence?.fallForce,

bouncePressure:
  marketIntelligence?.bouncePressure,

momentumStage:
  marketIntelligence?.momentumStage,

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
  ...prev.slice(-7),
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

 const structure =
  marketIntelligence?.structure || "RANGING";

const nearestSupport =
  marketIntelligence?.nearestSupport?.low ?? null;

const nearestResistance =
  marketIntelligence?.nearestResistance?.high ?? null; 

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
  analystSentence =
    `${coin} is bullish on the ${timeframeText} timeframe because MA 7 is above MA 25 and MA 25 is above MA 99.`;

  if (
    structure === "BULLISH" ||
    structure === "HIGHER_HIGHS"
  ) {
    analystSentence +=
      ` Market structure is also making higher highs.`;
  }

  if (nearestResistance) {
    analystSentence +=
      ` The nearest resistance is around ${Number(nearestResistance).toFixed(0)}.`;
  }
}

if (marketDirection === "BEARISH") {
  analystSentence =
    `${coin} is bearish on the ${timeframeText} timeframe because MA 7 is below MA 25 and MA 25 is below MA 99.`;

  if (
    structure === "BEARISH" ||
    structure === "LOWER_LOWS"
  ) {
    analystSentence +=
      ` Market structure is also bearish.`;
  }

  if (nearestSupport) {
    analystSentence +=
      ` The nearest support is around ${Number(nearestSupport).toFixed(0)}.`;
  }
}

if (marketDirection === "TRANSITION") {
  if (
    structure === "BULLISH" ||
    structure === "HIGHER_HIGHS"
  ) {
    analystSentence =
      `${coin} is in a transition phase on the ${timeframeText} timeframe. Price structure is bullish, but MA 7, MA 25, and MA 99 are not fully aligned yet.`;

    if (nearestResistance) {
      analystSentence +=
        ` The nearest resistance is around ${Number(nearestResistance).toFixed(0)}.`;
    }
  } else if (
    structure === "BEARISH" ||
    structure === "LOWER_LOWS"
  ) {
    analystSentence =
      `${coin} is in a transition phase on the ${timeframeText} timeframe. Price structure is bearish, but MA 7, MA 25, and MA 99 are not fully aligned yet.`;

    if (nearestSupport) {
      analystSentence +=
        ` The nearest support is around ${Number(nearestSupport).toFixed(0)}.`;
    }
  } else {
    analystSentence =
      `Market direction is unclear on the ${timeframeText} timeframe because MA 7, MA 25, and MA 99 are not fully aligned.`;
  }
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

let tradeQuality = "Neutral";

if (marketDirection === "TRANSITION") {
  tradeQuality = "Neutral";
} else if (!alignedWithDirection) {
  tradeQuality = "Weak";
} else if (riskLabel === "Controlled") {
  tradeQuality = "Good";
} else {
  tradeQuality = "Neutral";
}

const patternSummary =
  marketIntelligence?.patternAnalysis?.summary || "";

const momentumSummary =
  marketIntelligence?.momentumAnalysis?.summary || "";

let reason = "";

if (marketDirection === "TRANSITION") {
  reason =
    "Market direction was unclear at the time of entry.";
} else if (!alignedWithDirection) {
  reason = momentumSummary
    ? `This ${tradeDirection} trade was opened against a ${directionLabel.toLowerCase()} market direction while ${momentumSummary.toLowerCase()}`
    : `This ${tradeDirection} trade was opened against a ${directionLabel.toLowerCase()} market direction.`;
} else if (riskLabel === "High") {
  reason = "Risk exposure was too high for this setup.";
} else {
  reason = patternSummary
    ? `This ${tradeDirection} trade was aligned with market direction, and ${patternSummary.toLowerCase()}`
    : `This ${tradeDirection} trade was aligned with the market direction.`;
}

const reviewText = `
Trade Quality: ${tradeQuality}

Reason:
${reason}

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
structure,
nearestSupport,
nearestResistance,
timeframe: timeframeText,

});

  setAnswer(reviewText.trim());
}
  return (
    <div className="rounded-3xl border border-cyan-400/20 bg-[#0f172a]/90 p-5 shadow-[0_0_35px_rgba(34,211,238,0.08)]">


      <div className="whitespace-pre-line rounded-2xl border border-zinc-800 bg-[#020617] p-5 text-base leading-6 text-zinc-200">
        {loading ? "Gaby is reviewing..." : answer}
      </div>

<div className="mt-4 flex flex-col gap-2 sm:flex-row">
<button
  onClick={() => window.dispatchEvent(new Event("startSimulatorTour"))}
  className="hidden h-11 rounded-xl border border-zinc-800 bg-[#111827] px-4 text-sm font-bold text-zinc-300 hover:border-cyan-400 hover:text-cyan-300 xl:block"
>
  Explain Panel
</button>

<button
  onClick={reviewTrade}
  className="h-11 w-full sm:w-auto rounded-xl border border-zinc-800 bg-[#111827] px-4 text-sm font-bold text-zinc-300 hover:border-cyan-400 hover:text-cyan-300"
>
  Review Trade
</button>
</div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") askGaby();
          }}
          placeholder="Ask me about the simulator or review a practice trade."
          className="h-14 xl:h-11 flex-1 rounded-xl border border-zinc-800 bg-[#020617] px-4 text-base xl:text-sm text-white outline-none placeholder:text-zinc-500 focus:border-cyan-400"
        />

<button
  onClick={() => askGaby()}
  disabled={loading}
  className="h-11 w-full sm:w-auto rounded-xl bg-cyan-500 px-4 text-sm font-black text-black hover:bg-cyan-400 disabled:opacity-50"
>
  Ask
</button>
      </div>
    </div>
  );
}