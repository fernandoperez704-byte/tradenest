import { buildCoinbaseFuturesPosition, getCoinbaseFuturesLeverageRange } from "../data/coinbaseFutures";
type CoinbaseFuturesTradingPanelProps = {
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

const symbol = selectedCoin as Parameters<typeof getCoinbaseFuturesLeverageRange>[0];
const leverageRange = getCoinbaseFuturesLeverageRange(symbol);
const contracts = Math.max(0, Math.floor(Number(tradeAmount) || 0));
const position = currentPrice && contracts >= 1
  ? buildCoinbaseFuturesPosition(symbol, contracts, currentPrice)
  : null;
const notional = position?.positionSize ?? 0;
const marginRequired = leverage > 0 ? notional / leverage : 0;
const marginRate = leverage > 0 ? 1 / leverage : 0;
const estimatedFee = notional * 0.001;
const totalRequired = marginRequired + estimatedFee;

  return (
    <div className="rounded-2xl border border-zinc-700 bg-[#111827] p-4">
   <div className="flex items-center justify-between">
  <span className="text-sm font-black text-white">{selectedCoin} PERP</span>
  <span className="text-xs font-bold text-white">{leverageRange.min}x–{leverageRange.max}x</span>
</div>
 <div className="mt-3 grid grid-cols-2 gap-2">
  <div>
    <p className="mb-1 text-xs font-bold text-zinc-500">CONTRACTS</p>
<input type="number" min="0" step="1" value={tradeAmount}
  onChange={(e) => setTradeAmount(e.target.value === "" ? "" : Math.max(0, Math.floor(Number(e.target.value))))}
  placeholder="0"
      className="w-full rounded-xl border border-zinc-700 bg-[#0f172a] px-3 py-2.5 text-center font-bold text-white focus:border-cyan-500 focus:outline-none" />
  </div>

  <div>
    <p className="mb-1 text-xs font-bold text-zinc-500">LEVERAGE</p>
    <select value={leverage} onChange={(e) => setLeverage(Number(e.target.value))}
      className="w-full rounded-xl border border-zinc-700 bg-[#0f172a] px-3 py-2.5 text-center font-bold text-cyan-400 focus:border-cyan-500 focus:outline-none">
      {Array.from({ length: leverageRange.max - leverageRange.min + 1 }, (_, i) => leverageRange.min + i)
        .map((lev) => <option key={lev} value={lev}>{lev}x</option>)}
    </select>
  </div>
</div>
   <div className="mt-3"><p className="mb-1 text-xs font-bold text-zinc-500">ORDER TYPE</p><div className="grid grid-cols-2 gap-2">
{(["MARKET", "LIMIT"] as const).map((type) => <button key={type} onClick={() => setOrderType(type)} className={`rounded-lg border px-3 py-2 text-sm font-bold ${orderType === type ? "border-cyan-500 bg-cyan-500/10 text-cyan-400" : "border-zinc-700 bg-[#0f172a] text-zinc-400"}`}>{type}</button>)}</div></div>
   
{orderType === "LIMIT" && (
  <div className="mt-3">
    <input type="number" value={limitPrice} placeholder="Limit Price"
      onChange={(e) => setLimitPrice(e.target.value === "" ? "" : Number(e.target.value))}
      className="w-full rounded-xl border border-zinc-700 bg-[#0f172a] px-3 py-2.5 text-center text-white focus:border-cyan-500 focus:outline-none" />

    <div className="mt-2 grid grid-cols-3 gap-2">
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
  <div className="flex justify-between"><span className="text-zinc-500">Notional Value</span><span className="font-bold text-cyan-400">${notional.toFixed(2)}</span></div>
  <div className="mt-2 flex justify-between"><span className="text-zinc-500">Margin Required</span><span className="font-bold text-orange-400">${marginRequired.toFixed(2)}</span></div>
  <div className="mt-2 flex justify-between"><span className="text-zinc-500">Initial Margin Rate</span><span className="font-bold text-white">{(marginRate * 100).toFixed(0)}%</span></div>
<div className="mt-2 flex justify-between"><span className="text-zinc-500">Estimated Fee</span><span className="font-bold text-white">${estimatedFee.toFixed(2)}</span></div>
<div className="mt-2 flex justify-between border-t border-zinc-700 pt-2"><span className="font-bold text-zinc-300">Total Required</span><span className="font-black text-cyan-400">${totalRequired.toFixed(2)}</span></div>

</div>

<div className="mt-3 grid grid-cols-2 gap-2">
<input type="text" inputMode="decimal" value={takeProfit} placeholder="Take Profit"
  onChange={(e) => setTakeProfit(e.target.value === "" ? "" : Number(e.target.value))}
  className="rounded-xl border border-zinc-700 bg-[#0f172a] px-3 py-2.5 text-center text-sm text-white focus:border-green-500 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
  
<input type="text" inputMode="decimal" value={stopLoss} placeholder="Stop Loss"
  onChange={(e) => setStopLoss(e.target.value === "" ? "" : Number(e.target.value))}
  className="rounded-xl border border-zinc-700 bg-[#0f172a] px-3 py-2.5 text-center text-sm text-white focus:border-red-500 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
</div>

<div className="mt-3 grid grid-cols-2 gap-2">
  <button onClick={() => openFuturesPosition("LONG")}
    className="rounded-xl bg-green-500 px-5 py-2.5 text-sm font-black text-black hover:bg-green-400">LONG</button>
  <button onClick={() => openFuturesPosition("SHORT")}
    className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-black text-white hover:bg-red-400">SHORT</button>
</div>

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