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