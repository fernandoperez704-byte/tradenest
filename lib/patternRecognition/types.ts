export type PatternDirection =
  | "BULLISH"
  | "BEARISH"
  | "NEUTRAL";

export type PatternStatus =
  | "FORMING"
  | "CONFIRMED"
  | "INVALIDATED";

export type PatternType =
  | "DOUBLE_TOP"
  | "DOUBLE_BOTTOM"
  | "BULL_FLAG"
  | "BEAR_FLAG";

export type DetectedPattern = {
  id: string;

  type: PatternType;
  direction: PatternDirection;
  status: PatternStatus;

  confidence: number;

startIndex: number;
endIndex: number;

startTime: number;
endTime: number;

highPrice: number;
lowPrice: number;

  evidence: string[];
  cautions: string[];
};