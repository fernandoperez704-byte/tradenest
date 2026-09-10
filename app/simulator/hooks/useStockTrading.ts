"use client";

import { useState } from "react";
import type { StockSymbol } from "../data/stockWatchlist";

type Props = {
  selectedStock: StockSymbol;
  currentPrice?: number;
  stockMarketOpen: boolean;
  balance: number;
  tradeAmount: number | "";
  requireSignIn: () => boolean;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  setTradeAmount: React.Dispatch<React.SetStateAction<number | "">>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  getStockTradeContext?: () => any;
onStockClose?: (trade: {
  symbol: StockSymbol;
  quantity: number;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  tradeContext: any;
}) => {
  snapshotId: string;
  automaticReview: any;
} | null | void;
};

export type StockTrade = {
  symbol: StockSymbol;
  type: "BUY" | "SELL";
  quantity: number;
  price: number;
  entryPrice?: number;
  exitPrice?: number;
  amount: number;
  pnl?: number;
  closedAt?: string;
  tradeContext?: any;
  time: string;
  snapshotId?: string;
  automaticReview?: any;
  review?: any;
};

export function useStockTrading({
  selectedStock,
  currentPrice,
  stockMarketOpen,
  balance,
  tradeAmount,
  requireSignIn,
  setBalance,
  setTradeAmount,
setMessage,
getStockTradeContext,
onStockClose,
}: Props) {
  const [stockPositions, setStockPositions] = useState<Partial<Record<StockSymbol, number>>>({});
  const [stockAveragePrices, setStockAveragePrices] = useState<Partial<Record<StockSymbol, number>>>({});
  const [stockHistory, setStockHistory] = useState<StockTrade[]>([]);
const [stockTradeContexts, setStockTradeContexts] = useState<Partial<Record<StockSymbol, any>>>({});

  function buyStock() {
    if (!requireSignIn()) return;
    if (!stockMarketOpen) return setMessage("US stock market is closed.");
    if (!currentPrice) return setMessage("Loading real market price...");
    if (!tradeAmount || Number(tradeAmount) <= 0) return setMessage("Enter an amount.");

    const amount = Number(tradeAmount);
    if (amount > balance) return setMessage("Insufficient balance.");

    const quantity = amount / currentPrice;
    const previousQty = stockPositions[selectedStock] ?? 0;
    const previousAvg = stockAveragePrices[selectedStock] ?? 0;
    const totalQty = previousQty + quantity;
    const averagePrice = totalQty > 0
      ? ((previousQty * previousAvg) + (quantity * currentPrice)) / totalQty
      : currentPrice;

if (previousQty <= 0) {
  setStockTradeContexts((prev) => ({
    ...prev,
    [selectedStock]: getStockTradeContext?.() ?? null,
  }));
}

    setBalance((prev) => prev - amount);
    setStockPositions((prev) => ({ ...prev, [selectedStock]: totalQty }));
    setStockAveragePrices((prev) => ({ ...prev, [selectedStock]: averagePrice }));
    setStockHistory((prev) => [{
      symbol: selectedStock,
      type: "BUY",
      quantity,
      price: currentPrice,
      amount,
      time: new Date().toLocaleTimeString(),
    }, ...prev]);

    setMessage(`Bought ${selectedStock}`);
    setTradeAmount("");
  }

  function sellStock() {
    if (!requireSignIn()) return;
    if (!stockMarketOpen) return setMessage("US stock market is closed.");
    if (!currentPrice) return setMessage("Loading real market price...");

    const quantity = stockPositions[selectedStock] ?? 0;
    if (quantity <= 0) return setMessage(`No ${selectedStock} position to sell.`);

    const proceeds = quantity * currentPrice;
    const averagePrice = stockAveragePrices[selectedStock] ?? 0;
    const pnl = (currentPrice - averagePrice) * quantity;

const stockReview = onStockClose?.({
  symbol: selectedStock,
  quantity,
  entryPrice: averagePrice,
  exitPrice: currentPrice,
  pnl,
  tradeContext: stockTradeContexts[selectedStock] ?? null,
});

    setBalance((prev) => prev + proceeds);
    setStockPositions((prev) => ({ ...prev, [selectedStock]: 0 }));
    setStockAveragePrices((prev) => ({ ...prev, [selectedStock]: 0 }));

setStockHistory((prev) => [{
  symbol: selectedStock,
  type: "SELL",
  quantity,
  price: currentPrice,
  entryPrice: averagePrice,
  exitPrice: currentPrice,
  amount: proceeds,
  pnl,
  closedAt: new Date().toISOString(),
  tradeContext: stockTradeContexts[selectedStock] ?? null,
  time: new Date().toLocaleTimeString(),
  ...(stockReview ? {
    snapshotId: stockReview.snapshotId,
    automaticReview: stockReview.automaticReview,
    review: stockReview.automaticReview,
  } : {}),
}, ...prev]);

    setMessage(`Sold ${selectedStock}`);
  }

  function closeStockPosition(stock: StockSymbol, price: number) {
    if (!requireSignIn()) return;
    if (!stockMarketOpen) return setMessage("US stock market is closed.");
    if (!price) return setMessage("Loading real market price...");

    const quantity = stockPositions[stock] ?? 0;
    if (quantity <= 0) return setMessage(`No ${stock} position to sell.`);

    const proceeds = quantity * price;
    const averagePrice = stockAveragePrices[stock] ?? 0;
    const pnl = (price - averagePrice) * quantity;

const stockReview = onStockClose?.({
  symbol: stock,
  quantity,
  entryPrice: averagePrice,
  exitPrice: price,
  pnl,
  tradeContext: stockTradeContexts[stock] ?? null,
});

    setBalance((prev) => prev + proceeds);
    setStockPositions((prev) => ({ ...prev, [stock]: 0 }));
    setStockAveragePrices((prev) => ({ ...prev, [stock]: 0 }));

setStockHistory((prev) => [{
  symbol: stock,
  type: "SELL",
  quantity,
  price,
  entryPrice: averagePrice,
  exitPrice: price,
  amount: proceeds,
  pnl,
  closedAt: new Date().toISOString(),
  tradeContext: stockTradeContexts[stock] ?? null,
  time: new Date().toLocaleTimeString(),
  ...(stockReview ? {
    snapshotId: stockReview.snapshotId,
    automaticReview: stockReview.automaticReview,
    review: stockReview.automaticReview,
  } : {}),
}, ...prev]);

    setMessage(`Sold ${stock}`);
  }

function restoreStockTrading(data: {
  positions?: Partial<Record<StockSymbol, number>>;
  averagePrices?: Partial<Record<StockSymbol, number>>;
  history?: StockTrade[];
}) {
  if (data.positions) setStockPositions(data.positions);
  if (data.averagePrices) setStockAveragePrices(data.averagePrices);
  if (data.history) setStockHistory(data.history);
}

  function resetStockTrading() {
    setStockPositions({});
    setStockAveragePrices({});
    setStockHistory([]);
  }

return {
  stockPositions,
  stockAveragePrices,
  stockHistory,
  buyStock,
  sellStock,
  closeStockPosition,
  restoreStockTrading,
  resetStockTrading,
};
}