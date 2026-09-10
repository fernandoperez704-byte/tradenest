import { createServer } from "http";
import WebSocket, { WebSocketServer } from "ws";

const symbols = ["NVDA","TSLA","AAPL","AMD","AMZN","MSFT","META","GOOGL","PLTR","AVGO","NFLX","COIN","MSTR","JPM","BAC","SPY","QQQ","IWM","DIA","VTI"];

export function startStockStream() {
  const server = createServer((_, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("TradeNestX stock stream online");
  });

  const wss = new WebSocketServer({ server });

  wss.on("connection", (client) => {
    console.log("TradeNestX stock client connected.");
    client.on("close", () => console.log("TradeNestX stock client disconnected."));
  });

  server.listen(Number(process.env.PORT) || 3001, () => {
    console.log("TradeNestX stock relay online.");
  });

  const connectAlpaca = () => {
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

      let events: any[];

      try {
        events = JSON.parse(message);
      } catch {
        console.error("Invalid Alpaca message:", message);
        return;
      }

      for (const event of events) {
        if (event.T === "success") console.log("ALPACA:", message);

        if (event.T === "success" && event.msg === "authenticated") {
          ws.send(JSON.stringify({
            action: "subscribe",
            trades: symbols,
            bars: symbols,
          }));
        }

        if (event.T === "subscription") console.log("ALPACA:", message);

        if (event.T === "t") {
          const payload = JSON.stringify({
            type: "trade",
            symbol: event.S,
            price: Number(event.p),
            time: event.t,
          });

          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) client.send(payload);
          });
        }

        if (event.T === "b") {
          const payload = JSON.stringify({
            type: "bar",
            symbol: event.S,
            time: event.t,
            open: Number(event.o),
            high: Number(event.h),
            low: Number(event.l),
            close: Number(event.c),
            volume: Number(event.v),
          });

          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) client.send(payload);
          });
        }
      }
    });

    ws.on("error", (error) => {
      console.error("Alpaca stock stream error:", error);
    });

    ws.on("close", () => {
      console.log("Alpaca stock stream disconnected. Reconnecting in 5 seconds...");
      setTimeout(connectAlpaca, 5000);
    });
  };

  connectAlpaca();
}