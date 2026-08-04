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

type OverlayZone = {
  top: number;
  height: number;
};

type Props = {
  pattern: DetectedPattern | null;
  chartInstanceRef: any;
  candleSeriesRef: any;
  chartContainerRef: any;
};

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

const [overlayZone, setOverlayZone] =
  useState<OverlayZone | null>(null);

  useEffect(() => {
    const chart =
      chartInstanceRef.current;

    const candleSeries =
      candleSeriesRef.current;

    const container =
      chartContainerRef.current;

    if (
      !pattern ||
      !chart ||
      !candleSeries ||
      !container
    ) {
setPosition(null);
setOverlayPoints([]);
setOverlayZone(null);
return;
    }

    function updatePosition() {
      const currentChart =
        chartInstanceRef.current;

      const currentSeries =
        candleSeriesRef.current;

      const currentContainer =
        chartContainerRef.current;

      if (
        !currentChart ||
        !currentSeries ||
        !currentContainer ||
        !pattern
      ) {
setPosition(null);
setOverlayPoints([]);
setOverlayZone(null);
return;
      }

      const startTimeSeconds =
        Math.floor(
          Number(pattern.startTime) / 1000
        );

      const endTimeSeconds =
        Math.floor(
          Number(pattern.endTime) / 1000
        );

      const startX =
        currentChart
          .timeScale()
          .timeToCoordinate(
            startTimeSeconds as any
          );

      const endX =
        currentChart
          .timeScale()
          .timeToCoordinate(
            endTimeSeconds as any
          );

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
  setOverlayPoints([]);
  setOverlayZone(null);
  return;
}

      const horizontalPadding = 16;
      const verticalPadding = 16;

      const rawLeft =
        Math.min(startX, endX) -
        horizontalPadding;

      const rawRight =
        Math.max(startX, endX) +
        horizontalPadding;

      const rawTop =
        Math.min(highY, lowY) -
        verticalPadding;

      const rawBottom =
        Math.max(highY, lowY) +
        verticalPadding;

      const width =
        Math.max(
          40,
          rawRight - rawLeft
        );

      const height =
        Math.max(
          40,
          rawBottom - rawTop
        );

      const nextPosition: OverlayPosition = {
        left: rawLeft,
        top: rawTop,
        width,
        height,
      };

      setPosition(nextPosition);

      const nextOverlayPoints:
        OverlayPoint[] = [];

      for (
        const point of
        pattern.keyPoints ?? []
      ) {
        const pointTimeSeconds =
          Math.floor(
            Number(point.time) / 1000
          );

        const pointX =
          currentChart
            .timeScale()
            .timeToCoordinate(
              pointTimeSeconds as any
            );

        const pointY =
          currentSeries.priceToCoordinate(
            point.price
          );

        if (
          pointX == null ||
          pointY == null
        ) {
          continue;
        }

        nextOverlayPoints.push({
          x: pointX - rawLeft,
          y: pointY - rawTop,
          label: point.label,
        });
      }

      setOverlayPoints(
        nextOverlayPoints
      );

const patternZone =
  pattern.type === "DOUBLE_TOP"
    ? pattern.resistanceZone
    : pattern.type === "DOUBLE_BOTTOM"
    ? pattern.supportZone
    : null;

if (!patternZone) {
  setOverlayZone(null);
  return;
}

const zoneHighY =
  currentSeries.priceToCoordinate(
    patternZone.high
  );

const zoneLowY =
  currentSeries.priceToCoordinate(
    patternZone.low
  );

if (
  zoneHighY == null ||
  zoneLowY == null
) {
  setOverlayZone(null);
  return;
}

setOverlayZone({
  top:
    Math.min(
      zoneHighY,
      zoneLowY
    ) - rawTop,

  height: Math.max(
    2,
    Math.abs(
      zoneLowY -
      zoneHighY
    )
  ),
});

    }

    requestAnimationFrame(() => {
      requestAnimationFrame(
        updatePosition
      );
    });

    const timeScale =
      chart.timeScale();

    timeScale.subscribeVisibleLogicalRangeChange(
      updatePosition
    );

    const resizeObserver =
      new ResizeObserver(() => {
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

  if (
    !pattern ||
    !position ||
    overlayPoints.length === 0
  ) {
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
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox={`0 0 ${position.width} ${position.height}`}
          preserveAspectRatio="none"
        >

{overlayZone &&
  overlayPoints.length >= 2 &&
  (
    pattern.type === "DOUBLE_TOP" ||
    pattern.type === "DOUBLE_BOTTOM"
  ) && (
    <rect
      x={overlayPoints[1].x}
      y={overlayZone.top}
      width={Math.max(
        0,
        position.width -
          overlayPoints[1].x
      )}
      height={overlayZone.height}
      fill={
        pattern.type === "DOUBLE_TOP"
          ? "rgba(239,68,68,0.10)"
          : "rgba(34,197,94,0.10)"
      }
    />
  )}

{/* Double Top: resistance and neckline */}
{pattern.type === "DOUBLE_TOP" &&
  overlayPoints.length >= 5 && (
    <>
      <line
        x1={overlayPoints[1].x}
        y1={overlayPoints[1].y}
        x2={position.width}
        y2={overlayPoints[1].y}
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="1"
        strokeDasharray="5 4"
        vectorEffect="non-scaling-stroke"
      />

      <line
        x1={overlayPoints[2].x}
        y1={overlayPoints[2].y}
        x2={position.width}
        y2={overlayPoints[2].y}
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1"
        strokeDasharray="5 4"
        vectorEffect="non-scaling-stroke"
      />
    </>
  )}

{/* Double Bottom: support and neckline */}
{pattern.type === "DOUBLE_BOTTOM" &&
  overlayPoints.length >= 5 && (
    <>
      <line
        x1={overlayPoints[1].x}
        y1={overlayPoints[1].y}
        x2={position.width}
        y2={overlayPoints[1].y}
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1"
        strokeDasharray="5 4"
        vectorEffect="non-scaling-stroke"
      />

      <line
        x1={overlayPoints[2].x}
        y1={overlayPoints[2].y}
        x2={position.width}
        y2={overlayPoints[2].y}
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="1"
        strokeDasharray="5 4"
        vectorEffect="non-scaling-stroke"
      />
    </>
  )}

          {pattern.type ===
            "HEAD_AND_SHOULDERS" &&
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

          {pattern.type ===
            "INVERSE_HEAD_AND_SHOULDERS" &&
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

{pattern.type === "ASCENDING_TRIANGLE" &&
  overlayPoints.length >= 6 && (
    <>
      {/* Horizontal resistance */}
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

      {/* Rising support */}
      <line
        x1={overlayPoints[0].x}
        y1={overlayPoints[0].y}
        x2={overlayPoints[4].x}
        y2={overlayPoints[4].y}
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="1"
        strokeDasharray="5 4"
        vectorEffect="non-scaling-stroke"
      />
    </>
)}

          <polyline
            points={overlayPoints
              .map(
                (point) =>
                  `${point.x},${point.y}`
              )
              .join(" ")}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />

          {overlayPoints.map(
            (point, index) => {
const shouldHideFirstPoint =
  index === 0 &&
  point.label === "Start";

if (shouldHideFirstPoint) {
  return null;
}

const labelOffsets =
  pattern.type === "HEAD_AND_SHOULDERS" ||
  pattern.type === "INVERSE_HEAD_AND_SHOULDERS"
    ? [
        { x: 0, y: 0 },
        { x: -12, y: -12 },
        { x: 8, y: 16 },
        { x: 0, y: -14 },
        { x: 8, y: 16 },
        { x: 8, y: -12 },
        { x: 8, y: 16 },
      ]
    : pattern.type === "ASCENDING_TRIANGLE"
    ? [
        { x: -8, y: 16 },  // Low 1
        { x: 8, y: -12 },  // Resistance 1
        { x: 8, y: 16 },   // Low 2
        { x: 8, y: -12 },  // Resistance 2
        { x: 8, y: 16 },   // Low 3
        { x: 8, y: -12 },  // Breakout / Current
      ]
    : pattern.type === "DESCENDING_TRIANGLE"
    ? [
        { x: -8, y: -12 }, // High 1
        { x: 8, y: 16 },   // Support 1
        { x: 8, y: -12 },  // High 2
        { x: 8, y: 16 },   // Support 2
        { x: 8, y: -12 },  // High 3
        { x: 8, y: 16 },   // Breakdown / Current
      ]
    : [
        { x: 0, y: 0 },
        { x: -8, y: -12 },
        { x: 8, y: 16 },
        { x: 8, y: -12 },
        { x: 8, y: 16 },
      ];
              const offset =
                labelOffsets[index] ?? {
                  x: 6,
                  y: -8,
                };

              return (
                <g
                  key={`${point.x}-${point.y}-${index}`}
                >
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    fill="white"
                    stroke="#0f172a"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />

                  <text
                    x={point.x}
                    y={point.y + 2.5}
                    textAnchor="middle"
                    fill="#0f172a"
                    fontSize="7"
                    fontWeight="900"
                  >
                    {index}
                  </text>

                  {point.label && (
                    <text
                      x={
                        point.x +
                        offset.x
                      }
                      y={
                        point.y +
                        offset.y
                      }
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
                </g>
              );
            }
          )}
        </svg>
      </div>
    </div>
  );
}