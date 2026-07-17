import { buildTrendAnalysis } from "./trendAnalysis";
import { buildRiskAnalysis } from "./riskAnalysis";
import { buildStopLossAnalysis } from "./stopLossAnalysis";
import { buildTakeProfitAnalysis } from "./takeProfitAnalysis";
import { buildEntryQualityAnalysis } from "./entryQualityAnalysis";
import { buildTimeframeAnalysis } from "./timeframeAnalysis";
import { buildLeverageAnalysis } from "./leverageAnalysis";
import { buildOutcomeAnalysis } from "./outcomeAnalysis";
import { buildExitManagementAnalysis } from "./exitManagementAnalysis";
import { buildTraderInsights } from "./insightBuilder";

import type {
  TraderDevelopmentInput,
  TraderDevelopmentReport,
  TraderInsightInput,
} from "./types";

export function buildTraderDevelopment(
  input: TraderDevelopmentInput
): TraderDevelopmentReport {
  const { reviews } = input;

  const minimumTrades = 20;
  const totalTrades = reviews.length;

  if (totalTrades < minimumTrades) {
    return {
      enoughData: false,
      currentTrades: totalTrades,
      minimumTrades,

      totalTrades,
      wins: 0,
      losses: 0,
      winRate: 0,

      trendAnalysis: null,
      riskAnalysis: null,
      stopLossAnalysis: null,
      takeProfitAnalysis: null,
      entryQualityAnalysis: null,
      timeframeAnalysis: null,
      leverageAnalysis: null,
      outcomeAnalysis: null,
      exitManagementAnalysis: null,

      strengths: [],
      weaknesses: [],
      recommendations: [],

      confidence: "LOW",

      currentFocus: {
        title: "Continue Building Trade History",
        reason: `Complete at least ${minimumTrades} trades to unlock a reliable trader development report.`,
      },

      gabyAnalysisData: {
        primaryStrength: null,
        primaryWeakness: null,
        highestImpactFocus:
          "Continue completing trades so the report can identify meaningful patterns.",
        summaryFacts: [
          `Trades completed: ${totalTrades}`,
          `Trades required: ${minimumTrades}`,
        ],
      },
    };
  }

  const outcomeAnalysis =
    buildOutcomeAnalysis(reviews);

  const wins = outcomeAnalysis.wins;
  const losses = outcomeAnalysis.losses;

  const completedOutcomes =
    wins + losses;

  const winRate =
    completedOutcomes === 0
      ? 0
      : Number(
          (
            (wins / completedOutcomes) *
            100
          ).toFixed(1)
        );

  const trendAnalysis =
    buildTrendAnalysis(reviews);

  const riskAnalysis =
    buildRiskAnalysis(reviews);

  const stopLossAnalysis =
    buildStopLossAnalysis(reviews);

  const takeProfitAnalysis =
    buildTakeProfitAnalysis(reviews);

  const entryQualityAnalysis =
    buildEntryQualityAnalysis(reviews);

  const timeframeAnalysis =
    buildTimeframeAnalysis(reviews);

  const leverageAnalysis =
    buildLeverageAnalysis(reviews);

  const exitManagementAnalysis =
    buildExitManagementAnalysis(reviews);

  const insightInput: TraderInsightInput = {
    trendAnalysis,
    riskAnalysis,
    stopLossAnalysis,
    entryQualityAnalysis,
    timeframeAnalysis,
    leverageAnalysis,
  };

  const insights =
    buildTraderInsights(insightInput);

  return {
    enoughData: true,
    currentTrades: totalTrades,
    minimumTrades,

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
    exitManagementAnalysis,

    strengths: insights.strengths,
    weaknesses: insights.weaknesses,
    recommendations:
      insights.recommendations,

    confidence:
      totalTrades < 50
        ? "MEDIUM"
        : "HIGH",

    currentFocus: {
      title:
        insights.weaknesses[0] ??
        "Continue Building Consistency",

      reason:
        insights.recommendations[0] ??
        "Continue completing trades to identify a stronger improvement focus.",
    },

    gabyAnalysisData: {
      primaryStrength:
        insights.strengths[0] ?? null,

      primaryWeakness:
        insights.weaknesses[0] ?? null,

      highestImpactFocus:
        insights.recommendations[0] ??
        "Continue completing trades to identify stronger patterns.",

      summaryFacts: [
        `Trades analyzed: ${totalTrades}`,
        `Win rate: ${winRate.toFixed(1)}%`,
      ],
    },
  };
}