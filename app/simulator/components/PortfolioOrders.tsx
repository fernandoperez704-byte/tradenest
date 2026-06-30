type PortfolioOrdersProps = {
  marketMode: "SPOT" | "FUTURES";
  pendingLimitOrder: any;
  pendingFuturesLimitOrder: any;
  setPendingLimitOrder: React.Dispatch<React.SetStateAction<any>>;
  setPendingFuturesLimitOrder: React.Dispatch<React.SetStateAction<any>>;
  setMessage: (message: string) => void;
};

export default function PortfolioOrders({
  marketMode,
  pendingLimitOrder,
  pendingFuturesLimitOrder,
  setPendingLimitOrder,
  setPendingFuturesLimitOrder,
  setMessage,
}: PortfolioOrdersProps) {
  const activePendingOrder =
    marketMode === "FUTURES"
      ? pendingFuturesLimitOrder
      : pendingLimitOrder;

  return (
    <div className="space-y-4 max-h-[460px] xl:max-h-[520px] overflow-y-scroll scrollbar-hide pr-2">
      {!activePendingOrder ? (
        <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-10 text-center">
          <p className="text-2xl font-bold text-zinc-300">
            No Open Orders
          </p>

          <p className="text-zinc-500 mt-2">
            Pending {marketMode === "FUTURES" ? "futures" : "spot"} limit
            orders will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-[#0f172a] border border-cyan-500/30 rounded-xl p-3">
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 items-center">
            <div>
              <p className="text-base font-black text-cyan-400">LIMIT</p>
              <p className="text-xs text-zinc-500">
                {activePendingOrder.coin}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-xs">Side</p>
              <p className="text-sm font-bold text-white">
                {activePendingOrder.side}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-xs">Limit Price</p>
              <p className="text-sm font-bold text-cyan-400">
                ${activePendingOrder.limitPrice.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-xs">Amount</p>
              <p className="text-sm font-bold text-white">
                ${activePendingOrder.amount}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-xs">Market</p>
              <p className="text-sm font-bold text-white">
                {activePendingOrder.mode}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-xs">Status</p>
              <p className="text-sm font-bold text-orange-400">
                Pending
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-xs">Waiting For</p>
              <p className="text-sm font-bold text-white">Fill</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  if (marketMode === "FUTURES") {
                    setPendingFuturesLimitOrder(null);
                  } else {
                    setPendingLimitOrder(null);
                  }

                  setMessage("Limit order canceled.");
                }}
                className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400 transition-all hover:bg-red-500/20"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}