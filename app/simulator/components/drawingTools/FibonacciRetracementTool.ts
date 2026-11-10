
import {
  LineSeries,
  type IChartApi,
  type ISeriesApi,
  type Time,
} from "lightweight-charts";

export type FibonacciPoint = {
  time: Time;
  price: number;
};

export type FibonacciRetracement = {
  id: string;
  start: FibonacciPoint;
  end: FibonacciPoint;
  levels: {
    ratio: number;
    price: number;
    series: ISeriesApi<"Line">;
  }[];
};

export const FIBONACCI_LEVELS = [
  0,
  0.25,
  0.5,
  0.75,
  1,
];

export const FIBONACCI_COLORS = [
  "#ffffff",
  "#22c55e",
  "#eab308",
  "#f97316",
  "#ffffff",
];

let nextFibonacciId = 0;

export function addFibonacciRetracement(
  chart: IChartApi,
  start: FibonacciPoint,
  end: FibonacciPoint
): FibonacciRetracement | null {
  if (
    !Number.isFinite(start.price) ||
    !Number.isFinite(end.price) ||
    start.price <= 0 ||
    end.price <= 0 ||
    start.time === end.time ||
    start.price === end.price
  ) {
    return null;
  }

  const times = [start.time, end.time].sort((a, b) => {
    const first = typeof a === "number" ? a : String(a);
    const second = typeof b === "number" ? b : String(b);

    return first < second ? -1 : first > second ? 1 : 0;
  });

  const levels = FIBONACCI_LEVELS.map((ratio, index) => {
    const price = start.price + (end.price - start.price) * ratio;

    const series = chart.addSeries(LineSeries, {
      color: "rgba(0, 0, 0, 0)",
      lineWidth: 1,
      lineStyle: 0,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: false,
    });

    series.setData([
      { time: times[0], value: price },
      { time: times[1], value: price },
    ]);

    return {
      ratio,
      price,
      series,
    };
  });

  return {
    id: `fibonacci-${++nextFibonacciId}`,
    start,
    end,
    levels,
  };
}

export function removeFibonacciRetracement(
  chart: IChartApi,
  drawing: FibonacciRetracement
) {
  drawing.levels.forEach((level) => {
    chart.removeSeries(level.series);
  });
}
