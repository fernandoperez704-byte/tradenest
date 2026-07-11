export function buildExitManagementAnalysis(reviews: any[]) {
  let strong = 0;
  let good = 0;
  let average = 0;
  let weak = 0;

  let totalEfficiency = 0;
  let efficiencyCount = 0;

  for (const review of reviews) {
    const managementReview =
      review.managementReview ??
      review.management ??
      null;

    if (!managementReview || managementReview.available === false) {
      continue;
    }

    const quality = String(
      managementReview.managementQuality || ""
    ).toUpperCase();

    if (quality === "STRONG") strong++;
    else if (quality === "GOOD") good++;
    else if (quality === "AVERAGE") average++;
    else if (quality === "WEAK") weak++;

    const exitEfficiency = Number(
      managementReview.exitEfficiency
    );

    if (Number.isFinite(exitEfficiency)) {
      totalEfficiency += exitEfficiency;
      efficiencyCount++;
    }
  }

  const total = strong + good + average + weak;

  const averageExitEfficiency =
    efficiencyCount === 0
      ? 0
      : Math.round(totalEfficiency / efficiencyCount);

  const positiveManagementRate =
    total === 0
      ? 0
      : Math.round(((strong + good) / total) * 100);

  let status = "No Data";

  if (total > 0) {
    if (positiveManagementRate >= 70) {
      status = "Strong Management";
    } else if (positiveManagementRate >= 50) {
      status = "Good Management";
    } else if (weak >= average && weak > strong + good) {
      status = "Weak Management";
    } else {
      status = "Average Management";
    }
  }

  return {
    strong,
    good,
    average,
    weak,
    total,
    averageExitEfficiency,
    positiveManagementRate,
    status,
  };
}