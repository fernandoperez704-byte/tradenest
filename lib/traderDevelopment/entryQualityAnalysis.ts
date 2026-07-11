export function buildEntryQualityAnalysis(reviews: any[]) {
  if (reviews.length === 0) {
    return {
      good: 0,
      average: 0,
      poor: 0,
      goodEntryRate: 0,
      poorEntryRate: 0,
      status: "No Data",
    };
  }

  let good = 0;
  let average = 0;
  let poor = 0;

  for (const review of reviews) {
    if (review.entryQuality === "GOOD") good++;
    else if (review.entryQuality === "AVERAGE") average++;
    else if (review.entryQuality === "POOR") poor++;
  }

  const total = good + average + poor;

  const goodEntryRate =
    total === 0 ? 0 : Math.round((good / total) * 100);

  const poorEntryRate =
    total === 0 ? 0 : Math.round((poor / total) * 100);

  let status = "Average Entries";

  if (goodEntryRate >= 70) {
    status = "Excellent Entries";
  } else if (goodEntryRate >= 50) {
    status = "Good Entries";
  } else if (poorEntryRate >= 50) {
    status = "Poor Entries";
  }

  return {
    good,
    average,
    poor,
    goodEntryRate,
    poorEntryRate,
    status,
  };
}