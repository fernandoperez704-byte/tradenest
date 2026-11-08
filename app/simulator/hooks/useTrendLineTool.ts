
"use client";

import { useEffect, useRef, useState } from "react";
import { LineSeries } from "lightweight-charts";
import {
  addTrendLine,
  removeTrendLine,
  type TrendLine,
  type TrendLinePoint,
} from "../components/drawingTools/TrendLineTool";

type UseTrendLineToolProps = {
  chartInstanceRef: React.RefObject<any>;
  candleSeriesRef: React.RefObject<any>;
  selectedDrawingTools: string[];
};

export function useTrendLineTool({
  chartInstanceRef,
  candleSeriesRef,
  selectedDrawingTools,
}: UseTrendLineToolProps) {
  const trendLinesRef = useRef<TrendLine[]>([]);
  const pendingTrendLinePointRef = useRef<TrendLinePoint | null>(null);
  const selectedTrendLineRef = useRef<TrendLine | null>(null);

  const [trendLineDeletePosition, setTrendLineDeletePosition] =
    useState<{ x: number; y: number } | null>(null);

  const handleDeleteTrendLine = () => {
    const selectedLine = selectedTrendLineRef.current;
    const chart = chartInstanceRef.current;

    if (!selectedLine || !chart) return;

    removeTrendLine(chart, selectedLine);

    trendLinesRef.current = trendLinesRef.current.filter(
      (drawing) => drawing.id !== selectedLine.id
    );

    selectedTrendLineRef.current = null;
    setTrendLineDeletePosition(null);
  };

  useEffect(() => {
    if (!selectedDrawingTools.includes("Trend Line")) {
      pendingTrendLinePointRef.current = null;
      return;
    }

    let cancelled = false;
    let frameId: number | null = null;
    let cleanupListeners: (() => void) | null = null;
    let previewSeries: any = null;
    let updatingPreview = false;

    const attachListeners = () => {
      if (cancelled || cleanupListeners) return;

      const chart = chartInstanceRef.current;
      const candleSeries = candleSeriesRef.current;

      if (!chart || !candleSeries) {
        frameId = requestAnimationFrame(attachListeners);
        return;
      }

      const getPoint = (param: any): TrendLinePoint | null => {
        if (!param.point) return null;

        const time = chart.timeScale().coordinateToTime(param.point.x);
        const price = candleSeries.coordinateToPrice(param.point.y);

        if (
          time === null ||
          price === null ||
          !Number.isFinite(price) ||
          price <= 0
        ) {
          return null;
        }

        return { time, price };
      };

      const removePreview = () => {
        if (previewSeries) {
          chart.removeSeries(previewSeries);
          previewSeries = null;
        }
      };

      const updatePreview = (end: TrendLinePoint) => {
        const start = pendingTrendLinePointRef.current;
        if (!start || start.time === end.time) return;

        if (!previewSeries) {
          previewSeries = chart.addSeries(LineSeries, {
            color: "#ffffff",
            lineWidth: 1,
            lineStyle: 0,
            priceLineVisible: false,
            lastValueVisible: false,
            crosshairMarkerVisible: false,
          });
        }

        const points = [
          { time: start.time, value: start.price },
          { time: end.time, value: end.price },
        ].sort((a, b) => {
          const first = typeof a.time === "number" ? a.time : String(a.time);
          const second = typeof b.time === "number" ? b.time : String(b.time);
          return first < second ? -1 : first > second ? 1 : 0;
        });

        if (updatingPreview) return;

        updatingPreview = true;

        try {
          previewSeries.setData(points);
        } finally {
          updatingPreview = false;
        }
      };

      const handleChartClick = (param: any) => {
        const point = getPoint(param);
        if (!point) return;

        if (!pendingTrendLinePointRef.current) {
          const clickedLine = [...trendLinesRef.current]
            .reverse()
            .find((drawing) => {
              const x1 = chart.timeScale().timeToCoordinate(drawing.start.time);
              const x2 = chart.timeScale().timeToCoordinate(drawing.end.time);
              const y1 = candleSeries.priceToCoordinate(drawing.start.price);
              const y2 = candleSeries.priceToCoordinate(drawing.end.price);

              if (x1 === null || x2 === null || y1 === null || y2 === null) {
                return false;
              }

              const dx = x2 - x1;
              const dy = y2 - y1;
              const lengthSquared = dx * dx + dy * dy;

              if (lengthSquared === 0) return false;

              const t = Math.max(
                0,
                Math.min(
                  1,
                  ((param.point.x - x1) * dx +
                    (param.point.y - y1) * dy) / lengthSquared
                )
              );

              const nearestX = x1 + t * dx;
              const nearestY = y1 + t * dy;

              return Math.hypot(
                param.point.x - nearestX,
                param.point.y - nearestY
              ) <= 6;
            });

          if (clickedLine) {
            selectedTrendLineRef.current = clickedLine;

            setTrendLineDeletePosition({
              x: Math.max(8, param.point.x - 65),
              y: param.point.y,
            });

            return;
          }

          selectedTrendLineRef.current = null;
          setTrendLineDeletePosition(null);
          pendingTrendLinePointRef.current = point;
          return;
        }

        const start = pendingTrendLinePointRef.current;
        const newLine = addTrendLine(chart, start, point);

        if (newLine) {
          trendLinesRef.current.push(newLine);
          pendingTrendLinePointRef.current = null;
          removePreview();
        }
      };

      const handleCrosshairMove = (param: any) => {
        if (!pendingTrendLinePointRef.current) return;

        const point = getPoint(param);
        if (!point) return;

        updatePreview(point);
      };

      chart.subscribeClick(handleChartClick);
      chart.subscribeCrosshairMove(handleCrosshairMove);

      cleanupListeners = () => {
        chart.unsubscribeClick(handleChartClick);
        chart.unsubscribeCrosshairMove(handleCrosshairMove);
        removePreview();
        pendingTrendLinePointRef.current = null;
      };
    };

    attachListeners();

    return () => {
      cancelled = true;

      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      cleanupListeners?.();
    };
  }, [selectedDrawingTools, chartInstanceRef, candleSeriesRef]);

  return {
    trendLinesRef,
    pendingTrendLinePointRef,
    selectedTrendLineRef,
    trendLineDeletePosition,
    handleDeleteTrendLine,
  };
}
