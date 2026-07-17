import type {
  TraderDevelopmentReport,
} from "@/lib/traderDevelopment/types";

import type {
  TraderProgressReport,
} from "@/lib/traderProgress/types";

import type {
  TraderSkill,
  TraderSkillLevel,
} from "./types";

function clampScore(
  value: number
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(100, Math.round(value))
  );
}

function getSkillLevel(
  score: number
): TraderSkillLevel {
  if (score >= 85) {
    return "EXPERT";
  }

  if (score >= 70) {
    return "STRONG";
  }

  if (score >= 50) {
    return "DEVELOPING";
  }

  return "BEGINNER";
}

function buildSkill(
  name: string,
  score: number,
  summary: string
): TraderSkill {
  const normalizedScore =
    clampScore(score);

  return {
    name,
    score: normalizedScore,
    level:
      getSkillLevel(normalizedScore),
    summary,
  };
}

export function buildSkillAnalysis(
  developmentReport: TraderDevelopmentReport,
  progressReport: TraderProgressReport
): TraderSkill[] {
  if (!developmentReport.enoughData) {
    return [];
  }

  const trendReadingScore =
    developmentReport.trendAnalysis
      ?.alignmentRate ?? 0;

  const highRiskRate =
    developmentReport.riskAnalysis
      ?.highRiskRate ?? 100;

  const riskManagementScore =
    100 - highRiskRate;

  const disciplineScore =
    developmentReport.stopLossAnalysis
      ?.usageRate ?? 0;

  const poorEntryRate =
    developmentReport.entryQualityAnalysis
      ?.poorEntryRate ?? 100;

  const entryTimingScore =
    100 - poorEntryRate;

  const consistencyScore =
    calculateConsistencyScore(
      progressReport
    );

  return [
    buildSkill(
      "Trend Reading",
      trendReadingScore,
      "Measures how often trades align with the recorded market direction."
    ),

    buildSkill(
      "Risk Management",
      riskManagementScore,
      "Measures how consistently trades avoid high-risk exposure."
    ),

    buildSkill(
      "Discipline",
      disciplineScore,
      "Measures how consistently stop losses are used."
    ),

    buildSkill(
      "Entry Timing",
      entryTimingScore,
      "Measures how often entries avoid poor market conditions."
    ),

    buildSkill(
      "Consistency",
      consistencyScore,
      "Measures whether recent performance remains stable or improves over time."
    ),
  ];
}

function calculateConsistencyScore(
  progressReport: TraderProgressReport
): number {
  const winRateChange =
    progressReport.improvement
      .winRateChange;

  const pnlTrend =
    progressReport.improvement
      .pnlTrend;

  let score = 50;

  if (winRateChange >= 15) {
    score += 25;
  } else if (winRateChange >= 5) {
    score += 15;
  } else if (winRateChange > 0) {
    score += 5;
  } else if (winRateChange <= -15) {
    score -= 25;
  } else if (winRateChange <= -5) {
    score -= 15;
  } else if (winRateChange < 0) {
    score -= 5;
  }

  if (pnlTrend === "IMPROVING") {
    score += 15;
  } else if (
    pnlTrend === "DECLINING"
  ) {
    score -= 15;
  }

  return clampScore(score);
}