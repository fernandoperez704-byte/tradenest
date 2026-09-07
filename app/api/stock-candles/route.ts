import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const timeframeMap: Record<string, string> = {
  "1M": "1Min",
  "5M": "5Min",
  "15M": "15Min",
  "1H": "1Hour",
  "4H": "4Hour",
  "1D": "1Day",
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get("symbol")?.toUpperCase();
    const timeframe = searchParams.get("timeframe") ?? "5M";

    if (!symbol) return NextResponse.json({ error: "Missing symbol" }, { status: 400 });

    const alpacaTimeframe = timeframeMap[timeframe];

    if (!alpacaTimeframe) {
      return NextResponse.json({ error: "Invalid timeframe" }, { status: 400 });
    }

    const end = new Date();
    const start = new Date(end);

    if (timeframe === "1M") start.setDate(start.getDate() - 5);
    else if (timeframe === "5M") start.setDate(start.getDate() - 10);
    else if (timeframe === "15M") start.setDate(start.getDate() - 30);
    else if (timeframe === "1H") start.setDate(start.getDate() - 120);
    else if (timeframe === "4H") start.setFullYear(start.getFullYear() - 2);
    else start.setFullYear(start.getFullYear() - 3);

    const url =
      `https://data.alpaca.markets/v2/stocks/${symbol}/bars` +
      `?timeframe=${alpacaTimeframe}` +
      `&start=${start.toISOString()}` +
      `&end=${end.toISOString()}` +
      `&limit=1000&adjustment=raw&feed=iex&sort=desc`;

    let pageToken: string | null = null;
    let bars: any[] = [];

    do {
      const pageUrl: string = `${url}${pageToken ? `&page_token=${encodeURIComponent(pageToken)}` : ""}`;

      const response = await fetch(pageUrl, {
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

      bars.push(...(data.bars ?? []));
      pageToken = data.next_page_token ?? null;
    } while (pageToken);

    const candles = bars.reverse().map((bar: any) => ({
      time: String(new Date(bar.t).getTime()),
      price: Number(bar.c),
      open: Number(bar.o),
      high: Number(bar.h),
      low: Number(bar.l),
      close: Number(bar.c),
      volume: Number(bar.v),
    }));

    return NextResponse.json(candles);
  } catch (error) {
    console.error("Stock candles failed:", error);
    return NextResponse.json({ error: "Failed to load stock candles" }, { status: 500 });
  }
}