type TradingPanelProps = {
  mobileView: "WATCHLIST" | "TRADE" | "ORDER";
  setMobileView: (view: "WATCHLIST" | "TRADE" | "ORDER") => void;
  marketMode: "SPOT" | "FUTURES";
  tradeAmount: number | "";
  setTradeAmount: (value: number | "") => void;
  leverage: number;
  setLeverage: (value: number) => void;
  showLeverageMenu: boolean;
  setShowLeverageMenu: (value: boolean) => void;
  takeProfit: number | "";
  setTakeProfit: (value: number | "") => void;
  stopLoss: number | "";
  setStopLoss: (value: number | "") => void;
  orderType: "MARKET" | "LIMIT";
  setOrderType: (value: "MARKET" | "LIMIT") => void;
  limitPrice: number | "";
  setLimitPrice: (value: number | "") => void;
  currentPrice?: number;
  selectedCoin: string;
  positionType: "LONG" | "SHORT";
  setPositionType: (value: "LONG" | "SHORT") => void;
  estimatedLongLiquidation: number | null;
  estimatedShortLiquidation: number | null;
  buyCoin: () => void;
  sellCoin: () => void;
  openFuturesPosition: (side: "LONG" | "SHORT", leverage?: number) => void;
  tourStep: number | null;
};

export default function TradingPanel({
  mobileView,
  setMobileView,
  marketMode,
  tradeAmount,
  setTradeAmount,
  leverage,
  setLeverage,
  showLeverageMenu,
  setShowLeverageMenu,
  takeProfit,
  setTakeProfit,
  stopLoss,
  setStopLoss,
  orderType,
  setOrderType,
  limitPrice,
  setLimitPrice,
  currentPrice,
  selectedCoin,
  positionType,
  setPositionType,
  estimatedLongLiquidation,
  estimatedShortLiquidation,
  buyCoin,
  sellCoin,
  openFuturesPosition,
  tourStep,
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

      {/* paste the rest of your old order-entry JSX here next */}
    </div>
  );
}