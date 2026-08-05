import type { PricePoint } from "@/app/simulator/types/simulator";
import type { DetectedPattern } from "../types";

import {
  buildCandlePath,
  type CandlePathPoint,
} from "../helpers/buildCandlePath";

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

function isLocalHigh(
  previous: CandlePathPoint,
  current: CandlePathPoint,
  next: CandlePathPoint
): boolean {
  return (
    current.price > previous.price &&
    current.price > next.price
  );
}

function isLocalLow(
  previous: CandlePathPoint,
  current: CandlePathPoint,
  next: CandlePathPoint
): boolean {
  return (
    current.price < previous.price &&
    current.price < next.price
  );
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

  const latestClose = Number(
    history[history.length - 1]?.close
  );

  if (
    !Number.isFinite(latestClose) ||
    latestClose <= 0
  ) {
    return null;
  }

  /*
   * Triangles need a longer and more
   * sensitive path than reversal patterns.
   */
  const trianglePath =
    buildCandlePath(history, {
      lookback: 120,
      minimumMovePercent: 0.35,
    });

  if (trianglePath.length < 5) {
    return null;
  }

  const latestPathPoint =
    trianglePath[
      trianglePath.length - 1
    ];

  const maximumPathPoints = 16;

  const firstPossibleStart =
    Math.max(
      0,
      trianglePath.length -
        maximumPathPoints
    );

  let bestPattern:
    DetectedPattern | null = null;

  /*
   * Every candidate ends at the latest
   * available path point.
   *
   * The starting point can vary, so the
   * detector is no longer locked to exactly
   * six or seven pivots.
   */
  for (
    let pathStartIndex =
      firstPossibleStart;
    pathStartIndex <=
      trianglePath.length - 5;
    pathStartIndex++
  ) {
    const segment =
      trianglePath.slice(
        pathStartIndex
      );

    if (segment.length < 5) {
      continue;
    }

    const localHighs:
      CandlePathPoint[] = [];

    const localLows:
      CandlePathPoint[] = [];

    /*
     * Include the first segment point as a
     * possible structural low.
     */
    if (
      segment.length >= 2 &&
      segment[0].price <
        segment[1].price
    ) {
      localLows.push(
        segment[0]
      );
    }

    for (
      let index = 1;
      index <
        segment.length - 1;
      index++
    ) {
      const previous =
        segment[index - 1];

      const current =
        segment[index];

      const next =
        segment[index + 1];

      if (
        isLocalHigh(
          previous,
          current,
          next
        )
      ) {
        localHighs.push(
          current
        );
      }

      if (
        isLocalLow(
          previous,
          current,
          next
        )
      ) {
        localLows.push(
          current
        );
      }
    }

    if (
      localHighs.length < 2 ||
      localLows.length < 2
    ) {
      continue;
    }

    /*
     * Find the largest group of highs that
     * tested the same resistance zone.
     */
    const maxResistanceDifferencePercent =
      1.25;

    let resistanceTouches:
      CandlePathPoint[] = [];

    for (
      const anchorHigh of
      localHighs
    ) {
      const matchingHighs =
        localHighs.filter(
          (high) =>
            percentDifference(
              anchorHigh.price,
              high.price
            ) <=
            maxResistanceDifferencePercent
        );

      if (
        matchingHighs.length >
        resistanceTouches.length
      ) {
        resistanceTouches =
          matchingHighs;
      }
    }

    if (
      resistanceTouches.length < 2
    ) {
      continue;
    }

    resistanceTouches.sort(
      (first, second) =>
        first.index -
        second.index
    );

    const firstResistance =
      resistanceTouches[0];

    const secondResistance =
      resistanceTouches[1];

    /*
     * The triangle must begin before its
     * first resistance test.
     */
const startSearchIndex = Math.max(
  0,
  firstResistance.index - 36
);

const startCandidates = trianglePath.filter(
  (point) =>
    point.index >= startSearchIndex &&
    point.index < firstResistance.index
);

if (startCandidates.length === 0) {
  continue;
}

const patternStart = startCandidates.reduce(
  (lowest, point) =>
    point.price < lowest.price
      ? point
      : lowest
);

    const risingLows =
      localLows.filter(
        (low) =>
          low.index >=
            patternStart.index &&
          low.index <
            latestPathPoint.index
      );

    if (risingLows.length < 2) {
      continue;
    }

    const hasRisingLows =
      risingLows.every(
        (low, index) => {
          if (index === 0) {
            return true;
          }

          return (
            low.price >
            risingLows[
              index - 1
            ].price
          );
        }
      );

    if (!hasRisingLows) {
      continue;
    }

    const resistancePrice =
      resistanceTouches.reduce(
        (total, high) =>
          total + high.price,
        0
      ) /
      resistanceTouches.length;

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

    const lastRisingLow =
      risingLows[
        risingLows.length - 1
      ];

    const firstRange =
      resistancePrice -
      patternStart.price;

    const latestRange =
      resistancePrice -
      lastRisingLow.price;

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

    const minimumContractionPercent =
      15;

    if (
      contractionPercent <
      minimumContractionPercent
    ) {
      continue;
    }

    const patternWidth =
      latestPathPoint.index -
      patternStart.index;

    const minimumPatternWidth =
      8;

    if (
      patternWidth <
      minimumPatternWidth
    ) {
      continue;
    }

    /*
     * Preserve a confirmed pattern after the
     * breakout occurs. Do not require the
     * newest candle to remain above resistance.
     */
    const breakoutIndex =
      history.findIndex(
        (candle, index) =>
          index >
            secondResistance.index &&
          Number(candle.close) >
            resistanceZoneHigh
      );

    const confirmed =
      breakoutIndex !== -1;

const breakoutPathPoint =
  confirmed
    ? trianglePath.find(
        (point) =>
          point.index >= breakoutIndex
      ) ?? latestPathPoint
    : null;

const formationEndPoint =
  breakoutPathPoint ??
  latestPathPoint;      

    /*
     * Before confirmation, reject the setup
     * when the latest close loses the newest
     * rising low.
     */
    if (
      !confirmed &&
      latestClose <
        lastRisingLow.price
    ) {
      continue;
    }

    let confidence =
      calculatePatternConfidence({
        patternSimilarity:
          percentDifference(
            firstResistance.price,
            secondResistance.price
          ),

        breakoutStrength:
          contractionPercent,
      });

    confidence += Math.min(
      9,
      resistanceTouches.length *
        3
    );

    confidence += Math.min(
      8,
      risingLows.length * 2
    );

    if (confirmed) {
      confidence += 10;
    }

    confidence = Math.min(
      confirmed ? 100 : 79,
      confidence
    );

    /*
     * Keep every path point in the formation
     * so the overlay does not skip its
     * development.
     */
const formationPoints = trianglePath.filter(
  (point) =>
    point.index >= patternStart.index &&
    point.index <= formationEndPoint.index
);

    const labels =
      new Map<number, string>();

    labels.set(
      patternStart.index,
      "Start"
    );

    labels.set(
      firstResistance.index,
      "Resistance 1"
    );

    labels.set(
      secondResistance.index,
      "Resistance 2"
    );

    risingLows
      .slice(1, 4)
      .forEach(
        (low, index) => {
          labels.set(
            low.index,
            `Low ${index + 1}`
          );
        }
      );

labels.set(
  formationEndPoint.index,
  confirmed
    ? "Breakout"
    : "Current"
);

const candidate: DetectedPattern = {
  id: `ascending-triangle-${patternStart.time}-${firstResistance.time}-${secondResistance.time}`,

  type: "ASCENDING_TRIANGLE",
  direction: "BULLISH",

  status: confirmed
    ? "CONFIRMED"
    : "FORMING",

  confidence,

  startIndex: patternStart.index,

  endIndex: Math.min(
    formationEndPoint.index,
    history.length - 1
  ),

  startTime: patternStart.time,
  endTime: formationEndPoint.time,

  highPrice: Math.max(
    resistanceZoneHigh,
    formationEndPoint.price
  ),

  lowPrice: patternStart.price,

  keyPoints: formationPoints.map((point) => ({
    time: point.time,
    price: point.price,
    label: labels.get(point.index),
  })),

      resistanceZone: {
        low:
          resistanceZoneLow,

        high:
          resistanceZoneHigh,
      },

      evidence: [
        `Price tested the same resistance area ${resistanceTouches.length} times.`,

        `The formation contains ${risingLows.length} rising structural lows.`,

        `The price range contracted by ${contractionPercent.toFixed(
          2
        )}%.`,

        confirmed
          ? "Price closed above the resistance zone."
          : "Price remains inside the ascending structure.",
      ],

      cautions: confirmed
        ? []
        : [
            "Price has not closed above the resistance zone.",
          ],
    };

if (!bestPattern) {
  bestPattern = candidate;
  continue;
}

if (
  bestPattern.status === "CONFIRMED" &&
  candidate.status === "FORMING"
) {
  continue;
}

if (
  candidate.status === "CONFIRMED" &&
  bestPattern.status === "FORMING"
) {
  bestPattern = candidate;
  continue;
}

const candidateWidth = candidate.endIndex - candidate.startIndex;
const bestWidth = bestPattern.endIndex - bestPattern.startIndex;

if (
  candidate.status === "CONFIRMED" &&
  bestPattern.status === "CONFIRMED"
) {
  const candidateStartsEarlier =
    candidate.startIndex < bestPattern.startIndex;

  const sameStartButBroader =
    candidate.startIndex === bestPattern.startIndex &&
    candidateWidth > bestWidth;

  if (candidateStartsEarlier || sameStartButBroader) {
    bestPattern = candidate;
  }

  continue;
}

const candidateIsBroader =
  candidate.startIndex < bestPattern.startIndex &&
  candidateWidth >= bestWidth;

if (candidateIsBroader) {
  bestPattern = candidate;
  continue;
}

const sameStartHigherConfidence =
  candidate.startIndex === bestPattern.startIndex &&
  candidate.confidence > bestPattern.confidence;

if (sameStartHigherConfidence) {
  bestPattern = candidate;
}

  }

  return bestPattern;
}