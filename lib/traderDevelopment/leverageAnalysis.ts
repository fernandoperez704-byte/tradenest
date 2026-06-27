export function buildLeverageAnalysis(reviews: any[]) {
  const futuresReviews = reviews.filter(
    (r) => r.mode === "FUTURES"
  );

  const leverageValues = futuresReviews
    .map((r) => r.leverage)
    .filter((value) => typeof value === "number");

  const total = leverageValues.length;

  const averageLeverage =
    total === 0
      ? 0
      : Number(
          (
            leverageValues.reduce((sum, value) => sum + value, 0) / total
          ).toFixed(2)
        );

  const highLeverageTrades = leverageValues.filter(
    (value) => value >= 25
  ).length;

  return {
    totalFuturesTrades: futuresReviews.length,

    averageLeverage,

    highLeverageTrades,

    highLeverageRate:
      total === 0
        ? 0
        : Math.round((highLeverageTrades / total) * 100),
  };
}