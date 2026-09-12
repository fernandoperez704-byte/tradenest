
import { useEffect, useMemo, useState } from "react";
import { EngineSelector, EngineType } from "./EngineSelector";
import { buildTrendAnalysis } from "../../../lib/traderDevelopment/trendAnalysis";
import { buildRiskAnalysis } from "../../../lib/traderDevelopment/riskAnalysis";
import { buildEntryQualityAnalysis } from "../../../lib/traderDevelopment/entryQualityAnalysis";
import { buildExitManagementAnalysis } from "../../../lib/traderDevelopment/exitManagementAnalysis";
import type { DetectedPattern } from "@/lib/patternRecognition";
import type { GabyChartHighlight } from "../types/gabyChartHighlight";
import PatternOverlay from "./PatternOverlay";
import GabyChartOverlay from "./GabyChartOverlay";

type ChartWorkspaceProps = {
  reviews: any[];
  mobileView: "WATCHLIST" | "TRADE" | "ORDER";
  setMobileView: (view: "WATCHLIST" | "TRADE" | "ORDER") => void;

  searchTerm: string;
  setSearchTerm: (value: string) => void;

watchlist: {
  symbol: string;
  name: string;
  price: number | undefined;
}[];

setSelectedCoin: (coin: any) => void;

  selectedCoin: string;
  currentPrice?: number;
  marketMode: "SPOT" | "FUTURES" | "STOCKS";
  selectedTimeframe: string;
  setSelectedTimeframe: (timeframe: string) => void;
  now: Date | null;
stockMarketOpen: boolean;
stockNextOpen: string | null;
indicatorPanel: "VOLUME" | "RSI";
setIndicatorPanel: (panel: "VOLUME" | "RSI") => void;

patternRecognitionEnabled: boolean;
setPatternRecognitionEnabled: (value: boolean) => void;
strongestPattern: DetectedPattern | null;

chartInstanceRef: any;
candleSeriesRef: any;
chartRef: any;
setShowSimulatorGaby: (value: boolean) => void;
gabyChartHighlights: GabyChartHighlight[];
tourStep: number | null;
};

