type PortfolioTabsProps = {
  activeBottomTab: "POSITIONS" | "HISTORY" | "ORDERS";
  setActiveBottomTab: (
    tab: "POSITIONS" | "HISTORY" | "ORDERS"
  ) => void;
  marketMode: "SPOT" | "FUTURES";
};

export default function PortfolioTabs({
  activeBottomTab,
  setActiveBottomTab,
  marketMode,
}: PortfolioTabsProps) {
  return (
    <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
      <div className="flex gap-3">

        <button
          onClick={() => setActiveBottomTab("POSITIONS")}
          className={`rounded-xl px-6 py-3 text-sm tracking-wide font-black transition-all duration-200 ${
            activeBottomTab === "POSITIONS"
              ? "bg-cyan-500 text-black"
              : "bg-[#18181b] text-zinc-400 border border-zinc-800 hover:text-cyan-400"
          }`}
        >
          {marketMode === "FUTURES"
            ? "Futures Positions"
            : "Spot Positions"}
        </button>

        <button
          onClick={() => setActiveBottomTab("HISTORY")}
          className={`rounded-xl px-6 py-3 text-sm tracking-wide font-black transition-all duration-200 ${
            activeBottomTab === "HISTORY"
              ? "bg-cyan-500 text-black"
              : "bg-[#18181b] text-zinc-400 border border-zinc-800 hover:text-cyan-400"
          }`}
        >
          {marketMode === "FUTURES"
            ? "Futures History"
            : "Spot History"}
        </button>

        <button
          onClick={() => setActiveBottomTab("ORDERS")}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeBottomTab === "ORDERS"
              ? "bg-cyan-500 text-black"
              : "bg-[#18181b] text-zinc-400 border border-white/10"
          }`}
        >
          {marketMode === "FUTURES"
            ? "Futures Orders"
            : "Spot Orders"}
        </button>

      </div>
    </div>
  );
}