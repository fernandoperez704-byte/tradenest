export type TraderProgressInput = {
  reviews: any[];
};

export type TraderProgressReport = {
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
};