import type {
  TraderDevelopmentReport,
} from "@/lib/traderDevelopment/types";

import type {
  TraderProgressReport,
} from "@/lib/traderProgress/types";

export type TraderSkillLevel =
  | "BEGINNER"
  | "DEVELOPING"
  | "STRONG"
  | "EXPERT";

export interface TraderProfileInput {
  developmentReport: TraderDevelopmentReport;
  progressReport: TraderProgressReport;
}

export interface TraderSkill {
  name: string;
  score: number;
  level: TraderSkillLevel;
  summary: string;
}

export interface TraderProfileReport {
  enoughData: boolean;
  currentTrades: number;
  minimumTrades: number;

  overallScore: number;
  skills: TraderSkill[];

  strongestSkill: TraderSkill | null;
  weakestSkill: TraderSkill | null;

  profileSummary: string;

  confidence:
    | "LOW"
    | "MEDIUM"
    | "HIGH";
}