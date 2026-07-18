import React, { useState } from "react";
import {
  Sliders,
  Shield,
  TrendingUp,
  
  Target,
  Check,
} from "lucide-react";

export type EngineType =
  | "trendBias"
  | "riskZone"
  | "entryQuality"
  | "tradeManagement";

interface EngineSelectorProps {
  activeEngines: EngineType[];
  onToggleEngine: (engine: EngineType) => void;
  engineData: Partial<Record<EngineType, string>>;
}

const engines: {
  id: EngineType;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
{
  id: "trendBias",
  label: "Trend Bias Engine",
  description:
    "Measures how often your trades follow the overall market trend.",
  icon: TrendingUp,
},
{
  id: "riskZone",
  label: "Risk Allocation",
  description:
    "Measures how responsibly you allocate capital using exposure, margin and leverage.",
  icon: Shield,
},
{
  id: "entryQuality",
  label: "Entry Quality",
  description:
    "Measures how often your entries occur under favorable market conditions.",
  icon: Target,
},
{
  id: "tradeManagement",
  label: "Exit Management",
  description:
    "Measures how effectively you manage exits, protect profits and control losses.",
  icon: Target,
},
];

export const EngineSelector: React.FC<EngineSelectorProps> = ({
  activeEngines,
  onToggleEngine,
  engineData,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const MAX_ENGINES = 3;

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700"
      >
        <Sliders className="h-3.5 w-3.5" />

        <span>Engines</span>

        <span className="ml-1 rounded-full bg-cyan-500/20 px-1.5 py-0.5 text-[10px] font-bold text-cyan-400">
          {activeEngines.length}/{MAX_ENGINES}
        </span>
      </button>

      {isOpen && (
        <div className="fixed left-2 right-2 top-[320px] z-50 max-h-[60vh] overflow-y-auto scrollbar-hide rounded-xl border border-slate-800 bg-slate-900 p-2 shadow-2xl md:absolute md:left-auto md:right-0 md:top-full md:mt-2 md:w-72 md:max-h-none md:overflow-visible">
          {engines.map((engine) => {
            const isActive = activeEngines.includes(engine.id);

            const isDisabled =
              !isActive && activeEngines.length >= MAX_ENGINES;

            const Icon = engine.icon;

            const status = engineData[engine.id] || "No trade data";

return (
  <div
    key={engine.id}
    className="group relative mb-1 last:mb-0"
  >
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => onToggleEngine(engine.id)}
      className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors ${
        isActive
          ? "bg-cyan-500/10 text-cyan-400"
          : isDisabled
          ? "cursor-not-allowed text-slate-600 opacity-50"
          : "text-slate-300 hover:bg-slate-800"
      }`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          isActive
            ? "bg-cyan-500/15"
            : "bg-slate-800"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold">
          {engine.label}
        </p>

        <p
          className={`mt-0.5 truncate text-[11px] ${
            isActive
              ? "text-cyan-300/80"
              : "text-slate-500"
          }`}
        >
          {status}
        </p>
      </div>

      {isActive && (
        <Check className="h-4 w-4 shrink-0 text-cyan-400" />
      )}
    </button>

<div className="pointer-events-none absolute right-full top-1/2 z-[100] mr-4 hidden w-[320px] min-w-[320px] max-w-none -translate-y-1/2 whitespace-normal rounded-xl border border-cyan-500/20 bg-[#111827] p-5 opacity-0 shadow-2xl transition-opacity duration-200 lg:block lg:group-hover:opacity-100">
  <p className="text-sm font-bold text-cyan-400">
    {engine.label}
  </p>

  <p className="mt-2 text-sm leading-7 text-zinc-300">
    {engine.description}
  </p>
</div>
  </div>
);
          })}

          {activeEngines.length >= MAX_ENGINES && (
            <p className="px-3 pb-1 pt-2 text-[10px] text-slate-500">
              Remove one active engine to select another.
            </p>
          )}
        </div>
      )}
    </div>
  );
};