import type { PricePoint } from "@/app/simulator/types/simulator";
import type { DetectedPattern } from "../types";
import type { CandlePathPoint } from "../helpers/buildCandlePath";

import {
  PATTERN_CONFIG,
} from "../constants";

import {
  findShapeWindows,
} from "../helpers/findShapeWindows";

import {
  calculatePatternConfidence,
} from "../confidence/calculatePatternConfidence";

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

export function detectDoubleTop(
  history: PricePoint[],
  path: CandlePathPoint[]
): DetectedPattern | null {
  if (
    !Array.isArray(history) ||
    history.length === 0 ||
    path.length < 5
  ) {
    return null;
  }

  const latestClose = Number(
    history[history.length - 1].close
  );

  if (
    !Number.isFinite(latestClose) ||
    latestClose <= 0
  ) {
    return null;
  }

  const windows =
    findShapeWindows(path, 5);

  let bestPattern:
    DetectedPattern | null = null;

  for (const window of windows) {
    const [
      start,
      firstTop,
      neckline,
      secondTop,
      current,
    ] = window;

    const formsM =
      firstTop.price > start.price &&
      neckline.price < firstTop.price &&
      secondTop.price > neckline.price &&
      current.price < secondTop.price;

    if (!formsM) {
      continue;
    }

    const topDifferencePercent =
      percentDifference(
        firstTop.price,
        secondTop.price
      );

    if (
      topDifferencePercent >
      PATTERN_CONFIG
        .DOUBLE_TOP
        .MAX_DIFFERENCE_PERCENT
    ) {
      continue;
    }

    const averageTopPrice =
      (
        firstTop.price +
        secondTop.price
      ) / 2;

    if (averageTopPrice <= 0) {
      continue;
    }

    const necklineDropPercent =
      (
        (averageTopPrice -
          neckline.price) /
        averageTopPrice
      ) * 100;

    if (
      necklineDropPercent <
      PATTERN_CONFIG
        .DOUBLE_TOP
        .MIN_NECKLINE_PERCENT
    ) {
      continue;
    }

    const firstLeg =
      neckline.index -
      firstTop.index;

    const secondLeg =
      secondTop.index -
      neckline.index;

    const shorterLeg =
      Math.min(
        firstLeg,
        secondLeg
      );

    const longerLeg =
      Math.max(
        firstLeg,
        secondLeg
      );

    const legBalance =
      longerLeg > 0
        ? shorterLeg / longerLeg
        : 0;

    if (
      legBalance <
      PATTERN_CONFIG
        .DOUBLE_TOP
        .MIN_LEG_BALANCE
    ) {
      continue;
    }

    const topResistance =
      Math.max(
        firstTop.price,
        secondTop.price
      );

    /*
     * A historical M is no longer valid when
     * the latest close has broken above both tops.
     */
    if (latestClose > topResistance) {
      continue;
    }

    const confirmed =
      latestClose < neckline.price;

    let confidence =
      calculatePatternConfidence({
        patternSimilarity:
          topDifferencePercent,

        breakoutStrength:
          necklineDropPercent,
      });

    confidence += Math.round(
      legBalance * 5
    );

    if (confirmed) {
      confidence += 10;
    }

    confidence = Math.min(
      confirmed ? 100 : 79,
      confidence
    );

    const endIndex =
      confirmed
        ? secondTop.index
        : history.length - 1;

    const candidate: DetectedPattern = {
      id: `double-top-${firstTop.time}-${secondTop.time}`,

      type: "DOUBLE_TOP",
      direction: "BEARISH",

      status: confirmed
        ? "CONFIRMED"
        : "FORMING",

      confidence,

      startIndex:
        firstTop.index,

      endIndex,

      startTime:
        firstTop.time,

      endTime: Number(
        history[endIndex].time
      ),

highPrice:
  topResistance,

lowPrice:
  neckline.price,

keyPoints: [
  {
    time: start.time,
    price: start.price,
    label: "Start",
  },
  {
    time: firstTop.time,
    price: firstTop.price,
    label: "Peak 1",
  },
  {
    time: neckline.time,
    price: neckline.price,
    label: "Neckline",
  },
  {
    time: secondTop.time,
    price: secondTop.price,
    label: "Peak 2",
  },
  {
    time: current.time,
    price: current.price,
    label: confirmed
      ? "Breakdown"
      : "Current",
  },
],

evidence: [
        "The candle path formed an M shape.",
        `The tops are ${topDifferencePercent.toFixed(
          2
        )}% apart.`,
        `The neckline is ${necklineDropPercent.toFixed(
          2
        )}% below the tops.`,
      ],

      cautions: confirmed
        ? []
        : [
            "Price has not closed below the neckline.",
          ],
    };

    if (
      !bestPattern ||
      candidate.confidence >
        bestPattern.confidence ||
      (
        candidate.confidence ===
          bestPattern.confidence &&
        candidate.endIndex >
          bestPattern.endIndex
      )
    ) {
      bestPattern = candidate;
    }
  }

  return bestPattern;
}