import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const productMap: Record<string, string> = {
  "BIP-20DEC30-CDE": "BTCUSDT",
  "ETP-20DEC30-CDE": "ETHUSDT",
  "SLP-20DEC30-CDE": "SOLUSDT",
  "XPP-20DEC30-CDE": "XRPUSDT",
  "DOP-20DEC30-CDE": "DOGEUSDT",
  "ADP-20DEC30-CDE": "ADAUSDT",
  "BNB-20DEC30-CDE": "BNBUSDT",
  "LNP-20DEC30-CDE": "LINKUSDT",
  "AVP-20DEC30-CDE": "AVAXUSDT",
  "SUP-20DEC30-CDE": "SUIUSDT",
  "HEP-20DEC30-CDE": "HBARUSDT",
  "LCP-20DEC30-CDE": "LTCUSDT",
  "BCP-20DEC30-CDE": "BCHUSDT",
  "POP-20DEC30-CDE": "DOTUSDT",
  "AVE-20DEC30-CDE": "AAVEUSDT",
  "NER-20DEC30-CDE": "NEARUSDT",
  "SHP-20DEC30-CDE": "SHIBUSDT",
  "PEP-20DEC30-CDE": "PEPEUSDT",
};

export async function GET() {
  try {
    const response = await fetch(
      "https://api.coinbase.com/api/v3/brokerage/market/products?product_type=FUTURE&get_all_products=true",
      {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
          "User-Agent": "TradeNestX",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Coinbase futures prices failed");
    }

    const data = await response.json();

    const prices = (data.products || [])
      .filter((product: any) => productMap[product.product_id])
      .map((product: any) => {
        const currentPrice = Number(product.price);
        const rawChange24h = product.price_percentage_change_24h;

        const change24h =
          rawChange24h != null && rawChange24h !== ""
            ? Number(rawChange24h)
            : NaN;

        const rawHigh24h = product.high_24h;
        const rawLow24h = product.low_24h;

        const high24h =
          rawHigh24h != null && rawHigh24h !== ""
            ? Number(rawHigh24h)
            : NaN;

        const low24h =
          rawLow24h != null && rawLow24h !== ""
            ? Number(rawLow24h)
            : NaN;

        return {
          symbol: productMap[product.product_id],
          price: currentPrice,
          change24h: Number.isFinite(change24h) ? change24h : null,
          high24h: Number.isFinite(high24h) ? high24h : null,
          low24h: Number.isFinite(low24h) ? low24h : null,
        };
      });

    return NextResponse.json(prices);
  } catch (error) {
    console.error("Price API failed:", error);

    return NextResponse.json(
      { error: "Failed to fetch prices" },
      { status: 500 }
    );
  }
}