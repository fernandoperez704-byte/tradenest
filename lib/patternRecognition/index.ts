export {
  detectPatterns,
  detectMarketTrendline,
} from "./detectPatterns";

export type {
  DetectedPattern,
  PatternDirection,
  PatternStatus,
  PatternType,
} from "./types";

export {
  buildCandlePath,
} from "./helpers/buildCandlePath";

export type {
  CandlePathPoint,
  CandlePathDirection,
} from "./helpers/buildCandlePath";

export { detectTrendline } from "./detectors/detectTrendline";
export type { DetectedTrendline } from "./detectors/detectTrendline";