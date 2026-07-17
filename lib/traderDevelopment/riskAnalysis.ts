import type {
  TradeReview,
} from "./types";

export interface RiskAnalysisResult {
  lowRisk: number;
  mediumRisk: number;
  highRisk: number;
  highRiskRate: number;

  status:
    | "High Risk"
    | "Moderate Risk"
    | "Low Risk"
    | "No Data";
}

type ExtractedRiskData = {
  leverage: number | null;
  exposureRate: number | null;
};

function toValidNumber(
  value: unknown
): number | null {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : null;
}

function extractRiskData(
  review: TradeReview
): ExtractedRiskData {
  const mode = String(
    review.mode ??
      review.tradeContext?.account
        ?.marketMode ??
      "SPOT"
  ).toUpperCase();

  const leverage = toValidNumber(
    review.leverage ??
      review.tradeResult?.leverage ??
      review.engine?.risk?.leverage
  );

  const balanceAtEntry = toValidNumber(
    review.balanceAtEntry ??
      review.tradeContext?.account
        ?.balanceAtEntry
  );

  const margin = toValidNumber(
    review.margin ??
      review.tradeResult?.margin ??
      review.engine?.risk?.margin
  );

  const positionSize = toValidNumber(
    review.positionSize ??
      review.tradeResult?.positionSize ??
      review.engine?.risk?.positionSize
  );

  const spotAmount = toValidNumber(
    review.amount ??
      review.tradeResult?.amount ??
      review.tradeResult?.entryValue
  );

  const capitalCommitted =
    mode === "FUTURES"
      ? margin
      : spotAmount !== null &&
        spotAmount > 0
      ? spotAmount
      : positionSize;

  const exposureRate =
    balanceAtEntry !== null &&
    balanceAtEntry > 0 &&
    capitalCommitted !== null &&
    capitalCommitted >= 0
      ? (capitalCommitted /
          balanceAtEntry) *
        100
      : null;

  return {
    leverage,
    exposureRate,
  };
}

export function buildRiskAnalysis(
  reviews: TradeReview[]
): RiskAnalysisResult {
  const counts = {
    lowRisk: 0,
    mediumRisk: 0,
    highRisk: 0,
  };

  for (const review of reviews) {
    const {
      leverage,
      exposureRate,
    } = extractRiskData(review);

    const hasLeverage =
      leverage !== null &&
      leverage > 0;

    const hasExposure =
      exposureRate !== null;

    if (!hasLeverage && !hasExposure) {
      continue;
    }

    if (
      (exposureRate !== null &&
        exposureRate >= 50) ||
      (leverage !== null &&
        leverage >= 20)
    ) {
      counts.highRisk++;
    } else if (
      (exposureRate !== null &&
        exposureRate >= 20) ||
      (leverage !== null &&
        leverage >= 5)
    ) {
      counts.mediumRisk++;
    } else {
      counts.lowRisk++;
    }
  }

  const classifiedTotal =
    counts.lowRisk +
    counts.mediumRisk +
    counts.highRisk;

  if (classifiedTotal === 0) {
    return {
      lowRisk: 0,
      mediumRisk: 0,
      highRisk: 0,
      highRiskRate: 0,
      status: "No Data",
    };
  }

  const highRiskRate = Math.round(
    (counts.highRisk /
      classifiedTotal) *
      100
  );

  let status: RiskAnalysisResult["status"] =
    "Low Risk";

  if (
    counts.highRisk >=
      counts.mediumRisk &&
    counts.highRisk >= counts.lowRisk
  ) {
    status = "High Risk";
  } else if (
    counts.mediumRisk >= counts.lowRisk
  ) {
    status = "Moderate Risk";
  }

  return {
    ...counts,
    highRiskRate,
    status,
  };
}