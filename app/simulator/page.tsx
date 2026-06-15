"use client";

import Navbar from "../components/Navbar";
import GabySimulatorCoach from "../components/GabySimulatorCoach";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import {
  createChart,
  ColorType,
  CrosshairMode,
CandlestickSeries,
HistogramSeries,
LineSeries,
} from "lightweight-charts";

import {
  getMarketIntelligence,
  getMultiTimeframeAnalysis,
  getMovingAverageAnalysis,
  calculateSMA,
  getStructureAnalysis,
  getPriceLocation,
  getEntryQuality,
} from "@/lib/gabyMarketIntelligence";

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
  volume: number;
};

type AssetSymbol =
  | "BTC"
  | "ETH"
  | "SOL"
  | "XRP"
  | "DOGE";

type Trade = {
  type: string;
  coin: AssetSymbol;
  price: number;
  amount: number;
  time: string;
  pnl?: number;
  entryFee?: number;
  exitFee?: number;
  totalFees?: number;
  grossPnl?: number;

  entryQuality?: string | null;
  marketDirection?: string;
  marketStructure?: string;
  nearestSupport?: any;
  nearestResistance?: any;
};


const startingBalance = 10000;
const feeRate = 0.006;

const emptyPositions: Record<AssetSymbol, number> = {
  BTC: 0,
  ETH: 0,
  SOL: 0,
  XRP: 0,
  DOGE: 0,
};


