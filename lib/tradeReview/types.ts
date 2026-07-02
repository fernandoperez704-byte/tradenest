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

  management?: {
    openedAt: string;
    durationMinutes: number | null;

    highestUnrealizedPnl: number;
    lowestUnrealizedPnl: number;

    highestUnrealizedPercent: number;
    lowestUnrealizedPercent: number;

exitPercent: number;
givebackPercent: number;
exitEfficiency: number;

  } | null;

  tradeContext?: any;
};