import "server-only";

import { adminDb } from "@/lib/firebaseAdmin";

export type DailyMarketConcept = {
  title: string;
  explanation: string;
};

export type DailyMarketHeadline = {
  title: string;
  source: string;
};

export type DailyMarketBrief = {
  date: string;
  displayDate: string;
  headlines: DailyMarketHeadline[];
  breakdown: string;
  concepts: DailyMarketConcept[];
  categories: string[];
};

export async function getDailyMarketBrief(): Promise<DailyMarketBrief | null> {
  const today = new Date().toISOString().slice(0, 10);

  const snapshot = await adminDb
    .collection("dailyMarketBriefs")
    .doc(today)
    .get();

  if (!snapshot.exists) {
    return null;
  }

  return snapshot.data() as DailyMarketBrief;
}