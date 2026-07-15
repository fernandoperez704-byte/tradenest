import type { PricePoint } from "@/app/simulator/types/simulator";
import type { DetectedPattern } from "./types";

import {
  buildCandlePath,
  type CandlePathPoint,
} from "./helpers/buildCandlePath";

import {
  detectDoubleBottom,
} from "./detectors/detectDoubleBottom";

import {
  detectDoubleTop,
} from "./detectors/detectDoubleTop";

const PAT_LOOKBACK = 50;
const MIN_MOVE_PERCENT = 0.75;
const SHAPE_TOLERANCE_PERCENT = 3;
const NECKLINE_THRESHOLD_PERCENT = 1.5;

type ShapeType =
  | "DOUBLE_BOTTOM"
  | "DOUBLE_TOP";

type ShapeMatcher = (
  path: CandlePathPoint[]
) => boolean;

type PatternDetector = (
  history: PricePoint[],
  lookback: number
) => DetectedPattern | null;

function percentDifference(
  first: number,
  second: number
): number {
  const average =
    (first + second) / 2;

  if (average <= 0) {
    return Infinity;
  }

  return (
    Math.abs(first - second) /
    average
  ) * 100;
}

const SHAPE_MATCHERS: Record<
  ShapeType,
  ShapeMatcher
> = {
  DOUBLE_BOTTOM: (path) => {
    if (path.length < 5) {
      return false;
    }

    const [
      first,
      firstBottom,
      neckline,
      secondBottom,
      current,
    ] = path.slice(-5);

    const formsW =
      firstBottom.price < first.price &&
      neckline.price > firstBottom.price &&
      secondBottom.price < neckline.price &&
      current.price > secondBottom.price;

    if (!formsW) {
      return false;
    }

    const bottomDifference =
      percentDifference(
        firstBottom.price,
        secondBottom.price
      );

    const averageBottom =
      (
        firstBottom.price +
        secondBottom.price
      ) / 2;

    if (averageBottom <= 0) {
      return false;
    }

    const necklineRisePercent =
      (
        (neckline.price -
          averageBottom) /
        averageBottom
      ) * 100;

    return (
      bottomDifference <=
        SHAPE_TOLERANCE_PERCENT &&
      necklineRisePercent >=
        NECKLINE_THRESHOLD_PERCENT
    );
  },

  DOUBLE_TOP: (path) => {
    if (path.length < 5) {
      return false;
    }

    const [
      first,
      firstTop,
      neckline,
      secondTop,
      current,
    ] = path.slice(-5);

    const formsM =
      firstTop.price > first.price &&
      neckline.price < firstTop.price &&
      secondTop.price > neckline.price &&
      current.price < secondTop.price;

    if (!formsM) {
      return false;
    }

    const topDifference =
      percentDifference(
        firstTop.price,
        secondTop.price
      );

    const averageTop =
      (
        firstTop.price +
        secondTop.price
      ) / 2;

    if (averageTop <= 0) {
      return false;
    }

    const necklineDropPercent =
      (
        (averageTop -
          neckline.price) /
        averageTop
      ) * 100;

    return (
      topDifference <=
        SHAPE_TOLERANCE_PERCENT &&
      necklineDropPercent >=
        NECKLINE_THRESHOLD_PERCENT
    );
  },
};

const DETECTOR_MAP: Record<
  ShapeType,
  PatternDetector
> = {
  DOUBLE_BOTTOM: detectDoubleBottom,
  DOUBLE_TOP: detectDoubleTop,
};

const SHAPE_ORDER: ShapeType[] = [
  "DOUBLE_BOTTOM",
  "DOUBLE_TOP",
];

export function detectPatterns(
  history: PricePoint[]
): DetectedPattern[] {
  if (
    !Array.isArray(history) ||
    history.length < PAT_LOOKBACK
  ) {
    return [];
  }

  const candlePath =
    buildCandlePath(history, {
      lookback: PAT_LOOKBACK,
      minimumMovePercent:
        MIN_MOVE_PERCENT,
    });

  if (candlePath.length < 5) {
    return [];
  }

  for (const shape of SHAPE_ORDER) {
    const matches =
      SHAPE_MATCHERS[shape];

    if (!matches(candlePath)) {
      continue;
    }

    const detector =
      DETECTOR_MAP[shape];

    const result = detector(
      history,
      PAT_LOOKBACK
    );

    return result ? [result] : [];
  }

  return [];
}