"use client";

import Navbar from "../components/Navbar";
import GabySimulatorCoach from "../components/GabySimulatorCoach";
import WatchlistPanel from "./components/WatchlistPanel";
import ChartWorkspace from "./components/ChartWorkspace";
import TradingPanel from "./components/TradingPanel";
import AccountSummaryCard from "./components/AccountSummaryCard";
import PortfolioPanel from "./components/PortfolioPanel";
import PortfolioTabs from "./components/PortfolioTabs";
import PortfolioPositions from "./components/PortfolioPositions";
import PortfolioHistory from "./components/PortfolioHistory";
import PortfolioOrders from "./components/PortfolioOrders";
import { WATCHLIST } from "./data/watchlist";
import { buildTrendAnalysis } from "@/lib/traderDevelopment/trendAnalysis";
import { buildRiskAnalysis } from "@/lib/traderDevelopment/riskAnalysis";
import { buildEntryQualityAnalysis } from "@/lib/traderDevelopment/entryQualityAnalysis";
import { buildExitManagementAnalysis } from "@/lib/traderDevelopment/exitManagementAnalysis";





import { useClerk, useUser } from "@clerk/nextjs";
import { useEffect, useMemo, useRef, useState } from "react";
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
  buildMarketAnalysisSummary,
} from "@/lib/gabyMarketIntelligence";

import { reviewTrade } from "@/lib/tradeReview/reviewTrade";

import {
  detectPatterns,
  type DetectedPattern,
} from "@/lib/patternRecognition";

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

import type {
  PricePoint,
  AssetSymbol,
  Trade,
  FuturesCloseReason,
} from "./types/simulator";

import type { GabyChartHighlight } from "./types/gabyChartHighlight";

const startingBalance = 10000;
const feeRate = 0.006;

const COINBASE_PRODUCT_IDS: Record<AssetSymbol, string> = {
  BTC: "BTC-USD",
  ETH: "ETH-USD",
  SOL: "SOL-USD",
  XRP: "XRP-USD",
  DOGE: "DOGE-USD",
  ADA: "ADA-USD",
  BNB: "BNB-USD",
  LINK: "LINK-USD",
  AVAX: "AVAX-USD",
  SUI: "SUI-USD",
  HBAR: "HBAR-USD",
  LTC: "LTC-USD",
  BCH: "BCH-USD",
  DOT: "DOT-USD",
  UNI: "UNI-USD",
  AAVE: "AAVE-USD",
  ATOM: "ATOM-USD",
  NEAR: "NEAR-USD",
  SHIB: "SHIB-USD",
  PEPE: "PEPE-USD",
};

const emptyPositions: Record<AssetSymbol, number> = {
  BTC: 0,
  ETH: 0,
  SOL: 0,
  XRP: 0,
  DOGE: 0,

  ADA: 0,
  BNB: 0,
  LINK: 0,
  AVAX: 0,
  SUI: 0,
  HBAR: 0,
  LTC: 0,
  BCH: 0,
  DOT: 0,
  UNI: 0,
  AAVE: 0,
  ATOM: 0,
  NEAR: 0,
  SHIB: 0,
  PEPE: 0,
};


export default function SimulatorPage() {
  const { user, isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const [isPaid, setIsPaid] = useState(false);
  const [subscriptionLoaded, setSubscriptionLoaded] = useState(false);

useEffect(() => {
  if (!isSignedIn) {
    setIsPaid(false);
    setSubscriptionLoaded(true);
    return;
  }

  setSubscriptionLoaded(false);

  fetch("/api/subscription/status")
    .then((res) => res.json())
    .then((data) => {
      setIsPaid(Boolean(data.isPaid));
      setSubscriptionLoaded(true);
    })
    .catch(() => {
      setIsPaid(false);
      setSubscriptionLoaded(true);
    });
}, [isSignedIn]);

function requireSignIn() {
  if (user) {
    return true;
  }

  const currentPage =
    window.location.pathname +
    window.location.search +
    window.location.hash;

  openSignIn({
    forceRedirectUrl: currentPage,
  });

  return false;
}


useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  const [marketMode, setMarketMode] = useState<"SPOT" | "FUTURES">("SPOT");
  const [showSimulatorGaby, setShowSimulatorGaby] = useState(false);
  const [autoGabyQuestion, setAutoGabyQuestion] = useState<string | null>(null);
  const [showGabyHint, setShowGabyHint] = useState(true);
  const [gabyChartHighlights, setGabyChartHighlights] =
  useState<GabyChartHighlight[]>([]);
  


type GabyAnnotationKey =
  | "SUPPORT"
  | "RESISTANCE";

const [gabyAnnotations, setGabyAnnotations] =
  useState<GabyAnnotationKey[]>([]);

 const [pinnedGabyAnnotations, setPinnedGabyAnnotations] =
  useState<GabyAnnotationKey[]>([]); 

const [pinnedLoaded, setPinnedLoaded] =
  useState(false);

useEffect(() => {
  const saved = localStorage.getItem(
    "tradenestx-pinned-gaby-annotations"
  );

  if (saved) {
    const parsed = JSON.parse(saved).filter(
      (x: string) =>
        x === "SUPPORT" || x === "RESISTANCE"
    );

    setPinnedGabyAnnotations(parsed);
    setGabyAnnotations(parsed);
  }

  setPinnedLoaded(true);
}, []);

useEffect(() => {
  if (!pinnedLoaded) return;

  localStorage.setItem(
    "tradenestx-pinned-gaby-annotations",
    JSON.stringify(pinnedGabyAnnotations)
  );
}, [pinnedGabyAnnotations, pinnedLoaded]);

  const [gabyAnnotationCount, setGabyAnnotationCount] =
  useState(1);

  const [tourStep, setTourStep] = useState<number | null>(null);
  const [showMarketMenu, setShowMarketMenu] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<AssetSymbol>("BTC");
  const [mobileView, setMobileView] = useState<"WATCHLIST" | "TRADE" | "ORDER">("WATCHLIST");
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M");


const [patternRecognitionEnabled, setPatternRecognitionEnabled] =
  useState(false);

const [detectedPatterns, setDetectedPatterns] =
  useState<DetectedPattern[]>([]);

const strongestPattern =
  detectedPatterns.length > 0
    ? detectedPatterns[0]
    : null;

  const [indicatorPanel, setIndicatorPanel] =
  useState<"VOLUME" | "RSI">("VOLUME");
  const [activeBottomTab, setActiveBottomTab] = useState<"POSITIONS" | "HISTORY" | "ORDERS">("POSITIONS");
const [selectedCandleDate, setSelectedCandleDate] = useState<string>("Hover a candle");
  const [searchTerm, setSearchTerm] = useState("");
const [prices, setPrices] = useState<
  Partial<Record<AssetSymbol, number>>
>({});
const [previousPrices, setPreviousPrices] = useState<
  Partial<Record<AssetSymbol, number>>
>({});
  const [history, setHistory] = useState<PricePoint[]>([]);
  const [candlesReadyFor, setCandlesReadyFor] = useState("");
const [timeframeStructures, setTimeframeStructures] =
  useState<Record<string, any>>({});
const marketIntelligence = useMemo(
  () =>
    history.length > 20
      ? getMarketIntelligence(history)
      : null,
  [history]
);

useEffect(() => {
  const highlights: GabyChartHighlight[] = [];

  const supports =
    marketIntelligence?.supportLevels?.slice(
      0,
      gabyAnnotationCount
    ) ?? [];

  const resistances =
    marketIntelligence?.resistanceLevels?.slice(
      0,
      gabyAnnotationCount
    ) ?? [];

  if (gabyAnnotations.includes("SUPPORT")) {
    supports.forEach((zone: any, index: number) => {
      highlights.push({
        id: `support-${selectedCoin}-${selectedTimeframe}-${index}`,
        type: "SUPPORT",
        low: zone.low,
        high: zone.high,
      });
    });
  }

  if (gabyAnnotations.includes("RESISTANCE")) {
    resistances.forEach((zone: any, index: number) => {
      highlights.push({
        id: `resistance-${selectedCoin}-${selectedTimeframe}-${index}`,
        type: "RESISTANCE",
        low: zone.low,
        high: zone.high,
      });
    });
  }

  setGabyChartHighlights(highlights);
}, [
  gabyAnnotations,
  gabyAnnotationCount,
  marketIntelligence?.supportLevels,
  marketIntelligence?.resistanceLevels,
  selectedCoin,
  selectedTimeframe,
]);

const marketAnalysisSummary =
  marketIntelligence
    ? buildMarketAnalysisSummary(
        marketIntelligence,
        selectedTimeframe,
        selectedCoin
      )
    : "";

const multiTimeframeAnalysis =
  getMultiTimeframeAnalysis(
    timeframeStructures,
    selectedTimeframe
  );

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

const [spotPositionFacts, setSpotPositionFacts] =
  useState<
    Partial<
      Record<
        AssetSymbol,
        {
          entryPrice: number;
          breakEvenPrice: number;
          requiredPriceMove: number;
          requiredMovePercent: number;
          entryFee: number;
          estimatedExitFee: number;
          estimatedRoundTripFees: number;
        }
      >
    >
  >({});

// ADD EVERYTHING BELOW
const [spotPositionManagement, setSpotPositionManagement] =
  useState<
    Partial<
      Record<
        AssetSymbol,
        {
          openedAt: string;

          highestUnrealizedPnl: number;
          lowestUnrealizedPnl: number;

          highestUnrealizedPercent: number;
          lowestUnrealizedPercent: number;
        }
      >
    >
  >({});
// STOP ADDING HERE

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
    if (!user || !subscriptionLoaded || !isPaid) return;

    const snap = await getDoc(doc(db, "portfolios", user.id));
    if (!snap.exists()) return;

    const data = snap.data();
    if (data.balance) setBalance(data.balance);
    if (data.positions) setPositions(data.positions);
    if (data.averagePrices) setAveragePrices(data.averagePrices);
  }

  loadPortfolio();
}, [user, subscriptionLoaded, isPaid]);

