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

  marketMode: "SPOT" | "FUTURES";

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
return (
  <div
    id="mobile-order-entry"
    className={`bg-[#111827] border border-zinc-700 rounded-2xl p-4 h-fit ${
      tourStep === 3
        ? "relative z-50 ring-4 ring-cyan-400 shadow-[0_0_45px_rgba(34,211,238,0.45)]"
        : ""
    }`}
  >
    <button
      onClick={() => setMobileView("TRADE")}
      className="mb-4 w-full rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm font-black text-cyan-300 xl:hidden"
    >
      ← Back To Chart
    </button>

    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-2">
        <input
          type="number"
          value={tradeAmount}
          placeholder="Enter amount"
          onChange={(e) => {
            const value = e.target.value;
            setTradeAmount(value === "" ? "" : Number(value));
          }}
          className="bg-[#0f172a] border border-zinc-700 text-white px-3 py-2.5 rounded-xl w-full text-center text-lg focus:outline-none focus:border-green-500"
        />
      </div>

      {marketMode === "FUTURES" && (
        <div className="relative">
          <button
            onClick={() => setShowLeverageMenu(!showLeverageMenu)}
            className="w-full rounded-xl border border-zinc-700 bg-[#0f172a] px-3 py-2.5 text-center font-bold text-cyan-400 hover:border-cyan-500"
          >
            {leverage}x ▼
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

<div className="mt-3 grid grid-cols-2 gap-2">
  <input
  type="number"
  placeholder="Take Profit"
  value={takeProfit}
  onChange={(e) => {
    const value = e.target.value;
    setTakeProfit(value === "" ? "" : Number(value));
  }}
  className="bg-[#0f172a] border border-zinc-700 text-white px-3 py-2.5 rounded-xl w-full text-center text-sm focus:outline-none focus:border-green-500"
/>

 <input
  type="number"
  placeholder="Stop Loss"
  value={stopLoss}
  onChange={(e) => {
    const value = e.target.value;
    setStopLoss(value === "" ? "" : Number(value));
  }}
  className="bg-[#0f172a] border border-zinc-700 text-white px-3 py-2.5 rounded-xl w-full text-center text-sm focus:outline-none focus:border-red-500"
/>
</div>

<div className="mt-2">
  <p className="mb-2 text-xs font-bold tracking-wide text-zinc-500">
    ORDER TYPE
  </p>

<div className="grid grid-cols-2 gap-2">
  {["MARKET", "LIMIT"].map((type) => (
    <button
      key={type}
      onClick={() =>
        setOrderType(type as "MARKET" | "LIMIT")
      }
      className={`rounded-lg border px-3 py-2 text-sm font-bold transition-all ${
        orderType === type
          ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
          : "border-zinc-700 bg-[#0f172a] text-zinc-400 hover:border-cyan-500 hover:text-cyan-400"
      }`}
    >
      {type}
    </button>
  ))}
</div>
</div>
{orderType === "LIMIT" && (
  <div className="mt-4">
    <input
      type="number"
      placeholder="Enter Limit Price"
      value={limitPrice}
      onChange={(e) => {
        const value = e.target.value;
        setLimitPrice(value === "" ? "" : Number(value));
      }}
      className="bg-[#0f172a] border border-zinc-700 text-white px-3 py-2.5 rounded-xl w-full text-center text-base focus:outline-none focus:border-cyan-500"
    />
  </div>
)}
  <div className="mt-2 grid grid-cols-4 gap-2">
    {[100, 500, 1000].map((amount) => (
      <button
        key={amount}
        onClick={() => setTradeAmount(amount)}
        className="flex h-10 items-center justify-center rounded-lg border border-zinc-700 bg-black text-sm font-bold text-zinc-300 transition-all hover:border-green-500 hover:text-green-400"
      >
        ${amount}
      </button>
    ))}

<button
  onClick={() => {
    const maxTradeAmount =
      balance / (1 + feeRate);

    setTradeAmount(
      Number(maxTradeAmount.toFixed(2))
    );
  }}
  className="flex h-10 items-center justify-center rounded-lg bg-orange-500 text-sm font-bold text-white hover:bg-orange-600"
>
  MAX
</button>

  </div>
<div className="mt-2 rounded-xl border border-zinc-700 bg-[#0f172a] p-2">
  <div className="flex items-center justify-between text-sm">
    <span className="text-zinc-500">Trade Amount</span>

    <span className="font-bold text-white">
      ${tradeAmount || 0}
    </span>
  </div>

  <div className="mt-2 flex items-center justify-between text-sm">
    <span className="text-zinc-500">
      {marketMode === "FUTURES" ? "Position Size" : "Order Value"}
    </span>

    <span className="font-bold text-cyan-400">
      ${((Number(tradeAmount) || 0) * (marketMode === "FUTURES" ? leverage : 1)).toFixed(2)}
    </span>
  </div>

  {marketMode === "FUTURES" && (
    <>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-zinc-500">Leverage</span>

        <span className="font-bold text-white">
          {leverage}x
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-zinc-500">Margin Used</span>

        <span className="font-bold text-orange-400">
          ${marginUsed.toFixed(2)}
        </span>
      </div>

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

  <div className="mt-2 flex items-center justify-between text-sm">
    <span className="text-zinc-500">Estimated Fee</span>

    <span className="font-bold text-zinc-300">
      ${(
  ((Number(tradeAmount) || 0) *
    (marketMode === "FUTURES" ? leverage : 1) *
    feeRate)
).toFixed(2)}
    </span>
  </div>
</div>
  <div className="mt-3 grid grid-cols-2 gap-2">
    <button
  onClick={() => {
  if (marketMode === "FUTURES") {
    setPositionType("LONG");
openFuturesPosition("LONG");
  } else {
    buyCoin();
  }
}}
      className="rounded-xl bg-green-500 px-5 py-2 text-sm font-black text-black transition-all hover:scale-[1.02] hover:bg-green-400"
    >
      {marketMode === "FUTURES" ? "LONG" : "BUY"}
    </button>

    <button
      onClick={() => {
  if (marketMode === "FUTURES") {
    setPositionType("SHORT");
openFuturesPosition("SHORT");
  } else {
    sellCoin();
  }
}}
      className="rounded-xl bg-red-500 px-5 py-2 text-sm font-black text-white transition-all hover:scale-[1.02] hover:bg-red-400"
    >
      {marketMode === "FUTURES" ? "SHORT" : "SELL"}
    </button>
  </div>

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