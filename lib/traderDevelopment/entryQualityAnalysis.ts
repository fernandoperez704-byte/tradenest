export function buildEntryQualityAnalysis(reviews: any[]) {
  const good = reviews.filter(
    (r) => r.entryQuality === "GOOD"
  ).length;

  const average = reviews.filter(
    (r) => r.entryQuality === "AVERAGE"
  ).length;

  const poor = reviews.filter(
    (r) => r.entryQuality === "POOR"
  ).length;

  const total = good + average + poor;

  return {
    good,

    average,

    poor,

    goodEntryRate:
      total === 0
        ? 0
        : Math.round((good / total) * 100),

    poorEntryRate:
      total === 0
        ? 0
        : Math.round((poor / total) * 100),
  };
}