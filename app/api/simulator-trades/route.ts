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

    if (!(await isPaidUser(userId))) {
      return NextResponse.json(
        { error: "Pro subscription required" },
        { status: 403 }
      );
    }

    const tradesRef = adminDb.collection("trades");

    if (body.action === "GET_TRADES") {
      const snapshot = await tradesRef
        .where("userId", "==", userId)
        .get();

      return NextResponse.json({
        trades: snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })),
      });
    }

    if (body.action === "SAVE_TRADE") {
      const trade = body.trade;

      if (
        !trade ||
        typeof trade !== "object" ||
        Array.isArray(trade) ||
        !["BUY", "SELL", "TAKE PROFIT", "STOP LOSS"].includes(
          trade.type
        ) ||
        typeof trade.coin !== "string" ||
        typeof trade.amount !== "number" ||
        !Number.isFinite(trade.amount) ||
        trade.amount <= 0 ||
        typeof trade.price !== "number" ||
        !Number.isFinite(trade.price) ||
        trade.price <= 0
      ) {
        return NextResponse.json(
          { error: "Invalid trade data" },
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
        "tradeId",
        "snapshotId",
        "type",
        "coin",
        "amount",
        "price",
        "entryPrice",
        "exitPrice",
        "stopLoss",
        "takeProfit",
        "pnl",
        "grossPnl",
        "entryFee",
        "exitFee",
        "totalFees",
        "management",
        "status",
        "closedReason",
        "closedAt",
        "tradeContext",
        "automaticReview",
        "review",
      ];

      const tradeData = Object.fromEntries(
        allowedFields
          .filter((field) => trade[field] !== undefined)
          .map((field) => [field, trade[field]])
      );

      const savedTrade = await tradesRef.add({
        ...tradeData,
        userId,
        userName: trader.firstName || "Trader",
        created: new Date(),
      });

      return NextResponse.json({
        success: true,
        id: savedTrade.id,
      });
    }

    if (body.action === "RESET_TRADES") {
      const snapshot = await tradesRef
        .where("userId", "==", userId)
        .get();

      for (let i = 0; i < snapshot.docs.length; i += 400) {
        const batch = adminDb.batch();

        snapshot.docs
          .slice(i, i + 400)
          .forEach((doc) => batch.delete(doc.ref));

        await batch.commit();
      }

      return NextResponse.json({
        success: true,
      });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Simulator trades API error:", error);

    return NextResponse.json(
      { error: "Trade operation failed" },
      { status: 500 }
    );
  }
}