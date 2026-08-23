import { adminDb } from "@/lib/firebaseAdmin";

export async function isPaidUser(userId: string) {
  if (!userId) return false;

  // Local TradeNestX development always has Pro access
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  // Developer Pro account on deployed environments
  const devProUserId = process.env.DEV_PRO_USER_ID?.trim();

  if (devProUserId && userId === devProUserId) {
    return true;
  }

  const snap = await adminDb
    .collection("subscriptions")
    .doc(userId)
    .get();

  if (!snap.exists) return false;

  const status = snap.data()?.status;

  return status === "active" || status === "trialing";
}