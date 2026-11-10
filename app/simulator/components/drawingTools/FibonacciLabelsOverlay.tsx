
"use client";

import { useEffect, useState } from "react";
import {
  FIBONACCI_COLORS,
  FIBONACCI_LEVELS,
  type FibonacciPoint,
  type FibonacciRetracement,
} from "./FibonacciRetracementTool";

type FibonacciLabel = {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
};

type FibonacciZone = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
};

type FibonacciLine = {
  id: string;
  y: number;
  color: string;
};

type Props = {
  chartInstanceRef: React.RefObject<any>;
  candleSeriesRef: React.RefObject<any>;
  fibonacciDrawingsRef: React.RefObject<FibonacciRetracement[]>;
  pendingFibonacciPointRef: React.RefObject<FibonacciPoint | null>;
};

export default function FibonacciLabelsOverlay({
  chartInstanceRef,
  candleSeriesRef,
  fibonacciDrawingsRef,
  pendingFibonacciPointRef,
}: Props) {
  const [labels, setLabels] = useState<FibonacciLabel[]>([]);
  const [zones, setZones] = useState<FibonacciZone[]>([]);
  const [lines, setLines] = useState<FibonacciLine[]>([]);

  useEffect(() => {
    let frameId = 0;
    let cancelled = false;

    const updateLabels = () => {
      if (cancelled) return;

      const chart = chartInstanceRef.current;
      const candleSeries = candleSeriesRef.current;

      if (chart && candleSeries) {
        const nextLabels: FibonacciLabel[] = [];
        const nextZones: FibonacciZone[] = [];
        const nextLines: FibonacciLine[] = [];

        const addLabels = (
          id: string,
          start: FibonacciPoint,
          end: FibonacciPoint
        ) => {
          const chartWidth = chart.timeScale().width();

          const levelPositions = FIBONACCI_LEVELS.map((ratio) => {
            const price =
              start.price + (end.price - start.price) * ratio;

            return candleSeries.priceToCoordinate(price);
          });

          for (let index = 0; index < levelPositions.length - 1; index++) {
            const y1 = levelPositions[index];
            const y2 = levelPositions[index + 1];

            if (y1 === null || y2 === null) continue;

            nextZones.push({
              id: `${id}-zone-${index}`,
              x: 0,
              y: Math.min(y1, y2),
              width: chartWidth,
              height: Math.abs(y2 - y1),
              color: FIBONACCI_COLORS[index + 1],
            });
          }

          FIBONACCI_LEVELS.forEach((ratio, index) => {
            const price =
              start.price + (end.price - start.price) * ratio;

            const y = candleSeries.priceToCoordinate(price);

            if (y === null) return;

            nextLines.push({
              id: `${id}-line-${index}`,
              y,
              color: FIBONACCI_COLORS[index],
            });

            const percentage = `${(ratio * 100).toFixed(1).replace(".0", "")}%`;

            nextLabels.push({
              id: `${id}-${index}`,
              x: 6,
              y,
              text: percentage,
              color: FIBONACCI_COLORS[index],
            });

            nextLabels.push({
              id: `${id}-${index}-price`,
              x: chartWidth - 6,
              y,
              text: `$${price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`,
              color: FIBONACCI_COLORS[index],
            });
          });
        };

        fibonacciDrawingsRef.current?.forEach((drawing) => {
          addLabels(drawing.id, drawing.start, drawing.end);
        });

        setLines((previous) => {
          if (
            previous.length === nextLines.length &&
            previous.every((line, index) => {
              const next = nextLines[index];
              return (
                line.id === next.id &&
                line.y === next.y &&
                line.color === next.color
              );
            })
          ) {
            return previous;
          }

          return nextLines;
        });

        setLabels((previous) => {
          if (
            previous.length === nextLabels.length &&
            previous.every((label, index) => {
              const next = nextLabels[index];
              return (
                label.id === next.id &&
                label.x === next.x &&
                label.y === next.y &&
                label.text === next.text
              );
            })
          ) {
            return previous;
          }

          return nextLabels;
        });

        setZones((previous) => {
          if (
            previous.length === nextZones.length &&
            previous.every((zone, index) => {
              const next = nextZones[index];
              return (
                zone.id === next.id &&
                zone.x === next.x &&
                zone.y === next.y &&
                zone.width === next.width &&
                zone.height === next.height &&
                zone.color === next.color
              );
            })
          ) {
            return previous;
          }

          return nextZones;
        });
      }

      frameId = requestAnimationFrame(updateLabels);
    };

    frameId = requestAnimationFrame(updateLabels);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
    };
  }, [chartInstanceRef, candleSeriesRef, fibonacciDrawingsRef]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {zones.map((zone) => (
        <div
          key={zone.id}
          className="absolute"
          style={{
            left: zone.x,
            top: zone.y,
            width: zone.width,
            height: zone.height,
            backgroundColor: zone.color,
            opacity: 0.08,
          }}
        />
      ))}

      {lines.map((line) => (
        <div
          key={line.id}
          className="absolute left-0 right-0"
          style={{
            top: line.y,
            height: 1,
            backgroundColor: line.color,
          }}
        />
      ))}

      {labels.map((label) => (
        <span
          key={label.id}
          className="absolute whitespace-nowrap text-[10px] font-semibold text-white"
          style={{
            left: label.x,
            top: label.y,
            transform: label.id.endsWith("-price")
              ? "translate(-100%, -110%)"
              : "translateY(-110%)",
            textShadow: "0 1px 3px #000, 0 0 4px #000",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {label.text}
        </span>
      ))}
    </div>
  );
}
