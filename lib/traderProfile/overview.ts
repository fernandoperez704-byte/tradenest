import {
  TraderProfileInput,
  TraderProfileReport,
} from "./types";

import { buildSkillAnalysis } from "./skillAnalysis";
import { buildProfileSummary } from "./profileBuilder";

export function buildTraderProfile(
  input: TraderProfileInput
): TraderProfileReport {

const minimumTrades = 20;

const currentTrades =
  input.developmentReport?.totalTrades || 0;

if (currentTrades < minimumTrades) {
  return {
    enoughData: false,

    currentTrades,

    minimumTrades,

    overallScore: 0,

    skills: [],

    strongestSkill: "Not enough data",

    weakestSkill: "Not enough data",

    profileSummary:
      `It's too early to build a reliable trader profile. You have ${currentTrades} reviewed trade${currentTrades === 1 ? "" : "s"} so far. A profile becomes more meaningful after around ${minimumTrades} reviewed trades.`,
  } as any;
}

  const skills = buildSkillAnalysis(
    input.developmentReport,
    input.progressReport
  );

  const sortedSkills = [...skills].sort(
    (a, b) => b.score - a.score
  );

  const strongestSkill =
    sortedSkills[0]?.name || "Unknown";

  const weakestSkill =
    sortedSkills[sortedSkills.length - 1]?.name || "Unknown";

  const overallScore =
    Math.round(
      skills.reduce(
        (sum, skill) => sum + skill.score,
        0
      ) / skills.length
    );

  return {
    overallScore,

    skills,

    strongestSkill,

    weakestSkill,

    profileSummary: buildProfileSummary(
      strongestSkill,
      weakestSkill
    ),
  };
}