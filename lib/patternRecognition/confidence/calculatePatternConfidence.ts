type ConfidenceInput = {
  patternSimilarity: number;
  breakoutStrength: number;
  confirmed: boolean;
};

export function calculatePatternConfidence({
  patternSimilarity,
  breakoutStrength,
  confirmed,
}: ConfidenceInput) {
  let confidence = 70;

  if (patternSimilarity <= 1) {
    confidence += 10;
  } else if (patternSimilarity <= 2) {
    confidence += 5;
  }

  if (breakoutStrength >= 5) {
    confidence += 10;
  } else if (breakoutStrength >= 3) {
    confidence += 5;
  }

  if (confirmed) {
    confidence += 5;
  }

  return Math.min(confidence, 95);
}