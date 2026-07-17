/**
 * Core analysis domain types
 */

export type EntryQuality =
  | "GOOD"
  | "AVERAGE"
  | "POOR";

export type RiskLevel =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export type TradeOutcome =
  | "PROFIT"
  | "WIN"
  | "LOSS"
  | "BREAKEVEN";

export type DevelopmentConfidence =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

/**
 * Shared nested structures
 */

export interface ManagementReviewData {
  available?: boolean;
  exitEfficiency?: number | null;
  givebackPercent?: number | null;
  managementQuality?: string | null;

  [key: string]: unknown;
}

export interface EntryReviewData {
  entryQuality?: EntryQuality | string | null;
  timeframe?: string | null;

  [key: string]: unknown;
}

/**
 * Saved trade-review structure
 *
 * Fields remain optional because:
 * - older Firestore reviews may not contain every field
 * - spot and futures reviews do not always share every field
 * - some values may exist inside engine, automaticReview, or tradeContext
 */

export interface TradeReview {
  id?: string;
  userId?: string;
  snapshotId?: string;

  type?: string;
  coin?: string;
  mode?: "SPOT" | "FUTURES" | string;

  result?: TradeOutcome | string;
  outcome?: TradeOutcome | string;

  pnl?: number;
  grossPnl?: number;

  entryFee?: number;
  exitFee?: number;
  totalFees?: number;

  closedReason?: string;

  entryQuality?: EntryQuality | string | null;
  riskLevel?: RiskLevel | string | null;

  leverage?: number | null;
  timeframe?: string | null;

  trendAligned?: boolean | null;

  usedStopLoss?: boolean;
  usedTakeProfit?: boolean;

  stopLoss?: number | null;
  takeProfit?: number | null;

  exitEfficiency?: number | null;
  givebackPercent?: number | null;
  managementQuality?: string | null;

  managementReview?: ManagementReviewData | null;
  management?: ManagementReviewData | null;

  tradeContext?: {
    timeframe?: string | null;
    marketDirection?: string | null;
    priceLocation?: string | null;

    entryQuality?: EntryQuality | string | null;
    riskLevel?: RiskLevel | string | null;
    trendAligned?: boolean | null;

    leverage?: number | null;

    account?: {
      marketMode?: string | null;

      [key: string]: unknown;
    } | null;

    [key: string]: unknown;
  } | null;

  tradeResult?: {
    leverage?: number | null;

    [key: string]: unknown;
  } | null;

  automaticReview?: {
    result?: TradeOutcome | string;
    outcome?: TradeOutcome | string;

    trendAligned?: boolean | null;
    riskLevel?: RiskLevel | string | null;

    usedStopLoss?: boolean;
    usedTakeProfit?: boolean;

    entryReview?: EntryReviewData | null;
    managementReview?: ManagementReviewData | null;

    [key: string]: unknown;
  } | null;

  engine?: {
    result?: TradeOutcome | string;
    outcome?: TradeOutcome | string;

    trendAligned?: boolean | null;
    riskLevel?: RiskLevel | string | null;

    leverage?: number | null;

    market?: {
      trendAligned?: boolean | null;

      [key: string]: unknown;
    } | null;

    risk?: {
      leverage?: number | null;
      riskLevel?: RiskLevel | string | null;

      [key: string]: unknown;
    } | null;

    [key: string]: unknown;
  } | null;

  marketReview?: {
    trendAligned?: boolean | null;

    [key: string]: unknown;
  } | null;

  created?: unknown;
  createdAt?: unknown;

  [key: string]: unknown;
}

export interface TraderDevelopmentInput {
  reviews: TradeReview[];
}

/**
 * Trend analysis
 */

export interface TrendAnalysisResult {
  aligned: number;
  against: number;
  alignmentRate: number;

  status:
    | "Strong Trend"
    | "Trending"
    | "Counter-Trend"
    | "Neutral";
}

/**
 * Risk analysis
 *
 * Keep these names aligned with buildRiskAnalysis.
 */

export interface RiskAnalysisResult {
  lowRisk: number;
  mediumRisk: number;
  highRisk: number;
  highRiskRate: number;

  status:
    | "Low Risk"
    | "Moderate Risk"
    | "High Risk"
    | "No Data";
}

/**
 * Stop-loss and take-profit usage
 */

export interface UsageMetrics {
  used: number;
  notUsed: number;
  usageRate: number;
}

/**
 * Entry-quality analysis
 */

export interface EntryAnalysis {
  good: number;
  average: number;
  poor: number;

  goodEntryRate: number;
  poorEntryRate: number;

  status:
    | "Excellent Entries"
    | "Good Entries"
    | "Average Entries"
    | "Poor Entries"
    | "No Data";
}

/**
 * Timeframe analysis
 */

export interface TimeframePerformance {
  trades: number;
  wins: number;
  losses: number;
}

export type TimeframeAnalysisResult = Record<
  string,
  TimeframePerformance
>;

/**
 * Leverage analysis
 */

export interface LeverageAnalysisResult {
  totalFuturesTrades: number;
  averageLeverage: number;
  highLeverageTrades: number;
  highLeverageLossRate: number;
  highLeverageRate: number;
}

/**
 * Outcome analysis
 */

export interface OutcomeMetrics {
  wins: number;
  losses: number;
  breakeven: number;
}

/**
 * Exit-management analysis
 */

export interface ExitManagementResult {
  strong: number;
  good: number;
  average: number;
  weak: number;
  total: number;

  averageExitEfficiency: number;
  positiveManagementRate: number;

  status:
    | "Strong Management"
    | "Good Management"
    | "Average Management"
    | "Weak Management"
    | "No Data";
}

/**
 * Generated insights
 */

export interface TraderInsights {
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

/**
 * Input required by buildTraderInsights.
 *
 * This avoids casting an incomplete report shell into
 * TraderDevelopmentReport.
 */

export interface TraderInsightInput {
  trendAnalysis: TrendAnalysisResult;
  riskAnalysis: RiskAnalysisResult;
  stopLossAnalysis: UsageMetrics;
  entryQualityAnalysis: EntryAnalysis;
  timeframeAnalysis: TimeframeAnalysisResult;
  leverageAnalysis: LeverageAnalysisResult;
}

/**
 * Main trader-development report
 */

export interface TraderDevelopmentReport {
  enoughData: boolean;
  currentTrades: number;
  minimumTrades: number;

  totalTrades: number;
  wins: number;
  losses: number;
  winRate: number;

  trendAnalysis: TrendAnalysisResult | null;
  riskAnalysis: RiskAnalysisResult | null;

  stopLossAnalysis: UsageMetrics | null;
  takeProfitAnalysis: UsageMetrics | null;

  entryQualityAnalysis: EntryAnalysis | null;
  exitManagementAnalysis:
    | ExitManagementResult
    | null;

  timeframeAnalysis:
    | TimeframeAnalysisResult
    | null;

  leverageAnalysis:
    | LeverageAnalysisResult
    | null;

  outcomeAnalysis: OutcomeMetrics | null;

  strengths: string[];
  weaknesses: string[];
  recommendations: string[];

  confidence: DevelopmentConfidence;

  currentFocus: {
    title: string;
    reason: string;
  };

  gabyAnalysisData: {
    primaryStrength: string | null;
    primaryWeakness: string | null;
    highestImpactFocus: string;
    summaryFacts: string[];
  };
}