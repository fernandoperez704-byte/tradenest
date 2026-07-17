import type {
  TradeContext,
} from "./tradeReview/types";


export type TradeRecord = {
  userId: string;

  mode: "SPOT" | "FUTURES";

  coin: string;

  side: "BUY" | "SELL" | "LONG" | "SHORT";

  tradeContext: TradeContext | null;

  tradeResult: {
    entryPrice: number;
    exitPrice: number;

    pnl: number;
    grossPnl: number;

    entryFee: number;
    exitFee: number;
    totalFees: number;

    status: string;

    closedReason: string;

    closedAt: string;
  };
};