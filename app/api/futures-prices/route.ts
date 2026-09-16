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
      .map((product: any) => ({
        symbol: productMap[product.product_id],
        price: Number(product.price),
      }));

    return NextResponse.json(prices);
  } catch (error) {
    console.error("Price API failed:", error);

    return NextResponse.json(
      { error: "Failed to fetch prices" },
      { status: 500 }
    );
  }
}