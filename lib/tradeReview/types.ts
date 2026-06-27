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