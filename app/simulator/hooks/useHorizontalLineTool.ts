
"use client";

import { useEffect, useRef, useState } from "react";

import {
  addHorizontalLine,
  removeHorizontalLine,
  type HorizontalLine,
} from "../components/drawingTools/HorizontalLineTool";

type UseHorizontalLineToolProps = {
  chartInstanceRef: React.RefObject<any>;
  candleSeriesRef: React.RefObject<any>;
  selectedDrawingTools: string[];
};

export function useHorizontalLineTool({
  chartInstanceRef,
  candleSeriesRef,
  selectedDrawingTools,
}: UseHorizontalLineToolProps) {
  const horizontalLinesRef = useRef<HorizontalLine[]>([]);
  const selectedHorizontalLineRef = useRef<HorizontalLine | null>(null);

  const [manualHorizontalLines, setManualHorizontalLines] = useState<
    Array<{ price: number }>
  >([]);

  const [
    horizontalLineDeletePosition,
    setHorizontalLineDeletePosition,
  ] = useState<{ x: number; y: number } | null>(null);

  const syncHorizontalLines = () => {
    setManualHorizontalLines(
      horizontalLinesRef.current.map((drawing) => ({
        price: Number(drawing.price.toFixed(2)),
      }))
    );
  };

  const handleDeleteHorizontalLine = () => {
    const selectedLine = selectedHorizontalLineRef.current;
    const candleSeries = candleSeriesRef.current;

    if (!selectedLine || !candleSeries) return;

    removeHorizontalLine(candleSeries, selectedLine);

    horizontalLinesRef.current = horizontalLinesRef.current.filter(
      (drawing) => drawing.id !== selectedLine.id
    );

    syncHorizontalLines();

    selectedHorizontalLineRef.current = null;
    setHorizontalLineDeletePosition(null);
  };

  useEffect(() => {
    let cancelled = false;
    let cleanupListeners: (() => void) | null = null;

    const attachListeners = () => {
      if (cancelled || cleanupListeners) return;

      const chart = chartInstanceRef.current;
      const candleSeries = candleSeriesRef.current;

      if (!chart || !candleSeries) {
        requestAnimationFrame(attachListeners);
        return;
      }

    const handleChartClick = (param: any) => {
      if (!param.point) return;

      const price = candleSeries.coordinateToPrice(param.point.y);

      if (price === null || !Number.isFinite(price)) return;

      const clickedLine = horizontalLinesRef.current.find((drawing) => {
        const lineY = candleSeries.priceToCoordinate(drawing.price);

        return (
          lineY !== null &&
          Math.abs(param.point.y - lineY) <= 6
        );
      });

      if (clickedLine) {
        selectedHorizontalLineRef.current = clickedLine;

        setHorizontalLineDeletePosition({
          x: Math.max(8, param.point.x - 65),
          y: param.point.y,
        });

        return;
      }

      selectedHorizontalLineRef.current = null;
      setHorizontalLineDeletePosition(null);

      if (!selectedDrawingTools.includes("Horizontal Line")) return;

      const newLine = addHorizontalLine(candleSeries, price);

      if (newLine) {
        horizontalLinesRef.current.push(newLine);
        syncHorizontalLines();
      }
    };

    chart.subscribeClick(handleChartClick);

    const handleDeleteKey = (event: KeyboardEvent) => {
      if (event.key !== "Delete" && event.key !== "Backspace") {
        return;
      }

      const target = event.target as HTMLElement;

      if (
        target.closest("input, textarea, [contenteditable='true']")
      ) {
        return;
      }

      if (!selectedHorizontalLineRef.current) return;

      event.preventDefault();
      handleDeleteHorizontalLine();
    };

    window.addEventListener("keydown", handleDeleteKey);

    cleanupListeners = () => {
      chart.unsubscribeClick(handleChartClick);
      window.removeEventListener("keydown", handleDeleteKey);
    };
    };

    attachListeners();

    return () => {
      cancelled = true;
      cleanupListeners?.();
    };
  }, [selectedDrawingTools, chartInstanceRef, candleSeriesRef]);

  return {
    horizontalLinesRef,
    selectedHorizontalLineRef,
    manualHorizontalLines,
    horizontalLineDeletePosition,
    handleDeleteHorizontalLine,
  };
}
