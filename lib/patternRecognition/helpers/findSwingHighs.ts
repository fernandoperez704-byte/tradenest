import type { PricePoint } from "@/app/simulator/types/simulator";

export type SwingPoint = {
  index: number;
  time: number;
  price: number;
};

type PriceField = "high" | "low";

function findSwings(
  history: PricePoint[],
  field: PriceField,
  windowSize: number,
  isSwing: (
    current: number,
    neighbors: number[]
  ) => boolean
): SwingPoint[] {
  const swings: SwingPoint[] = [];

  if (
    !Array.isArray(history) ||
    history.length <
      windowSize * 2 + 1
  ) {
    return swings;
  }

  for (
    let index = windowSize;
    index <
    history.length - windowSize;
    index++
  ) {
    const currentPrice = Number(
      history[index][field]
    );

    if (
      !Number.isFinite(currentPrice)
    ) {
      continue;
    }

    const neighbors: number[] = [];

    let validNeighbors = true;

    for (
      let offset = 1;
      offset <= windowSize;
      offset++
    ) {
      const leftPrice = Number(
        history[index - offset][field]
      );

      const rightPrice = Number(
        history[index + offset][field]
      );

      if (
        !Number.isFinite(leftPrice) ||
        !Number.isFinite(rightPrice)
      ) {
        validNeighbors = false;
        break;
      }

      neighbors.push(
        leftPrice,
        rightPrice
      );
    }

    if (!validNeighbors) {
      continue;
    }

    if (
      !isSwing(
        currentPrice,
        neighbors
      )
    ) {
      continue;
    }

    swings.push({
      index,
      time: Number(
        history[index].time
      ),
      price: currentPrice,
    });
  }

  return swings;
}

export function findSwingHighs(
  history: PricePoint[],
  windowSize = 3
): SwingPoint[] {
  return findSwings(
    history,
    "high",
    windowSize,
    (current, neighbors) =>
      neighbors.every(
        (neighbor) =>
          current > neighbor
      )
  );
}

export function findSwingLows(
  history: PricePoint[],
  windowSize = 3
): SwingPoint[] {
  return findSwings(
    history,
    "low",
    windowSize,
    (current, neighbors) =>
      neighbors.every(
        (neighbor) =>
          current < neighbor
      )
  );
}