type AccountSummaryCardProps = {
  marketMode: "SPOT" | "FUTURES" | "COINBASE_FUTURES" | "STOCKS";
balance: number;

spotUnrealizedPnl: number;
stockUnrealizedPnl: number;
futuresUnrealizedPnl: number;
totalPnlPercent: number;
  tourStep: number | null;
};

export default function AccountSummaryCard({
  marketMode,
balance,

spotUnrealizedPnl,
stockUnrealizedPnl,
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
      <h2 className="text-base font-black text-white mb-2">
        Account Summary
      </h2>

      <div className="space-y-1.5 text-sm">

        <div className="flex items-center justify-between">
          <span className="text-zinc-500">Cash Balance</span>

          <span className="font-bold text-white">
            ${balance.toFixed(2)}
          </span>
        </div>


<div className="flex items-center justify-between">
  <span className="text-zinc-500">Open P/L</span>

  {(() => {
    const openPnl =
      marketMode === "SPOT"
        ? spotUnrealizedPnl
        : marketMode === "STOCKS"
        ? stockUnrealizedPnl
        : futuresUnrealizedPnl;

    return (
      <span
        className={`font-bold ${
          openPnl >= 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        ${openPnl.toFixed(2)}
      </span>
    );
  })()}
</div>

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