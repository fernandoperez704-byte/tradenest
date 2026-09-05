"use client";

import { useEffect, useRef } from "react";
import {
  CandlestickSeries,
  ColorType,
  createChart,
  createSeriesMarkers,
} from "lightweight-charts";

type PriceZone = { low: number; high: number } | number;

type Props = {
  coin: string;
  timeframe: string;
  openedAt: string;
  closedAt: string;
  entryPrice: number;
  exitPrice: number;
  stopLoss?: number | null;
  takeProfit?: number | null;
  trend?: string | null;
  support?: PriceZone | null;
  resistance?: PriceZone | null;
};

const timeframeSeconds: Record<string, number> = {
  "1M": 60,
  "5M": 300,
  "15M": 900,
  "1H": 3600,
  "4H": 14400,
  "1D": 86400,
};

export default function TradeReviewChart({
  coin,
  timeframe,
  openedAt,
  closedAt,
  entryPrice,
  exitPrice,
  stopLoss,
  takeProfit,
  trend,
  support,
  resistance,
}: Props) {

  const ref = useRef<HTMLDivElement | null>(null);
const zoneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const seconds = timeframeSeconds[timeframe] || 60;
    const opened = Math.floor(new Date(openedAt).getTime() / 1000);
    const closed = Math.floor(new Date(closedAt).getTime() / 1000);
    const start = opened - seconds * 150;
    const end = closed + seconds * 30;

    const chart = createChart(ref.current, {
      autoSize: true,
      layout: {
        attributionLogo: false,
        background: { type: ColorType.Solid, color: "#0f172a" },
        textColor: "#d4d4d8",
      },
      grid: {
        vertLines: { color: "#1f2937" },
        horzLines: { color: "#1f2937" },
      },
      rightPriceScale: { borderColor: "#27272a" },
timeScale: {
  borderColor: "#3f3f46",
  timeVisible: true,
  secondsVisible: false,
  tickMarkFormatter: (time: any) =>
    new Date(Number(time) * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
},
    });

    const candles = chart.addSeries(CandlestickSeries, {
      upColor: "#16a34a",
      downColor: "#dc2626",
      borderVisible: false,
      wickUpColor: "#16a34a",
      wickDownColor: "#dc2626",
    });

    const entryLine = candles.createPriceLine({
      price: entryPrice,
      lineWidth: 2,
      lineStyle: 2,
      axisLabelVisible: true,
      title: "ENTRY",
    });

    const exitLine = candles.createPriceLine({
      price: exitPrice,
      lineWidth: 2,
      lineStyle: 2,
      axisLabelVisible: true,
      title: "EXIT",
    });

const activeZone =
  support && typeof support !== "number"
    ? support
    : resistance && typeof resistance !== "number"
      ? resistance
      : null;

const updateZoneHighlight = () => {
  if (!zoneRef.current || !activeZone) return;

  const highY = candles.priceToCoordinate(activeZone.high);
  const lowY = candles.priceToCoordinate(activeZone.low);

  if (highY == null || lowY == null) {
    zoneRef.current.style.display = "none";
    return;
  }

  zoneRef.current.style.display = "block";
  zoneRef.current.style.top = `${Math.min(highY, lowY)}px`;
  zoneRef.current.style.height = `${Math.abs(lowY - highY)}px`;
};

    if (stopLoss) {
      candles.createPriceLine({
        price: stopLoss,
        lineWidth: 1,
        lineStyle: 2,
        axisLabelVisible: true,
        title: "SL",
      });
    }

    if (takeProfit) {
      candles.createPriceLine({
        price: takeProfit,
        lineWidth: 1,
        lineStyle: 2,
        axisLabelVisible: true,
        title: "TP",
      });
    }

    fetch(
      `/api/candles?symbol=${coin}&timeframe=${timeframe}&start=${start}&end=${end}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;

candles.setData(
  data.map((c: any) => ({
    time: Math.floor(Number(c.time) / 1000) as any,
    open: c.open,
    high: c.high,
    low: c.low,
    close: c.close,
  }))
);

const entryTime = Math.floor(new Date(openedAt).getTime() / 1000);
const exitTime = Math.floor(new Date(closedAt).getTime() / 1000);

const candleTimes = data.map((c: any) =>
  Math.floor(Number(c.time) / 1000)
);

const nearestTime = (target: number) =>
  candleTimes.reduce((closest: number, current: number) =>
    Math.abs(current - target) < Math.abs(closest - target)
      ? current
      : closest
  );

createSeriesMarkers(candles, [
  {
    time: nearestTime(entryTime) as any,
    position: "belowBar",
    color: "#22d3ee",
    shape: "arrowUp",
    text: "ENTRY",
  },
{
  time: nearestTime(exitTime) as any,
  position: "belowBar",
  color: "#f59e0b",
  shape: "arrowDown",
  text: "EXIT",
},
]);

chart.timeScale().fitContent();

const range = chart.timeScale().getVisibleLogicalRange();

if (range) {
  chart.timeScale().setVisibleLogicalRange({
    from: range.from + 18,
    to: range.to + 6,
  });
}

requestAnimationFrame(updateZoneHighlight);

chart
  .timeScale()
  .subscribeVisibleLogicalRangeChange(updateZoneHighlight);

      });

    return () => {
      candles.removePriceLine(entryLine);
      candles.removePriceLine(exitLine);
      chart.remove();
    };
  }, [
    coin,
    timeframe,
    openedAt,
    closedAt,
    entryPrice,
    exitPrice,
stopLoss,
takeProfit,
support,
resistance,
  ]);

return (
  <div className="relative mt-4 overflow-hidden rounded-xl border border-white/10">
    {trend && (
      <div className="absolute left-3 top-3 z-20 rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-xs font-bold text-white">
        TREND AT ENTRY: {trend}
      </div>
    )}

    <div ref={ref} className="h-[420px] w-full" />

    <div
      ref={zoneRef}
      className={`pointer-events-none absolute left-0 right-[80px] z-10 hidden border-y ${
        support
          ? "border-emerald-400/60 bg-emerald-400/15"
          : "border-red-400/60 bg-red-400/15"
      }`}
    >
      <span className="absolute left-3 top-1 rounded bg-black/70 px-2 py-1 text-[10px] font-bold text-white">
        {support ? "SUPPORT" : "RESISTANCE"}
      </span>
    </div>
  </div>
);
}