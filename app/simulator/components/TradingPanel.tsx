import { useState } from "react";
type TradingPanelProps = {
  mobileView: "WATCHLIST" | "TRADE" | "ORDER";
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

marketMode: "SPOT" | "FUTURES" | "COINBASE_FUTURES" | "STOCKS";

selectedCoin: string;
currentPrice?: number;

leverage: number;
  setLeverage: (value: number) => void;

  showLeverageMenu: boolean;
  setShowLeverageMenu: (value: boolean) => void;

  balance: number;
  marginUsed: number;

  estimatedLongLiquidation: number | null;
  estimatedShortLiquidation: number | null;

  feeRate: number;

  message: string;

  buyCoin: () => void;
  sellCoin: () => void;
  openFuturesPosition: (side: "LONG" | "SHORT") => void;
  setPositionType: (side: "LONG" | "SHORT") => void;

  setShowResetModal: (value: boolean) => void;

  
};

export default function TradingPanel({
  mobileView,
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
marketMode,
selectedCoin,
currentPrice,
leverage,
  setLeverage,
  showLeverageMenu,
  setShowLeverageMenu,
  balance,
  marginUsed,
  estimatedLongLiquidation,
  estimatedShortLiquidation,
  feeRate,
  message,
  buyCoin,
  sellCoin,
  openFuturesPosition,
  setPositionType,
  setShowResetModal,
}: TradingPanelProps) {
const [selectedSide, setSelectedSide] = useState<"LONG" | "SHORT">("LONG");

const estimatePnl = (target: number | "") => {
  if (marketMode !== "FUTURES" || !currentPrice || !target) return null;

  const positionSize = (Number(tradeAmount) || 0) * leverage;
  const quantity = positionSize / currentPrice;
  const direction = selectedSide === "LONG" ? 1 : -1;

  return (Number(target) - currentPrice) * quantity * direction;
};

const tpPnl = estimatePnl(takeProfit);
const slPnl = estimatePnl(stopLoss);

const offshoreFeeRate =
  marketMode === "FUTURES"
    ? orderType === "MARKET"
      ? 0.0004
      : 0.0002
    : marketMode === "SPOT"
    ? orderType === "MARKET"
      ? 0.009
      : 0.005
    : feeRate;

return (
  <div
    id="mobile-order-entry"
    className={`bg-[#111827] border border-zinc-700 rounded-2xl p-4 h-fit ${
      tourStep === 3
        ? "relative z-50 ring-4 ring-cyan-400 shadow-[0_0_45px_rgba(34,211,238,0.45)]"
        : ""
    }`}
  >
<div className={`mb-4 grid grid-cols-[0.9fr_1.1fr] gap-2 xl:hidden ${
  marketMode === "FUTURES" ? "hidden" : ""
}`}>
  <button
    onClick={() => setMobileView("TRADE")}
    className="flex h-[52px] items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-3 text-sm font-black text-cyan-300 transition-all duration-200 active:scale-[0.97]"
  >
    ← Back To Chart
  </button>

  <div className="flex h-[52px] flex-col items-center justify-center rounded-xl border border-cyan-500/30 bg-[#0f172a] px-2">
    <span className="text-sm font-black text-white">
      {marketMode === "STOCKS" ? selectedCoin : `${selectedCoin}/USD`}
    </span>

    <span className="text-sm font-black text-white">
      {currentPrice == null
        ? "Loading..."
        : currentPrice >= 1000
        ? `$${currentPrice.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}`
        : currentPrice >= 1
        ? `$${currentPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 3,
          })}`
        : currentPrice >= 0.01
        ? `$${currentPrice.toLocaleString(undefined, {
            minimumFractionDigits: 3,
            maximumFractionDigits: 5,
          })}`
        : `$${currentPrice.toLocaleString(undefined, {
            minimumFractionDigits: 8,
            maximumFractionDigits: 8,
          })}`}
    </span>
  </div>
</div>

{marketMode === "FUTURES" && (
  <div className="mb-3 flex items-center gap-2">
    <button onClick={() => setMobileView("TRADE")}
      className="shrink-0 rounded-lg border border-cyan-500 px-2 py-1.5 text-xs font-black text-cyan-400 xl:hidden">
      ← Back
    </button>

    <span className="ml-auto text-sm font-black text-white">
      {selectedCoin} PERP
    </span>

    <button onClick={() => setSelectedSide("LONG")}
      className={`rounded-lg border px-3 py-1.5 text-xs font-black ${
        selectedSide === "LONG"
          ? "border-green-500 bg-green-500/10 text-green-400"
          : "border-zinc-500 text-zinc-300"
      }`}>
      LONG
    </button>

    <button onClick={() => setSelectedSide("SHORT")}
      className={`rounded-lg border px-3 py-1.5 text-xs font-black ${
        selectedSide === "SHORT"
          ? "border-red-500 bg-red-500/10 text-red-400"
          : "border-zinc-500 text-zinc-300"
      }`}>
      SHORT
    </button>
  </div>
)}

<div className={marketMode === "FUTURES" ? "grid grid-cols-2 gap-2" : "grid grid-cols-3 gap-3"}>
  <div className={marketMode === "FUTURES" ? "" : "col-span-2"}>

{marketMode === "SPOT" && (
  <p className="mb-1 text-sm font-black text-white">
    {selectedCoin}
  </p>
)}

{marketMode !== "STOCKS" && (
  <p className="mb-1 text-xs font-bold text-zinc-500">
    {marketMode === "SPOT" ? "AMOUNT (USD)" : "AMOUNT"}
  </p>
)}

<div>

  <input
    type={marketMode === "FUTURES" || marketMode === "SPOT" ? "text" : "number"}
    inputMode={marketMode === "FUTURES" || marketMode === "SPOT" ? "decimal" : undefined}
    step={marketMode === "STOCKS" ? 1 : "any"}
    value={tradeAmount}
    placeholder={
      marketMode === "STOCKS"
        ? "Enter shares"
        : marketMode === "SPOT"
        ? "Enter"
        : "Enter amount"
    }
    onChange={(e) => {
      const value = e.target.value;
      setTradeAmount(value === "" ? "" : Number(value));
    }}
className="h-[46px] w-full rounded-xl border border-zinc-700 bg-[#0f172a] px-3 text-center text-lg text-white focus:border-green-500 focus:outline-none"
  />
</div>

      </div>

    {(marketMode === "FUTURES" ||
  marketMode === "COINBASE_FUTURES") && (
<div className="relative">

{marketMode === "FUTURES" && (
  <p className="mb-1 text-xs font-bold text-zinc-500">LEVERAGE</p>
)}

<button
  type="button"
  onClick={() => setShowLeverageMenu(!showLeverageMenu)}
  className="flex h-[46px] w-full items-center justify-center gap-1 whitespace-nowrap rounded-xl border border-zinc-700 bg-[#0f172a] px-2 text-center font-bold text-cyan-400 hover:border-cyan-500"
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
      )}
    </div>

<div className="mt-3">
  <p className="mb-1 text-xs font-bold text-zinc-500">ORDER TYPE</p>

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
          setLimitPrice(e.target.value === "" ? "" : Number(e.target.value))
        }
        className="min-w-0 flex-1 rounded-xl border border-zinc-700 bg-[#0f172a] px-2 py-2 text-center text-xs text-white focus:border-orange-500 focus:outline-none"
      />
    )}
  </div>
