import WebSocket from "ws";

export function startStockStream() {
  const ws = new WebSocket("wss://stream.data.alpaca.markets/v2/iex");

  ws.on("open", () => {
    console.log("Alpaca stock stream connected.");

    ws.send(JSON.stringify({
      action: "auth",
      key: process.env.ALPACA_API_KEY,
      secret: process.env.ALPACA_API_SECRET,
    }));
  });

ws.on("message", (data) => {
  const message = data.toString();
  console.log("ALPACA:", message);

  if (message.includes('"msg":"authenticated"')) {
    const symbols = ["NVDA","TSLA","AAPL","AMD","AMZN","MSFT","META","GOOGL","PLTR","AVGO","NFLX","COIN","MSTR","JPM","BAC","SPY","QQQ","IWM","DIA","VTI"];

    ws.send(JSON.stringify({
      action: "subscribe",
      trades: symbols,
      bars: symbols,
    }));
  }
});

  ws.on("error", (error) => {
    console.error("Alpaca stock stream error:", error);
  });

  ws.on("close", () => {
    console.log("Alpaca stock stream disconnected.");
  });
}