import type { PricePoint } from "@/app/simulator/types/simulator";

export type CandlePathDirection = "UP" | "DOWN" | "FLAT";

export type CandlePathPoint = {
  index: number;
  time: number;
  price: number;
  direction: CandlePathDirection;
};

type BuildCandlePathOptions = {
  lookback?: number;
  minimumMovePercent?: number;
  useWicks?: boolean;
};

const getPrice = (point: PricePoint) => Number(point.close);

const getExtremePrice = (
  point: PricePoint,
  direction: "UP" | "DOWN",
  useWicks: boolean
): number => {
  if (!useWicks) return getPrice(point);

  const price = Number(
    direction === "UP" ? point.high : point.low
  );

  return Number.isFinite(price) && price > 0
    ? price
    : getPrice(point);
};

const isValid = (price: number) =>
  Number.isFinite(price) && price > 0;

export function buildCandlePath(
  history: PricePoint[],
  options: BuildCandlePathOptions = {}
): CandlePathPoint[] {
  const {
    lookback = 50,
    minimumMovePercent = 0.75,
    useWicks = false,
  } = options;

  if (!Array.isArray(history) || history.length < 3) {
    return [];
  }

  const startIndex = Math.max(0, history.length - lookback);
  const data = history.slice(startIndex);

  if (data.length === 0) return [];

  const firstPrice = getPrice(data[0]);

  if (!isValid(firstPrice)) return [];

  const path: CandlePathPoint[] = [
    {
      index: startIndex,
      time: Number(data[0].time),
      price: firstPrice,
      direction: "FLAT",
    },
  ];

  let anchorIndex = 0;
  let extremeIndex = 0;
  let activeDirection: "UP" | "DOWN" | null = null;

  for (let index = 1; index < data.length; index++) {
    const price = getPrice(data[index]);

    if (!isValid(price)) continue;

    const anchorPrice = getPrice(data[anchorIndex]);

    if (!isValid(anchorPrice)) continue;

    if (!activeDirection) {
      const currentHigh = getExtremePrice(
        data[index],
        "UP",
        useWicks
      );

      const currentLow = getExtremePrice(
        data[index],
        "DOWN",
        useWicks
      );

      const upwardMovePercent =
        ((currentHigh - anchorPrice) / anchorPrice) * 100;

      const downwardMovePercent =
        ((currentLow - anchorPrice) / anchorPrice) * 100;

      if (
        upwardMovePercent >= minimumMovePercent ||
        downwardMovePercent <= -minimumMovePercent
      ) {
        activeDirection =
          upwardMovePercent >= Math.abs(downwardMovePercent)
            ? "UP"
            : "DOWN";

        extremeIndex = index;
      }

      continue;
    }

    const extremePrice = getExtremePrice(
      data[extremeIndex],
      activeDirection,
      useWicks
    );

    if (!isValid(extremePrice)) continue;

    if (activeDirection === "UP") {
      const currentHigh = getExtremePrice(
        data[index],
        "UP",
        useWicks
      );

      if (currentHigh >= extremePrice) {
        extremeIndex = index;
        continue;
      }

      const currentLow = getExtremePrice(
        data[index],
        "DOWN",
        useWicks
      );

      const reversalPercent =
        ((currentLow - extremePrice) / extremePrice) * 100;

      if (reversalPercent <= -minimumMovePercent) {
        addPoint(path, data, startIndex, extremeIndex, "UP", useWicks);

        anchorIndex = extremeIndex;
        activeDirection = "DOWN";
        extremeIndex = index;
      }

      continue;
    }

    const currentLow = getExtremePrice(
      data[index],
      "DOWN",
      useWicks
    );

    if (currentLow <= extremePrice) {
      extremeIndex = index;
      continue;
    }

    const currentHigh = getExtremePrice(
      data[index],
      "UP",
      useWicks
    );

    const reversalPercent =
      ((currentHigh - extremePrice) / extremePrice) * 100;

    if (reversalPercent >= minimumMovePercent) {
      addPoint(path, data, startIndex, extremeIndex, "DOWN", useWicks);

      anchorIndex = extremeIndex;
      activeDirection = "UP";
      extremeIndex = index;
    }
  }

  const finalLocalIndex = data.length - 1;
  const finalGlobalIndex = startIndex + finalLocalIndex;
  const finalPrice = getPrice(data[finalLocalIndex]);
  const lastPoint = path[path.length - 1];

  if (
    isValid(finalPrice) &&
    lastPoint.index !== finalGlobalIndex
  ) {
    path.push({
      index: finalGlobalIndex,
      time: Number(data[finalLocalIndex].time),
      price: finalPrice,
      direction: activeDirection ?? "FLAT",
    });
  }

  return path;
}

function addPoint(
  path: CandlePathPoint[],
  data: PricePoint[],
  offset: number,
  index: number,
  direction: CandlePathDirection,
  useWicks = false
): void {
  const price =
    direction === "UP" || direction === "DOWN"
      ? getExtremePrice(data[index], direction, useWicks)
      : getPrice(data[index]);

  if (!isValid(price)) return;

  const globalIndex = offset + index;
  const lastPoint = path[path.length - 1];

  if (lastPoint && lastPoint.index >= globalIndex) {
    return;
  }

  path.push({
    index: globalIndex,
    time: Number(data[index].time),
    price,
    direction,
  });
}