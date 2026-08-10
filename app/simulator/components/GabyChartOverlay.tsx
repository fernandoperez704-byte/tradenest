"use client";

import { useEffect, useState } from "react";
import type { GabyChartHighlight } from "../types/gabyChartHighlight";

type Props = {
  highlights: GabyChartHighlight[];
  candleSeriesRef: any;
  chartContainerRef: any;
};

type Zone = {
  id: string;
  type: "SUPPORT" | "RESISTANCE";
  top: number;
  height: number;
};

export default function GabyChartOverlay({
  highlights,
  candleSeriesRef,
  chartContainerRef,
}: Props) {
  const [zones, setZones] = useState<Zone[]>([]);

  useEffect(() => {
    const series = candleSeriesRef.current;
    const container = chartContainerRef.current;

    if (!series || !container || highlights.length === 0) {
      setZones([]);
      return;
    }

    const updateZones = () => {
      const nextZones: Zone[] = [];

      for (const highlight of highlights) {
        const highY = series.priceToCoordinate(highlight.high);
        const lowY = series.priceToCoordinate(highlight.low);

        if (highY == null || lowY == null) continue;

        nextZones.push({
          id: highlight.id,
          type: highlight.type,
          top: Math.min(highY, lowY),
          height: Math.max(4, Math.abs(lowY - highY)),
        });
      }

      setZones(nextZones);
    };

    updateZones();

    const observer = new ResizeObserver(updateZones);
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [highlights, candleSeriesRef, chartContainerRef]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {zones.map((zone) => (
        <div
          key={zone.id}
          className={`absolute left-0 right-[70px] border-y ${
            zone.type === "SUPPORT"
              ? "border-emerald-400/60 bg-emerald-400/10"
              : "border-red-400/60 bg-red-400/10"
          }`}
          style={{
            top: zone.top,
            height: zone.height,
          }}
        />
      ))}
    </div>
  );
}