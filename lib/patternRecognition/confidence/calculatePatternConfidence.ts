type ConfidenceInput = {
  patternSimilarity: number;
  breakoutStrength: number;
};

const SCORE = {
  BASE: 70,

  SIMILARITY_EXCELLENT: 1,
  SIMILARITY_GOOD: 2,

  BREAKOUT_STRONG: 5,
  BREAKOUT_MODERATE: 3,
};

export function calculatePatternConfidence({
  patternSimilarity,
  breakoutStrength,
}: ConfidenceInput): number {
  let score = SCORE.BASE;

  /*
   * Better symmetry = stronger pattern
   */
  if (
    patternSimilarity <=
    SCORE.SIMILARITY_EXCELLENT
  ) {
    score += 10;
  } else if (
    patternSimilarity <=
    SCORE.SIMILARITY_GOOD
  ) {
    score += 5;
  }

  /*
   * Larger neckline movement
   * = stronger structure
   */
  if (
    breakoutStrength >=
    SCORE.BREAKOUT_STRONG
  ) {
    score += 10;
  } else if (
    breakoutStrength >=
    SCORE.BREAKOUT_MODERATE
  ) {
    score += 5;
  }

  return Math.min(score, 90);
}