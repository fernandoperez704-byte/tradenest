import type {
  TradeReview,
  TrendAnalysisResult,
} from "./types";

type TrendCounts = {
  aligned: number;
  against: number;
};

function extractTrendAligned(
  review: TradeReview
): boolean | null {
  const value =
    review.trendAligned ??
    review.automaticReview?.trendAligned ??
    review.tradeContext?.trendAligned ??
    review.engine?.trendAligned ??
    review.engine?.market?.trendAligned ??
    review.marketReview?.trendAligned ??
    null;

  return typeof value === "boolean"
    ? value
    : null;
}

export function buildTrendAnalysis(
  reviews: TradeReview[]
): TrendAnalysisResult {
  const { aligned, against } =
    reviews.reduce<TrendCounts>(
      (acc, review) => {
        const isAligned =
          extractTrendAligned(review);

        if (isAligned === true) {
          acc.aligned++;
        } else if (isAligned === false) {
          acc.against++;
        }

        return acc;
      },
      {
        aligned: 0,
        against: 0,
      }
    );

  const total =
    aligned + against;

  const alignmentRate =
    total === 0
      ? 0
      : Math.round(
          (aligned / total) * 100
        );

  let status: TrendAnalysisResult["status"] =
    "Neutral";

  if (total > 0) {
    if (alignmentRate >= 70) {
      status = "Strong Trend";
    } else if (alignmentRate >= 50) {
      status = "Trending";
    } else {
      status = "Counter-Trend";
    }
  }

  return {
    aligned,
    against,
    alignmentRate,
    status,
  };
}