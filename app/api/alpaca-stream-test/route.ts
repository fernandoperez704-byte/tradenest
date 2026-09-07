import { NextResponse } from "next/server";
import WebSocket from "ws";

export const runtime = "nodejs";

export async function GET() {
  const apiKey = process.env.ALPACA_API_KEY;
  const apiSecret = process.env.ALPACA_API_SECRET;

  if (!apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Missing Alpaca API credentials" },
      { status: 500 }
    );
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const ws = new WebSocket(
        "wss://stream.data.alpaca.markets/v2/iex"
      );

      const timeout = setTimeout(() => {
        ws.close();
        reject(new Error("WebSocket test timed out"));
      }, 10000);

      ws.on("open", () => {
        console.log("Alpaca WebSocket opened");
      });

      ws.on("message", (raw) => {
        const messages = JSON.parse(raw.toString());

        console.log("Alpaca message:", messages);

        for (const message of messages) {
          // Alpaca says connection is ready
          if (message.T === "success" && message.msg === "connected") {
            ws.send(
              JSON.stringify({
                action: "auth",
                key: apiKey,
                secret: apiSecret,
              })
            );
          }

          // Authentication succeeded
          if (message.T === "success" && message.msg === "authenticated") {
            ws.send(
              JSON.stringify({
                action: "subscribe",
                trades: ["AAPL"],
                bars: ["AAPL"],
              })
            );
          }

          // Subscription confirmed
          if (message.T === "subscription") {
            clearTimeout(timeout);
            ws.close();

            resolve({
              success: true,
              connected: true,
              authenticated: true,
              feed: "IEX",
              symbol: "AAPL",
              subscriptions: {
                trades: message.trades ?? [],
                bars: message.bars ?? [],
              },
            });
          }

          if (message.T === "error") {
            clearTimeout(timeout);
            ws.close();
            reject(
              new Error(
                `Alpaca WebSocket error ${message.code}: ${message.msg}`
              )
            );
          }
        }
      });

      ws.on("error", (error) => {
        clearTimeout(timeout);
        reject(error);
      });
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Alpaca stream test error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown WebSocket error",
      },
      { status: 500 }
    );
  }
}