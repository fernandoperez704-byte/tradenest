export function buildTakeProfitAnalysis(reviews: any[]) {
  const used = reviews.filter(
    (r) => r.usedTakeProfit === true
  ).length;

  const notUsed = reviews.filter(
    (r) => r.usedTakeProfit === false
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