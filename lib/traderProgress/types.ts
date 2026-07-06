export type TradeResult = "PROFIT" | "LOSS" | "BREAK_EVEN";

export interface TraderProgressInput {
  reviews: Array<{
    id: string;
    result: TradeResult;
    pnl?: number;
    createdAt: string;
  }>;
}

export interface TraderProgressReport {
  totalTrades: number;
  firstPeriod: {
    trades: number;
    winRate: number;
  };
  recentPeriod: {
    trades: number;
    winRate: number;
  };
  improvement: {
    winRateChange: number;
  };
  strengths: string[];
  improvements: string[];
  milestones: string[];
}