useEffect(() => {
  async function loadTrades() {
    if (!user || !subscriptionLoaded || !isPaid) return;

    const snap = await getDocs(
      query(collection(db, "trades"), where("userId", "==", user.id))
    );

    const loadedTrades = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setTrades((prev) => {
      const merged = [...prev];

      loadedTrades.forEach((loaded: any) => {
        const exists = merged.some(
          (trade: any) =>
            (trade.tradeId &&
              loaded.tradeId &&
              trade.tradeId === loaded.tradeId) ||
            (trade.snapshotId &&
              loaded.snapshotId &&
              trade.snapshotId === loaded.snapshotId)
        );

        if (!exists) merged.push(loaded as any);
      });

      return merged;
    });
  }

  loadTrades();
}, [user, subscriptionLoaded, isPaid]);

useEffect(() => {
  async function loadTradeReviews() {
    if (!user || !subscriptionLoaded || !isPaid) return;

    const snap = await getDocs(
      query(collection(db, "tradeReviews"), where("userId", "==", user.id))
    );

    setTradeReviews(
      snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as any[]
    );
  }

  loadTradeReviews();
}, [user, subscriptionLoaded, isPaid]);

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

const [futuresPositionManagement, setFuturesPositionManagement] =
  useState<
    Record<
      string,
{
  openedAt: string;

  highestUnrealizedPnl: number;
  lowestUnrealizedPnl: number;

  highestUnrealizedPercent: number;
  lowestUnrealizedPercent: number;

  maintenanceMargin?: number;
  marginBalance?: number;
  marginRatio?: number;

  marginHealth?: number;

  marginStatus?:
    | "SAFE"
    | "CAUTION"
    | "MARGIN_CALL"
    | "LIQUIDATION_DANGER";
}
    >
  >({});

const [futuresHistory, setFuturesHistory] = useState<any[]>([]);
const [tradeReviews, setTradeReviews] = useState<any[]>([]);

const normalizedTradeReviews = useMemo(() => {
  return (tradeReviews || []).map((item) => {
    const savedReview =
      item?.review ??
      item?.automaticReview ??
      item;

    return {
      ...savedReview,

      mode:
        item?.mode ??
        savedReview?.mode ??
        null,

      coin:
        item?.coin ??
        savedReview?.coin ??
        null,

      leverage:
        item?.leverage ??
        savedReview?.leverage ??
        1,

      margin:
        item?.margin ??
        savedReview?.margin ??
        0,

      positionSize:
        item?.positionSize ??
        savedReview?.positionSize ??
        0,

      balanceAtEntry:
        item?.balanceAtEntry ??
        savedReview?.balanceAtEntry ??
        savedReview?.tradeContext?.account?.balanceAtEntry ??
        0,

      amount:
        item?.amount ??
        savedReview?.amount ??
        0,

      tradeContext:
        item?.tradeContext ??
        savedReview?.tradeContext ??
        null,

      managementReview:
        savedReview?.management ??
        savedReview?.managementReview ??
        null,
    };
  });
}, [tradeReviews]);

const traderDevelopmentEngines = useMemo(() => ({
  trendBias: buildTrendAnalysis(normalizedTradeReviews),
  riskAllocation: buildRiskAnalysis(normalizedTradeReviews),
  entryQuality: buildEntryQualityAnalysis(normalizedTradeReviews),
  exitManagement: buildExitManagementAnalysis(normalizedTradeReviews),
}), [normalizedTradeReviews]);

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
  if (!subscriptionLoaded) return;

  if (!isPaid) {
    localStorage.removeItem("tradenestx-simulator-session");
    setSessionLoaded(true);
    setSimulatorReady(true);
    return;
  }

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
  if (data.spotPositionManagement) setSpotPositionManagement(data.spotPositionManagement);
  if (data.trades) setTrades(data.trades);
  if (data.marginUsed !== undefined) setMarginUsed(data.marginUsed);
  if (data.futuresPositions) setFuturesPositions(data.futuresPositions);
  if (data.futuresPositionManagement) setFuturesPositionManagement(data.futuresPositionManagement);
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
  if (data.selectedTimeframe) setSelectedTimeframe(data.selectedTimeframe);
  if (data.activeBottomTab) setActiveBottomTab(data.activeBottomTab);

  setSessionLoaded(true);
  setSimulatorReady(true);
}, [subscriptionLoaded, isPaid]);

useEffect(() => {
  if (!sessionLoaded || !subscriptionLoaded || !isPaid) return;

  localStorage.setItem(
    "tradenestx-simulator-session",
    JSON.stringify({
      balance,
positions,
averagePrices,
spotPositionManagement,
trades,
      marginUsed,
futuresPositions,
futuresPositionManagement,
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
selectedTimeframe,
activeBottomTab,
    })
  );
}, [
  balance,
positions,
averagePrices,
spotPositionManagement,
trades,
  marginUsed,
futuresPositions,
futuresPositionManagement,
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
selectedTimeframe,
activeBottomTab,
sessionLoaded,
subscriptionLoaded,
isPaid,
]);

useEffect(() => {
  setSpotPositionManagement((prev) => {
    let changed = false;
    const updated = { ...prev };

    Object.entries(positions).forEach(([coin, qty]) => {
      const asset = coin as AssetSymbol;
      const quantity = Number(qty);

      if (quantity <= 0) return;

      const current = prices[asset];
      const avgEntry = averagePrices[asset];
      const management = updated[asset];

      if (!current || !avgEntry || !management) return;

      const unrealizedPnl =
        (current - avgEntry) * quantity;

      const positionValue =
        avgEntry * quantity;

      const unrealizedPercent =
        positionValue > 0
          ? (unrealizedPnl / positionValue) * 100
          : 0;

      const nextHighestPnl = Math.max(
        management.highestUnrealizedPnl,
        unrealizedPnl
      );

      const nextLowestPnl = Math.min(
        management.lowestUnrealizedPnl,
        unrealizedPnl
      );

      const nextHighestPercent = Math.max(
        management.highestUnrealizedPercent,
        unrealizedPercent
      );

      const nextLowestPercent = Math.min(
        management.lowestUnrealizedPercent,
        unrealizedPercent
      );

      if (
        nextHighestPnl !== management.highestUnrealizedPnl ||
        nextLowestPnl !== management.lowestUnrealizedPnl ||
        nextHighestPercent !== management.highestUnrealizedPercent ||
        nextLowestPercent !== management.lowestUnrealizedPercent
      ) {
        changed = true;

        updated[asset] = {
          ...management,
          highestUnrealizedPnl: nextHighestPnl,
          lowestUnrealizedPnl: nextLowestPnl,
          highestUnrealizedPercent: nextHighestPercent,
          lowestUnrealizedPercent: nextLowestPercent,
        };
      }
    });

    return changed ? updated : prev;
  });
}, [prices, positions, averagePrices]);

