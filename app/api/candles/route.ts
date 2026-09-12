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

const requestedStart = Number(searchParams.get("start"));
const requestedEnd = Number(searchParams.get("end"));

const hasCustomRange =
  Number.isFinite(requestedStart) &&
  Number.isFinite(requestedEnd) &&
  requestedStart > 0 &&
  requestedEnd > requestedStart;

const endTime = hasCustomRange
  ? requestedEnd
  : Math.floor(Date.now() / 1000);

const buildUrl = (start: number, end: number) =>
  `https://api.coinbase.com/api/v3/brokerage/market/products/${productId}/candles` +
  `?start=${start}&end=${end}&granularity=${granularity}&limit=300`;

const fetchCandles = async (start: number, end: number) => {
  const response = await fetch(buildUrl(start, end), {
    cache: "no-store",
    headers: { "User-Agent": "TradeNestX" },
  });

  if (!response.ok) {
    throw new Error("Coinbase candles failed");
  }

  const data = await response.json();

  return Array.isArray(data.candles)
    ? data.candles
    : [];
};

let rawCandles: any[] = [];

const sparseOneMinute =
  timeframe === "1M" &&
  (symbol === "SHIB" || symbol === "PEPE");

if (sparseOneMinute) {
  const targetCandles = hasCustomRange
    ? Math.ceil((requestedEnd - requestedStart) / timeframeSeconds) + 1
    : 600;

  let cursorEnd = endTime;

  for (
    let i = 0;
    i < 10 && rawCandles.length < targetCandles;
    i++
  ) {
    const cursorStart =
      cursorEnd - timeframeSeconds * 299;

    const batch = await fetchCandles(
      cursorStart,
      cursorEnd
    );

    rawCandles = [
      ...batch,
      ...rawCandles,
    ];

    cursorEnd =
      cursorStart - timeframeSeconds;
  }
} else {

  const recentStart = hasCustomRange
    ? requestedStart
    : endTime - timeframeSeconds * 299;

  const olderEnd =
    recentStart - timeframeSeconds;

  const olderStart =
    olderEnd - timeframeSeconds * 299;

  const [olderCandles, recentCandles] =
    await Promise.all([
      fetchCandles(olderStart, olderEnd),
      fetchCandles(recentStart, endTime),
    ]);

  rawCandles = [
    ...olderCandles,
    ...recentCandles,
  ];
}

const candles = rawCandles
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

return NextResponse.json(
  hasCustomRange
    ? sparseOneMinute
      ? candles.slice(-Math.ceil((requestedEnd - requestedStart) / timeframeSeconds) - 1)
      : candles.filter(
          (candle: any) =>
            Number(candle.time) / 1000 >= requestedStart &&
            Number(candle.time) / 1000 <= requestedEnd
        )
    : candles.slice(-600)
);
  
  } catch (error) {
    console.error("Candles API failed:", error);

    return NextResponse.json(
      { error: "Failed to fetch candles" },
      { status: 500 }
    );
  }
}