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
    const windowSlice =
      path.slice(
        startIndex,
        startIndex + windowSize
      );

    const isStrictlySequential =
      windowSlice.every(
        (point, index) => {
          if (
            index ===
            windowSlice.length - 1
          ) {
            return true;
          }

          return (
            point.index <
            windowSlice[index + 1].index
          );
        }
      );

    if (!isStrictlySequential) {
      continue;
    }

    windows.push(windowSlice);
  }

  return windows;
}