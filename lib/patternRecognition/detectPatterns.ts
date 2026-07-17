import type { PricePoint } from "@/app/simulator/types/simulator";
import type { DetectedPattern } from "./types";

import {
  buildCandlePath,
} from "./helpers/buildCandlePath";

import {
  DETECTOR_REGISTRY,
} from "./registry";

import {
  PATTERN_CONFIG,
} from "./constants";

export function detectPatterns(
  history: PricePoint[]
): DetectedPattern[] {
  if (
    !Array.isArray(history) ||
    history.length < PATTERN_CONFIG.LOOKBACK
  ) {
    return [];
  }

  const path =
    buildCandlePath(history, {
      lookback:
        PATTERN_CONFIG.LOOKBACK,

      minimumMovePercent:
        PATTERN_CONFIG.MIN_MOVE_PERCENT,
    });

  if (path.length < 5) {
    return [];
  }

  const detectedPatterns =
    DETECTOR_REGISTRY.flatMap(
      (detector) => {
        const result = detector(
          history,
          path
        );

        return result
          ? [result]
          : [];
      }
    );

  detectedPatterns.sort((a, b) => {
    const statusDifference =
      Number(
        b.status === "CONFIRMED"
      ) -
      Number(
        a.status === "CONFIRMED"
      );

    if (statusDifference !== 0) {
      return statusDifference;
    }

    const confidenceDifference =
      b.confidence -
      a.confidence;

    if (confidenceDifference !== 0) {
      return confidenceDifference;
    }

    return b.endTime - a.endTime;
  });

  return detectedPatterns.length > 0
    ? [detectedPatterns[0]]
    : [];
}