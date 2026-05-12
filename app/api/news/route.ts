import { NextResponse } from "next/server";

export async function GET() {
  const news = [
    {
      title: "Bitcoin Holds Key Support",
      source: "TradeNestX News",
      url: "#",
    },
    {
      title: "Ethereum Traders Watch Momentum",
      source: "TradeNestX News",
      url: "#",
    },
    {
      title: "Tech Stocks Remain Active",
      source: "TradeNestX News",
      url: "#",
    },
  ];

  return NextResponse.json(news);
}