export default function ChartWorkspace({
  reviews,
  mobileView,
  setMobileView,
searchTerm,
setSearchTerm,
watchlist,
setSelectedCoin,
selectedCoin,
  currentPrice,
  marketMode,
selectedTimeframe,
setSelectedTimeframe,
now,
stockMarketOpen,
stockNextOpen,
indicatorPanel,
setIndicatorPanel,
patternRecognitionEnabled,
setPatternRecognitionEnabled,
strongestPattern,
chartInstanceRef,
candleSeriesRef,
chartRef,
setShowSimulatorGaby,
gabyChartHighlights,
tourStep,
}: ChartWorkspaceProps) {

const [activeEngines, setActiveEngines] = useState<EngineType[]>([]);

const [stockOpenCountdown, setStockOpenCountdown] = useState("");

useEffect(() => {
  if (
    marketMode !== "STOCKS" ||
    stockMarketOpen ||
    !stockNextOpen
  ) {
    setStockOpenCountdown("");
    return;
  }

  const updateCountdown = () => {
    const nextOpenTime = new Date(stockNextOpen).getTime();
    const difference = nextOpenTime - Date.now();

    if (difference <= 0) {
      setStockOpenCountdown("");
      return;
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (days > 0) {
      setStockOpenCountdown(`${days}d ${hours}h ${minutes}m`);
    } else if (hours > 0) {
      setStockOpenCountdown(`${hours}h ${minutes}m ${seconds}s`);
    } else {
      setStockOpenCountdown(`${minutes}m ${seconds}s`);
    }
  };

  updateCountdown();

  const interval = window.setInterval(updateCountdown, 1000);

  return () => window.clearInterval(interval);
}, [marketMode, stockMarketOpen, stockNextOpen]);

const normalizedReviews = useMemo(() => {
  return (reviews || []).map((item) => {
    const savedReview =
      item?.review ??
      item?.automaticReview ??
      item;

    return {
      ...savedReview,

      mode:
        item?.mode ??
        savedReview?.mode ??
        item?.tradeContext?.account?.marketMode ??
        null,

      coin:
        item?.coin ??
        savedReview?.coin ??
        item?.tradeContext?.market?.coin ??
        savedReview?.tradeContext?.market?.coin ??
        null,

      leverage:
        item?.leverage ??
        savedReview?.leverage ??
        savedReview?.engine?.risk?.leverage ??
        1,

      margin:
        item?.margin ??
        savedReview?.margin ??
        savedReview?.engine?.risk?.margin ??
        0,

      positionSize:
        item?.positionSize ??
        savedReview?.positionSize ??
        savedReview?.engine?.risk?.positionSize ??
        0,

      balanceAtEntry:
        item?.balanceAtEntry ??
        savedReview?.balanceAtEntry ??
        item?.tradeContext?.account?.balanceAtEntry ??
        savedReview?.tradeContext?.account?.balanceAtEntry ??
        0,

      amount:
        item?.amount ??
        savedReview?.amount ??
        item?.tradeResult?.amount ??
        0,

      tradeContext:
        item?.tradeContext ??
        savedReview?.tradeContext ??
        null,

      managementReview:
        savedReview?.managementReview ??
        savedReview?.management ??
        savedReview?.engine?.management ??
        item?.management ??
        null,
    };
  });
}, [reviews]);

const engineResults = useMemo(() => {
  return {
    trendBias: buildTrendAnalysis(normalizedReviews),
    riskZone: buildRiskAnalysis(normalizedReviews),
    entryQuality: buildEntryQualityAnalysis(normalizedReviews),
    tradeManagement:
      buildExitManagementAnalysis(normalizedReviews),
  };
}, [normalizedReviews]);

const engineData: Partial<Record<EngineType, string>> = {
  trendBias:
    engineResults.trendBias.aligned +
      engineResults.trendBias.against ===
    0
      ? "No Data"
      : `${engineResults.trendBias.status} · ${engineResults.trendBias.alignmentRate}% aligned`,

riskZone:
  engineResults.riskZone.lowRisk +
    engineResults.riskZone.mediumRisk +
    engineResults.riskZone.highRisk ===
  0
    ? "No Data"
    : `${engineResults.riskZone.status} · ${engineResults.riskZone.highRiskRate}% high risk`,

  entryQuality:
    engineResults.entryQuality.good +
      engineResults.entryQuality.average +
      engineResults.entryQuality.poor ===
    0
      ? "No Data"
      : `${engineResults.entryQuality.status} · ${engineResults.entryQuality.goodEntryRate}% good`,

  tradeManagement:
    engineResults.tradeManagement.total === 0
      ? "No Data"
      : `${engineResults.tradeManagement.status} · ${engineResults.tradeManagement.averageExitEfficiency}% efficiency`,
};

  const handleEngineToggle = (engine: EngineType) => {
    setActiveEngines((prev) => {
      if (prev.includes(engine)) return prev.filter((e) => e !== engine);
      if (prev.length >= 3) return prev;
      return [...prev, engine];
    });
  };

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
  })}`;


function getEnginePercentColor(
  engineId: EngineType,
  value: number
) {
  if (engineId === "riskZone") {
    if (value >= 60) return "text-red-400";
    if (value >= 30) return "text-yellow-400";
    return "text-green-400";
  }

  if (value >= 70) return "text-green-400";
  if (value >= 40) return "text-yellow-400";
  return "text-red-400";
}

function formatPatternName(
  patternType: DetectedPattern["type"]
) {
  switch (patternType) {
    case "DOUBLE_BOTTOM":
      return "Double Bottom";

    case "DOUBLE_TOP":
      return "Double Top";

    case "HEAD_AND_SHOULDERS":
      return "Head and Shoulders";

    case "INVERSE_HEAD_AND_SHOULDERS":
      return "Inverse Head and Shoulders";

    case "BULL_FLAG":
      return "Bull Flag";

    case "BEAR_FLAG":
      return "Bear Flag";

    default:
      return patternType;
  }
}

return (
  <div
    className={`min-w-0 w-full bg-[#0f172a] border border-zinc-700 rounded-xl p-2 xl:rounded-2xl xl:p-4 h-auto xl:h-[690px] flex flex-col overflow-visible xl:overflow-hidden ${
      mobileView === "TRADE" ? "flex" : "hidden xl:flex"
    } ${
      tourStep === 2
        ? "relative z-50 ring-4 ring-cyan-400 shadow-[0_0_45px_rgba(34,211,238,0.45)]"
        : ""
    }`}
  >

<div className="mb-3 grid grid-cols-[0.9fr_1.1fr] gap-2 xl:hidden">
  <button
    onClick={() => setMobileView("WATCHLIST")}
    className="flex h-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-3 text-sm font-black text-cyan-300"
  >
    ← Back
  </button>

  <div className="relative">
    <input
      type="text"
      placeholder="Search assets..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="h-11 w-full min-w-0 rounded-xl border border-cyan-500/40 bg-[#0f172a] px-3 text-sm text-white placeholder:text-zinc-500 shadow-[0_0_14px_rgba(34,211,238,0.10)] transition-all duration-200 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)] focus:border-cyan-400 focus:shadow-[0_0_24px_rgba(34,211,238,0.28)] focus:outline-none"
    />

    {searchTerm.trim() !== "" && (
      <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-56 overflow-y-auto scrollbar-hide rounded-xl border border-zinc-700 bg-[#0f172a] shadow-xl">
        {watchlist
          .filter((coin) => {
            const search = searchTerm.toLowerCase();

            return (
              coin.symbol.toLowerCase().startsWith(search) ||
              coin.name.toLowerCase().startsWith(search)
            );
          })
          .slice(0, 6)
          .map((coin) => (
            <button
              key={coin.symbol}
              onClick={() => {
                setSelectedCoin(coin.symbol);
                setSearchTerm("");
              }}
              className="block w-full border-b border-zinc-800 px-3 py-2.5 text-left last:border-b-0 hover:bg-cyan-500/10"
            >
              <p className="text-sm font-black text-white">
                {coin.symbol}
              </p>

              <p className="text-xs text-zinc-500">
                {coin.name}
              </p>
            </button>
          ))}
      </div>
    )}
  </div>
</div>

<div className="mb-2 border-b border-zinc-800 pb-2">
  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
<h2 className="text-xl font-black text-white sm:text-2xl xl:text-3xl">
  {marketMode === "STOCKS" ? selectedCoin : `${selectedCoin}/USD`}
</h2>

<p className="text-xl font-black text-white sm:text-2xl xl:text-3xl">
  {formattedPrice}
</p>

{activeEngines.length > 0 && (
  <div className="ml-auto hidden flex-wrap justify-end gap-1.5 xl:flex">
    {activeEngines.map((engineId) => (
      <div
        key={engineId}
        className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 min-w-[110px]"
      >
<p className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500">
  {engineId === "trendBias"
    ? "Trend Bias"
    : engineId === "riskZone"
    ? "Risk Allocation"
    : engineId === "entryQuality"
    ? "Entry Quality"
    : "Exit Management"}
</p>

{(() => {
  const percentText =
    engineData[engineId]?.match(/\d+%/)?.[0] ?? "--";

  const percentValue =
    percentText === "--"
      ? 0
      : Number(percentText.replace("%", ""));

  return (
    <p
      className={`text-xl font-extrabold leading-none ${getEnginePercentColor(
        engineId,
        percentValue
      )}`}
    >
      {percentText}
    </p>
  );
})()}

      </div>
    ))}
  </div>
)}

        </div>

<div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
  <p className="text-sm text-zinc-500">
    {marketMode === "STOCKS"
      ? "US Stock Market"
      : marketMode === "SPOT"
      ? "Spot Market"
      : "Futures Market"}{" "}
    · {selectedTimeframe}
  </p>

  {marketMode === "STOCKS" && (
    <div className="flex items-center gap-2">
      <span
        className={`text-xs font-bold ${
          stockMarketOpen ? "text-green-400" : "text-red-400"
        }`}
      >
        {stockMarketOpen ? "MARKET OPEN" : "MARKET CLOSED"}
      </span>

      {!stockMarketOpen && stockOpenCountdown && (
        <span className="text-xs text-zinc-500">
          Opens in {stockOpenCountdown}
        </span>
      )}
    </div>
  )}

  <p className="text-sm text-zinc-500">
    {now ? now.toLocaleTimeString() : "--:--:--"}
  </p>
</div>

      </div>

      <div className="mb-1.5 flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-2">
          {["1M", "5M", "15M", "1H", "4H", "1D"].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`rounded-md border px-2.5 py-1.5 sm:px-3 text-xs font-bold transition-all ${
                selectedTimeframe === timeframe
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                  : "border-zinc-700 bg-[#111827] text-zinc-400 hover:border-green-500 hover:text-green-400"
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">

<EngineSelector
  activeEngines={activeEngines}
  onToggleEngine={handleEngineToggle}
  engineData={engineData}
/>

<button
  onClick={() =>
    setPatternRecognitionEnabled(
      !patternRecognitionEnabled
    )
  }
  title="Pattern Recognition (Beta)"
  className={`rounded-md border px-2.5 py-1.5 sm:px-3 text-xs font-black transition-all ${
    patternRecognitionEnabled
      ? "border-green-500 bg-green-500/15 text-green-400"
      : "border-zinc-700 bg-[#111827] text-zinc-400 hover:border-green-500 hover:text-green-400"
  }`}
>
  PAT BETA
</button>

{patternRecognitionEnabled && strongestPattern && (
  <div
    className={`hidden items-center rounded-md border px-2.5 py-1.5 text-xs font-bold xl:flex ${
      strongestPattern.direction === "BULLISH"
        ? "border-green-500/40 bg-green-500/10 text-green-400"
        : strongestPattern.direction === "BEARISH"
        ? "border-red-500/40 bg-red-500/10 text-red-400"
        : "border-yellow-500/40 bg-yellow-500/10 text-yellow-400"
    }`}
  >
    {formatPatternName(strongestPattern.type)}
    {" · "}
    {strongestPattern.status === "CONFIRMED"
      ? "Confirmed"
      : "Forming"}
    {" · "}
    {strongestPattern.confidence}%
  </div>
)}

{patternRecognitionEnabled && !strongestPattern && (
  <div className="hidden items-center rounded-md border border-zinc-700 bg-[#111827] px-2.5 py-1.5 text-xs font-bold text-zinc-500 xl:flex">
    No pattern
  </div>
)}

<button
  onClick={() => setIndicatorPanel("VOLUME")}
  title="Volume"
  className={`rounded-md border px-2.5 py-1.5 sm:px-3 text-xs font-black ${
    indicatorPanel === "VOLUME"
      ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
      : "border-zinc-700 bg-[#111827] text-zinc-400"
  }`}
>
  <span className="sm:hidden">VOL</span>
  <span className="hidden sm:inline">Volume</span>
</button>

          <button
            onClick={() => setIndicatorPanel("RSI")}
            className={`rounded-md border px-2.5 py-1.5 sm:px-3 text-xs font-black ${
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
            className="rounded-md border px-2.5 py-1.5 sm:px-3 text-xs font-bold transition-all border-zinc-700 bg-[#111827] text-zinc-400 hover:border-green-500 hover:text-green-400"
          >
            Live
          </button>
        </div>
      </div>

<div className="relative mt-2 flex-1 rounded-xl overflow-hidden">

  <div
    ref={chartRef}
    className="h-[420px] w-full xl:h-[470px]"
  />

<GabyChartOverlay
  highlights={gabyChartHighlights}
  candleSeriesRef={candleSeriesRef}
  chartContainerRef={chartRef}
  chartInstanceRef={chartInstanceRef}
/>

  <PatternOverlay
    pattern={
      patternRecognitionEnabled
        ? strongestPattern
        : null
    }
    chartInstanceRef={chartInstanceRef}
    candleSeriesRef={candleSeriesRef}
    chartContainerRef={chartRef}
  />

</div>

<div className="mt-4 grid grid-cols-2 gap-2 xl:hidden">
  <button
    onClick={() => setMobileView("ORDER")}
    className="flex h-[52px] items-center justify-center rounded-2xl bg-cyan-500 px-4 text-xl font-black text-black shadow-[0_0_18px_rgba(6,182,212,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-[0_0_28px_rgba(6,182,212,0.45)] active:translate-y-0 active:scale-[0.97] active:bg-cyan-600"
  >
    Trade
  </button>

  <button
    onClick={() => setShowSimulatorGaby(true)}
    className="flex h-[52px] items-center justify-center rounded-2xl border border-cyan-500/40 bg-cyan-500/10 px-4 text-lg font-black text-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_26px_rgba(34,211,238,0.28)] active:translate-y-0 active:scale-[0.97] active:bg-cyan-500/25"
  >
    Ask Gaby
  </button>
</div>

    </div>
  );
}