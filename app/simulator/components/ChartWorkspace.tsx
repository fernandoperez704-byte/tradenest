type ChartWorkspaceProps = {
  mobileView: "WATCHLIST" | "TRADE" | "ORDER";
  setMobileView: (view: "WATCHLIST" | "TRADE" | "ORDER") => void;
  selectedCoin: string;
  currentPrice?: number;
  marketMode: "SPOT" | "FUTURES";
  selectedTimeframe: string;
  setSelectedTimeframe: (timeframe: string) => void;
  now: Date | null;
  indicatorPanel: "VOLUME" | "RSI";
  setIndicatorPanel: (panel: "VOLUME" | "RSI") => void;
  chartInstanceRef: any;
  chartRef: any;
  setShowSimulatorGaby: (value: boolean) => void;
  tourStep: number | null;
};

export default function ChartWorkspace({
  mobileView,
  setMobileView,
  selectedCoin,
  currentPrice,
  marketMode,
  selectedTimeframe,
  setSelectedTimeframe,
  now,
  indicatorPanel,
  setIndicatorPanel,
  chartInstanceRef,
  chartRef,
  setShowSimulatorGaby,
  tourStep,
}: ChartWorkspaceProps) {

const formattedPrice =
  currentPrice == null
    ? "Loading..."
    : currentPrice >= 1000
    ? `$${currentPrice.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}`
    : currentPrice >= 1
    ? `$${currentPrice.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : `$${currentPrice.toLocaleString(undefined, {
        minimumFractionDigits: 6,
        maximumFractionDigits: 8,
      })}`;

  return (
    <div
      className={`bg-[#0f172a] border border-zinc-700 rounded-2xl p-4 xl:p-5 h-auto xl:h-[760px] flex flex-col overflow-visible xl:overflow-hidden ${
        mobileView === "TRADE" ? "flex" : "hidden xl:flex"
      } ${
        tourStep === 2
          ? "relative z-50 ring-4 ring-cyan-400 shadow-[0_0_45px_rgba(34,211,238,0.45)]"
          : ""
      }`}
    >
      <button
        onClick={() => setMobileView("WATCHLIST")}
        className="mb-4 block rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm font-black text-cyan-300 xl:hidden"
      >
        ← Back to Coins
      </button>

      <button
        onClick={() => setShowSimulatorGaby(true)}
        className="mb-4 flex w-full items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-4 text-lg font-black text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.12)] xl:hidden"
      >
        Ask Gaby
      </button>

      <div className="mb-6 border-b border-zinc-800 pb-4">
        <div className="flex items-end gap-4">
          <h2 className="text-3xl font-black text-white">
            {selectedCoin}/USD
          </h2>

          <p className="text-3xl font-black text-white">
{formattedPrice}
          </p>
        </div>

        <div className="mt-2 flex items-center gap-4">
          <p className="text-sm text-zinc-500">
            {marketMode === "SPOT" ? "Spot Market" : "Futures Market"} ·{" "}
            {selectedTimeframe}
          </p>

          <p className="text-sm text-zinc-500">
            {now ? now.toLocaleTimeString() : "--:--:--"}
          </p>
        </div>
      </div>

      <div className="mb-2 flex flex-col-reverse gap-2 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-2">
          {["1M", "5M", "15M", "1H", "4H", "1D"].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`rounded-md border px-3 py-1.5 text-xs font-bold transition-all ${
                selectedTimeframe === timeframe
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                  : "border-zinc-700 bg-[#111827] text-zinc-400 hover:border-green-500 hover:text-green-400"
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIndicatorPanel("VOLUME")}
            className={`rounded-md border px-3 py-1.5 text-xs font-black ${
              indicatorPanel === "VOLUME"
                ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                : "border-zinc-700 bg-[#111827] text-zinc-400"
            }`}
          >
            Volume
          </button>

          <button
            onClick={() => setIndicatorPanel("RSI")}
            className={`rounded-md border px-3 py-1.5 text-xs font-black ${
              indicatorPanel === "RSI"
                ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                : "border-zinc-700 bg-[#111827] text-zinc-400"
            }`}
          >
            RSI
          </button>

          <button
            onClick={() =>
              chartInstanceRef.current?.timeScale().scrollToRealTime()
            }
            className="rounded-md border px-3 py-1.5 text-xs font-bold transition-all border-zinc-700 bg-[#111827] text-zinc-400 hover:border-green-500 hover:text-green-400"
          >
            Live
          </button>
        </div>
      </div>

      <div className="mt-2 flex-1 rounded-xl overflow-hidden">
        <div ref={chartRef} className="h-[430px] w-full xl:h-[520px]" />
      </div>

      <button
        onClick={() => setMobileView("ORDER")}
        className="mt-4 flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-5 py-4 text-xl font-black text-black xl:hidden"
      >
        Trade
      </button>
    </div>
  );
}