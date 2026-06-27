export type TraderProfileInput = {
  developmentReport: any;
  progressReport: any;
};

export type TraderSkill = {
  name: string;
  score: number;
  level:
    | "BEGINNER"
    | "DEVELOPING"
    | "STRONG"
    | "EXPERT";
};

export type TraderProfileReport = {
  overallScore: number;

  skills: TraderSkill[];

  strongestSkill: string;

  weakestSkill: string;

  profileSummary: string;
};