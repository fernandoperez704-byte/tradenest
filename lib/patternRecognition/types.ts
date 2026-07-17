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
  | "HEAD_AND_SHOULDERS"
  | "INVERSE_HEAD_AND_SHOULDERS"
  | "BULL_FLAG"
  | "BEAR_FLAG";

export interface BasePattern {
  id: string;
  confidence: number;

  startIndex: number;
  endIndex: number;

  startTime: number;
  endTime: number;

  highPrice: number;
  lowPrice: number;

  evidence: string[];
  cautions: string[];
}

export type DetectedPattern =
  | (
      BasePattern & {
        type: "DOUBLE_TOP";
        direction: "BEARISH";
        status: PatternStatus;
      }
    )
  | (
      BasePattern & {
        type: "DOUBLE_BOTTOM";
        direction: "BULLISH";
        status: PatternStatus;
      }
    )
  | (
      BasePattern & {
        type: "HEAD_AND_SHOULDERS";
        direction: "BEARISH";
        status: PatternStatus;
      }
    )
  | (
      BasePattern & {
        type: "INVERSE_HEAD_AND_SHOULDERS";
        direction: "BULLISH";
        status: PatternStatus;
      }
    )
  | (
      BasePattern & {
        type: "BULL_FLAG";
        direction: "BULLISH";
        status: PatternStatus;
      }
    )
  | (
      BasePattern & {
        type: "BEAR_FLAG";
        direction: "BEARISH";
        status: PatternStatus;
      }
    );