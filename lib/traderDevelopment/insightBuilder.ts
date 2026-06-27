export function buildTraderInsights(report: any) {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const recommendations: string[] = [];

  if (report.trendAnalysis.alignmentRate >= 70) {
    strengths.push("You are consistently trading with the market direction.");
  }

  if (report.trendAnalysis.alignmentRate < 50) {
    weaknesses.push("Many trades are being opened against the market direction.");
    recommendations.push("Focus on checking trend alignment before entering trades.");
  }

  if (report.stopLossAnalysis.usageRate >= 80) {
    strengths.push("You are using stop losses consistently.");
  }

  if (report.stopLossAnalysis.usageRate < 60) {
    weaknesses.push("Stop losses are not being used consistently.");
    recommendations.push("Define your risk before entering each trade.");
  }

  if (report.riskAnalysis.highRiskRate >= 30) {
    weaknesses.push("A large portion of trades are using high-risk conditions.");
    recommendations.push("Reduce high-risk setups and focus on controlled position sizing.");
  }

  if (report.entryQualityAnalysis.poorEntryRate >= 30) {
    weaknesses.push("Many entries are happening under weak entry conditions.");
    recommendations.push("Wait for stronger alignment between direction, location, and structure.");
  }

  if (report.leverageAnalysis.highLeverageRate >= 30) {
    weaknesses.push("High leverage is appearing frequently in futures trades.");
    recommendations.push("Lower leverage can make risk easier to manage.");
  }

  return {
    strengths,
    weaknesses,
    recommendations,
  };
}