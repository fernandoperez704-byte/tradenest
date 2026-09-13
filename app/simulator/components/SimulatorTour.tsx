"use client";

type SimulatorTourProps = {
  tourStep: number | null;
  setTourStep: (step: number | null) => void;
};

export default function SimulatorTour({
  tourStep,
  setTourStep,
}: SimulatorTourProps) {
  if (tourStep === null) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/10" />

      <div className="fixed left-[270px] top-[150px] z-50 w-[360px] rounded-2xl border border-cyan-500/30 bg-[#0f172a] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.6)]">
        <p className="text-sm font-black text-cyan-400">
          Simulator Tour
        </p>

        <h3 className="mt-2 text-xl font-black text-white">
          {tourStep === 1
            ? "Watchlist"
            : tourStep === 2
            ? "Chart"
            : tourStep === 3
            ? "Order Entry"
            : tourStep === 4
            ? "Positions & History"
            : "Account Summary"}
        </h3>

<p className="mt-3 text-sm leading-6 text-zinc-300">
  {tourStep === 1
    ? "Choose the market and asset you want to practice with. Switch between Crypto Spot, Futures, and Stocks, then select or search for an asset."
    : tourStep === 2
    ? "Study live market price action using multiple timeframes, volume or RSI, moving averages, pattern recognition, support, resistance, and market structure."
    : tourStep === 3
    ? "Place risk-free practice trades using market or limit orders. Set your position size, take profit, stop loss, and leverage when practicing Futures."
    : tourStep === 4
    ? "Track your open positions, completed trade history, and pending orders. Use these records to review your decisions and trading performance."
    : "Monitor your practice account balance, portfolio value or Futures equity, margin usage, unrealized P&L, and overall return."}
</p>

        <div className="mt-5 flex justify-between">
          <button
            onClick={() => setTourStep(null)}
            className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-400 hover:text-white"
          >
            Close
          </button>

          <button
            onClick={() => {
              if (tourStep === 1) {
                setTourStep(2);
              } else if (tourStep === 2) {
                setTourStep(3);
              } else if (tourStep === 3) {
                setTourStep(4);
              } else if (tourStep === 4) {
                setTourStep(5);
              } else {
                setTourStep(null);
              }
            }}
            className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-black text-black hover:bg-cyan-400"
          >
            {tourStep === 5 ? "Done" : "Next"}
          </button>
        </div>
      </div>
    </>
  );
}