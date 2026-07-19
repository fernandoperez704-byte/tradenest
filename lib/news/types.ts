export type CryptoHistorySource = {
  name: string;
  url: string;
};

export type CryptoHistoryEvent = {
  id: string;
  month: number;
  day: number;
  year: number;
  title: string;
  whatHappened: string;
  whyItMatters: string;
  sources: CryptoHistorySource[];
  verified: boolean;
  status: "DRAFT" | "PUBLISHED";
};

export type DailyLookBack = {
  label: "ON_THIS_DAY" | "LOOK_BACK";
  dateLabel: string;
  year: number;
  title: string;
  whatHappened: string;
  whyItMatters: string;
};