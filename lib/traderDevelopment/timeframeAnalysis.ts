export function buildTimeframeAnalysis(reviews: any[]) {
  const stats: Record<
    string,
    {
      trades: number;
      wins: number;
      losses: number;
    }
  > = {};

  reviews.forEach((review) => {
    const timeframe =
      review.timeframe || "UNKNOWN";

    if (!stats[timeframe]) {
      stats[timeframe] = {
        trades: 0,
        wins: 0,
        losses: 0,
      };
    }

    stats[timeframe].trades++;

    if (review.result === "PROFIT") {
      stats[timeframe].wins++;
    }

    if (review.result === "LOSS") {
      stats[timeframe].losses++;
    }
  });

  return stats;
}