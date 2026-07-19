import "server-only";

import { adminDb } from "@/lib/firebaseAdmin";

import type { DailyLookBack } from "./types";

export type DailyMarketConcept = {
  title: string;
  explanation: string;
};

export type DailyMarketHeadline = {
  title: string;
  source: string;
  publishedAt: string;
  gabyInsight: string;
};

export type DailyMarketBrief = {
  date: string;
  displayDate: string;
  headlines: DailyMarketHeadline[];
  breakdown: string;
  concepts: DailyMarketConcept[];
  categories: string[];

  lookBack: DailyLookBack | null;
};

export async function getDailyMarketBrief(): Promise<DailyMarketBrief | null> {
  const today = new Date()
    .toISOString()
    .slice(0, 10);

  const snapshot = await adminDb
    .collection("dailyMarketBriefs")
    .doc(today)
    .get();

  if (!snapshot.exists) {
    return null;
  }

  return snapshot.data() as DailyMarketBrief;
}