export function buildRiskAnalysis(reviews: any[]) {
  let lowRisk = 0;
  let mediumRisk = 0;
  let highRisk = 0;

  for (const review of reviews) {
    const mode = String(
      review?.mode ??
      review?.tradeContext?.account?.marketMode ??
      "SPOT"
    ).toUpperCase();

    const leverage = Number(
      review?.leverage ??
      review?.tradeResult?.leverage ??
      review?.engine?.risk?.leverage ??
      1
    );

    const balanceAtEntry = Number(
      review?.balanceAtEntry ??
      review?.tradeContext?.account?.balanceAtEntry ??
      0
    );

    const margin = Number(
      review?.margin ??
      review?.tradeResult?.margin ??
      review?.engine?.risk?.margin ??
      0
    );

    const positionSize = Number(
      review?.positionSize ??
      review?.tradeResult?.positionSize ??
      review?.engine?.risk?.positionSize ??
      0
    );

    const spotAmount = Number(
      review?.amount ??
      review?.tradeResult?.amount ??
      review?.tradeResult?.entryValue ??
      0
    );


    // Futures exposure should use margin committed against account balance.
    // Spot exposure should use the amount committed against account balance.
    const capitalCommitted =
      mode === "FUTURES"
        ? margin
        : spotAmount > 0
        ? spotAmount
        : positionSize;

    const exposureRate =
      balanceAtEntry > 0
        ? (capitalCommitted / balanceAtEntry) * 100
        : 0;

    let riskLevel: "LOW" | "MEDIUM" | "HIGH";

    if (
      exposureRate >= 50 ||
      leverage >= 20
    ) {
      riskLevel = "HIGH";
    } else if (
      exposureRate >= 20 ||
      leverage >= 5
    ) {
      riskLevel = "MEDIUM";
    } else {
      riskLevel = "LOW";
    }

    if (riskLevel === "LOW") lowRisk++;
    else if (riskLevel === "MEDIUM") mediumRisk++;
    else highRisk++;
  }

  const total = lowRisk + mediumRisk + highRisk;

  const highRiskRate =
    total === 0
      ? 0
      : Math.round((highRisk / total) * 100);

  const status =
    total === 0
      ? "No Data"
      : highRisk >= mediumRisk && highRisk >= lowRisk
      ? "High Risk"
      : mediumRisk >= lowRisk
      ? "Moderate Risk"
      : "Low Risk";

  return {
    lowRisk,
    mediumRisk,
    highRisk,
    highRiskRate,
    status,
  };
}