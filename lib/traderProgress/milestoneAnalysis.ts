import { TradeResult } from "./types";

export interface MilestoneResult {
  milestonesReached: string[];
}

export function buildMilestoneAnalysis(reviews: Array<{ result: TradeResult }>): MilestoneResult {
  const milestones: string[] = [];
  const total = reviews ? reviews.length : 0;

  if (total >= 10) milestones.push("Completed first 10 reviewed trades.");
  if (total >= 25) milestones.push("Completed first 25 reviewed trades.");
  if (total >= 50) milestones.push("Completed first 50 reviewed trades.");
  if (total >= 100) milestones.push("Completed first 100 reviewed trades.");

  return { milestonesReached: milestones };
}