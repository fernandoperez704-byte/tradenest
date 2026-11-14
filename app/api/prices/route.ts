import { NextResponse } from "next/server";

const productMap = [
  { symbol: "BTCUSDT", productId: "BTC-USD" },
  { symbol: "ETHUSDT", productId: "ETH-USD" },
  { symbol: "SOLUSDT", productId: "SOL-USD" },
  { symbol: "XRPUSDT", productId: "XRP-USD" },
  { symbol: "DOGEUSDT", productId: "DOGE-USD" },

  { symbol: "ADAUSDT", productId: "ADA-USD" },
  { symbol: "BNBUSDT", productId: "BNB-USD" },
  { symbol: "LINKUSDT", productId: "LINK-USD" },
  { symbol: "AVAXUSDT", productId: "AVAX-USD" },
  { symbol: "SUIUSDT", productId: "SUI-USD" },
  { symbol: "HBARUSDT", productId: "HBAR-USD" },
  { symbol: "LTCUSDT", productId: "LTC-USD" },
  { symbol: "BCHUSDT", productId: "BCH-USD" },
  { symbol: "DOTUSDT", productId: "DOT-USD" },
  { symbol: "UNIUSDT", productId: "UNI-USD" },
  { symbol: "AAVEUSDT", productId: "AAVE-USD" },
  { symbol: "ATOMUSDT", productId: "ATOM-USD" },
  { symbol: "NEARUSDT", productId: "NEAR-USD" },
  { symbol: "SHIBUSDT", productId: "SHIB-USD" },
  { symbol: "PEPEUSDT", productId: "PEPE-USD" },

  { symbol: "OPUSDT", productId: "OP-USD" },
  { symbol: "ENSUSDT", productId: "ENS-USD" },
  { symbol: "RENDERUSDT", productId: "RENDER-USD" },
  { symbol: "INJUSDT", productId: "INJ-USD" },
  { symbol: "ARBUSDT", productId: "ARB-USD" },
];

export async function GET() {
  try {
    const prices = await Promise.all(
      productMap.map(async (item) => {
const response = await fetch(
  `https://api.exchange.coinbase.com/products/${item.productId}/ticker`,
  {
    next: { revalidate: 1 },
    headers: {
      "User-Agent": "TradeNestX",
    },
  }
);

const data = await response.json();

const currentPrice = Number(data.price);

const statsResponse = await fetch(
  `https://api.exchange.coinbase.com/products/${item.productId}/stats`,
  {
    next: { revalidate: 60 },
    headers: {
      "User-Agent": "TradeNestX",
    },
  }
);

const stats = statsResponse.ok
  ? await statsResponse.json()
  : null;

const open24h = stats?.open != null
  ? Number(stats.open)
  : NaN;

const change24h =
  Number.isFinite(currentPrice) &&
  Number.isFinite(open24h) &&
  open24h > 0
    ? ((currentPrice - open24h) / open24h) * 100
    : null;

return {
  symbol: item.symbol,
  price: currentPrice,
  change24h,
  high24h:
    stats?.high != null && Number.isFinite(Number(stats.high))
      ? Number(stats.high)
      : null,
  low24h:
    stats?.low != null && Number.isFinite(Number(stats.low))
      ? Number(stats.low)
      : null,
};
      })
    );

    return NextResponse.json(prices);
  } catch (error) {
    console.error("Price API failed:", error);

    return NextResponse.json(
      { error: "Failed to fetch prices" },
      { status: 500 }
    );
  }
}