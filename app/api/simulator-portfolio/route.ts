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

    const portfolioRef = adminDb
      .collection("portfolios")
      .doc(userId);

    if (body.action === "GET_PORTFOLIO") {
      const snapshot = await portfolioRef.get();

      return NextResponse.json({
        portfolio: snapshot.exists ? snapshot.data() : null,
      });
    }

    if (body.action === "SAVE_PORTFOLIO") {
      const portfolio = body.portfolio;

      const isNumberRecord = (value: unknown) =>
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        Object.values(value).every(
          (amount) =>
            typeof amount === "number" &&
            Number.isFinite(amount)
        );

      if (
        !portfolio ||
        typeof portfolio.balance !== "number" ||
        !Number.isFinite(portfolio.balance) ||
        !isNumberRecord(portfolio.positions) ||
        !isNumberRecord(portfolio.averagePrices) ||
        !portfolio.spotPositionFacts ||
        typeof portfolio.spotPositionFacts !== "object" ||
        Array.isArray(portfolio.spotPositionFacts) ||
        !Object.values(portfolio.spotPositionFacts).every(
          isNumberRecord
        )
      ) {
        return NextResponse.json(
          { error: "Invalid portfolio data" },
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

      await portfolioRef.set({
        userName: trader.firstName || "Trader",
        balance: portfolio.balance,
        positions: portfolio.positions,
        averagePrices: portfolio.averagePrices,
        spotPositionFacts: portfolio.spotPositionFacts,
        updated: new Date(),
      });

      return NextResponse.json({ success: true });
    }

    if (body.action === "RESET_PORTFOLIO") {
      await portfolioRef.delete();

      return NextResponse.json({
        success: true,
      });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Simulator portfolio API error:", error);

    return NextResponse.json(
      { error: "Portfolio operation failed" },
      { status: 500 }
    );
  }
}