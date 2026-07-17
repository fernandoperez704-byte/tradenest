import type {
  ProgressPeriod,
  ProgressTrend,
  TraderProgressInput,
  TraderProgressReport,
} from "./types";

function getCreatedTime(
  createdAt: unknown
): number {
  if (!createdAt) {
    return 0;
  }

  if (
    typeof createdAt === "object" &&
    createdAt !== null &&
    "toMillis" in createdAt &&
    typeof createdAt.toMillis === "function"
  ) {
    return createdAt.toMillis();
  }

  if (
    typeof createdAt === "object" &&
    createdAt !== null &&
    "toDate" in createdAt &&
    typeof createdAt.toDate === "function"
  ) {
    return createdAt.toDate().getTime();
  }

  const time = new Date(
    createdAt as string | number | Date
  ).getTime();

  return Number.isFinite(time)
    ? time
    : 0;
}

function getNormalizedResult(
  result: unknown
): string {
  return String(result ?? "")
    .trim()
    .toUpperCase();
}

function calculatePeriod(
  reviews: TraderProgressInput["reviews"]
): ProgressPeriod {
  let wins = 0;
  let losses = 0;
  let breakeven = 0;

  let totalPnl = 0;
  let pnlCount = 0;

  for (const review of reviews) {
    const result = getNormalizedResult(
      review.result ??
        review.outcome ??
        review.automaticReview?.result ??
        review.automaticReview?.outcome
    );

    if (
      result === "PROFIT" ||
      result === "WIN"
    ) {
      wins++;
    } else if (result === "LOSS") {
      losses++;
    } else if (
      result === "BREAKEVEN" ||
      result === "BREAK_EVEN"
    ) {
      breakeven++;
    }

    const pnl = Number(review.pnl);

    if (Number.isFinite(pnl)) {
      totalPnl += pnl;
      pnlCount++;
    }
  }

  const completedTrades =
    wins + losses;

  const winRate =
    completedTrades === 0
      ? 0
      : Number(
          (
            (wins / completedTrades) *
            100
          ).toFixed(2)
        );

  const avgPnl =
    pnlCount === 0
      ? 0
      : Number(
          (totalPnl / pnlCount).toFixed(2)
        );

  return {
    trades: reviews.length,
    wins,
    losses,
    breakeven,
    winRate,
    avgPnl,
  };
}

function determinePnlTrend(
  firstAvgPnl: number,
  recentAvgPnl: number
): ProgressTrend {
  const difference =
    recentAvgPnl - firstAvgPnl;

  if (difference > 0.01) {
    return "IMPROVING";
  }

  if (difference < -0.01) {
    return "DECLINING";
  }

  return "STABLE";
}

/**
 * Compares the earliest half of reviewed trades
 * with the most recent half.
 */
export function buildImprovementAnalysis(
  input: TraderProgressInput
): TraderProgressReport {
  const reviews = [...input.reviews].sort(
    (first, second) =>
      getCreatedTime(first.createdAt) -
      getCreatedTime(second.createdAt)
  );

  const totalTrades = reviews.length;

  const splitIndex =
    Math.floor(totalTrades / 2);

  const firstHalfReviews =
    reviews.slice(0, splitIndex);

  const recentHalfReviews =
    reviews.slice(splitIndex);

  const firstPeriod =
    calculatePeriod(firstHalfReviews);

  const recentPeriod =
    calculatePeriod(recentHalfReviews);

  const winRateChange = Number(
    (
      recentPeriod.winRate -
      firstPeriod.winRate
    ).toFixed(2)
  );

  const pnlTrend = determinePnlTrend(
    firstPeriod.avgPnl,
    recentPeriod.avgPnl
  );

  const strengths: string[] = [];
  const improvements: string[] = [];
  const milestones: string[] = [];

  if (winRateChange >= 10) {
    strengths.push(
      `Win rate improved by ${winRateChange.toFixed(1)} percentage points in the recent period.`
    );

    milestones.push(
      "Recent win-rate performance improved by at least 10 percentage points."
    );
  } else if (winRateChange > 0) {
    strengths.push(
      `Win rate improved by ${winRateChange.toFixed(1)} percentage points in the recent period.`
    );
  } else if (winRateChange <= -10) {
    improvements.push(
      `Recent win rate declined by ${Math.abs(
        winRateChange
      ).toFixed(1)} percentage points.`
    );
  } else if (winRateChange < 0) {
    improvements.push(
      `Recent win rate declined by ${Math.abs(
        winRateChange
      ).toFixed(1)} percentage points.`
    );
  } else if (totalTrades > 0) {
    strengths.push(
      "Win-rate performance remained stable between the two periods."
    );
  }

  if (pnlTrend === "IMPROVING") {
    strengths.push(
      "Average profit and loss per trade improved in the recent period."
    );
  } else if (pnlTrend === "DECLINING") {
    improvements.push(
      "Average profit and loss per trade declined in the recent period."
    );
  }

  return {
    totalTrades,

    firstPeriod,

    recentPeriod,

    improvement: {
      winRateChange,
      pnlTrend,
    },

    strengths,
    improvements,
    milestones,
  };
}