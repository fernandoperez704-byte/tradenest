import { useState } from "react";
import {
  buildCoinbaseFuturesPosition,
  getCoinbaseFuturesLeverageRange,
  getCoinbaseFuturesMarginDetails,
} from "../data/coinbaseFutures";
type CoinbaseFuturesTradingPanelProps = {
  mobileView: "WATCHLIST" | "TRADE" | "ORDER";
  setMobileView: (view: "WATCHLIST" | "TRADE" | "ORDER") => void;
  selectedCoin: string;
  currentPrice?: number;
  tradeAmount: number | "";
  setTradeAmount: (value: number | "") => void;
  leverage: number;
  setLeverage: (value: number) => void;
  orderType: "MARKET" | "LIMIT";
  setOrderType: (value: "MARKET" | "LIMIT") => void;
  limitPrice: number | "";
  setLimitPrice: (value: number | "") => void;
  takeProfit: number | "";
  setTakeProfit: (value: number | "") => void;
  stopLoss: number | "";
  setStopLoss: (value: number | "") => void;
  balance: number;
  bestBid: number | null;
  bestAsk: number | null;
  mid: number | null;
  message: string;
  openFuturesPosition: (side: "LONG" | "SHORT") => void;
resetAccount: () => void;
};

export default function CoinbaseFuturesTradingPanel({
  mobileView,
  setMobileView,
  selectedCoin,
  currentPrice,
  tradeAmount,
  setTradeAmount,
  leverage,
  setLeverage,
  orderType,
  setOrderType,
  limitPrice,
  setLimitPrice,
  takeProfit,
  setTakeProfit,
  stopLoss,
  setStopLoss,
  balance,
  bestBid,
  bestAsk,
  mid,
message,
openFuturesPosition,
resetAccount,
}: CoinbaseFuturesTradingPanelProps) {

const [selectedSide, setSelectedSide] =
  useState<"LONG" | "SHORT">("LONG");

const symbol = selectedCoin as Parameters<typeof getCoinbaseFuturesLeverageRange>[0];
const leverageRange = getCoinbaseFuturesLeverageRange(symbol);
const contracts = Math.max(0, Math.floor(Number(tradeAmount) || 0));
const position = currentPrice && contracts >= 1
  ? buildCoinbaseFuturesPosition(symbol, contracts, currentPrice)
  : null;
const notional = position?.positionSize ?? 0;
const {
  session: marginSession,
  effectiveLeverage,
  marginRequired,
  marginRate,
} = getCoinbaseFuturesMarginDetails(
  symbol,
  notional,
  leverage
);

const estimatedFee = notional * 0.001;
const totalRequired = marginRequired + estimatedFee;

const quantity = position?.quantity ?? 0;
const estimatePnl = (target: number | "") => {
  if (!currentPrice || !target || quantity <= 0) return null;

  const direction = selectedSide === "LONG" ? 1 : -1;
  return (Number(target) - currentPrice) * quantity * direction;
};

const tpPnl = estimatePnl(takeProfit);
const slPnl = estimatePnl(stopLoss);

  return (
    <div className="rounded-2xl border border-zinc-700 bg-[#111827] p-4">
<div className="flex items-center gap-2">
<button
  onClick={() => setMobileView("WATCHLIST")}
  className="shrink-0 rounded-lg border border-cyan-500 px-2 py-1.5 text-xs font-black text-cyan-400 md:hidden"
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
        : "border-zinc-500 text-zinc-300 hover:border-green-500 hover:text-green-400"
    }`}
  >
    LONG
  </button>

  <button
    onClick={() => setSelectedSide("SHORT")}
    className={`rounded-lg border px-3 py-1.5 text-xs font-black ${
      selectedSide === "SHORT"
        ? "border-red-500 bg-red-500/10 text-red-400"
        : "border-zinc-500 text-zinc-300 hover:border-red-500 hover:text-red-400"
    }`}
  >
    SHORT
  </button>
</div>

<div className="mt-3 grid grid-cols-2 gap-2">

<div>
  <p className="mb-1 text-xs font-bold text-zinc-500">CONTRACTS</p>
  <input
    type="text"
    inputMode="numeric"
    min="0"
    step="1"
    value={tradeAmount}
    onChange={(e) =>
      setTradeAmount(
        e.target.value === ""
          ? ""
          : Math.max(0, Math.floor(Number(e.target.value)))
      )
    }
    placeholder="0"
    className="h-[46px] w-full rounded-xl border border-zinc-700 bg-[#0f172a] px-3 text-center font-bold text-white focus:border-cyan-500 focus:outline-none"
  />
</div>

  <div>
    <p className="mb-1 text-xs font-bold text-zinc-500">LEVERAGE</p>
    <select value={effectiveLeverage} onChange={(e) => setLeverage(Number(e.target.value))}
      className="h-[46px] w-full rounded-xl border border-zinc-700 bg-[#0f172a] px-3 text-center font-bold text-cyan-400 focus:border-cyan-500 focus:outline-none">
      {Array.from({ length: leverageRange.max - leverageRange.min + 1 }, (_, i) => leverageRange.min + i)
        .map((lev) => <option key={lev} value={lev}>{lev}x</option>)}
    </select>
  </div>
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

{orderType === "LIMIT" && (
  <div className="mt-2">
    <div className="grid grid-cols-3 gap-2">
      {[["BID", bestBid], ["MID", mid], ["ASK", bestAsk]].map(([label, price]) =>
        <button key={String(label)} disabled={price == null} onClick={() => price != null && setLimitPrice(Number(price))}
          className="rounded-lg border border-zinc-700 bg-[#0f172a] py-2 text-xs font-bold text-cyan-400 disabled:opacity-40">{label}</button>
      )}
    </div>
  </div>
)}   

<div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
  {[["Best Bid", bestBid], ["Mid", mid], ["Best Ask", bestAsk]].map(([label, price]) => (
    <div key={String(label)} className="rounded-lg border border-zinc-700 bg-[#0f172a] p-2">
      <div className="text-zinc-500">{label}</div>
      <div className={`mt-1 font-bold ${label === "Best Bid" ? "text-green-400" : label === "Best Ask" ? "text-red-400" : "text-white"}`}>
  {price != null ? `$${Number(price).toLocaleString()}` : "—"}
</div>
    </div>
  ))}
</div>

<div className="mt-3 rounded-xl border border-zinc-700 bg-[#0f172a] p-3 text-sm">
  <div className="flex justify-between">
    <span className="text-zinc-500">Margin Session</span>
    <span className="font-bold text-cyan-400">
      {marginSession === "INTRADAY" ? "Intraday" : "Overnight"}
    </span>
  </div>

  <div className="mt-2 flex justify-between">
    <span className="text-zinc-500">Notional Value</span>
    <span className="font-bold text-cyan-400">
      ${notional.toFixed(2)}
    </span>
  </div>

  <div className="mt-2 flex justify-between">
    <span className="text-zinc-500">Margin Required</span>
    <span className="font-bold text-orange-400">
      ${marginRequired.toFixed(2)}
    </span>
  </div>

  <div className="mt-2 flex justify-between">
    <span className="text-zinc-500">Effective Leverage</span>
    <span className="font-bold text-white">
      {effectiveLeverage}x
    </span>
  </div>

  <div className="mt-2 flex justify-between">
    <span className="text-zinc-500">Initial Margin Rate</span>
    <span className="font-bold text-white">
      {(marginRate * 100).toFixed(0)}%
    </span>
  </div>

  <div className="mt-2 flex justify-between">
    <span className="text-zinc-500">Estimated Fee</span>
    <span className="font-bold text-white">
      ${estimatedFee.toFixed(2)}
    </span>
  </div>

  <div className="mt-2 flex justify-between border-t border-zinc-700 pt-2">
    <span className="font-bold text-zinc-300">
      Total Required
    </span>
    <span className="font-black text-cyan-400">
      ${totalRequired.toFixed(2)}
    </span>
  </div>
</div>

<div className="mt-3 grid grid-cols-2 gap-2">
  <div>
    <input type="text" inputMode="decimal" value={takeProfit} placeholder="Take Profit"
      onChange={(e) => setTakeProfit(e.target.value === "" ? "" : Number(e.target.value))}
      className="w-full rounded-xl border border-zinc-700 bg-[#0f172a] px-3 py-2.5 text-center text-sm text-white focus:border-green-500 focus:outline-none" />
    {tpPnl != null && (
      <p className={`mt-1 text-center text-xs font-bold ${tpPnl >= 0 ? "text-green-400" : "text-red-400"}`}>
        Est. P/L {tpPnl >= 0 ? "+" : ""}${tpPnl.toFixed(2)}
      </p>
    )}
  </div>

  <div>
    <input type="text" inputMode="decimal" value={stopLoss} placeholder="Stop Loss"
      onChange={(e) => setStopLoss(e.target.value === "" ? "" : Number(e.target.value))}
      className="w-full rounded-xl border border-zinc-700 bg-[#0f172a] px-3 py-2.5 text-center text-sm text-white focus:border-red-500 focus:outline-none" />
    {slPnl != null && (
      <p className={`mt-1 text-center text-xs font-bold ${slPnl >= 0 ? "text-green-400" : "text-red-400"}`}>
        Est. P/L {slPnl >= 0 ? "+" : ""}${slPnl.toFixed(2)}
      </p>
    )}
  </div>
</div>

<button
  onClick={() => openFuturesPosition(selectedSide)}
  className={`mt-3 w-full rounded-xl px-5 py-2.5 text-sm font-black ${
    selectedSide === "LONG"
      ? "bg-green-500 text-black hover:bg-green-400"
      : "bg-red-500 text-white hover:bg-red-400"
  }`}
>
  Open {selectedSide === "LONG" ? "Long" : "Short"}
</button>

<button
  onClick={resetAccount}
  className="mt-3 w-full rounded-xl border border-zinc-600 bg-zinc-800 px-4 py-2.5 text-sm font-bold text-white transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-400"
>
  Reset Practice Account
</button>

{message && (
  <p className="mt-3 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-center text-xs font-bold text-cyan-400">
    {message}
  </p>
)}





    </div>
  );
}