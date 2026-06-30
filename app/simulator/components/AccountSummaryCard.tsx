type AccountSummaryCardProps = {
  marketMode: "SPOT" | "FUTURES";
  balance: number;
  accountEquity: number;
  marginUsed: number;
  futuresUnrealizedPnl: number;
  totalPnlPercent: number;
  tourStep: number | null;
};

export default function AccountSummaryCard({
  marketMode,
  balance,
  accountEquity,
  marginUsed,
  futuresUnrealizedPnl,
  totalPnlPercent,
  tourStep,
}: AccountSummaryCardProps) {
  return (
    <div
      className={`bg-[#111827] border border-zinc-700 rounded-2xl p-4 ${
        tourStep === 5
          ? "relative z-50 ring-4 ring-cyan-400 shadow-[0_0_45px_rgba(34,211,238,0.45)]"
          : ""
      }`}
    >
      <h2 className="text-lg font-black text-white mb-3">
        Account Summary
      </h2>

      <div className="space-y-2 text-sm">

        <div className="flex items-center justify-between">
          <span className="text-zinc-500">Cash Balance</span>

          <span className="font-bold text-white">
            ${balance.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-500">
            {marketMode === "FUTURES"
              ? "Account Equity"
              : "Portfolio Value"}
          </span>

          <span className="font-bold text-cyan-400">
            ${accountEquity.toFixed(2)}
          </span>
        </div>

        {marketMode === "FUTURES" && (
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">
              Margin Used
            </span>

            <span className="font-bold text-orange-400">
              ${marginUsed.toFixed(2)}
            </span>
          </div>
        )}

        {marketMode === "FUTURES" && (
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">
              Open P/L
            </span>

            <span
              className={`font-bold ${
                futuresUnrealizedPnl >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              ${futuresUnrealizedPnl.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-zinc-500">
            Total Return
          </span>

          <span
            className={`font-bold ${
              totalPnlPercent >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {totalPnlPercent.toFixed(2)}%
          </span>
        </div>

      </div>
    </div>
  );
}