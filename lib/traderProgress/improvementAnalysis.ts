import { TraderProgressInput, TraderProgressReport } from "./types";

/**
 * Computes period-over-period progression, tracking win-rate adjustments 
 * and isolating actionable performance traits.
 */
export function buildImprovementAnalysis(input: TraderProgressInput): TraderProgressReport {
  const reviews = [...input.reviews].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const totalTrades = reviews.length;
  
  const half = Math.floor(totalTrades / 2);
  const firstHalfReviews = reviews.slice(0, half);
  const recentHalfReviews = reviews.slice(half);

  const calcWinRate = (periodReviews: typeof reviews) => {
    if (periodReviews.length === 0) return 0;
    const wins = periodReviews.filter((r) => r.result === "PROFIT").length;
    return (wins / periodReviews.length) * 100;
  };

  const firstWinRate = calcWinRate(firstHalfReviews);
  const recentWinRate = calcWinRate(recentHalfReviews);
  const winRateChange = recentWinRate - firstWinRate;

  const strengths: string[] = [];
  const improvements: string[] = [];
  const milestones: string[] = [];

  if (winRateChange > 0) {
    strengths.push(`Win rate increased by ${winRateChange.toFixed(1)}% over time.`);
    if (winRateChange >= 10) {
      milestones.push("Significant performance accuracy breakthrough achieved.");
    }
  } else if (winRateChange < 0) {
    improvements.push(`Win rate dipped by ${Math.abs(winRateChange).toFixed(1)}% recently.`);
  } else if (totalTrades > 0) {
    strengths.push("Maintained stable baseline account execution rules.");
  }

  return {
    totalTrades,
    firstPeriod: {
      trades: firstHalfReviews.length,
      winRate: parseFloat(firstWinRate.toFixed(2)),
    },
    recentPeriod: {
      trades: recentHalfReviews.length,
      winRate: parseFloat(recentWinRate.toFixed(2)),
    },
    improvement: {
      winRateChange: parseFloat(winRateChange.toFixed(2)),
    },
    strengths,
    improvements,
    milestones,
  };
}