export default function SimulatorPage() {
const { user } = useUser();

useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  const [marketMode, setMarketMode] = useState<"SPOT" | "FUTURES">("SPOT");
  const [showSimulatorGaby, setShowSimulatorGaby] = useState(false);
  const [showGabyHint, setShowGabyHint] = useState(true);
  const [tourStep, setTourStep] = useState<number | null>(null);
  const [showMarketMenu, setShowMarketMenu] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<AssetSymbol>("BTC");
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M");
  const [activeBottomTab, setActiveBottomTab] = useState<"POSITIONS" | "HISTORY" | "ORDERS">("POSITIONS");
const [selectedCandleDate, setSelectedCandleDate] = useState<string>("Hover a candle");
  const [searchTerm, setSearchTerm] = useState("");
const [prices, setPrices] = useState<
  Partial<Record<AssetSymbol, number>>
>({});

  const [history, setHistory] = useState<PricePoint[]>([]);
  const [candlesReadyFor, setCandlesReadyFor] = useState("");
const [timeframeStructures, setTimeframeStructures] = useState({});
const marketIntelligence =
  history.length > 20
    ? getMarketIntelligence(history)
    : null;

const multiTimeframeAnalysis =
  getMultiTimeframeAnalysis(timeframeStructures);

const movingAverageAnalysis =
  history.length >= 99
    ? getMovingAverageAnalysis(history)
    : null;

const structureAnalysis =
  history.length > 20
    ? getStructureAnalysis(history)
    : null;

  const [positions, setPositions] =
    useState<Record<AssetSymbol, number>>(emptyPositions);
  const [averagePrices, setAveragePrices] =
    useState<Record<AssetSymbol, number>>(emptyPositions);

    const [spotRiskSettings, setSpotRiskSettings] = useState<
  Partial<
    Record<
      AssetSymbol,
      {
        takeProfit: number | null;
        stopLoss: number | null;
      }
    >
  >
>({});

  const [balance, setBalance] = useState(startingBalance);

useEffect(() => {
  function startTour() {
    setShowSimulatorGaby(false);
    setTourStep(1);
  }

  window.addEventListener("startSimulatorTour", startTour);

  return () => {
    window.removeEventListener("startSimulatorTour", startTour);
  };
}, []);

useEffect(() => {
  const timer = setTimeout(() => {
    setShowGabyHint(false);
  }, 8000);

  return () => clearTimeout(timer);
}, []);

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
  const [tradeAmount, setTradeAmount] = useState<number | "">("");
  const [takeProfit, setTakeProfit] = useState<number | "">("");
const [stopLoss, setStopLoss] = useState<number | "">("");
const [orderType, setOrderType] = useState<"MARKET" | "LIMIT">("MARKET");
const [leverage, setLeverage] = useState(1);
const [showLeverageMenu, setShowLeverageMenu] = useState(false);
const [positionType, setPositionType] = useState<"LONG" | "SHORT">("LONG");
const [marginUsed, setMarginUsed] = useState(0);
const [futuresPositions, setFuturesPositions] = useState<any[]>([]);
useEffect(() => {
  console.log("FUTURES POSITIONS:", futuresPositions);
}, [futuresPositions]);
const [futuresHistory, setFuturesHistory] = useState<any[]>([]);
const [limitPrice, setLimitPrice] = useState<number | "">("");
const [pendingLimitOrder, setPendingLimitOrder] = useState<{
  coin: AssetSymbol;
  amount: number;
  limitPrice: number;
  side: "BUY" | "SELL" | "LONG" | "SHORT";
  mode: "SPOT" | "FUTURES";
  leverage?: number;
} | null>(null);
const [pendingFuturesLimitOrder, setPendingFuturesLimitOrder] = useState<{
  coin: AssetSymbol;
  amount: number;
  limitPrice: number;
  side: "LONG" | "SHORT";
  mode: "FUTURES";
  leverage?: number;
} | null>(null);

  const [trades, setTrades] = useState<Trade[]>([]);
  const [now, setNow] = useState<Date | null>(null);
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [simulatorReady, setSimulatorReady] = useState(false);
useEffect(() => {
  const saved = localStorage.getItem("tradenestx-simulator-session");

  if (!saved) {
  setSessionLoaded(true);
  setSimulatorReady(true);
  return;
}

  const data = JSON.parse(saved);

  if (data.balance !== undefined) setBalance(data.balance);
  if (data.positions) setPositions(data.positions);
  if (data.averagePrices) setAveragePrices(data.averagePrices);
  if (data.trades) setTrades(data.trades);
  if (data.marginUsed !== undefined) setMarginUsed(data.marginUsed);
  if (data.futuresPositions) setFuturesPositions(data.futuresPositions);
  if (data.futuresHistory) setFuturesHistory(data.futuresHistory);
  if (data.pendingLimitOrder) setPendingLimitOrder(data.pendingLimitOrder);
  if (data.pendingFuturesLimitOrder) setPendingFuturesLimitOrder(data.pendingFuturesLimitOrder);
  if (data.tradeAmount !== undefined) setTradeAmount(data.tradeAmount);
  if (data.takeProfit !== undefined) setTakeProfit(data.takeProfit);
  if (data.stopLoss !== undefined) setStopLoss(data.stopLoss);
  if (data.limitPrice !== undefined) setLimitPrice(data.limitPrice);
  if (data.orderType) setOrderType(data.orderType);
  if (data.leverage) setLeverage(data.leverage);
  if (data.marketMode) setMarketMode(data.marketMode);
  
  
  if (data.activeBottomTab) setActiveBottomTab(data.activeBottomTab);
  setSessionLoaded(true);
setSimulatorReady(true);
}, []);

useEffect(() => {
  if (!sessionLoaded) return;

  localStorage.setItem(
    "tradenestx-simulator-session",
    JSON.stringify({
      balance,
      positions,
      averagePrices,
      trades,
      marginUsed,
      futuresPositions,
      futuresHistory,
      pendingLimitOrder,
      pendingFuturesLimitOrder,
      tradeAmount,
      takeProfit,
      stopLoss,
      limitPrice,
      orderType,
      leverage,
      marketMode,
      
      
      activeBottomTab,
    })
  );
}, [
  balance,
  positions,
  averagePrices,
  trades,
  marginUsed,
  futuresPositions,
  futuresHistory,
  pendingLimitOrder,
  pendingFuturesLimitOrder,
  tradeAmount,
  takeProfit,
  stopLoss,
  limitPrice,
  orderType,
  leverage,
  marketMode,
  
  activeBottomTab,
  sessionLoaded,
]);
  const currentPrice = prices[selectedCoin];

const priceLocation =
  marketIntelligence && currentPrice
    ? getPriceLocation(
        currentPrice,
        marketIntelligence.nearestSupport,
        marketIntelligence.nearestResistance
      )
    : null;

const currentEntryQuality =
  marketIntelligence && movingAverageAnalysis && currentPrice
    ? getEntryQuality(
        currentPrice,
        marketIntelligence.nearestSupport,
        marketIntelligence.nearestResistance,
        movingAverageAnalysis.direction
      )
    : null;

  const maintenanceBuffer = 0.005;

const liquidationPrice =
  currentPrice && marketMode === "FUTURES" && leverage > 1
    ? positionType === "LONG"
      ? currentPrice * (1 - 1 / leverage + maintenanceBuffer)
      : currentPrice * (1 + 1 / leverage - maintenanceBuffer)
    : 0;

  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<any>(null);
const candleSeriesRef = useRef<any>(null);
const volumeSeriesRef = useRef<any>(null);

const ma7SeriesRef = useRef<any>(null);
const ma25SeriesRef = useRef<any>(null);
const ma99SeriesRef = useRef<any>(null);

const liquidationLinesRef = useRef<any[]>([]);
const entryLinesRef = useRef<any[]>([]);
const riskLinesRef = useRef<any[]>([]);

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

function getCurrentCandleStart(timeframe: string) {
  const timeframeMs = getTimeframeMs(timeframe);
  const now = Date.now();

  return Math.floor(now / timeframeMs) * timeframeMs;
}

async function updatePrices() {
  try {
    const response = await fetch("/api/prices");
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid price data");
    }

    const realPrices = data.reduce(
      (
        acc: Partial<Record<AssetSymbol, number>>,
        item: any
      ) => {
        const symbol = item.symbol.replace(
          "USDT",
          ""
        ) as AssetSymbol;

        acc[symbol] = Number(item.price);

        return acc;
      },
      {}
    );

const livePrice = realPrices[selectedCoin];
const activeCandleKey = `${selectedCoin}-${selectedTimeframe}`;

if (livePrice && candlesReadyFor === activeCandleKey) {
  setHistory((prevHistory) => {
    if (prevHistory.length === 0) return prevHistory;

    const updatedHistory = [...prevHistory];
    const lastCandle = updatedHistory[updatedHistory.length - 1];

    updatedHistory[updatedHistory.length - 1] = {
      ...lastCandle,
      close: livePrice,
      high: Math.max(lastCandle.high, livePrice),
      low: Math.min(lastCandle.low, livePrice),
      price: livePrice,
    };

    return updatedHistory;
  });
}

    setPrices((prev) => {
      const updated = {
        ...prev,
        ...realPrices,
      } as Record<AssetSymbol, number>;



      setFuturesPositions((prevPositions) => {
        const liquidatedPositions =
          prevPositions.filter((position) => {
const current = updated[position.coin as AssetSymbol];

if (!current) return false;

return position.side === "LONG"
  ? current <= position.liquidationPrice
  : current >= position.liquidationPrice;
          });

        if (liquidatedPositions.length > 0) {
          setMessage(
            "A futures position was liquidated."
          );

          setMarginUsed((prevMargin) =>
            Math.max(
              0,
              prevMargin -
                liquidatedPositions.reduce(
                  (total, position) =>
                    total + position.margin,
                  0
                )
            )
          );

          setFuturesHistory((prevHistory) => [
            ...liquidatedPositions.map(
              (position) => ({
                ...position,
                exitPrice:
                  updated[
                    position.coin as AssetSymbol
                  ],
                pnl: -position.margin,
                status: "LIQUIDATED",
                time: new Date().toLocaleTimeString(),
              })
            ),
            ...prevHistory,
          ]);
        }

        return prevPositions.filter((position) => {
const current = updated[position.coin as AssetSymbol];

if (!current) return true;

return position.side === "LONG"
  ? current > position.liquidationPrice
  : current < position.liquidationPrice;
        });
      });

      return updated;
    });
  } catch (error) {
    console.error(
      "Price update failed:",
      error
    );
  }
}

  useEffect(() => {
    setNow(new Date());
    updatePrices();

const timeframeSpeed = {
  "1M": 1000,
  "5M": 1000,
  "15M": 1000,
  "1H": 1000,
  "4H": 1000,
  "1D": 1000,
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
  }, [selectedCoin, selectedTimeframe, candlesReadyFor]);

useEffect(() => {
  const livePrice = prices[selectedCoin];
  const activeCandleKey = `${selectedCoin}-${selectedTimeframe}`;

  if (!livePrice) return;
  if (candlesReadyFor !== activeCandleKey) return;

  setHistory((prevHistory) => {
    if (prevHistory.length === 0) return prevHistory;

    const updatedHistory = [...prevHistory];
    const lastCandle = updatedHistory[updatedHistory.length - 1];

    updatedHistory[updatedHistory.length - 1] = {
      ...lastCandle,
      close: livePrice,
      high: Math.max(lastCandle.high, livePrice),
      low: Math.min(lastCandle.low, livePrice),
      price: livePrice,
    };

    return updatedHistory;
  });
}, [prices, selectedCoin, selectedTimeframe, candlesReadyFor]);

useEffect(() => {
  if (!pendingLimitOrder) return;

  const current = prices[pendingLimitOrder.coin];
if (!current) return;
  if (pendingLimitOrder.mode === "SPOT") {
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
  }


}, [prices]);

useEffect(() => {
  if (!pendingFuturesLimitOrder) return;

  const current = prices[pendingFuturesLimitOrder.coin];
if (!current) return;
  if (
    pendingFuturesLimitOrder.side === "LONG" &&
    current <= pendingFuturesLimitOrder.limitPrice
  ) {
    const savedOrder = pendingFuturesLimitOrder;

    setSelectedCoin(savedOrder.coin);
    setTradeAmount(savedOrder.amount);
    setLeverage(savedOrder.leverage || 1);
    setLimitPrice("");
    setPendingFuturesLimitOrder(null);

    setTimeout(() => {
      openFuturesPosition("LONG", savedOrder.leverage || 1);
      setMessage(`Limit LONG filled for ${savedOrder.coin}`);
    }, 0);
  }

  if (
    pendingFuturesLimitOrder.side === "SHORT" &&
    current >= pendingFuturesLimitOrder.limitPrice
  ) {
    const savedOrder = pendingFuturesLimitOrder;

    setSelectedCoin(savedOrder.coin);
    setTradeAmount(savedOrder.amount);
    setLeverage(savedOrder.leverage || 1);
    setLimitPrice("");
    setPendingFuturesLimitOrder(null);

    setTimeout(() => {
      openFuturesPosition("SHORT", savedOrder.leverage || 1);
      setMessage(`Limit SHORT filled for ${savedOrder.coin}`);
    }, 0);
  }
}, [prices]);

useEffect(() => {
  if (positions[selectedCoin] <= 0) return;

  const current = prices[selectedCoin];
if (!current) return;
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
  if (marketMode !== "FUTURES") return;
  if (futuresPositions.length === 0) return;

  futuresPositions.forEach((position, index) => {
    if (position.coin !== selectedCoin) return;

    const current = prices[position.coin as AssetSymbol];
if (!current) return;
const takeProfitHit =
  position.takeProfit != null &&
  (position.side === "LONG"
    ? current >= position.takeProfit
    : current <= position.takeProfit);

const stopLossHit =
  position.stopLoss != null &&
  (position.side === "LONG"
    ? current <= position.stopLoss
    : current >= position.stopLoss);

    if (!takeProfitHit && !stopLossHit) return;

const pnl =
  position.side === "LONG"
    ? (current - position.entryPrice) * position.quantity
    : (position.entryPrice - current) * position.quantity;

const exitFee =
  (position.positionSize || position.margin * position.leverage) * feeRate;

const netPnl =
  pnl - (position.entryFee || 0) - exitFee;

setBalance((prev) => prev + position.margin + netPnl);

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
    pnl: netPnl,
grossPnl: pnl,
entryFee: position.entryFee || 0,
exitFee,
totalFees: (position.entryFee || 0) + exitFee,
    status: takeProfitHit ? "TAKE PROFIT" : "STOP LOSS",
    positionSize: position.positionSize || position.margin * position.leverage,
    balanceAtEntry: position.balanceAtEntry || startingBalance,
    stopLoss: position.stopLoss,
    takeProfit: position.takeProfit,
    closedReason: takeProfitHit ? "TP" : "SL",
    time: new Date().toLocaleTimeString(),
  },
  ...prev,
]);

setTakeProfit("");
setStopLoss("");

    setMessage(
      `${takeProfitHit ? "Take Profit" : "Stop Loss"} hit on ${position.coin}`
    );
  });
}, [prices]);

