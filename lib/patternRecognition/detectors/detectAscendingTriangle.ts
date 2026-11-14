import type { PricePoint } from "@/app/simulator/types/simulator";
import type { DetectedPattern } from "../types";

import {
  buildCandlePath,
  type CandlePathPoint,
} from "../helpers/buildCandlePath";

import { calculatePatternConfidence } from "../confidence/calculatePatternConfidence";

function percentDifference(first: number, second: number): number {
  const average = (first + second) / 2;
  if (average <= 0) return Infinity;

  return (Math.abs(first - second) / average) * 100;
}

function isLocalHigh(
  previous: CandlePathPoint,
  current: CandlePathPoint,
  next: CandlePathPoint
): boolean {
  return current.price > previous.price && current.price > next.price;
}

function isLocalLow(
  previous: CandlePathPoint,
  current: CandlePathPoint,
  next: CandlePathPoint
): boolean {
  return current.price < previous.price && current.price < next.price;
}

export function detectAscendingTriangle(
  history: PricePoint[],
  _path: CandlePathPoint[]
): DetectedPattern | null {
  if (!Array.isArray(history) || history.length < 20) return null;

  const latestClose = Number(history[history.length - 1]?.close);

  if (!Number.isFinite(latestClose) || latestClose <= 0) {
    return null;
  }

  const trianglePath = buildCandlePath(history, {
    lookback: 120,
    minimumMovePercent: 0.35,
    useWicks: true,
  });

  if (trianglePath.length < 5) return null;

  const latestPathPoint = trianglePath[trianglePath.length - 1];
  const maximumPathPoints = 16;
  const firstPossibleStart = Math.max(
    0,
    trianglePath.length - maximumPathPoints
  );

  let bestPattern: DetectedPattern | null = null;

  for (
    let pathStartIndex = firstPossibleStart;
    pathStartIndex <= trianglePath.length - 5;
    pathStartIndex++
  ) {
    const segment = trianglePath.slice(pathStartIndex);

    if (segment.length < 5) continue;

    const localHighs: CandlePathPoint[] = [];
    const localLows: CandlePathPoint[] = [];

    if (segment[0].price < segment[1].price) {
      localLows.push(segment[0]);
    }

    for (let index = 1; index < segment.length - 1; index++) {
      const previous = segment[index - 1];
      const current = segment[index];
      const next = segment[index + 1];

      if (isLocalHigh(previous, current, next)) {
        localHighs.push(current);
      }

      if (isLocalLow(previous, current, next)) {
        localLows.push(current);
      }
    }

    const lastPoint = segment[segment.length - 1];
    const previousPoint = segment[segment.length - 2];

    if (
      lastPoint.direction === "UP" &&
      lastPoint.price > previousPoint.price
    ) {
      localHighs.push(lastPoint);
    }

    if (localHighs.length < 2 || localLows.length < 2) {
      continue;
    }

    const maxResistanceDifferencePercent = 1.5;
    let resistanceTouches: CandlePathPoint[] = [];

    for (const anchorHigh of localHighs) {
      const matchingHighs = localHighs.filter(
        (high) =>
          percentDifference(anchorHigh.price, high.price) <=
          maxResistanceDifferencePercent
      );

      if (matchingHighs.length > resistanceTouches.length) {
        resistanceTouches = matchingHighs;
      }
    }

    if (resistanceTouches.length < 2) continue;

    resistanceTouches.sort((first, second) => first.index - second.index);

    const firstResistance = resistanceTouches[resistanceTouches.length - 2];
    const secondResistance = resistanceTouches[resistanceTouches.length - 1];

    const startSearchIndex = Math.max(0, firstResistance.index - 36);

    const startCandidates = trianglePath.filter(
      (point) =>
        point.index >= startSearchIndex &&
        point.index < firstResistance.index
    );

    if (startCandidates.length === 0) continue;

    const patternStart = startCandidates.reduce((lowest, point) =>
      point.price < lowest.price ? point : lowest
    );

    const resistancePrice =
      resistanceTouches.reduce((total, high) => total + high.price, 0) /
      resistanceTouches.length;

    const formationHighs = localHighs.filter(
      (high) =>
        high.index >= patternStart.index &&
        high.index <= secondResistance.index
    );

    const hasStableResistance = formationHighs.every(
      (high) =>
        percentDifference(high.price, resistancePrice) <=
        maxResistanceDifferencePercent
    );

    if (!hasStableResistance) continue;

    if (secondResistance.index - firstResistance.index < 3) {
      continue;
    }

    const resistanceZoneHalfPercent =
      maxResistanceDifferencePercent / 2;

    const resistanceZoneLow =
      resistancePrice * (1 - resistanceZoneHalfPercent / 100);

    const resistanceZoneHigh =
      resistancePrice * (1 + resistanceZoneHalfPercent / 100);

    /*
     * Calculate confirmation and the formation
     * endpoint before using formationEndPoint.
     */
    const breakoutIndex = history.findIndex(
      (candle, index) =>
        index > secondResistance.index &&
        Number(candle.close) > resistanceZoneHigh
    );

    const confirmed = breakoutIndex !== -1;

    const maximumCandlesSinceBreakout = 8;

    if (
      confirmed &&
      history.length - 1 - breakoutIndex > maximumCandlesSinceBreakout
    ) {
      continue;
    }

    const breakoutPathPoint = confirmed
      ? trianglePath.find((point) => point.index >= breakoutIndex) ??
        latestPathPoint
      : null;

    const formationEndPoint = breakoutPathPoint ?? latestPathPoint;

    /*
     * Only use reaction lows occurring before
     * the formation ends.
     */
    const risingLows = localLows
      .filter(
        (low) =>
          low.index >= patternStart.index &&
          low.index < formationEndPoint.index
      )
      .sort((first, second) => first.index - second.index);

    if (risingLows.length < 2) continue;

    const hasRisingLows = risingLows.every((low, index) => {
      if (index === 0) return true;
      return low.price > risingLows[index - 1].price;
    });

    if (!hasRisingLows) continue;

    const lastRisingLow = risingLows[risingLows.length - 1];
    const firstRange = resistancePrice - patternStart.price;
    const latestRange = resistancePrice - lastRisingLow.price;

    if (firstRange <= 0 || latestRange <= 0) {
      continue;
    }

    const contractionPercent =
      ((firstRange - latestRange) / firstRange) * 100;

    if (contractionPercent < 15) continue;

    const patternWidth =
      formationEndPoint.index - patternStart.index;

    if (confirmed) {
      if (patternWidth < 30) continue;

      if (resistanceTouches.length < 3 || risingLows.length < 2) {
        continue;
      }
    } else {
      if (patternWidth < 12) continue;

      if (resistanceTouches.length < 2 || risingLows.length < 2) {
        continue;
      }
    }

    if (!confirmed && latestClose < lastRisingLow.price) {
      continue;
    }

    let confidence = calculatePatternConfidence({
      patternSimilarity: percentDifference(
        firstResistance.price,
        secondResistance.price
      ),
      breakoutStrength: contractionPercent,
    });

    confidence += Math.min(9, resistanceTouches.length * 3);
    confidence += Math.min(8, risingLows.length * 2);

    if (confirmed) confidence += 10;

    confidence = confirmed
      ? Math.min(95, confidence)
      : Math.min(79, Math.max(45, confidence - 20));

    const formationPoints = trianglePath.filter(
      (point) =>
        point.index >= patternStart.index &&
        point.index <= Math.max(
          formationEndPoint.index,
          secondResistance.index
        )
    );

    const labels = new Map<number, string>();

    labels.set(patternStart.index, "Start");
    labels.set(firstResistance.index, "Resistance 1");
    labels.set(secondResistance.index, "Resistance 2");

    risingLows.slice(1, 4).forEach((low, index) => {
      labels.set(low.index, `Low ${index + 1}`);
    });

    if (!labels.has(formationEndPoint.index)) {
      labels.set(
        formationEndPoint.index,
        confirmed ? "Breakout" : "Current"
      );
    }

    const candidate: DetectedPattern = {
      id: `ascending-triangle-${patternStart.time}-${firstResistance.time}-${secondResistance.time}`,
      type: "ASCENDING_TRIANGLE",
      direction: "BULLISH",
      status: confirmed ? "CONFIRMED" : "FORMING",
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
        low: resistanceZoneLow,
        high: resistanceZoneHigh,
      },

      evidence: [
        `Price tested the same resistance area ${resistanceTouches.length} times.`,
        `The formation contains ${risingLows.length} rising structural lows.`,
        `The price range contracted by ${contractionPercent.toFixed(2)}%.`,
        confirmed
          ? "Price closed above the resistance zone."
          : "Price remains inside the ascending structure.",
      ],

      cautions: confirmed
        ? []
        : ["Price has not closed above the resistance zone."],
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

    const candidateWidth =
      candidate.endIndex - candidate.startIndex;

    const bestWidth =
      bestPattern.endIndex - bestPattern.startIndex;

    if (
      candidate.status === "CONFIRMED" &&
      bestPattern.status === "CONFIRMED"
    ) {
      const startsEarlier =
        candidate.startIndex < bestPattern.startIndex;

      const sameStartButBroader =
        candidate.startIndex === bestPattern.startIndex &&
        candidateWidth > bestWidth;

      if (startsEarlier || sameStartButBroader) {
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