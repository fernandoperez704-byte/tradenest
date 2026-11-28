
import {
  applyGabyMemoryAction,
  processGabyLongTermMemory,
} from "@/lib/gaby/memory/gabyMemoryStorage";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { isPaidUser } from "@/lib/subscription";


import {
  validCategories,
  noMemory,
} from "@/lib/gaby/memory/gabyMemoryTypes";


export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!(await isPaidUser(userId))) {
      return NextResponse.json(
        { error: "Gaby memory requires TradeNestX Pro" },
        { status: 403 }
      );
    }

    const body = await req.json();

    if (body?.expectedUserId !== userId) {
      return NextResponse.json(
        { error: "Account mismatch" },
        { status: 403 }
      );
    }

    if (body?.action === "APPLY_MEMORY_ACTION") {
      const category = body.category;
      const value =
        typeof body.value === "string"
          ? body.value.trim().slice(0, 240)
          : "";

      if (
        !validCategories.includes(category) ||
        !value
      ) {
        return NextResponse.json(
          { error: "Invalid memory action" },
          { status: 400 }
        );
      }

      const longTermMemory = await applyGabyMemoryAction(
        userId,
        {
          action: "ADD",
          category,
          value,
          oldValue: null,
        }
      );

      return NextResponse.json({
        success: true,
        longTermMemory,
      });
    }

    if (body?.action === "GET_MEMORY") {
      const snapshot = await adminDb
        .collection("gabySimulatorMemory")
        .doc(userId)
        .get();

      return NextResponse.json({
        memory: snapshot.exists ? snapshot.data() : null,
      });
    }

    if (body?.action === "SAVE_MEMORY") {
      const memory = body.memory;

      if (
        !memory ||
        typeof memory !== "object" ||
        !Array.isArray(memory.conversationHistory)
      ) {
        return NextResponse.json(
          { error: "Invalid memory data" },
          { status: 400 }
        );
      }

      await adminDb
        .collection("gabySimulatorMemory")
        .doc(userId)
        .set(
          {
            conversationHistory: memory.conversationHistory.slice(-12),
            lastTopic: memory.lastTopic ?? null,
            lastReferencedLevel: memory.lastReferencedLevel ?? null,
            conversationState: memory.conversationState ?? null,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );

      return NextResponse.json({ success: true });
    }

    if (body?.action === "SAVE_SUPPORT_HISTORY") {
      const history = body.conversationHistory;

      if (
        !Array.isArray(history) ||
        !history.every(
          (item: any) =>
            item &&
            (item.role === "user" ||
              item.role === "assistant") &&
            typeof item.content === "string"
        )
      ) {
        return NextResponse.json(
          { error: "Invalid support conversation history" },
          { status: 400 }
        );
      }

      await adminDb
        .collection("gabySimulatorMemory")
        .doc(userId)
        .set(
          {
            supportConversationHistory: history
              .slice(-12)
              .map((item: any) => ({
                role: item.role,
                content: item.content,
              })),
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );

      return NextResponse.json({ success: true });
    }

    if (body?.action === "SAVE_CONVERSATION") {


      const question = body.question;
      const answer = body.answer;
      const topic = body.topic ?? null;

      if (
        typeof question !== "string" ||
        typeof answer !== "string" ||
        !question.trim() ||
        !answer.trim()
      ) {
        return NextResponse.json(
          { error: "Invalid conversation" },
          { status: 400 }
        );
      }

      await adminDb
        .collection("gabyConversationHistory")
        .doc(userId)
        .collection("conversations")
        .add({
          question: question.trim(),
          answer: answer.trim(),
          topic: typeof topic === "string" ? topic : null,
          createdAt: new Date(),
        });

      return NextResponse.json({ success: true });
    }

    if (body?.action === "GET_CONVERSATIONS") {
      const startDate = new Date(body.startDate);
      const endDate = new Date(body.endDate);

      if (
        !Number.isFinite(startDate.getTime()) ||
        !Number.isFinite(endDate.getTime()) ||
        startDate > endDate
      ) {
        return NextResponse.json(
          { error: "Invalid date range" },
          { status: 400 }
        );
      }

      const snapshot = await adminDb
        .collection("gabyConversationHistory")
        .doc(userId)
        .collection("conversations")
        .where("createdAt", ">=", startDate)
        .where("createdAt", "<", endDate)
        .orderBy("createdAt", "desc")
        .limit(50)
        .get();

      const conversations = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          question: data.question,
          answer: data.answer,
          topic: data.topic ?? null,
          createdAt: data.createdAt?.toDate?.()?.toISOString() ?? null,
        };
      });

      return NextResponse.json({ conversations });
    }

    const userMessage =
      typeof body?.userMessage === "string"
        ? body.userMessage.trim()
        : "";

    const gabyMessage =
      typeof body?.gabyMessage === "string"
        ? body.gabyMessage.trim()
        : "";

    const result = await processGabyLongTermMemory(
      userId,
      userMessage,
      gabyMessage
    );

    return NextResponse.json({
      memoryAction: result.memoryAction,
      longTermMemory: result.longTermMemory,
    });

  } catch (error) {
    console.error("Gaby memory route failed:", error);

    return NextResponse.json(
      {
        error: "Gaby memory operation failed",
        memoryAction: noMemory,
      },
      { status: 500 }
    );
  }
}