import {
  TraderProgressInput,
  TraderProgressReport,
} from "./types";

import { buildImprovementAnalysis } from "./improvementAnalysis";
import { buildConsistencyAnalysis } from "./consistencyAnalysis";
import { buildMilestoneAnalysis } from "./milestoneAnalysis";

export function buildTraderProgress(
  input: TraderProgressInput
): TraderProgressReport {

const minimumTrades = 20;

if (input.reviews.length < minimumTrades) {
  return {
    enoughData: false,

    currentTrades: input.reviews.length,

    minimumTrades,

    totalTrades: input.reviews.length,

    firstPeriod: {
      trades: 0,
      winRate: 0,
    },

    recentPeriod: {
      trades: 0,
      winRate: 0,
    },

    improvement: {
      winRateChange: 0,
    },

    strengths: [],

    improvements: [],

    milestones: [],
  } as any;
}

  const improvement =
    buildImprovementAnalysis(input.reviews);

  const consistency =
    buildConsistencyAnalysis(input.reviews);

  const milestones =
    buildMilestoneAnalysis(input.reviews);

  return {
    totalTrades: input.reviews.length,

    firstPeriod: {
      trades: Math.floor(input.reviews.length / 2),
      winRate: improvement.firstWinRate,
    },

    recentPeriod: {
      trades:
        input.reviews.length -
        Math.floor(input.reviews.length / 2),
      winRate: improvement.recentWinRate,
    },

    improvement: {
      winRateChange: improvement.change,
    },

    strengths:
      improvement.change > 0
        ? [
            "Win rate has improved over time.",
          ]
        : [],

    improvements:
      improvement.change < 0
        ? [
            "Recent performance has declined compared to earlier trades.",
          ]
        : [],

    milestones,
  };
}