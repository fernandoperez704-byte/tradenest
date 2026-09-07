import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch("https://paper-api.alpaca.markets/v2/clock", {
      headers: {
        "APCA-API-KEY-ID": process.env.ALPACA_API_KEY!,
        "APCA-API-SECRET-KEY": process.env.ALPACA_API_SECRET!,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json({
      isOpen: Boolean(data.is_open),
      timestamp: data.timestamp,
      nextOpen: data.next_open,
      nextClose: data.next_close,
    });
  } catch (error) {
    console.error("Stock market status failed:", error);
    return NextResponse.json({ error: "Failed to load stock market status" }, { status: 500 });
  }
}