import { buildSkillAnalysis } from "./skillAnalysis";
import { buildProfileSummary } from "./profileBuilder";

import type {
  TraderProfileInput,
  TraderProfileReport,
  TraderSkill,
} from "./types";

const MINIMUM_TRADES = 20;

function calculateOverallScore(
  skills: TraderSkill[]
): number {
  if (skills.length === 0) {
    return 0;
  }

  const totalScore = skills.reduce(
    (sum, skill) => sum + skill.score,
    0
  );

  return Math.round(
    totalScore / skills.length
  );
}

function buildInsufficientDataProfile(
  currentTrades: number
): TraderProfileReport {
  return {
    enoughData: false,
    currentTrades,
    minimumTrades: MINIMUM_TRADES,

    overallScore: 0,
    skills: [],

    strongestSkill: null,
    weakestSkill: null,

    profileSummary:
      `It is too early to build a reliable trader profile. You currently have ${currentTrades} reviewed trade${currentTrades === 1 ? "" : "s"}. Complete at least ${MINIMUM_TRADES} reviewed trades to generate a more meaningful profile.`,

    confidence: "LOW",
  };
}

export function buildTraderProfile(
  input: TraderProfileInput
): TraderProfileReport {
  const {
    developmentReport,
    progressReport,
  } = input;

  const currentTrades =
    developmentReport.totalTrades;

  if (
    !developmentReport.enoughData ||
    currentTrades < MINIMUM_TRADES
  ) {
    return buildInsufficientDataProfile(
      currentTrades
    );
  }

  const skills = buildSkillAnalysis(
    developmentReport,
    progressReport
  );

  if (skills.length === 0) {
    return buildInsufficientDataProfile(
      currentTrades
    );
  }

  const sortedSkills = [...skills].sort(
    (first, second) =>
      second.score - first.score
  );

  const strongestSkill =
    sortedSkills[0] ?? null;

  const weakestSkill =
    sortedSkills[
      sortedSkills.length - 1
    ] ?? null;

  const overallScore =
    calculateOverallScore(skills);

  return {
    enoughData: true,
    currentTrades,
    minimumTrades: MINIMUM_TRADES,

    overallScore,
    skills,

    strongestSkill,
    weakestSkill,

    profileSummary:
      buildProfileSummary(
        strongestSkill,
        weakestSkill
      ),

    confidence:
      currentTrades < 50
        ? "MEDIUM"
        : "HIGH",
  };
}