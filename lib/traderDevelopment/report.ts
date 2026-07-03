import { adminDb } from "@/lib/firebaseAdmin";
import { buildTraderProgress } from "@/lib/traderProgress/overview";
import { buildTraderProfile } from "@/lib/traderProfile/overview";


import { buildTraderDevelopment } from "./overview";

export async function buildTraderDevelopmentReport(
  userId: string
) {
  
const snapshot = await adminDb
  .collection("tradeReviews")
  .where("userId", "==", userId)
  .get();

const reviews = snapshot.docs
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
  .filter(Boolean);

const developmentReport =
  buildTraderDevelopment({
    reviews,
  });

const progressReport =
  buildTraderProgress({
    reviews,
  });

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