useEffect(() => {
  setFuturesPositionManagement((prev) => {
    let changed = false;
    const updated = { ...prev };

    futuresPositions.forEach((position) => {
      if (!position.id) return;

      const current = prices[position.coin as AssetSymbol];
      const management = updated[position.id];

      if (!current || !management) return;

      const unrealizedPnl =
        position.side === "LONG"
          ? (current - position.entryPrice) * position.quantity
          : (position.entryPrice - current) * position.quantity;

const maintenanceMarginRate = 0.005;

const maintenanceMargin =
  position.positionSize * maintenanceMarginRate;

const marginBalance =
  position.margin + unrealizedPnl;

const marginRatio =
  marginBalance > 0
    ? (maintenanceMargin / marginBalance) * 100
    : 100;

const marginHealth =
  Math.max(
    0,
    Math.min(
      100,
      (marginBalance / position.margin) * 100
    )
  );

let marginStatus:
  | "SAFE"
  | "CAUTION"
  | "MARGIN_CALL"
  | "LIQUIDATION_DANGER" = "SAFE";

if (marginHealth <= 10) {
  marginStatus = "LIQUIDATION_DANGER";
} else if (marginHealth <= 25) {
  marginStatus = "MARGIN_CALL";
} else if (marginHealth <= 50) {
  marginStatus = "CAUTION";
}

      const unrealizedPercent =
        position.entryPrice > 0
          ? position.side === "LONG"
            ? ((current - position.entryPrice) / position.entryPrice) * 100
            : ((position.entryPrice - current) / position.entryPrice) * 100
          : 0;

      const nextHighestPnl = Math.max(
        management.highestUnrealizedPnl,
        unrealizedPnl
      );

      const nextLowestPnl = Math.min(
        management.lowestUnrealizedPnl,
        unrealizedPnl
      );

      const nextHighestPercent = Math.max(
        management.highestUnrealizedPercent,
        unrealizedPercent
      );

      const nextLowestPercent = Math.min(
        management.lowestUnrealizedPercent,
        unrealizedPercent
      );

      if (
        nextHighestPnl !== management.highestUnrealizedPnl ||
        nextLowestPnl !== management.lowestUnrealizedPnl ||
        nextHighestPercent !== management.highestUnrealizedPercent ||
        nextLowestPercent !== management.lowestUnrealizedPercent
      ) {
        changed = true;

updated[position.id] = {
  ...management,

  highestUnrealizedPnl: nextHighestPnl,
  lowestUnrealizedPnl: nextLowestPnl,

  highestUnrealizedPercent: nextHighestPercent,
  lowestUnrealizedPercent: nextLowestPercent,

maintenanceMargin,
marginBalance,
marginRatio,
marginHealth,
marginStatus,

};

      }
    });

    return changed ? updated : prev;
  });
}, [prices, futuresPositions]);

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

const estimatedLongLiquidation =
  currentPrice && marketMode === "FUTURES" && leverage > 1
    ? currentPrice * (1 - 1 / leverage + maintenanceBuffer)
    : null;

const estimatedShortLiquidation =
  currentPrice && marketMode === "FUTURES" && leverage > 1
    ? currentPrice * (1 + 1 / leverage - maintenanceBuffer)
    : null;

const chartRef = useRef<HTMLDivElement | null>(null);
const chartInstanceRef = useRef<any>(null);

const candleSeriesRef = useRef<any>(null);
const volumeSeriesRef = useRef<any>(null);
const rsiSeriesRef = useRef<any>(null);

const initialRangeKeyRef = useRef<string>("");

const indicatorPanelRef =
  useRef<"VOLUME" | "RSI">("VOLUME");

const ma7SeriesRef = useRef<any>(null);
const ma25SeriesRef = useRef<any>(null);
const ma99SeriesRef = useRef<any>(null);

const liquidationLinesRef = useRef<any[]>([]);
const entryLinesRef = useRef<any[]>([]);
const riskLinesRef = useRef<any[]>([]);
useEffect(() => {
  indicatorPanelRef.current = indicatorPanel;
}, [indicatorPanel]);

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



setPrices((prev) => {
  setPreviousPrices(prev);

  const updated = {
    ...prev,
    ...realPrices,
  } as Record<AssetSymbol, number>;



      setFuturesPositions((prevPositions) => {
        const liquidatedPositions =
          prevPositions.filter((position) => {
const current = updated[position.coin as AssetSymbol];

if (!current) return false;
if (!position.liquidationPrice) return false;

return position.side === "LONG"
  ? current <= position.liquidationPrice
  : current >= position.liquidationPrice;
          });

if (liquidatedPositions.length > 0) {
  setMessage(
    "A futures position was liquidated."
  );

  setTakeProfit("");
  setStopLoss("");

liquidatedPositions.forEach((position) => {
  const index = prevPositions.findIndex(
    (p) =>
      p.coin === position.coin &&
      p.entryPrice === position.entryPrice
  );

  closeFuturesPosition({
    position,
    exitPrice: updated[position.coin as AssetSymbol],
    reason: "LIQUIDATION",
    index,
  });
});

        }

        return prevPositions.filter((position) => {
const current = updated[position.coin as AssetSymbol];

if (!current) return true;
if (!position.liquidationPrice) return true;

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

const priceInterval = setInterval(updatePrices, 500);

    const clockInterval = setInterval(() => setNow(new Date()), 1000);

    return () => {
      clearInterval(priceInterval);
      clearInterval(clockInterval);
    };
  }, [selectedCoin, selectedTimeframe, candlesReadyFor]);


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
  Object.entries(positions).forEach(([coin, qty]) => {
    const asset = coin as AssetSymbol;

    if (Number(qty) <= 0) return;

    const current = prices[asset];
    const risk = spotRiskSettings[asset];

    if (!current || !risk) return;

    const takeProfitHit =
      risk.takeProfit != null &&
      current >= risk.takeProfit;

    const stopLossHit =
      risk.stopLoss != null &&
      current <= risk.stopLoss;

    if (!takeProfitHit && !stopLossHit) return;

    closeSpotPosition({
      coin: asset,
      quantity: Number(qty),
      currentPrice: current,
      reason: takeProfitHit ? "TP" : "SL",
    });

    setMessage(
      `${takeProfitHit ? "Take Profit" : "Stop Loss"} hit on ${asset}`
    );
  });
}, [prices, selectedCoin, positions, spotRiskSettings]);

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

closeFuturesPosition({
  position,
  exitPrice: current,
  reason: takeProfitHit ? "TP" : "SL",
  index,
});

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

initialRangeKeyRef.current = "";

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

  [selectedTimeframe]: {
    direction: intelligence.direction,

    structure: intelligence.structure,

    momentum:
      intelligence.momentumAnalysis?.momentum,

    conviction:
      intelligence.marketConviction,

    extension:
      intelligence.maStructureExtension,

    bouncePressure:
      intelligence.bouncePressure,

    momentumStage:
      intelligence.momentumStage,
  },
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
  if (!simulatorReady) {
    return;
  }

  const productId =
    COINBASE_PRODUCT_IDS[selectedCoin];

  if (!productId) {
    return;
  }

  const socket = new WebSocket(
    "wss://advanced-trade-ws.coinbase.com"
  );

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        type: "subscribe",
        product_ids: [productId],
        channel: "market_trades",
      })
    );

    socket.send(
      JSON.stringify({
        type: "subscribe",
        channel: "heartbeats",
      })
    );
  };

  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);

      if (message.channel !== "market_trades") {
        return;
      }

      const events = Array.isArray(message.events)
        ? message.events
        : [];

      const trades = events.flatMap(
        (marketEvent: any) =>
          Array.isArray(marketEvent.trades)
            ? marketEvent.trades
            : []
      );

      if (trades.length === 0) {
        return;
      }

      setHistory((previousHistory) => {
        if (previousHistory.length === 0) {
          return previousHistory;
        }

        const updatedHistory = [
          ...previousHistory,
        ];

        const timeframeMs =
          getTimeframeMs(selectedTimeframe);

        for (const trade of trades) {
          if (trade.product_id !== productId) {
            continue;
          }

          const tradePrice = Number(
            trade.price
          );

          const tradeSize = Number(
            trade.size
          );

          const tradeTime = new Date(
            trade.time
          ).getTime();

          if (
            !Number.isFinite(tradePrice) ||
            !Number.isFinite(tradeSize) ||
            !Number.isFinite(tradeTime)
          ) {
            continue;
          }

          const candleStart =
            Math.floor(
              tradeTime / timeframeMs
            ) * timeframeMs;

          const lastCandle =
            updatedHistory[
              updatedHistory.length - 1
            ];

          const lastCandleTime =
            Number(lastCandle.time);

          if (candleStart > lastCandleTime) {
            updatedHistory.push({
              time: String(candleStart),
              price: tradePrice,
              open: tradePrice,
              high: tradePrice,
              low: tradePrice,
              close: tradePrice,
              volume: tradeSize,
            });

            continue;
          }

          if (candleStart === lastCandleTime) {
            updatedHistory[
              updatedHistory.length - 1
            ] = {
              ...lastCandle,
              price: tradePrice,
              close: tradePrice,
              high: Math.max(
                lastCandle.high,
                tradePrice
              ),
              low: Math.min(
                lastCandle.low,
                tradePrice
              ),
              volume:
                Number(
                  lastCandle.volume ?? 0
                ) + tradeSize,
            };
          }
        }

        return updatedHistory;
      });

      const latestTrade =
        trades[trades.length - 1];

      const latestPrice = Number(
        latestTrade?.price
      );

      if (Number.isFinite(latestPrice)) {
        setPrices((previousPrices) => ({
          ...previousPrices,
          [selectedCoin]: latestPrice,
        }));
      }
    } catch (error) {
      console.error(
        "Coinbase WebSocket message failed:",
        error
      );
    }
  };

