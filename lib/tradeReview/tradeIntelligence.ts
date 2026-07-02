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

type BuildTradeOutcomeInput = {
  pnl: number;
  grossPnl?: number | null;
  totalFees?: number | null;
};

export function buildTradeOutcome({
  pnl,
  grossPnl = 0,
  totalFees = 0,
}: BuildTradeOutcomeInput) {
  const netPnl = Number(pnl || 0);
  const gross = Number(grossPnl || 0);
  const fees = Number(totalFees || 0);

  let result: TradeOutcomeResult = "BREAKEVEN";
  let reason: TradeOutcomeReason = "FLAT_RESULT";

  if (netPnl > 0) {
    result = "WIN";
    reason = fees > 0 ? "FEES_REDUCED_PROFIT" : "NET_PROFIT";
  }

  if (netPnl < 0) {
    result = "LOSS";
    reason =
      gross > 0 && fees > gross
        ? "FEES_TURNED_WIN_INTO_LOSS"
        : "NET_LOSS";
  }

  return {
    result,
    reason,
    netPnl,
    grossPnl: gross,
    totalFees: fees,
    lesson:
      reason === "FEES_TURNED_WIN_INTO_LOSS"
        ? "The trade moved in your favor before fees, but the final net result was negative because fees exceeded the gross profit."
        : reason === "FEES_REDUCED_PROFIT"
        ? "The trade was profitable, but fees reduced the final result. This is why small trades need enough movement to overcome trading costs."
        : result === "WIN"
        ? "The trade finished with a positive net result."
        : result === "LOSS"
        ? "The trade finished with a negative net result."
        : "The trade finished near break-even.",
  };
}