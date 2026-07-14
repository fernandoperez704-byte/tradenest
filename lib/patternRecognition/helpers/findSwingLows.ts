import type { PricePoint } from "@/app/simulator/types/simulator";

export type SwingPoint = {
  index: number;
  time: number;
  price: number;
};

export function findSwingLows(
  history: PricePoint[],
  windowSize = 3
): SwingPoint[] {
  const swingLows: SwingPoint[] = [];

  for (
    let index = windowSize;
    index < history.length - windowSize;
    index++
  ) {
    const currentLow = Number(history[index].low);

    let isSwingLow = true;

    for (
      let offset = 1;
      offset <= windowSize;
      offset++
    ) {
      const leftLow = Number(
        history[index - offset].low
      );

      const rightLow = Number(
        history[index + offset].low
      );

      if (
        currentLow >= leftLow ||
        currentLow >= rightLow
      ) {
        isSwingLow = false;
        break;
      }
    }

    if (!isSwingLow) continue;

    swingLows.push({
      index,
      time: Number(history[index].time),
      price: currentLow,
    });
  }

  return swingLows;
}