export type TradeRecord = {
  userId: string;

  mode: "SPOT" | "FUTURES";

  coin: string;

  side: string;

  tradeContext: any;

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