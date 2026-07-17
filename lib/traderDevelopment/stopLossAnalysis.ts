import type {
  TradeReview,
  UsageMetrics,
} from "./types";

type UsageCounts = {
  used: number;
  notUsed: number;
};

function extractStopLossUsage(
  review: TradeReview
): boolean | null {
  const value =
    review.usedStopLoss ??
    review.automaticReview?.usedStopLoss ??
    null;

  return typeof value === "boolean"
    ? value
    : null;
}

export function buildStopLossAnalysis(
  reviews: TradeReview[]
): UsageMetrics {
  const stats =
    reviews.reduce<UsageCounts>(
      (acc, review) => {
        const used =
          extractStopLossUsage(review);

        if (used === true) {
          acc.used++;
        } else if (used === false) {
          acc.notUsed++;
        }

        return acc;
      },
      {
        used: 0,
        notUsed: 0,
      }
    );

  const total =
    stats.used + stats.notUsed;

  return {
    used: stats.used,
    notUsed: stats.notUsed,
    usageRate:
      total === 0
        ? 0
        : Math.round(
            (stats.used / total) * 100
          ),
  };
}