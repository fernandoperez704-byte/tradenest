import type { AssetSymbol } from "../types/simulator";

type WatchlistPanelProps = {
  mobileView: "WATCHLIST" | "TRADE" | "ORDER";
  tourStep: number | null;

  selectedCoin: AssetSymbol;
  setSelectedCoin: (coin: AssetSymbol) => void;

  watchlist: {
  symbol: AssetSymbol;
  name: string;
  price: number | undefined;
}[];

previousPrices: Partial<Record<AssetSymbol, number>>;

searchTerm: string;
setSearchTerm: (value: string) => void;

marketMode: "SPOT" | "FUTURES";
setMarketMode: (mode: "SPOT" | "FUTURES") => void;

showMarketMenu: boolean;
setShowMarketMenu: (value: boolean) => void;

setActiveBottomTab: (
  tab: "POSITIONS" | "HISTORY" | "ORDERS"
) => void;

setMobileView: (
  view: "WATCHLIST" | "TRADE" | "ORDER"
) => void;

chartInstanceRef: React.MutableRefObject<any>;
chartRef: React.MutableRefObject<HTMLDivElement | null>;


showGabyHint: boolean;
setShowSimulatorGaby: (value: boolean) => void;

};

export default function WatchlistPanel({
  mobileView,
  tourStep,
  selectedCoin,
  setSelectedCoin,
  
  watchlist,
  previousPrices,
searchTerm,
setSearchTerm,
marketMode,
setMarketMode,
showMarketMenu,
setShowMarketMenu,
setActiveBottomTab,
setMobileView,
chartInstanceRef,
chartRef,

showGabyHint,
setShowSimulatorGaby,
}: WatchlistPanelProps) {
  return (
    <div
      className={`bg-[#111827] border border-zinc-700 rounded-2xl p-4 h-[760px] flex flex-col overflow-hidden ${
        mobileView === "WATCHLIST" ? "block" : "hidden xl:flex"
      } ${
        tourStep === 1
          ? "relative z-50 ring-4 ring-cyan-400 shadow-[0_0_45px_rgba(34,211,238,0.45)]"
          : ""
      }`}
    >
      

<div className="relative mb-4">
  <button
    onClick={() => setShowMarketMenu(!showMarketMenu)}
    className="flex w-full items-center justify-between rounded-xl border border-zinc-700 bg-[#0f172a] px-4 py-3 text-sm font-black text-white transition-all hover:border-cyan-500"
  >
    <span>
      {marketMode === "SPOT" ? "Crypto Spot" : "Crypto Futures"}
    </span>

    <span className="text-cyan-400">▼</span>
  </button>

  {showMarketMenu && (
    <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-zinc-700 bg-[#0f172a] shadow-xl">
      <button
        onClick={() => {
          setMarketMode("SPOT");
          
          setSelectedCoin("BTC");
          setActiveBottomTab("POSITIONS");
          setShowMarketMenu(false);
        }}
        className="block w-full px-4 py-3 text-left text-sm font-bold text-zinc-300 hover:bg-cyan-500/10 hover:text-cyan-400"
      >
        Crypto Spot
      </button>

      <button
        onClick={() => {
          setMarketMode("FUTURES");
          
          setSelectedCoin("BTC");
          setActiveBottomTab("POSITIONS");
          setShowMarketMenu(false);
        }}
        className="block w-full px-4 py-3 text-left text-sm font-bold text-zinc-300 hover:bg-cyan-500/10 hover:text-cyan-400"
      >
        Crypto Futures
      </button>

      <div className="border-t border-zinc-800" />

      <button
        disabled
        className="block w-full cursor-not-allowed px-4 py-3 text-left text-sm font-bold text-zinc-600"
      >
        Stocks Coming Soon
      </button>

      <button
        disabled
        className="block w-full cursor-not-allowed px-4 py-3 text-left text-sm font-bold text-zinc-600"
      >
        Options Coming Soon
      </button>
    </div>
  )}
</div>

            <div className="mb-3">
  <h2 className="text-lg font-black text-white">
    Watchlist
  </h2>
</div>
<input
  type="text"
  placeholder="Search assets..."
  value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
  className="mb-3 w-full rounded-xl border border-zinc-700 bg-[#0f172a] px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500"
/>

            <div className="space-y-2.5 mt-2 flex-1 overflow-y-scroll scrollbar-hide pr-1">
              {watchlist
.filter((coin) => {
  const search = searchTerm.toLowerCase();

  return (
    coin.symbol.toLowerCase().startsWith(search) ||
    coin.name.toLowerCase().startsWith(search)
  );
})
  .map((coin) => (
                <button
                  key={coin.symbol}
                  onClick={() => {
  setSelectedCoin(coin.symbol);

  if (window.innerWidth < 1280) {
    setMobileView("TRADE");

setTimeout(() => {
chartInstanceRef.current?.applyOptions({
  width: chartRef.current?.clientWidth || 0,
  height: window.innerWidth < 1280 ? 430 : 520,
});

  const visibleCandles = 70;

  chartInstanceRef.current?.timeScale().setVisibleLogicalRange({
from: Math.max(300 - visibleCandles, 0),
to: 305,
  });
}, 300);
  }
}}
                  className={`w-full rounded-xl border border-zinc-800 bg-[#0f172a] p-3 text-left transition-all duration-200 hover:border-cyan-500/40 hover:bg-[#111827] ${
                    selectedCoin === coin.symbol
? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
: "border-zinc-800 bg-[#0f172a] hover:bg-[#111827]"
                  }`}
                >
<div className="flex items-start justify-between">
  <div>
    <p className="text-sm font-black tracking-wide text-white">
  {coin.symbol}
</p>
    <p className="text-xs text-zinc-500">{coin.name}</p>
  </div>

<p
  className={`text-xs font-bold ${
    previousPrices[coin.symbol] && coin.price
      ? coin.price >= previousPrices[coin.symbol]!
        ? "text-emerald-400"
        : "text-red-400"
      : selectedCoin === coin.symbol
      ? "text-cyan-400"
      : "text-zinc-300"
  }`}
>
  {coin.price
    ? `$${coin.price.toLocaleString()}`
    : "Loading..."}
</p>
</div>


                </button>
              ))}


</div>

<div className="relative hidden xl:block mt-3">
  {showGabyHint && (
    <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-bounce">
      <div className="relative rounded-xl border border-amber-400 bg-amber-400 px-4 py-3 text-sm font-black text-black shadow-[0_0_25px_rgba(251,191,36,0.35)]">
        Need help?

        <div className="absolute left-1/2 top-full -translate-x-1/2">
          <div className="h-0 w-0 border-l-[10px] border-r-[10px] border-t-[12px] border-l-transparent border-r-transparent border-t-amber-400" />
        </div>
      </div>
    </div>
  )}

  <button
    onClick={() => setShowSimulatorGaby(true)}
    className="w-full rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-5 py-6 xl:px-4 xl:py-4 text-base font-black text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.18)] transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:shadow-[0_0_35px_rgba(34,211,238,0.28)]"
  >
    Ask Gaby
  </button>
</div>

</div>
  );
}