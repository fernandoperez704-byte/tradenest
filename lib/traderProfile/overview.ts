import {
  TraderProfileInput,
  TraderProfileReport,
} from "./types";

import { buildSkillAnalysis } from "./skillAnalysis";
import { buildProfileSummary } from "./profileBuilder";

export function buildTraderProfile(
  input: TraderProfileInput
): TraderProfileReport {

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