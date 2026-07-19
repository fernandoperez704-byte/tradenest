import "server-only";

import { adminDb } from "@/lib/firebaseAdmin";
import type {
  CryptoHistoryEvent,
  DailyLookBack,
} from "./types";

function formatDate(
  month: number,
  day: number
): string {
  return new Date(
    2000,
    month - 1,
    day
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

export async function getDailyLookBack(
  date: Date = new Date()
): Promise<DailyLookBack | null> {
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

const exactSnapshot = await adminDb
  .collection("cryptoHistory")
  .where("month", "==", month)
  .where("day", "==", day)
  .where("verified", "==", true)
  .where("status", "==", "PUBLISHED")
  .limit(1)
  .get();

  if (!exactSnapshot.empty) {
    const document =
      exactSnapshot.docs[0];

    const event = {
      id: document.id,
      ...document.data(),
    } as CryptoHistoryEvent;

    return {
      label: "ON_THIS_DAY",
      dateLabel: formatDate(
        event.month,
        event.day
      ),
      year: event.year,
      title: event.title,
      whatHappened: event.whatHappened,
      whyItMatters: event.whyItMatters,
    };
  }

  // No exact event: retrieve published events.
const fallbackSnapshot = await adminDb
  .collection("cryptoHistory")
  .where("verified", "==", true)
  .where("status", "==", "PUBLISHED")
  .get();

  if (fallbackSnapshot.empty) {
    return null;
  }

  const events =
    fallbackSnapshot.docs.map(
      (document) =>
        ({
          id: document.id,
          ...document.data(),
        }) as CryptoHistoryEvent
    );

  // Stable daily selection.
  const startOfYear = Date.UTC(
    date.getUTCFullYear(),
    0,
    0
  );

  const currentDate = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  );

  const dayOfYear = Math.floor(
    (currentDate - startOfYear) /
      86_400_000
  );

  const event =
    events[dayOfYear % events.length];

  return {
    label: "LOOK_BACK",
    dateLabel: formatDate(
      event.month,
      event.day
    ),
    year: event.year,
    title: event.title,
    whatHappened: event.whatHappened,
    whyItMatters: event.whyItMatters,
  };
}