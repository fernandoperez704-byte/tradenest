import type {
  TradeReview,
} from "@/lib/traderDevelopment/types";

export type ProgressTrend =
  | "IMPROVING"
  | "DECLINING"
  | "STABLE";

export interface TraderProgressInput {
  reviews: TradeReview[];
}

export interface ProgressPeriod {
  trades: number;

  wins: number;
  losses: number;
  breakeven: number;

  winRate: number;
  avgPnl: number;
}

export interface ProgressImprovement {
  winRateChange: number;
  pnlTrend: ProgressTrend;
}

export interface TraderProgressReport {
  totalTrades: number;

  firstPeriod: ProgressPeriod;
  recentPeriod: ProgressPeriod;

  improvement: ProgressImprovement;

  strengths: string[];
  improvements: string[];
  milestones: string[];
}