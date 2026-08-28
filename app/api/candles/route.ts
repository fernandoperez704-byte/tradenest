import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const productMap: Record<string, string> = {
  BTC: "BTC-USD",
  ETH: "ETH-USD",
  SOL: "SOL-USD",
  XRP: "XRP-USD",
  DOGE: "DOGE-USD",

  ADA: "ADA-USD",
  BNB: "BNB-USD",
  LINK: "LINK-USD",
  AVAX: "AVAX-USD",
  SUI: "SUI-USD",
  HBAR: "HBAR-USD",
  LTC: "LTC-USD",
  BCH: "BCH-USD",
  DOT: "DOT-USD",
  UNI: "UNI-USD",
  AAVE: "AAVE-USD",
  ATOM: "ATOM-USD",
  NEAR: "NEAR-USD",
  SHIB: "SHIB-USD",
  PEPE: "PEPE-USD",
};

const granularityMap: Record<string, string> = {
  "1M": "ONE_MINUTE",
  "5M": "FIVE_MINUTE",
  "15M": "FIFTEEN_MINUTE",
  "1H": "ONE_HOUR",
  "4H": "FOUR_HOUR",
  "1D": "ONE_DAY",
};

const timeframeSecondsMap: Record<string, number> = {
  "1M": 60,
  "5M": 300,
  "15M": 900,
  "1H": 3600,
  "4H": 14400,
  "1D": 86400,
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const symbol = searchParams.get("symbol") || "BTC";
    const timeframe = searchParams.get("timeframe") || "1M";

    const productId = productMap[symbol] || "BTC-USD";
    const granularity =
  granularityMap[timeframe] || "ONE_MINUTE";

const timeframeSeconds =
  timeframeSecondsMap[timeframe] || 60;

const endTime = Math.floor(Date.now() / 1000);

const recentStart = endTime - timeframeSeconds * 299;
const olderEnd = recentStart - timeframeSeconds;
const olderStart = olderEnd - timeframeSeconds * 299;

const buildUrl = (start: number, end: number) =>
  `https://api.coinbase.com/api/v3/brokerage/market/products/${productId}/candles` +
  `?start=${start}&end=${end}&granularity=${granularity}&limit=300`;

const [olderResponse, recentResponse] = await Promise.all([
  fetch(buildUrl(olderStart, olderEnd), {
    cache: "no-store",
    headers: { "User-Agent": "TradeNestX" },
  }),
  fetch(buildUrl(recentStart, endTime), {
    cache: "no-store",
    headers: { "User-Agent": "TradeNestX" },
  }),
]);

if (!olderResponse.ok || !recentResponse.ok) {
  throw new Error("Coinbase candles failed");
}

const [olderData, recentData] = await Promise.all([
  olderResponse.json(),
  recentResponse.json(),
]);

const candles = [...olderData.candles, ...recentData.candles]
  .map((item: any) => ({
    time: String(Number(item.start) * 1000),
    price: Number(item.close),
    low: Number(item.low),
    high: Number(item.high),
    open: Number(item.open),
    close: Number(item.close),
    volume: Number(item.volume),
  }))
  .sort(
    (a: { time: string }, b: { time: string }) =>
      Number(a.time) - Number(b.time)
  );



    return NextResponse.json(candles.slice(-600));
  } catch (error) {
    console.error("Candles API failed:", error);

    return NextResponse.json(
      { error: "Failed to fetch candles" },
      { status: 500 }
    );
  }
}