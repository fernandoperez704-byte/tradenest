
import { useMemo, useState } from "react";
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
  selectedCoin: string;
  currentPrice?: number;
  marketMode: "SPOT" | "FUTURES";
  selectedTimeframe: string;
  setSelectedTimeframe: (timeframe: string) => void;
  now: Date | null;
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
  selectedCoin,
  currentPrice,
  marketMode,
  selectedTimeframe,
  setSelectedTimeframe,
  now,
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
        minimumFractionDigits: 6,
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

<div className="mb-3 grid grid-cols-2 gap-2 xl:hidden">
  <button
    onClick={() => setMobileView("WATCHLIST")}
    className="flex h-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-3 text-sm font-black text-cyan-300"
  >
    ← Back
  </button>

  <button
    onClick={() => setShowSimulatorGaby(true)}
    className="flex h-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-3 text-sm font-black text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
  >
    Ask Gaby
  </button>
</div>

<div className="mb-2 border-b border-zinc-800 pb-2">
  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 className="text-xl font-black text-white sm:text-2xl xl:text-3xl">
            {selectedCoin}/USD
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

      <button
        onClick={() => setMobileView("ORDER")}
        className="mt-4 flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-5 py-4 text-xl font-black text-black xl:hidden"
      >
        Trade
      </button>
    </div>
  );
}