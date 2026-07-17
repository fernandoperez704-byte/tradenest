export type ExitQuality =
  | "EXCELLENT"
  | "GOOD"
  | "AVERAGE"
  | "WEAK"
  | "NEUTRAL"
  | "UNKNOWN";

export interface ExitManagementInput {
  available: boolean;
  exitEfficiency?: number | null;
  givebackPercent?: number | null;
  highestUnrealizedPercent?: number | null;
}

export interface ExitReviewResult {
  available: boolean;
  exitQuality: ExitQuality;
  lesson: string;
}

function toFiniteNumber(
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

export function buildExitReview(
  management: ExitManagementInput | null
): ExitReviewResult {
  if (
    !management ||
    management.available === false
  ) {
    return {
      available: false,
      exitQuality: "UNKNOWN",
      lesson:
        "Exit analysis was not available.",
    };
  }

  const exitEfficiency = toFiniteNumber(
    management.exitEfficiency
  );

  const givebackPercent = toFiniteNumber(
    management.givebackPercent
  );

  const highestUnrealizedPercent =
    toFiniteNumber(
      management.highestUnrealizedPercent
    );

  if (
    exitEfficiency === null &&
    givebackPercent === null &&
    highestUnrealizedPercent === null
  ) {
    return {
      available: false,
      exitQuality: "UNKNOWN",
      lesson:
        "Exit analysis was not available because no valid management metrics were recorded.",
    };
  }

  let exitQuality: ExitQuality =
    "AVERAGE";

  let lesson =
    "The exit was acceptable based on the recorded management data.";

  if (
    highestUnrealizedPercent !== null &&
    highestUnrealizedPercent <= 1
  ) {
    exitQuality = "NEUTRAL";

    lesson =
      "The trade did not develop a meaningful unrealized profit before it was closed.";
  } else if (
    exitEfficiency !== null &&
    exitEfficiency >= 90
  ) {
    exitQuality = "EXCELLENT";

    lesson =
      "The exit captured almost all of the available move recorded while the trade was open.";
  } else if (
    exitEfficiency !== null &&
    exitEfficiency >= 75
  ) {
    exitQuality = "GOOD";

    lesson =
      "The exit captured most of the available move recorded while the trade was open.";
  } else if (
    givebackPercent !== null &&
    givebackPercent >= 5
  ) {
    exitQuality = "WEAK";

    lesson =
      "A significant portion of unrealized profit was given back before the trade was closed.";
  }

  return {
    available: true,
    exitQuality,
    lesson,
  };
}