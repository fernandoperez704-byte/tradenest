import type {
  GabyAutoTradeDecision,
} from "./gabyAutoTrader";

export const GABY_AUTO_TRADE_SYMBOLS = [
  "BTC",
  "ETH",
  "SOL",
  "XRP",
  "DOGE",
  "ADA",
  "BNB",
  "LINK",
  "AVAX",
  "SUI",
  "HBAR",
  "LTC",
  "BCH",
  "DOT",
  "AAVE",
  "NEAR",
  "SHIB",
  "PEPE",
] as const;

export type GabyAutoTradeScannerSymbol =
  (typeof GABY_AUTO_TRADE_SYMBOLS)[number];

export type GabyAutoTradeScanResult = {
  symbol: GabyAutoTradeScannerSymbol;
  decision: GabyAutoTradeDecision;
  valid: boolean;
  entryQuality: string;
  alignment: string;
  riskRewardRatio: number | null;
  reason: string;
};

export function rankGabyAutoTradeSetups(
  results: GabyAutoTradeScanResult[]
) {
  const validResults =
    results.filter(
      (result) =>
        result.valid &&
        result.decision.action !== "NO_TRADE"
    );

  return validResults.sort((a, b) => {
    const entryQualityRank: Record<string, number> = {
      EXCELLENT: 2,
      GOOD: 1,
    };

    const alignmentRank: Record<string, number> = {
      ALIGNED: 2,
      PARTIALLY_ALIGNED: 1,
    };

    const entryDifference =
      (entryQualityRank[b.entryQuality] ?? 0) -
      (entryQualityRank[a.entryQuality] ?? 0);

    if (entryDifference !== 0) {
      return entryDifference;
    }

    const alignmentDifference =
      (alignmentRank[b.alignment] ?? 0) -
      (alignmentRank[a.alignment] ?? 0);

    if (alignmentDifference !== 0) {
      return alignmentDifference;
    }

    const riskRewardDifference =
      (b.riskRewardRatio ?? 0) -
      (a.riskRewardRatio ?? 0);

    if (riskRewardDifference !== 0) {
      return riskRewardDifference;
    }

    return (
      GABY_AUTO_TRADE_SYMBOLS.indexOf(a.symbol) -
      GABY_AUTO_TRADE_SYMBOLS.indexOf(b.symbol)
    );
  });
}