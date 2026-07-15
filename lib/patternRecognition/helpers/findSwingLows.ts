import type { PricePoint } from "@/app/simulator/types/simulator";

export type SwingPoint = {
  index: number;
  time: number;
  price: number;
};

/**
 * Shared swing-point detection logic.
 */
function findSwings(
  history: PricePoint[],
  windowSize: number,
  type: "high" | "low"
): SwingPoint[] {
  const swings: SwingPoint[] = [];

  if (
    !Array.isArray(history) ||
    windowSize < 1 ||
    history.length < windowSize * 2 + 1
  ) {
    return swings;
  }

  for (
    let index = windowSize;
    index < history.length - windowSize;
    index++
  ) {
    const currentPrice = Number(
      history[index][type]
    );

    if (
      !Number.isFinite(currentPrice) ||
      currentPrice <= 0
    ) {
      continue;
    }

    let isSwing = true;

    for (
      let offset = 1;
      offset <= windowSize;
      offset++
    ) {
      const leftPrice = Number(
        history[index - offset][type]
      );

      const rightPrice = Number(
        history[index + offset][type]
      );

      if (
        !Number.isFinite(leftPrice) ||
        !Number.isFinite(rightPrice)
      ) {
        isSwing = false;
        break;
      }

      const isExtreme =
        type === "high"
          ? currentPrice > leftPrice &&
            currentPrice > rightPrice
          : currentPrice < leftPrice &&
            currentPrice < rightPrice;

      if (!isExtreme) {
        isSwing = false;
        break;
      }
    }

    if (!isSwing) {
      continue;
    }

    swings.push({
      index,
      time: Number(history[index].time),
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
    windowSize,
    "high"
  );
}

export function findSwingLows(
  history: PricePoint[],
  windowSize = 3
): SwingPoint[] {
  return findSwings(
    history,
    windowSize,
    "low"
  );
}