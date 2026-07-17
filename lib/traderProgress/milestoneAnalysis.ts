import type {
  TradeReview,
} from "@/lib/traderDevelopment/types";

export interface MilestoneResult {
  milestonesReached: string[];
}

const MILESTONES = [
  10,
  25,
  50,
  100,
] as const;

export function buildMilestoneAnalysis(
  reviews: TradeReview[]
): MilestoneResult {
  const totalTrades = reviews.length;

  const milestonesReached =
    MILESTONES.filter(
      (milestone) =>
        totalTrades >= milestone
    ).map(
      (milestone) =>
        `Completed first ${milestone} reviewed trades.`
    );

  return {
    milestonesReached,
  };
}