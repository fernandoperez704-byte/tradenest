"use client";
import TradeReviewChart from "./TradeReviewChart";
export type InfoPanelType = "WHITEPAPER" | "TRADE_REVIEW" | "MARKET_INFO" | "NEWS";

export type InfoPanelSection = {
  heading: string;
  body?: string;
  items?: string[];
};

export type InfoPanelContent = {
  type: InfoPanelType;
  title: string;
  subtitle?: string;
  image?: string;
  description?: string;
  sourceUrl?: string;

  sections?: InfoPanelSection[];

  data?: unknown;
};

type Props = {
  content: InfoPanelContent | null;
  onClose?: () => void;
};

export default function InfoPanel({ content, onClose }: Props) {
  

if (!content) return null;

const panelData = content.data as any;

const review =
  content.type === "TRADE_REVIEW"
    ? panelData?.review?.engine ?? panelData?.engine ?? null
    : null;

const trade =
  content.type === "TRADE_REVIEW"
    ? panelData?.trade ?? null
    : null;

const entryPrice = Number(trade?.entryPrice);


const supportLevels =
  review?.marketAtEntry?.supportLevels ??
  trade?.tradeContext?.market?.supportLevels ??
  [];

const resistanceLevels =
  review?.marketAtEntry?.resistanceLevels ??
  trade?.tradeContext?.market?.resistanceLevels ??
  [];

const savedSupport =
  supportLevels
    .filter(
      (zone: any) =>
        typeof zone?.low === "number" &&
        typeof zone?.high === "number" &&
        zone.low <= entryPrice
    )
    .sort((a: any, b: any) => b.high - a.high)[0] ??
  review?.marketAtEntry?.nearestSupport ??
  trade?.tradeContext?.market?.nearestSupport ??
  null;

const savedResistance =
  resistanceLevels
    .filter(
      (zone: any) =>
        typeof zone?.low === "number" &&
        typeof zone?.high === "number" &&
        zone.high >= entryPrice
    )
    .sort((a: any, b: any) => a.low - b.low)[0] ??
  review?.marketAtEntry?.nearestResistance ??
  trade?.tradeContext?.market?.nearestResistance ??
  null;

  return (
    <div className="mx-auto mt-3 w-full max-w-[1200px] rounded-xl border border-cyan-400/20 bg-[#0b1120] p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">Gaby Info</p>
          <h2 className="mt-1 text-lg font-bold text-white">{content.title}</h2>
          {content.subtitle && <p className="mt-1 text-sm text-zinc-400">{content.subtitle}</p>}
        </div>

        {onClose && <button type="button" onClick={onClose} className="text-sm text-zinc-400 hover:text-white">Close</button>}
      </div>

<div className="
  max-h-[500px] overflow-y-auto pr-2 xl:max-h-[560px]
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-zinc-600
  hover:[&::-webkit-scrollbar-thumb]:bg-zinc-500
">

      {content.image && (
        <div className="mt-4 overflow-hidden rounded-lg border border-white/10">
          <img src={content.image} alt={content.title} className="h-auto w-full object-contain" />
        </div>
      )}

{content.description && <p className="mt-4 text-sm leading-6 text-zinc-300">{content.description}</p>}

{content.sections && content.sections.length > 0 && (
  <div className="mt-4 space-y-4">
    {content.sections.map((section, index) => (
      <div
        key={`${section.heading}-${index}`}
        className="rounded-lg border border-white/10 bg-black/20 p-4"
      >
        <h3 className="text-sm font-bold text-white">
          {section.heading}
        </h3>

        {section.body && (
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            {section.body}
          </p>
        )}

        {section.items && section.items.length > 0 && (
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            {section.items.map((item, itemIndex) => (
              <li
                key={`${item}-${itemIndex}`}
                className="flex gap-2"
              >
                <span className="text-cyan-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
)}

{content.type === "TRADE_REVIEW" &&
  review &&
  trade &&
  trade.entryPrice != null &&
  trade.exitPrice != null &&
  trade.closedAt &&
  trade.tradeContext?.createdAt && (
    <>
      <TradeReviewChart
        coin={trade.coin}
        timeframe={review.timeframe || "1M"}
openedAt={trade.tradeContext.createdAt}
closedAt={trade.closedAt}
        entryPrice={trade.entryPrice}
        exitPrice={trade.exitPrice}
        stopLoss={trade.stopLoss}
        takeProfit={trade.takeProfit}
        trend={
          review.marketAtEntry?.marketDirection ||
          trade.tradeContext?.market?.marketDirection ||
          null
        }
      support={
  review.side === "LONG" || review.side === "BUY"
    ? savedSupport
    : null
}
resistance={
  review.side === "SHORT" || review.side === "SELL"
    ? savedResistance
    : null
}
      />

    </>
)}

{content.type === "TRADE_REVIEW" && review && (
  <div className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
    {[
      ["Mode", review.mode],
      ["Side", review.side],
      ["Result", review.result],
      ["Timeframe", review.timeframe],
      ["Entry", money(review.entryPrice)],
      ["Exit", money(review.exitPrice)],
      ["P&L", money(review.pnl)],
      ["Fees", money(review.totalFees)],
      ["Quality", review.finalQuality],
      ["Score", review.finalScore != null ? `${review.finalScore}/100` : "—"],
      ["Entry Quality", review.entryQuality],
      ["Risk", review.riskLevel],
    ].map(([label, value]) => (
      <div key={label} className="rounded-lg border border-white/10 bg-black/20 p-3">
        <p className="text-xs uppercase text-zinc-500">{label}</p>
        <p className="mt-1 font-bold text-white">{value ?? "—"}</p>
      </div>
    ))}
  </div>
)}

{content.sourceUrl && content.type === "WHITEPAPER" && (
  <>
    <iframe
      src={`${content.sourceUrl}#page=1&zoom=page-fit`}
      title={content.title}
      className="mt-4 h-[500px] w-full rounded-lg border border-white/10 xl:hidden"
    />

    <iframe
      src={`${content.sourceUrl}#page=1&zoom=135`}
      title={content.title}
      className="mt-4 hidden h-[560px] w-full rounded-lg border border-white/10 xl:block"
    />
  </>
)}
</div>

</div>
  );
}

function money(v: any) {
  return typeof v === "number"
    ? `$${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    : "—";
}