</div>

  <div className="mt-2 grid grid-cols-4 gap-2">
{(marketMode === "STOCKS" ? [1, 5, 10] : [100, 500, 1000]).map((amount) => (
  <button
    key={amount}
    onClick={() => setTradeAmount(amount)}
    className="flex h-10 items-center justify-center rounded-lg border border-zinc-700 bg-[#0f172a] text-sm font-bold text-white transition-all hover:border-cyan-500 hover:text-cyan-400"
  >
    {marketMode === "STOCKS" ? amount : `$${amount}`}
  </button>
))}

<button
  type="button"
  onClick={() => {
    if (marketMode === "STOCKS") {
      if (!currentPrice) return;
      setTradeAmount(Math.floor(balance / currentPrice));
      return;
    }

const feeMultiplier =
  marketMode === "FUTURES" ||
  marketMode === "COINBASE_FUTURES"
    ? leverage * feeRate
    : marketMode === "SPOT"
    ? offshoreFeeRate
    : feeRate;

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
 <span className="text-zinc-500">
  {marketMode === "STOCKS"
    ? "Shares"
    : marketMode === "FUTURES"
    ? "Amount"
    : "Trade Amount"}
</span>

<span className="font-bold text-white">
  {marketMode === "STOCKS"
    ? tradeAmount || 0
    : `$${tradeAmount || 0}`}
</span>
  </div>

  <div className="mt-2 flex items-center justify-between text-sm">
    <span className="text-zinc-500">
      {marketMode === "FUTURES" || marketMode === "COINBASE_FUTURES"
  ? "Position Size"
  : "Order Value"}
    </span>

    <span className="font-bold text-cyan-400">
      ${(
  (Number(tradeAmount) || 0) *
  (marketMode === "STOCKS"
    ? currentPrice || 0
    : marketMode === "FUTURES" ||
      marketMode === "COINBASE_FUTURES"
    ? leverage
    : 1)
).toFixed(2)}
    </span>
  </div>

  {(marketMode === "FUTURES" ||
  marketMode === "COINBASE_FUTURES") && (
    <>
{marketMode !== "FUTURES" && (
  <div className="mt-2 flex items-center justify-between text-sm">
    <span className="text-zinc-500">Leverage</span>
    <span className="font-bold text-white">{leverage}x</span>
  </div>
)}

      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-zinc-500">
  {marketMode === "FUTURES" ? "Margin" : "Margin Used"}
</span>

<span className="font-bold text-orange-400">
  ${marketMode === "FUTURES"
    ? (Number(tradeAmount) || 0).toFixed(2)
    : marginUsed.toFixed(2)}
</span>
      </div>

{marketMode === "FUTURES" ? (
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
) : (
  <>
    <div className="mt-2 flex items-center justify-between text-sm">
      <span className="text-zinc-500">Est. Long Liq</span>
      <span className="font-bold text-red-400">
        {estimatedLongLiquidation != null
          ? `$${estimatedLongLiquidation.toFixed(2)}`
          : "N/A"}
      </span>
    </div>

    <div className="mt-2 flex items-center justify-between text-sm">
      <span className="text-zinc-500">Est. Short Liq</span>
      <span className="font-bold text-red-400">
        {estimatedShortLiquidation != null
          ? `$${estimatedShortLiquidation.toFixed(2)}`
          : "N/A"}
      </span>
    </div>
  </>
)}
      
    </>
  )}

  <div className="mt-2 flex items-center justify-between text-sm">
    <span className="text-zinc-500">Estimated Fee</span>

    <span className="font-bold text-zinc-300">
      ${(
  ((Number(tradeAmount) || 0) *
    (marketMode === "FUTURES" ||
 marketMode === "COINBASE_FUTURES"
? leverage
: 1) *
offshoreFeeRate)
).toFixed(2)}
    </span>
  </div>
</div>

<div className="mt-3 grid grid-cols-2 gap-2">
  <div>
    <input type="text" inputMode="decimal" placeholder="Take Profit" value={takeProfit}
      onChange={(e) => setTakeProfit(e.target.value === "" ? "" : Number(e.target.value))}
      className="w-full rounded-xl border border-zinc-700 bg-[#0f172a] px-3 py-2.5 text-center text-sm text-white focus:border-green-500 focus:outline-none" />

    {tpPnl !== null && (
      <p className={`mt-1 text-center text-xs font-bold ${tpPnl >= 0 ? "text-green-400" : "text-red-400"}`}>
        Est. P/L ${tpPnl.toFixed(2)}
      </p>
    )}
  </div>

  <div>
    <input type="text" inputMode="decimal" placeholder="Stop Loss" value={stopLoss}
      onChange={(e) => setStopLoss(e.target.value === "" ? "" : Number(e.target.value))}
      className="w-full rounded-xl border border-zinc-700 bg-[#0f172a] px-3 py-2.5 text-center text-sm text-white focus:border-red-500 focus:outline-none" />

    {slPnl !== null && (
      <p className={`mt-1 text-center text-xs font-bold ${slPnl >= 0 ? "text-green-400" : "text-red-400"}`}>
        Est. P/L ${slPnl.toFixed(2)}
      </p>
    )}
  </div>
</div>

{marketMode === "FUTURES" ? (
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
) : (
  <div className="mt-3 grid grid-cols-2 gap-2">
    <button onClick={buyCoin}
      className="rounded-xl bg-green-500 px-5 py-2 text-sm font-black text-black hover:bg-green-400">
      BUY
    </button>

    <button onClick={sellCoin}
      className="rounded-xl bg-red-500 px-5 py-2 text-sm font-black text-white hover:bg-red-400">
      SELL
    </button>
  </div>
)}

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