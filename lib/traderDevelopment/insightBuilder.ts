export function buildTraderInsights(report: any) {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const recommendations: string[] = [];

  // 1. Trend Analysis
  if (report.trendAnalysis?.alignmentRate >= 70) {
    strengths.push("You are consistently trading with the market direction.");
  }
  if (report.trendAnalysis?.alignmentRate < 50) {
    weaknesses.push("Many trades are being opened against the market direction.");
    recommendations.push("Focus on checking trend alignment before entering trades.");
  }

  // 2. Stop Loss Analysis
  if (report.stopLossAnalysis?.usageRate >= 80) {
    strengths.push("You are using stop losses consistently.");
  }
  if (report.stopLossAnalysis?.usageRate < 60) {
    weaknesses.push("Stop losses are not being used consistently.");
    recommendations.push("Define your risk before entering each trade.");
  }

  // 3. Risk Analysis
  if (report.riskAnalysis?.highRiskRate >= 30) {
    weaknesses.push("A large portion of trades are using high-risk conditions.");
    recommendations.push("Reduce high-risk setups and focus on controlled position sizing.");
  }

  // 4. Entry Quality Analysis
  if (report.entryQualityAnalysis?.poorEntryRate >= 30) {
    weaknesses.push("Many entries are happening under weak entry conditions.");
    recommendations.push("Wait for stronger alignment between direction, location, and structure.");
  }

// --- 5. PROGRAMMATIC BLIND SPOT: Leverage Performance Leak ---
  if (report.leverageAnalysis?.highLeverageRate >= 30) {
    weaknesses.push("High leverage is appearing frequently in futures trades.");
    recommendations.push("Lower leverage can make risk easier to manage.");
  }
  
  // Triggers a blind-spot warning if they have 2+ high leverage positions and a loss rate >= 60%
  if (
    report.leverageAnalysis?.highLeverageTrades >= 2 && 
    report.leverageAnalysis?.highLeverageLossRate >= 60
  ) {
    weaknesses.push(`Leverage Vulnerability: Positions exceeding 25x leverage have a heavy ${report.leverageAnalysis.highLeverageLossRate}% loss rate.`);
    recommendations.push("Scale down your leverage multiplier to give your liquidation boundaries and technical stop-losses room to breathe against market noise.");
  }

  // 6. PROGRAMMATIC BLIND SPOT: Timeframe Leak Extraction
  if (report.timeframeAnalysis) {
    Object.entries(report.timeframeAnalysis).forEach(([tf, data]: [string, any]) => {
      const total = data.trades || 0;
      const winRate = total === 0 ? 0 : (data.wins / total) * 100;

      // Flag a blind spot if they use a timeframe 3+ times but hit a low win rate
      if (total >= 3 && winRate <= 35) {
        weaknesses.push(`Timeframe Leak (${tf}): You are frequently trading the ${tf} chart (${total} trades), but your historical win rate on it is weak at ${winRate.toFixed(0)}%.`);
        recommendations.push(`Try executing your setups on alternative chart intervals; your historical engine data shows an inability to lock down an edge on the ${tf} view.`);
      }
    });
  }

  return {
    strengths,
    weaknesses,
    recommendations,
  };
}