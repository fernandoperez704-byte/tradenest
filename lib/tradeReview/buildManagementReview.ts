import type {
  TradeManagementData,
} from "./types";

export type ProfitCaptureQuality =
  | "EXCELLENT"
  | "GOOD"
  | "AVERAGE"
  | "POOR"
  | "UNKNOWN";

export type DrawdownControlQuality =
  | "GOOD"
  | "AVERAGE"
  | "WEAK"
  | "UNKNOWN";

export type ManagementQuality =
  | "STRONG"
  | "GOOD"
  | "AVERAGE"
  | "WEAK"
  | "UNKNOWN";

export interface ManagementReviewResult {
  available: boolean;

  durationMinutes?: number | null;

  highestUnrealizedPnl?: number;
  lowestUnrealizedPnl?: number;

  highestUnrealizedPercent?: number;
  lowestUnrealizedPercent?: number;

  exitPercent?: number;
  givebackPercent?: number;
  exitEfficiency?: number;

  profitCapture: ProfitCaptureQuality;
  drawdownControl: DrawdownControlQuality;
  managementQuality: ManagementQuality;

  lesson: string;
}

function toFiniteNumber(
  value: unknown
): number | null {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : null;
}

function clampPercent(
  value: number
): number {
  return Math.max(
    0,
    Math.min(100, value)
  );
}

export function buildManagementReview(
  management: TradeManagementData | null
): ManagementReviewResult {
  if (!management) {
    return {
      available: false,
      profitCapture: "UNKNOWN",
      drawdownControl: "UNKNOWN",
      managementQuality: "UNKNOWN",
      lesson:
        "Management data was not available for this trade.",
    };
  }

  const highestUnrealizedPnl =
    toFiniteNumber(
      management.highestUnrealizedPnl
    ) ?? 0;

  const lowestUnrealizedPnl =
    toFiniteNumber(
      management.lowestUnrealizedPnl
    ) ?? 0;

  const highestUnrealizedPercent =
    toFiniteNumber(
      management.highestUnrealizedPercent
    ) ?? 0;

  const lowestUnrealizedPercent =
    toFiniteNumber(
      management.lowestUnrealizedPercent
    ) ?? 0;

  const exitPercent =
    toFiniteNumber(
      management.exitPercent
    ) ?? 0;

  const givebackPercent =
    clampPercent(
      toFiniteNumber(
        management.givebackPercent
      ) ?? 0
    );

  const exitEfficiency =
    clampPercent(
      toFiniteNumber(
        management.exitEfficiency
      ) ?? 0
    );

  const durationMinutes =
    management.durationMinutes;

  const retainedMostProfit =
    exitEfficiency >= 80;

  const gaveBackLargeMove =
    givebackPercent >= 5;

  const closedNearPeak =
    givebackPercent <= 2 &&
    highestUnrealizedPercent >= 2;

  const neverDevelopedProfit =
    highestUnrealizedPercent <= 0;

  const experiencedMeaningfulDrawdown =
    lowestUnrealizedPercent <= -5;

  const experiencedModerateDrawdown =
    lowestUnrealizedPercent <= -2;

  let profitCapture:
    ProfitCaptureQuality =
      "AVERAGE";

  let drawdownControl:
    DrawdownControlQuality =
      "GOOD";

  let managementQuality:
    ManagementQuality =
      "AVERAGE";

  let lesson =
    "Trade management was acceptable based on the recorded data.";

  // Profit-capture classification
  if (closedNearPeak) {
    profitCapture = "EXCELLENT";
  } else if (retainedMostProfit) {
    profitCapture = "GOOD";
  } else if (gaveBackLargeMove) {
    profitCapture = "POOR";
  }

  // Drawdown-control classification
  if (experiencedMeaningfulDrawdown) {
    drawdownControl = "WEAK";
  } else if (experiencedModerateDrawdown) {
    drawdownControl = "AVERAGE";
  }

  // Overall management quality
  if (
    profitCapture === "EXCELLENT" &&
    drawdownControl !== "WEAK"
  ) {
    managementQuality = "STRONG";

    lesson =
      "The trade captured most of the available move while keeping drawdown under control.";
  } else if (
    profitCapture === "GOOD" &&
    drawdownControl === "GOOD"
  ) {
    managementQuality = "GOOD";

    lesson =
      "Most unrealized profit was retained and drawdown remained controlled before the trade was closed.";
  } else if (
    profitCapture === "POOR"
  ) {
    managementQuality = "WEAK";

    lesson =
      "A significant portion of unrealized profit was given back before the trade was closed.";
  } else if (
    neverDevelopedProfit &&
    experiencedModerateDrawdown
  ) {
    managementQuality = "WEAK";

    lesson =
      "The trade remained under pressure and did not develop meaningful unrealized profit.";
  } else if (
    drawdownControl === "WEAK"
  ) {
    managementQuality = "WEAK";

    lesson =
      "The trade experienced a large adverse move before it was closed.";
  }

  return {
    available: true,

    durationMinutes,

    highestUnrealizedPnl,
    lowestUnrealizedPnl,

    highestUnrealizedPercent,
    lowestUnrealizedPercent,

    exitPercent,
    givebackPercent,
    exitEfficiency,

    profitCapture,
    drawdownControl,
    managementQuality,

    lesson,
  };
}