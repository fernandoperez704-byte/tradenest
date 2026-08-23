import { adminDb } from "@/lib/firebaseAdmin";

const DEV_PRO_USER_IDS = [
  process.env.DEV_PRO_USER_ID,
].filter(Boolean);

export async function isPaidUser(userId: string) {
  if (!userId) return false;

  if (DEV_PRO_USER_IDS.includes(userId)) {
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