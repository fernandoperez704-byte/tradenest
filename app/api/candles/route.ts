import { NextResponse } from "next/server";

const productMap: Record<string, string> = {
  BTC: "BTC-USD",
  ETH: "ETH-USD",
  SOL: "SOL-USD",
  XRP: "XRP-USD",
  DOGE: "DOGE-USD",
};

const granularityMap: Record<string, number> = {
  "1M": 60,
  "5M": 300,
  "15M": 900,
  "1H": 3600,
  "4H": 21600,
  "1D": 86400,
};



export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const symbol = searchParams.get("symbol") || "BTC";
    const timeframe = searchParams.get("timeframe") || "1M";

    const productId = productMap[symbol] || "BTC-USD";
    const granularity = granularityMap[timeframe] || 60;

    const response = await fetch(
      `https://api.exchange.coinbase.com/products/${productId}/candles?granularity=${granularity}`,
      {
        next: { revalidate: 60 },
        headers: {
          "User-Agent": "TradeNestX",
        },
      }
    );

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid candle data");
    }

    let candles = data
      .map((item: any[]) => ({
        time: String(item[0] * 1000),
        price: Number(item[4]),
        low: Number(item[1]),
        high: Number(item[2]),
        open: Number(item[3]),
        close: Number(item[4]),
        volume: Number(item[5]),
      }))
      .reverse();



    return NextResponse.json(candles.slice(-300));
  } catch (error) {
    console.error("Candles API failed:", error);

    return NextResponse.json(
      { error: "Failed to fetch candles" },
      { status: 500 }
    );
  }
}