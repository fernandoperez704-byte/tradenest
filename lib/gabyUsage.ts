import { adminDb } from "@/lib/firebaseAdmin";
import { isPaidUser } from "@/lib/subscription";

const FREE_GABY_LIMIT = 5;

export async function checkGabyUsage(userId: string) {
  if (await isPaidUser(userId)) {
    return { allowed: true, isPaid: true, used: 0, remaining: null };
  }

  const ref = adminDb.collection("gabyUsage").doc(userId);
  const snap = await ref.get();
  const used = snap.data()?.questionsUsed ?? 0;

  return {
    allowed: used < FREE_GABY_LIMIT,
    isPaid: false,
    used,
    remaining: Math.max(0, FREE_GABY_LIMIT - used),
  };
}

export async function useGabyQuestion(userId: string) {
  if (await isPaidUser(userId)) {
    return;
  }

  const ref = adminDb.collection("gabyUsage").doc(userId);

  await adminDb.runTransaction(async (transaction) => {
    const snap = await transaction.get(ref);
    const used = snap.data()?.questionsUsed ?? 0;

    transaction.set(
      ref,
      {
        questionsUsed: used + 1,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  });
}