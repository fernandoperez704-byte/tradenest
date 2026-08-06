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

export function detectDescendingTriangle(
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

    if (segment[0].price > segment[1].price) {
      localHighs.push(segment[0]);
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

    if (localHighs.length < 2 || localLows.length < 2) {
      continue;
    }

    const maxSupportDifferencePercent = 1.25;
    let supportTouches: CandlePathPoint[] = [];

    for (const anchorLow of localLows) {
      const matchingLows = localLows.filter(
        (low) =>
          percentDifference(anchorLow.price, low.price) <=
          maxSupportDifferencePercent
      );

      if (matchingLows.length > supportTouches.length) {
        supportTouches = matchingLows;
      }
    }

    if (supportTouches.length < 2) continue;

    supportTouches.sort((first, second) => first.index - second.index);

    const firstSupport = supportTouches[0];
    const secondSupport = supportTouches[1];

    const startSearchIndex = Math.max(0, firstSupport.index - 36);

    const startCandidates = trianglePath.filter(
      (point) =>
        point.index >= startSearchIndex &&
        point.index < firstSupport.index
    );

    if (startCandidates.length === 0) continue;

    const patternStart = startCandidates.reduce((highest, point) =>
      point.price > highest.price ? point : highest
    );

const supportPrice =
  (firstSupport.price + secondSupport.price) / 2;

    const supportZoneHalfPercent = maxSupportDifferencePercent / 2;

    const supportZoneLow =
      supportPrice * (1 - supportZoneHalfPercent / 100);

    const supportZoneHigh =
      supportPrice * (1 + supportZoneHalfPercent / 100);

const breakdownLevel =
  supportPrice * 0.998;

let breakdownIndex = -1;
let closesBelow = 0;

for (
  let index = secondSupport.index + 1;
  index < history.length;
  index++
) {
  const { open, close } = history[index];

  const bearish =
    close < open;

  const belowSupport =
    close < breakdownLevel;

  const strongBreak =
    bearish &&
    belowSupport &&
    ((open - close) / open) * 100 >= 0.6;

  if (strongBreak) {
    breakdownIndex = index;
    break;
  }

  closesBelow =
    belowSupport
      ? closesBelow + 1
      : 0;

  if (closesBelow >= 2) {
    breakdownIndex = index - 1;
    break;
  }
}

const confirmed =
  breakdownIndex !== -1;

  
    const breakdownPathPoint = confirmed
      ? trianglePath.find((point) => point.index >= breakdownIndex) ??
        latestPathPoint
      : null;

    const formationEndPoint = breakdownPathPoint ?? latestPathPoint;

    const descendingHighs = localHighs
      .filter(
        (high) =>
          high.index >= patternStart.index &&
          high.index < formationEndPoint.index
      )
      .sort((first, second) => first.index - second.index);

    if (descendingHighs.length < 2) continue;

    const hasDescendingHighs = descendingHighs.every((high, index) => {
      if (index === 0) return true;
      return high.price < descendingHighs[index - 1].price;
    });

    if (!hasDescendingHighs) continue;

    const lastDescendingHigh =
      descendingHighs[descendingHighs.length - 1];

    const firstRange = patternStart.price - supportPrice;
    const latestRange = lastDescendingHigh.price - supportPrice;

    if (firstRange <= 0 || latestRange <= 0) {
      continue;
    }

    const contractionPercent =
      ((firstRange - latestRange) / firstRange) * 100;

    if (contractionPercent < 15) continue;

    const patternWidth =
      formationEndPoint.index - patternStart.index;

    if (patternWidth < 8) continue;

    if (!confirmed && latestClose > lastDescendingHigh.price) {
      continue;
    }

    let confidence = calculatePatternConfidence({
      patternSimilarity: percentDifference(
        firstSupport.price,
        secondSupport.price
      ),
      breakoutStrength: contractionPercent,
    });

    confidence += Math.min(9, supportTouches.length * 3);
    confidence += Math.min(8, descendingHighs.length * 2);

    if (confirmed) confidence += 10;

    confidence = Math.min(confirmed ? 100 : 79, confidence);

    const formationPoints = trianglePath.filter(
      (point) =>
        point.index >= patternStart.index &&
        point.index <= formationEndPoint.index
    );

    const labels = new Map<number, string>();

    labels.set(patternStart.index, "Start");
    labels.set(firstSupport.index, "Support 1");
    labels.set(secondSupport.index, "Support 2");

    descendingHighs.slice(1, 4).forEach((high, index) => {
      labels.set(high.index, `High ${index + 1}`);
    });

    labels.set(
      formationEndPoint.index,
      confirmed ? "Breakdown" : "Current"
    );

    const candidate: DetectedPattern = {
      id: `descending-triangle-${patternStart.time}-${firstSupport.time}-${secondSupport.time}`,
      type: "DESCENDING_TRIANGLE",
      direction: "BEARISH",
      status: confirmed ? "CONFIRMED" : "FORMING",
      confidence,

      startIndex: patternStart.index,
      endIndex: Math.min(
        formationEndPoint.index,
        history.length - 1
      ),

      startTime: patternStart.time,
      endTime: formationEndPoint.time,

      highPrice: patternStart.price,
      lowPrice: Math.min(
        supportZoneLow,
        formationEndPoint.price
      ),

      keyPoints: formationPoints.map((point) => ({
        time: point.time,
        price: point.price,
        label: labels.get(point.index),
      })),

      supportZone: {
        low: supportZoneLow,
        high: supportZoneHigh,
      },

      evidence: [
        `Price tested the same support area ${supportTouches.length} times.`,
        `The formation contains ${descendingHighs.length} descending structural highs.`,
        `The price range contracted by ${contractionPercent.toFixed(2)}%.`,
        confirmed
          ? "Price closed below the support zone."
          : "Price remains inside the descending structure.",
      ],

      cautions: confirmed
        ? []
        : ["Price has not closed below the support zone."],
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