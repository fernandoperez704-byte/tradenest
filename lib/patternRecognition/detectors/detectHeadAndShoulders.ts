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

export function detectHeadAndShoulders(
  history: PricePoint[],
  path: CandlePathPoint[]
): DetectedPattern | null {
  if (
    !Array.isArray(history) ||
    history.length === 0 ||
    path.length < 7
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
    findShapeWindows(path, 7);

  let bestPattern:
    DetectedPattern | null = null;

  for (const window of windows) {
    const [
      start,
      leftShoulder,
      necklineLowOne,
      head,
      necklineLowTwo,
      rightShoulder,
      current,
    ] = window;

    const hasCorrectDirection =
      leftShoulder.price > start.price &&
      necklineLowOne.price <
        leftShoulder.price &&
      head.price >
        necklineLowOne.price &&
      necklineLowTwo.price <
        head.price &&
      rightShoulder.price >
        necklineLowTwo.price &&
      current.price <
        rightShoulder.price;

    if (!hasCorrectDirection) {
      continue;
    }

    const headIsHighest =
      head.price >
        leftShoulder.price &&
      head.price >
        rightShoulder.price;

    if (!headIsHighest) {
      continue;
    }

    const shoulderDifferencePercent =
      percentDifference(
        leftShoulder.price,
        rightShoulder.price
      );

    if (
      shoulderDifferencePercent >
      PATTERN_CONFIG
        .HEAD_AND_SHOULDERS
        .MAX_SHOULDER_DIFFERENCE_PERCENT
    ) {
      continue;
    }

    const necklineDifferencePercent =
      percentDifference(
        necklineLowOne.price,
        necklineLowTwo.price
      );

    if (
      necklineDifferencePercent >
      PATTERN_CONFIG
        .HEAD_AND_SHOULDERS
        .MAX_NECKLINE_DIFFERENCE_PERCENT
    ) {
      continue;
    }

    const averageShoulderPrice =
      (
        leftShoulder.price +
        rightShoulder.price
      ) / 2;

    if (averageShoulderPrice <= 0) {
      continue;
    }

    const headHeightPercent =
      (
        (head.price -
          averageShoulderPrice) /
        averageShoulderPrice
      ) * 100;

    if (
      headHeightPercent <
      PATTERN_CONFIG
        .HEAD_AND_SHOULDERS
        .MIN_HEAD_HEIGHT_PERCENT
    ) {
      continue;
    }

    const necklinePrice =
      (
        necklineLowOne.price +
        necklineLowTwo.price
      ) / 2;

    /*
     * A historical H&S is invalid if the
     * latest close has moved above the head.
     */
    if (latestClose > head.price) {
      continue;
    }

    const confirmed =
      latestClose < necklinePrice;

    let confidence =
      calculatePatternConfidence({
        patternSimilarity:
          shoulderDifferencePercent,

        breakoutStrength:
          headHeightPercent,
      });

    if (necklineDifferencePercent <= 1) {
      confidence += 5;
    } else if (
      necklineDifferencePercent <= 2
    ) {
      confidence += 3;
    }

    if (confirmed) {
      confidence += 10;
    }

    confidence = Math.min(
      confirmed ? 100 : 79,
      confidence
    );

    const endIndex =
      confirmed
        ? rightShoulder.index
        : history.length - 1;

    const candidate: DetectedPattern = {
      id: `head-and-shoulders-${leftShoulder.time}-${head.time}-${rightShoulder.time}`,

      type: "HEAD_AND_SHOULDERS",
      direction: "BEARISH",

      status: confirmed
        ? "CONFIRMED"
        : "FORMING",

      confidence,

      startIndex:
        leftShoulder.index,

      endIndex,

      startTime:
        leftShoulder.time,

      endTime: Number(
        history[endIndex].time
      ),
highPrice:
  head.price,

lowPrice:
  Math.min(
    necklineLowOne.price,
    necklineLowTwo.price
  ),

keyPoints: [
  {
    time: start.time,
    price: start.price,
    label: "Start",
  },
  {
    time: leftShoulder.time,
    price: leftShoulder.price,
    label: "Left Shoulder",
  },
  {
    time: necklineLowOne.time,
    price: necklineLowOne.price,
    label: "Neckline 1",
  },
  {
    time: head.time,
    price: head.price,
    label: "Head",
  },
  {
    time: necklineLowTwo.time,
    price: necklineLowTwo.price,
    label: "Neckline 2",
  },
  {
    time: rightShoulder.time,
    price: rightShoulder.price,
    label: "Right Shoulder",
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

        "The candle path formed a left shoulder, head, and right shoulder.",
        `The shoulders are ${shoulderDifferencePercent.toFixed(
          2
        )}% apart.`,
        `The head is ${headHeightPercent.toFixed(
          2
        )}% above the average shoulder height.`,
        `The neckline points are ${necklineDifferencePercent.toFixed(
          2
        )}% apart.`,
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