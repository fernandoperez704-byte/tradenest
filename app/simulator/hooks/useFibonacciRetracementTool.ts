
"use client";

import { useEffect, useRef, useState } from "react";
import { LineSeries } from "lightweight-charts";
import {
  addFibonacciRetracement,
  removeFibonacciRetracement,
  FIBONACCI_LEVELS,
  FIBONACCI_COLORS,
  type FibonacciPoint,
  type FibonacciRetracement,
} from "../components/drawingTools/FibonacciRetracementTool";

type UseFibonacciRetracementToolProps = {
  chartInstanceRef: React.RefObject<any>;
  candleSeriesRef: React.RefObject<any>;
  selectedDrawingTools: string[];
};

export function useFibonacciRetracementTool({
  chartInstanceRef,
  candleSeriesRef,
  selectedDrawingTools,
}: UseFibonacciRetracementToolProps) {
  const fibonacciDrawingsRef = useRef<FibonacciRetracement[]>([]);
  const pendingFibonacciPointRef = useRef<FibonacciPoint | null>(null);
  const selectedFibonacciRef = useRef<FibonacciRetracement | null>(null);

  const [fibonacciDeletePosition, setFibonacciDeletePosition] =
    useState<{ x: number; y: number } | null>(null);

  const handleDeleteFibonacci = () => {
    const drawing = selectedFibonacciRef.current;
    const chart = chartInstanceRef.current;

    if (!drawing || !chart) return;

    removeFibonacciRetracement(chart, drawing);

    fibonacciDrawingsRef.current = fibonacciDrawingsRef.current.filter(
      (item) => item.id !== drawing.id
    );

    selectedFibonacciRef.current = null;
    setFibonacciDeletePosition(null);
  };

  useEffect(() => {
    if (!selectedDrawingTools.includes("Fibonacci Retracement")) {
      pendingFibonacciPointRef.current = null;
      selectedFibonacciRef.current = null;
      setFibonacciDeletePosition(null);
      return;
    }

    let cancelled = false;
    let frameId: number | null = null;
    let cleanupListeners: (() => void) | null = null;
    let updatingPreview = false;
    let previewSeries: any[] = [];

    const attachListeners = () => {
      if (cancelled || cleanupListeners) return;

      const chart = chartInstanceRef.current;
      const candleSeries = candleSeriesRef.current;

      if (!chart || !candleSeries) {
        frameId = requestAnimationFrame(attachListeners);
        return;
      }

      const getPoint = (param: any): FibonacciPoint | null => {
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
        previewSeries.forEach((series) => {
          chart.removeSeries(series);
        });

        previewSeries = [];
      };

      const updatePreview = (end: FibonacciPoint) => {
        const start = pendingFibonacciPointRef.current;

        if (!start || updatingPreview) return;

        updatingPreview = true;

        try {
          if (previewSeries.length === 0) {
            previewSeries = FIBONACCI_LEVELS.map((ratio, index) =>
              chart.addSeries(LineSeries, {
                color: FIBONACCI_COLORS[index],
                lineWidth: 1,
                lineStyle: 0,
                priceLineVisible: false,
                lastValueVisible: false,
                crosshairMarkerVisible: false,
              })
            );
          }

          const visibleRange = chart.timeScale().getVisibleRange();

          if (!visibleRange) return;

          FIBONACCI_LEVELS.forEach((ratio, index) => {
            const price =
              start.price + (end.price - start.price) * ratio;

            previewSeries[index].setData([
              { time: visibleRange.from, value: price },
              { time: visibleRange.to, value: price },
            ]);
          });
        } finally {
          updatingPreview = false;
        }
      };

      const handleCrosshairMove = (param: any) => {
        if (!pendingFibonacciPointRef.current || updatingPreview) return;

        const point = getPoint(param);
        if (!point) return;

        updatePreview(point);
      };

      const handleChartClick = (param: any) => {
        const point = getPoint(param);
        if (!point) return;

        if (!pendingFibonacciPointRef.current) {
          const clickedDrawing = [...fibonacciDrawingsRef.current]
            .reverse()
            .find((drawing) => {
              return drawing.levels.some((level) => {
                const y = candleSeries.priceToCoordinate(level.price);

                return (
                  y !== null &&
                  Math.abs(param.point.y - y) <= 6
                );
              });
            });

          if (clickedDrawing) {
            selectedFibonacciRef.current = clickedDrawing;
            setFibonacciDeletePosition({
              x: Math.max(8, param.point.x - 65),
              y: param.point.y,
            });
            return;
          }

          selectedFibonacciRef.current = null;
          setFibonacciDeletePosition(null);
          pendingFibonacciPointRef.current = point;
          return;
        }

        const start = pendingFibonacciPointRef.current;
        const drawing = addFibonacciRetracement(chart, start, point);

        if (drawing) {
          fibonacciDrawingsRef.current.push(drawing);
          pendingFibonacciPointRef.current = null;
          removePreview();
        }
      };

      chart.subscribeClick(handleChartClick);
      chart.subscribeCrosshairMove(handleCrosshairMove);

      cleanupListeners = () => {
        chart.unsubscribeClick(handleChartClick);
        chart.unsubscribeCrosshairMove(handleCrosshairMove);
        removePreview();
        pendingFibonacciPointRef.current = null;
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
    fibonacciDrawingsRef,
    pendingFibonacciPointRef,
    selectedFibonacciRef,
    fibonacciDeletePosition,
    handleDeleteFibonacci,
  };
}
