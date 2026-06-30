export type PricePoint = {
  time: string;
  price: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type AssetSymbol =
  | "BTC"
  | "ETH"
  | "SOL"
  | "XRP"
  | "DOGE";

export type Trade = {
  type: string;
  coin: AssetSymbol;
  price: number;
  amount: number;
  time: string;
  pnl?: number;
  entryFee?: number;
  exitFee?: number;
  totalFees?: number;
  grossPnl?: number;

  snapshotId?: string;
  automaticReview?: any;
  review?: any;
  closedReason?: "MANUAL" | "TP" | "SL";
  closedAt?: string;
  tradeContext?: any;
  status?: string;

  entryQuality?: string | null;
  marketDirection?: string;
  marketStructure?: string;
  nearestSupport?: any;
  nearestResistance?: any;
};

export type FuturesCloseReason =
  | "TP"
  | "SL"
  | "LIQUIDATION"
  | "MANUAL";