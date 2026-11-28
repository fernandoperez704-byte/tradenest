import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { isPaidUser } from "@/lib/subscription";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    if (body?.expectedUserId !== userId) {
      return NextResponse.json(
        { error: "Account mismatch" },
        { status: 403 }
      );
    }

    const reviewsRef = adminDb.collection("tradeReviews");

    const isStockReview =
      body.action === "SAVE_REVIEW" &&
      body.review?.mode === "STOCKS";

    if (!isStockReview && !(await isPaidUser(userId))) {
      return NextResponse.json(
        { error: "Pro subscription required" },
        { status: 403 }
      );
    }

    if (body.action === "GET_REVIEWS") {
      const snapshot = await reviewsRef
        .where("userId", "==", userId)
        .get();

      return NextResponse.json({
        reviews: snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })),
      });
    }

    if (body.action === "SAVE_REVIEW") {
      const review = body.review;

      if (
        !review ||
        typeof review !== "object" ||
        Array.isArray(review) ||
        typeof review.snapshotId !== "string" ||
        !review.snapshotId.trim() ||
        !["SPOT", "FUTURES", "COINBASE_FUTURES", "STOCKS"].includes(
          review.mode
        ) ||
        typeof review.coin !== "string" ||
        !review.coin.trim() ||
        !["LONG", "SHORT"].includes(review.side) ||
        !review.review ||
        typeof review.review !== "object" ||
        Array.isArray(review.review) ||
        review.review.snapshotId !== review.snapshotId
      ) {
        return NextResponse.json(
          { error: "Invalid trade review" },
          { status: 400 }
        );
      }

      const trader = await currentUser();

      if (!trader || trader.id !== userId) {
        return NextResponse.json(
          { error: "Unable to verify account" },
          { status: 403 }
        );
      }

      const allowedFields = [
        "snapshotId",
        "mode",
        "coin",
        "side",
        "amount",
        "leverage",
        "margin",
        "positionSize",
        "balanceAtEntry",
        "tradeContext",
        "review",
        "tradeResult",
      ];

      const reviewData = Object.fromEntries(
        allowedFields
          .filter((field) => review[field] !== undefined)
          .map((field) => [field, review[field]])
      );

      const savedReview = await reviewsRef.add({
        ...reviewData,
        userId,
        userName: trader.firstName || "Trader",
        created:
          review.mode === "STOCKS"
            ? new Date().toISOString()
            : new Date(),
      });

      return NextResponse.json({
        success: true,
        id: savedReview.id,
      });
    }

    if (body.action === "UPDATE_REVIEW") {
      const completedSnapshot = body.completedSnapshot;

      if (
        !completedSnapshot ||
        typeof completedSnapshot !== "object" ||
        Array.isArray(completedSnapshot) ||
        typeof completedSnapshot.snapshotId !== "string" ||
        !completedSnapshot.snapshotId.trim()
      ) {
        return NextResponse.json(
          { error: "Invalid review snapshot" },
          { status: 400 }
        );
      }

      const snapshot = await reviewsRef
        .where("userId", "==", userId)
        .where(
          "snapshotId",
          "==",
          completedSnapshot.snapshotId
        )
        .get();

      for (let i = 0; i < snapshot.docs.length; i += 400) {
        const batch = adminDb.batch();

        snapshot.docs.slice(i, i + 400).forEach((doc) => {
          batch.update(doc.ref, {
            review: completedSnapshot,
          });
        });

        await batch.commit();
      }

      return NextResponse.json({
        success: true,
        updated: snapshot.size,
      });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Simulator trade reviews API error:", error);

    return NextResponse.json(
      { error: "Trade review operation failed" },
      { status: 500 }
    );
  }
}