socket.onerror = () => {
  console.warn(
    `Coinbase WebSocket connection error for ${productId}. Ready state: ${socket.readyState}`
  );
};

socket.onclose = (event) => {
  console.warn(`Coinbase WebSocket closed for ${productId}`, {
    code: event.code,
    reason: event.reason || "No reason provided",
    wasClean: event.wasClean,
  });
};

return () => {
  socket.onopen = null;
  socket.onmessage = null;
  socket.onerror = null;
  socket.onclose = null;

  if (
    socket.readyState === WebSocket.OPEN ||
    socket.readyState === WebSocket.CONNECTING
  ) {
    socket.close(1000, "Component cleanup");
  }
};

}, [
  selectedCoin,
  selectedTimeframe,
  simulatorReady,
]);

useEffect(() => {
  if (!patternRecognitionEnabled) {
    setDetectedPatterns([]);
    return;
  }

  const candleKey =
    `${selectedCoin}-${selectedTimeframe}`;

  if (
    candlesReadyFor !== candleKey ||
    history.length < 50
  ) {
    setDetectedPatterns([]);
    return;
  }

const results = detectPatterns(history);

console.log("PAT detected patterns:", results);
console.log(
  "PAT strongest pattern:",
  results[0] ?? null
);

setDetectedPatterns(results);
}, [
  patternRecognitionEnabled,
  history,
  candlesReadyFor,
  selectedCoin,
  selectedTimeframe,
]);

