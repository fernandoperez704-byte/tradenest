export type TradeReviewInput = {
  mode: "SPOT" | "FUTURES";
  side: "BUY" | "SELL" | "LONG" | "SHORT";
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  grossPnl?: number;
  totalFees?: number;
  leverage?: number;
  margin?: number;
  positionSize?: number;
  stopLoss?: number | null;
  takeProfit?: number | null;
  tradeContext?: any;
};

export function reviewTrade(input: TradeReviewInput) {
  const market = input.tradeContext?.market || null;

  const result =
    input.pnl > 0
      ? "PROFIT"
      : input.pnl < 0
      ? "LOSS"
      : "BREAKEVEN";

  const usedStopLoss = input.stopLoss != null;
  const usedTakeProfit = input.takeProfit != null;

  const direction = market?.marketDirection || null;
  const priceLocation = market?.priceLocation || null;
  const entryQuality = market?.entryQuality || null;

  const tradeDirection =
    input.side === "LONG" || input.side === "BUY"
      ? "BULLISH"
      : "BEARISH";

  const trendAligned =
    direction === "BULLISH" && tradeDirection === "BULLISH"
      ? true
      : direction === "BEARISH" && tradeDirection === "BEARISH"
      ? true
      : direction === "TRANSITION"
      ? null
      : false;

  let riskLevel: "LOW" | "MEDIUM" | "HIGH" = "LOW";

  if (input.mode === "FUTURES") {
    if ((input.leverage || 1) >= 25) {
      riskLevel = "HIGH";
    } else if ((input.leverage || 1) >= 10) {
      riskLevel = "MEDIUM";
    }
  }

  let primaryStrength = "The trade had a clear recorded entry and exit.";
  let primaryWeakness = "No major weakness was detected from the saved data.";
  let mainLesson = "Keep reviewing each trade based on the facts available at entry.";

  if (trendAligned === true) {
    primaryStrength = "The trade was aligned with the market direction at entry.";
  }

  if (trendAligned === false) {
    primaryWeakness = "The trade was opened against the market direction at entry.";
    mainLesson =
      "Before entering, check whether your trade direction agrees with the market direction.";
  }

  if (!usedStopLoss) {
    primaryWeakness = "The trade did not use a stop loss.";
    mainLesson =
      "A stop loss helps define risk before entering and protects the account from uncontrolled losses.";
  }

  if (riskLevel === "HIGH") {
    primaryWeakness = "The trade used high leverage, which increased account risk.";
    mainLesson =
      "High leverage makes small price moves more dangerous, so position size and risk control matter even more.";
  }

  if (entryQuality === "POOR") {
    primaryWeakness = "The entry quality was weak based on the saved market conditions.";
    mainLesson =
      "Better entries usually come from waiting for stronger alignment between direction, location, and market structure.";
  }

  return {
    reviewVersion: "1.0",
    reviewType: "AUTOMATIC_DETERMINISTIC",

    mode: input.mode,
    side: input.side,
    result,

    entryPrice: input.entryPrice,
    exitPrice: input.exitPrice,
    pnl: input.pnl,
    grossPnl: input.grossPnl || null,
    totalFees: input.totalFees || 0,

    timeframe: market?.timeframe || null,
    marketAtEntry: market,

    trendAligned,
    priceLocation,
    entryQuality,

    usedStopLoss,
    usedTakeProfit,
    riskLevel,

    primaryStrength,
    primaryWeakness,
    mainLesson,

    reviewedAt: new Date().toISOString(),
  };
}