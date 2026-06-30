import type { Trade } from "../types/simulator";

type PortfolioHistoryProps = {
  marketMode: "SPOT" | "FUTURES";
  trades: Trade[];
  futuresHistory: any[];
};

export default function PortfolioHistory({
  marketMode,
  trades,
  futuresHistory,
}: PortfolioHistoryProps) {
  return (
    <div className="space-y-4 max-h-[460px] xl:max-h-[520px] overflow-y-scroll scrollbar-hide pr-2">

      {marketMode === "FUTURES" ? (
        futuresHistory.length === 0 ? (
          <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-10 text-center">
            <p className="text-2xl font-bold text-zinc-300">
              No Futures History
            </p>

            <p className="text-zinc-500 mt-2">
              Completed futures trades will appear here.
            </p>
          </div>
        ) : (
          futuresHistory.map((trade, index) => (
            <div
              key={index}
              className="bg-[#0f172a] border border-cyan-500/30 rounded-xl p-3 hover:border-cyan-500/40 transition-all duration-300"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 items-center">

                <div>
                  <p
                    className={`text-base font-black ${
                      trade.side === "LONG"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {trade.side}
                  </p>

                  <p className="text-xs text-zinc-500">
                    {trade.coin}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 text-xs">Margin</p>

                  <p className="text-sm font-bold text-white">
                    ${trade.margin}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 text-xs">Entry</p>

                  <p className="text-sm font-bold text-white">
                    ${trade.entryPrice.toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 text-xs">
                    Leverage
                  </p>

                  <p className="text-sm font-bold text-white">
                    {trade.leverage}x
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 text-xs">
                    Liquidation
                  </p>

                  <p className="text-sm font-bold text-red-400">
                    {trade.liquidationPrice != null
                      ? `$${trade.liquidationPrice.toFixed(2)}`
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 text-xs">
                    P/L
                  </p>

                  {trade.pnl !== undefined &&
                  trade.pnl !== null ? (
                    <>
                      <p
                        className={`text-sm font-bold ${
                          trade.pnl >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        ${Number(trade.pnl).toFixed(2)}
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        Gross: $
                        {Number(
                          trade.grossPnl || 0
                        ).toFixed(2)}
                      </p>

                      <p className="text-xs text-zinc-500">
                        Fees: $
                        {Number(
                          trade.totalFees || 0
                        ).toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm font-bold text-zinc-500">
                      Open
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-zinc-500 text-xs">
                    Status
                  </p>

                  <p className="text-sm font-bold text-cyan-400">
                    {trade.status || "OPENED"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-zinc-500 text-xs">
                    Time
                  </p>

                  <p className="text-sm font-bold text-white">
                    {trade.time}
                  </p>
                </div>

              </div>
            </div>
          ))
        )
      ) : (
                trades.length === 0 ? (
          <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-10 text-center">
            <p className="text-2xl font-bold text-zinc-300">
              No Spot History
            </p>

            <p className="text-zinc-500 mt-2">
              Completed spot trades will appear here.
            </p>
          </div>
        ) : (
          trades.map((trade, index) => (
            <div
              key={index}
              className="bg-[#0f172a] border border-cyan-500/30 rounded-xl p-3 hover:border-cyan-500/40 transition-all duration-300"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 items-center">

                <div>
                  <p
                    className={`text-base font-black ${
                      trade.type === "BUY"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {trade.type}
                  </p>

                  <p className="text-xs text-zinc-500">
                    {trade.coin}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 text-xs">Amount</p>

                  <p className="text-sm font-bold text-white">
                    ${trade.amount.toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 text-xs">Price</p>

                  <p className="text-sm font-bold text-white">
                    ${trade.price.toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 text-xs">Value</p>

                  <p className="text-sm font-bold text-cyan-400">
                    ${trade.amount.toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 text-xs">P/L</p>

                  {trade.type === "BUY" ? (
                    <p className="text-sm font-bold text-zinc-500">
                      Open
                    </p>
                  ) : (trade as any).pnl !== undefined &&
                    (trade as any).pnl !== null ? (
                    <>
                      <p
                        className={`text-sm font-bold ${
                          (trade as any).pnl >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        ${Number((trade as any).pnl).toFixed(2)}
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        Gross: ${Number((trade as any).grossPnl || 0).toFixed(2)}
                      </p>

                      <p className="text-xs text-zinc-500">
                        Fees: ${Number((trade as any).totalFees || 0).toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm font-bold text-zinc-500">
                      N/A
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-zinc-500 text-xs">Status</p>

                  <p
                    className={`text-sm font-bold ${
                      trade.type === "BUY"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {trade.type === "BUY" ? "OPEN" : "CLOSE"}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 text-xs">Market</p>

                  <p className="text-sm font-bold text-white">
                    Spot
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-zinc-500 text-xs">Time</p>

                  <p className="text-sm font-bold text-white">
                    {trade.time}
                  </p>
                </div>

              </div>
            </div>
          ))
        )
      )}
    </div>
  );
}