"use client";

import Navbar from "../components/Navbar";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import {
  createChart,
  ColorType,
  CandlestickSeries,
} from "lightweight-charts";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";


type PricePoint = {
  time: string;
  price: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

type AssetSymbol =
  // CRYPTO
  | "BTC"
  | "ETH"
  | "SOL"
  | "XRP"
  | "DOGE"
  | "ADA"
  | "AVAX"
  | "LINK"
  | "MATIC"
  | "DOT"
  | "SHIB"
  | "LTC"
  | "BCH"
  | "UNI"
  | "ATOM"
  | "ETC"
  | "XLM"
  | "FIL"
  | "APT"
  | "OP"

  // STOCKS
  | "AAPL"
  | "TSLA"
  | "NVDA"
  | "AMZN"
  | "META"
  | "MSFT"
  | "AMD"
  | "NFLX"
  | "COIN"
  | "GOOGL"
  | "PLTR"
  | "SMCI"
  | "ARM"
  | "SNOW"
  | "SHOP"
  | "RBLX"
  | "DIS"
  | "JPM"
  | "BA"
  | "NIO";

type Trade = {
  type: string;
  coin: AssetSymbol;
  price: number;
  amount: number;
  time: string;
};

const cryptoPrices = {
  BTC: 103000,
  ETH: 2500,
  SOL: 180,
  XRP: 2.4,
  DOGE: 0.17,
  ADA: 0.72,
  AVAX: 42,
  LINK: 18,
  MATIC: 1.12,
  DOT: 8.5,
  SHIB: 0.000025,
  LTC: 92,
  BCH: 510,
  UNI: 11,
  ATOM: 9.4,
  ETC: 31,
  XLM: 0.14,
  FIL: 6.8,
  APT: 12.5,
  OP: 3.1,
};

const stockPrices = {
  AAPL: 210,
  TSLA: 340,
  NVDA: 1180,
  AMZN: 185,
  META: 540,
  MSFT: 425,
  AMD: 172,
  NFLX: 640,
  COIN: 265,
  GOOGL: 175,
  PLTR: 28,
  SMCI: 890,
  ARM: 142,
  SNOW: 160,
  SHOP: 78,
  RBLX: 41,
  DIS: 112,
  JPM: 198,
  BA: 185,
  NIO: 5.7,
};

const startingBalance = 10000;


const emptyPositions: Record<AssetSymbol, number> = {
  // CRYPTO
  BTC: 0,
  ETH: 0,
  SOL: 0,
  XRP: 0,
  DOGE: 0,
  ADA: 0,
  AVAX: 0,
  LINK: 0,
  MATIC: 0,
  DOT: 0,
  SHIB: 0,
  LTC: 0,
  BCH: 0,
  UNI: 0,
  ATOM: 0,
  ETC: 0,
  XLM: 0,
  FIL: 0,
  APT: 0,
  OP: 0,

  // STOCKS
  AAPL: 0,
  TSLA: 0,
  NVDA: 0,
  AMZN: 0,
  META: 0,
  MSFT: 0,
  AMD: 0,
  NFLX: 0,
  COIN: 0,
  GOOGL: 0,
  PLTR: 0,
  SMCI: 0,
  ARM: 0,
  SNOW: 0,
  SHOP: 0,
  RBLX: 0,
  DIS: 0,
  JPM: 0,
  BA: 0,
  NIO: 0,
};

export default function SimulatorPage() {
const { user } = useUser();
  const [marketMode, setMarketMode] = useState<"SPOT" | "FUTURES">("SPOT");
  const [selectedCoin, setSelectedCoin] = useState<AssetSymbol>("BTC");
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M");
  const [activeBottomTab, setActiveBottomTab] = useState<"POSITIONS" | "HISTORY" | "ORDERS">("POSITIONS");
const [selectedCandleDate, setSelectedCandleDate] = useState<string>("Hover a candle");
  const [searchTerm, setSearchTerm] = useState("");
  const [prices, setPrices] = useState({
    ...cryptoPrices,
    ...stockPrices,
  });

  const [history, setHistory] = useState<PricePoint[]>(() => {
  const initialHistory: PricePoint[] = [];

  let lastPrice = cryptoPrices.BTC;

  for (let i = 0; i < 120; i++) {
    const open = lastPrice;

    const close =
      open + (Math.random() * 2000 - 1000);

    const high =
      Math.max(open, close) +
      Math.random() * 500;

    const low =
      Math.min(open, close) -
      Math.random() * 500;

    initialHistory.push({
      time: `${i}`,
      price: close,
      open,
      high,
      low,
      close,
    });

    lastPrice = close;
  }

  return initialHistory;
});
  const [positions, setPositions] =
    useState<Record<AssetSymbol, number>>(emptyPositions);
  const [averagePrices, setAveragePrices] =
    useState<Record<AssetSymbol, number>>(emptyPositions);

  const [balance, setBalance] = useState(startingBalance);
  useEffect(() => {
  async function loadPortfolio() {
    if (!user) return;

    const portfolioRef = doc(db, "portfolios", user.id);

    const portfolioSnap = await getDoc(portfolioRef);

    if (portfolioSnap.exists()) {
      const data = portfolioSnap.data();

      if (data.balance) {
        setBalance(data.balance);
      }
      if (data.positions) {
  setPositions(data.positions);
}

if (data.averagePrices) {
  setAveragePrices(data.averagePrices);
}
    }
  }

  loadPortfolio();
}, [user]);
useEffect(() => {
  async function loadTrades() {
    if (!user) return;

    const q = query(
      collection(db, "trades"),
      where("userId", "==", user.id)
    );

    const snapshot = await getDocs(q);

    const loadedTrades = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setTrades(loadedTrades as any[]);
  }

  loadTrades();
}, [user]);
  const [message, setMessage] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);
  const [tradeAmount, setTradeAmount] = useState<number | "">(100);
  const [takeProfit, setTakeProfit] = useState<number | "">("");
const [stopLoss, setStopLoss] = useState<number | "">("");
const [orderType, setOrderType] = useState<"MARKET" | "LIMIT">("MARKET");
const [leverage, setLeverage] = useState(1);
const [positionType, setPositionType] = useState<"LONG" | "SHORT">("LONG");
const [marginUsed, setMarginUsed] = useState(0);
const [futuresPositions, setFuturesPositions] = useState<any[]>([]);
const [futuresHistory, setFuturesHistory] = useState<any[]>([]);
const [limitPrice, setLimitPrice] = useState<number | "">("");
const [pendingLimitOrder, setPendingLimitOrder] = useState<{
  coin: AssetSymbol;
  amount: number;
  limitPrice: number;
  side: "BUY" | "SELL";
} | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [now, setNow] = useState<Date | null>(null);

  const currentPrice = prices[selectedCoin];
  const maintenanceBuffer = 0.005;

const liquidationPrice =
  marketMode === "FUTURES" && leverage > 1
    ? positionType === "LONG"
      ? currentPrice * (1 - 1 / leverage + maintenanceBuffer)
      : currentPrice * (1 + 1 / leverage - maintenanceBuffer)
    : 0;
  function buildHistory(symbol: AssetSymbol, timeframe: string) {
  const candles: PricePoint[] = [];
  let lastPrice = prices[symbol] ?? 100;

  const volatilityMap = {
    "1M": 0.004,
    "5M": 0.008,
    "15M": 0.012,
    "1H": 0.02,
    "4H": 0.035,
    "1D": 0.055,
    "1W": 0.09,
    "1MO": 0.14,
  };

  const volatility =
    volatilityMap[timeframe as keyof typeof volatilityMap] ?? 0.01;

  for (let i = 0; i < 120; i++) {
    const open = lastPrice;
    const close = open + open * (Math.random() * volatility * 2 - volatility);
    const high = Math.max(open, close) + open * volatility * 0.4;
    const low = Math.min(open, close) - open * volatility * 0.4;

    candles.push({
      time: `${i}`,
      price: close,
      open,
      high,
      low,
      close,
    });

    lastPrice = close;
  }

  return candles;
}
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<any>(null);
const candleSeriesRef = useRef<any>(null);

function updatePrices() {
  setPrices((prev) => {
    const updated = Object.fromEntries(
      Object.entries(prev).map(([symbol, price]) => {
        const volatilityMap = {
  "1M": 0.008,
  "5M": 0.012,
  "15M": 0.018,
  "1H": 0.025,
  "4H": 0.04,
  "1D": 0.06,
  "1W": 0.09,
  "1MO": 0.14,
};

const volatility =
  volatilityMap[
    selectedTimeframe as keyof typeof volatilityMap
  ];

const move =
  price *
  (Math.random() * volatility * 2 - volatility);

        return [
          symbol,
          Math.max(0.000001, price + move),
        ];
      })
    ) as Record<AssetSymbol, number>;

setHistory((old) => {
  const previousClose =
    old.length > 0
      ? old[old.length - 1].close
      : updated[selectedCoin] ?? 0;

  const close = updated[selectedCoin] ?? 0;
  const open = previousClose;
  const high = Math.max(open, close) * 1.003;
  const low = Math.min(open, close) * 0.997;

  return [
    ...old.slice(-120),
    {
      time: new Date().toLocaleTimeString(),
      price: close,
      open,
      high,
      low,
      close,
    },
  ];
});

setFuturesPositions((prev) => {
  const liquidatedPositions = prev.filter((position) => {
    const current = updated[position.coin as AssetSymbol];

    return position.side === "LONG"
      ? current <= position.liquidationPrice
      : current >= position.liquidationPrice;
  });

  if (liquidatedPositions.length > 0) {
    setMessage("A futures position was liquidated.");

    setMarginUsed((prevMargin) =>
      Math.max(
        0,
        prevMargin -
          liquidatedPositions.reduce(
            (total, position) => total + position.margin,
            0
          )
      )
    );

    setFuturesHistory((prevHistory) => [
      ...liquidatedPositions.map((position) => ({
        ...position,
        exitPrice: updated[position.coin as AssetSymbol],
        pnl: -position.margin,
        status: "LIQUIDATED",
        time: new Date().toLocaleTimeString(),
      })),
      ...prevHistory,
    ]);
  }

  return prev.filter((position) => {
    const current = updated[position.coin as AssetSymbol];

    return position.side === "LONG"
      ? current > position.liquidationPrice
      : current < position.liquidationPrice;
  });
});

    return updated;
  });
}

  useEffect(() => {
    setNow(new Date());
    updatePrices();

    const timeframeSpeed = {
  "1M": 1000,
  "5M": 1500,
  "15M": 2000,
  "1H": 3000,
  "4H": 4000,
  "1D": 5000,
  "1W": 6000,
  "1MO": 7000,
};

const priceInterval = setInterval(
  updatePrices,
  timeframeSpeed[selectedTimeframe as keyof typeof timeframeSpeed]
);
    const clockInterval = setInterval(() => setNow(new Date()), 1000);

    return () => {
      clearInterval(priceInterval);
      clearInterval(clockInterval);
    };
  }, [selectedCoin, selectedTimeframe]);
useEffect(() => {
  if (!pendingLimitOrder) return;

  const current = prices[pendingLimitOrder.coin];

  if (
    pendingLimitOrder.side === "BUY" &&
    current <= pendingLimitOrder.limitPrice
  ) {
    const savedOrder = pendingLimitOrder;

    setSelectedCoin(savedOrder.coin);
    setTradeAmount(savedOrder.amount);
    setLimitPrice("");
    setPendingLimitOrder(null);

    setTimeout(() => {
      buyCoin();
      setMessage(`Limit BUY filled for ${savedOrder.coin}`);
    }, 0);
  }

  if (
    pendingLimitOrder.side === "SELL" &&
    current >= pendingLimitOrder.limitPrice
  ) {
    const savedOrder = pendingLimitOrder;

    setSelectedCoin(savedOrder.coin);
    setLimitPrice("");
    setPendingLimitOrder(null);

    setTimeout(() => {
      sellCoin();
      setMessage(`Limit SELL filled for ${savedOrder.coin}`);
    }, 0);
  }
}, [prices]);



useEffect(() => {
  if (positions[selectedCoin] <= 0) return;

  const current = prices[selectedCoin];

  if (
    takeProfit !== "" &&
    current >= Number(takeProfit)
  ) {
    sellCoin();

    setMessage(`Take Profit hit on ${selectedCoin}`);

    setTakeProfit("");
    setStopLoss("");
  }

  if (
    stopLoss !== "" &&
    current <= Number(stopLoss)
  ) {
    sellCoin();

    setMessage(`Stop Loss hit on ${selectedCoin}`);

    setTakeProfit("");
    setStopLoss("");
  }
}, [prices]);
useEffect(() => {
  if (!chartRef.current || history.length === 0) return;

  if (!chartInstanceRef.current) {
    const chart = createChart(chartRef.current, {
      layout: {
        attributionLogo: false,
        background: {
          type: ColorType.Solid,
          color: "#0f172a",
        },
        textColor: "#d4d4d8",
      },
      grid: {
        vertLines: { color: "#1f2937" },
        horzLines: { color: "#1f2937" },
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },
      handleScale: {
        mouseWheel: true,
        pinch: true,
      },
      width: chartRef.current.clientWidth,
      height: 520,
      rightPriceScale: {
        borderColor: "#27272a",
      },
timeScale: {
  visible: true,
  borderVisible: true,
  borderColor: "#3f3f46",
  timeVisible: false,
  secondsVisible: false,
  fixLeftEdge: true,
  fixRightEdge: true,
  rightOffset: 0,
  barSpacing: 7,
  minBarSpacing: 4,
},
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#16a34a",
      downColor: "#dc2626",
      borderVisible: false,
      wickUpColor: "#16a34a",
      wickDownColor: "#dc2626",
    });

    chartInstanceRef.current = chart;
    candleSeriesRef.current = candleSeries;

    const handleResize = () => {
      if (!chartRef.current || !chartInstanceRef.current) return;

      chartInstanceRef.current.applyOptions({
        width: chartRef.current.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    chart.subscribeCrosshairMove((param) => {
      if (!param.time) {
        setSelectedCandleDate("Hover a candle");
        return;
      }

      const time = param.time as any;

      if (typeof time === "object") {
        const date = new Date(time.year, time.month - 1, time.day);

        setSelectedCandleDate(
          date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        );
      }
    });
  }

  candleSeriesRef.current?.setData(
    history.map((item, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (history.length - index));

      return {
        time: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
        } as any,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      };
    })
  );
}, [history]);
  function buyCoin() {
    if (!tradeAmount || balance < tradeAmount) {
      setMessage("Invalid trade amount.");
      return;
    }

    const effectiveTradeSize =
  marketMode === "FUTURES"
    ? Number(tradeAmount) * leverage
    : Number(tradeAmount);

const quantity =
  effectiveTradeSize / currentPrice;
    if (
  orderType === "LIMIT" &&
  limitPrice !== "" &&
  currentPrice > Number(limitPrice)
) {
 setPendingLimitOrder({
  coin: selectedCoin,
  amount: Number(tradeAmount),
  limitPrice: Number(limitPrice),
  side: "BUY",
});

  setMessage(
    `Limit order placed for ${selectedCoin} at $${Number(limitPrice).toFixed(2)}`
  );

  return;
}
    const oldQty = positions[selectedCoin];
    const oldAvg = averagePrices[selectedCoin];

    const newQty = oldQty + quantity;

    const newAvg =
      oldQty > 0
        ? (oldQty * oldAvg + quantity * currentPrice) / newQty
        : currentPrice;

    setBalance((prev) => prev - Number(tradeAmount));

if (marketMode === "FUTURES") {
  setMarginUsed((prev) => prev + Number(tradeAmount));
}
if (user) {
 setDoc(doc(db, "portfolios", user.id), {
  userName: user.firstName || "Trader",
  balance: balance - Number(tradeAmount),
  positions: {
    ...positions,
    [selectedCoin]: newQty,
  },
  averagePrices: {
    ...averagePrices,
    [selectedCoin]: newAvg,
  },
  updated: new Date(),
});
}
    setPositions((prev) => ({
      ...prev,
      [selectedCoin]: newQty,
    }));

    setAveragePrices((prev) => ({
      ...prev,
      [selectedCoin]: newAvg,
    }));

    setTrades((prev) => [
      {
        type: "BUY",
        coin: selectedCoin,
        amount: tradeAmount,
        price: currentPrice,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);
if (user) {
  addDoc(collection(db, "trades"), {
    userId: user.id,
    userName: user.firstName || "Trader",
  type: "BUY",
  coin: selectedCoin,
  amount: tradeAmount,
  price: currentPrice,
  created: new Date(),
    });
}

    setMessage(`Bought $${tradeAmount} of ${selectedCoin}`);
    if (orderType === "LIMIT") {
  setLimitPrice("");
}
  }

  function openFuturesPosition(side: "LONG" | "SHORT") {
  if (!tradeAmount || balance < Number(tradeAmount)) {
    setMessage("Invalid margin amount.");
    return;
  }

  const margin = Number(tradeAmount);
  const positionSize = margin * leverage;
  const quantity = positionSize / currentPrice;

 const maintenanceBuffer = 0.005;

const liquidation =
  leverage > 1
    ? side === "LONG"
      ? currentPrice * (1 - 1 / leverage + maintenanceBuffer)
      : currentPrice * (1 + 1 / leverage - maintenanceBuffer)
    : 0;

  setBalance((prev) => prev - margin);
  setMarginUsed((prev) => prev + margin);

  setFuturesPositions((prev) => [
    {
      coin: selectedCoin,
      side,
      margin,
      leverage,
      quantity,
      entryPrice: currentPrice,
      liquidationPrice: liquidation,
      time: new Date().toLocaleTimeString(),
    },
    ...prev,
  ]);

setFuturesHistory((prev) => [
  {
    coin: selectedCoin,
    side,
    margin,
    leverage,
    entryPrice: currentPrice,
    liquidationPrice: liquidation,
    time: new Date().toLocaleTimeString(),
  },
  ...prev,
]);

  setMessage(`${side} ${selectedCoin} opened with ${leverage}x leverage`);
}

  function sellCoin() {
    if (
  orderType === "LIMIT" &&
  limitPrice !== ""
) {
  setPendingLimitOrder({
    coin: selectedCoin,
    amount: positions[selectedCoin] * currentPrice,
    limitPrice: Number(limitPrice),
    side: "SELL",
  });

  setMessage(
    `Limit sell order placed for ${selectedCoin} at $${Number(limitPrice).toFixed(2)}`
  );

  return;
}
    const ownedAmount = positions[selectedCoin];

    if (ownedAmount <= 0) {
      setMessage(`No ${selectedCoin} owned.`);
      return;
    }

    const value = ownedAmount * currentPrice;

    setBalance((prev) => prev + value);

if (marketMode === "FUTURES") {
  setMarginUsed((prev) => Math.max(0, prev - Number(tradeAmount || 0)));
}
if (user) {
 setDoc(doc(db, "portfolios", user.id), {
  userName: user.firstName || "Trader",
  balance: balance + value,
  positions: {
    ...positions,
    [selectedCoin]: 0,
  },
  averagePrices: {
    ...averagePrices,
    [selectedCoin]: 0,
  },
  updated: new Date(),
});
}
    setPositions((prev) => ({
      ...prev,
      [selectedCoin]: 0,
    }));

    setAveragePrices((prev) => ({
      ...prev,
      [selectedCoin]: 0,
    }));

  const spotPnl =
  value - ownedAmount * averagePrices[selectedCoin];

setTrades((prev) => [
  {
    type: "SELL",
    coin: selectedCoin,
    amount: value,
    price: currentPrice,
    pnl: spotPnl,
    time: new Date().toLocaleTimeString(),
  },
  ...prev,
]);

if (user) {
  addDoc(collection(db, "trades"), {
    userId: user.id,
    userName: user.firstName || "Trader",
    type: "SELL",
    coin: selectedCoin,
    amount: value,
    price: currentPrice,
    created: new Date(),
  });
}

    setMessage(`Sold ${selectedCoin} for $${value.toFixed(2)}`);
  }

function resetAccount() {
  setBalance(startingBalance);
  setPositions(emptyPositions);
  setAveragePrices(emptyPositions);
setTrades([]);
setMarginUsed(0);
setFuturesPositions([]);
setFuturesHistory([]);
setMessage("Practice account reset.");

 if (user) {
  deleteDoc(doc(db, "portfolios", user.id));

  const q = query(
    collection(db, "trades"),
    where("userId", "==", user.id)
  );

  getDocs(q).then((snapshot) => {
    snapshot.docs.forEach((tradeDoc) => {
      deleteDoc(doc(db, "trades", tradeDoc.id));
    });
  });
}
}

  const portfolioValue =
    balance +
    Object.entries(positions).reduce(
      (total, [symbol, qty]) => total + qty * prices[symbol as AssetSymbol],
      0
    );
const futuresUnrealizedPnl = futuresPositions.reduce((total, position) => {
  const current = prices[position.coin as AssetSymbol];

  const pnl =
    position.side === "LONG"
      ? (current - position.entryPrice) * position.quantity
      : (position.entryPrice - current) * position.quantity;

  return total + pnl;
}, 0);

const accountEquity =
  marketMode === "FUTURES"
    ? balance + marginUsed + futuresUnrealizedPnl
    : portfolioValue;
const accountValue =
  marketMode === "FUTURES"
    ? accountEquity
    : portfolioValue;

const totalPnl = accountValue - startingBalance;

const totalPnlPercent =
  (totalPnl / startingBalance) * 100;

  function pnlColor(value: number) {
    return value >= 0 ? "text-green-400" : "text-red-400";
  }

const watchlist = [
  { symbol: "BTC" as AssetSymbol, name: "Bitcoin", price: prices.BTC },
  { symbol: "ETH" as AssetSymbol, name: "Ethereum", price: prices.ETH },
  { symbol: "SOL" as AssetSymbol, name: "Solana", price: prices.SOL },
  { symbol: "XRP" as AssetSymbol, name: "XRP", price: prices.XRP },
  { symbol: "DOGE" as AssetSymbol, name: "Dogecoin", price: prices.DOGE },
  { symbol: "ADA" as AssetSymbol, name: "Cardano", price: prices.ADA },
  { symbol: "AVAX" as AssetSymbol, name: "Avalanche", price: prices.AVAX },
  { symbol: "LINK" as AssetSymbol, name: "Chainlink", price: prices.LINK },
  { symbol: "MATIC" as AssetSymbol, name: "Polygon", price: prices.MATIC },
  { symbol: "DOT" as AssetSymbol, name: "Polkadot", price: prices.DOT },
  { symbol: "SHIB" as AssetSymbol, name: "Shiba Inu", price: prices.SHIB },
  { symbol: "LTC" as AssetSymbol, name: "Litecoin", price: prices.LTC },
  { symbol: "BCH" as AssetSymbol, name: "Bitcoin Cash", price: prices.BCH },
  { symbol: "UNI" as AssetSymbol, name: "Uniswap", price: prices.UNI },
  { symbol: "ATOM" as AssetSymbol, name: "Cosmos", price: prices.ATOM },
  { symbol: "ETC" as AssetSymbol, name: "Ethereum Classic", price: prices.ETC },
  { symbol: "XLM" as AssetSymbol, name: "Stellar", price: prices.XLM },
  { symbol: "FIL" as AssetSymbol, name: "Filecoin", price: prices.FIL },
  { symbol: "APT" as AssetSymbol, name: "Aptos", price: prices.APT },
  { symbol: "OP" as AssetSymbol, name: "Optimism", price: prices.OP },
];

  return (
    <>
      <Navbar />

      <main className="page-shell selection:bg-cyan-500/30">

<div className="mt-2 grid grid-cols-1 xl:grid-cols-[260px_minmax(0,1fr)_320px] gap-6 xl:gap-8 w-full page-container">
          <div className="bg-[#111827] border border-zinc-700 rounded-2xl p-4 h-[760px] overflow-y-scroll scrollbar-hide">
            <div className="flex gap-2 mb-4 justify-start">
              <button
                onClick={() => {
                 setMarketMode("SPOT");
                 setSelectedCoin("BTC");
                }}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  marketMode === "SPOT"
                    ? "bg-cyan-500 text-black"
                    : "bg-zinc-800"
                }`}
>
  Crypto Spot
</button>

              <button
                onClick={() => {
                  setMarketMode("FUTURES");
                  setSelectedCoin("BTC");
                }}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  marketMode === "FUTURES"
                    ? "bg-cyan-500 text-black"
                    : "bg-zinc-800"
                }`}
>
  Crypto Futures
</button>
            </div>

            <div className="flex items-center justify-between mb-4">
  <h2 className="text-2xl font-bold text-white">
    Watchlist
  </h2>

  <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">
    LIVE
  </span>
</div>
<input
  type="text"
  placeholder="Search assets..."
  value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
  className="mb-4 w-full rounded-xl border border-zinc-700 bg-[#0f172a] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500"
/>

            <div className="space-y-2.5 mt-2">
              {watchlist
  .filter(
    (coin) =>
      coin.symbol
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      coin.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  )
  .map((coin) => (
                <button
                  key={coin.symbol}
                  onClick={() => {
  setSelectedCoin(coin.symbol);

  setHistory(
    buildHistory(
      coin.symbol,
      selectedTimeframe
    )
  );
}}
                  className={`w-full rounded-lg border border-zinc-800 bg-[#131722] p-2.5 text-left transition-all duration-200 hover:scale-[1.01] hover:bg-zinc-900 ${
                    selectedCoin === coin.symbol
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                      : "border-zinc-800 bg-[#131722] hover:bg-zinc-900"
                  }`}
                >
<div className="flex items-start justify-between">
  <div>
    <p className="text-base font-extrabold tracking-wide text-white">
  {coin.symbol}
</p>
    <p className="text-sm opacity-70">{coin.name}</p>
  </div>

  <p className="text-sm font-bold text-zinc-300">
  ${(coin.price ?? 0).toLocaleString()}
</p>
</div>

<div className="mt-2 overflow-hidden">
  <svg
  viewBox="0 0 100 40"
  width="100"
  height="30"
>
 <polyline
  points={`0,30 15,22 30,26 45,14 60,18 75,8 100,12`}
  fill="none"
  stroke="#22c55e"
  strokeWidth="3"
  strokeLinecap="round"
>
  <animate
    attributeName="points"
    dur="2s"
    repeatCount="indefinite"
    values="
      0,30 15,22 30,26 45,14 60,18 75,8 100,12;
      0,25 15,28 30,18 45,22 60,10 75,16 100,8;
      0,30 15,22 30,26 45,14 60,18 75,8 100,12
    "
  />
</polyline>
  </svg>
</div>
                </button>
              ))}
            </div>
          </div>
  
   

            <div className="bg-[#0f172a] border border-zinc-700 rounded-2xl p-6 h-[760px] flex flex-col overflow-hidden">


<div className="mb-6 border-b border-zinc-800 pb-4">
  <div className="flex items-end gap-4">
    <h2 className="text-3xl font-black text-white">
      {selectedCoin}/USD
    </h2>

    <p className="text-3xl font-black text-white">
      ${(currentPrice ?? 0).toLocaleString()}
    </p>
  </div>

  <div className="mt-2 flex items-center gap-4">
    <p className="text-sm text-zinc-500">
      {marketMode === "SPOT" ? "Spot Market" : "Futures Market"} · {selectedTimeframe}
    </p>

    <p className="text-sm text-zinc-500">
      {now ? now.toLocaleTimeString() : "--:--:--"}
    </p>
  </div>
</div>

          <div className="flex justify-start gap-2 mb-1">
  {["1M", "5M", "15M", "1H", "4H", "1D", "1W", "1MO"].map(
    (timeframe) => (
     <button
  key={timeframe}
  onClick={() => {
  setSelectedTimeframe(timeframe);
  setHistory(
    buildHistory(selectedCoin, timeframe)
  );
}}
  className={`rounded-md border px-3 py-1.5 text-xs font-bold transition-all ${
    selectedTimeframe === timeframe
      ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
      : "border-zinc-700 bg-[#111827] text-zinc-400 hover:border-green-500 hover:text-green-400"
  }`}
>
  {timeframe}
</button>
    )
  )}
</div>

<div className="flex-1 rounded-xl overflow-hidden">
  <div
    ref={chartRef}
    className="h-[520px] w-full"
  />

  <div className="flex items-center justify-between border-t border-zinc-800 bg-[#0f172a] px-4 py-2 text-xs font-bold text-zinc-500">
    <span>Mar</span>
    <span>Apr</span>
    <span>May</span>
    <span>Jun</span>
    <span>Jul</span>
    <span>Aug</span>
    <span className="text-cyan-400">
      {selectedCandleDate}
    </span>
  </div>
</div>
</div>

            <div className="space-y-6 xl:col-span-1">

              <div className="bg-[#111827] border border-zinc-700 rounded-2xl p-5">
  <h2 className="text-xl font-black text-white mb-4">
    Account Summary
  </h2>

  <div className="space-y-3 text-sm">
    <div className="flex items-center justify-between">
      <span className="text-zinc-500">Cash Balance</span>
      <span className="font-bold text-white">${balance.toFixed(2)}</span>
    </div>

<div className="flex items-center justify-between">
  <span className="text-zinc-500">
    {marketMode === "FUTURES" ? "Account Equity" : "Portfolio Value"}
  </span>

  <span className="font-bold text-cyan-400">
    ${accountEquity.toFixed(2)}
  </span>
</div>

{marketMode === "FUTURES" && (
  <div className="flex items-center justify-between">
    <span className="text-zinc-500">Margin Used</span>
    <span className="font-bold text-orange-400">${marginUsed.toFixed(2)}</span>
  </div>
)}

{marketMode === "FUTURES" && (
  <div className="flex items-center justify-between">
    <span className="text-zinc-500">Open P/L</span>

    <span
      className={`font-bold ${
        futuresUnrealizedPnl >= 0 ? "text-green-400" : "text-red-400"
      }`}
    >
      ${futuresUnrealizedPnl.toFixed(2)}
    </span>
  </div>
)}



<div className="flex items-center justify-between">
  <span className="text-zinc-500">Total Return</span>

  <span
    className={`font-bold ${
      totalPnlPercent >= 0
        ? "text-green-400"
        : "text-red-400"
    }`}
  >
    {totalPnlPercent.toFixed(2)}%
  </span>
</div>

  </div>
</div>

  <div className="bg-[#111827] border border-zinc-700 rounded-2xl p-5 h-fit">
  <div className="flex items-center justify-between mb-6">



</div>

  <div className="flex justify-center">
    <input
      type="number"
      value={tradeAmount}
      placeholder="Enter amount"
      onChange={(e) => {
        const value = e.target.value;
        setTradeAmount(value === "" ? "" : Number(value));
      }}
      className="bg-[#0f172a] border border-zinc-700 text-white px-4 py-3 rounded-xl w-full text-center text-xl focus:outline-none focus:border-green-500"
    />
  </div>
<div className="mt-4 grid grid-cols-2 gap-3">
  <input
  type="number"
  placeholder="Take Profit"
  value={takeProfit}
  onChange={(e) => {
    const value = e.target.value;
    setTakeProfit(value === "" ? "" : Number(value));
  }}
  className="bg-[#0f172a] border border-zinc-700 text-white px-3 py-3 rounded-xl w-full text-center text-sm focus:outline-none focus:border-green-500"
/>

 <input
  type="number"
  placeholder="Stop Loss"
  value={stopLoss}
  onChange={(e) => {
    const value = e.target.value;
    setStopLoss(value === "" ? "" : Number(value));
  }}
  className="bg-[#0f172a] border border-zinc-700 text-white px-3 py-3 rounded-xl w-full text-center text-sm focus:outline-none focus:border-red-500"
/>
</div>

{marketMode === "FUTURES" && (
  <div className="mt-4">
    <p className="mb-2 text-xs font-bold tracking-wide text-zinc-500">
      LEVERAGE
    </p>

    <div className="grid grid-cols-4 gap-2">
      {[1, 2, 5, 10, 20, 50].map((lev) => (
        <button
          key={lev}
          onClick={() => setLeverage(lev)}
          className={`rounded-lg border px-3 py-2 text-sm font-bold transition-all ${
            leverage === lev
              ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
              : "border-zinc-700 bg-[#0f172a] text-zinc-400 hover:border-cyan-500 hover:text-cyan-400"
          }`}
        >
          {lev}x
        </button>
      ))}
    </div>
  </div>
)}
<div className="mt-4">
  <p className="mb-2 text-xs font-bold tracking-wide text-zinc-500">
    ORDER TYPE
  </p>

<div className="grid grid-cols-2 gap-2">
  {["MARKET", "LIMIT"].map((type) => (
    <button
      key={type}
      onClick={() =>
        setOrderType(type as "MARKET" | "LIMIT")
      }
      className={`rounded-lg border px-3 py-2 text-sm font-bold transition-all ${
        orderType === type
          ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
          : "border-zinc-700 bg-[#0f172a] text-zinc-400 hover:border-cyan-500 hover:text-cyan-400"
      }`}
    >
      {type}
    </button>
  ))}
</div>
</div>
{orderType === "LIMIT" && (
  <div className="mt-4">
    <input
      type="number"
      placeholder="Enter Limit Price"
      value={limitPrice}
      onChange={(e) => {
        const value = e.target.value;
        setLimitPrice(value === "" ? "" : Number(value));
      }}
      className="bg-[#0f172a] border border-zinc-700 text-white px-4 py-3 rounded-xl w-full text-center text-lg focus:outline-none focus:border-cyan-500"
    />
  </div>
)}
  <div className="mt-4 grid grid-cols-4 gap-2">
    {[100, 500, 1000].map((amount) => (
      <button
        key={amount}
        onClick={() => setTradeAmount(amount)}
        className="rounded-lg border border-zinc-700 bg-black px-4 py-2 text-sm font-bold text-zinc-300 transition-all hover:border-green-500 hover:text-green-400"
      >
        ${amount}
      </button>
    ))}

    <button
      onClick={() => setTradeAmount(Number(balance.toFixed(0)))}
      className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600"
    >
      MAX
    </button>
  </div>
<div className="mt-4 rounded-xl border border-zinc-700 bg-[#0f172a] p-4">
  <div className="flex items-center justify-between text-sm">
    <span className="text-zinc-500">Trade Amount</span>

    <span className="font-bold text-white">
      ${tradeAmount || 0}
    </span>
  </div>

  <div className="mt-2 flex items-center justify-between text-sm">
    <span className="text-zinc-500">
      {marketMode === "FUTURES" ? "Position Size" : "Order Value"}
    </span>

    <span className="font-bold text-cyan-400">
      ${((Number(tradeAmount) || 0) * (marketMode === "FUTURES" ? leverage : 1)).toFixed(2)}
    </span>
  </div>

  {marketMode === "FUTURES" && (
    <>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-zinc-500">Leverage</span>

        <span className="font-bold text-white">
          {leverage}x
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-zinc-500">Margin Used</span>

        <span className="font-bold text-orange-400">
          ${marginUsed.toFixed(2)}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-zinc-500">Est. Liquidation</span>

        <span className="font-bold text-red-400">
          {leverage > 1 ? `$${liquidationPrice.toFixed(2)}` : "N/A"}
        </span>
      </div>
    </>
  )}

  <div className="mt-2 flex items-center justify-between text-sm">
    <span className="text-zinc-500">Estimated Fee</span>

    <span className="font-bold text-zinc-300">
      ${(((Number(tradeAmount) || 0) * (marketMode === "FUTURES" ? leverage : 1)) * 0.001).toFixed(2)}
    </span>
  </div>
</div>
  <div className="mt-4 grid grid-cols-2 gap-3">
    <button
  onClick={() => {
  if (marketMode === "FUTURES") {
    openFuturesPosition("LONG");
  } else {
    buyCoin();
  }
}}
      className="rounded-xl bg-green-500 px-6 py-3 text-lg font-black text-black transition-all hover:scale-[1.02] hover:bg-green-400"
    >
      {marketMode === "FUTURES" ? "LONG" : "BUY"}
    </button>

    <button
      onClick={() => {
  if (marketMode === "FUTURES") {
    openFuturesPosition("SHORT");
  } else {
    sellCoin();
  }
}}
      className="rounded-xl bg-red-500 px-6 py-3 text-lg font-black text-white transition-all hover:scale-[1.02] hover:bg-red-400"
    >
      {marketMode === "FUTURES" ? "SHORT" : "SELL"}
    </button>
  </div>

  <div className="mt-6 flex justify-center">
<button
  onClick={() => setShowResetModal(true)}
  className="bg-zinc-800 text-zinc-300 px-6 py-3 rounded-xl font-bold border border-zinc-700 transition-all hover:border-red-500 hover:text-red-400"
>
  Reset Practice Account
</button>
  </div>

  {message && (
    <p className="text-center mt-6 text-xl font-bold">
      {message}
    </p>
  )}
</div> 
      </div>
      </div>
    <div className="mt-8 page-container">
  <div className="bg-[#111827] border border-zinc-700 rounded-2xl p-6">

    <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
      <div className="flex gap-3">

        <button
          onClick={() => setActiveBottomTab("POSITIONS")}
          className={`rounded-xl px-6 py-3 text-sm tracking-wide font-black transition-all duration-200 ${
            activeBottomTab === "POSITIONS"
              ? "bg-cyan-500 text-black"
              : "bg-[#18181b] text-zinc-400 border border-zinc-800 hover:text-cyan-400"
          }`}
        >
          {marketMode === "FUTURES"
  ? "Futures Positions"
  : "Spot Positions"}
        </button>

        <button
          onClick={() => setActiveBottomTab("HISTORY")}
          className={`rounded-xl px-6 py-3 text-sm tracking-wide font-black transition-all duration-200 ${
            activeBottomTab === "HISTORY"
              ? "bg-cyan-500 text-black"
              : "bg-[#18181b] text-zinc-400 border border-zinc-800 hover:text-cyan-400"
          }`}
        >
          {marketMode === "FUTURES"
  ? "Futures History"
  : "Spot History"}
        </button>
{marketMode === "FUTURES" && (
  <button
    onClick={() => setActiveBottomTab("ORDERS")}
    className={`rounded-xl px-6 py-3 text-sm tracking-wide font-black transition-all duration-200 ${
      activeBottomTab === "ORDERS"
        ? "bg-cyan-500 text-black"
        : "bg-[#18181b] text-zinc-400 border border-zinc-800 hover:text-cyan-400"
    }`}
  >
    Futures Orders
  </button>
)}
      </div>

      
    </div>

    {activeBottomTab === "POSITIONS" && (
      <div className="space-y-4 max-h-[460px] xl:max-h-[520px] overflow-y-scroll scrollbar-hide pr-2">
{marketMode === "FUTURES" &&
  futuresPositions.map((position, index) => (
    <div
      key={index}
      className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-6 mb-4"
    >
  <div className="grid grid-cols-1 md:grid-cols-8 gap-6 items-center">
  <div>
    <p className="text-cyan-400 text-2xl font-bold">
      {position.coin}
    </p>

    <p className={`text-sm mt-1 font-bold ${
      position.side === "LONG" ? "text-green-400" : "text-red-400"
    }`}>
      {position.side}
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-sm">Entry</p>
    <p className="text-xl font-bold text-white">
      ${position.entryPrice.toFixed(2)}
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-sm">Current</p>
    <p className="text-xl font-bold text-white">
      ${prices[position.coin as AssetSymbol].toFixed(2)}
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-sm">Position Size</p>
    <p className="text-xl font-bold text-white">
      ${(position.margin * position.leverage).toFixed(2)}
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-sm">Leverage</p>
    <p className="text-xl font-bold text-white">
      {position.leverage}x
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-sm">Liquidation</p>
    <p className="text-xl font-bold text-red-400">
      ${position.liquidationPrice.toFixed(2)}
    </p>
  </div>

  <div>
  <p className="text-gray-400 text-sm">Unrealized P/L</p>

{(() => {
  const current = prices[position.coin as AssetSymbol];

  const pnl =
    position.side === "LONG"
      ? (current - position.entryPrice) * position.quantity
      : (position.entryPrice - current) * position.quantity;

  return (
    <p
      className={`text-2xl font-bold ${
        pnl >= 0 ? "text-green-400" : "text-red-400"
      }`}
    >
      ${pnl.toFixed(2)}
    </p>
  );
})()}
  </div>

  <div className="flex justify-end">
 <button
  onClick={() => {
    const current = prices[position.coin as AssetSymbol];

    const pnl =
      position.side === "LONG"
        ? (current - position.entryPrice) * position.quantity
        : (position.entryPrice - current) * position.quantity;

    setBalance((prev) => prev + position.margin + pnl);

    setMarginUsed((prev) =>
      Math.max(0, prev - position.margin)
    );

    setFuturesPositions((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setFuturesHistory((prev) => [
      {
        ...position,
        exitPrice: current,
        pnl,
        status: "CLOSED",
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);

    setMessage(
      `${position.side} ${position.coin} closed. P/L: $${pnl.toFixed(2)}`
    );
  }}
  className="rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-red-400"
>
  Close
</button>
  </div>
</div>
    </div>
))}
        {Object.entries(positions)
          .filter(([_, qty]) => Number(qty) > 0)
          .map(([coin, qty]) => {
            const currentPrice =
              prices[coin as keyof typeof prices];

            const avgPrice =
              averagePrices[coin as keyof typeof averagePrices];

            const marketValue =
              Number(qty) * currentPrice;

            const pnl =
              marketValue - Number(qty) * avgPrice;

            return (
              <div
                key={coin}
                className="bg-[#0f172a] border border-zinc-700 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300"
              >
   <div className="grid grid-cols-1 md:grid-cols-8 gap-6 items-center">
  <div>
    <p className="text-cyan-400 text-2xl font-bold">
      {coin}
    </p>

    <p className="text-gray-400 text-sm mt-1">
      Position
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-sm">
      Quantity
    </p>

    <p className="text-xl font-bold text-white">
      {Number(qty).toFixed(6)}
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-sm">
      Market Price
    </p>

    <p className="text-xl font-bold text-white">
      ${currentPrice.toLocaleString()}
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-sm">
      Market Value
    </p>

    <p className="text-xl font-bold text-white">
      ${marketValue.toFixed(2)}
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-sm">
      Avg Cost
    </p>

    <p className="text-xl font-bold text-white">
      ${avgPrice.toFixed(2)}
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-sm">
      Unrealized P/L
    </p>

    <p
      className={`text-2xl font-bold ${
        pnl >= 0 ? "text-green-400" : "text-red-400"
      }`}
    >
      ${pnl.toFixed(2)}
    </p>
  </div>
  <div>
  <p className="text-gray-400 text-sm">
    TP / SL
  </p>

  <p className="text-sm font-bold text-green-400">
    TP: {takeProfit !== "" ? `$${Number(takeProfit).toFixed(2)}` : "Not set"}
  </p>

  <p className="text-sm font-bold text-red-400 mt-1">
    SL: {stopLoss !== "" ? `$${Number(stopLoss).toFixed(2)}` : "Not set"}
  </p>
</div>

  <div className="flex justify-end">
    <button
      onClick={() => {
        const sellValue = Number(qty) * currentPrice;

        setBalance((prev) => prev + sellValue);

        setPositions((prev) => ({
          ...prev,
          [coin]: 0,
        }));

        setAveragePrices((prev) => ({
          ...prev,
          [coin]: 0,
        }));

        setTrades((prev) => [
          {
            type: "SELL",
            coin: coin as AssetSymbol,
            amount: sellValue,
            price: currentPrice,
            time: new Date().toLocaleTimeString(),
          },
          ...prev,
        ]);

        if (user) {
          addDoc(collection(db, "trades"), {
            userId: user.id,
            userName: user.firstName || "Trader",
            type: "SELL",
            coin: coin,
            amount: sellValue,
            price: currentPrice,
            created: new Date(),
          });
        }
      }}
      className="rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-red-400"
    >
      Close
    </button>
  </div>
</div>
              </div>
            );
          })}

        {marketMode === "SPOT" &&
  Object.values(positions).every(
    (qty) => Number(qty) === 0
  ) && (
          <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-10 text-center">
            <p className="text-2xl font-bold text-zinc-300">
              No Open Positions
            </p>

            <p className="text-zinc-500 mt-2">
              Your active trades will appear here.
            </p>
          </div>
        )}

      </div>
    )}

    {activeBottomTab === "HISTORY" && (
      <div className="space-y-4 max-h-[460px] xl:max-h-[520px] overflow-y-scroll scrollbar-hide pr-2">

{marketMode === "FUTURES" ? (
  futuresHistory.length === 0 ? (
    <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-10 text-center">
      <p className="text-2xl font-bold text-zinc-300">
        No Futures History
      </p>

      <p className="text-zinc-500 mt-2">
        Completed futures trades will appear here.
      </p>
    </div>
  ) : (
    futuresHistory.map((trade, index) => (
      <div
        key={index}
        className="bg-[#0f172a] border border-zinc-700 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <div>
            <p
              className={`text-xl font-black ${
                trade.side === "LONG"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {trade.side}
            </p>

            <p className="text-zinc-500 mt-1">
              {trade.coin}
            </p>
          </div>

          <div className="text-right">
            <p className="text-white font-bold text-lg">
              Margin: ${trade.margin}
            </p>

{trade.pnl !== undefined && (
  <p
    className={`text-lg font-black ${
      trade.pnl >= 0 ? "text-green-400" : "text-red-400"
    }`}
  >
    P/L: ${trade.pnl.toFixed(2)}
  </p>
)}

<p className="text-zinc-500 text-sm mt-1">
  Entry: ${trade.entryPrice.toFixed(2)} · {trade.leverage}x
</p>

<p className="text-red-400 text-sm mt-1">
  Liq: ${trade.liquidationPrice.toFixed(2)}
</p>
            <p className="text-zinc-600 text-xs mt-1">
              {trade.time}
            </p>
          </div>
        </div>
      </div>
    ))
  )
) : (
  trades.length === 0 ? (
    <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-10 text-center">
      <p className="text-2xl font-bold text-zinc-300">
        No Spot History
      </p>

      <p className="text-zinc-500 mt-2">
        Completed spot trades will appear here.
      </p>
    </div>
  ) : (
    trades.map((trade, index) => (
      <div
        key={index}
        className="bg-[#0f172a] border border-zinc-700 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <div>
            <p
              className={`text-xl font-black ${
                trade.type === "BUY"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {trade.type}
            </p>

            <p className="text-zinc-500 mt-1">
              {trade.coin}
            </p>
          </div>

          <div className="text-right">
            <p className="text-white font-bold text-lg">
              ${trade.amount.toFixed(2)}
            </p>

<p className="text-zinc-500 text-sm mt-1">
  ${trade.price.toFixed(2)}
</p>

{(trade as any).pnl !== undefined && (
  <p
    className={`text-sm font-black mt-1 ${
      (trade as any).pnl >= 0
        ? "text-green-400"
        : "text-red-400"
    }`}
  >
    P/L: ${(trade as any).pnl.toFixed(2)}
  </p>
)}

            <p className="text-zinc-600 text-xs mt-1">
              {trade.time}
            </p>
          </div>
        </div>
      </div>
    ))
  )
)}

      </div>
    )}
{activeBottomTab === "ORDERS" && (
  <div className="space-y-4 max-h-[460px] xl:max-h-[520px] overflow-y-scroll scrollbar-hide pr-2">

    {!pendingLimitOrder ? (
      <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-10 text-center">
        <p className="text-2xl font-bold text-zinc-300">
          No Open Orders
        </p>

        <p className="text-zinc-500 mt-2">
          Pending limit orders will appear here.
        </p>
      </div>
    ) : (
      <div className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-6">
        <div className="flex items-center justify-between">

          <div>
            <p className="text-xl font-black text-cyan-400">
              LIMIT {pendingLimitOrder.side}
            </p>

            <p className="mt-1 text-zinc-500">
              {pendingLimitOrder.coin}
            </p>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-white">
              ${pendingLimitOrder.limitPrice.toLocaleString()}
            </p>

            <p className="mt-1 text-zinc-500 text-sm">
              ${pendingLimitOrder.amount}
            </p>
            <button
  onClick={() => {
    setPendingLimitOrder(null);
    setMessage("Limit order canceled.");
  }}
  className="mt-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400 transition-all hover:bg-red-500/20"
>
  Cancel
</button>
          </div>

        </div>

     
      </div>
    )}

  </div>
)}
  </div>
</div>

{showResetModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
    <div className="w-full max-w-md rounded-3xl border border-red-500/30 bg-[#0f172a] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
      <h3 className="text-2xl font-black text-red-400">
        Reset Practice Account
      </h3>

      <p className="mt-4 text-zinc-300 leading-7">
        This will permanently delete your balance, open positions,
        trade history, futures history, and trading statistics.
      </p>

      <p className="mt-3 font-bold text-red-400">
        This action cannot be undone.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <button
          onClick={() => setShowResetModal(false)}
          className="rounded-xl border border-zinc-700 py-3 font-bold text-zinc-300 transition-all hover:border-cyan-500 hover:text-cyan-400"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            resetAccount();
            setShowResetModal(false);
          }}
          className="rounded-xl bg-red-500 py-3 font-black text-white transition-all hover:bg-red-400"
        >
          Yes, Reset
        </button>
      </div>
    </div>
  </div>
)}

      </main>

    </>
  );
}