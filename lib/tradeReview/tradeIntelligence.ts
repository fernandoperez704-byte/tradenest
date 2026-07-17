export type TradeOutcomeResult =
  | "WIN"
  | "LOSS"
  | "BREAKEVEN";

export type TradeOutcomeReason =
  | "NET_PROFIT"
  | "NET_LOSS"
  | "FLAT_RESULT"
  | "FEES_TURNED_WIN_INTO_LOSS"
  | "FEES_REDUCED_PROFIT";

export interface BuildTradeOutcomeInput {
  pnl: number;
  grossPnl?: number | null;
  totalFees?: number | null;
}

export interface TradeOutcomeAnalysis {
  result: TradeOutcomeResult;
  reason: TradeOutcomeReason;

  netPnl: number;
  grossPnl: number;
  totalFees: number;

  lesson: string;
}

function toFiniteNumber(
  value: unknown
): number {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : 0;
}

export function buildTradeOutcome({
  pnl,
  grossPnl = 0,
  totalFees = 0,
}: BuildTradeOutcomeInput): TradeOutcomeAnalysis {
  const netPnl = toFiniteNumber(pnl);
  const gross = toFiniteNumber(grossPnl);
  const fees = Math.max(
    0,
    toFiniteNumber(totalFees)
  );

  let result: TradeOutcomeResult =
    "BREAKEVEN";

  let reason: TradeOutcomeReason =
    "FLAT_RESULT";

  if (netPnl > 0) {
    result = "WIN";

    reason =
      fees > 0
        ? "FEES_REDUCED_PROFIT"
        : "NET_PROFIT";
  } else if (netPnl < 0) {
    result = "LOSS";

    reason =
      gross > 0 &&
      fees >= gross
        ? "FEES_TURNED_WIN_INTO_LOSS"
        : "NET_LOSS";
  }

  let lesson: string;

  if (
    reason ===
    "FEES_TURNED_WIN_INTO_LOSS"
  ) {
    lesson =
      "The trade moved in your favor before fees, but trading costs exceeded the gross profit and turned the final result negative.";
  } else if (
    reason === "FEES_REDUCED_PROFIT"
  ) {
    lesson =
      "The trade finished profitable, but fees reduced the final net result.";
  } else if (result === "WIN") {
    lesson =
      "The trade finished with a positive net result.";
  } else if (result === "LOSS") {
    lesson =
      "The trade finished with a negative net result.";
  } else {
    lesson =
      "The trade finished near break-even.";
  }

  return {
    result,
    reason,
    netPnl,
    grossPnl: gross,
    totalFees: fees,
    lesson,
  };
}