export function buildManagementReview(management: {
  openedAt: string;
  durationMinutes: number | null;
  highestUnrealizedPnl: number;
  lowestUnrealizedPnl: number;
highestUnrealizedPercent: number;
lowestUnrealizedPercent: number;

exitPercent: number;
givebackPercent: number;
exitEfficiency: number;

} | null) {
  if (!management) {
    return {
      available: false,
      managementQuality: "UNKNOWN",
      profitCapture: "UNKNOWN",
      drawdownControl: "UNKNOWN",
      lesson:
        "Management data was not available for this trade.",
    };
  }


const retainedMostProfit =
  management.exitEfficiency >= 80;

const gaveBackLargeMove =
  management.givebackPercent >= 5;

const closedNearPeak =
  management.givebackPercent <= 2 &&
  management.highestUnrealizedPercent >= 2;


let profitCapture = "AVERAGE";
let drawdownControl = "GOOD";
let managementQuality = "AVERAGE";

let lesson =
  "Trade management was acceptable based on the recorded data.";

if (closedNearPeak) {
  profitCapture = "EXCELLENT";
  managementQuality = "STRONG";

  lesson =
    "Most of the available profit was captured before exiting.";
}

if (retainedMostProfit && !closedNearPeak) {
  profitCapture = "GOOD";
  managementQuality = "GOOD";

  lesson =
    "Most unrealized profit was retained before the trade was closed.";
}

if (gaveBackLargeMove) {
  profitCapture = "POOR";
  managementQuality = "WEAK";

  lesson =
    "A significant portion of unrealized profit was given back before exiting.";
}

if (
  management.highestUnrealizedPercent <= 0 &&
  management.lowestUnrealizedPercent < -1
) {
  managementQuality = "WEAK";

  lesson =
    "The trade remained under pressure and never developed meaningful unrealized profit.";
}

  return {
    available: true,

    durationMinutes: management.durationMinutes,

    highestUnrealizedPnl: management.highestUnrealizedPnl,
    lowestUnrealizedPnl: management.lowestUnrealizedPnl,

highestUnrealizedPercent:
  management.highestUnrealizedPercent,

lowestUnrealizedPercent:
  management.lowestUnrealizedPercent,

exitPercent:
  management.exitPercent,

givebackPercent:
  management.givebackPercent,

exitEfficiency:
  management.exitEfficiency,

profitCapture,
drawdownControl,
managementQuality,
lesson,

  };
}