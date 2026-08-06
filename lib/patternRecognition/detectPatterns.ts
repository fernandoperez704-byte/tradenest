import type { PricePoint } from "@/app/simulator/types/simulator";
import type { DetectedPattern } from "./types";

import { buildCandlePath } from "./helpers/buildCandlePath";
import { DETECTOR_REGISTRY } from "./registry";
import { PATTERN_CONFIG } from "./constants";

export function detectPatterns(history: PricePoint[]): DetectedPattern[] {
  if (
    !Array.isArray(history) ||
    history.length < PATTERN_CONFIG.LOOKBACK
  ) {
    return [];
  }

  const path = buildCandlePath(history, {
    lookback: PATTERN_CONFIG.LOOKBACK,
    minimumMovePercent: PATTERN_CONFIG.MIN_MOVE_PERCENT,
  });

  if (!Array.isArray(path)) return [];

  const detectedPatterns = DETECTOR_REGISTRY.flatMap((detector) => {
    if (typeof detector !== "function") return [];

    try {
      const result = detector(history, path);
      return result ? [result] : [];
    } catch (error) {
      console.error("PAT detector failed:", error);
      return [];
    }
  });

  const uniquePatterns = Array.from(
    new Map(
      detectedPatterns.map((pattern) => [pattern.id, pattern])
    ).values()
  );

  uniquePatterns.sort((a, b) => {
    const statusDifference =
      Number(b.status === "CONFIRMED") -
      Number(a.status === "CONFIRMED");

    if (statusDifference !== 0) return statusDifference;

    const endDifference = b.endIndex - a.endIndex;

    if (endDifference !== 0) return endDifference;

    const startDifference = b.startIndex - a.startIndex;

    if (startDifference !== 0) return startDifference;

    return b.confidence - a.confidence;
  });

  return uniquePatterns.length > 0
    ? [uniquePatterns[0]]
    : [];
}