import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const symbols = "NVDA,TSLA,AAPL,AMD,AMZN,MSFT,META,GOOGL,PLTR,AVGO,NFLX,COIN,MSTR,JPM,BAC,SPY,QQQ,IWM,DIA,VTI";

    const response = await fetch(
      `https://data.alpaca.markets/v2/stocks/snapshots?symbols=${symbols}&feed=iex`,
      {
        headers: {
          "APCA-API-KEY-ID": process.env.ALPACA_API_KEY!,
          "APCA-API-SECRET-KEY": process.env.ALPACA_API_SECRET!,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: response.status });
    }

    const data = await response.json();

    const prices = Object.entries(data).map(([symbol, snapshot]: [string, any]) => ({
      symbol,
      price: snapshot?.latestTrade?.p ?? snapshot?.minuteBar?.c ?? snapshot?.dailyBar?.c ?? null,
    }));

    return NextResponse.json(prices);
  } catch (error) {
    console.error("Stock prices failed:", error);
    return NextResponse.json({ error: "Failed to load stock prices" }, { status: 500 });
  }
}