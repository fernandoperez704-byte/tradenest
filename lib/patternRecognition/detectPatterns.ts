import type { PricePoint } from "@/app/simulator/types/simulator";
import type { DetectedPattern } from "./types";

import {
  detectDoubleBottom,
} from "./detectors/detectDoubleBottom";

import {
  detectDoubleTop,
} from "./detectors/detectDoubleTop";

function getStatusPriority(
  status: DetectedPattern["status"]
) {
  if (status === "CONFIRMED") return 3;
  if (status === "FORMING") return 2;
  return 1;
}

function sortPatterns(
  patterns: DetectedPattern[]
) {
  return [...patterns].sort((a, b) => {
    const statusDifference =
      getStatusPriority(b.status) -
      getStatusPriority(a.status);

    if (statusDifference !== 0) {
      return statusDifference;
    }

    const confidenceDifference =
      b.confidence - a.confidence;

    if (confidenceDifference !== 0) {
      return confidenceDifference;
    }

    return b.endTime - a.endTime;
  });
}

export function detectPatterns(
  history: PricePoint[]
): DetectedPattern[] {
  if (
    !Array.isArray(history) ||
    history.length < 50
  ) {
    return [];
  }

  const patterns: DetectedPattern[] = [];

  const doubleBottom =
    detectDoubleBottom(history);

  if (doubleBottom) {
    patterns.push(doubleBottom);
  }

  const doubleTop =
    detectDoubleTop(history);

  if (doubleTop) {
    patterns.push(doubleTop);
  }

  return sortPatterns(patterns);
}