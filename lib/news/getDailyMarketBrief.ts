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
  const snapshot = await adminDb
    .collection("dailyMarketBriefs")
    .orderBy("date", "desc")
    .limit(1)
    .get();

  if (snapshot.empty) {
    return null;
  }

  const document = snapshot.docs[0];

  return document.data() as DailyMarketBrief;
}