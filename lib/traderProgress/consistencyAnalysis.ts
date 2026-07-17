import type {
  TradeReview,
} from "@/lib/traderDevelopment/types";

export interface ConsistencyAnalysisResult {
  consistency:
    | "NOT_ENOUGH_DATA"
    | "INCONSISTENT"
    | "IMPROVING"
    | "CONSISTENT";

  profitableStreak: number;
  losingStreak: number;
}

const MINIMUM_TRADES = 10;

function getResult(
  review: TradeReview
): string {
  return String(
    review.result ??
      review.outcome ??
      review.automaticReview?.result ??
      review.automaticReview?.outcome ??
      ""
  ).toUpperCase();
}

export function buildConsistencyAnalysis(
  reviews: TradeReview[]
): ConsistencyAnalysisResult {
  if (reviews.length < MINIMUM_TRADES) {
    return {
      consistency: "NOT_ENOUGH_DATA",
      profitableStreak: 0,
      losingStreak: 0,
    };
  }

  let profitableStreak = 0;
  let losingStreak = 0;

  let currentProfitStreak = 0;
  let currentLossStreak = 0;

  for (const review of reviews) {
    const result = getResult(review);

    if (
      result === "PROFIT" ||
      result === "WIN"
    ) {
      currentProfitStreak++;
      currentLossStreak = 0;

      profitableStreak = Math.max(
        profitableStreak,
        currentProfitStreak
      );
    } else if (result === "LOSS") {
      currentLossStreak++;
      currentProfitStreak = 0;

      losingStreak = Math.max(
        losingStreak,
        currentLossStreak
      );
    } else if (
      result === "BREAKEVEN" ||
      result === "BREAK_EVEN"
    ) {
      currentProfitStreak = 0;
      currentLossStreak = 0;
    }
  }

  let consistency: ConsistencyAnalysisResult["consistency"] =
    "IMPROVING";

  if (losingStreak >= 5) {
    consistency = "INCONSISTENT";
  } else if (profitableStreak >= 5) {
    consistency = "CONSISTENT";
  }

  return {
    consistency,
    profitableStreak,
    losingStreak,
  };
}