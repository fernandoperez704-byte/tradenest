type PortfolioOrdersProps = {
  marketMode: "SPOT" | "FUTURES" | "COINBASE_FUTURES" | "STOCKS";
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
  marketMode === "FUTURES" || marketMode === "COINBASE_FUTURES"
    ? pendingFuturesLimitOrder
    : pendingLimitOrder;

  return (
    <div className="space-y-4 max-h-[460px] xl:max-h-[520px] overflow-y-scroll scrollbar-hide pr-2">
      {!activePendingOrder ? (
<div className="rounded-xl border border-zinc-800 bg-[#18181b] px-4 py-6 text-center">
  <p className="text-base font-bold text-zinc-300">No Open Orders</p>
  <p className="mt-1 text-sm text-zinc-500">
    Pending {marketMode === "FUTURES" || marketMode === "COINBASE_FUTURES" ? "futures" : "spot"} limit orders will appear here.
  </p>
</div>
      ) : (
        <div className="bg-[#0f172a] border border-cyan-500/30 rounded-xl p-3">
          <div className={
  marketMode === "COINBASE_FUTURES"
    ? "grid grid-cols-2 md:grid-cols-4 xl:flex xl:justify-between xl:gap-4 xl:items-start"
    : "grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 items-center"
}>

<div>
  <p className="text-base font-black text-cyan-400">LIMIT</p>
  <p className="text-xs text-zinc-500">
    {activePendingOrder.coin}
    {marketMode === "COINBASE_FUTURES" ? " PERP" : ""}
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
  <p className="text-zinc-500 text-xs">
    {marketMode === "COINBASE_FUTURES" ? "Contracts" : "Amount"}
  </p>

<p className="text-sm font-bold text-white">
  {marketMode === "COINBASE_FUTURES" ? activePendingOrder.amount : `$${activePendingOrder.amount}`}
</p>
{marketMode === "COINBASE_FUTURES" && (
  <p className="text-xs text-zinc-500">
    {activePendingOrder.contractSize ?? "—"} {activePendingOrder.coin} each
  </p>
)}

</div>

<div>
  <p className="text-zinc-500 text-xs">Market</p>
  <p className="text-sm font-bold text-white">
    {marketMode === "COINBASE_FUTURES"
      ? "Coinbase Futures"
      : activePendingOrder.mode}
  </p>
</div>

{(marketMode === "FUTURES" || marketMode === "COINBASE_FUTURES") && (
  <div>
    <p className="text-zinc-500 text-xs">Leverage</p>
    <p className="text-sm font-bold text-white">
      {activePendingOrder.leverage ?? 1}x
    </p>
  </div>
)}

            <div>
              <p className="text-zinc-500 text-xs">Status</p>
              <p className="text-sm font-bold text-orange-400">
                Pending
              </p>
            </div>

<div>
  <p className="text-zinc-500 text-xs">
    {marketMode === "COINBASE_FUTURES" ? "Notional" : "Waiting For"}
  </p>
  <p className="text-sm font-bold text-white">
    {marketMode === "COINBASE_FUTURES"
      ? `$${Number(activePendingOrder.positionSize ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
      : "Fill"}
  </p>
</div>

            <div className="flex shrink-0 justify-end">
              <button
                onClick={() => {
if (marketMode === "FUTURES" || marketMode === "COINBASE_FUTURES") {
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