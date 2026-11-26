type StockTradingPanelProps = {
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

  balance: number;
  message: string;

  buyCoin: () => void;
  sellCoin: () => void;

  setShowResetModal: (value: boolean) => void;
};

export default function StockTradingPanel({
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
  balance,
  message,
  buyCoin,
  sellCoin,
  setShowResetModal,
}: StockTradingPanelProps) {
  return (
    <div
      id="mobile-order-entry"
      className={`bg-[#111827] border border-zinc-700 rounded-2xl p-4 h-fit xl:max-h-[calc(100dvh-240px)] xl:overflow-y-auto education-scrollbar ${
        tourStep === 3
          ? "relative z-50 ring-4 ring-cyan-400 shadow-[0_0_45px_rgba(34,211,238,0.45)]"
          : ""
      }`}
    >
      <div className="mb-4 grid grid-cols-[0.9fr_1.1fr] gap-2 xl:hidden">
        <button
          onClick={() => setMobileView("TRADE")}
          className="flex h-[52px] items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-3 text-sm font-black text-cyan-300 transition-all duration-200 active:scale-[0.97]"
        >
          ← Back To Chart
        </button>

        <div className="flex h-[52px] flex-col items-center justify-center rounded-xl border border-cyan-500/30 bg-[#0f172a] px-2">
          <span className="text-sm font-black text-white">
            {selectedCoin}
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

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <div>
            <input
              type="number"
              step={1}
              value={tradeAmount}
              placeholder="Enter shares"
              onChange={(e) => {
                const value = e.target.value;
                setTradeAmount(value === "" ? "" : Number(value));
              }}
              className="h-[34px] w-full rounded-xl border border-zinc-700 bg-[#0f172a] px-3 text-center text-lg text-white focus:border-green-500 focus:outline-none"
            />
          </div>
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
        {[1, 5, 10].map((amount) => (
          <button
            key={amount}
            onClick={() => setTradeAmount(amount)}
            className="flex h-10 items-center justify-center rounded-lg border border-zinc-700 bg-[#0f172a] text-sm font-bold text-white transition-all hover:border-cyan-500 hover:text-cyan-400"
          >
            {amount}
          </button>
        ))}

        <button
          type="button"
          onClick={() => {
            if (!currentPrice) return;

            setTradeAmount(Math.floor(balance / currentPrice));
          }}
          className="flex h-10 items-center justify-center rounded-lg bg-orange-500 text-sm font-bold text-white hover:bg-orange-600"
        >
          MAX
        </button>
      </div>

      <div className="mt-2 rounded-xl border border-zinc-700 bg-[#0f172a] p-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-500">Shares</span>

          <span className="font-bold text-white">
            {tradeAmount || 0}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-zinc-500">Order Value</span>

          <span className="font-bold text-cyan-400">
            ${(
              (Number(tradeAmount) || 0) *
              (currentPrice || 0)
            ).toFixed(2)}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-zinc-500">Estimated Fee</span>

          <span className="font-bold text-zinc-300">
            $0.00
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
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          onClick={buyCoin}
          className="rounded-xl bg-green-500 px-5 py-2 text-sm font-black text-black hover:bg-green-400"
        >
          BUY
        </button>

        <button
          onClick={sellCoin}
          className="rounded-xl bg-red-500 px-5 py-2 text-sm font-black text-white hover:bg-red-400"
        >
          SELL
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