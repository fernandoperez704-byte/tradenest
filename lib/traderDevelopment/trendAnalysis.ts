export function buildTrendAnalysis(reviews: any[]) {
  if (reviews.length === 0) {
    return { aligned: 0, against: 0, alignmentRate: 0, status: "Neutral" };
  }

  let aligned = 0;
  let against = 0;

// Single pass calculation
for (const r of reviews) {
  const trendAligned =
    r?.trendAligned ??
    r?.engine?.trendAligned ??
    r?.engine?.market?.trendAligned ??
    r?.marketReview?.trendAligned ??
    null;

  if (trendAligned === true) aligned++;
  else if (trendAligned === false) against++;
}

  const total = aligned + against;
  const alignmentRate = total === 0 ? 0 : Math.round((aligned / total) * 100);

  // Determine a status string for the badge
  const status = alignmentRate >= 70 ? "Strong Trend" : alignmentRate >= 50 ? "Trending" : "Counter-Trend";

  return {
    aligned,
    against,
    alignmentRate,
    status
  };
}