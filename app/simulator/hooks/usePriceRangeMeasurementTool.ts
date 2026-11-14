
"use client";

import { useEffect, useRef, useState } from "react";
import {
  createPriceRangeMeasurement,
  type PriceRangePoint,
  type PriceRangeMeasurement,
} from "../components/drawingTools/PriceRangeMeasurementTool";

type UsePriceRangeMeasurementToolProps = {
  chartInstanceRef: React.RefObject<any>;
  candleSeriesRef: React.RefObject<any>;
  selectedDrawingTools: string[];
};

export function usePriceRangeMeasurementTool({
  chartInstanceRef,
  candleSeriesRef,
  selectedDrawingTools,
}: UsePriceRangeMeasurementToolProps) {
  const priceRangeDrawingsRef = useRef<PriceRangeMeasurement[]>([]);
  const pendingPriceRangePointRef = useRef<PriceRangePoint | null>(null);
  const selectedPriceRangeRef = useRef<PriceRangeMeasurement | null>(null);

  const [priceRangePreview, setPriceRangePreview] =
    useState<PriceRangeMeasurement | null>(null);

  const [priceRangeDrawings, setPriceRangeDrawings] =
    useState<PriceRangeMeasurement[]>([]);

  const [priceRangeDeletePosition, setPriceRangeDeletePosition] =
    useState<{ x: number; y: number } | null>(null);

  const clearPriceRangeDrawings = () => {
    priceRangeDrawingsRef.current = [];
    pendingPriceRangePointRef.current = null;
    selectedPriceRangeRef.current = null;
    setPriceRangeDrawings([]);
    setPriceRangePreview(null);
    setPriceRangeDeletePosition(null);
  };

  const handleDeletePriceRangeById = (id: string) => {
    priceRangeDrawingsRef.current =
      priceRangeDrawingsRef.current.filter(
        (item) => item.id !== id
      );

    selectedPriceRangeRef.current = null;
    setPriceRangeDrawings([...priceRangeDrawingsRef.current]);
    setPriceRangeDeletePosition(null);
  };

  const handleDeletePriceRange = () => {
    const drawing = selectedPriceRangeRef.current;
    if (!drawing) return;

    priceRangeDrawingsRef.current =
      priceRangeDrawingsRef.current.filter(
        (item) => item.id !== drawing.id
      );

    selectedPriceRangeRef.current = null;
    setPriceRangeDrawings([...priceRangeDrawingsRef.current]);
    setPriceRangeDeletePosition(null);
  };

  useEffect(() => {
    if (!selectedDrawingTools.includes("Price Range Measurement")) {
      pendingPriceRangePointRef.current = null;
      selectedPriceRangeRef.current = null;
      setPriceRangePreview(null);
      setPriceRangeDeletePosition(null);
      return;
    }

    let cancelled = false;
    let frameId: number | null = null;
    let cleanupListeners: (() => void) | null = null;

    const attachListeners = () => {
      if (cancelled || cleanupListeners) return;

      const chart = chartInstanceRef.current;
      const candleSeries = candleSeriesRef.current;

      if (!chart || !candleSeries) {
        frameId = requestAnimationFrame(attachListeners);
        return;
      }

      const getPoint = (param: any): PriceRangePoint | null => {
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

      const handleCrosshairMove = (param: any) => {
        const start = pendingPriceRangePointRef.current;
        if (!start) return;

        const end = getPoint(param);
        if (!end) return;

        setPriceRangePreview(
          createPriceRangeMeasurement(start, end)
        );
      };

      const handleChartClick = (param: any) => {
        const point = getPoint(param);
        if (!point) return;

        if (!pendingPriceRangePointRef.current) {
          const clickedDrawing = [...priceRangeDrawingsRef.current]
            .reverse()
            .find((drawing) => {
              const x1 = chart.timeScale().timeToCoordinate(drawing.start.time);
              const x2 = chart.timeScale().timeToCoordinate(drawing.end.time);
              const y1 = candleSeries.priceToCoordinate(drawing.start.price);
              const y2 = candleSeries.priceToCoordinate(drawing.end.price);

              if (x1 === null || x2 === null || y1 === null || y2 === null) {
                return false;
              }

              return (
                param.point.x >= Math.min(x1, x2) &&
                param.point.x <= Math.max(x1, x2) &&
                param.point.y >= Math.min(y1, y2) &&
                param.point.y <= Math.max(y1, y2)
              );
            });

          if (clickedDrawing) {
            selectedPriceRangeRef.current = clickedDrawing;
            setPriceRangeDeletePosition({
              x: Math.max(8, param.point.x - 65),
              y: param.point.y,
            });
            return;
          }

          selectedPriceRangeRef.current = null;
          setPriceRangeDeletePosition(null);
          pendingPriceRangePointRef.current = point;
          setPriceRangePreview(null);
          return;
        }

        const drawing = createPriceRangeMeasurement(
          pendingPriceRangePointRef.current,
          point
        );

        if (drawing) {
          priceRangeDrawingsRef.current.push(drawing);
          setPriceRangeDrawings([...priceRangeDrawingsRef.current]);
        }

        pendingPriceRangePointRef.current = null;
        selectedPriceRangeRef.current = null;
        setPriceRangeDeletePosition(null);
        setPriceRangePreview(null);
      };

      chart.subscribeClick(handleChartClick);
      chart.subscribeCrosshairMove(handleCrosshairMove);

      cleanupListeners = () => {
        chart.unsubscribeClick(handleChartClick);
        chart.unsubscribeCrosshairMove(handleCrosshairMove);
        pendingPriceRangePointRef.current = null;
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
    priceRangeDrawingsRef,
    pendingPriceRangePointRef,
    selectedPriceRangeRef,
    priceRangeDrawings,
    priceRangePreview,
    priceRangeDeletePosition,
    handleDeletePriceRange,
    handleDeletePriceRangeById,
    clearPriceRangeDrawings,
  };
}
