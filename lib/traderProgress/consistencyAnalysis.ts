export function buildConsistencyAnalysis(reviews: any[]) {
  if (reviews.length < 10) {
    return {
      consistency: "NOT_ENOUGH_DATA",
      profitableStreak: 0,
      losingStreak: 0,
    };
  }

  let profitableStreak = 0;
  let losingStreak = 0;

  let currentProfit = 0;
  let currentLoss = 0;

  reviews.forEach((review) => {
    if (review.result === "PROFIT") {
      currentProfit++;
      currentLoss = 0;

      profitableStreak = Math.max(
        profitableStreak,
        currentProfit
      );
    } else if (review.result === "LOSS") {
      currentLoss++;
      currentProfit = 0;

      losingStreak = Math.max(
        losingStreak,
        currentLoss
      );
    }
  });

  let consistency = "IMPROVING";

  if (losingStreak >= 5) {
    consistency = "INCONSISTENT";
  }

  if (profitableStreak >= 5) {
    consistency = "CONSISTENT";
  }

  return {
    consistency,

    profitableStreak,

    losingStreak,
  };
}