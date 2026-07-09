import { adminDb } from "@/lib/firebaseAdmin";
import { buildTraderProgress } from "@/lib/traderProgress/overview";
import { buildTraderProfile } from "@/lib/traderProfile/overview";

import { buildTraderDevelopment } from "./overview";

export async function buildTraderDevelopmentReport(
  userId: string,
  limit?: number
) {
  const snapshot = await adminDb
    .collection("tradeReviews")
    .where("userId", "==", userId)
    .get();

  let reviews = snapshot.docs
    .map((doc) => {
      const data = doc.data();

      const review = data.review || data;

      return review.engine
        ? {
            ...review.engine,
            snapshotId: review.snapshotId,
            createdAt: review.createdAt,
          }
        : review;
    })
.filter((review: any) =>
  review &&
  review.result &&
  review.result !== "OPEN"
)
.sort((a: any, b: any) => {
      const timeA = new Date(a.createdAt || 0).getTime();
      const timeB = new Date(b.createdAt || 0).getTime();
      return timeB - timeA;
    });

  if (limit) {
    reviews = reviews.slice(0, limit);
  }

  const developmentReport = buildTraderDevelopment({
    reviews,
  });

  const progressReport = buildTraderProgress({
    reviews,
  });

  const profileReport = buildTraderProfile({
    developmentReport,
    progressReport,
  });

  return {
    developmentReport,
    progressReport,
    profileReport,
  };
}