useEffect(() => {
  if (!simulatorReady) return;

  let cancelled = false;

  async function loadCandles() {
    const candleKey = `${selectedCoin}-${selectedTimeframe}`;

    try {
      setCandlesReadyFor("");
      setHistory([]);

      if (chartInstanceRef.current) {
        chartInstanceRef.current.__didSetInitialRange = false;
      }

await updatePrices();

const response = await fetch(
  `/api/candles?symbol=${selectedCoin}&timeframe=${selectedTimeframe}&t=${Date.now()}`,
  {
    cache: "no-store",
  }
);

const data = await response.json();



if (cancelled) return;

if (!Array.isArray(data)) {
  console.log("Candles API returned:", data);
  return;
}

setHistory(data);

const intelligence = getMarketIntelligence(data);

setTimeframeStructures((prev) => ({
  ...prev,
  [selectedTimeframe]: intelligence.structure,
}));

setCandlesReadyFor(candleKey);
    } catch (error) {
      if (!cancelled) {
        console.error("Failed to load candles:", error);
      }
    }
  }

  loadCandles();

  return () => {
    cancelled = true;
  };
}, [selectedCoin, selectedTimeframe, simulatorReady]);

useEffect(() => {
  if (chartInstanceRef.current) {
    chartInstanceRef.current.remove();
    chartInstanceRef.current = null;
candleSeriesRef.current = null;
volumeSeriesRef.current = null;
ma7SeriesRef.current = null;
ma25SeriesRef.current = null;
ma99SeriesRef.current = null;

    liquidationLinesRef.current = [];
    entryLinesRef.current = [];
    riskLinesRef.current = [];
  }
}, [selectedCoin, selectedTimeframe]);

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
crosshair: {
  mode: CrosshairMode.Normal,
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
  barSpacing: 3,
  minBarSpacing: 1,
},
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#16a34a",
      downColor: "#dc2626",
      borderVisible: false,
      wickUpColor: "#16a34a",
      wickDownColor: "#dc2626",
    });

    candleSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.05,
        bottom: 0.28,
      },
    });

const volumeSeries = chart.addSeries(HistogramSeries, {
  priceFormat: {
    type: "volume",
  },
  priceScaleId: "volume",
});

chart.priceScale("volume").applyOptions({
  scaleMargins: {
    top: 0.78,
    bottom: 0,
  },
  visible: false,
});

const ma7Series = chart.addSeries(LineSeries, {
  color: "#facc15",
  lineWidth: 1,
  priceLineVisible: false,
  lastValueVisible: false,
});

const ma25Series = chart.addSeries(LineSeries, {
  color: "#38bdf8",
  lineWidth: 1,
  priceLineVisible: false,
  lastValueVisible: false,
});

const ma99Series = chart.addSeries(LineSeries, {
  color: "#a78bfa",
  lineWidth: 1,
  priceLineVisible: false,
  lastValueVisible: false,
});

chartInstanceRef.current = chart;
candleSeriesRef.current = candleSeries;
volumeSeriesRef.current = volumeSeries;
ma7SeriesRef.current = ma7Series;
ma25SeriesRef.current = ma25Series;
ma99SeriesRef.current = ma99Series;

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

const chartData = history
  .map((item) => ({
    time: Math.floor(Number(item.time) / 1000) as any,
    open: item.open,
    high: item.high,
    low: item.low,
    close: item.close,
    volume: item.volume,
  }))
  .filter((item, index, array) => {
    return index === 0 || item.time > array[index - 1].time;
  });

  candleSeriesRef.current?.setData(
    chartData.map((item) => ({
      time: item.time,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }))
  );

if (chartData.length > 80 && !chartInstanceRef.current.__didSetInitialRange) {
  chartInstanceRef.current.timeScale().setVisibleLogicalRange({
    from: chartData.length - 160,
    to: chartData.length + 5,
  });

  chartInstanceRef.current.__didSetInitialRange = true;
}

  volumeSeriesRef.current?.setData(
    chartData.map((item) => ({
      time: item.time,
      value: item.volume,
      color:
        item.close >= item.open
          ? "rgba(34,197,94,0.55)"
          : "rgba(239,68,68,0.55)",
    }))
  );

function buildMAData(period: number) {
  return chartData
    .map((item, index, array) => {
      if (index < period - 1) return null;

      const slice = array.slice(index - period + 1, index + 1);

      const average =
        slice.reduce((sum, candle) => sum + candle.close, 0) / period;

      return {
        time: item.time,
        value: average,
      };
    })
    .filter(Boolean) as { time: any; value: number }[];
}

ma7SeriesRef.current?.setData(buildMAData(7));
ma25SeriesRef.current?.setData(buildMAData(25));
ma99SeriesRef.current?.setData(buildMAData(99));

liquidationLinesRef.current.forEach((line) => {
  candleSeriesRef.current?.removePriceLine(line);
});

liquidationLinesRef.current = [];



if (marketMode === "FUTURES") {
  const activePosition = futuresPositions.find(
    (position) => position.coin === selectedCoin
  );

  if (activePosition) {


    const line = candleSeriesRef.current?.createPriceLine({
      price: activePosition.liquidationPrice,
      color: "#ef4444",
      lineWidth: 2,
      lineStyle: 2,
      axisLabelVisible: true,
      title: "LIQ",
    });

    if (line) {
      liquidationLinesRef.current.push(line);
    }
  }
}

entryLinesRef.current.forEach((line) => {
  candleSeriesRef.current?.removePriceLine(line);
});

entryLinesRef.current = [];

riskLinesRef.current.forEach((line) => {
  candleSeriesRef.current?.removePriceLine(line);
});

riskLinesRef.current = [];

const activeEntryPosition =
  marketMode === "FUTURES"
    ? futuresPositions.find(
        (position) => position.coin === selectedCoin
      )
    : null;

if (marketMode === "FUTURES" && activeEntryPosition) {
  const entryLine = candleSeriesRef.current?.createPriceLine({
    price: activeEntryPosition.entryPrice,
color: "#64748b",
lineWidth: 2,
    lineStyle: 2,
    axisLabelVisible: true,
    title: "ENTRY",
  });

  if (entryLine) {
    riskLinesRef.current.push(entryLine);
  }
}

if (marketMode === "SPOT" && positions[selectedCoin] > 0) {
  const entryLine = candleSeriesRef.current?.createPriceLine({
    price: averagePrices[selectedCoin],
color: "#64748b",
lineWidth: 2,
    lineStyle: 2,
    axisLabelVisible: true,
    title: "ENTRY",
  });

  if (entryLine) {
    riskLinesRef.current.push(entryLine);
  }
}

