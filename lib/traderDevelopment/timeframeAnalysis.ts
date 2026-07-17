import type { TradeReview } from "./types";

/**
 * Statistics grouped by timeframe.
 */
export interface TimeframeStats {
  trades: number;
  wins: number;
  losses: number;
}

export type TimeframeAnalysisResult =
  Record<string, TimeframeStats>;

function extractTimeframe(
  review: TradeReview
): string {
  const timeframe =
    review.timeframe ??
    review.tradeContext?.timeframe ??
    review.automaticReview?.entryReview?.timeframe ??
    "UNKNOWN";

  return String(timeframe).toUpperCase();
}

function extractResult(
  review: TradeReview
): string | null {
  const result =
    review.result ??
    review.outcome ??
    review.automaticReview?.result ??
    null;

  return typeof result === "string"
    ? result.toUpperCase()
    : null;
}

export function buildTimeframeAnalysis(
  reviews: TradeReview[]
): TimeframeAnalysisResult {
  return reviews.reduce<TimeframeAnalysisResult>(
    (acc, review) => {
      const timeframe =
        extractTimeframe(review);

      if (!acc[timeframe]) {
        acc[timeframe] = {
          trades: 0,
          wins: 0,
          losses: 0,
        };
      }

      const stats = acc[timeframe];

      stats.trades++;

      const result =
        extractResult(review);

      if (
        result === "PROFIT" ||
        result === "WIN"
      ) {
        stats.wins++;
      } else if (result === "LOSS") {
        stats.losses++;
      }

      return acc;
    },
    {}
  );
}