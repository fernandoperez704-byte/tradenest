import type {
  CandlePathPoint,
} from "./buildCandlePath";

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
    startIndex <=
      path.length - windowSize;
    startIndex++
  ) {
    windows.push(
      path.slice(
        startIndex,
        startIndex + windowSize
      )
    );
  }

  return windows;
}