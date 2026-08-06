"use client";

import { useEffect, useState } from "react";
import type { GabyChartHighlight } from "../types/gabyChartHighlight";

type Zone = {
  id: string;
  top: number;
  height: number;
  type: GabyChartHighlight["type"];
};

type Props = {
  highlights: GabyChartHighlight[];
  chartInstanceRef: any;
  candleSeriesRef: any;
  chartContainerRef: any;
};

export default function GabyChartOverlay({
  highlights,
  chartInstanceRef,
  candleSeriesRef,
  chartContainerRef,
}: Props) {
  const [zones, setZones] = useState<Zone[]>([]);

  useEffect(() => {
    const chart = chartInstanceRef.current;
    const container = chartContainerRef.current;

    if (!chart || !container || highlights.length === 0) {
      setZones([]);
      return;
    }

    const updateZones = () => {
      const series = candleSeriesRef.current;

      if (!series) {
        setZones([]);
        return;
      }

      const nextZones = highlights.flatMap((highlight) => {
        const highY = series.priceToCoordinate(highlight.high);
        const lowY = series.priceToCoordinate(highlight.low);

        if (highY == null || lowY == null) return [];

        return [{
          id: highlight.id,
          top: Math.min(highY, lowY),
          height: Math.max(4, Math.abs(lowY - highY)),
          type: highlight.type,
        }];
      });

      setZones(nextZones);
    };

    requestAnimationFrame(() =>
      requestAnimationFrame(updateZones)
    );

    const timeScale = chart.timeScale();

    timeScale.subscribeVisibleLogicalRangeChange(updateZones);

    const resizeObserver = new ResizeObserver(updateZones);
    resizeObserver.observe(container);

    return () => {
      timeScale.unsubscribeVisibleLogicalRangeChange(updateZones);
      resizeObserver.disconnect();
    };
  }, [
    highlights,
    chartInstanceRef,
    candleSeriesRef,
    chartContainerRef,
  ]);

  if (zones.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {zones.map((zone) => {
        const support = zone.type === "SUPPORT";

        return (
          <div
            key={zone.id}
            className="absolute left-0 right-0 border-y-2"
            style={{
              top: zone.top,
              height: zone.height,
              background: support
                ? "rgba(34,197,94,0.22)"
                : "rgba(239,68,68,0.22)",
              borderColor: support
                ? "rgba(34,197,94,0.95)"
                : "rgba(239,68,68,0.95)",
            }}
          />
        );
      })}
    </div>
  );
}