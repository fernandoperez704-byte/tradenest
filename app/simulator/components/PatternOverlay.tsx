"use client";

import { useEffect, useState } from "react";
import type { DetectedPattern } from "@/lib/patternRecognition";

type OverlayPosition = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type Props = {
  pattern: DetectedPattern | null;
  chartInstanceRef: any;
  candleSeriesRef: any;
  chartContainerRef: any;
};

function formatPatternName(
  type: DetectedPattern["type"]
) {
  switch (type) {
    case "DOUBLE_BOTTOM":
      return "Double Bottom";

    case "DOUBLE_TOP":
      return "Double Top";

    case "HEAD_AND_SHOULDERS":
      return "Head and Shoulders";

    case "INVERSE_HEAD_AND_SHOULDERS":
      return "Inverse Head and Shoulders";

    case "BULL_FLAG":
      return "Bull Flag";

    case "BEAR_FLAG":
      return "Bear Flag";
  }
}

export default function PatternOverlay({
  pattern,
  chartInstanceRef,
  candleSeriesRef,
  chartContainerRef,
}: Props) {
  const [position, setPosition] =
    useState<OverlayPosition | null>(null);

  useEffect(() => {
    const chart = chartInstanceRef.current;
    const candleSeries = candleSeriesRef.current;
    const container = chartContainerRef.current;

    if (
      !pattern ||
      !chart ||
      !candleSeries ||
      !container
    ) {
      setPosition(null);
      return;
    }

    function updatePosition() {
      const currentChart = chartInstanceRef.current;
      const currentSeries = candleSeriesRef.current;

      if (!currentChart || !currentSeries || !pattern) {
        setPosition(null);
        return;
      }

      const startTimeSeconds =
        Math.floor(Number(pattern.startTime) / 1000);

      const endTimeSeconds =
        Math.floor(Number(pattern.endTime) / 1000);

      const startX =
        currentChart
          .timeScale()
          .timeToCoordinate(startTimeSeconds as any);

      const endX =
        currentChart
          .timeScale()
          .timeToCoordinate(endTimeSeconds as any);

      const highY =
        currentSeries.priceToCoordinate(
          pattern.highPrice
        );

      const lowY =
        currentSeries.priceToCoordinate(
          pattern.lowPrice
        );

      if (
        startX == null ||
        endX == null ||
        highY == null ||
        lowY == null
      ) {
        setPosition(null);
        return;
      }

      const horizontalPadding = 8;
      const verticalPadding = 8;

      const left =
        Math.min(startX, endX) -
        horizontalPadding;

      const right =
        Math.max(startX, endX) +
        horizontalPadding;

      const top =
        Math.min(highY, lowY) -
        verticalPadding;

      const bottom =
        Math.max(highY, lowY) +
        verticalPadding;

      setPosition({
        left,
        top,
        width: Math.max(20, right - left),
        height: Math.max(20, bottom - top),
      });
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(updatePosition);
    });

    const timeScale = chart.timeScale();

    timeScale.subscribeVisibleLogicalRangeChange(
      updatePosition
    );

    const resizeObserver = new ResizeObserver(() => {
      updatePosition();
    });

    resizeObserver.observe(container);

    return () => {
      timeScale.unsubscribeVisibleLogicalRangeChange(
        updatePosition
      );

      resizeObserver.disconnect();
    };
  }, [
    pattern,
    chartInstanceRef,
    candleSeriesRef,
    chartContainerRef,
  ]);

  if (!pattern || !position) {
    return null;
  }

return (
  <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
    <div
      className={`absolute rounded-xl border transition-all duration-200 ${
        pattern.direction === "BULLISH"
          ? "border-green-400/50 bg-green-500/5"
          : pattern.direction === "BEARISH"
          ? "border-red-400/50 bg-red-500/5"
          : "border-yellow-400/50 bg-yellow-500/5"
      }`}
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        width: `${position.width}px`,
        height: `${position.height}px`,
      }}
    >
      <div
        className="absolute whitespace-nowrap rounded-md bg-[#0f172a]/95 px-2 py-1 text-[11px] font-bold text-white shadow-lg"
        style={{
          left: "50%",
          top: "-32px",
          transform: "translateX(-50%)",
        }}
      >
        {formatPatternName(pattern.type)}
        {" • "}
        {pattern.confidence}%
      </div>
    </div>
  </div>
);
}