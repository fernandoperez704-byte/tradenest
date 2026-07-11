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

  // 1. Find all trades with leverage >= 25
  const highLeveragePositions = futuresReviews.filter(
    (r) => typeof r.leverage === "number" && r.leverage >= 25
  );

  const highLeverageTrades = highLeveragePositions.length;

  // 2. Out of those high leverage trades, count how many were losses
  const highLeverageLosses = highLeveragePositions.filter(
    (r) => r.result?.toUpperCase() === "LOSS"
  ).length;

  // 3. Calculate the percentage of high leverage trades that fail
  const highLeverageLossRate = highLeverageTrades === 0
    ? 0
    : Math.round((highLeverageLosses / highLeverageTrades) * 100);

  return {
    totalFuturesTrades: futuresReviews.length,
    averageLeverage,
    highLeverageTrades,
    highLeverageLossRate, // New Metric!
    highLeverageRate:
      total === 0
        ? 0
        : Math.round((highLeverageTrades / total) * 100),
  };
}