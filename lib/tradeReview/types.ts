/**
 * Market snapshot captured at trade entry.
 */

import type { EntryQuality } from "../gabyMarketIntelligence";

export interface TradeContext {
  marketDirection?: string | null;
  priceLocation?: string | null;
  entryQuality?: EntryQuality | null;
  riskLevel?: string | null;
  trendAligned?: boolean | null;

  momentum?: string | null;
  controlStrength?: string | null;
  marketState?: string | null;

  timeframe?: string | null;
  leverage?: number | null;

  market?: {
    marketDirection?: string | null;
    priceLocation?: string | null;
    entryQuality?: EntryQuality | null;

    momentum?: string | null;
    controlStrength?: string | null;
    marketState?: string | null;

    riskLevel?: string | null;
    trendAligned?: boolean | null;

    timeframe?: string | null;
    leverage?: number | null;

    [key: string]: unknown;
  } | null;

  account?: {
    marketMode?: "SPOT" | "FUTURES" | string;

    [key: string]: unknown;
  } | null;

  [key: string]: unknown;
}

/**
 * Position-management metrics collected while the trade was open.
 */

export interface TradeManagementData {
  openedAt: string;

  durationMinutes: number | null;

  highestUnrealizedPnl: number;
  lowestUnrealizedPnl: number;

  highestUnrealizedPercent: number;
  lowestUnrealizedPercent: number;

  exitPercent: number;
  givebackPercent: number;
  exitEfficiency: number;
}

/**
 * Input passed into reviewTrade().
 */

export interface TradeReviewInput {
  mode: "SPOT" | "FUTURES";

  side:
    | "BUY"
    | "SELL"
    | "LONG"
    | "SHORT";

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

  management?: TradeManagementData | null;

  tradeContext?: TradeContext | null;
}