import { buildTrendAnalysis } from "./trendAnalysis";
import { buildRiskAnalysis } from "./riskAnalysis";
import { buildStopLossAnalysis } from "./stopLossAnalysis";
import { buildTakeProfitAnalysis } from "./takeProfitAnalysis";
import { buildEntryQualityAnalysis } from "./entryQualityAnalysis";
import { buildTimeframeAnalysis } from "./timeframeAnalysis";
import { buildLeverageAnalysis } from "./leverageAnalysis";
import { buildOutcomeAnalysis } from "./outcomeAnalysis";
import { buildTraderInsights } from "./insightBuilder";



import {
  TraderDevelopmentInput,
  TraderDevelopmentReport,
} from "./types";

export function buildTraderDevelopment(
  input: TraderDevelopmentInput
): TraderDevelopmentReport {

  const totalTrades = input.reviews.length;

  const wins =
    input.reviews.filter(
      (r) => r.result === "PROFIT"
    ).length;

  const losses =
    input.reviews.filter(
      (r) => r.result === "LOSS"
    ).length;

  const winRate =
    totalTrades === 0
      ? 0
      : (wins / totalTrades) * 100;

const trendAnalysis =
  buildTrendAnalysis(input.reviews);

  const riskAnalysis =
  buildRiskAnalysis(input.reviews);

const stopLossAnalysis =
  buildStopLossAnalysis(input.reviews);

const takeProfitAnalysis =
  buildTakeProfitAnalysis(input.reviews);

const entryQualityAnalysis =
  buildEntryQualityAnalysis(input.reviews);

const timeframeAnalysis =
  buildTimeframeAnalysis(input.reviews);

const leverageAnalysis =
  buildLeverageAnalysis(input.reviews);

const outcomeAnalysis =
  buildOutcomeAnalysis(input.reviews);

const baseReport = {
  totalTrades,
  wins,
  losses,
  winRate,
  trendAnalysis,
  riskAnalysis,
  stopLossAnalysis,
  takeProfitAnalysis,
  entryQualityAnalysis,
  timeframeAnalysis,
  leverageAnalysis,
  outcomeAnalysis,
};

const insights =
  buildTraderInsights(baseReport);

return {
  totalTrades,

  wins,

  losses,

  winRate,

  trendAnalysis,

  riskAnalysis,

  stopLossAnalysis,

takeProfitAnalysis,

entryQualityAnalysis,

timeframeAnalysis,

leverageAnalysis,

outcomeAnalysis,

strengths: insights.strengths,

weaknesses: insights.weaknesses,

recommendations: insights.recommendations,

};

}