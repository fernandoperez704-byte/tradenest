import type {
  ExitManagementResult,
  TradeReview,
} from "./types";

type ExitManagementStats = {
  strong: number;
  good: number;
  average: number;
  weak: number;
  totalEfficiency: number;
  efficiencyCount: number;
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

export function buildExitManagementAnalysis(
  reviews: TradeReview[]
): ExitManagementResult {
  const stats =
    reviews.reduce<ExitManagementStats>(
      (acc, review) => {
        const management =
          review.managementReview ??
          review.management ??
          review.automaticReview
            ?.managementReview ??
          null;

        if (
          !management ||
          management.available === false
        ) {
          return acc;
        }

        const quality = String(
          management.managementQuality ?? ""
        ).toUpperCase();

        const efficiency = toValidNumber(
          management.exitEfficiency
        );

        if (quality === "STRONG") {
          acc.strong++;
        } else if (quality === "GOOD") {
          acc.good++;
        } else if (
          quality === "AVERAGE"
        ) {
          acc.average++;
        } else if (quality === "WEAK") {
          acc.weak++;
        }

        if (efficiency !== null) {
          acc.totalEfficiency += efficiency;
          acc.efficiencyCount++;
        }

        return acc;
      },
      {
        strong: 0,
        good: 0,
        average: 0,
        weak: 0,
        totalEfficiency: 0,
        efficiencyCount: 0,
      }
    );

  const total =
    stats.strong +
    stats.good +
    stats.average +
    stats.weak;

  const averageExitEfficiency =
    stats.efficiencyCount === 0
      ? 0
      : Math.round(
          stats.totalEfficiency /
            stats.efficiencyCount
        );

  const positiveManagementRate =
    total === 0
      ? 0
      : Math.round(
          ((stats.strong + stats.good) /
            total) *
            100
        );

  let status: ExitManagementResult["status"] =
    "No Data";

  if (total > 0) {
    if (positiveManagementRate >= 70) {
      status = "Strong Management";
    } else if (
      positiveManagementRate >= 50
    ) {
      status = "Good Management";
    } else if (
      stats.weak >= stats.average &&
      stats.weak >
        stats.strong + stats.good
    ) {
      status = "Weak Management";
    } else {
      status = "Average Management";
    }
  }

  return {
    strong: stats.strong,
    good: stats.good,
    average: stats.average,
    weak: stats.weak,
    total,
    averageExitEfficiency,
    positiveManagementRate,
    status,
  };
}