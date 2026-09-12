"use client";

type Props = { data: any };

export default function TraderDevelopmentReport({ data }: Props) {

  const reviews = data?.reviews ?? [];
  const engines = data?.engines ?? {};

const getTradeDate = (trade: any) => {
  const raw = trade?.createdAt ?? trade?.closedAt ?? trade?.time ?? null;
  if (!raw) return null;
  if (typeof raw?.toDate === "function") return raw.toDate();
  if (typeof raw?.seconds === "number") return new Date(raw.seconds * 1000);
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date;
};

const trades = [...reviews].sort(
  (a: any, b: any) =>
    (getTradeDate(a)?.getTime() ?? 0) - (getTradeDate(b)?.getTime() ?? 0)
);

  const total = trades.length;
  const wins = trades.filter((t: any) => ["PROFIT", "WIN"].includes(String(t.result ?? t.outcome).toUpperCase())).length;
  const losses = trades.filter((t: any) => String(t.result ?? t.outcome).toUpperCase() === "LOSS").length;
  const winRate = total ? (wins / total) * 100 : 0;

  const modeStats = ["SPOT", "FUTURES", "STOCKS"].map((mode) => {
    const items = trades.filter((t: any) => String(t.mode ?? t.engine?.mode ?? "").toUpperCase() === mode);
    const modeWins = items.filter((t: any) => ["PROFIT", "WIN"].includes(String(t.result ?? t.outcome).toUpperCase())).length;

    return {
      mode,
      trades: items.length,
      winRate: items.length ? (modeWins / items.length) * 100 : 0,
      pnl: items.reduce((sum: number, t: any) => sum + (Number(t.pnl) || 0), 0),
    };
  });

const monthlyStats = Object.values(
  trades.reduce((acc: Record<string, any>, trade: any) => {
    const date = getTradeDate(trade);
    if (!date) return acc;

    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    acc[key] ??= {
      key,
      label: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      trades: 0, wins: 0, losses: 0, pnl: 0,
    };

    acc[key].trades++;

    const result = String(trade.result ?? trade.outcome ?? "").toUpperCase();
    if (result === "PROFIT" || result === "WIN") acc[key].wins++;
    if (result === "LOSS") acc[key].losses++;

    acc[key].pnl += Number(trade.pnl) || 0;
    return acc;
  }, {})
).map((item: any) => ({
  ...item,
  winRate: item.trades ? (item.wins / item.trades) * 100 : 0,
}));

const rankedMonths = monthlyStats.filter((m: any) => m.trades > 0);
const bestMonth = rankedMonths.length ? rankedMonths.reduce((a: any, b: any) => b.pnl > a.pnl ? b : a) : null;
const worstMonth = rankedMonths.length ? rankedMonths.reduce((a: any, b: any) => b.pnl < a.pnl ? b : a) : null;

const dailyStats = Object.values(trades.reduce((acc: Record<string, any>, trade: any) => {
  const date = getTradeDate(trade);
  if (!date) return acc;

  const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  acc[key] ??= { label: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), trades: 0, pnl: 0 };
  acc[key].trades++;
  acc[key].pnl += Number(trade.pnl) || 0;
  return acc;
}, {})) as any[];

const bestDay = dailyStats.length ? dailyStats.reduce((a, b) => b.pnl > a.pnl ? b : a) : null;
const worstDay = dailyStats.length ? dailyStats.reduce((a, b) => b.pnl < a.pnl ? b : a) : null;

  const timeframeStats = ["1M", "5M", "15M", "1H", "4H", "1D"].map((timeframe) => {
    const stats = engines.timeframe?.[timeframe];

return {
  timeframe,
  trades: stats?.trades ?? 0,
  wins: stats?.wins ?? 0,
  losses: stats?.losses ?? 0,
  winRate: stats?.trades ? (stats.wins / stats.trades) * 100 : 0,
};

  });

  const engineStats = [
    ["Trend Bias", engines.trendBias?.alignmentRate, engines.trendBias?.status],
    ["Risk Allocation", engines.riskAllocation?.highRiskRate, engines.riskAllocation?.status],
    ["Entry Location", engines.entryQuality?.goodEntryRate, engines.entryQuality?.status],
    ["Exit Management", engines.exitManagement?.averageExitEfficiency, engines.exitManagement?.status],
  ];

const winRateColor = (rate: number, trades: number) =>
  !trades ? "text-zinc-400" : rate >= 50 ? "text-emerald-400" : rate >= 30 ? "text-zinc-300" : "text-red-400";

const pnlColor = (value: number) =>
  value > 0 ? "text-emerald-400" : value < 0 ? "text-red-400" : "text-zinc-400";

