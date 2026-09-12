"use client";

import { useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { PricePoint } from "../types/simulator";
import type { StockSymbol } from "../data/stockWatchlist";

type Props = {
  enabled: boolean;
  simulatorReady: boolean;
  selectedStock: StockSymbol;
  selectedTimeframe: string;
  setHistory: Dispatch<SetStateAction<PricePoint[]>>;
};

function getTimeframeMs(timeframe: string) {
  const map: Record<string, number> = {
    "1M": 60 * 1000,
    "5M": 5 * 60 * 1000,
    "15M": 15 * 60 * 1000,
    "1H": 60 * 60 * 1000,
    "4H": 4 * 60 * 60 * 1000,
    "1D": 24 * 60 * 60 * 1000,
  };

  return map[timeframe] || 60 * 1000;
}

export function useStockMarket({
  enabled,
  simulatorReady,
  selectedStock,
  selectedTimeframe,
  setHistory,
}: Props) {
  const [stockPrices, setStockPrices] = useState<Partial<Record<StockSymbol, number>>>({});
  const [previousStockPrices, setPreviousStockPrices] = useState<Partial<Record<StockSymbol, number>>>({});
  const [stockMarketOpen, setStockMarketOpen] = useState(false);
const [stockNextOpen, setStockNextOpen] = useState<string | null>(null);


  const selectedStockRef = useRef(selectedStock);
  const selectedTimeframeRef = useRef(selectedTimeframe);

  useEffect(() => { selectedStockRef.current = selectedStock; }, [selectedStock]);
  useEffect(() => { selectedTimeframeRef.current = selectedTimeframe; }, [selectedTimeframe]);

  async function updateStockPrices() {
    try {
      const response = await fetch("/api/stock-prices");
      const data = await response.json();

      if (!Array.isArray(data)) throw new Error("Invalid stock price data");

      const realPrices = data.reduce((acc: Partial<Record<StockSymbol, number>>, item: any) => {
        if (item.price != null) acc[item.symbol as StockSymbol] = Number(item.price);
        return acc;
      }, {});

      setStockPrices((prev) => {
        setPreviousStockPrices(prev);
        return { ...prev, ...realPrices };
      });
    } catch (error) {
      console.error("Stock price update failed:", error);
    }
  }

  useEffect(() => {
    if (!enabled) return;
    updateStockPrices();
  }, [enabled]);

useEffect(() => {
  if (!enabled) return;

  fetch("/api/stock-market-status")
    .then((res) => res.json())
    .then((data) => {
      setStockMarketOpen(Boolean(data.isOpen));
      setStockNextOpen(data.nextOpen ?? null);
    })
    .catch(() => {
      setStockMarketOpen(false);
      setStockNextOpen(null);
    });
}, [enabled]);

useEffect(() => {
  if (!enabled || !simulatorReady) return;

  let socket: WebSocket | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let stopped = false;

  const connect = () => {
    if (stopped) return;

    socket = new WebSocket("wss://tradenest-production.up.railway.app");

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type !== "trade") return;

        const symbol = message.symbol as StockSymbol;
        const tradePrice = Number(message.price);
        const tradeTime = new Date(message.time).getTime();
        if (!Number.isFinite(tradePrice) || !Number.isFinite(tradeTime)) return;

        setStockPrices((prev) => {
          setPreviousStockPrices(prev);
          return { ...prev, [symbol]: tradePrice };
        });

        if (symbol !== selectedStockRef.current) return;

        setHistory((prev) => {
          if (!prev.length) return prev;

          const next = [...prev];
          const timeframeMs = getTimeframeMs(selectedTimeframeRef.current);
          const candleStart = Math.floor(tradeTime / timeframeMs) * timeframeMs;
          const last = next[next.length - 1];
          const lastTime = Number(last.time);

          if (candleStart > lastTime) {
            next.push({
              time: String(candleStart),
              price: tradePrice,
              open: tradePrice,
              high: tradePrice,
              low: tradePrice,
              close: tradePrice,
              volume: 0,
            });
          } else if (candleStart === lastTime) {
            next[next.length - 1] = {
              ...last,
              price: tradePrice,
              close: tradePrice,
              high: Math.max(last.high, tradePrice),
              low: Math.min(last.low, tradePrice),
            };
          }

          return next;
        });
      } catch (error) {
        console.error("Stock WebSocket message failed:", error);
      }
    };

    socket.onerror = () => console.warn("Stock WebSocket connection error.");

    socket.onclose = () => {
      if (stopped) return;
      reconnectTimer = setTimeout(connect, 5000);
    };
  };

  connect();

  return () => {
    stopped = true;
    if (reconnectTimer) clearTimeout(reconnectTimer);
    socket?.close();
  };
}, [enabled, simulatorReady, setHistory]);

return {
  stockPrices,
  previousStockPrices,
  stockMarketOpen,
  stockNextOpen,
  updateStockPrices,
};

}