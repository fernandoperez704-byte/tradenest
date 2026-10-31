"use client";

import { useEffect, useState } from "react";
import type { GabyChartHighlight } from "../types/gabyChartHighlight";

type Props = {
  highlights: GabyChartHighlight[];
  candleSeriesRef: any;
  chartContainerRef: any;
  chartInstanceRef: any;
};

type OverlayItem =
  | {
      id: string;
      type: "SUPPORT" | "RESISTANCE";
      top: number;
      height: number;
    }
  | {
      id: string;
      type: "TRENDLINE";
      upper: { x1: number; y1: number; x2: number; y2: number };
      lower: { x1: number; y1: number; x2: number; y2: number };
    }
  | {
      id: string;
      type: "CANDLE";
      left: number;
      top: number;
      width: number;
      height: number;
      reason?: string;
    };

export default function GabyChartOverlay({
  highlights,
  candleSeriesRef,
  chartContainerRef,
  chartInstanceRef,
}: Props) {
  const [items, setItems] = useState<OverlayItem[]>([]);

  useEffect(() => {
    const series = candleSeriesRef.current;
    const container = chartContainerRef.current;
    const chart = chartInstanceRef.current;

    if (!series || !container) {
      setItems([]);
      return;
    }

    const update = () => {
      const next: OverlayItem[] = [];

      for (const h of highlights) {
        if (h.type === "CANDLE" && chart) {
          const x = chart.timeScale().timeToCoordinate(
            Math.floor(Number(h.time) / 1000) as any
          );

          const highY = series.priceToCoordinate(h.high);
          const lowY = series.priceToCoordinate(h.low);

          if (x == null || highY == null || lowY == null) continue;

          next.push({
            id: h.id,
            type: "CANDLE",
            left: x - 6,
            top: Math.min(highY, lowY) - 4,
            width: 12,
            height: Math.abs(lowY - highY) + 8,
            reason: h.reason,
          });

          continue;
        }

        if (h.type === "SUPPORT" || h.type === "RESISTANCE") {
          const highY = series.priceToCoordinate(h.high);
          const lowY = series.priceToCoordinate(h.low);

          if (highY == null || lowY == null) continue;

          next.push({
            id: h.id,
            type: h.type,
            top: Math.min(highY, lowY),
            height: Math.max(4, Math.abs(lowY - highY)),
          });

          continue;
        }

        if (h.type === "TRENDLINE" && chart) {
          const convert = (line: typeof h.upper) => {
            const x1 = chart.timeScale().timeToCoordinate(
              Math.floor(Number(line.startTime) / 1000) as any
            );

            const x2 = chart.timeScale().timeToCoordinate(
              Math.floor(Number(line.endTime) / 1000) as any
            );

            const y1 = series.priceToCoordinate(line.startPrice);
            const y2 = series.priceToCoordinate(line.endPrice);

            if (
              x1 == null ||
              x2 == null ||
              y1 == null ||
              y2 == null
            ) {
              return null;
            }

            return { x1, y1, x2, y2 };
          };

          const upper = convert(h.upper);
          const lower = convert(h.lower);

          if (upper && lower) {
            next.push({
              id: h.id,
              type: "TRENDLINE",
              upper,
              lower,
            });
          }
        }
      }

      setItems((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(next)) {
          return prev;
        }

        return next;
      });
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(container);

    const handleChartChange = () => {
      update();
    };

    const timeScale = chart?.timeScale();
    timeScale?.subscribeVisibleLogicalRangeChange(handleChartChange);

    return () => {
      observer.disconnect();
      timeScale?.unsubscribeVisibleLogicalRangeChange(handleChartChange);
    };
  }, [
    highlights,
    candleSeriesRef,
    chartContainerRef,
    chartInstanceRef,
  ]);

  const lineStyle = (
    line: { x1: number; y1: number; x2: number; y2: number }
  ) => {
    const width = Math.hypot(
      line.x2 - line.x1,
      line.y2 - line.y1
    );

    const angle =
      Math.atan2(
        line.y2 - line.y1,
        line.x2 - line.x1
      ) *
      (180 / Math.PI);

    return {
      left: line.x1,
      top: line.y1,
      width,
      transform: `rotate(${angle}deg)`,
      transformOrigin: "0 50%",
    };
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {items.map((item) =>
        item.type === "CANDLE" ? (
          <div
            key={item.id}
            className={`absolute flex items-center justify-center text-2xl font-bold ${
              item.reason === "Resistance rejection"
                ? "text-red-400"
                : "text-yellow-400"
            }`}
            style={{
              left: item.left + item.width / 2 - 12,
              top:
                item.reason === "Resistance rejection"
                  ? item.top - 28
                  : item.top + item.height + 4,
              width: 24,
              height: 28,
            }}
          >
            {item.reason === "Resistance rejection" ? "↓" : "↑"}
          </div>
        ) : item.type === "TRENDLINE" ? (
          <div key={item.id}>
            <div
              className="absolute h-[2px] bg-cyan-400"
              style={lineStyle(item.upper)}
            />
            <div
              className="absolute h-[2px] bg-cyan-400"
              style={lineStyle(item.lower)}
            />
          </div>
        ) : (
          <div
            key={item.id}
            className={`absolute left-0 right-[70px] border-y ${
              item.type === "SUPPORT"
                ? "border-emerald-400/60 bg-emerald-400/10"
                : "border-red-400/60 bg-red-400/10"
            }`}
            style={{
              top: item.top,
              height: item.height,
            }}
          />
        )
      )}
    </div>
  );
}