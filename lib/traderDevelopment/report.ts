import { db } from "@/app/firebase";
import { buildTraderProgress } from "@/lib/traderProgress/overview";
import { buildTraderProfile } from "@/lib/traderProfile/overview";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { buildTraderDevelopment } from "./overview";

export async function buildTraderDevelopmentReport(
  userId: string
) {
  const q = query(
    collection(db, "tradeReviews"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  const reviews = snapshot.docs
    .map((doc) => doc.data().review)
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