import { adminDb } from "@/lib/firebaseAdmin";

export async function isPaidUser(userId: string) {
  if (!userId) return false;

  const snap = await adminDb
    .collection("subscriptions")
    .doc(userId)
    .get();

  if (!snap.exists) return false;

  const status = snap.data()?.status;

  return status === "active" || status === "trialing";
}