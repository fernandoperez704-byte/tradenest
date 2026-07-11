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
    const timeframe = review.timeframe || "UNKNOWN";

    if (!stats[timeframe]) {
      stats[timeframe] = {
        trades: 0,
        wins: 0,
        losses: 0,
      };
    }

    stats[timeframe].trades++;

    // Normalize result comparison strings
    const res = review.result?.toUpperCase();

    if (res === "PROFIT" || res === "WIN") {
      stats[timeframe].wins++;
    }

    if (res === "LOSS") {
      stats[timeframe].losses++;
    }
  });

  return stats;
}