import { adminDb } from "@/lib/firebaseAdmin";
import { buildTraderProgress } from "@/lib/traderProgress/overview";
import { buildTraderProfile } from "@/lib/traderProfile/overview";
import { buildTraderDevelopment } from "./overview";

import type { TradeReview } from "./types";

function getCreatedTime(
  createdAt: TradeReview["createdAt"]
): number {
  if (!createdAt) {
    return 0;
  }

  if (
    typeof createdAt === "object" &&
    "toMillis" in createdAt &&
    typeof createdAt.toMillis === "function"
  ) {
    return createdAt.toMillis();
  }

  if (
    typeof createdAt === "object" &&
    "toDate" in createdAt &&
    typeof createdAt.toDate === "function"
  ) {
    return createdAt.toDate().getTime();
  }

  const time = new Date(
    createdAt as string | number | Date
  ).getTime();

  return Number.isFinite(time)
    ? time
    : 0;
}

export async function buildTraderDevelopmentReport(
  userId: string,
  limit?: number
) {
  const snapshot = await adminDb
    .collection("tradeReviews")
    .where("userId", "==", userId)
    .get();

  // 1. Data normalization
  let reviews: TradeReview[] =
    snapshot.docs
      .map((doc) => {
        const data = doc.data();

        const raw =
          data.review ?? data;

        const engine =
          raw.engine &&
          typeof raw.engine === "object"
            ? raw.engine
            : null;

        const review: TradeReview = {
          ...raw,
          ...(engine ?? {}),

          engine:
            engine ?? raw.engine,

          snapshotId:
            raw.snapshotId ??
            data.snapshotId,

          createdAt:
            raw.createdAt ??
            data.createdAt,

          userId:
            raw.userId ??
            data.userId,
        };

        return review;
      })
      .filter((review) => {
        const result = String(
          review.result ??
            review.outcome ??
            review.automaticReview?.result ??
            ""
        ).toUpperCase();

        return (
          result !== "" &&
          result !== "OPEN"
        );
      })
      .sort(
        (first, second) =>
          getCreatedTime(second.createdAt) -
          getCreatedTime(first.createdAt)
      );

  if (
    typeof limit === "number" &&
    Number.isInteger(limit) &&
    limit > 0
  ) {
    reviews = reviews.slice(0, limit);
  }

  // 2. Report generation pipeline
  const developmentReport =
    buildTraderDevelopment({
      reviews,
    });

  const progressReport =
    buildTraderProgress({
      reviews,
    });

  // 3. Profile report
  const profileReport =
    buildTraderProfile({
      developmentReport,
      progressReport,
    });

  return {
    developmentReport,
    progressReport,
    profileReport,
  };
}