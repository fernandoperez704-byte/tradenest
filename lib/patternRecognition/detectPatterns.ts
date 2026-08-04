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
    history.length <
      PATTERN_CONFIG.LOOKBACK
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

if (!Array.isArray(path)) {
  return [];
}

  const detectedPatterns =
    DETECTOR_REGISTRY.flatMap(
      (detector) => {
        if (
          typeof detector !== "function"
        ) {
          return [];
        }

        try {
          const result =
            detector(
              history,
              path
            );

          return result
            ? [result]
            : [];
        } catch (error) {
          console.error(
            "PAT detector failed:",
            error
          );

          return [];
        }
      }
    );

  const uniquePatterns =
    Array.from(
      new Map(
        detectedPatterns.map(
          (pattern) => [
            pattern.id,
            pattern,
          ]
        )
      ).values()
    );

uniquePatterns.sort((a, b) => {
  // 1. Confirmed patterns always win
  const statusDifference =
    Number(
      b.status === "CONFIRMED"
    ) -
    Number(
      a.status === "CONFIRMED"
    );

  if (
    statusDifference !== 0
  ) {
    return statusDifference;
  }

  // 2. Prefer the newest pattern
  const recencyDifference =
    b.endTime -
    a.endTime;

  if (
    recencyDifference !== 0
  ) {
    return recencyDifference;
  }

  // 3. Confidence is only a tiebreaker
  return (
    b.confidence -
    a.confidence
  );
});

  return uniquePatterns.length > 0
    ? [uniquePatterns[0]]
    : [];
}