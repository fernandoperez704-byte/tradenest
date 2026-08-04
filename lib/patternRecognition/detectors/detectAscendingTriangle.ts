import type { PricePoint } from "@/app/simulator/types/simulator";
import type { DetectedPattern } from "../types";
import {
  buildCandlePath,
  type CandlePathPoint,
} from "../helpers/buildCandlePath";

import { findShapeWindows } from "../helpers/findShapeWindows";
import { calculatePatternConfidence } from "../confidence/calculatePatternConfidence";

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

export function detectAscendingTriangle(
  history: PricePoint[],
  _path: CandlePathPoint[]
): DetectedPattern | null {

if (
  !Array.isArray(history) ||
  history.length < 20
) {
  return null;
}

/*
 * Triangles usually develop over more candles
 * and contain smaller internal swings than
 * reversal patterns.
 */
const trianglePath =
  buildCandlePath(history, {
    lookback: 120,
    minimumMovePercent: 0.35,
  });

if (trianglePath.length < 7) {
  return null;
}

const windows =
  findShapeWindows(
    trianglePath,
    7
  );

  let bestPattern:
    DetectedPattern | null = null;

  for (
    const [
      windowIndex,
      window,
    ] of windows.entries()
  ) {
    if (
      !window ||
      window.length < 6
    ) {
      continue;
    }

const [
  start,
  firstLow,
  firstHigh,
  secondLow,
  secondHigh,
  thirdLow,
  current,
] = window;

    const debugWindow = {
      windowIndex,

      indexes: [
        firstLow.index,
        firstHigh.index,
        secondLow.index,
        secondHigh.index,
        thirdLow.index,
        current.index,
      ],

      prices: {
        firstLow:
          firstLow.price,

        firstHigh:
          firstHigh.price,

        secondLow:
          secondLow.price,

        secondHigh:
          secondHigh.price,

        thirdLow:
          thirdLow.price,

        current:
          current.price,
      },
    };

const hasCorrectOrder =
  start.index < firstLow.index &&
  firstLow.index < firstHigh.index &&
  firstHigh.index < secondLow.index &&
  secondLow.index < secondHigh.index &&
  secondHigh.index < thirdLow.index &&
  thirdLow.index <= current.index;

    if (!hasCorrectOrder) {
      console.log(
        "ASC REJECTED: ORDER",
        debugWindow
      );

      continue;
    }

    const formsAscendingTriangle =
      firstHigh.price >
        firstLow.price &&
      secondLow.price <
        firstHigh.price &&
      secondHigh.price >
        secondLow.price &&
      thirdLow.price <
        secondHigh.price &&
      current.price >
        thirdLow.price;

    if (!formsAscendingTriangle) {
      console.log(
        "ASC REJECTED: SHAPE",
        debugWindow
      );

      continue;
    }

    const resistanceDifferencePercent =
      percentDifference(
        firstHigh.price,
        secondHigh.price
      );

    const maxResistanceDifferencePercent =
      1.25;

    if (
      resistanceDifferencePercent >
      maxResistanceDifferencePercent
    ) {
      console.log(
        "ASC REJECTED: RESISTANCE",
        {
          ...debugWindow,
          resistanceDifferencePercent,
          maxResistanceDifferencePercent,
        }
      );

      continue;
    }

    const hasRisingLows =
      secondLow.price >
        firstLow.price &&
      thirdLow.price >
        secondLow.price;

    if (!hasRisingLows) {
      console.log(
        "ASC REJECTED: LOWS",
        debugWindow
      );

      continue;
    }

    const resistancePrice =
      (
        firstHigh.price +
        secondHigh.price
      ) / 2;

    const resistanceZoneHalfPercent =
      maxResistanceDifferencePercent /
      2;

    const resistanceZoneLow =
      resistancePrice *
      (
        1 -
        resistanceZoneHalfPercent /
          100
      );

    const resistanceZoneHigh =
      resistancePrice *
      (
        1 +
        resistanceZoneHalfPercent /
          100
      );

    const confirmed =
      current.price >
      resistanceZoneHigh;

    const stillForming =
      current.price >=
        thirdLow.price &&
      current.price <=
        resistanceZoneHigh;

    if (
      !confirmed &&
      !stillForming
    ) {
      console.log(
        "ASC REJECTED: STATUS",
        {
          ...debugWindow,
          resistanceZoneLow,
          resistanceZoneHigh,
          confirmed,
          stillForming,
        }
      );

      continue;
    }

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
      console.log(
        "ASC REJECTED: RANGE",
        {
          ...debugWindow,
          firstRange,
          latestRange,
        }
      );

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

    const minimumContractionPercent =
      20;

    if (
      contractionPercent <
      minimumContractionPercent
    ) {
      console.log(
        "ASC REJECTED: CONTRACTION",
        {
          ...debugWindow,
          contractionPercent,
          minimumContractionPercent,
        }
      );

      continue;
    }

    const patternWidth =
      thirdLow.index -
      firstLow.index;

    const minimumPatternWidth =
      6;

    if (
      patternWidth <
      minimumPatternWidth
    ) {
      console.log(
        "ASC REJECTED: WIDTH",
        {
          ...debugWindow,
          patternWidth,
          minimumPatternWidth,
        }
      );

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
      history[
        history.length - 1
      ];

    console.log(
      "ASC ACCEPTED",
      {
        ...debugWindow,
        resistanceDifferencePercent,
        contractionPercent,
        patternWidth,
        confirmed,
      }
    );

    const candidate:
      DetectedPattern = {
      id: `ascending-triangle-${firstLow.time}-${secondHigh.time}`,

      type:
        "ASCENDING_TRIANGLE",

      direction:
        "BULLISH",

      status: confirmed
        ? "CONFIRMED"
        : "FORMING",

      confidence,

startIndex:
  start.index,

      endIndex,

startTime:
  start.time,
      endTime: Number(
        safeHistoryItem.time
      ),

      highPrice:
        Math.max(
          firstHigh.price,
          secondHigh.price
        ),

lowPrice:
  Math.min(
    start.price,
    firstLow.price
  ),

keyPoints: [
  {
    time: start.time,
    price: start.price,
    label: "Start",
  },
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
          resistanceZoneLow,

        high:
          resistanceZoneHigh,
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
      bestPattern =
        candidate;
    }
  }

  console.log(
    "ASC FINAL RESULT",
    bestPattern
  );

  return bestPattern;
}