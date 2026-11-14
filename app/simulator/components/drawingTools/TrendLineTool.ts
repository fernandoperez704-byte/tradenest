
import { LineSeries, type IChartApi, type ISeriesApi, type Time } from "lightweight-charts";

export type TrendLinePoint = {
  time: Time;
  price: number;
};

export type TrendLine = {
  id: string;
  start: TrendLinePoint;
  end: TrendLinePoint;
  series: ISeriesApi<"Line">;
};

let nextTrendLineId = 0;

export function addTrendLine(
  chart: IChartApi,
  start: TrendLinePoint,
  end: TrendLinePoint
): TrendLine | null {
  if (
    !Number.isFinite(start.price) ||
    !Number.isFinite(end.price) ||
    start.price <= 0 ||
    end.price <= 0 ||
    start.time === end.time
  ) {
    return null;
  }

  const points = [
    { time: start.time, value: start.price },
    { time: end.time, value: end.price },
  ].sort((a, b) => {
    const first = typeof a.time === "number" ? a.time : String(a.time);
    const second = typeof b.time === "number" ? b.time : String(b.time);

    return first < second ? -1 : first > second ? 1 : 0;
  });

  const series = chart.addSeries(LineSeries, {
    color: "#ffffff",
    lineWidth: 1,
    lineStyle: 0,
    priceLineVisible: false,
    lastValueVisible: false,
    crosshairMarkerVisible: false,
    autoscaleInfoProvider: () => null,
  });

  series.setData(points);

  return {
    id: `trendline-${++nextTrendLineId}`,
    start,
    end,
    series,
  };
}

export function removeTrendLine(
  chart: IChartApi,
  drawing: TrendLine
) {
  chart.removeSeries(drawing.series);
}
