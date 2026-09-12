type PortfolioTabsProps = {
  activeBottomTab: "POSITIONS" | "HISTORY" | "ORDERS";
  setActiveBottomTab: (
    tab: "POSITIONS" | "HISTORY" | "ORDERS"
  ) => void;
  marketMode: "SPOT" | "FUTURES" | "STOCKS";
};

export default function PortfolioTabs({
  activeBottomTab,
  setActiveBottomTab,
  marketMode,
}: PortfolioTabsProps) {
  return (
    <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
      <div className="grid w-full grid-cols-3 gap-2 xl:flex xl:w-auto">

        <button
          onClick={() => setActiveBottomTab("POSITIONS")}
          className={`whitespace-nowrap rounded-xl px-2 py-2.5 text-[11px] xl:px-5 xl:text-sm tracking-wide font-black transition-all duration-200 ${
            activeBottomTab === "POSITIONS"
              ? "bg-cyan-500 text-black"
              : "bg-[#18181b] text-zinc-400 border border-zinc-800 hover:text-cyan-400"
          }`}
        >
{marketMode === "FUTURES"
  ? "Futures Positions"
  : marketMode === "STOCKS"
  ? "Stock Positions"
  : "Spot Positions"}
        </button>

        <button
          onClick={() => setActiveBottomTab("HISTORY")}
          className={`whitespace-nowrap rounded-xl px-2 py-2.5 text-xs xl:px-5 xl:text-sm tracking-wide font-black transition-all duration-200 ${
            activeBottomTab === "HISTORY"
              ? "bg-cyan-500 text-black"
              : "bg-[#18181b] text-zinc-400 border border-zinc-800 hover:text-cyan-400"
          }`}
        >
{marketMode === "FUTURES"
  ? "Futures History"
  : marketMode === "STOCKS"
  ? "Stock History"
  : "Spot History"}
        </button>

        <button
          onClick={() => setActiveBottomTab("ORDERS")}
          className={`whitespace-nowrap rounded-xl px-2 py-2.5 text-sm xl:px-5 xl:text-base font-bold transition-all ${
            activeBottomTab === "ORDERS"
              ? "bg-cyan-500 text-black"
              : "bg-[#18181b] text-zinc-400 border border-white/10"
          }`}
        >
{marketMode === "FUTURES"
  ? "Futures Orders"
  : marketMode === "STOCKS"
  ? "Stock Orders"
  : "Spot Orders"}
        </button>

      </div>
    </div>
  );
}