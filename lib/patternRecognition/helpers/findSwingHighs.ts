import type { PricePoint } from "@/app/simulator/types/simulator";

export type SwingPoint = {
  index: number;
  time: number;
  price: number;
};

export function findSwingHighs(
  history: PricePoint[],
  windowSize = 3
): SwingPoint[] {
  const swingHighs: SwingPoint[] = [];

  for (
    let index = windowSize;
    index < history.length - windowSize;
    index++
  ) {
    const currentHigh = Number(history[index].high);

    let isSwingHigh = true;

    for (
      let offset = 1;
      offset <= windowSize;
      offset++
    ) {
      const leftHigh = Number(
        history[index - offset].high
      );

      const rightHigh = Number(
        history[index + offset].high
      );

      if (
        currentHigh <= leftHigh ||
        currentHigh <= rightHigh
      ) {
        isSwingHigh = false;
        break;
      }
    }

    if (!isSwingHigh) continue;

    swingHighs.push({
      index,
      time: Number(history[index].time),
      price: currentHigh,
    });
  }

  return swingHighs;
}