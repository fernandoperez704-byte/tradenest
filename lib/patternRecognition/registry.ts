import type { PricePoint } from "@/app/simulator/types/simulator";
import type { DetectedPattern } from "./types";
import type { CandlePathPoint } from "./helpers/buildCandlePath";

import {
  detectDoubleBottom,
} from "./detectors/detectDoubleBottom";

import {
  detectDoubleTop,
} from "./detectors/detectDoubleTop";

import {
  detectHeadAndShoulders,
} from "./detectors/detectHeadAndShoulders";

export type PatternDetector = (
  history: PricePoint[],
  path: CandlePathPoint[]
) => DetectedPattern | null;

export const DETECTOR_REGISTRY: readonly PatternDetector[] = [
  detectHeadAndShoulders,
  detectDoubleBottom,
  detectDoubleTop,
];