import type { PricePoint } from "@/app/simulator/types/simulator";
import type { DetectedPattern } from "../types";
import type { CandlePathPoint } from "../helpers/buildCandlePath";

import { PATTERN_CONFIG } from "../constants";
import { findShapeWindows } from "../helpers/findShapeWindows";
import { calculatePatternConfidence } from "../confidence/calculatePatternConfidence";

function percentDifference(first: number, second: number): number {
  const average = (first + second) / 2;
  if (average <= 0) return Infinity;

  return (Math.abs(first - second) / average) * 100;
}

export function detectHeadAndShoulders(
  history: PricePoint[],
  path: CandlePathPoint[]
): DetectedPattern | null {
  if (
    !Array.isArray(history) ||
    history.length === 0 ||
    !Array.isArray(path) ||
    path.length < 7
  ) {
    return null;
  }

  const windows = findShapeWindows(path, 7);
  let bestPattern: DetectedPattern | null = null;

  for (const window of windows) {
    if (!window || window.length < 7) continue;

    const [
      start,
      leftShoulder,
      necklineLowOne,
      head,
      necklineLowTwo,
      rightShoulder,
      current,
    ] = window;

    const hasCorrectOrder =
      start.index < leftShoulder.index &&
      leftShoulder.index < necklineLowOne.index &&
      necklineLowOne.index < head.index &&
      head.index < necklineLowTwo.index &&
      necklineLowTwo.index < rightShoulder.index &&
      rightShoulder.index <= current.index;

    if (!hasCorrectOrder) continue;

    const priorTrendLookback = 12;
    const priorTrendStartIndex = Math.max(
      0,
      start.index - priorTrendLookback
    );

    if (priorTrendStartIndex === start.index) continue;

    const priorTrendStartClose = Number(
      history[priorTrendStartIndex]?.close
    );

    const patternStartClose = Number(
      history[start.index]?.close
    );

    if (
      !Number.isFinite(priorTrendStartClose) ||
      !Number.isFinite(patternStartClose) ||
      priorTrendStartClose <= 0 ||
      patternStartClose <= 0
    ) {
      continue;
    }

    const priorMovePercent =
      ((patternStartClose - priorTrendStartClose) /
        priorTrendStartClose) *
      100;

    const minimumPriorUptrendPercent = 2;

    if (priorMovePercent < minimumPriorUptrendPercent) {
      continue;
    }

    const hasCorrectDirection =
      leftShoulder.price > start.price &&
      necklineLowOne.price < leftShoulder.price &&
      head.price > necklineLowOne.price &&
      necklineLowTwo.price < head.price &&
      rightShoulder.price > necklineLowTwo.price &&
      current.price < rightShoulder.price;

    if (!hasCorrectDirection) continue;

    const headIsHighest =
      head.price > leftShoulder.price &&
      head.price > rightShoulder.price;

    if (!headIsHighest) continue;

    const shoulderDifferencePercent = percentDifference(
      leftShoulder.price,
      rightShoulder.price
    );

    const maxShoulderDifferencePercent = 1;

    if (
      shoulderDifferencePercent >
      maxShoulderDifferencePercent
    ) {
      continue;
    }

    const necklineDifferencePercent = percentDifference(
      necklineLowOne.price,
      necklineLowTwo.price
    );

    const maxNecklineDifferencePercent = 1;

    if (
      necklineDifferencePercent >
      maxNecklineDifferencePercent
    ) {
      continue;
    }

    const leftPatternLength =
      head.index - leftShoulder.index;

    const rightPatternLength =
      rightShoulder.index - head.index;

    const shorterSide = Math.min(
      leftPatternLength,
      rightPatternLength
    );

    const longerSide = Math.max(
      leftPatternLength,
      rightPatternLength
    );

    const sideBalance =
      longerSide > 0
        ? shorterSide / longerSide
        : 0;

    const minimumSideBalance = 0.5;

    if (sideBalance < minimumSideBalance) {
      continue;
    }

    const averageShoulderPrice =
      (leftShoulder.price + rightShoulder.price) / 2;

    if (averageShoulderPrice <= 0) continue;

    const headHeightPercent =
      ((head.price - averageShoulderPrice) /
        averageShoulderPrice) *
      100;

    if (
      headHeightPercent <
      PATTERN_CONFIG.HEAD_AND_SHOULDERS.MIN_HEAD_HEIGHT_PERCENT
    ) {
      continue;
    }

    const necklinePrice =
      (necklineLowOne.price + necklineLowTwo.price) / 2;

    const invalidated =
      current.price > head.price;

    if (invalidated) continue;

    const confirmed =
      current.price < necklinePrice;

    let confidence = calculatePatternConfidence({
      patternSimilarity: shoulderDifferencePercent,
      breakoutStrength: headHeightPercent,
    });

    if (necklineDifferencePercent <= 0.5) {
      confidence += 5;
    } else if (necklineDifferencePercent <= 1) {
      confidence += 3;
    }

    confidence += Math.round(sideBalance * 5);

    if (priorMovePercent >= 5) {
      confidence += 5;
    } else if (priorMovePercent >= 3) {
      confidence += 3;
    }

    if (confirmed) confidence += 10;

    confidence = Math.min(
      confirmed ? 100 : 79,
      confidence
    );

    const endIndex = Math.min(
      current.index,
      history.length - 1
    );

    const candidate: DetectedPattern = {
      id: `head-and-shoulders-${leftShoulder.time}-${head.time}-${rightShoulder.time}`,
      type: "HEAD_AND_SHOULDERS",
      direction: "BEARISH",
      status: confirmed ? "CONFIRMED" : "FORMING",
      confidence,

      startIndex: start.index,
      endIndex,

      startTime: start.time,
      endTime: current.time,

      highPrice: head.price,
      lowPrice: Math.min(
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
          label: confirmed ? "Breakdown" : "Current",
        },
      ],

      evidence: [
        "The candle path formed a left shoulder, head, and right shoulder.",
        `Price rose ${priorMovePercent.toFixed(2)}% before the pattern began.`,
        `The shoulders are ${shoulderDifferencePercent.toFixed(2)}% apart.`,
        `The head is ${headHeightPercent.toFixed(2)}% above the average shoulder height.`,
        `The neckline points are ${necklineDifferencePercent.toFixed(2)}% apart.`,
        `The pattern timing balance is ${(sideBalance * 100).toFixed(0)}%.`,
      ],

      cautions: confirmed
        ? []
        : ["Price has not closed below the neckline."],
    };

    if (!bestPattern) {
      bestPattern = candidate;
      continue;
    }

    const candidateIsNewer =
      candidate.endIndex > bestPattern.endIndex;

    const sameEndButConfirmed =
      candidate.endIndex === bestPattern.endIndex &&
      candidate.status === "CONFIRMED" &&
      bestPattern.status !== "CONFIRMED";

    const sameEndAndStatusButHigherConfidence =
      candidate.endIndex === bestPattern.endIndex &&
      candidate.status === bestPattern.status &&
      candidate.confidence > bestPattern.confidence;

    if (
      candidateIsNewer ||
      sameEndButConfirmed ||
      sameEndAndStatusButHigherConfidence
    ) {
      bestPattern = candidate;
    }
  }

  return bestPattern;
}