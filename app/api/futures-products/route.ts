import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const url =
      "https://api.coinbase.com/api/v3/brokerage/market/products" +
      "?product_type=FUTURE&contract_expiry_type=PERPETUAL";

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "User-Agent": "TradeNestX",
      },
    });

    if (!response.ok) {
      throw new Error("Coinbase futures products failed");
    }

    const data = await response.json();

const products = Array.isArray(data.products)
  ? data.products.map((product: any) => ({
      product_id: product.product_id,
      display_name: product.display_name,
      venue: product.future_product_details?.venue,
      contract_code: product.future_product_details?.contract_code,
      expiry_type: product.future_product_details?.contract_expiry_type,
      expiry: product.future_product_details?.contract_expiry,
      max_leverage:
        product.future_product_details?.perpetual_details?.max_leverage,
      intraday_margin_rate:
        product.future_product_details?.intraday_margin_rate,
      overnight_margin_rate:
        product.future_product_details?.overnight_margin_rate,
      twenty_four_by_seven:
        product.future_product_details?.twenty_four_by_seven,
    }))
  : [];

return NextResponse.json(products);
  } catch (error) {
    console.error("Futures Products API failed:", error);

    return NextResponse.json(
      { error: "Failed to fetch futures products" },
      { status: 500 }
    );
  }
}