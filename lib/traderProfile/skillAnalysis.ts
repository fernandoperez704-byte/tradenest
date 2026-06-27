import { TraderSkill } from "./types";
export function buildSkillAnalysis(
  developmentReport: any,
  progressReport: any
) {
  const trendReadingScore =
    developmentReport?.trendAnalysis?.alignmentRate || 0;

  const riskManagementScore =
    100 - (developmentReport?.riskAnalysis?.highRiskRate || 0);

  const disciplineScore =
    developmentReport?.stopLossAnalysis?.usageRate || 0;

  const entryTimingScore =
    100 - (developmentReport?.entryQualityAnalysis?.poorEntryRate || 0);

  const consistencyScore =
    progressReport?.improvement?.winRateChange > 0
      ? 70
      : 50;

  return [
    {
      name: "Trend Reading",
      score: trendReadingScore,
      level: getSkillLevel(trendReadingScore),
    },
    {
      name: "Risk Management",
      score: riskManagementScore,
      level: getSkillLevel(riskManagementScore),
    },
    {
      name: "Discipline",
      score: disciplineScore,
      level: getSkillLevel(disciplineScore),
    },
    {
      name: "Entry Timing",
      score: entryTimingScore,
      level: getSkillLevel(entryTimingScore),
    },
    {
      name: "Consistency",
      score: consistencyScore,
      level: getSkillLevel(consistencyScore),
    },
  ];
}

function getSkillLevel(
  score: number
): TraderSkill["level"] {
  if (score >= 85) return "EXPERT";
  if (score >= 70) return "STRONG";
  if (score >= 50) return "DEVELOPING";
  return "BEGINNER";
}