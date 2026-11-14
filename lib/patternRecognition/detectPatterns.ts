import type { PricePoint } from "@/app/simulator/types/simulator";
import type { DetectedPattern } from "./types";

import { buildCandlePath } from "./helpers/buildCandlePath";
import { DETECTOR_REGISTRY } from "./registry";
import { PATTERN_CONFIG } from "./constants";

import {
  detectTrendline,
  type DetectedTrendline,
} from "./detectors/detectTrendline";

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

  const validPatterns = uniquePatterns.filter((pattern) => {
    const candlesAfterPattern = history.slice(pattern.endIndex + 1);

    if (pattern.type === "DOUBLE_BOTTOM") {
      const support = pattern.supportZone?.low ?? pattern.lowPrice;

      return !candlesAfterPattern.some(
        (candle) => Number(candle.close) < support
      );
    }

    if (pattern.type === "DOUBLE_TOP") {
      const resistance = pattern.resistanceZone?.high ?? pattern.highPrice;

      return !candlesAfterPattern.some(
        (candle) => Number(candle.close) > resistance
      );
    }

    if (pattern.type === "HEAD_AND_SHOULDERS") {
      return !candlesAfterPattern.some(
        (candle) => Number(candle.close) > pattern.highPrice
      );
    }

    return true;
  });

  validPatterns.sort((a, b) => {
    const endDifference = b.endIndex - a.endIndex;

    if (endDifference !== 0) return endDifference;

    const statusDifference =
      Number(b.status === "CONFIRMED") -
      Number(a.status === "CONFIRMED");

    if (statusDifference !== 0) return statusDifference;

    const confidenceDifference = b.confidence - a.confidence;

    if (confidenceDifference !== 0) return confidenceDifference;

    return b.startIndex - a.startIndex;
  });

  return validPatterns.length > 0
    ? [validPatterns[0]]
    : [];
}

export function detectMarketTrendline(
  history: PricePoint[],
  structure?: string
): DetectedTrendline | null {
  if (!Array.isArray(history) || history.length < 20) {
    return null;
  }

  const path = buildCandlePath(history, {
    lookback: Math.min(history.length, 120),
    minimumMovePercent: PATTERN_CONFIG.MIN_MOVE_PERCENT,
  });

  if (!Array.isArray(path)) return null;

  try {
    return detectTrendline(history, path, structure);
  } catch {
    return null;
  }
}