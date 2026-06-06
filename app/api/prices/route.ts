import { NextResponse } from "next/server";

const productMap = [
  { symbol: "BTCUSDT", productId: "BTC-USD" },
  { symbol: "ETHUSDT", productId: "ETH-USD" },
  { symbol: "SOLUSDT", productId: "SOL-USD" },
  { symbol: "XRPUSDT", productId: "XRP-USD" },
  { symbol: "DOGEUSDT", productId: "DOGE-USD" },
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

        return {
          symbol: item.symbol,
          price: Number(data.price),
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