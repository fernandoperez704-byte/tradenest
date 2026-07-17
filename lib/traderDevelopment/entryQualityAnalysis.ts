import type {
  EntryAnalysis,
  EntryQuality,
  TradeReview,
} from "./types";

function extractEntryQuality(
  review: TradeReview
): EntryQuality | null {
  const value =
    review.entryQuality ??
    review.tradeContext?.entryQuality ??
    review.automaticReview?.entryReview
      ?.entryQuality ??
    null;

  const normalized =
    typeof value === "string"
      ? value.toUpperCase()
      : null;

  if (
    normalized === "GOOD" ||
    normalized === "AVERAGE" ||
    normalized === "POOR"
  ) {
    return normalized;
  }

  return null;
}

/**
 * Analyzes entry-quality distribution and status.
 */
export function buildEntryQualityAnalysis(
  reviews: TradeReview[]
): EntryAnalysis {
  const counts = reviews.reduce<
    Record<EntryQuality, number>
  >(
    (acc, review) => {
      const entryQuality =
        extractEntryQuality(review);

      if (entryQuality) {
        acc[entryQuality]++;
      }

      return acc;
    },
    {
      GOOD: 0,
      AVERAGE: 0,
      POOR: 0,
    }
  );

  const totalClassified =
    counts.GOOD +
    counts.AVERAGE +
    counts.POOR;

  if (totalClassified === 0) {
    return {
      good: 0,
      average: 0,
      poor: 0,
      goodEntryRate: 0,
      poorEntryRate: 0,
      status: "No Data",
    };
  }

  const goodEntryRate = Math.round(
    (counts.GOOD / totalClassified) * 100
  );

  const poorEntryRate = Math.round(
    (counts.POOR / totalClassified) * 100
  );

  let status: EntryAnalysis["status"] =
    "Average Entries";

  if (goodEntryRate >= 70) {
    status = "Excellent Entries";
  } else if (goodEntryRate >= 50) {
    status = "Good Entries";
  } else if (poorEntryRate >= 50) {
    status = "Poor Entries";
  }

  return {
    good: counts.GOOD,
    average: counts.AVERAGE,
    poor: counts.POOR,
    goodEntryRate,
    poorEntryRate,
    status,
  };
}