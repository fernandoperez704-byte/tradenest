
import type { Time } from "lightweight-charts";

export type PriceRangePoint = {
  time: Time;
  price: number;
};

export type PriceRangeMeasurement = {
  id: string;
  start: PriceRangePoint;
  end: PriceRangePoint;
  priceChange: number;
  percentageChange: number;
  direction: "UP" | "DOWN" | "FLAT";
};

export function createPriceRangeMeasurement(
  start: PriceRangePoint,
  end: PriceRangePoint
): PriceRangeMeasurement | null {
  if (
    !Number.isFinite(start.price) ||
    !Number.isFinite(end.price) ||
    start.price <= 0 ||
    end.price <= 0
  ) {
    return null;
  }

  const priceChange = end.price - start.price;
  const percentageChange = (priceChange / start.price) * 100;

  return {
    id: crypto.randomUUID(),
    start,
    end,
    priceChange,
    percentageChange,
    direction:
      priceChange > 0
        ? "UP"
        : priceChange < 0
          ? "DOWN"
          : "FLAT",
  };
}
