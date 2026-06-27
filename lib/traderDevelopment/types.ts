export type TraderDevelopmentInput = {
  reviews: any[];
};

export type TraderDevelopmentReport = {
  totalTrades: number;

  wins: number;

  losses: number;

  winRate: number;

  trendAnalysis: {
    aligned: number;
    against: number;
    alignmentRate: number;
  };

  riskAnalysis: {
    lowRisk: number;
    mediumRisk: number;
    highRisk: number;
    highRiskRate: number;
  };

stopLossAnalysis: {
  used: number;
  notUsed: number;
  usageRate: number;
};

takeProfitAnalysis: {
  used: number;
  notUsed: number;
  usageRate: number;
};

entryQualityAnalysis: {
  good: number;
  average: number;
  poor: number;
  goodEntryRate: number;
  poorEntryRate: number;
};

timeframeAnalysis: Record<
  string,
  {
    trades: number;
    wins: number;
    losses: number;
  }
>;

leverageAnalysis: {
  totalFuturesTrades: number;
  averageLeverage: number;
  highLeverageTrades: number;
  highLeverageRate: number;
};

outcomeAnalysis: {
  profit: number;
  loss: number;
  breakeven: number;
  profitRate: number;
  lossRate: number;
};

  strengths: string[];

  weaknesses: string[];

  recommendations: string[];
};