import { useState } from "react";

type OffshoreFuturesTradingPanelProps = {
  setMobileView: (view: "WATCHLIST" | "TRADE" | "ORDER") => void;
  tourStep: number | null;

  tradeAmount: number | "";
  setTradeAmount: (value: number | "") => void;

  takeProfit: number | "";
  setTakeProfit: (value: number | "") => void;

  stopLoss: number | "";
  setStopLoss: (value: number | "") => void;

  orderType: "MARKET" | "LIMIT";
  setOrderType: (value: "MARKET" | "LIMIT") => void;

  limitPrice: number | "";
  setLimitPrice: (value: number | "") => void;

  selectedCoin: string;
  currentPrice?: number;

  leverage: number;
  setLeverage: (value: number) => void;

  showLeverageMenu: boolean;
  setShowLeverageMenu: (value: boolean) => void;

  balance: number;
  estimatedLongLiquidation: number | null;
  estimatedShortLiquidation: number | null;

  feeRate: number;
  message: string;

  openFuturesPosition: (side: "LONG" | "SHORT") => void;
  setPositionType: (side: "LONG" | "SHORT") => void;

  setShowResetModal: (value: boolean) => void;
};

export default function OffshoreFuturesTradingPanel({
  setMobileView,
  tourStep,
  tradeAmount,
  setTradeAmount,
  takeProfit,
  setTakeProfit,
  stopLoss,
  setStopLoss,
  orderType,
  setOrderType,
  limitPrice,
  setLimitPrice,
  selectedCoin,
  currentPrice,
  leverage,
  setLeverage,
  showLeverageMenu,
  setShowLeverageMenu,
  balance,
  estimatedLongLiquidation,
  estimatedShortLiquidation,
  feeRate,
  message,
  openFuturesPosition,
  setPositionType,
  setShowResetModal,
}: OffshoreFuturesTradingPanelProps) {
  const [selectedSide, setSelectedSide] = useState<"LONG" | "SHORT">("LONG");

  const estimatePnl = (target: number | "") => {
    if (!currentPrice || !target) return null;

    const positionSize = (Number(tradeAmount) || 0) * leverage;
    const quantity = positionSize / currentPrice;
    const direction = selectedSide === "LONG" ? 1 : -1;

    return (Number(target) - currentPrice) * quantity * direction;
  };

  const tpPnl = estimatePnl(takeProfit);
  const slPnl = estimatePnl(stopLoss);

  const offshoreFeeRate = orderType === "MARKET" ? 0.0004 : 0.0002;

  return (
    <div
      id="mobile-order-entry"
      className={`bg-[#111827] border border-zinc-700 rounded-2xl p-4 h-fit xl:max-h-[calc(100dvh-240px)] xl:overflow-y-auto education-scrollbar ${
        tourStep === 3
          ? "relative z-50 ring-4 ring-cyan-400 shadow-[0_0_45px_rgba(34,211,238,0.45)]"
          : ""
      }`}
    >
      <div className="mb-3 flex items-center gap-2">
        <button
          onClick={() => setMobileView("TRADE")}
          className="shrink-0 rounded-lg border border-cyan-500 px-2 py-1.5 text-xs font-black text-cyan-400 xl:hidden"
        >
          ← Back
        </button>

        <span className="ml-auto text-sm font-black text-white">
          {selectedCoin} PERP
        </span>

        <button
          onClick={() => setSelectedSide("LONG")}
          className={`rounded-lg border px-3 py-1.5 text-xs font-black ${
            selectedSide === "LONG"
              ? "border-green-500 bg-green-500/10 text-green-400"
              : "border-zinc-500 text-zinc-300"
          }`}
        >
          LONG
        </button>

        <button
          onClick={() => setSelectedSide("SHORT")}
          className={`rounded-lg border px-3 py-1.5 text-xs font-black ${
            selectedSide === "SHORT"
              ? "border-red-500 bg-red-500/10 text-red-400"
              : "border-zinc-500 text-zinc-300"
          }`}
        >
          SHORT
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="mb-1 text-xs font-bold text-zinc-500">
            AMOUNT
          </p>

          <input
            type="text"
            inputMode="decimal"
            step="any"
            value={tradeAmount}
            placeholder="0"
            onChange={(e) => {
              const value = e.target.value;
              setTradeAmount(value === "" ? "" : Number(value));
            }}
            className="h-[34px] w-full rounded-xl border border-zinc-700 bg-[#0f172a] px-3 text-center text-lg text-white focus:border-green-500 focus:outline-none"
          />
        </div>

        <div className="relative">
          <p className="mb-1 text-xs font-bold text-zinc-500">
            LEVERAGE
          </p>

          <button
            type="button"
            onClick={() => setShowLeverageMenu(!showLeverageMenu)}
            className="flex h-[34px] w-full items-center justify-center gap-1 whitespace-nowrap rounded-xl border border-zinc-700 bg-[#0f172a] px-2 text-center font-bold text-cyan-400 hover:border-cyan-500"
          >
            <span className="leading-none">
              {leverage}x
            </span>

            <span className="text-xs leading-none">
              ▼
            </span>
          </button>

          {showLeverageMenu && (
            <div className="absolute left-0 top-full z-50 mt-2 h-64 w-full overflow-y-auto rounded-xl border border-zinc-700 bg-[#0f172a] scrollbar-hide">
              {Array.from({ length: 50 }, (_, i) => i + 1).map((lev) => (
                <button
                  key={lev}
                  onClick={() => {
                    setLeverage(lev);
                    setShowLeverageMenu(false);
                  }}
                  className={`block w-full px-3 py-2 text-center text-sm font-bold ${
                    leverage === lev
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "text-zinc-300 hover:bg-zinc-800"
                  }`}
                >
                  {lev}x
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-3">
        <p className="mb-1 text-xs font-bold text-zinc-500">
          ORDER TYPE
        </p>

        <div className="flex items-center gap-2">
          <div className="inline-flex shrink-0 overflow-hidden rounded-xl border border-zinc-700">
            <button
              onClick={() => setOrderType("MARKET")}
              className={`border-r border-zinc-700 px-2.5 py-2 text-xs font-bold ${
                orderType === "MARKET"
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "bg-[#0f172a] text-zinc-400"
              }`}
            >
              MARKET
            </button>

            <button
              onClick={() => setOrderType("LIMIT")}
              className={`px-2.5 py-2 text-xs font-bold ${
                orderType === "LIMIT"
                  ? "bg-orange-500/10 text-orange-400"
                  : "bg-[#0f172a] text-zinc-400"
              }`}
            >
              LIMIT
            </button>
          </div>

          {orderType === "LIMIT" && (
            <input
              type="text"
              inputMode="decimal"
              value={limitPrice}
              placeholder="Limit Price"
              onChange={(e) =>
                setLimitPrice(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className="min-w-0 flex-1 rounded-xl border border-zinc-700 bg-[#0f172a] px-2 py-2 text-center text-xs text-white focus:border-orange-500 focus:outline-none"
            />
          )}
        </div>
      </div>

      <div className="mt-2 grid grid-cols-4 gap-2">
        {[100, 500, 1000].map((amount) => (
          <button
            key={amount}
            onClick={() => setTradeAmount(amount)}
            className="flex h-10 items-center justify-center rounded-lg border border-zinc-700 bg-[#0f172a] text-sm font-bold text-white transition-all hover:border-cyan-500 hover:text-cyan-400"
          >
            ${amount}
          </button>
        ))}

        <button
          type="button"
          onClick={() => {
            const feeMultiplier = leverage * feeRate;
            const rawMax = balance / (1 + feeMultiplier);
            const safeMax = Math.floor(rawMax * 100) / 100;

            setTradeAmount(safeMax);
          }}
          className="flex h-10 items-center justify-center rounded-lg bg-orange-500 text-sm font-bold text-white hover:bg-orange-600"
        >
          MAX
        </button>
      </div>

      <div className="mt-2 rounded-xl border border-zinc-700 bg-[#0f172a] p-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-500">Amount</span>

          <span className="font-bold text-white">
            ${tradeAmount || 0}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-zinc-500">Position Size</span>

          <span className="font-bold text-cyan-400">
            ${((Number(tradeAmount) || 0) * leverage).toFixed(2)}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-zinc-500">Margin</span>

          <span className="font-bold text-orange-400">
            ${(Number(tradeAmount) || 0).toFixed(2)}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-zinc-500">Est. Liquidation</span>

          <span className="font-bold text-red-400">
            {(selectedSide === "LONG"
              ? estimatedLongLiquidation
              : estimatedShortLiquidation) != null
              ? `$${(selectedSide === "LONG"
                  ? estimatedLongLiquidation!
                  : estimatedShortLiquidation!
                ).toFixed(2)}`
              : "N/A"}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-zinc-500">Estimated Fee</span>

          <span className="font-bold text-zinc-300">
            ${(
              (Number(tradeAmount) || 0) *
              leverage *
              offshoreFeeRate
            ).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Take Profit"
            value={takeProfit}
            onChange={(e) =>
              setTakeProfit(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-zinc-700 bg-[#0f172a] px-3 py-2.5 text-center text-sm text-white focus:border-green-500 focus:outline-none"
          />

          {tpPnl !== null && (
            <p
              className={`mt-1 text-center text-xs font-bold ${
                tpPnl >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              Est. P/L ${tpPnl.toFixed(2)}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Stop Loss"
            value={stopLoss}
            onChange={(e) =>
              setStopLoss(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-zinc-700 bg-[#0f172a] px-3 py-2.5 text-center text-sm text-white focus:border-red-500 focus:outline-none"
          />

          {slPnl !== null && (
            <p
              className={`mt-1 text-center text-xs font-bold ${
                slPnl >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              Est. P/L ${slPnl.toFixed(2)}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={() => {
          setPositionType(selectedSide);
          openFuturesPosition(selectedSide);
        }}
        className={`mt-3 w-full rounded-xl px-5 py-2.5 text-sm font-black ${
          selectedSide === "LONG"
            ? "bg-green-500 text-black hover:bg-green-400"
            : "bg-red-500 text-white hover:bg-red-400"
        }`}
      >
        Open {selectedSide === "LONG" ? "Long" : "Short"}
      </button>

      <div className="mt-3 flex justify-center">
        <button
          onClick={() => setShowResetModal(true)}
          className="bg-zinc-800 text-zinc-300 px-5 py-2 rounded-xl text-sm font-bold border border-zinc-700 transition-all hover:border-red-500 hover:text-red-400"
        >
          Reset Practice Account
        </button>
      </div>

      {message && (
        <p className="mt-3 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-center text-xs font-bold text-cyan-400">
          {message}
        </p>
      )}
    </div>
  );
}