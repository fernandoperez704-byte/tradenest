export function buildOutcomeAnalysis(reviews: any[]) {
  const profit = reviews.filter(
    (r) => r.result === "PROFIT"
  ).length;

  const loss = reviews.filter(
    (r) => r.result === "LOSS"
  ).length;

  const breakeven = reviews.filter(
    (r) => r.result === "BREAKEVEN"
  ).length;

  const total = profit + loss + breakeven;

  return {
    profit,

    loss,

    breakeven,

    profitRate:
      total === 0
        ? 0
        : Math.round((profit / total) * 100),

    lossRate:
      total === 0
        ? 0
        : Math.round((loss / total) * 100),
  };
}