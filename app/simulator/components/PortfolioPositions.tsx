"use client";

import type { AssetSymbol } from "../types/simulator";

type PortfolioPositionsProps = {
  marketMode: "SPOT" | "FUTURES";
  positions: any;
  futuresPositions: any[];
  prices: any;
  averagePrices: any;
  spotRiskSettings: any;
  closeSpotPosition: any;
  closeFuturesPosition: any;
  setMessage: (message: string) => void;
};

export default function PortfolioPositions({
  marketMode,
  positions,
  futuresPositions,
  prices,
  averagePrices,
  spotRiskSettings,
  closeSpotPosition,
  closeFuturesPosition,
  setMessage,
}: PortfolioPositionsProps) {
  return (
    <div className="space-y-4 max-h-[460px] xl:max-h-[520px] overflow-y-scroll scrollbar-hide pr-2">

      {marketMode === "FUTURES" &&
        futuresPositions.map((position, index) => (
          <div
            key={index}
            className="bg-[#0f172a] border border-cyan-500/30 rounded-xl p-3 mb-3"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-9 gap-3 items-center">

              <div>
                <p className="text-cyan-400 text-lg font-bold">
                  {position.coin}
                </p>

                <p
                  className={`text-sm mt-1 font-bold ${
                    position.side === "LONG"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {position.side}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Entry</p>

                <p className="text-sm font-bold text-white">
                  ${position.entryPrice.toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Current</p>

                <p className="text-sm font-bold text-white">
                  {prices[position.coin as AssetSymbol]
                    ? `$${prices[position.coin as AssetSymbol]!.toFixed(2)}`
                    : "Loading..."}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">
                  Position Size
                </p>

                <p className="text-sm font-bold text-white">
                  ${(position.margin * position.leverage).toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">
                  Leverage
                </p>

                <p className="text-sm font-bold text-white">
                  {position.leverage}x
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">
                  Liquidation
                </p>

                <p className="text-sm font-bold text-red-400">
                  {position.liquidationPrice
                    ? `$${position.liquidationPrice.toFixed(2)}`
                    : "N/A"}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs font-bold uppercase">
                  Risk
                </p>

                {(() => {
                  const current =
                    prices[position.coin as AssetSymbol];

                  if (!current) {
                    return (
                      <p className="text-sm font-bold text-zinc-500">
                        Loading price...
                      </p>
                    );
                  }

                  const tpDistance =
                    position.takeProfit != null
                      ? Math.abs(position.takeProfit - current)
                      : 0;

                  const slDistance =
                    position.stopLoss != null
                      ? Math.abs(current - position.stopLoss)
                      : 0;

                  const riskReward =
                    position.takeProfit != null &&
                    position.stopLoss != null &&
                    slDistance > 0
                      ? tpDistance / slDistance
                      : 0;

                  return (
                    <>
                      <p className="text-sm font-bold text-green-400">
                        TP:{" "}
                        {position.takeProfit != null
                          ? `$${tpDistance.toFixed(2)} away`
                          : "Not set"}
                      </p>

                      <p className="mt-1 text-sm font-bold text-red-400">
                        SL:{" "}
                        {position.stopLoss != null
                          ? `$${slDistance.toFixed(2)} away`
                          : "Not set"}
                      </p>

                      <p className="mt-1 text-sm font-bold text-cyan-400">
                        R/R:{" "}
                        {riskReward > 0
                          ? riskReward.toFixed(2)
                          : "N/A"}
                      </p>
                    </>
                  );
                })()}
              </div>
                            <div>
                <p className="text-gray-400 text-xs font-bold uppercase">
                  Open P/L
                </p>

                {(() => {
                  const current =
                    prices[position.coin as AssetSymbol];

                  if (!current) {
                    return (
                      <p className="text-sm font-bold text-zinc-500">
                        Loading...
                      </p>
                    );
                  }

                  const pnl =
                    position.side === "LONG"
                      ? (current - position.entryPrice) *
                        position.quantity
                      : (position.entryPrice - current) *
                        position.quantity;

                  return (
                    <p
                      className={`text-base font-bold ${
                        pnl >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      ${pnl.toFixed(2)}
                    </p>
                  );
                })()}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => {
                    const current =
                      prices[position.coin as AssetSymbol];

                    if (!current) {
                      setMessage("Loading real market price...");
                      return;
                    }

                    closeFuturesPosition({
                      position,
                      exitPrice: current,
                      reason: "MANUAL",
                      index,
                    });

                    setMessage(
                      `Closed ${position.side} ${position.coin} manually`
                    );
                  }}
                  className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-red-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ))}

      {marketMode === "FUTURES" &&
        futuresPositions.length === 0 && (
<div className="rounded-xl border border-zinc-800 bg-[#18181b] px-4 py-6 text-center">
  <p className="text-base font-bold text-zinc-300">
    No Futures Positions
  </p>

  <p className="mt-1 text-sm text-zinc-500">
    Your open futures trades will appear here.
  </p>
</div>
        )}

      {marketMode === "SPOT" &&
        Object.entries(positions)
          .filter(([_, qty]) => Number(qty) > 0)
          .map(([coin, qty]) => {
const currentPrice =
  prices[coin as keyof typeof prices];

if (!currentPrice) return null;

const avgPrice =
  averagePrices[
    coin as keyof typeof averagePrices
  ];

const marketValue =
  Number(qty) * currentPrice;

const pnl =
  marketValue -
  Number(qty) * avgPrice;

            return (
              <div
                key={coin}
                className="bg-[#0f172a] border border-cyan-500/30 rounded-xl p-3 hover:border-cyan-500/40 transition-all duration-300"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 items-center">

                                  <div>
                    <p className="text-cyan-400 text-lg font-bold">
                      {coin}
                    </p>

                    <p className="text-gray-400 text-xs mt-1">
                      Position
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">Quantity</p>

                    <p className="text-sm font-bold text-white">
                      {Number(qty).toFixed(6)}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">Market Price</p>

                    <p className="text-sm font-bold text-white">
                      ${currentPrice.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">Market Value</p>

                    <p className="text-sm font-bold text-white">
                      ${marketValue.toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">Avg Cost</p>

                    <p className="text-sm font-bold text-white">
                      ${avgPrice.toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">
                      Unrealized P/L
                    </p>

                    <p
                      className={`text-base font-bold ${
                        pnl >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      ${pnl.toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">
                      TP / SL
                    </p>

                    {(() => {
                      const risk =
                        spotRiskSettings[
                          coin as AssetSymbol
                        ];

                      return (
                        <>
                          <p className="text-sm font-bold text-green-400">
                            TP:{" "}
                            {risk?.takeProfit != null
                              ? `$${risk.takeProfit.toFixed(2)}`
                              : "Not set"}
                          </p>

                          <p className="mt-1 text-sm font-bold text-red-400">
                            SL:{" "}
                            {risk?.stopLoss != null
                              ? `$${risk.stopLoss.toFixed(2)}`
                              : "Not set"}
                          </p>
                        </>
                      );
                    })()}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        if (!currentPrice) return;

                        closeSpotPosition({
                          coin: coin as AssetSymbol,
                          quantity: Number(qty),
                          currentPrice,
                          reason: "MANUAL",
                        });
                      }}
                      className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-red-400"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

      {marketMode === "SPOT" &&
        Object.values(positions).every(
          (qty) => Number(qty) === 0
        ) && (
          <div className="rounded-xl border border-zinc-800 bg-[#18181b] px-4 py-6 text-center">
            <p className="text-base font-bold text-zinc-300">
              No Open Positions
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Your active trades will appear here.
            </p>
          </div>
        )}
    </div>
  );
}