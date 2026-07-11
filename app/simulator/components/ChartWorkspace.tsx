
import { useMemo, useState } from "react";
import { EngineSelector, EngineType } from "./EngineSelector";
import { buildTrendAnalysis } from "../../../lib/traderDevelopment/trendAnalysis";
import { buildRiskAnalysis } from "../../../lib/traderDevelopment/riskAnalysis";
import { buildEntryQualityAnalysis } from "../../../lib/traderDevelopment/entryQualityAnalysis";
import { buildExitManagementAnalysis } from "../../../lib/traderDevelopment/exitManagementAnalysis";


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
  chartInstanceRef: any;
  chartRef: any;
  setShowSimulatorGaby: (value: boolean) => void;
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
  chartInstanceRef,
  chartRef,
  setShowSimulatorGaby,
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

riskZone: (() => {
  const result = engineResults.riskZone;

  const total =
    result.lowRisk +
    result.mediumRisk +
    result.highRisk;

  if (total === 0) {
    return "No Data";
  }

  const lowRiskRate = Math.round(
    (result.lowRisk / total) * 100
  );

  const mediumRiskRate = Math.round(
    (result.mediumRisk / total) * 100
  );

  if (
    result.lowRisk >= result.mediumRisk &&
    result.lowRisk >= result.highRisk
  ) {
    return `${result.status} · ${lowRiskRate}% low risk`;
  }

  if (result.mediumRisk >= result.highRisk) {
    return `${result.status} · ${mediumRiskRate}% moderate risk`;
  }

  return `${result.status} · ${result.highRiskRate}% high risk`;
})(),

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
  return (
    <div
      className={`bg-[#0f172a] border border-zinc-700 rounded-2xl p-3 xl:p-4 h-auto xl:h-[690px] flex flex-col overflow-visible xl:overflow-hidden ${
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

      <div className="mb-3 border-b border-zinc-800 pb-3">
        <div className="flex items-end gap-4">
          <h2 className="text-2xl xl:text-3xl font-black text-white">
            {selectedCoin}/USD
          </h2>

          <p className="text-2xl xl:text-3xl font-black text-white">
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

<p className="text-xl font-extrabold leading-none text-cyan-400">
  {engineData[engineId]?.match(/\d+%/)?.[0] ?? "--"}
</p>
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

<EngineSelector
  activeEngines={activeEngines}
  onToggleEngine={handleEngineToggle}
  engineData={engineData}
/>

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
        <div ref={chartRef} className="h-[420px] w-full xl:h-[470px]" />
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