const engineColor = (status?: string) => {
  const value = String(status ?? "").toUpperCase();

  if (
    value.includes("STRONG") ||
    value.includes("GOOD") ||
    value.includes("LOW RISK")
  ) {
    return "text-emerald-400";
  }

  if (
    value.includes("COUNTER") ||
    value.includes("HIGH RISK") ||
    value.includes("WEAK") ||
    value.includes("POOR")
  ) {
    return "text-red-400";
  }

  return "text-zinc-300";
};

  let cumulative = 0;
  const pnl = trades.map((t: any, i: number) => ({
    x: i,
    y: cumulative += Number(t.pnl) || 0,
  }));

const values = pnl.map((p) => p.y);
const min = Math.min(0, ...values);
const max = Math.max(0, ...values);
const range = max - min || 1;

const chart = {
  width: 1300,
  height: 260,
  left: 55,
  right: 5,
  top: 20,
  bottom: 40,
};

const plotWidth = chart.width - chart.left - chart.right;
const plotHeight = chart.height - chart.top - chart.bottom;

const getX = (index: number) =>
  chart.left + (pnl.length <= 1 ? plotWidth / 2 : (index / (pnl.length - 1)) * plotWidth);

const getY = (value: number) =>
  chart.top + ((max - value) / range) * plotHeight;

const points = pnl.map((p) => `${getX(p.x)},${getY(p.y)}`).join(" ");

const yTicks = Array.from({ length: 5 }, (_, i) => max - (range / 4) * i);

