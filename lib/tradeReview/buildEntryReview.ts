import type {
  EntryQuality,
} from "../gabyMarketIntelligence";

export type TradeDirection =
  | "BULLISH"
  | "BEARISH";

export type EntryReviewQuality =
  | "EXCELLENT"
  | "GOOD"
  | "AVERAGE"
  | "WEAK";

export interface BuildEntryReviewInput {
  direction: string | null;
  tradeDirection: TradeDirection;
  priceLocation: string | null;
  entryQuality: EntryQuality | null;
  momentum: string | null;
  controlStrength: string | null;
  marketState: string | null;
}

export interface EntryReviewResult {
  score: number;
  quality: EntryReviewQuality;
  lesson: string;

  strengths: string[];
  weaknesses: string[];

  direction: string | null;
  tradeDirection: TradeDirection;
  priceLocation: string | null;
  oldEntryQuality: EntryQuality | null;
  momentum: string | null;
  controlStrength: string | null;
  marketState: string | null;
}

function clampScore(
  score: number
): number {
  return Math.max(
    0,
    Math.min(100, Math.round(score))
  );
}

function determineQuality(
  score: number
): EntryReviewQuality {
  if (score >= 85) {
    return "EXCELLENT";
  }

  if (score >= 70) {
    return "GOOD";
  }

  if (score >= 45) {
    return "AVERAGE";
  }

  return "WEAK";
}

function buildLesson(
  quality: EntryReviewQuality
): string {
  if (quality === "EXCELLENT") {
    return "The entry had strong alignment across direction, location, momentum, and market control.";
  }

  if (quality === "GOOD") {
    return "The entry had good alignment, although not every recorded condition was fully supportive.";
  }

  if (quality === "WEAK") {
    return "The entry had weak alignment because one or more key market conditions did not support the trade.";
  }

  return "The entry had mixed alignment across direction, location, momentum, and market control.";
}

export function buildEntryReview({
  direction,
  tradeDirection,
  priceLocation,
  entryQuality,
  momentum,
  controlStrength,
  marketState,
}: BuildEntryReviewInput): EntryReviewResult {
  let score = 50;

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  const hasDirectionalContext =
    direction !== null &&
    direction !== "TRANSITION";

  // Direction alignment
  if (direction === tradeDirection) {
    score += 20;

    strengths.push(
      "The trade followed the recorded market direction."
    );
  } else if (hasDirectionalContext) {
    score -= 25;

    weaknesses.push(
      "The trade was opened against the recorded market direction."
    );
  }

  // Price location
  const favorableLocation =
    (tradeDirection === "BULLISH" &&
      priceLocation === "NEAR_SUPPORT") ||
    (tradeDirection === "BEARISH" &&
      priceLocation === "NEAR_RESISTANCE");

  const unfavorableLocation =
    (tradeDirection === "BULLISH" &&
      priceLocation === "NEAR_RESISTANCE") ||
    (tradeDirection === "BEARISH" &&
      priceLocation === "NEAR_SUPPORT");

  if (favorableLocation) {
    score += 15;

    strengths.push(
      tradeDirection === "BULLISH"
        ? "The long entry was near support."
        : "The short entry was near resistance."
    );
  } else if (unfavorableLocation) {
    score -= 15;

    weaknesses.push(
      tradeDirection === "BULLISH"
        ? "The long entry was close to resistance."
        : "The short entry was close to support."
    );
  }

  // Momentum alignment
  const favorableMomentum =
    (tradeDirection === "BULLISH" &&
      momentum === "BULLISH_MOMENTUM") ||
    (tradeDirection === "BEARISH" &&
      momentum === "BEARISH_MOMENTUM");

  const unfavorableMomentum =
    (tradeDirection === "BULLISH" &&
      momentum === "BEARISH_MOMENTUM") ||
    (tradeDirection === "BEARISH" &&
      momentum === "BULLISH_MOMENTUM");

  if (favorableMomentum) {
    score += 10;

    strengths.push(
      "Momentum supported the trade direction."
    );
  } else if (unfavorableMomentum) {
    score -= 10;

    weaknesses.push(
      tradeDirection === "BULLISH"
        ? "Momentum was bearish against the long position."
        : "Momentum was bullish against the short position."
    );
  }

  // Market control
  if (controlStrength === "STRENGTHENING") {
    score += 10;

    strengths.push(
      "Market control was strengthening."
    );
  } else if (
    controlStrength === "WEAKENING"
  ) {
    score -= 10;

    weaknesses.push(
      "Market control was weakening."
    );
  }

  // Transition conditions
  if (
    direction === "TRANSITION" ||
    marketState === "TRANSITION"
  ) {
    score -= 10;

    weaknesses.push(
      "The market was in transition, which reduced entry clarity."
    );
  }

  const normalizedScore =
    clampScore(score);

  const quality =
    determineQuality(normalizedScore);

  return {
    score: normalizedScore,
    quality,
    lesson: buildLesson(quality),

    strengths,
    weaknesses,

    direction,
    tradeDirection,
    priceLocation,
    oldEntryQuality: entryQuality,
    momentum,
    controlStrength,
    marketState,
  };
}