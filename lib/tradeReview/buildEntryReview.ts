import type { EntryQuality } from "../gabyMarketIntelligence";

export function buildEntryReview({
  direction,
  tradeDirection,
  priceLocation,
  entryQuality,
  momentum,
  controlStrength,
  marketState,
}: {
  direction: string | null;
  tradeDirection: string;
  priceLocation: string | null;
  entryQuality: EntryQuality | null;
  momentum: string | null;
  controlStrength: string | null;
  marketState: string | null;
}) {
  let score = 50;

  if (direction === tradeDirection) {
    score += 20;
  }

  if (
    direction &&
    direction !== "TRANSITION" &&
    direction !== tradeDirection
  ) {
    score -= 25;
  }

  if (
    tradeDirection === "BULLISH" &&
    priceLocation === "NEAR_SUPPORT"
  ) {
    score += 15;
  }

  if (
    tradeDirection === "BEARISH" &&
    priceLocation === "NEAR_RESISTANCE"
  ) {
    score += 15;
  }

  if (
    tradeDirection === "BULLISH" &&
    priceLocation === "NEAR_RESISTANCE"
  ) {
    score -= 15;
  }

  if (
    tradeDirection === "BEARISH" &&
    priceLocation === "NEAR_SUPPORT"
  ) {
    score -= 15;
  }

  if (
    tradeDirection === "BULLISH" &&
    momentum === "BULLISH_MOMENTUM"
  ) {
    score += 10;
  }

  if (
    tradeDirection === "BEARISH" &&
    momentum === "BEARISH_MOMENTUM"
  ) {
    score += 10;
  }

  if (
    tradeDirection === "BULLISH" &&
    momentum === "BEARISH_MOMENTUM"
  ) {
    score -= 10;
  }

  if (
    tradeDirection === "BEARISH" &&
    momentum === "BULLISH_MOMENTUM"
  ) {
    score -= 10;
  }

  if (controlStrength === "STRENGTHENING") {
    score += 10;
  }

  if (controlStrength === "WEAKENING") {
    score -= 10;
  }

  if (marketState === "TRANSITION") {
    score -= 10;
  }

  score = Math.max(0, Math.min(100, score));

  const quality =
    score >= 85
      ? "EXCELLENT"
      : score >= 70
      ? "GOOD"
      : score >= 45
      ? "AVERAGE"
      : "WEAK";

  let lesson =
    "The entry was average based on the recorded direction, location, momentum, and control.";

  if (quality === "EXCELLENT") {
    lesson =
      "The entry had strong alignment across direction, location, momentum, and control.";
  }

  if (quality === "GOOD") {
    lesson =
      "The entry had good alignment, but not every condition was fully supportive.";
  }

  if (quality === "WEAK") {
    lesson =
      "The entry had weak alignment because one or more key conditions did not support the trade.";
  }

const strengths: string[] = [];
const weaknesses: string[] = [];

if (direction === tradeDirection) {
  strengths.push("The trade followed the market direction.");
} else if (direction !== "TRANSITION") {
  weaknesses.push("The trade was opened against the market direction.");
}

if (
  tradeDirection === "BULLISH" &&
  priceLocation === "NEAR_SUPPORT"
) {
  strengths.push("The entry was near support.");
}

if (
  tradeDirection === "BEARISH" &&
  priceLocation === "NEAR_RESISTANCE"
) {
  strengths.push("The entry was near resistance.");
}

if (
  tradeDirection === "BULLISH" &&
  priceLocation === "NEAR_RESISTANCE"
) {
  weaknesses.push("The long entry was close to resistance.");
}

if (
  tradeDirection === "BEARISH" &&
  priceLocation === "NEAR_SUPPORT"
) {
  weaknesses.push("The short entry was close to support.");
}

if (
  tradeDirection === "BULLISH" &&
  momentum === "BEARISH_MOMENTUM"
) {
  weaknesses.push("Momentum was bearish.");
}

if (
  tradeDirection === "BEARISH" &&
  momentum === "BULLISH_MOMENTUM"
) {
  weaknesses.push("Momentum was bullish.");
}

if (controlStrength === "WEAKENING") {
  weaknesses.push("Market control was weakening.");
}

return {
  score,
  quality,
  lesson,

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