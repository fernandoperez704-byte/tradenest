
"use client";

import { useEffect, useState } from "react";

type HorizontalLineLabelsOverlayProps = {
  chartInstanceRef: React.RefObject<any>;
  candleSeriesRef: React.RefObject<any>;
  chartRef: React.RefObject<HTMLDivElement | null>;
  horizontalLines: Array<{
    id: string;
    price: number;
    label: string;
    labelX: number | null;
  }>;
  onSaveLabel: (id: string, label: string) => void;
  onStartEditing: () => void;
  onSetLabelPosition: (id: string, x: number) => void;
};

export default function HorizontalLineLabelsOverlay({
  chartInstanceRef,
  candleSeriesRef,
  chartRef,
  horizontalLines,
  onSaveLabel,
  onStartEditing,
  onSetLabelPosition,
}: HorizontalLineLabelsOverlayProps) {
  const [positions, setPositions] = useState<
    Array<{ id: string; y: number; label: string }>
  >([]);

  const [editingLineId, setEditingLineId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  const startEditing = (id: string, label: string) => {
    if (editingLineId && editingLineId !== id) {
      onSaveLabel(editingLineId, editingText);
    }

    onStartEditing();
    setEditingLineId(id);
    setEditingText(label);
  };

  const saveEditing = () => {
    if (!editingLineId) return;

    onSaveLabel(editingLineId, editingText);
    setEditingLineId(null);
    setEditingText("");
  };

  const cancelEditing = () => {
    setEditingLineId(null);
    setEditingText("");
  };

  useEffect(() => {
    const element = chartRef.current;

    if (!element) return;

    const handleDoubleClick = (event: MouseEvent) => {
      const candleSeries = candleSeriesRef.current;
      if (!candleSeries) return;

      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const clickedLine = horizontalLines
        .map((drawing) => ({
          drawing,
          distance: Math.abs(
            y - candleSeries.priceToCoordinate(drawing.price)
          ),
        }))
        .filter((item) => Number.isFinite(item.distance))
        .filter((item) => item.distance <= 6)
        .sort((a, b) => a.distance - b.distance)[0]?.drawing;

      if (!clickedLine) return;

      event.preventDefault();
      event.stopPropagation();

      onSetLabelPosition(clickedLine.id, x);
      startEditing(clickedLine.id, clickedLine.label);
    };

    element.addEventListener("dblclick", handleDoubleClick);

    return () => {
      element.removeEventListener("dblclick", handleDoubleClick);
    };
  }, [chartRef, candleSeriesRef, horizontalLines]);

  useEffect(() => {
    const chart = chartInstanceRef.current;
    const candleSeries = candleSeriesRef.current;

    if (!chart || !candleSeries) return;

    const updatePositions = () => {
      setPositions(
        horizontalLines.flatMap((drawing) => {
          if (!drawing.label.trim()) return [];

          const y = candleSeries.priceToCoordinate(drawing.price);

          if (y === null || !Number.isFinite(y)) return [];

          return [{
            id: drawing.id,
            y,
            label: drawing.label,
          }];
        })
      );
    };

    updatePositions();

    chart.timeScale().subscribeVisibleLogicalRangeChange(updatePositions);
    chart.subscribeCrosshairMove(updatePositions);

    return () => {
      chart.timeScale().unsubscribeVisibleLogicalRangeChange(updatePositions);
      chart.unsubscribeCrosshairMove(updatePositions);
    };
  }, [chartInstanceRef, candleSeriesRef, horizontalLines]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {horizontalLines.map((drawing) => {
        const y =
          candleSeriesRef.current?.priceToCoordinate(drawing.price);

        if (y === null || y === undefined || !Number.isFinite(y)) {
          return null;
        }

        const isEditing = editingLineId === drawing.id;

        if (!drawing.label.trim() && !isEditing) return null;

        return (
          <div
            key={drawing.id}
            className={`absolute -translate-x-1/2 -translate-y-full text-xs font-semibold text-white ${
              isEditing ? "pointer-events-auto z-50" : ""
            }`}
            style={{
              top: y,
              left: drawing.labelX ?? "50%",
            }}
          >
            {isEditing ? (
              <input
                autoFocus
                type="text"
                value={editingText}
                onChange={(event) => setEditingText(event.target.value)}
                onKeyDown={(event) => {
                  event.stopPropagation();

                  if (event.key === "Enter") {
                    saveEditing();
                  }

                  if (event.key === "Escape") {
                    cancelEditing();
                  }
                }}
                onBlur={saveEditing}
                onMouseDown={(event) => event.stopPropagation()}
                onClick={(event) => event.stopPropagation()}
                onDoubleClick={(event) => event.stopPropagation()}
                className="w-44 border-none bg-transparent p-0 text-xs font-semibold text-white outline-none"
                placeholder="Type your label..."
              />
            ) : (
              drawing.label
            )}
          </div>
        );
      })}
    </div>
  );
}
