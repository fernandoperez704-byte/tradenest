import { TraderProgressInput, TraderProgressReport } from "./types";
import { buildImprovementAnalysis } from "./improvementAnalysis";
import { buildConsistencyAnalysis } from "./consistencyAnalysis";
import { buildMilestoneAnalysis } from "./milestoneAnalysis";

export function buildTraderProgress(input: TraderProgressInput): TraderProgressReport {
  const minimumTrades = 20;

  if (!input.reviews || input.reviews.length < minimumTrades) {
    return {
      totalTrades: input.reviews ? input.reviews.length : 0,
      firstPeriod: { trades: 0, winRate: 0 },
      recentPeriod: { trades: 0, winRate: 0 },
      improvement: { winRateChange: 0 },
      strengths: [],
      improvements: [],
      milestones: [],
    };
  }

  // Generate the core report directly using your shared types
  const report = buildImprovementAnalysis(input);

  // Safely augment with consistency metrics
  const consistency = buildConsistencyAnalysis(input.reviews);
  if (consistency.consistency === "CONSISTENT") {
    report.strengths.push("Exhibits strong, repeatable execution consistency.");
  } else if (consistency.consistency === "INCONSISTENT") {
    report.improvements.push("Trading streaks show vulnerable account exposure risks.");
  }

  // Combine milestone data
  const milestoneData = buildMilestoneAnalysis(input.reviews);
  if (milestoneData.milestonesReached) {
    report.milestones = [...new Set([...report.milestones, ...milestoneData.milestonesReached])];
  }

  return report;
}