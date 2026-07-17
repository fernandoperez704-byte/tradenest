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
  const average = (first + second) / 2;

  if (average <= 0) {
    return Infinity;
  }

  return (
    Math.abs(first - second) /
    average
  ) * 100;
}

export function detectDoubleBottom(
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
      firstBottom,
      neckline,
      secondBottom,
      current,
    ] = window;

    const formsW =
      firstBottom.price < start.price &&
      neckline.price > firstBottom.price &&
      secondBottom.price < neckline.price &&
      current.price > secondBottom.price;

    if (!formsW) {
      continue;
    }

    const bottomDifferencePercent =
      percentDifference(
        firstBottom.price,
        secondBottom.price
      );

    if (
      bottomDifferencePercent >
      PATTERN_CONFIG
        .DOUBLE_BOTTOM
        .MAX_DIFFERENCE_PERCENT
    ) {
      continue;
    }

    const averageBottomPrice =
      (
        firstBottom.price +
        secondBottom.price
      ) / 2;

    if (averageBottomPrice <= 0) {
      continue;
    }

    const necklineRisePercent =
      (
        (neckline.price -
          averageBottomPrice) /
        averageBottomPrice
      ) * 100;

    if (
      necklineRisePercent <
      PATTERN_CONFIG
        .DOUBLE_BOTTOM
        .MIN_NECKLINE_PERCENT
    ) {
      continue;
    }

    const firstLeg =
      neckline.index -
      firstBottom.index;

    const secondLeg =
      secondBottom.index -
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
        .DOUBLE_BOTTOM
        .MIN_LEG_BALANCE
    ) {
      continue;
    }

    const bottomSupport =
      Math.min(
        firstBottom.price,
        secondBottom.price
      );

    if (latestClose < bottomSupport) {
      continue;
    }

    const confirmed =
      latestClose > neckline.price;

    let confidence =
      calculatePatternConfidence({
        patternSimilarity:
          bottomDifferencePercent,

        breakoutStrength:
          necklineRisePercent,
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
        ? secondBottom.index
        : history.length - 1;

    const candidate: DetectedPattern = {
      id: `double-bottom-${firstBottom.time}-${secondBottom.time}`,

      type: "DOUBLE_BOTTOM",
      direction: "BULLISH",

      status: confirmed
        ? "CONFIRMED"
        : "FORMING",

      confidence,

      startIndex:
        firstBottom.index,

      endIndex,

      startTime:
        firstBottom.time,

      endTime: Number(
        history[endIndex].time
      ),

      highPrice:
        neckline.price,

      lowPrice:
        bottomSupport,

      evidence: [
        "The candle path formed a W shape.",
        `The bottoms are ${bottomDifferencePercent.toFixed(
          2
        )}% apart.`,
        `The neckline is ${necklineRisePercent.toFixed(
          2
        )}% above the bottoms.`,
      ],

      cautions: confirmed
        ? []
        : [
            "Price has not closed above the neckline.",
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