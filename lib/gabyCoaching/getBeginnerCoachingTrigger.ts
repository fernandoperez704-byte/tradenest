export type BeginnerCoachingConcept =
  | "RISK_MANAGEMENT"
  | "STOP_LOSS"
  | "MARKET_DIRECTION"
  | "MARKET_STRUCTURE"
  | "PRICE_LOCATION";

export type BeginnerCoachingTrigger = {
  concept: BeginnerCoachingConcept;
  reason: string;
};

type BeginnerCoachingInput = {
  tradingExperience: string;
  learnedConcepts: string[];
  reviews: any[];
};

export function getBeginnerCoachingTrigger({
  tradingExperience,
  learnedConcepts,
  reviews,
}: BeginnerCoachingInput): BeginnerCoachingTrigger | null {
  if (tradingExperience !== "NEW") {
    return null;
  }

  if (!Array.isArray(reviews) || reviews.length === 0) {
    return null;
  }

  const latestReview = reviews[0];

  if (!latestReview) {
    return null;
  }

  const hasLearnedStopLoss = learnedConcepts.some((concept) =>
    concept.toLowerCase().includes("stop loss")
  );

  const usedStopLoss =
    latestReview.engine?.usedStopLoss ??
    latestReview.usedStopLoss ??
    null;

  if (usedStopLoss === false && !hasLearnedStopLoss) {
    return {
      concept: "STOP_LOSS",
      reason:
        "The trader just completed a reviewed trade without using a stop loss.",
    };
  }

  const hasLearnedMarketDirection = learnedConcepts.some((concept) =>
    concept.toLowerCase().includes("market direction")
  );

  const trendAligned =
    latestReview.engine?.trendAligned ??
    latestReview.trendAligned ??
    null;

  if (
    trendAligned === false &&
    !hasLearnedMarketDirection
  ) {
    return {
      concept: "MARKET_DIRECTION",
      reason:
        "The reviewed trade was opened against the recorded market direction.",
    };
  }

  const hasLearnedMarketStructure = learnedConcepts.some((concept) =>
    concept.toLowerCase().includes("market structure")
  );

  const marketStructure =
    latestReview.engine?.marketAtEntry?.marketStructure ??
    latestReview.tradeContext?.market?.marketStructure ??
    null;

  const tradeSide =
    latestReview.engine?.side ??
    latestReview.side ??
    null;

  const bullishStructure =
    marketStructure === "BULLISH" ||
    marketStructure === "BULLISH_CONSOLIDATION" ||
    marketStructure === "BULLISH_PULLBACK" ||
    marketStructure === "HIGHER_HIGHS";

  const bearishStructure =
    marketStructure === "BEARISH" ||
    marketStructure === "BEARISH_CONSOLIDATION" ||
    marketStructure === "BEARISH_PULLBACK" ||
    marketStructure === "LOWER_LOWS";

  const longTrade =
    tradeSide === "LONG" ||
    tradeSide === "BUY";

  const shortTrade =
    tradeSide === "SHORT" ||
    tradeSide === "SELL";

  if (
    (
      (longTrade && bearishStructure) ||
      (shortTrade && bullishStructure)
    ) &&
    !hasLearnedMarketStructure
  ) {
    return {
      concept: "MARKET_STRUCTURE",
      reason:
        "The reviewed trade was opened against the recorded market structure.",
    };
  }

  const hasLearnedPriceLocation = learnedConcepts.some((concept) =>
    concept.toLowerCase().includes("price location")
  );

  const entryQuality =
    latestReview.engine?.entryQuality ??
    latestReview.entryQuality ??
    null;

  if (
    entryQuality === "POOR" &&
    !hasLearnedPriceLocation
  ) {
    return {
      concept: "PRICE_LOCATION",
      reason:
        "The reviewed trade had poor entry quality based on the recorded market conditions.",
    };
  }

  const hasLearnedRiskManagement = learnedConcepts.some((concept) =>
    concept.toLowerCase().includes("risk")
  );

  const riskLevel =
    latestReview.engine?.riskLevel ??
    latestReview.riskLevel ??
    null;

  if (
    (riskLevel === "MEDIUM" || riskLevel === "HIGH") &&
    !hasLearnedRiskManagement
  ) {
    return {
      concept: "RISK_MANAGEMENT",
      reason:
        "The reviewed trade used elevated risk, so this is a good opportunity to teach risk management.",
    };
  }

  return null;
}