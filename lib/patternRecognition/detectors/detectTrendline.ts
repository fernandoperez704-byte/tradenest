import type { PricePoint } from "@/app/simulator/types/simulator";
import type { CandlePathPoint } from "../helpers/buildCandlePath";

export type DetectedTrendline = {
  direction: "BULLISH" | "BEARISH";
  upper: {
    startTime: number;
    startPrice: number;
    endTime: number;
    endPrice: number;
  };
  lower: {
    startTime: number;
    startPrice: number;
    endTime: number;
    endPrice: number;
  };
};

export function detectTrendline(
  history: PricePoint[],
  _path: CandlePathPoint[],
  structure?: string
): DetectedTrendline | null {
  if (
    history.length < 25 ||
    !["BULLISH", "BEARISH"].includes(structure || "")
  ) {
    return null;
  }

  const bullish = structure === "BULLISH";

  // Focus only on the current active move.
  const recent = history.slice(-40);
  const latestIndex = recent.length - 1;

  if (latestIndex < 12) return null;

  // Don't allow the current few candles to become the start.
  const startSearch = recent.slice(0, -6);

  let startIndex = 0;

  for (let i = 1; i < startSearch.length; i++) {
    const better = bullish
      ? startSearch[i].low < startSearch[startIndex].low
      : startSearch[i].high > startSearch[startIndex].high;

    if (better) startIndex = i;
  }

  // Find meaningful swings only AFTER the active move started.
  const swings = recent
    .map((candle, index) => ({ candle, index }))
    .filter(({ candle, index }) => {
      if (
        index <= startIndex + 3 ||
        index < 2 ||
        index >= recent.length - 2
      ) {
        return false;
      }

      return bullish
        ? candle.low < recent[index - 1].low &&
            candle.low < recent[index - 2].low &&
            candle.low < recent[index + 1].low &&
            candle.low < recent[index + 2].low
        : candle.high > recent[index - 1].high &&
            candle.high > recent[index - 2].high &&
            candle.high > recent[index + 1].high &&
            candle.high > recent[index + 2].high;
    });

  // Use the newest valid structural touch.
  const anchor = [...swings]
    .reverse()
    .find(({ index, candle }) => {
      if (index - startIndex < 6) return false;

      return bullish
        ? candle.low > recent[startIndex].low
        : candle.high < recent[startIndex].high;
    });

  if (!anchor) return null;

  const startPrice = bullish
    ? recent[startIndex].low
    : recent[startIndex].high;

  const anchorPrice = bullish
    ? anchor.candle.low
    : anchor.candle.high;

  const slope =
    (anchorPrice - startPrice) /
    (anchor.index - startIndex);

  const projectedEnd =
    startPrice +
    slope * (latestIndex - startIndex);

  // Measure the opposite side only inside THIS active move.
  const offsets: number[] = [];

  for (let i = startIndex; i <= latestIndex; i++) {
    const projected =
      startPrice +
      slope * (i - startIndex);

    const offset = bullish
      ? recent[i].high - projected
      : projected - recent[i].low;

    if (offset > 0) offsets.push(offset);
  }

  if (!offsets.length) return null;

  offsets.sort((a, b) => a - b);

  // Ignore one crazy wick, but contain most of the move.
  const offsetIndex = Math.floor(
    (offsets.length - 1) * 0.9
  );

  const channelOffset = offsets[offsetIndex];

  const startTime = Number(recent[startIndex].time);
  const endTime = Number(recent[latestIndex].time);

  if (bullish) {
    return {
      direction: "BULLISH",

      lower: {
        startTime,
        startPrice,
        endTime,
        endPrice: projectedEnd,
      },

      upper: {
        startTime,
        startPrice: startPrice + channelOffset,
        endTime,
        endPrice: projectedEnd + channelOffset,
      },
    };
  }

  return {
    direction: "BEARISH",

    upper: {
      startTime,
      startPrice,
      endTime,
      endPrice: projectedEnd,
    },

    lower: {
      startTime,
      startPrice: startPrice - channelOffset,
      endTime,
      endPrice: projectedEnd - channelOffset,
    },
  };
}


