import { TradeReviewInput } from "./types";
import { buildTradeOutcome } from "./tradeIntelligence";
import { buildManagementReview } from "./buildManagementReview";





export function reviewTrade(input: TradeReviewInput) {
  const market = input.tradeContext?.market || null;

const outcome = buildTradeOutcome({
  pnl: input.pnl,
  grossPnl: input.grossPnl,
  totalFees: input.totalFees,
});

const result = outcome.result;

  const usedStopLoss = input.stopLoss != null;
  const usedTakeProfit = input.takeProfit != null;

  const direction = market?.marketDirection || null;
  const priceLocation = market?.priceLocation || null;
  const entryQuality = market?.entryQuality || null;
const management = input.management || null;
const managementReview =
  buildManagementReview(management);




let locationReview = {
  score: 50,
  rating: "NEUTRAL",
  explanation:
    "The entry location was acceptable based on the recorded market conditions.",
};

if (entryQuality === "EXCELLENT") {
  locationReview = {
    score: 100,
    rating: "STRONG",
    explanation:
      "The trade was opened from a high-quality location with strong market alignment.",
  };
}

if (entryQuality === "GOOD") {
  locationReview = {
    score: 80,
    rating: "GOOD",
    explanation:
      "The entry location supported the trade idea.",
  };
}

if (entryQuality === "POOR") {
  locationReview = {
    score: 20,
    rating: "WEAK",
    explanation:
      "The entry location offered poor alignment with the recorded market conditions.",
  };
}

  const tradeDirection =
    input.side === "LONG" || input.side === "BUY"
      ? "BULLISH"
      : "BEARISH";

  const trendAligned =
    direction === "BULLISH" && tradeDirection === "BULLISH"
      ? true
      : direction === "BEARISH" && tradeDirection === "BEARISH"
      ? true
      : direction === "TRANSITION"
      ? null
      : false;

let directionReview = {
  score: 50,
  rating: "NEUTRAL",
  explanation:
    "Market direction was transitioning at the time of entry.",
};

if (trendAligned === true) {
  directionReview = {
    score: 100,
    rating: "STRONG",
    explanation:
      "The trade followed the recorded market direction.",
  };
}

if (trendAligned === false) {
  directionReview = {
    score: 0,
    rating: "WEAK",
    explanation:
      "The trade was opened against the recorded market direction.",
  };
}

  let riskLevel: "LOW" | "MEDIUM" | "HIGH" = "LOW";

  if (input.mode === "FUTURES") {
    if ((input.leverage || 1) >= 25) {
      riskLevel = "HIGH";
    } else if ((input.leverage || 1) >= 10) {
      riskLevel = "MEDIUM";
    }
  }

let riskReview = {
  score: 100,
  rating: "STRONG",
  explanation:
    "Risk was controlled based on the recorded trade settings.",
};

if (riskLevel === "MEDIUM") {
  riskReview = {
    score: 60,
    rating: "NEUTRAL",
    explanation:
      "Risk was moderate because leverage increased the impact of price movement.",
  };
}

if (riskLevel === "HIGH") {
  riskReview = {
    score: 20,
    rating: "WEAK",
    explanation:
      "Risk was high because leverage increased the danger of a small price move.",
  };
}

if (!usedStopLoss) {
  riskReview = {
    score: Math.min(riskReview.score, 30),
    rating: "WEAK",
    explanation:
      "Risk control was weak because the trade did not use a stop loss.",
  };
}

  let primaryStrength = "The trade had a clear recorded entry and exit.";
  let primaryWeakness = "No major weakness was detected from the saved data.";
  let mainLesson = "Keep reviewing each trade based on the facts available at entry.";

  if (trendAligned === true) {
    primaryStrength = "The trade was aligned with the market direction at entry.";
  }

  if (trendAligned === false) {
    primaryWeakness = "The trade was opened against the market direction at entry.";
    mainLesson =
      "Before entering, check whether your trade direction agrees with the market direction.";
  }

  if (!usedStopLoss) {
    primaryWeakness = "The trade did not use a stop loss.";
    mainLesson =
      "A stop loss helps define risk before entering and protects the account from uncontrolled losses.";
  }

  if (riskLevel === "HIGH") {
    primaryWeakness = "The trade used high leverage, which increased account risk.";
    mainLesson =
      "High leverage makes small price moves more dangerous, so position size and risk control matter even more.";
  }

  if (entryQuality === "POOR") {
    primaryWeakness = "The entry quality was weak based on the saved market conditions.";
    mainLesson =
      "Better entries usually come from waiting for stronger alignment between direction, location, and market structure.";
  }

const finalScore = Math.round(
  directionReview.score * 0.4 +
    locationReview.score * 0.35 +
    riskReview.score * 0.25
);

const finalQuality =
  finalScore >= 80
    ? "GOOD"
    : finalScore >= 55
    ? "NEUTRAL"
    : "WEAK";

  return {
  version: "1.0",
  type: "TRADE_REVIEW_SNAPSHOT",

  createdAt: new Date().toISOString(),

  engine: {
    mode: input.mode,
    side: input.side,
    result,
    finalScore,
    finalQuality,

    entryPrice: input.entryPrice,
    exitPrice: input.exitPrice,
    pnl: input.pnl,
    grossPnl: input.grossPnl || null,
    totalFees: input.totalFees || 0,

outcome,

management: managementReview,

timeframe: market?.timeframe || null,
marketAtEntry: market,

    trendAligned,
    directionReview,

    priceLocation,
    entryQuality,
    locationReview,

    usedStopLoss,
    usedTakeProfit,
    riskLevel,
    riskReview,

    primaryStrength,
    primaryWeakness,
    mainLesson,
  },

  gaby: {
    generated: false,
    generatedAt: null,
    model: null,
    explanation: null,
  },
};

}