if (takeProfit !== "") {
  const tpLine = candleSeriesRef.current?.createPriceLine({
    price: Number(takeProfit),
    color: "#22c55e",
    lineWidth: 2,
    lineStyle: 2,
    axisLabelVisible: true,
    title: "TP",
  });

  if (tpLine) {
    riskLinesRef.current.push(tpLine);
  }
}

if (stopLoss !== "") {
  const slLine = candleSeriesRef.current?.createPriceLine({
    price: Number(stopLoss),
    color: "#ef4444",
    lineWidth: 2,
    lineStyle: 2,
    axisLabelVisible: true,
    title: "SL",
  });

  if (slLine) {
    riskLinesRef.current.push(slLine);
  }
}

}, [
  history,
  futuresPositions,
  positions,
  averagePrices,
  marketMode,
  selectedCoin,
  takeProfit,
  stopLoss,
]);
function buyCoin() {

  if (!currentPrice) {
    setMessage("Loading real market price...");
    return;
  }

const spotEntryFee = Number(tradeAmount) * feeRate;

  if (!tradeAmount || balance < Number(tradeAmount) + spotEntryFee) {
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
  mode: "SPOT",
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

    setBalance((prev) => prev - Number(tradeAmount) - spotEntryFee);

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

setSpotRiskSettings((prev) => ({
  ...prev,
  [selectedCoin]: {
    takeProfit:
      takeProfit !== "" ? Number(takeProfit) : null,
    stopLoss:
      stopLoss !== "" ? Number(stopLoss) : null,
  },
}));

setTrades((prev) => [
  {
    type: "BUY",
    coin: selectedCoin,
    amount: tradeAmount,
    price: currentPrice,

    entryFee: spotEntryFee,

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

  entryFee: spotEntryFee,

  created: new Date(),
});
}

    setMessage(`Bought $${tradeAmount} of ${selectedCoin}`);
    if (orderType === "LIMIT") {
  setLimitPrice("");
}
  }

  function openFuturesPosition(side: "LONG" | "SHORT", orderLeverage = leverage) {

  if (!currentPrice) {
    setMessage("Loading real market price...");
    return;
  }

  if (!tradeAmount || balance < Number(tradeAmount)) {
    setMessage("Invalid margin amount.");
    return;
  }

  const margin = Number(tradeAmount);
const positionSize = margin * orderLeverage;
const entryFee = positionSize * feeRate;
if (balance < margin + entryFee) {
  setMessage("Not enough balance for margin plus entry fee.");
  return;
}
  if (orderType === "LIMIT" && limitPrice !== "") {
setPendingFuturesLimitOrder({
  coin: selectedCoin,
  amount: margin,
  limitPrice: Number(limitPrice),
  side,
  mode: "FUTURES",
  leverage: orderLeverage,
});

  setMessage(
    `Limit ${side} placed for ${selectedCoin} at $${Number(limitPrice).toFixed(2)}`
  );

  return;
}

const quantity = positionSize / currentPrice;

const maintenanceBuffer = 0.005;

const liquidation =
  orderLeverage > 1
    ? side === "LONG"
      ? currentPrice * (1 - 1 / orderLeverage + maintenanceBuffer)
      : currentPrice * (1 + 1 / orderLeverage - maintenanceBuffer)
    : 0;

  setBalance((prev) => prev - margin - entryFee);
  setMarginUsed((prev) => prev + margin);

setFuturesPositions((prev) => [
  {
    coin: selectedCoin,
    side,
    margin,
    leverage: orderLeverage,
entryFee,
    positionSize,

    quantity,

    entryPrice: currentPrice,

    liquidationPrice: liquidation,

    balanceAtEntry: balance,

    stopLoss:
      stopLoss !== ""
        ? Number(stopLoss)
        : null,

    takeProfit:
      takeProfit !== ""
        ? Number(takeProfit)
        : null,

    time: new Date().toLocaleTimeString(),
  },
  ...prev,
]);

setFuturesHistory((prev) => [
  {
    coin: selectedCoin,
    side,
    margin,
    leverage: orderLeverage,

    positionSize,

    quantity,

    entryPrice: currentPrice,

    liquidationPrice: liquidation,

    balanceAtEntry: balance,

    stopLoss:
      stopLoss !== ""
        ? Number(stopLoss)
        : null,

    takeProfit:
      takeProfit !== ""
        ? Number(takeProfit)
        : null,

    pnl: null,

    status: "OPEN",

    time: new Date().toLocaleTimeString(),
  },
  ...prev,
]);

  setMessage(`${side} ${selectedCoin} opened with ${orderLeverage}x leverage`);
}

  function sellCoin() {
    if (!currentPrice) {
  setMessage("Loading real market price...");
  return;
}
    if (
  orderType === "LIMIT" &&
  limitPrice !== ""
) {
  setPendingLimitOrder({
    coin: selectedCoin,
    amount: positions[selectedCoin] * currentPrice,
    limitPrice: Number(limitPrice),
    side: "SELL",
    mode: "SPOT",
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
const spotExitFee = value * feeRate;
const netValue = value - spotExitFee;
    setBalance((prev) => prev + netValue);

if (marketMode === "FUTURES") {
  setMarginUsed((prev) => Math.max(0, prev - Number(tradeAmount || 0)));
}
if (user) {
 setDoc(doc(db, "portfolios", user.id), {
  userName: user.firstName || "Trader",
  balance: balance + netValue,
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

  const grossSpotPnl =
  value - ownedAmount * averagePrices[selectedCoin];

const spotEntryFeePaid =
  trades.find(
    (trade) =>
      trade.type === "BUY" &&
      trade.coin === selectedCoin
  )?.entryFee || 0;

const spotPnl =
  grossSpotPnl - spotEntryFeePaid - spotExitFee;

setTrades((prev) => [
  {
    type: "SELL",
    coin: selectedCoin,
    amount: value,
    price: currentPrice,

    pnl: spotPnl,

    grossPnl: grossSpotPnl,
entryFee: spotEntryFeePaid,
exitFee: spotExitFee,
totalFees: spotEntryFeePaid + spotExitFee,

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
    pnl: spotPnl,
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

  setTradeAmount("");
  setTakeProfit("");
  setStopLoss("");
  setLimitPrice("");
  setPendingLimitOrder(null);
  setPendingFuturesLimitOrder(null);
  setOrderType("MARKET");
  setLeverage(1);

  setMessage("Practice account reset.");
localStorage.removeItem("tradenestx-simulator-session");
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
  Object.entries(positions).reduce((total, [symbol, qty]) => {
    const price = prices[symbol as AssetSymbol];

    if (!price) return total;

    return total + Number(qty) * price;
  }, 0);

const futuresUnrealizedPnl = futuresPositions.reduce((total, position) => {
  const current = prices[position.coin as AssetSymbol];

  if (!current) return total;

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

const activePendingOrder =
  marketMode === "FUTURES"
    ? pendingFuturesLimitOrder
    : pendingLimitOrder;

const watchlist = [
  { symbol: "BTC" as AssetSymbol, name: "Bitcoin", price: prices.BTC },
  { symbol: "ETH" as AssetSymbol, name: "Ethereum", price: prices.ETH },
  { symbol: "SOL" as AssetSymbol, name: "Solana", price: prices.SOL },
  { symbol: "XRP" as AssetSymbol, name: "XRP", price: prices.XRP },
  { symbol: "DOGE" as AssetSymbol, name: "Dogecoin", price: prices.DOGE },
];

  return (
    <>
      <Navbar />

      <main className="page-shell selection:bg-cyan-500/30 !pt-0">

<div className="mt-2 grid grid-cols-1 xl:grid-cols-[230px_minmax(0,1fr)_280px] gap-4 w-full page-container">
          <div
  className={`bg-[#111827] border border-zinc-700 rounded-2xl p-4 h-[760px] flex flex-col overflow-hidden ${
    tourStep === 1
      ? "relative z-50 ring-4 ring-cyan-400 shadow-[0_0_45px_rgba(34,211,238,0.45)]"
      : ""
  }`}
>
<div className="relative mb-4">
  <button
    onClick={() => setShowMarketMenu(!showMarketMenu)}
    className="flex w-full items-center justify-between rounded-xl border border-zinc-700 bg-[#0f172a] px-4 py-3 text-sm font-black text-white transition-all hover:border-cyan-500"
  >
    <span>
      {marketMode === "SPOT" ? "Crypto Spot" : "Crypto Futures"}
    </span>

    <span className="text-cyan-400">▼</span>
  </button>

  {showMarketMenu && (
    <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-zinc-700 bg-[#0f172a] shadow-xl">
      <button
        onClick={() => {
          setMarketMode("SPOT");
          
          setSelectedCoin("BTC");
          setActiveBottomTab("POSITIONS");
          setShowMarketMenu(false);
        }}
        className="block w-full px-4 py-3 text-left text-sm font-bold text-zinc-300 hover:bg-cyan-500/10 hover:text-cyan-400"
      >
        Crypto Spot
      </button>

      <button
        onClick={() => {
          setMarketMode("FUTURES");
          
          setSelectedCoin("BTC");
          setActiveBottomTab("POSITIONS");
          setShowMarketMenu(false);
        }}
        className="block w-full px-4 py-3 text-left text-sm font-bold text-zinc-300 hover:bg-cyan-500/10 hover:text-cyan-400"
      >
        Crypto Futures
      </button>

      <div className="border-t border-zinc-800" />

      <button
        disabled
        className="block w-full cursor-not-allowed px-4 py-3 text-left text-sm font-bold text-zinc-600"
      >
        Stocks Coming Soon
      </button>

      <button
        disabled
        className="block w-full cursor-not-allowed px-4 py-3 text-left text-sm font-bold text-zinc-600"
      >
        Options Coming Soon
      </button>
    </div>
  )}
</div>

            <div className="mb-3">
  <h2 className="text-lg font-black text-white">
    Watchlist
  </h2>
</div>
<input
  type="text"
  placeholder="Search assets..."
  value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
  className="mb-3 w-full rounded-xl border border-zinc-700 bg-[#0f172a] px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500"
/>

            <div className="space-y-2.5 mt-2 flex-1 overflow-y-scroll scrollbar-hide pr-1">
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
}}
                  className={`w-full rounded-xl border border-zinc-800 bg-[#0f172a] p-3 text-left transition-all duration-200 hover:border-cyan-500/40 hover:bg-[#111827] ${
                    selectedCoin === coin.symbol
? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
: "border-zinc-800 bg-[#0f172a] hover:bg-[#111827]"
                  }`}
                >
<div className="flex items-start justify-between">
  <div>
    <p className="text-sm font-black tracking-wide text-white">
  {coin.symbol}
</p>
    <p className="text-xs text-zinc-500">{coin.name}</p>
  </div>

  <p className="text-xs font-bold text-zinc-300">
  {coin.price
  ? `$${coin.price.toLocaleString()}`
  : "Loading..."}
</p>
</div>


                </button>
              ))}

<div className="w-full rounded-xl border border-zinc-800 bg-[#0f172a] p-3 text-left transition-all duration-200 hover:border-cyan-500/40 hover:bg-[#111827]">
  <div className="flex h-[78px] items-center">
    <div>
      <p className="text-lg font-black tracking-wide text-white">
        More Coins
      </p>

      <p className="mt-1 text-sm text-zinc-500">
        Coming Soon
      </p>
    </div>
  </div>
</div>

<div className="relative">
{showGabyHint && (
  <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-bounce">
    <div className="relative rounded-xl border border-amber-400 bg-amber-400 px-4 py-3 text-sm font-black text-black shadow-[0_0_25px_rgba(251,191,36,0.35)]">
      Need help?

      <div className="absolute left-1/2 top-full -translate-x-1/2">
        <div className="h-0 w-0 border-l-[10px] border-r-[10px] border-t-[12px] border-l-transparent border-r-transparent border-t-amber-400" />
      </div>
    </div>
  </div>
)}

  <button
    onClick={() => setShowSimulatorGaby(true)}
    className="w-full rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-4 text-base font-black text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.18)] transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:shadow-[0_0_35px_rgba(34,211,238,0.28)]"
  >
    Ask Gaby
  </button>
</div>
            </div>
          </div>

            <div
  className={`bg-[#0f172a] border border-zinc-700 rounded-2xl p-5 h-[760px] flex flex-col overflow-hidden ${
    tourStep === 2
      ? "relative z-50 ring-4 ring-cyan-400 shadow-[0_0_45px_rgba(34,211,238,0.45)]"
      : ""
  }`}
>

<div className="mb-6 border-b border-zinc-800 pb-4">
  <div className="flex items-end gap-4">
    <h2 className="text-3xl font-black text-white">
      {selectedCoin}/USD
    </h2>

    <p className="text-3xl font-black text-white">
      {currentPrice
  ? `$${currentPrice.toLocaleString()}`
  : "Loading..."}
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
  {["1M", "5M", "15M", "1H", "4H", "1D"].map(
    (timeframe) => (
     <button
  key={timeframe}
  onClick={() => {
  setSelectedTimeframe(timeframe);
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
  <div className="flex flex-1 items-center justify-between">
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

  <button
    onClick={() =>
      chartInstanceRef.current?.timeScale().scrollToPosition(0, false)
    }
    className="ml-4 rounded-md border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-black text-cyan-400 hover:bg-cyan-500/20"
  >
    Live
  </button>
</div>
</div>
</div>

            <div className="space-y-2 xl:col-span-1">

          
              <div
  className={`bg-[#111827] border border-zinc-700 rounded-2xl p-4 ${
    tourStep === 5
      ? "relative z-50 ring-4 ring-cyan-400 shadow-[0_0_45px_rgba(34,211,238,0.45)]"
      : ""
  }`}
>
  <h2 className="text-lg font-black text-white mb-3">
    Account Summary
  </h2>

  <div className="space-y-2 text-sm">
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

  <div
  className={`bg-[#111827] border border-zinc-700 rounded-2xl p-4 h-fit ${
    tourStep === 3
      ? "relative z-50 ring-4 ring-cyan-400 shadow-[0_0_45px_rgba(34,211,238,0.45)]"
      : ""
  }`}
>
  
<div className="grid grid-cols-3 gap-3">

  <div className="col-span-2">
    <input
      type="number"
      value={tradeAmount}
      placeholder="Enter amount"
      onChange={(e) => {
        const value = e.target.value;
        setTradeAmount(value === "" ? "" : Number(value));
      }}
      className="bg-[#0f172a] border border-zinc-700 text-white px-3 py-2.5 rounded-xl w-full text-center text-lg focus:outline-none focus:border-green-500"
    />
  </div>

  {marketMode === "FUTURES" && (
    <div className="relative">
      <button
        onClick={() => setShowLeverageMenu(!showLeverageMenu)}
        className="w-full rounded-xl border border-zinc-700 bg-[#0f172a] px-3 py-2.5 text-center font-bold text-cyan-400 hover:border-cyan-500"
      >
        {leverage}x ▼
      </button>

      {showLeverageMenu && (
        <div className="absolute left-0 top-full z-50 mt-2 h-64 w-full overflow-y-auto rounded-xl border border-zinc-700 bg-[#0f172a] scrollbar-hide">
          {Array.from({ length: 50 }, (_, i) => i + 1).map((lev) => (
            <button
              key={lev}
              onClick={() => {
                setLeverage(lev);
                setShowLeverageMenu(false);
              }}
              className={`block w-full px-3 py-2 text-center text-sm font-bold ${
                leverage === lev
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              {lev}x
            </button>
          ))}
        </div>
      )}
    </div>
  )}
</div>

<div className="mt-3 grid grid-cols-2 gap-2">
  <input
  type="number"
  placeholder="Take Profit"
  value={takeProfit}
  onChange={(e) => {
    const value = e.target.value;
    setTakeProfit(value === "" ? "" : Number(value));
  }}
  className="bg-[#0f172a] border border-zinc-700 text-white px-3 py-2.5 rounded-xl w-full text-center text-sm focus:outline-none focus:border-green-500"
/>

 <input
  type="number"
  placeholder="Stop Loss"
  value={stopLoss}
  onChange={(e) => {
    const value = e.target.value;
    setStopLoss(value === "" ? "" : Number(value));
  }}
  className="bg-[#0f172a] border border-zinc-700 text-white px-3 py-2.5 rounded-xl w-full text-center text-sm focus:outline-none focus:border-red-500"
/>
</div>


<div className="mt-3">
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
      className="bg-[#0f172a] border border-zinc-700 text-white px-3 py-2.5 rounded-xl w-full text-center text-base focus:outline-none focus:border-cyan-500"
    />
  </div>
)}
  <div className="mt-3 grid grid-cols-4 gap-2">
    {[100, 500, 1000].map((amount) => (
      <button
        key={amount}
        onClick={() => setTradeAmount(amount)}
        className="flex h-10 items-center justify-center rounded-lg border border-zinc-700 bg-black text-sm font-bold text-zinc-300 transition-all hover:border-green-500 hover:text-green-400"
      >
        ${amount}
      </button>
    ))}

    <button
      onClick={() => setTradeAmount(Number(balance.toFixed(0)))}
      className="flex h-10 items-center justify-center rounded-lg bg-orange-500 text-sm font-bold text-white hover:bg-orange-600"
    >
      MAX
    </button>
  </div>
<div className="mt-3 rounded-xl border border-zinc-700 bg-[#0f172a] p-2.5">
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
      ${(
  ((Number(tradeAmount) || 0) *
    (marketMode === "FUTURES" ? leverage : 1) *
    feeRate)
).toFixed(2)}
    </span>
  </div>
</div>
  <div className="mt-3 grid grid-cols-2 gap-2">
    <button
  onClick={() => {
  if (marketMode === "FUTURES") {
    setPositionType("LONG");
openFuturesPosition("LONG");
  } else {
    buyCoin();
  }
}}
      className="rounded-xl bg-green-500 px-5 py-2 text-sm font-black text-black transition-all hover:scale-[1.02] hover:bg-green-400"
    >
      {marketMode === "FUTURES" ? "LONG" : "BUY"}
    </button>

    <button
      onClick={() => {
  if (marketMode === "FUTURES") {
    setPositionType("SHORT");
openFuturesPosition("SHORT");
  } else {
    sellCoin();
  }
}}
      className="rounded-xl bg-red-500 px-5 py-2 text-sm font-black text-white transition-all hover:scale-[1.02] hover:bg-red-400"
    >
      {marketMode === "FUTURES" ? "SHORT" : "SELL"}
    </button>
  </div>

  <div className="mt-4 flex justify-center">
<button
  onClick={() => setShowResetModal(true)}
  className="bg-zinc-800 text-zinc-300 px-5 py-2 rounded-xl text-sm font-bold border border-zinc-700 transition-all hover:border-red-500 hover:text-red-400"
>
  Reset Practice Account
</button>
  </div>

  {message && (
    <p className="mt-3 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-center text-xs font-bold text-cyan-400">
      {message}
    </p>
  )}
</div> 
      </div>
      </div>
    <div className="mt-2 page-container">
  <div
  className={`max-w-[calc(100%-296px)] bg-[#111827] border border-zinc-700 rounded-2xl p-3 min-h-[100px] ${
    tourStep === 4
      ? "relative z-50 ring-4 ring-cyan-400 shadow-[0_0_45px_rgba(34,211,238,0.45)]"
      : ""
  }`}
>

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
<button
  onClick={() => setActiveBottomTab("ORDERS")}
  className={`px-6 py-3 rounded-xl font-bold transition-all ${
    activeBottomTab === "ORDERS"
      ? "bg-cyan-500 text-black"
      : "bg-[#18181b] text-zinc-400 border border-white/10"
  }`}
>
  {marketMode === "FUTURES" ? "Futures Orders" : "Spot Orders"}
</button>
      </div>

      
    </div>

    {activeBottomTab === "POSITIONS" && (
      <div className="space-y-4 max-h-[460px] xl:max-h-[520px] overflow-y-scroll scrollbar-hide pr-2">
{marketMode === "FUTURES" &&
  futuresPositions.map((position, index) => (
    <div
      key={index}
      className="bg-[#0f172a] border border-cyan-500/30 rounded-xl p-3 mb-3"
    >
  <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-9 gap-3 items-center">
  <div>
    <p className="text-cyan-400 text-lg font-bold">
      {position.coin}
    </p>

    <p className={`text-sm mt-1 font-bold ${
      position.side === "LONG" ? "text-green-400" : "text-red-400"
    }`}>
      {position.side}
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-xs">Entry</p>
    <p className="text-sm font-bold text-white">
      ${position.entryPrice.toFixed(2)}
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-xs">Current</p>
    <p className="text-sm font-bold text-white">
      {prices[position.coin as AssetSymbol]
  ? `$${prices[position.coin as AssetSymbol]!.toFixed(2)}`
  : "Loading..."}
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-xs">Position Size</p>
    <p className="text-sm font-bold text-white">
      ${(position.margin * position.leverage).toFixed(2)}
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-xs">Leverage</p>
    <p className="text-sm font-bold text-white">
      {position.leverage}x
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-xs">Liquidation</p>
    <p className="text-sm font-bold text-red-400">
      ${position.liquidationPrice.toFixed(2)}
    </p>
  </div>

  <div>
<p className="text-gray-400 text-xs font-bold uppercase">Risk</p>

{(() => {
  const current = prices[position.coin as AssetSymbol];

  if (!current) {
    return (
      <p className="text-sm font-bold text-zinc-500">
        Loading price...
      </p>
    );
  }

  const tpDistance =
    takeProfit !== ""
      ? Math.abs(Number(takeProfit) - current)
      : 0;

  const slDistance =
    stopLoss !== ""
      ? Math.abs(current - Number(stopLoss))
      : 0;

  const riskReward =
    takeProfit !== "" && stopLoss !== "" && slDistance > 0
      ? tpDistance / slDistance
      : 0;

  return (
    <>
      <p className="text-sm font-bold text-green-400">
        TP: {takeProfit !== "" ? `$${tpDistance.toFixed(2)} away` : "Not set"}
      </p>

      <p className="mt-1 text-sm font-bold text-red-400">
        SL: {stopLoss !== "" ? `$${slDistance.toFixed(2)} away` : "Not set"}
      </p>

      <p className="mt-1 text-sm font-bold text-cyan-400">
        R/R: {riskReward > 0 ? riskReward.toFixed(2) : "N/A"}
      </p>
    </>
  );
})()}
</div>

<div>
  <p className="text-gray-400 text-xs font-bold uppercase">Open P/L</p>

  {(() => {
    const current = prices[position.coin as AssetSymbol];

    if (!current) {
      return (
        <p className="text-sm font-bold text-zinc-500">
          Loading...
        </p>
      );
    }

    const pnl =
      position.side === "LONG"
        ? (current - position.entryPrice) * position.quantity
        : (position.entryPrice - current) * position.quantity;

    return (
      <p
        className={`text-base font-bold ${
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

      if (!current) {
        setMessage("Loading real market price...");
        return;
      }

const pnl =
  position.side === "LONG"
    ? (current - position.entryPrice) * position.quantity
    : (position.entryPrice - current) * position.quantity;

const exitFee =
  (position.positionSize || position.margin * position.leverage) * feeRate;

const netPnl =
  pnl - (position.entryFee || 0) - exitFee;

setBalance((prev) => prev + position.margin + netPnl);

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
    pnl: netPnl,
grossPnl: pnl,
entryFee: position.entryFee || 0,
exitFee,
totalFees: (position.entryFee || 0) + exitFee,
    status: "CLOSED",
    positionSize: position.positionSize || position.margin * position.leverage,
    balanceAtEntry: position.balanceAtEntry || startingBalance,
    stopLoss: position.stopLoss,
    takeProfit: position.takeProfit,
    closedReason: "MANUAL",
    time: new Date().toLocaleTimeString(),
  },
  ...prev,
]);
      setMessage(
        `${position.side} ${position.coin} closed. P/L after fees: $${netPnl.toFixed(2)}`
      );
    }}
    className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-red-400"
  >
    Close
  </button>
</div>
</div>
    </div>
))}

{marketMode === "FUTURES" && futuresPositions.length === 0 && (
  <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-10 text-center">
    <p className="text-2xl font-bold text-zinc-300">
      No Futures Positions
    </p>

    <p className="text-zinc-500 mt-2">
      Your open futures trades will appear here.
    </p>
  </div>
)}

      {marketMode === "SPOT" &&
  Object.entries(positions)
    .filter(([_, qty]) => Number(qty) > 0)
    .map(([coin, qty]) => {
            const currentPrice =
              prices[coin as keyof typeof prices];
              if (!currentPrice) return null;

            const avgPrice =
              averagePrices[coin as keyof typeof averagePrices];

            const marketValue =
              Number(qty) * currentPrice;

            const pnl =
              marketValue - Number(qty) * avgPrice;

            return (
<div
  key={coin}
  className="bg-[#0f172a] border border-cyan-500/30 rounded-xl p-3 hover:border-cyan-500/40 transition-all duration-300"
>
   <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 items-center">
  <div>
    <p className="text-cyan-400 text-lg font-bold">
      {coin}
    </p>

    <p className="text-gray-400 text-xs mt-1">
      Position
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-xs">
      Quantity
    </p>

    <p className="text-sm font-bold text-white">
      {Number(qty).toFixed(6)}
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-xs">
      Market Price
    </p>

    <p className="text-sm font-bold text-white">
      ${currentPrice.toLocaleString()}
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-xs">
      Market Value
    </p>

    <p className="text-sm font-bold text-white">
      ${marketValue.toFixed(2)}
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-xs">
      Avg Cost
    </p>

    <p className="text-sm font-bold text-white">
      ${avgPrice.toFixed(2)}
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-xs">
      Unrealized P/L
    </p>

    <p
      className={`text-base font-bold ${
        pnl >= 0 ? "text-green-400" : "text-red-400"
      }`}
    >
      ${pnl.toFixed(2)}
    </p>
  </div>
  <div>
  <p className="text-gray-400 text-xs">
    TP / SL
  </p>

{(() => {
  const risk = spotRiskSettings[coin as AssetSymbol];

  return (
    <>
      <p className="text-sm font-bold text-green-400">
        TP: {risk?.takeProfit != null ? `$${risk.takeProfit.toFixed(2)}` : "Not set"}
      </p>

      <p className="mt-1 text-sm font-bold text-red-400">
        SL: {risk?.stopLoss != null ? `$${risk.stopLoss.toFixed(2)}` : "Not set"}
      </p>
    </>
  );
})()}
</div>

  <div className="flex justify-end">
    <button
      onClick={() => {
const sellValue = Number(qty) * currentPrice;

const spotExitFee = sellValue * feeRate;

const netSellValue = sellValue - spotExitFee;

const grossSpotPnl =
  sellValue - Number(qty) * averagePrices[coin as AssetSymbol];

const spotEntryFeePaid =
  trades.find(
    (trade) =>
      trade.type === "BUY" &&
      trade.coin === (coin as AssetSymbol)
  )?.entryFee || 0;

const closePnl =
  grossSpotPnl - spotEntryFeePaid - spotExitFee;

setBalance((prev) => prev + netSellValue);

        setPositions((prev) => ({
          ...prev,
          [coin]: 0,
        }));

        setAveragePrices((prev) => ({
          ...prev,
          [coin]: 0,
        }));

if (user) {
  setDoc(doc(db, "portfolios", user.id), {
    userName: user.firstName || "Trader",
    balance: balance + netSellValue,
    positions: {
      ...positions,
      [coin]: 0,
    },
    averagePrices: {
      ...averagePrices,
      [coin]: 0,
    },
    updated: new Date(),
  });
}

setTrades((prev) => [
  {
    type: "SELL",
    coin: coin as AssetSymbol,
    amount: sellValue,
    price: currentPrice,

    pnl: closePnl,

    grossPnl: grossSpotPnl,
    entryFee: spotEntryFeePaid,
    exitFee: spotExitFee,
    totalFees: spotEntryFeePaid + spotExitFee,

    stopLoss:
      stopLoss !== ""
        ? Number(stopLoss)
        : null,

    takeProfit:
      takeProfit !== ""
        ? Number(takeProfit)
        : null,

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

  pnl: closePnl,
grossPnl: grossSpotPnl,
entryFee: spotEntryFeePaid,
exitFee: spotExitFee,
totalFees: spotEntryFeePaid + spotExitFee,

stopLoss:
  stopLoss !== ""
    ? Number(stopLoss)
    : null,

takeProfit:
  takeProfit !== ""
    ? Number(takeProfit)
    : null,

  created: new Date(),
});
}
      }}
      className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-red-400"
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
  className="bg-[#0f172a] border border-cyan-500/30 rounded-xl p-3 hover:border-cyan-500/40 transition-all duration-300"
>
  <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 items-center">
    <div>
      <p
        className={`text-base font-black ${
          trade.side === "LONG" ? "text-green-400" : "text-red-400"
        }`}
      >
        {trade.side}
      </p>

      <p className="text-xs text-zinc-500">
        {trade.coin}
      </p>
    </div>

    <div>
      <p className="text-zinc-500 text-xs">Margin</p>
      <p className="text-sm font-bold text-white">
        ${trade.margin}
      </p>
    </div>

    <div>
      <p className="text-zinc-500 text-xs">Entry</p>
      <p className="text-sm font-bold text-white">
        ${trade.entryPrice.toFixed(2)}
      </p>
    </div>

    <div>
      <p className="text-zinc-500 text-xs">Leverage</p>
      <p className="text-sm font-bold text-white">
        {trade.leverage}x
      </p>
    </div>

    <div>
      <p className="text-zinc-500 text-xs">Liquidation</p>
      <p className="text-sm font-bold text-red-400">
        ${trade.liquidationPrice.toFixed(2)}
      </p>
    </div>

<div>
  <p className="text-zinc-500 text-xs">P/L</p>

  {trade.pnl !== undefined && trade.pnl !== null ? (
    <>
      <p
        className={`text-sm font-bold ${
          trade.pnl >= 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        ${Number(trade.pnl).toFixed(2)}
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Gross: ${Number(trade.grossPnl || 0).toFixed(2)}
      </p>

      <p className="text-xs text-zinc-500">
        Fees: ${Number(trade.totalFees || 0).toFixed(2)}
      </p>
    </>
  ) : (
    <p className="text-sm font-bold text-zinc-500">
      Open
    </p>
  )}
</div>

    <div>
      <p className="text-zinc-500 text-xs">Status</p>
      <p className="text-sm font-bold text-cyan-400">
        {trade.status || "OPENED"}
      </p>
    </div>

    <div className="text-right">
      <p className="text-zinc-500 text-xs">Time</p>
      <p className="text-sm font-bold text-white">
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
  className="bg-[#0f172a] border border-cyan-500/30 rounded-xl p-3 hover:border-cyan-500/40 transition-all duration-300"
>
<div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 items-center">

  <div>
    <p
      className={`text-base font-black ${
        trade.type === "BUY"
          ? "text-green-400"
          : "text-red-400"
      }`}
    >
      {trade.type}
    </p>

    <p className="text-xs text-zinc-500">
      {trade.coin}
    </p>
  </div>

  <div>
    <p className="text-zinc-500 text-xs">Amount</p>

    <p className="text-sm font-bold text-white">
      ${trade.amount.toFixed(2)}
    </p>
  </div>

  <div>
    <p className="text-zinc-500 text-xs">Price</p>

    <p className="text-sm font-bold text-white">
      ${trade.price.toFixed(2)}
    </p>
  </div>

  <div>
    <p className="text-zinc-500 text-xs">Value</p>

    <p className="text-sm font-bold text-cyan-400">
      ${trade.amount.toFixed(2)}
    </p>
  </div>

<div>
  <p className="text-zinc-500 text-xs">P/L</p>

  {trade.type === "BUY" ? (
    <p className="text-sm font-bold text-zinc-500">
      Open
    </p>
  ) : (trade as any).pnl !== undefined &&
    (trade as any).pnl !== null ? (
    <>
      <p
        className={`text-sm font-bold ${
          (trade as any).pnl >= 0
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        ${Number((trade as any).pnl).toFixed(2)}
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Gross: ${Number((trade as any).grossPnl || 0).toFixed(2)}
      </p>

      <p className="text-xs text-zinc-500">
        Fees: ${Number((trade as any).totalFees || 0).toFixed(2)}
      </p>
    </>
  ) : (
    <p className="text-sm font-bold text-zinc-500">
      N/A
    </p>
  )}
</div>

  <div>
    <p className="text-zinc-500 text-xs">Status</p>

<p
  className={`text-sm font-bold ${
    trade.type === "BUY"
      ? "text-green-400"
      : "text-red-400"
  }`}
>
  {trade.type === "BUY" ? "OPEN" : "CLOSE"}
</p>
  </div>

  <div>
    <p className="text-zinc-500 text-xs">Market</p>

    <p className="text-sm font-bold text-white">
      Spot
    </p>
  </div>

  <div className="text-right">
    <p className="text-zinc-500 text-xs">Time</p>

    <p className="text-sm font-bold text-white">
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

    {!activePendingOrder ? (
      <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-10 text-center">
        <p className="text-2xl font-bold text-zinc-300">
          No Open Orders
        </p>

        <p className="text-zinc-500 mt-2">
          Pending {marketMode === "FUTURES" ? "futures" : "spot"} limit orders will appear here.
        </p>
      </div>
    ) : (
      <div className="bg-[#0f172a] border border-cyan-500/30 rounded-xl p-3">

<div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 items-center">

  <div>
    <p className="text-base font-black text-cyan-400">
      LIMIT
    </p>

    <p className="text-xs text-zinc-500">
      {activePendingOrder.coin}
    </p>
  </div>

  <div>
    <p className="text-zinc-500 text-xs">Side</p>

    <p className="text-sm font-bold text-white">
      {activePendingOrder.side}
    </p>
  </div>

  <div>
    <p className="text-zinc-500 text-xs">Limit Price</p>

    <p className="text-sm font-bold text-cyan-400">
      ${activePendingOrder.limitPrice.toLocaleString()}
    </p>
  </div>

  <div>
    <p className="text-zinc-500 text-xs">Amount</p>

    <p className="text-sm font-bold text-white">
      ${activePendingOrder.amount}
    </p>
  </div>

  <div>
    <p className="text-zinc-500 text-xs">Market</p>

    <p className="text-sm font-bold text-white">
      {activePendingOrder.mode}
    </p>
  </div>

  <div>
    <p className="text-zinc-500 text-xs">Status</p>

    <p className="text-sm font-bold text-orange-400">
      Pending
    </p>
  </div>

  <div>
    <p className="text-zinc-500 text-xs">Waiting For</p>

    <p className="text-sm font-bold text-white">
      Fill
    </p>
  </div>

  <div className="flex justify-end">
<button
  onClick={() => {
    if (marketMode === "FUTURES") {
      setPendingFuturesLimitOrder(null);
    } else {
      setPendingLimitOrder(null);
    }

    setMessage("Limit order canceled.");
  }}
      className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400 transition-all hover:bg-red-500/20"
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

{showSimulatorGaby && (
  <>
<div
  onClick={() => setShowSimulatorGaby(false)}
  className="fixed inset-0 z-40 bg-black/10"
 />

    <div className="fixed bottom-[72px] left-[270px] z-50 w-[500px]">
      <button
        onClick={() => setShowSimulatorGaby(false)}
        className="mb-3 rounded-xl border border-zinc-700 bg-[#111827] px-4 py-2 text-sm font-bold text-zinc-300 hover:border-cyan-400 hover:text-white"
      >
        ✕ Close
      </button>

      <GabySimulatorCoach
        mode={marketMode}
        selectedCoin={selectedCoin}
        trades={trades}
        futuresHistory={futuresHistory}
        positions={positions}
        futuresPositions={futuresPositions}
        balance={balance}
        marginUsed={marginUsed}
          marketIntelligence={marketIntelligence}
  movingAverageAnalysis={movingAverageAnalysis}
  currentEntryQuality={currentEntryQuality}
      />
    </div>
  </>
)}

{tourStep !== null && (
  <>
    <div className="fixed inset-0 z-40 bg-black/10" />

    <div className="fixed left-[270px] top-[150px] z-50 w-[360px] rounded-2xl border border-cyan-500/30 bg-[#0f172a] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.6)]">
      <p className="text-sm font-black text-cyan-400">
        Simulator Tour
      </p>

<h3 className="mt-2 text-xl font-black text-white">
  {tourStep === 1
  ? "Watchlist"
  : tourStep === 2
  ? "Chart"
  : tourStep === 3
  ? "Order Entry"
  : tourStep === 4
  ? "Positions & History"
  : "Account Summary"}
</h3>

<p className="mt-3 text-sm leading-6 text-zinc-300">
{tourStep === 1
  ? "This is where you choose the crypto asset you want to practice with. Selecting a coin updates the chart, price, and order panel."
  : tourStep === 2
  ? "This is the chart. It uses real-time crypto market data, so you can study price movement, volume, trends, support, resistance, and practice reading market structure."
  : tourStep === 3
  ? "This is where you place practice trades. Set your amount, order type, take profit, stop loss, and use futures tools like leverage carefully."
  : tourStep === 4
  ? "This panel shows your open positions, trade history, and pending orders. Use it to review what happened after each practice trade."
  : "This shows your cash balance, portfolio value or futures equity, margin used, open profit or loss, and total return."}
</p>

      <div className="mt-5 flex justify-between">
        <button
          onClick={() => setTourStep(null)}
          className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-400 hover:text-white"
        >
          Close
        </button>

<button
  onClick={() => {
if (tourStep === 1) {
  setTourStep(2);
} else if (tourStep === 2) {
  setTourStep(3);
} else if (tourStep === 3) {
  setTourStep(4);
} else if (tourStep === 4) {
  setTourStep(5);
} else {
  setTourStep(null);
}
}}
          className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-black text-black hover:bg-cyan-400"
        >
          {tourStep === 5 ? "Done" : "Next"}
        </button>
      </div>
    </div>
  </>
)}

      </main>

    </>
  );
}