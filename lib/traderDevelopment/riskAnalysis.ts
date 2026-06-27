export function buildRiskAnalysis(reviews: any[]) {
  const lowRisk = reviews.filter((r) => r.riskLevel === "LOW").length;
  const mediumRisk = reviews.filter((r) => r.riskLevel === "MEDIUM").length;
  const highRisk = reviews.filter((r) => r.riskLevel === "HIGH").length;

  const total = lowRisk + mediumRisk + highRisk;

  return {
    lowRisk,
    mediumRisk,
    highRisk,
    highRiskRate:
      total === 0 ? 0 : Math.round((highRisk / total) * 100),
  };
}