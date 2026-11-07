
import type {
  IPriceLine,
  ISeriesApi,
  SeriesType,
} from "lightweight-charts";

export type HorizontalLine = {
  id: string;
  price: number;
  line: IPriceLine;
};

let nextLineId = 0;

export function addHorizontalLine(
  candleSeries: ISeriesApi<SeriesType>,
  price: number
): HorizontalLine | null {
  if (!Number.isFinite(price) || price <= 0) return null;

  const line = candleSeries.createPriceLine({
    price,
    color: "#ffffff",
    lineWidth: 1,
    lineStyle: 0,
    axisLabelVisible: true,
    title: "",
  });

  return {
    id: `horizontal-${++nextLineId}`,
    price,
    line,
  };
}

export function removeHorizontalLine(
  candleSeries: ISeriesApi<SeriesType>,
  drawing: HorizontalLine
) {
  candleSeries.removePriceLine(drawing.line);
}

export function moveHorizontalLine(
  drawing: HorizontalLine,
  price: number
) {
  if (!Number.isFinite(price) || price <= 0) return;

  drawing.line.applyOptions({ price });
  drawing.price = price;
}