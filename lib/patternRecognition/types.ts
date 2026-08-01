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
  | "BEAR_FLAG"
  | "ASCENDING_TRIANGLE"
  | "DESCENDING_TRIANGLE"
  | "SYMMETRICAL_TRIANGLE"
  | "RISING_WEDGE"
  | "FALLING_WEDGE";

export type PatternPoint = {
  time: number;
  price: number;
  label?: string;
};

export type PatternZone = {
  low: number;
  high: number;
};

export interface BasePattern {
  id: string;
  confidence: number;

  startIndex: number;
  endIndex: number;

  startTime: number;
  endTime: number;

  highPrice: number;
  lowPrice: number;

  keyPoints?: PatternPoint[];
  resistanceZone?: PatternZone;
  supportZone?: PatternZone;

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
    )
  | (
      BasePattern & {
        type: "ASCENDING_TRIANGLE";
        direction: "BULLISH";
        status: PatternStatus;
      }
    )
  | (
      BasePattern & {
        type: "DESCENDING_TRIANGLE";
        direction: "BEARISH";
        status: PatternStatus;
      }
    )
  | (
      BasePattern & {
        type: "SYMMETRICAL_TRIANGLE";
        direction: "NEUTRAL";
        status: PatternStatus;
      }
    )
  | (
      BasePattern & {
        type: "RISING_WEDGE";
        direction: "BEARISH";
        status: PatternStatus;
      }
    )
  | (
      BasePattern & {
        type: "FALLING_WEDGE";
        direction: "BULLISH";
        status: PatternStatus;
      }
    );