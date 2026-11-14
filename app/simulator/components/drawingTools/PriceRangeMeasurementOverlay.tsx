
"use client";

import { useEffect, useState } from "react";
import type { PriceRangeMeasurement } from "./PriceRangeMeasurementTool";

type Props = {
  chartInstanceRef: React.RefObject<any>;
  candleSeriesRef: React.RefObject<any>;
  priceRangeDrawings: PriceRangeMeasurement[];
  priceRangePreview: PriceRangeMeasurement | null;
  onDeletePriceRangeById: (id: string) => void;
};

type MeasurementBox = {
  id: string;
  drawingId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  label: string;
  details: string;
  prices: string;
  preview: boolean;
};

export default function PriceRangeMeasurementOverlay({
  chartInstanceRef,
  candleSeriesRef,
  priceRangeDrawings,
  priceRangePreview,
  onDeletePriceRangeById,
}: Props) {
  const [boxes, setBoxes] = useState<MeasurementBox[]>([]);

  useEffect(() => {
    let frameId = 0;
    let cancelled = false;

    const updateBoxes = () => {
      if (cancelled) return;

      const chart = chartInstanceRef.current;
      const candleSeries = candleSeriesRef.current;
      const nextBoxes: MeasurementBox[] = [];

      if (chart && candleSeries) {
        const measurements = [
          ...priceRangeDrawings,
          ...(priceRangePreview ? [priceRangePreview] : []),
        ];

        measurements.forEach((drawing, index) => {
          const x1 = chart.timeScale().timeToCoordinate(drawing.start.time);
          const x2 = chart.timeScale().timeToCoordinate(drawing.end.time);
          const y1 = candleSeries.priceToCoordinate(drawing.start.price);
          const y2 = candleSeries.priceToCoordinate(drawing.end.price);

          if (x1 === null || x2 === null || y1 === null || y2 === null) {
            return;
          }

          const startTime = Number(drawing.start.time);
          const endTime = Number(drawing.end.time);

          const durationMs =
            Number.isFinite(startTime) && Number.isFinite(endTime)
              ? Math.abs(endTime - startTime) *
                (Math.max(startTime, endTime) < 1e11 ? 1000 : 1)
              : 0;

          const days = Math.floor(durationMs / 86400000);
          const hours = Math.floor((durationMs % 86400000) / 3600000);
          const minutes = Math.round((durationMs % 3600000) / 60000);

          const duration =
            days > 0
              ? `${days}d ${hours}h`
              : hours > 0
                ? `${hours}h ${minutes}m`
                : `${minutes}m`;

          const color =
            drawing.direction === "UP"
              ? "#22c55e"
              : drawing.direction === "DOWN"
                ? "#ef4444"
                : "#94a3b8";

          const sign = drawing.priceChange > 0 ? "+" : "";

          const priceText = `${sign}$${Math.abs(
            drawing.priceChange
          ).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`;

          const percentText =
            `${sign}${drawing.percentageChange.toFixed(2)}%`;

          const label = `${priceText} (${percentText})`;

          const details = durationMs > 0 ? duration : "";

          const startPrice = drawing.start.price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          const endPrice = drawing.end.price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          const prices = `$${startPrice} → $${endPrice}`;

          nextBoxes.push({
            id: `${drawing.id}-${index}`,
            drawingId: drawing.id,
            x: Math.min(x1, x2),
            y: Math.min(y1, y2),
            width: Math.max(1, Math.abs(x2 - x1)),
            height: Math.max(1, Math.abs(y2 - y1)),
            color,
            label,
            details,
            prices,
            preview: drawing === priceRangePreview,
          });
        });
      }

      setBoxes((previous) => {
        if (
          previous.length === nextBoxes.length &&
          previous.every((box, index) =>
            Object.keys(box).every(
              (key) =>
                box[key as keyof MeasurementBox] ===
                nextBoxes[index][key as keyof MeasurementBox]
            )
          )
        ) {
          return previous;
        }

        return nextBoxes;
      });

      frameId = requestAnimationFrame(updateBoxes);
    };

    frameId = requestAnimationFrame(updateBoxes);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
    };
  }, [
    chartInstanceRef,
    candleSeriesRef,
    priceRangeDrawings,
    priceRangePreview,
  ]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {boxes.map((box) => (
        <div
          key={box.id}
          className="absolute"
          style={{
            left: box.x,
            top: box.y,
            width: box.width,
            height: box.height,
            backgroundColor: `${box.color}22`,
            border: `1px ${box.preview ? "dashed" : "solid"} ${box.color}`,
          }}
        >
          <div
            className={`absolute left-1/2 top-0 flex flex-col items-center gap-0.5 whitespace-nowrap rounded px-3 py-1.5 text-white shadow-lg ${
              box.preview ? "" : "pointer-events-auto"
            }`}
            style={{
              backgroundColor:
                box.color === "#22c55e"
                  ? "rgba(15, 65, 45, 0.65)"
                  : box.color === "#ef4444"
                    ? "rgba(85, 30, 35, 0.65)"
                    : "rgba(30, 41, 59, 0.65)",
              border: `1px solid ${box.color}80`,
              top: box.y < 85 ? "100%" : "0",
              transform:
                box.y < 85
                  ? "translate(-50%, 8px)"
                  : "translate(-50%, calc(-100% - 8px))",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold">
                {box.label}
              </span>

              {!box.preview && (
                <button
                  type="button"
                  title="Delete measurement"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDeletePriceRangeById(box.drawingId);
                  }}
                  className="ml-2 flex h-5 w-5 items-center justify-center rounded border border-white/20 bg-black/25 text-xs font-semibold text-white/80 transition-all hover:border-white/50 hover:bg-red-800 hover:text-white"
                >
                  ×
                </button>
              )}
            </div>

            {box.details && (
              <span className="text-[10px] font-medium opacity-90">
                {box.details}
              </span>
            )}

            <span className="text-[10px] font-medium opacity-90">
              {box.prices}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
