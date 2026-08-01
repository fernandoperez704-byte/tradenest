import type { PricePoint } from "@/app/simulator/types/simulator";
import type { DetectedPattern } from "../types";
import type { CandlePathPoint } from "../helpers/buildCandlePath";

import { findShapeWindows } from "../helpers/findShapeWindows";
import { calculatePatternConfidence } from "../confidence/calculatePatternConfidence";

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

export function detectAscendingTriangle(
  history: PricePoint[],
  path: CandlePathPoint[]
): DetectedPattern | null {
  if (
    !Array.isArray(history) ||
    history.length === 0 ||
    !Array.isArray(path) ||
    path.length < 6
  ) {
    return null;
  }

  const windows = findShapeWindows(path, 6);

  let bestPattern: DetectedPattern | null =
    null;

  for (const window of windows) {
    if (!window || window.length < 6) {
      continue;
    }

    const [
      firstLow,
      firstHigh,
      secondLow,
      secondHigh,
      thirdLow,
      current,
    ] = window;

    const hasCorrectOrder =
      firstLow.index < firstHigh.index &&
      firstHigh.index < secondLow.index &&
      secondLow.index < secondHigh.index &&
      secondHigh.index < thirdLow.index &&
      thirdLow.index <= current.index;

    if (!hasCorrectOrder) {
      continue;
    }

    const formsAscendingTriangle =
      firstHigh.price > firstLow.price &&
      secondLow.price < firstHigh.price &&
      secondHigh.price > secondLow.price &&
      thirdLow.price < secondHigh.price &&
      current.price > thirdLow.price;

    if (!formsAscendingTriangle) {
      continue;
    }

    const resistanceDifferencePercent =
      percentDifference(
        firstHigh.price,
        secondHigh.price
      );

    const maxResistanceDifferencePercent =
      0.75;

    if (
      resistanceDifferencePercent >
      maxResistanceDifferencePercent
    ) {
      continue;
    }

    const hasRisingLows =
      secondLow.price > firstLow.price &&
      thirdLow.price > secondLow.price;

    if (!hasRisingLows) {
      continue;
    }

    const resistancePrice =
      (
        firstHigh.price +
        secondHigh.price
      ) / 2;

    const firstRange =
      firstHigh.price -
      firstLow.price;

    const latestRange =
      resistancePrice -
      thirdLow.price;

    if (
      firstRange <= 0 ||
      latestRange <= 0
    ) {
      continue;
    }

    const contractionPercent =
      (
        (
          firstRange -
          latestRange
        ) /
        firstRange
      ) * 100;

    const minimumContractionPercent = 20;

    if (
      contractionPercent <
      minimumContractionPercent
    ) {
      continue;
    }

    const patternWidth =
      thirdLow.index -
      firstLow.index;

    const minimumPatternWidth = 6;

    if (
      patternWidth <
      minimumPatternWidth
    ) {
      continue;
    }

    const confirmed =
      current.price >
      resistancePrice;

    const invalidated =
      current.price <
      thirdLow.price;

    if (invalidated) {
      continue;
    }

    let confidence =
      calculatePatternConfidence({
        patternSimilarity:
          resistanceDifferencePercent,

        breakoutStrength:
          contractionPercent,
      });

    if (confirmed) {
      confidence += 10;
    }

    confidence = Math.min(
      confirmed ? 100 : 79,
      confidence
    );

    const endIndex =
      Math.min(
        current.index,
        history.length - 1
      );

    const safeHistoryItem =
      history[endIndex] ??
      history[history.length - 1];

    const candidate: DetectedPattern = {
      id: `ascending-triangle-${firstLow.time}-${secondHigh.time}`,

      type: "ASCENDING_TRIANGLE",
      direction: "BULLISH",

      status: confirmed
        ? "CONFIRMED"
        : "FORMING",

      confidence,

      startIndex: firstLow.index,
      endIndex,

      startTime: firstLow.time,
      endTime: Number(
        safeHistoryItem.time
      ),

      highPrice: Math.max(
        firstHigh.price,
        secondHigh.price
      ),

      lowPrice: firstLow.price,

      keyPoints: [
        {
          time: firstLow.time,
          price: firstLow.price,
          label: "Low 1",
        },
        {
          time: firstHigh.time,
          price: firstHigh.price,
          label: "Resistance 1",
        },
        {
          time: secondLow.time,
          price: secondLow.price,
          label: "Low 2",
        },
        {
          time: secondHigh.time,
          price: secondHigh.price,
          label: "Resistance 2",
        },
        {
          time: thirdLow.time,
          price: thirdLow.price,
          label: "Low 3",
        },
        {
          time: current.time,
          price: current.price,
          label: confirmed
            ? "Breakout"
            : "Current",
        },
      ],

      resistanceZone: {
        low:
          resistancePrice *
          (1 - 0.375 / 100),

        high:
          resistancePrice *
          (1 + 0.375 / 100),
      },

      evidence: [
        "Price tested the same resistance area multiple times.",

        `The resistance points are ${resistanceDifferencePercent.toFixed(
          2
        )}% apart.`,

        "The reaction lows are rising.",

        `The price range contracted by ${contractionPercent.toFixed(
          2
        )}%.`,
      ],

      cautions: confirmed
        ? []
        : [
            "Price has not closed above resistance.",
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