const xTicks = total
  ? Array.from(new Set([0, Math.floor((total - 1) * 0.25), Math.floor((total - 1) * 0.5), Math.floor((total - 1) * 0.75), total - 1]))
  : [];

  return (

    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
        {[
          ["Total Trades", total],
          ["Wins", wins],
          ["Losses", losses],
          ["Win Rate", total ? `${winRate.toFixed(1)}%` : "—"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-black/20 p-3">
            <p className="text-xs uppercase text-zinc-500">{label}</p>
            <p
  className={`mt-1 font-bold ${
    label === "Wins"
      ? "text-emerald-400"
      : label === "Losses"
      ? "text-red-400"
      : label === "Win Rate"
      ? winRateColor(winRate, total)
      : "text-cyan-400"
  }`}
>
  {value}
</p>
          </div>
        ))}
      </div>
<div className="grid gap-3 lg:grid-cols-[1.7fr_1fr]">
<div className="rounded-lg border border-white/10 bg-black/20 p-4">
  <h3 className="text-sm font-bold text-white">Monthly Performance</h3>

  <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
    <div className="rounded-lg border border-white/10 bg-[#0b1120] p-3">
      <p className="text-xs text-zinc-500">Best Month</p>
      <p className="mt-1 font-bold text-emerald-400">{bestMonth?.label ?? "—"}</p>
      <p className={`mt-1 text-sm font-bold ${pnlColor(bestMonth?.pnl ?? 0)}`}>
        {bestMonth ? `$${bestMonth.pnl.toFixed(2)}` : "—"}
      </p>
      <p className="mt-1 text-xs text-zinc-500">
        {bestMonth ? `${bestMonth.trades} trades • ${bestMonth.wins} wins` : "No data"}
      </p>
    </div>

    <div className="rounded-lg border border-white/10 bg-[#0b1120] p-3">
      <p className="text-xs text-zinc-500">Worst Month</p>
      <p className="mt-1 font-bold text-red-400">{worstMonth?.label ?? "—"}</p>
      <p className={`mt-1 text-sm font-bold ${pnlColor(worstMonth?.pnl ?? 0)}`}>
        {worstMonth ? `$${worstMonth.pnl.toFixed(2)}` : "—"}
      </p>
      <p className="mt-1 text-xs text-zinc-500">
        {worstMonth ? `${worstMonth.trades} trades • ${worstMonth.wins} wins` : "No data"}
      </p>
    </div>

<div className="rounded-lg border border-white/10 bg-[#0b1120] p-3">
  <p className="text-xs text-zinc-500">Best Day</p>
  <p className="mt-1 font-bold text-emerald-400">{bestDay?.label ?? "—"}</p>
  <p className={`mt-1 text-sm font-bold ${pnlColor(bestDay?.pnl ?? 0)}`}>
    {bestDay ? `$${bestDay.pnl.toFixed(2)}` : "—"}
  </p>
  <p className="mt-1 text-xs text-zinc-500">{bestDay ? `${bestDay.trades} trades` : "No data"}</p>
</div>

<div className="rounded-lg border border-white/10 bg-[#0b1120] p-3">
  <p className="text-xs text-zinc-500">Worst Day</p>
  <p className="mt-1 font-bold text-red-400">{worstDay?.label ?? "—"}</p>
  <p className={`mt-1 text-sm font-bold ${pnlColor(worstDay?.pnl ?? 0)}`}>
    {worstDay ? `$${worstDay.pnl.toFixed(2)}` : "—"}
  </p>
  <p className="mt-1 text-xs text-zinc-500">{worstDay ? `${worstDay.trades} trades` : "No data"}</p>
</div>

  </div>
</div>

<div className="rounded-lg border border-white/10 bg-black/20 p-4">
  <h3 className="text-sm font-bold text-white">Market Mode Performance</h3>

  <div className="mt-3 grid grid-cols-4 gap-2 px-3 text-xs text-zinc-500">
    <p>Mode</p>
    <p>Trades</p>
    <p>Win Rate</p>
    <p>P&L</p>
  </div>

  <div className="mt-1 divide-y divide-white/10 rounded-lg border border-white/10 bg-[#0b1120]">
    {modeStats.map((item) => (
      <div key={item.mode} className="grid grid-cols-4 items-center gap-2 px-3 py-2 text-sm">
        <p className="font-bold text-cyan-400">{item.mode}</p>
        <p className="font-bold text-white">{item.trades}</p>
        <p className={`font-bold ${winRateColor(item.winRate, item.trades)}`}>
          {item.trades ? `${item.winRate.toFixed(1)}%` : "—"}
        </p>
        <p className={`font-bold ${pnlColor(item.pnl)}`}>${item.pnl.toFixed(2)}</p>
      </div>
    ))}
  </div>
</div>

</div>

      <div className="rounded-lg border border-white/10 bg-black/20 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Performance</h3>
          <div className="text-right">
  <p className="text-xs text-zinc-500">Cumulative P&L</p>
  <p className={`text-sm font-bold ${pnlColor(cumulative)}`}>${cumulative.toFixed(2)}</p>
</div>
        </div>

{pnl.length ? (
  <svg viewBox={`0 0 ${chart.width} ${chart.height}`} className="mt-3 h-52 w-full">
    {yTicks.map((tick) => {
      const y = getY(tick);
      return (
        <g key={tick}>
          <line x1={chart.left} y1={y} x2={chart.width - chart.right} y2={y} stroke="currentColor" className="text-zinc-800" />
          <text
  x={chart.left - 10}
  y={y + 5}
  textAnchor="end"
  className={`text-[14px] ${tick > 0 ? "fill-emerald-400" : tick < 0 ? "fill-red-400" : "fill-cyan-400"}`}
>
  ${tick.toFixed(0)}
</text>
        </g>
      );
    })}

    {min < 0 && max >= 0 && (
      <line x1={chart.left} y1={getY(0)} x2={chart.width - chart.right} y2={getY(0)} stroke="currentColor" className="text-zinc-500" strokeWidth="1.5" strokeDasharray="5 5" />
    )}

    <polyline points={points} fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

    {pnl.map((point, index) =>
      index === 0 || index === pnl.length - 1 || index % 10 === 0 ? (
        <circle key={index} cx={getX(index)} cy={getY(point.y)} r="2.5" fill="currentColor" className="text-cyan-400" />
      ) : null
    )}

{xTicks.map((index) => {
  const date = getTradeDate(trades[index]);
  const label = date ? date.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : `Trade ${index + 1}`;

  return (
    <g key={index}>
      <line x1={getX(index)} y1={chart.height - chart.bottom} x2={getX(index)} y2={chart.height - chart.bottom + 5} stroke="currentColor" className="text-zinc-600" />
      <text x={getX(index)} y={chart.height - 13} textAnchor="middle" className="fill-zinc-400 text-[14px]">{label}</text>
    </g>
  );
})}

  </svg>
) : (
  <div className="py-12 text-center text-sm text-zinc-500">Complete trades to build your performance graph.</div>
)}

      </div>

      <div className="rounded-lg border border-white/10 bg-black/20 p-4">
        <h3 className="text-sm font-bold text-white">Timeframe Performance</h3>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {timeframeStats.map((item) => (
            <div key={item.timeframe} className="rounded-lg border border-white/10 bg-[#0b1120] p-3">
              <div className="flex items-center justify-between">
                <p className="font-bold text-cyan-400">{item.timeframe}</p>
                <p className="text-xs text-zinc-500">{item.trades} trades</p>
              </div>
<div className="mt-2 grid grid-cols-3 gap-2 text-sm">
  <div><p className="text-zinc-500">Wins</p><p className="font-bold text-emerald-400">{item.wins}</p></div>
  <div><p className="text-zinc-500">Losses</p><p className="font-bold text-red-400">{item.losses}</p></div>
  <div><p className="text-zinc-500">Win Rate</p><p className={`font-bold ${winRateColor(item.winRate, item.trades)}`}>{item.trades ? `${item.winRate.toFixed(1)}%` : "—"}</p></div>
</div>

            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-black/20 p-4">
        <h3 className="text-sm font-bold text-white">Trader Development Engines</h3>
        <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {engineStats.map(([label, value, status]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-[#0b1120] p-3">
              <p className="text-xs text-zinc-500">{label}</p>
              <div className="mt-1 flex items-end justify-between gap-2">
<p className={`text-lg font-bold ${engineColor(String(status ?? ""))}`}>
  {value != null ? `${Number(value).toFixed(1)}%` : "—"}
</p>

<p className={`text-xs font-medium ${engineColor(String(status ?? ""))}`}>
  {status ?? "No Data"}
</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}