useEffect(() => {
  const container = chartRef.current;

  if (!container) return;
  if (chartInstanceRef.current) return;

  const chart = createChart(container, {
    autoSize: true,

    layout: {
      attributionLogo: false,
      background: {
        type: ColorType.Solid,
        color: "#0f172a",
      },
      textColor: "#d4d4d8",
    },

    grid: {
      vertLines: {
        color: "#1f2937",
      },
      horzLines: {
        color: "#1f2937",
      },
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

    rightPriceScale: {
      borderColor: "#27272a",
      visible: true,
      entireTextOnly: true,
      scaleMargins: {
        top: 0.05,
        bottom: 0.28,
      },
    },

    timeScale: {
      visible: true,
      borderVisible: true,
      borderColor: "#3f3f46",
      timeVisible: false,
      secondsVisible: false,
      fixLeftEdge: true,
      fixRightEdge: true,
      rightOffset: 12,
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
    priceLineVisible: true,
    lastValueVisible: true,

    priceFormat: {
      type: "price",
      precision: 2,
      minMove: 0.01,
    },
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

  const rsiSeries = chart.addSeries(LineSeries, {
    color: "#f97316",
    lineWidth: 2,
    priceScaleId: "rsi",
    priceLineVisible: false,
    lastValueVisible: true,
  });

  chart.priceScale("rsi").applyOptions({
    scaleMargins: {
      top: 0.78,
      bottom: 0,
    },
    visible: false,
  });

  rsiSeries.createPriceLine({
    price: 70,
    color: "#ef4444",
    lineWidth: 1,
    lineStyle: 2,
    axisLabelVisible: false,
    title: "",
  });

  rsiSeries.createPriceLine({
    price: 50,
    color: "#64748b",
    lineWidth: 1,
    lineStyle: 2,
    axisLabelVisible: false,
    title: "",
  });

  rsiSeries.createPriceLine({
    price: 30,
    color: "#22c55e",
    lineWidth: 1,
    lineStyle: 2,
    axisLabelVisible: false,
    title: "",
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
  rsiSeriesRef.current = rsiSeries;
  ma7SeriesRef.current = ma7Series;
  ma25SeriesRef.current = ma25Series;
  ma99SeriesRef.current = ma99Series;

  chart.subscribeCrosshairMove((param) => {
    if (!param.time) {
      setSelectedCandleDate("Hover a candle");
      return;
    }

    const rsiData = param.seriesData.get(rsiSeries);

    if (
      indicatorPanelRef.current === "RSI" &&
      rsiData &&
      "value" in rsiData
    ) {
      setSelectedCandleDate(
        `RSI: ${Number(rsiData.value).toFixed(2)}`
      );

      return;
    }

    const time = param.time as any;

    if (typeof time === "object") {
      const date = new Date(
        time.year,
        time.month - 1,
        time.day
      );

      setSelectedCandleDate(
        date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      );
    }
  });

  return () => {
    chart.remove();

    chartInstanceRef.current = null;
    candleSeriesRef.current = null;
    volumeSeriesRef.current = null;
    rsiSeriesRef.current = null;
    ma7SeriesRef.current = null;
    ma25SeriesRef.current = null;
    ma99SeriesRef.current = null;
  };
}, []);

useEffect(() => {
  if (!chartRef.current || history.length === 0) return;


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

const usesEightDecimals =
  selectedCoin === "SHIB" ||
  selectedCoin === "PEPE";

candleSeriesRef.current.applyOptions({
  priceFormat: {
    type: "price",
    precision: usesEightDecimals ? 8 : 2,
    minMove: usesEightDecimals
      ? 0.00000001
      : 0.01,
  },
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

const rangeKey =
  `${selectedCoin}-${selectedTimeframe}`;

if (
  chartData.length > 80 &&
  initialRangeKeyRef.current !== rangeKey
) {
  const containerWidth =
    chartRef.current?.clientWidth ?? 0;

  const visibleCandles =
    containerWidth < 700 ? 70 : 160;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!chartInstanceRef.current) return;

      chartInstanceRef.current
        .timeScale()
        .setVisibleLogicalRange({
          from: Math.max(
            chartData.length - visibleCandles,
            0
          ),
          to: chartData.length + 12,
        });

      initialRangeKeyRef.current = rangeKey;
    });
  });
}

if (indicatorPanel === "VOLUME") {
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

  rsiSeriesRef.current?.setData([]);
}

if (indicatorPanel === "RSI") {
  rsiSeriesRef.current?.setData(buildRSIData(14));

  volumeSeriesRef.current?.setData([]);
}

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

function buildRSIData(period = 14) {
  return chartData
    .map((item, index, array) => {
      if (index < period) return null;

      const slice = array.slice(index - period, index + 1);

      let gains = 0;
      let losses = 0;

      for (let i = 1; i < slice.length; i++) {
        const change = slice[i].close - slice[i - 1].close;

        if (change > 0) gains += change;
        if (change < 0) losses += Math.abs(change);
      }

      const averageGain = gains / period;
      const averageLoss = losses / period;

      let rsi = 50;

      if (averageLoss === 0) rsi = 100;
      else if (averageGain === 0) rsi = 0;
      else {
        const rs = averageGain / averageLoss;
        rsi = 100 - 100 / (1 + rs);
      }

      return {
        time: item.time,
        value: Number(rsi.toFixed(2)),
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

  if (
    activePosition &&
    activePosition.liquidationPrice != null
  ) {
    const line = candleSeriesRef.current?.createPriceLine({
      price: activePosition.liquidationPrice,
      color: "#ef4444",
      lineWidth: 2,
      lineStyle: 2,
      axisLabelVisible: true,
      title: "LQ",
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
    title: "ET",
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
    title: "ET",
  });

  if (entryLine) {
    riskLinesRef.current.push(entryLine);
  }
}

const selectedSpotRisk =
  spotRiskSettings[selectedCoin];

const selectedFuturesPosition =
  futuresPositions.find(
    (position) => position.coin === selectedCoin
  );

const hasOpenSpotPosition =
  positions[selectedCoin] > 0;

const activeTakeProfit =
  marketMode === "SPOT"
    ? hasOpenSpotPosition
      ? selectedSpotRisk?.takeProfit
      : takeProfit !== ""
      ? Number(takeProfit)
      : null
    : selectedFuturesPosition
    ? selectedFuturesPosition.takeProfit
    : takeProfit !== ""
    ? Number(takeProfit)
    : null;

const activeStopLoss =
  marketMode === "SPOT"
    ? hasOpenSpotPosition
      ? selectedSpotRisk?.stopLoss
      : stopLoss !== ""
      ? Number(stopLoss)
      : null
    : selectedFuturesPosition
    ? selectedFuturesPosition.stopLoss
    : stopLoss !== ""
    ? Number(stopLoss)
    : null;

if (activeTakeProfit != null) {
  const tpLine = candleSeriesRef.current?.createPriceLine({
    price: activeTakeProfit,
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

if (activeStopLoss != null) {
  const slLine = candleSeriesRef.current?.createPriceLine({
    price: activeStopLoss,
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
  spotRiskSettings,
  marketMode,
  selectedCoin,
  takeProfit,
  stopLoss,
  indicatorPanel,
]);


function buildTradeContext() {

  return {
    market: {
      coin: selectedCoin,
      timeframe: selectedTimeframe,
      entryPrice: currentPrice || null,
      marketAnalysisSummary: marketAnalysisSummary || null,

      marketDirection: movingAverageAnalysis?.direction || null,
      marketStructure: structureAnalysis?.structure || null,
      marketConviction: marketIntelligence?.marketConviction || null,

      momentum:
        marketIntelligence?.momentumAnalysis?.momentum || null,

      volume:
        marketIntelligence?.volumeAnalysis?.volume || null,

      rsi:
        marketIntelligence?.rsiAnalysis || null,

      pattern:
        marketIntelligence?.patternAnalysis || null,

      priceLocation: priceLocation || null,
      entryQuality: currentEntryQuality || null,

      nearestSupport:
        marketIntelligence?.nearestSupport || null,

      nearestResistance:
        marketIntelligence?.nearestResistance || null,

      movingAverageAnalysis:
        movingAverageAnalysis || null,
    },

    account: {
      balanceAtEntry: balance,
      marginUsedAtEntry: marginUsed,
      marketMode,
    },

    createdAt: new Date().toISOString(),
  };
}

async function closeFuturesPosition({
  position,
  exitPrice,
  reason,
  index,
}: {
  position: any;
  exitPrice: number;
  reason: FuturesCloseReason;
  index: number;
}) {
  const pnl =
    position.side === "LONG"
      ? (exitPrice - position.entryPrice) * position.quantity
      : (position.entryPrice - exitPrice) * position.quantity;

  const exitFee =
    (position.positionSize || position.margin * position.leverage) * feeRate;

  const netPnl =
    reason === "LIQUIDATION"
      ? -position.margin
      : pnl - (position.entryFee || 0) - exitFee;

  const snapshotId = crypto.randomUUID();

const management =
  position.id && futuresPositionManagement[position.id]
    ? futuresPositionManagement[position.id]
    : null;

const durationMinutes =
  management?.openedAt
    ? Math.round(
        (Date.now() - new Date(management.openedAt).getTime()) / 60000
      )
    : null;

const exitPercent =
  position.entryPrice > 0
    ? position.side === "LONG"
      ? ((exitPrice - position.entryPrice) / position.entryPrice) * 100
      : ((position.entryPrice - exitPrice) / position.entryPrice) * 100
    : 0;

const givebackPercent =
  management
    ? Math.max(0, management.highestUnrealizedPercent - exitPercent)
    : 0;

const exitEfficiency =
  management && management.highestUnrealizedPercent > 0
    ? Math.min(
        100,
        Math.max(
          0,
          (exitPercent / management.highestUnrealizedPercent) * 100
        )
      )
    : 0;

  const baseReview = reviewTrade({
    mode: "FUTURES",
    side: position.side,
    entryPrice: position.entryPrice,
    exitPrice,
    pnl: netPnl,
    grossPnl: pnl,
    totalFees: (position.entryFee || 0) + exitFee,
    leverage: position.leverage,
    margin: position.margin,
    positionSize: position.positionSize || position.margin * position.leverage,
    stopLoss: position.stopLoss,
takeProfit: position.takeProfit,

management: management
  ? {
      openedAt: management.openedAt,
      durationMinutes,

      highestUnrealizedPnl: management.highestUnrealizedPnl,
      lowestUnrealizedPnl: management.lowestUnrealizedPnl,

      highestUnrealizedPercent: management.highestUnrealizedPercent,
      lowestUnrealizedPercent: management.lowestUnrealizedPercent,

      exitPercent,
      givebackPercent,
      exitEfficiency,
    }
  : null,

tradeContext: position.tradeContext,
  });

  const automaticReview = {
    ...baseReview,
    snapshotId,
  };

setTradeReviews((prev) => [
  {
    snapshotId,
    mode: "FUTURES",
    coin: position.coin,
    side: position.side,

    leverage: position.leverage,
    margin: position.margin,
    positionSize: position.positionSize,
    balanceAtEntry: position.balanceAtEntry,

    tradeContext: position.tradeContext || null,
    review: automaticReview,
  },
  ...prev,
]);

  setBalance((prev) =>
    reason === "LIQUIDATION"
      ? prev
      : prev + position.margin + netPnl
  );

  setMarginUsed((prev) =>
    Math.max(0, prev - position.margin)
  );

  setFuturesPositions((prev) =>
    prev.filter((_, i) => i !== index)
  );

if (position.id) {
  setFuturesPositionManagement((prev) => {
    const updated = { ...prev };
    delete updated[position.id];
    return updated;
  });
}

  if (user && isPaid) {
    await addDoc(collection(db, "tradeReviews"), {
      userId: user.id,
      userName: user.firstName || "Trader",
      snapshotId,

      mode: "FUTURES",
      coin: position.coin,
      side: position.side,

leverage: position.leverage,
margin: position.margin,
positionSize:
  position.positionSize ||
  position.margin * position.leverage,
balanceAtEntry:
  position.balanceAtEntry || startingBalance,

      tradeContext: position.tradeContext || null,
      review: automaticReview,

      tradeResult: {
        entryPrice: position.entryPrice,
        exitPrice,
        pnl: netPnl,
        grossPnl: pnl,
        entryFee: position.entryFee || 0,
        exitFee,
        totalFees: (position.entryFee || 0) + exitFee,
        status:
          reason === "TP"
            ? "TAKE PROFIT"
            : reason === "SL"
            ? "STOP LOSS"
            : reason === "LIQUIDATION"
            ? "LIQUIDATED"
            : "MANUAL CLOSE",
        closedReason: reason,
        closedAt: new Date().toISOString(),
      },

      created: new Date(),
    });
  }

  setFuturesHistory((prev) => [
    {
      ...position,
      snapshotId,
      exitPrice,
      pnl: netPnl,
      grossPnl: pnl,
      entryFee: position.entryFee || 0,
      exitFee,
      totalFees: (position.entryFee || 0) + exitFee,
      status:
        reason === "TP"
          ? "TAKE PROFIT"
          : reason === "SL"
          ? "STOP LOSS"
          : reason === "LIQUIDATION"
          ? "LIQUIDATED"
          : "MANUAL CLOSE",
      positionSize: position.positionSize || position.margin * position.leverage,
      balanceAtEntry: position.balanceAtEntry || startingBalance,
      stopLoss: position.stopLoss,
      takeProfit: position.takeProfit,
      closedReason: reason,
      closedAt: new Date().toISOString(),
      tradeContext: position.tradeContext || null,
automaticReview,
review: automaticReview,

management: automaticReview.engine.management,
exit: automaticReview.engine.exit,

time: new Date().toLocaleTimeString(),
    },
    ...prev,
  ]);

  setTakeProfit("");
  setStopLoss("");

const nextReviewedTradeCount = tradeReviews.length + 1;

if (
  nextReviewedTradeCount >= 20 &&
  nextReviewedTradeCount % 20 === 0
) {
  setShowSimulatorGaby(true);
  setAutoGabyQuestion(
    "Generate the Trader Development Report for the user's latest completed trades."
  );
}

}

async function closeSpotPosition({
  coin,
  quantity,
  currentPrice,
  reason,
}: {
  coin: AssetSymbol;
  quantity: number;
  currentPrice: number;
  reason: "MANUAL" | "TP" | "SL";
}) {

  console.log("CLOSE SPOT", {
    coin,
    reason,
  });

console.log("SPOT CLOSE FUNCTION HIT", {
  coin,
  quantity,
  currentPrice,
  reason,
});

  const ownedAmount = positions[coin];

  if (ownedAmount <= 0) {
    setMessage(`No ${coin} owned.`);
    return null;
  }

  const quantityToClose = Math.min(quantity, ownedAmount);

  const sellValue = quantityToClose * currentPrice;
  const spotExitFee = sellValue * feeRate;
  const netSellValue = sellValue - spotExitFee;

  const avgEntryPrice = averagePrices[coin] || 0;

  const grossSpotPnl =
    (currentPrice - avgEntryPrice) * quantityToClose;

  const spotEntryFeePaid =
    avgEntryPrice * quantityToClose * feeRate;

  const spotPnl =
    grossSpotPnl - spotEntryFeePaid - spotExitFee;

  const snapshotId = crypto.randomUUID();

  const tradeContext = buildTradeContext();

const management = spotPositionManagement[coin] || null;

const durationMinutes =
  management?.openedAt
    ? Math.round(
        (Date.now() - new Date(management.openedAt).getTime()) / 60000
      )
    : null;

const exitPercent =
  avgEntryPrice > 0
    ? ((currentPrice - avgEntryPrice) / avgEntryPrice) * 100
    : 0;

const givebackPercent =
  management
    ? Math.max(
        0,
        management.highestUnrealizedPercent - exitPercent
      )
    : 0;

const exitEfficiency =
  management && management.highestUnrealizedPercent > 0
    ? Math.min(
        100,
        Math.max(
          0,
          (exitPercent / management.highestUnrealizedPercent) * 100
        )
      )
    : 0;


  const baseReview = reviewTrade({
    mode: "SPOT",
    side: "LONG",
    entryPrice: avgEntryPrice,
    exitPrice: currentPrice,
    pnl: spotPnl,
    grossPnl: grossSpotPnl,
    totalFees: spotEntryFeePaid + spotExitFee,
    stopLoss: spotRiskSettings[coin]?.stopLoss,
takeProfit: spotRiskSettings[coin]?.takeProfit,

management: management
  ? {
      openedAt: management.openedAt,
      durationMinutes,

      highestUnrealizedPnl: management.highestUnrealizedPnl,
      lowestUnrealizedPnl: management.lowestUnrealizedPnl,

      highestUnrealizedPercent: management.highestUnrealizedPercent,
      lowestUnrealizedPercent: management.lowestUnrealizedPercent,

exitPercent,
givebackPercent,
exitEfficiency,

    }
  : null,

tradeContext,
});

  const automaticReview = {
    ...baseReview,
    snapshotId,
  };

setTradeReviews((prev) => [
  {
    snapshotId,
    mode: "SPOT",
    coin,
    side: "LONG",

    amount: avgEntryPrice * quantityToClose,
    balanceAtEntry:
      tradeContext?.account?.balanceAtEntry ?? 0,

    tradeContext,
    review: automaticReview,
  },
  ...prev,
]);

console.log("SPOT CLOSE REVIEW CREATED", {
  snapshotId,
  hasAutomaticReview: !!automaticReview,
  hasReviewText: !!automaticReview?.gaby,
  automaticReview,
});

  setBalance((prev) => prev + netSellValue);

  setPositions((prev) => ({
    ...prev,
    [coin]: Math.max(0, prev[coin] - quantityToClose),
  }));

  setAveragePrices((prev) => ({
    ...prev,
    [coin]:
      ownedAmount - quantityToClose <= 0
        ? 0
        : prev[coin],
  }));

setSpotRiskSettings((prev) => ({
  ...prev,
  [coin]:
    ownedAmount - quantityToClose <= 0
      ? { takeProfit: null, stopLoss: null }
      : prev[coin],
}));

if (ownedAmount - quantityToClose <= 0) {
  setSpotPositionManagement((prev) => {
    const updated = { ...prev };
    delete updated[coin];
    return updated;
  });
}

setTakeProfit("");
  setStopLoss("");

setTrades((prev) => {
  const next = [
    {
      snapshotId,
      automaticReview,
      review: automaticReview,

      type:
        reason === "TP"
          ? "TAKE PROFIT"
          : reason === "SL"
          ? "STOP LOSS"
          : "SELL",

      coin,
      amount: sellValue,
      price: currentPrice,

      pnl: spotPnl,
      grossPnl: grossSpotPnl,
      entryFee: spotEntryFeePaid,
      exitFee: spotExitFee,
      totalFees: spotEntryFeePaid + spotExitFee,

management: automaticReview.engine.management,

      status:
        reason === "TP"
          ? "TAKE PROFIT"
          : reason === "SL"
          ? "STOP LOSS"
          : "MANUAL CLOSE",

      closedReason: reason,
      closedAt: new Date().toISOString(),

      tradeContext,

      time: new Date().toLocaleTimeString(),
    },
    ...prev,
  ];

  console.log("NEW SPOT TRADE", next[0]);

  return next;
});

  if (user && isPaid) {
    await addDoc(collection(db, "tradeReviews"), {
      userId: user.id,
      userName: user.firstName || "Trader",
      snapshotId,

      mode: "SPOT",
      coin,
      side: "LONG",

      tradeContext,
      review: automaticReview,

      tradeResult: {
        entryPrice: avgEntryPrice,
        exitPrice: currentPrice,
        pnl: spotPnl,
        grossPnl: grossSpotPnl,
        entryFee: spotEntryFeePaid,
        exitFee: spotExitFee,
        totalFees: spotEntryFeePaid + spotExitFee,
        status:
          reason === "TP"
            ? "TAKE PROFIT"
            : reason === "SL"
            ? "STOP LOSS"
            : "MANUAL CLOSE",
        closedReason: reason,
        closedAt: new Date().toISOString(),
      },

      created: new Date(),
    });
  }

if (user && isPaid) {
    await addDoc(collection(db, "trades"), {
      userId: user.id,
      userName: user.firstName || "Trader",
      snapshotId,

      type:
        reason === "TP"
          ? "TAKE PROFIT"
          : reason === "SL"
          ? "STOP LOSS"
          : "SELL",

      coin,
      amount: sellValue,
      price: currentPrice,

      pnl: spotPnl,
      grossPnl: grossSpotPnl,
      entryFee: spotEntryFeePaid,
      exitFee: spotExitFee,
      totalFees: spotEntryFeePaid + spotExitFee,

management: automaticReview.engine.management,

status:
  reason === "TP"
    ? "TAKE PROFIT"
    : reason === "SL"
    ? "STOP LOSS"
    : "MANUAL CLOSE",

closedReason: reason,
closedAt: new Date().toISOString(),

      tradeContext,
      automaticReview,
      review: automaticReview,

      created: new Date(),
    });
  }

if (user && isPaid) {
    await setDoc(doc(db, "portfolios", user.id), {
      userName: user.firstName || "Trader",
      balance: balance + netSellValue,
      positions: {
        ...positions,
        [coin]: Math.max(0, ownedAmount - quantityToClose),
      },
      averagePrices: {
        ...averagePrices,
        [coin]:
          ownedAmount - quantityToClose <= 0
            ? 0
            : averagePrices[coin],
      },
      updated: new Date(),
    });
  }

const nextReviewedTradeCount = tradeReviews.length + 1;

if (
  nextReviewedTradeCount >= 20 &&
  nextReviewedTradeCount % 20 === 0
) {
  setShowSimulatorGaby(true);
  setAutoGabyQuestion(
    "Generate the Trader Development Report for the user's latest completed trades."
  );
}

  return {
    sellValue,
    netSellValue,
    grossSpotPnl,
    spotPnl,
    spotExitFee,
    snapshotId,
    automaticReview,
  };
}

function buyCoin() {
  if (!requireSignIn()) return;

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

  
const tradeContext = buildTradeContext();
const tradeId = crypto.randomUUID();

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
if (user && isPaid) {
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

const spotPositionCost =
  newAvg * newQty;

const cumulativeEntryFee =
  spotPositionCost * feeRate;

const spotBreakEvenPrice =
  newAvg *
  ((1 + feeRate) / (1 - feeRate));

const spotBreakEvenValue =
  newQty * spotBreakEvenPrice;

const estimatedExitFee =
  spotBreakEvenValue * feeRate;

const estimatedRoundTripFees =
  cumulativeEntryFee + estimatedExitFee;

const requiredPriceMove =
  spotBreakEvenPrice - newAvg;

const requiredMovePercent =
  newAvg > 0
    ? (requiredPriceMove / newAvg) * 100
    : 0;

setSpotPositionFacts((prev) => ({
  ...prev,

  [selectedCoin]: {
    entryPrice: newAvg,
    breakEvenPrice: spotBreakEvenPrice,
    requiredPriceMove,
    requiredMovePercent,
    entryFee: cumulativeEntryFee,
    estimatedExitFee,
    estimatedRoundTripFees,
  },
}));

if (oldQty <= 0) {
  setSpotPositionManagement((prev) => ({
    ...prev,
    [selectedCoin]: {
      openedAt: new Date().toISOString(),

      highestUnrealizedPnl: 0,
      lowestUnrealizedPnl: 0,

      highestUnrealizedPercent: 0,
      lowestUnrealizedPercent: 0,
    },
  }));
}

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
  tradeId,
  type: "BUY",
  coin: selectedCoin,
  amount: tradeAmount,
  price: currentPrice,

  entryFee: spotEntryFee,

  tradeContext,

  time: new Date().toLocaleTimeString(),
},
  ...prev,
]);

if (user && isPaid) {
addDoc(collection(db, "trades"), {
  userId: user.id,
  userName: user.firstName || "Trader",

  tradeId,

  type: "BUY",
  coin: selectedCoin,
  amount: tradeAmount,
  price: currentPrice,

  entryFee: spotEntryFee,

tradeContext,

  created: new Date(),
});
}

    setMessage(`Bought $${tradeAmount} of ${selectedCoin}`);

setShowSimulatorGaby(true);

setAutoGabyQuestion(
  `Give me a quick educational summary of my newly opened ${selectedCoin} spot position.

Use only the actual TradeNestX position facts.

Keep the entire response under 60 words.

Explain clearly:
- my average entry price
- my estimated total round-trip fees
- that break-even means my position's gross gain must first cover those fees
- because I only own a fraction of ${selectedCoin}, the market price itself must move enough for that quantity to generate the fee amount
- mention the required percentage move to break-even
- mention the break-even price

Do not say the required market-price move is profit.
Do not imply I need to earn that full dollar amount as profit.
Do not use headings, bullet points, or markdown.
Do not give trading advice or predict future price movement.`
);

    if (orderType === "LIMIT") {
  setLimitPrice("");
}
 }

function openFuturesPosition(
  side: "LONG" | "SHORT",
  orderLeverage = leverage
) {
  if (!requireSignIn()) return;

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

const estimatedExitFee =
  positionSize * feeRate;

const estimatedRoundTripFees =
  entryFee + estimatedExitFee;

const requiredPriceMove =
  quantity > 0
    ? estimatedRoundTripFees / quantity
    : 0;

const breakEvenPrice =
  side === "LONG"
    ? currentPrice + requiredPriceMove
    : currentPrice - requiredPriceMove;

const requiredMovePercent =
  currentPrice > 0
    ? (requiredPriceMove / currentPrice) * 100
    : 0;

const positionId = crypto.randomUUID();

const tradeContext = buildTradeContext();

const maintenanceBuffer = 0.005;

const liquidation =
  orderLeverage > 1
    ? side === "LONG"
      ? currentPrice * (1 - 1 / orderLeverage + maintenanceBuffer)
      : currentPrice * (1 + 1 / orderLeverage - maintenanceBuffer)
    : null;

  setBalance((prev) => prev - margin - entryFee);
  setMarginUsed((prev) => prev + margin);

setFuturesPositions((prev) => [
  {
    id: positionId,
    coin: selectedCoin,
    side,
    margin,
    leverage: orderLeverage,
entryFee,
estimatedExitFee,
estimatedRoundTripFees,

positionSize,
quantity,

entryPrice: currentPrice,
breakEvenPrice,
requiredPriceMove,
requiredMovePercent,

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

tradeContext,

    time: new Date().toLocaleTimeString(),
  },
  ...prev,
]);

setFuturesPositionManagement((prev) => ({
  ...prev,
  [positionId]: {
    openedAt: new Date().toISOString(),

    highestUnrealizedPnl: 0,
    lowestUnrealizedPnl: 0,

    highestUnrealizedPercent: 0,
    lowestUnrealizedPercent: 0,
  },
}));

setFuturesHistory((prev) => [
  {
    id: positionId,
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

tradeContext,

    pnl: null,

    status: "OPEN",

    time: new Date().toLocaleTimeString(),
  },
  ...prev,
]);

  setMessage(
  `${side} ${selectedCoin} opened with ${orderLeverage}x leverage`
);

setShowSimulatorGaby(true);

setAutoGabyQuestion(
  `Give me a quick educational summary of my newly opened ${side} ${selectedCoin} futures position.

Use only the actual TradeNestX position facts.

Keep the entire response under 70 words.

Prioritize:
- entry and break-even
- required move to break-even
- fees
- leverage and liquidation risk

Do not explain every field separately.
Combine related facts naturally.
Do not use headings, bullet points, or markdown.
Do not repeat definitions unless they are important to understanding this specific position.
Do not give trading advice or predict future price movement.`
);
}

function sellCoin() {
  if (!requireSignIn()) return;

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

  closeSpotPosition({
    coin: selectedCoin,
    quantity: positions[selectedCoin],
    currentPrice,
    reason: "MANUAL",
  });
}

function resetAccount() {
  setBalance(startingBalance);
  setPositions(emptyPositions);
  setAveragePrices(emptyPositions);
  setSpotPositionManagement({});
  setSpotRiskSettings({});
  setTrades([]);
  setMarginUsed(0);
  setFuturesPositions([]);
  setFuturesPositionManagement({});
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
if (user && isPaid) {
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

const watchlist = WATCHLIST.map((coin) => ({
  ...coin,
  price: prices[coin.symbol],
}));

const chartHighlightState = {
  visible: gabyAnnotations.length > 0,

  pinned: gabyAnnotations.some((item) =>
    pinnedGabyAnnotations.includes(item)
  ),

  type:
    gabyAnnotations.length === 1
      ? gabyAnnotations[0]
      : null,

  price: null,
};

return (
    <>
      <Navbar />

      <main className="page-shell selection:bg-cyan-500/30 !pt-0">

<div className="mt-1 grid min-w-0 w-full grid-cols-1 gap-2 px-1 xl:mt-2 xl:gap-3 xl:px-6 xl:grid-cols-[220px_minmax(0,1fr)_270px]">

<WatchlistPanel
  mobileView={mobileView}
  tourStep={tourStep}
  selectedCoin={selectedCoin}
  setSelectedCoin={setSelectedCoin}
  
  watchlist={watchlist}
  previousPrices={previousPrices}
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  marketMode={marketMode}
  setMarketMode={setMarketMode}
  showMarketMenu={showMarketMenu}
  setShowMarketMenu={setShowMarketMenu}
  setActiveBottomTab={setActiveBottomTab}
  setMobileView={setMobileView}
  chartInstanceRef={chartInstanceRef}
  chartRef={chartRef}
  
  showGabyHint={showGabyHint}
  setShowSimulatorGaby={setShowSimulatorGaby}
/>

<ChartWorkspace
reviews={tradeReviews}
  mobileView={mobileView}
  setMobileView={setMobileView}
  selectedCoin={selectedCoin}
  currentPrice={currentPrice}
  marketMode={marketMode}
  selectedTimeframe={selectedTimeframe}
  setSelectedTimeframe={setSelectedTimeframe}
  now={now}
  indicatorPanel={indicatorPanel}
  setIndicatorPanel={setIndicatorPanel}
patternRecognitionEnabled={patternRecognitionEnabled}
setPatternRecognitionEnabled={setPatternRecognitionEnabled}
strongestPattern={strongestPattern}
  chartInstanceRef={chartInstanceRef}
  candleSeriesRef={candleSeriesRef}
  chartRef={chartRef}
  setShowSimulatorGaby={setShowSimulatorGaby}
  gabyChartHighlights={gabyChartHighlights}
  tourStep={tourStep}
/>

<div
  className={`xl:col-span-1 xl:flex xl:h-[690px] xl:flex-col xl:gap-2 ${
    mobileView === "ORDER" ? "block" : "hidden xl:flex"
  }`}
>

<AccountSummaryCard
  marketMode={marketMode}
  balance={balance}
  accountEquity={accountEquity}
  marginUsed={marginUsed}
  futuresUnrealizedPnl={futuresUnrealizedPnl}
  totalPnlPercent={totalPnlPercent}
  tourStep={tourStep}
/>          

<TradingPanel
  mobileView={mobileView}
  setMobileView={setMobileView}
  tourStep={tourStep}
  tradeAmount={tradeAmount}
  setTradeAmount={setTradeAmount}
  takeProfit={takeProfit}
  setTakeProfit={setTakeProfit}
  stopLoss={stopLoss}
  setStopLoss={setStopLoss}
  orderType={orderType}
  setOrderType={setOrderType}
  limitPrice={limitPrice}
  setLimitPrice={setLimitPrice}
  marketMode={marketMode}
  leverage={leverage}
  setLeverage={setLeverage}
  showLeverageMenu={showLeverageMenu}
  setShowLeverageMenu={setShowLeverageMenu}
  balance={balance}
  marginUsed={marginUsed}
  estimatedLongLiquidation={estimatedLongLiquidation}
  estimatedShortLiquidation={estimatedShortLiquidation}
  feeRate={feeRate}
  message={message}
  buyCoin={buyCoin}
  sellCoin={sellCoin}
  openFuturesPosition={openFuturesPosition}
  setPositionType={setPositionType}
  setShowResetModal={setShowResetModal}
/>

</div>
</div>

<PortfolioPanel
  mobileView={mobileView}
  tourStep={tourStep}
>
  
<PortfolioTabs
  activeBottomTab={activeBottomTab}
  setActiveBottomTab={setActiveBottomTab}
  marketMode={marketMode}
/>

{activeBottomTab === "POSITIONS" && (
<PortfolioPositions
  marketMode={marketMode}
  positions={positions}
  futuresPositions={futuresPositions}
  futuresPositionManagement={futuresPositionManagement}
  prices={prices}
  averagePrices={averagePrices}
  spotRiskSettings={spotRiskSettings}
  closeSpotPosition={closeSpotPosition}
  closeFuturesPosition={closeFuturesPosition}
  setMessage={setMessage}
/>
)}

{activeBottomTab === "HISTORY" && (
  <PortfolioHistory
    marketMode={marketMode}
    trades={trades}
    futuresHistory={futuresHistory}
  />
)}

{activeBottomTab === "ORDERS" && (
  <PortfolioOrders
    marketMode={marketMode}
    pendingLimitOrder={pendingLimitOrder}
    pendingFuturesLimitOrder={pendingFuturesLimitOrder}
    setPendingLimitOrder={setPendingLimitOrder}
    setPendingFuturesLimitOrder={setPendingFuturesLimitOrder}
    setMessage={setMessage}
  />
)}

</PortfolioPanel>

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
  onClick={() => {
    setShowSimulatorGaby(false);
    setGabyAnnotations(pinnedGabyAnnotations);
  }}
  className="fixed inset-0 z-40 bg-black/10"
/>

<div className="fixed inset-x-3 bottom-[72px] z-50 xl:left-[24px] xl:w-[500px]">
  <button
    onClick={() => {
      setShowSimulatorGaby(false);
      setGabyAnnotations(pinnedGabyAnnotations);
    }}
        className="mb-3 rounded-xl border border-zinc-700 bg-[#111827] px-4 py-2 text-sm font-bold text-zinc-300 hover:border-cyan-400 hover:text-white"
      >
        ✕ Close
      </button>

<GabySimulatorCoach
  userId={user?.id || ""}
  isPaid={isPaid}
  traderDevelopmentEngines={traderDevelopmentEngines}
  autoQuestion={autoGabyQuestion}
  clearAutoQuestion={() => setAutoGabyQuestion(null)}
  mode={marketMode}
  selectedCoin={selectedCoin}
  trades={trades}
  futuresHistory={futuresHistory}
  setFuturesHistory={setFuturesHistory}
setTrades={setTrades}
  positions={positions}
  spotPositionFacts={spotPositionFacts}
  futuresPositions={futuresPositions}
  futuresPositionManagement={futuresPositionManagement}
  balance={balance}
  marginUsed={marginUsed}
  marketIntelligence={marketIntelligence}
  marketAnalysisSummary={marketAnalysisSummary}
  movingAverageAnalysis={movingAverageAnalysis}
  currentEntryQuality={currentEntryQuality}
  selectedTimeframe={selectedTimeframe}
  currentPrice={currentPrice}
  priceLocation={priceLocation}
  strongestPattern={strongestPattern}
  chartHighlightState={chartHighlightState}

onAnalysisComplete={(subject) => {
  if (subject === "DIRECTION") {
    setGabyAnnotations(["SUPPORT", "RESISTANCE"]);
  } else if (subject === "SUPPORT" || subject === "RESISTANCE") {
    setGabyAnnotations([subject]);
  }
}}


onChartCommand={(command) => {
  const action = command?.action;
  const target = command?.target;
  const count = Math.max(
    1,
    Math.min(Number(command?.count) || 1, 3)
  );

  const targets: GabyAnnotationKey[] =
    target === "BOTH"
      ? ["SUPPORT", "RESISTANCE"]
      : target === "SUPPORT" || target === "RESISTANCE"
      ? [target]
      : [];

  if (action === "CLEAR") {
    setGabyAnnotations([]);
    setPinnedGabyAnnotations([]);
    return;
  }

  if (action === "REMOVE") {
    setGabyAnnotations((prev) =>
      prev.filter((item) => !targets.includes(item))
    );

    setPinnedGabyAnnotations((prev) =>
      prev.filter((item) => !targets.includes(item))
    );

    return;
  }

  if (action === "PIN") {
    setGabyAnnotations((prev) => [
      ...new Set([...prev, ...targets]),
    ]);

    setPinnedGabyAnnotations((prev) => [
      ...new Set([...prev, ...targets]),
    ]);

    return;
  }

if (action === "SHOW") {
  setGabyAnnotationCount(count);
  setGabyAnnotations(targets);
}
}}

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