import type {
  TraderSkill,
} from "./types";

export function buildProfileSummary(
  strongestSkill: TraderSkill | null,
  weakestSkill: TraderSkill | null
): string {
  if (!strongestSkill || !weakestSkill) {
    return "Complete more reviewed trades to generate a personalized trader profile.";
  }

  return [
    `Your strongest trading skill is ${strongestSkill.name} (${strongestSkill.level}).`,
    `Your biggest opportunity for improvement is ${weakestSkill.name} (${weakestSkill.level}).`,
    strongestSkill.summary,
  ].join(" ");
}