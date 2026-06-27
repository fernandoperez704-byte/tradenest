export function buildImprovementAnalysis(reviews: any[]) {
  if (reviews.length < 10) {
    return {
      firstWinRate: 0,
      recentWinRate: 0,
      change: 0,
    };
  }

  const half = Math.floor(reviews.length / 2);

  const first = reviews.slice(0, half);

  const recent = reviews.slice(half);

  const firstWins =
    first.filter((r) => r.result === "PROFIT").length;

  const recentWins =
    recent.filter((r) => r.result === "PROFIT").length;

  const firstWinRate =
    Math.round((firstWins / first.length) * 100);

  const recentWinRate =
    Math.round((recentWins / recent.length) * 100);

  return {
    firstWinRate,

    recentWinRate,

    change:
      recentWinRate - firstWinRate,
  };
}