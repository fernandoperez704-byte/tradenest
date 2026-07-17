import { buildImprovementAnalysis } from "./improvementAnalysis";
import { buildConsistencyAnalysis } from "./consistencyAnalysis";
import { buildMilestoneAnalysis } from "./milestoneAnalysis";

import type {
  TraderProgressInput,
  TraderProgressReport,
} from "./types";

const MINIMUM_TRADES = 20;

function removeDuplicates(
  values: string[]
): string[] {
  return Array.from(new Set(values));
}

function buildEmptyProgressReport(
  totalTrades: number
): TraderProgressReport {
  return {
    totalTrades,

firstPeriod: {
  trades: 0,
  wins: 0,
  losses: 0,
  breakeven: 0,
  winRate: 0,
  avgPnl: 0,
},

recentPeriod: {
  trades: 0,
  wins: 0,
  losses: 0,
  breakeven: 0,
  winRate: 0,
  avgPnl: 0,
},

    improvement: {
      winRateChange: 0,
      pnlTrend: "STABLE",
    },

    strengths: [],

    improvements: [
      `Complete at least ${MINIMUM_TRADES} trades to unlock a reliable progress analysis.`,
    ],

    milestones: [],
  };
}

export function buildTraderProgress(
  input: TraderProgressInput
): TraderProgressReport {
  const { reviews } = input;
  const totalTrades = reviews.length;

  if (totalTrades < MINIMUM_TRADES) {
    return buildEmptyProgressReport(
      totalTrades
    );
  }

  const improvementReport =
    buildImprovementAnalysis({
      reviews,
    });

  const consistencyAnalysis =
    buildConsistencyAnalysis(reviews);

  const milestoneAnalysis =
    buildMilestoneAnalysis(reviews);

  const strengths = [
    ...improvementReport.strengths,
  ];

  const improvements = [
    ...improvementReport.improvements,
  ];

  const milestones = [
    ...improvementReport.milestones,
  ];

  if (
    consistencyAnalysis.consistency ===
    "CONSISTENT"
  ) {
    strengths.push(
      "Your execution has remained consistent across recent trades."
    );
  } else if (
    consistencyAnalysis.consistency ===
    "INCONSISTENT"
  ) {
    improvements.push(
      "Recent results show inconsistent execution between trades."
    );
  }

  if (
    Array.isArray(
      milestoneAnalysis.milestonesReached
    )
  ) {
    milestones.push(
      ...milestoneAnalysis.milestonesReached
    );
  }

  return {
    totalTrades,

    firstPeriod:
      improvementReport.firstPeriod,

    recentPeriod:
      improvementReport.recentPeriod,

    improvement:
      improvementReport.improvement,

    strengths:
      removeDuplicates(strengths),

    improvements:
      removeDuplicates(improvements),

    milestones:
      removeDuplicates(milestones),
  };
}