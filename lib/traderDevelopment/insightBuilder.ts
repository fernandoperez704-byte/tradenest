import type {
  TraderInsightInput,
  TraderInsights,
} from "./types";

/**
 * Generates actionable insights from completed trader-development analyses.
 */
export function buildTraderInsights(
  report: TraderInsightInput
): TraderInsights {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const recommendations: string[] = [];

  // 1. Trend analysis
  if (
    report.trendAnalysis.alignmentRate >= 70
  ) {
    strengths.push(
      "You are consistently trading with the market direction."
    );
  } else if (
    report.trendAnalysis.alignmentRate < 50
  ) {
    weaknesses.push(
      "Many trades are being opened against the market direction."
    );

    recommendations.push(
      "Check trend alignment before entering each trade."
    );
  }

  // 2. Stop-loss analysis
  if (
    report.stopLossAnalysis.usageRate >= 80
  ) {
    strengths.push(
      "You are using stop losses consistently."
    );
  } else if (
    report.stopLossAnalysis.usageRate < 60
  ) {
    weaknesses.push(
      "Stop losses are not being used consistently."
    );

    recommendations.push(
      "Define the maximum acceptable loss before entering each trade."
    );
  }

  // 3. Risk analysis
  if (
    report.riskAnalysis.highRiskRate >= 30
  ) {
    weaknesses.push(
      "A large portion of trades are being taken under high-risk conditions."
    );

    recommendations.push(
      "Reduce exposure on high-risk setups and use more controlled position sizing."
    );
  }

  // 4. Entry-quality analysis
  if (
    report.entryQualityAnalysis
      .poorEntryRate >= 30
  ) {
    weaknesses.push(
      "Many entries are happening under weak entry conditions."
    );

    recommendations.push(
      "Wait for stronger alignment between market direction, price location, and structure."
    );
  }

  // 5. Leverage performance
  const {
    highLeverageRate,
    highLeverageTrades,
    highLeverageLossRate,
  } = report.leverageAnalysis;

  const hasLeverageVulnerability =
    highLeverageTrades >= 2 &&
    highLeverageLossRate >= 60;

  if (hasLeverageVulnerability) {
    weaknesses.push(
      `Positions using 25x leverage or more have a ${highLeverageLossRate}% loss rate.`
    );

    recommendations.push(
      "Lower leverage to create more distance from liquidation and give the setup more room to develop."
    );
  } else if (highLeverageRate >= 30) {
    weaknesses.push(
      "High leverage is appearing frequently in futures trades."
    );

    recommendations.push(
      "Lower leverage to make position risk easier to control."
    );
  }

// 6. Timeframe performance
const weakTimeframes = Object.entries(report.timeframeAnalysis)
  .map(([timeframe, data]) => {
    const trades = data.wins + data.losses;
    const winRate = trades
      ? Math.round((data.wins / trades) * 100)
      : 0;

    return { timeframe, trades, winRate };
  })
  .filter(({ trades, winRate }) =>
    trades >= 3 && winRate <= 35
  )
  .sort((a, b) =>
    a.winRate - b.winRate ||
    b.trades - a.trades
  );

const weakest = weakTimeframes[0];

if (weakest) {
  weaknesses.push(
    `Weakest timeframe: ${weakest.timeframe} with a ${weakest.winRate}% win rate across ${weakest.trades} completed trades.`
  );

  recommendations.push(
    `Review your ${weakest.timeframe} entries and compare them with a higher timeframe before entering.`
  );
}

  return {
    strengths,
    weaknesses,
    recommendations,
  };
}