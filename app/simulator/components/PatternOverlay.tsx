"use client";

import { useEffect, useState } from "react";
import type { DetectedPattern } from "@/lib/patternRecognition";

type OverlayPosition = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type OverlayPoint = {
  x: number;
  y: number;
  label?: string;
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

   const [overlayPoints, setOverlayPoints] =
  useState<OverlayPoint[]>([]); 

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
  setOverlayPoints([]);
  return;
}

    function updatePosition() {
      const currentChart = chartInstanceRef.current;
      const currentSeries = candleSeriesRef.current;

if (!currentChart || !currentSeries || !pattern) {
  setPosition(null);
  setOverlayPoints([]);
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

const nextPosition = {
  left,
  top,
  width: Math.max(20, right - left),
  height: Math.max(20, bottom - top),
};

setPosition(nextPosition);

const nextOverlayPoints: OverlayPoint[] = [];

for (const point of pattern.keyPoints ?? []) {
  const pointTimeSeconds =
    Math.floor(Number(point.time) / 1000);

  const x =
    currentChart
      .timeScale()
      .timeToCoordinate(
        pointTimeSeconds as any
      );

  const y =
    currentSeries.priceToCoordinate(
      point.price
    );

  if (x == null || y == null) {
    continue;
  }

  nextOverlayPoints.push({
    x: x - nextPosition.left,
    y: y - nextPosition.top,
    label: point.label,
  });
}

setOverlayPoints(nextOverlayPoints);

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
  className="absolute text-white"
  style={{
    left: `${position.left}px`,
    top: `${position.top}px`,
    width: `${position.width}px`,
    height: `${position.height}px`,
  }}
>
{overlayPoints.length >= 5 && (
  <svg
    className="absolute inset-0 h-full w-full overflow-visible"
    viewBox={`0 0 ${position.width} ${position.height}`}
    preserveAspectRatio="none"
  >
{(
  pattern.type === "DOUBLE_TOP" ||
  pattern.type === "DOUBLE_BOTTOM"
) && (
  <line
    x1={overlayPoints[1].x}
    y1={overlayPoints[1].y}
    x2={overlayPoints[3].x}
    y2={overlayPoints[3].y}
    stroke="rgba(255,255,255,0.75)"
    strokeWidth="1"
    strokeDasharray="5 4"
    vectorEffect="non-scaling-stroke"
  />
)}

{pattern.type === "HEAD_AND_SHOULDERS" &&
  overlayPoints.length >= 7 && (
    <line
      x1={overlayPoints[2].x}
      y1={overlayPoints[2].y}
      x2={overlayPoints[4].x}
      y2={overlayPoints[4].y}
      stroke="rgba(255,255,255,0.75)"
      strokeWidth="1"
      strokeDasharray="5 4"
      vectorEffect="non-scaling-stroke"
    />
  )}

    {/* Main Double Top path */}
    <polyline
      points={overlayPoints
        .map((point) => `${point.x},${point.y}`)
        .join(" ")}
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />

{overlayPoints.map((point, index) => {

const labelOffsets =
  pattern.type === "HEAD_AND_SHOULDERS"
    ? [
        { x: 0, y: 0 },      // Start
        { x: -8, y: -18 },   // Left Shoulder
        { x: 8, y: 18 },     // Neckline 1
        { x: 0, y: -18 },    // Head
        { x: 8, y: 18 },     // Neckline 2
        { x: 8, y: -18 },    // Right Shoulder
        { x: 8, y: 18 },     // Breakdown
      ]
    : [
        { x: 0, y: 0 },      // Start
        { x: -4, y: -18 },   // Peak/Bottom 1
        { x: 10, y: 18 },    // Neckline
        { x: 8, y: -18 },    // Peak/Bottom 2
        { x: 10, y: 18 },    // Breakout/Breakdown
      ];

  const offset = labelOffsets[index] ?? {
    x: 0,
    y: 0,
  };

  return (
    <g key={`${point.x}-${point.y}-${index}`}>
      {index > 0 && (
        <>
          <circle
            cx={point.x}
            cy={point.y}
            r="6"
            fill="white"
            stroke="#0f172a"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          <text
            x={point.x}
            y={point.y + 3}
            textAnchor="middle"
            fill="#0f172a"
            fontSize="8"
            fontWeight="900"
          >
            {index}
          </text>

          {point.label && (
            <text
              x={point.x + offset.x}
              y={point.y + offset.y}
              textAnchor={
                index === 1
                  ? "middle"
                  : "start"
              }
              fill="white"
              fontSize="9"
              fontWeight="700"
              stroke="#0f172a"
              strokeWidth="3"
              paintOrder="stroke"
              vectorEffect="non-scaling-stroke"
>
  {point.label}
</text>
          )}
        </>
      )}
    </g>
  );
})}
  </svg>
)}

    </div>
  </div>
);
}