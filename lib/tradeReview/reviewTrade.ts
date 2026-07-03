import { TradeReviewInput } from "./types";
import { buildTradeOutcome } from "./tradeIntelligence";
import { buildManagementReview } from "./buildManagementReview";
import { buildExitReview } from "./buildExitReview";
import { buildEntryReview } from "./buildEntryReview";



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
const exitReview =
  buildExitReview(managementReview);






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
      "The entry quality was weak based on the saved entry-quality engine, not simply because price was between support and resistance.",
  };
}

  const tradeDirection =
    input.side === "LONG" || input.side === "BUY"
      ? "BULLISH"
      : "BEARISH";

const entryReview = buildEntryReview({
  direction,
  tradeDirection,
  priceLocation,
  entryQuality,
  momentum: market?.momentum || null,
  controlStrength: market?.controlStrength || null,
  marketState: market?.marketState || null,
});

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

const coachingAreas = [
{
  area: "ENTRY",
  score: entryReview.score,
  message: entryReview.lesson,
},
  {
    area: "RISK",
    score: riskReview.score,
    message: riskReview.explanation,
  },
  {
    area: "MANAGEMENT",
    score:
      managementReview.managementQuality === "STRONG"
        ? 100
        : managementReview.managementQuality === "GOOD"
        ? 80
        : managementReview.managementQuality === "AVERAGE"
        ? 50
        : managementReview.managementQuality === "WEAK"
        ? 20
        : 50,
    message: managementReview.lesson,
  },
  {
    area: "EXIT",
    score:
      exitReview.exitQuality === "EXCELLENT"
        ? 100
        : exitReview.exitQuality === "GOOD"
        ? 80
        : exitReview.exitQuality === "AVERAGE"
        ? 50
        : exitReview.exitQuality === "WEAK"
        ? 20
        : 50,
    message: exitReview.lesson,
  },
];

const biggestStrength = [...coachingAreas].sort(
  (a, b) => b.score - a.score
)[0];

const biggestWeakness = [...coachingAreas].sort(
  (a, b) => a.score - b.score
)[0];

let reviewExplanation =
  "The trade ended based on the saved market and trade facts.";

let reviewContext =
  "No single factor was identified as the clear main cause.";

let reviewLesson = mainLesson;

if (
  result === "LOSS" &&
  managementReview.managementQuality === "WEAK"
) {
  reviewExplanation =
    "The trade resulted in a loss because too much of the available move was given back before exiting.";

  reviewContext =
    "The market initially gave the trade a chance to work, but trade management allowed the position to reverse.";

  reviewLesson =
    "Focus on protecting unrealized profit once the trade begins working.";
}

if (result === "LOSS") {
if (
  input.pnl < 0 &&
  (input.grossPnl || 0) > 0
)
 {
    reviewExplanation =
      "The trade resulted in a loss because the market moved slightly in your favor, but not enough to overcome trading fees.";

    reviewContext =
      "The trade idea showed some potential, but the move was too small to produce a positive net result.";

    reviewLesson =
      "Look for setups with enough expected movement to comfortably cover trading fees.";
  }

  else if (managementReview.managementQuality === "WEAK") {
    reviewExplanation =
      "The trade resulted in a loss because too much of the available profit was given back before exiting.";

    reviewContext =
      "The market initially supported the trade, but trade management allowed the position to reverse.";

    reviewLesson =
      "Protect unrealized profit once the trade begins working.";
  }

  else if (entryReview.quality === "WEAK") {
    reviewExplanation =
      "The trade resulted in a loss because the market conditions did not strongly support the entry.";

    reviewContext =
      "The trade never developed enough market confirmation after entry.";

    reviewLesson =
      "Wait for stronger market alignment before entering.";
  }

  else {
    reviewExplanation =
      "The trade resulted in a loss because the market did not develop enough in favor of the trade.";

    reviewContext =
      "The saved review does not identify one dominant execution mistake.";

    reviewLesson =
      "Continue waiting for higher-quality opportunities before committing to a trade.";
  }
}

if (result === "WIN") {

  if (riskReview.rating === "WEAK") {
    reviewExplanation =
      "The trade resulted in a profit, but the risk taken was higher than necessary.";

    reviewContext =
      "A profitable outcome does not automatically mean the trade was well managed.";

    reviewLesson =
      "Keep the same trade quality while improving risk control.";
  }

  else if (exitReview.exitQuality === "EXCELLENT") {
    reviewExplanation =
      "The trade resulted in a profit because most of the available move was captured before exiting.";

    reviewContext =
      "Trade management protected the move before profits were given back.";

    reviewLesson =
      "Continue protecting profitable trades with disciplined exits.";
  }

  else if (
    entryReview.quality === "GOOD" ||
    entryReview.quality === "EXCELLENT"
  ) {
    reviewExplanation =
      "The trade resulted in a profit because the market moved in favor of a well-aligned entry.";

    reviewContext =
      "The market conditions supported the trade long enough for it to develop.";

    reviewLesson =
      "Continue focusing on high-quality entries.";
  }

  else {
    reviewExplanation =
      "The trade resulted in a profit because the market moved enough in favor of the position.";

    reviewContext =
      "The trade closed with a positive result even though no single factor stood out as the primary reason.";

    reviewLesson =
      "Keep reviewing what worked so it can be repeated consistently.";
  }
}
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
exit: exitReview,

coaching: {
  focusArea: biggestWeakness.area,
  focusMessage: biggestWeakness.message,

  praiseArea: biggestStrength.area,
  praiseMessage: biggestStrength.message,

  lesson: mainLesson,
},

review: {
  explanation: reviewExplanation,
  context: reviewContext,
  lesson: reviewLesson,
},

timeframe: market?.timeframe || null,
marketAtEntry: market,

    trendAligned,
    directionReview,

priceLocation,
entryQuality,
locationReview,

entry: entryReview,

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