"use client";

import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";

const STARTING_BALANCE = 10_000;

type BenchmarkTrade = {
  id: string;
  status?: string;
  side?: "LONG" | "SHORT";
  symbol?: string;
  entryPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  netPnl?: number;
  openedAt?: string;
  closedAt?: string;
};

export function useGabyBenchmark() {
  const [trades, setTrades] = useState<BenchmarkTrade[]>([]);
  const [loading, setLoading] = useState(true);

const [autoTradeStatus, setAutoTradeStatus] = useState<{
  lastCheck: Date | null;
  lastDecision: string | null;
  lastReason: string | null;
}>({
  lastCheck: null,
  lastDecision: null,
  lastReason: null,
});

  useEffect(() => {
    const tradesQuery = query(
      collection(db, "gabyAutoTrades"),
      orderBy("openedAt", "desc")
    );

    const unsubscribe = onSnapshot(
      tradesQuery,
      (snapshot) => {
        setTrades(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as BenchmarkTrade[]
        );

        setLoading(false);
      },
      (error) => {
        console.error("Failed to load Gaby benchmark:", error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

useEffect(() => {
  const stateRef = doc(db, "gabyAutoTradeState", "v1");

  const unsubscribe = onSnapshot(stateRef, (snapshot) => {
    const data = snapshot.data();

    setAutoTradeStatus({
      lastCheck: data?.lastCheck?.toDate?.() ?? null,
      lastDecision: data?.lastDecision ?? null,
      lastReason: data?.lastReason ?? null,
    });
  });

  return unsubscribe;
}, []);

  const closedTrades = trades.filter(
    (trade) => trade.status === "CLOSED"
  );

  const openTrade =
    trades.find((trade) => trade.status === "OPEN") ?? null;

const lastTrade =
  closedTrades[0] ?? null;

  const netPnl = closedTrades.reduce(
    (total, trade) => total + (Number(trade.netPnl) || 0),
    0
  );

  const wins = closedTrades.filter(
    (trade) => (Number(trade.netPnl) || 0) > 0
  ).length;

  const losses = closedTrades.filter(
    (trade) => (Number(trade.netPnl) || 0) < 0
  ).length;

  const currentBalance = STARTING_BALANCE + netPnl;

  const returnPercent =
    ((currentBalance - STARTING_BALANCE) / STARTING_BALANCE) * 100;

  const winRate = closedTrades.length
    ? (wins / closedTrades.length) * 100
    : 0;

  return {
    loading,

    startingBalance: STARTING_BALANCE,
    currentBalance,
    netPnl,
    returnPercent,

    totalTrades: closedTrades.length,
    wins,
    losses,
    winRate,

    openTrade,
lastTrade,
autoTradeStatus,

  };
}