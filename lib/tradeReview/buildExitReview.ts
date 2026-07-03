export function buildExitReview(management: {
  available: boolean;
  exitEfficiency?: number;
  givebackPercent?: number;
  highestUnrealizedPercent?: number;
} | null) {
  if (!management || !management.available) {
    return {
      available: false,
      exitQuality: "UNKNOWN",
      lesson: "Exit analysis was not available.",
    };
  }

  let exitQuality = "AVERAGE";
  let lesson =
    "The exit was acceptable based on the recorded management data.";

  if ((management.exitEfficiency ?? 0) >= 90) {
    exitQuality = "EXCELLENT";
    lesson =
      "The trade captured almost all of the available move before exiting.";
  } else if ((management.exitEfficiency ?? 0) >= 75) {
    exitQuality = "GOOD";
    lesson =
      "Most of the available move was captured before exiting.";
  } else if ((management.givebackPercent ?? 0) >= 5) {
    exitQuality = "WEAK";
    lesson =
      "A significant portion of unrealized profit was given back before the trade was closed.";
  } else if ((management.highestUnrealizedPercent ?? 0) <= 1) {
    exitQuality = "NEUTRAL";
    lesson =
      "The trade never developed a meaningful unrealized profit before it was closed.";
  }

  return {
    available: true,
    exitQuality,
    lesson,
  };
}