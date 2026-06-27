export function buildTrendAnalysis(reviews: any[]) {
  const aligned = reviews.filter(
    (r) => r.trendAligned === true
  ).length;

  const against = reviews.filter(
    (r) => r.trendAligned === false
  ).length;

  const total = aligned + against;

  return {
    aligned,
    against,
    alignmentRate:
      total === 0
        ? 0
        : Math.round((aligned / total) * 100),
  };
}