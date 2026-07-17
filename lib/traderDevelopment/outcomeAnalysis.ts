import type {
  OutcomeMetrics,
  TradeReview,
} from "./types";

type OutcomeCounts = {
  wins: number;
  losses: number;
  breakeven: number;
};

export function buildOutcomeAnalysis(
  reviews: TradeReview[]
): OutcomeMetrics {
  const counts =
    reviews.reduce<OutcomeCounts>(
      (acc, review) => {
        const result = String(
          review.result ??
            review.outcome ??
            review.automaticReview?.result ??
            review.automaticReview?.outcome ??
            ""
        ).toUpperCase();

        if (
          result === "PROFIT" ||
          result === "WIN"
        ) {
          acc.wins++;
        } else if (result === "LOSS") {
          acc.losses++;
        } else if (
          result === "BREAKEVEN" ||
          result === "BREAK_EVEN"
        ) {
          acc.breakeven++;
        }

        return acc;
      },
      {
        wins: 0,
        losses: 0,
        breakeven: 0,
      }
    );

  return {
    wins: counts.wins,
    losses: counts.losses,
    breakeven: counts.breakeven,
  };
}