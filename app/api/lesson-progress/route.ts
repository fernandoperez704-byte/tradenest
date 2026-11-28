import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

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

    const progressRef = adminDb
      .collection("lessonProgress")
      .doc(userId);

    if (body.action === "GET_PROGRESS") {
      const snapshot = await progressRef.get();

      return NextResponse.json({
        progress: snapshot.exists ? snapshot.data() : null,
      });
    }

    if (body.action === "SAVE_PROGRESS") {
      const progress = body.progress;

      if (
        !progress ||
        !Array.isArray(progress.completedLessons) ||
        !progress.completedLessons.every(
          (lesson: unknown) => typeof lesson === "string"
        ) ||
        !progress.lessonCompletionDates ||
        typeof progress.lessonCompletionDates !== "object" ||
        Array.isArray(progress.lessonCompletionDates) ||
        !Object.values(progress.lessonCompletionDates).every(
          (date) => typeof date === "string"
        ) ||
        typeof progress.currentLesson !== "string" ||
        typeof progress.onboardingCompleted !== "boolean" ||
        ![null, "GUIDED", "FULL_ACCESS"].includes(
          progress.learningMode
        )
      ) {
        return NextResponse.json(
          { error: "Invalid lesson progress" },
          { status: 400 }
        );
      }

      const student = await currentUser();

      if (!student || student.id !== userId) {
        return NextResponse.json(
          { error: "Unable to verify student identity" },
          { status: 403 }
        );
      }

      await progressRef.set(
        {
          userId,
          userEmail: student.primaryEmailAddress?.emailAddress || "",
          userName: student.firstName || student.username || "TradeNestX Student",
          completedLessons: progress.completedLessons,
          lessonCompletionDates: progress.lessonCompletionDates,
          currentLesson: progress.currentLesson,
          lastCompletedLesson:
            progress.completedLessons[
              progress.completedLessons.length - 1
            ] || "",
          onboardingCompleted: progress.onboardingCompleted,
          learningMode: progress.learningMode,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      return NextResponse.json({ success: true });
    }

    if (body.action === "QUEUE_DISCORD_LESSON") {
      const lessonTitles: Record<string, string> = {
        roadmap: "Meet Gaby",
        buying: "What Are You Buying?",
        market: "How The Market Works",
        orders: "Market vs Limit Orders",
        risk: "Protecting Your Capital",
        candlesticks: "Candlestick Basics",
        timeframes: "Trading Timeframes",
        volume: "Volume Basics",
        support: "Support & Resistance",
        supplydemand: "Supply & Demand",
        patterns: "Chart Patterns",
        setups: "Building A Trade Plan",
        psychology: "Trading Psychology",
        vocabulary: "Essential Trading Terms",
        quiz: "Trader Checkpoint",
      };

      const lessonId = body.lessonId;

      if (
        typeof lessonId !== "string" ||
        !Object.prototype.hasOwnProperty.call(
          lessonTitles,
          lessonId
        )
      ) {
        return NextResponse.json(
          { error: "Invalid lesson" },
          { status: 400 }
        );
      }

      const student = await currentUser();

      if (!student || student.id !== userId) {
        return NextResponse.json(
          { error: "Unable to verify student identity" },
          { status: 403 }
        );
      }

      const queueCollection = adminDb.collection(
        "discordLessonQueue"
      );

      await adminDb.runTransaction(async (transaction) => {
        const progressSnap = await transaction.get(progressRef);

        const progressData = progressSnap.data();

        const oldQueues = await transaction.get(
          queueCollection
            .where("userId", "==", userId)
            .where("status", "in", ["sent", "pending"])
        );

        const now = new Date().toISOString();

        for (const queueDoc of oldQueues.docs) {
          transaction.update(queueDoc.ref, {
            status: "superseded",
            supersededAt: now,
          });
        }

        const queueRef = queueCollection.doc();

        transaction.set(queueRef, {
          userId,
          userEmail: student.primaryEmailAddress?.emailAddress || "",
          userName: student.firstName || student.username || "TradeNestX Student",
          lessonId,
          lessonTitle: lessonTitles[lessonId],
          discordUserId: progressData?.discordUserId || "",
          discordLinked: progressData?.discordLinked === true,
          status: "pending",
          createdAt: now,
        });
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Lesson progress API error:", error);

    return NextResponse.json(
      { error: "Lesson progress operation failed" },
      { status: 500 }
    );
  }
}