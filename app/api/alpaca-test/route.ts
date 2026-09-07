import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.ALPACA_API_KEY;
    const apiSecret = process.env.ALPACA_API_SECRET;

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { error: "Missing Alpaca API credentials" },
        { status: 500 }
      );
    }

    const url =
      "https://data.alpaca.markets/v2/stocks/AAPL/bars" +
      "?timeframe=5Min" +
      "&start=2026-09-04T13:30:00Z" +
      "&end=2026-09-04T20:00:00Z" +
      "&limit=1000" +
      "&adjustment=raw" +
      "&feed=iex";

    const response = await fetch(url, {
      headers: {
        "APCA-API-KEY-ID": apiKey,
        "APCA-API-SECRET-KEY": apiSecret,
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Alpaca request failed",
          status: response.status,
          data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      symbol: "AAPL",
      timeframe: "5Min",
      feed: "IEX",
      count: data.bars?.length ?? 0,
      bars: data.bars ?? [],
    });
  } catch (error) {
    console.error("Alpaca historical test error:", error);

    return NextResponse.json(
      { error: "Internal Alpaca historical test error" },
      { status: 500 }
    );
  }
}