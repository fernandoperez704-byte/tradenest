export function buildStopLossAnalysis(reviews: any[]) {
  const used = reviews.filter(
    (r) => r.usedStopLoss === true
  ).length;

  const notUsed = reviews.filter(
    (r) => r.usedStopLoss === false
  ).length;

  const total = used + notUsed;

  return {
    used,

    notUsed,

    usageRate:
      total === 0
        ? 0
        : Math.round((used / total) * 100),
  };
}