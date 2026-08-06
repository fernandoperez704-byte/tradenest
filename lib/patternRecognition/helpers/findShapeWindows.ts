import type { CandlePathPoint } from "./buildCandlePath";

export function findShapeWindows(
  path: CandlePathPoint[],
  windowSize: number
): CandlePathPoint[][] {
  if (
    !Array.isArray(path) ||
    windowSize < 1 ||
    path.length < windowSize
  ) {
    return [];
  }

  const windows: CandlePathPoint[][] = [];

  for (
    let startIndex = 0;
    startIndex <= path.length - windowSize;
    startIndex++
  ) {
    const window = path.slice(
      startIndex,
      startIndex + windowSize
    );

    const isStrictlySequential = window.every(
      (point, index) =>
        index === window.length - 1 ||
        point.index < window[index + 1].index
    );

    if (isStrictlySequential) {
      windows.push(window);
    }
  }

  return windows;
}