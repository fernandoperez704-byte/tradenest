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
  const [market, setMarket] = useState<"CRYPTO" | "STOCKS">("CRYPTO");
  const [selectedCoin, setSelectedCoin] = useState<AssetSymbol>("BTC");
const [searchTerm, setSearchTerm] = useState("");
  const [prices, setPrices] = useState({
    ...cryptoPrices,
    ...stockPrices,
  });

  const [history, setHistory] = useState<PricePoint[]>([]);
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
  const [tradeAmount, setTradeAmount] = useState<number | "">(100);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [now, setNow] = useState<Date | null>(null);

  const currentPrice = prices[selectedCoin];
  const chartRef = useRef<HTMLDivElement | null>(null);

function updatePrices() {
  setPrices((prev) => {
    const updated = Object.fromEntries(
      Object.entries(prev).map(([symbol, price]) => {
        const move = price * (Math.random() * 0.02 - 0.01);

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
    ...old.slice(-29),
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

    return updated;
  });
}

  useEffect(() => {
    setNow(new Date());
    updatePrices();

    const priceInterval = setInterval(updatePrices, 1000);
    const clockInterval = setInterval(() => setNow(new Date()), 1000);

    return () => {
      clearInterval(priceInterval);
      clearInterval(clockInterval);
    };
  }, [selectedCoin]);


  useEffect(() => {
  if (!chartRef.current || history.length === 0) return;

  chartRef.current.innerHTML = "";

  const chart = createChart(chartRef.current, {
    layout: {
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
    width: chartRef.current.clientWidth,
    height: 700,
    rightPriceScale: {
      borderColor: "#27272a",
    },
    timeScale: {
      borderColor: "#27272a",
    },
  });

  const candleSeries = chart.addSeries(CandlestickSeries, {
    upColor: "#16a34a",
    downColor: "#dc2626",
    borderVisible: false,
    wickUpColor: "#16a34a",
    wickDownColor: "#dc2626",
  });

  candleSeries.setData(
    history.map((item, index) => ({
      time: (index + 1) as any,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }))
  );

  const handleResize = () => {
    if (!chartRef.current) return;

    chart.applyOptions({
      width: chartRef.current.clientWidth,
    });
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
    chart.remove();
  };
}, [history]);
  function buyCoin() {
    if (!tradeAmount || balance < tradeAmount) {
      setMessage("Invalid trade amount.");
      return;
    }

    const quantity = tradeAmount / currentPrice;
    const oldQty = positions[selectedCoin];
    const oldAvg = averagePrices[selectedCoin];

    const newQty = oldQty + quantity;

    const newAvg =
      oldQty > 0
        ? (oldQty * oldAvg + quantity * currentPrice) / newQty
        : currentPrice;

    setBalance((prev) => prev - tradeAmount);
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
  }

  function sellCoin() {
    const ownedAmount = positions[selectedCoin];

    if (ownedAmount <= 0) {
      setMessage(`No ${selectedCoin} owned.`);
      return;
    }

    const value = ownedAmount * currentPrice;

    setBalance((prev) => prev + value);
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

  setTrades((prev) => [
  {
    type: "SELL",
    coin: selectedCoin,
    amount: value,
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

  const totalPnl = portfolioValue - startingBalance;
  const totalPnlPercent = (totalPnl / startingBalance) * 100;

  function pnlColor(value: number) {
    return value >= 0 ? "text-green-400" : "text-red-400";
  }

 const watchlist =
  market === "CRYPTO"
    ? [
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
      ]
    : [
        { symbol: "AAPL" as AssetSymbol, name: "Apple", price: prices.AAPL },
        { symbol: "TSLA" as AssetSymbol, name: "Tesla", price: prices.TSLA },
        { symbol: "NVDA" as AssetSymbol, name: "NVIDIA", price: prices.NVDA },
        { symbol: "AMZN" as AssetSymbol, name: "Amazon", price: prices.AMZN },
        { symbol: "META" as AssetSymbol, name: "Meta", price: prices.META },
        { symbol: "MSFT" as AssetSymbol, name: "Microsoft", price: prices.MSFT },
        { symbol: "AMD" as AssetSymbol, name: "AMD", price: prices.AMD },
        { symbol: "NFLX" as AssetSymbol, name: "Netflix", price: prices.NFLX },
        { symbol: "COIN" as AssetSymbol, name: "Coinbase", price: prices.COIN },
        { symbol: "GOOGL" as AssetSymbol, name: "Google", price: prices.GOOGL },
        { symbol: "PLTR" as AssetSymbol, name: "Palantir", price: prices.PLTR },
        { symbol: "SMCI" as AssetSymbol, name: "Super Micro", price: prices.SMCI },
        { symbol: "ARM" as AssetSymbol, name: "ARM", price: prices.ARM },
        { symbol: "SNOW" as AssetSymbol, name: "Snowflake", price: prices.SNOW },
        { symbol: "SHOP" as AssetSymbol, name: "Shopify", price: prices.SHOP },
        { symbol: "RBLX" as AssetSymbol, name: "Roblox", price: prices.RBLX },
        { symbol: "DIS" as AssetSymbol, name: "Disney", price: prices.DIS },
        { symbol: "JPM" as AssetSymbol, name: "JPMorgan", price: prices.JPM },
        { symbol: "BA" as AssetSymbol, name: "Boeing", price: prices.BA },
        { symbol: "NIO" as AssetSymbol, name: "NIO", price: prices.NIO },
      ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-8">
        <h1 className="text-3xl md:text-5xl font-bold text-cyan-400 text-center mt-6">
          Trading Simulator
        </h1>
<div className="mt-6 flex justify-center">
  <div className="flex flex-wrap justify-center gap-4">

    <div className="w-56 bg-green-500/10 border border-green-500 text-center text-green-400 px-4 py-2 rounded-xl font-bold">
      Crypto Market: OPEN
    </div>

    <div className="w-56 bg-cyan-500/10 border border-cyan-500 text-center text-cyan-400 px-4 py-2 rounded-xl font-bold">
      Stocks Market: LIVE
    </div>

    <div className="w-56 bg-orange-500/10 border border-orange-500 text-center text-orange-400 px-4 py-2 rounded-xl font-bold">
      Volatility: HIGH
    </div>

  </div>
</div>
<div className="mt-6 overflow-hidden rounded-xl bg-[#131722] border border-zinc-800 py-2">
  <div className="animate-[marquee_28s_linear_infinite] whitespace-nowrap text-sm font-bold tracking-wide text-green-400">
    BTC ${prices.BTC.toFixed(0)} ▲ &nbsp;&nbsp;&nbsp;
    ETH ${prices.ETH.toFixed(0)} ▲ &nbsp;&nbsp;&nbsp;
    SOL ${prices.SOL.toFixed(2)} ▲ &nbsp;&nbsp;&nbsp;
    TSLA ${prices.TSLA.toFixed(2)} ▼ &nbsp;&nbsp;&nbsp;
    NVDA ${prices.NVDA.toFixed(2)} ▲ &nbsp;&nbsp;&nbsp;
    AAPL ${prices.AAPL.toFixed(2)} ▲
  </div>
</div>
    <div className="mt-8 grid md:grid-cols-4 gap-4 max-w-[1600px] mx-auto items-stretch">
  <div className="bg-zinc-900 h-full min-h-[80px] flex items-center justify-center p-4 md:p-5 rounded-xl text-center">
    <p className="text-xl font-bold">
      Today: {now ? now.toLocaleDateString() : "--/--/----"}
    </p>
  </div>

  <div className="bg-zinc-900 h-full min-h-[80px] flex items-center justify-center p-4 md:p-5 rounded-xl text-center">
    <p className={`text-xl font-bold ${pnlColor(totalPnl)}`}>
      Daily P/L: ${totalPnl.toFixed(2)}
    </p>
  </div>

  <div className="bg-zinc-900 h-full min-h-[80px] flex items-center justify-center p-4 md:p-5 rounded-xl text-center">
    <p className={`text-xl font-bold ${pnlColor(totalPnl)}`}>
      Weekly P/L: ${totalPnl.toFixed(2)}
    </p>
  </div>

  <div className="bg-zinc-900 h-full min-h-[80px] flex items-center justify-center p-4 md:p-5 rounded-xl text-center">
    <p className={`text-xl font-bold ${pnlColor(totalPnl)}`}>
      Monthly P/L: ${totalPnl.toFixed(2)}
    </p>
  </div>
</div>

<div className="mt-6 grid md:grid-cols-4 gap-4 max-w-[1600px] mx-auto items-stretch">
  <div className="bg-zinc-900 h-full min-h-[80px] flex items-center justify-center rounded-xl p-5 text-center">
    <p className="text-xl font-bold text-cyan-400">
      Active Market: {market}
    </p>
  </div>

  <div className="bg-zinc-900 h-full min-h-[80px] flex items-center justify-center rounded-xl p-5 text-center">
    <p className="text-xl font-bold text-cyan-400">
      Selected Asset: {selectedCoin}
    </p>
  </div>

  <div className="bg-zinc-900 h-full min-h-[80px] flex items-center justify-center rounded-xl p-5 text-center">
    <p className="text-xl font-bold text-cyan-400">
      Open Positions: {Object.values(positions).filter((qty) => qty > 0).length}
    </p>
  </div>

  <div className="bg-zinc-900 h-full min-h-[80px] flex items-center justify-center rounded-xl p-5 text-center">
    <p className="text-xl font-bold text-cyan-400">
      Total Trades: {trades.length}
    </p>
  </div>
</div>

        <div className="mt-10 grid grid-cols-1 xl:grid-cols-[260px_minmax(0,1fr)_320px] gap-6 w-full max-w-[1800px] mx-auto">
          <div className="bg-[#111827] border border-zinc-700 rounded-2xl p-4 h-[820px] overflow-y-auto scrollbar-hide">
            <div className="flex gap-2 mb-4 justify-start">
              <button
                onClick={() => {
                  setMarket("CRYPTO");
                  setSelectedCoin("BTC");
                }}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  market === "CRYPTO"
                    ? "bg-cyan-500 text-black"
                    : "bg-zinc-800"
                }`}
              >
                Crypto
              </button>

              <button
                onClick={() => {
                  setMarket("STOCKS");
                  setSelectedCoin("AAPL");
                }}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  market === "STOCKS"
                    ? "bg-cyan-500 text-black"
                    : "bg-zinc-800"
                }`}
              >
                Stocks
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
                  onClick={() => setSelectedCoin(coin.symbol)}
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
  
   

            <div className="bg-[#0f172a] border border-zinc-700 rounded-2xl p-6 h-[820px] flex flex-col overflow-hidden">
          <div className="flex justify-start gap-2 mb-4">
  {["1M", "5M", "15M", "1H", "4H", "1D", "1W", "1MO"].map(
    (timeframe) => (
      <button
        key={timeframe}
        className="rounded-md border border-zinc-700 bg-[#111827] px-3 py-1.5 text-xs font-bold text-zinc-400 hover:border-green-500 hover:text-green-400 transition-all"
      >
        {timeframe}
      </button>
    )
  )}
</div>
<div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3">
  <div>
    <h2 className="text-xl font-black tracking-wide text-white">
      {selectedCoin}/USD
    </h2>

    <p className="text-xs text-zinc-600 mt-1 tracking-wide">
      Real-time simulated market data
    </p>
  </div>

  <p className="text-2xl font-black text-white tracking-wide">
    ${(currentPrice ?? 0).toLocaleString()}
  </p>
</div>
<div className="flex-1 rounded-xl overflow-hidden">
 <div
  ref={chartRef}
  className="h-full w-full"
/>
</div>
</div>

            <div className="space-y-6 xl:col-span-1">

  <div className="bg-[#111827] border border-zinc-700 rounded-2xl p-5 h-fit">
  <div className="flex items-center justify-between mb-6">
  <h2 className="text-2xl font-bold">
    Order Entry
  </h2>

  <span className="text-xs font-bold text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
    PAPER
  </span>
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
    className="bg-[#0f172a] border border-zinc-700 text-white px-3 py-3 rounded-xl w-full text-center text-sm focus:outline-none focus:border-green-500"
  />

  <input
    type="number"
    placeholder="Stop Loss"
    className="bg-[#0f172a] border border-zinc-700 text-white px-3 py-3 rounded-xl w-full text-center text-sm focus:outline-none focus:border-red-500"
  />
</div>

<div className="mt-4">
  <p className="mb-2 text-xs font-bold tracking-wide text-zinc-500">
    LEVERAGE
  </p>

  <div className="grid grid-cols-4 gap-2">
    {["1x", "2x", "5x", "10x"].map((lev) => (
      <button
        key={lev}
        className="rounded-lg border border-zinc-700 bg-[#0f172a] px-3 py-2 text-sm font-bold text-zinc-400 transition-all hover:border-cyan-500 hover:text-cyan-400"
      >
        {lev}
      </button>
    ))}
  </div>
</div>
<div className="mt-4">
  <p className="mb-2 text-xs font-bold tracking-wide text-zinc-500">
    ORDER TYPE
  </p>

  <div className="grid grid-cols-2 gap-2">
    {["Market", "Limit"].map((type) => (
      <button
        key={type}
        className="rounded-lg border border-zinc-700 bg-[#0f172a] px-3 py-2 text-sm font-bold text-zinc-400 transition-all hover:border-cyan-500 hover:text-cyan-400"
      >
        {type}
      </button>
    ))}
  </div>
</div>
  <div className="mt-4 flex flex-wrap justify-center gap-2">
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
    <span className="text-zinc-500">Position Size</span>

    <span className="font-bold text-white">
      ${tradeAmount || 0}
    </span>
  </div>

  <div className="mt-2 flex items-center justify-between text-sm">
    <span className="text-zinc-500">Estimated Fee</span>

    <span className="font-bold text-zinc-300">
      ${((Number(tradeAmount) || 0) * 0.001).toFixed(2)}
    </span>
  </div>
</div>
  <div className="mt-4 grid grid-cols-2 gap-3">
    <button
      onClick={buyCoin}
      className="rounded-xl bg-green-500 px-6 py-3 text-lg font-black text-black transition-all hover:scale-[1.02] hover:bg-green-400"
    >
      BUY
    </button>

    <button
      onClick={sellCoin}
      className="rounded-xl bg-red-500 px-6 py-3 text-lg font-black text-white transition-all hover:scale-[1.02] hover:bg-red-400"
    >
      SELL
    </button>
  </div>

  <div className="mt-6 flex justify-center">
    <button
      onClick={resetAccount}
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
      <div className="mt-10 bg-zinc-900 rounded-2xl p-8 border border-zinc-800 shadow-2xl">
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-4xl font-bold text-white">
      Open Positions
    </h2>

    <div className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-xl text-sm font-bold">
      LIVE PORTFOLIO
    </div>
  </div>

  <div className="space-y-4">
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

        const pnlPercent =
          avgPrice > 0
            ? (pnl / (Number(qty) * avgPrice)) * 100
            : 0;

        return (
          <div
            key={coin}
            className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 hover:border-cyan-500 transition-all duration-300"
          >
            <div className="grid grid-cols-7 gap-6 items-center">
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
                    pnl >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  ${pnl.toFixed(2)}
                </p>

                <p
                  className={`text-sm font-bold ${
                    pnlPercent >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  ({pnlPercent.toFixed(2)}%)
                </p>
                <div className="flex justify-end">
  <button
    onClick={() => {
      const sellValue =
        Number(qty) * currentPrice;

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
          </div>
        );
      })}

    {Object.values(positions).every(
      (qty) => Number(qty) === 0
    ) && (
      <div className="bg-zinc-800 rounded-2xl p-10 text-center border border-zinc-700">
        <p className="text-2xl font-bold text-gray-300">
          No Open Positions
        </p>

        <p className="text-gray-500 mt-2">
          Your active trades will appear here.
        </p>
      </div>
    )}
  </div>
   <div className="mt-10 grid grid-cols-1 xl:grid-cols-3 gap-6">

  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
    <h2 className="text-2xl font-bold mb-4">
      Trading Tips
    </h2>

    <div className="space-y-3 text-sm text-zinc-300">
      <p>• Never risk your full balance on one trade.</p>
      <p>• Watch your open positions before buying more.</p>
      <p>• Use the simulator to practice entries and exits.</p>
      <p>• Green does not always mean buy. Red does not always mean sell.</p>
    </div>
  </div>
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">
    <h2 className="text-2xl font-bold mb-4">
      Fear & Greed Index
    </h2>

    <div className="text-6xl font-black text-green-400">
      72
    </div>

    <p className="mt-4 text-lg text-zinc-300">
      Market Sentiment: Greed
    </p>

    <div className="mt-6 h-4 rounded-full bg-zinc-800 overflow-hidden">
      <div
        className="h-full bg-green-400"
        style={{ width: "72%" }}
      />
    </div>
  </div>
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
    <h2 className="text-2xl font-bold mb-4">
      Portfolio Allocation
    </h2>

    <div className="space-y-4">
      {Object.entries(positions)
        .filter(([, qty]) => qty > 0)
        .map(([symbol, qty]) => {
          const value =
            qty *
            prices[symbol as AssetSymbol];

          const percent =
            portfolioValue > 0
              ? (value / portfolioValue) * 100
              : 0;

          return (
            <div key={symbol}>
              <div className="flex justify-between mb-1">
                <span className="font-bold text-cyan-400">
                  {symbol}
                </span>

                <span>
                  {percent.toFixed(2)}%
                </span>
              </div>

              <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-cyan-400"
                  style={{
                    width: `${percent}%`,
                  }}
                />
              </div>
            </div>
          );
        })}

      {Object.values(positions).every(
        (qty) => qty === 0
      ) && (
        <p className="text-zinc-500">
          No active allocations.
        </p>
      )}
    </div>
  </div>
  </div>
  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
    <p className="text-sm font-bold tracking-wide text-zinc-500">
      BEST PERFORMER
    </p>

    <div className="mt-4">
      <p className="text-4xl font-black text-cyan-400">
        BTC
      </p>

      <p className="text-lg font-bold text-green-400 mt-2">
        +12.45%
      </p>
    </div>
  </div>

  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
    <p className="text-sm font-bold tracking-wide text-zinc-500">
      WIN RATE
    </p>

    <div className="mt-4">
      <p className="text-4xl font-black text-white">
        68%
      </p>

      <p className="text-lg text-zinc-500 mt-2">
        34 Winning Trades
      </p>
    </div>
  </div>

</div>
            <div className="mt-14 bg-zinc-900 rounded-2xl p-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Trade History</h2>

              <div className="space-y-3">
                {trades.length === 0 && (
                  <p className="text-gray-400">No trades yet.</p>
                )}

                {trades.map((trade, index) => (
                  <div
                    key={index}
                    className="grid md:grid-cols-4 gap-4 bg-zinc-800 p-4 rounded-xl"
                  >
                    <div>
                      <span
                        className={
                          trade.type === "BUY"
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {trade.type}
                      </span>{" "}
                      {trade.coin}
                    </div>

                    <div>${trade.amount.toFixed(2)}</div>
                    <div>@ ${trade.price.toLocaleString()}</div>
                    <div>{trade.time}</div>
                  </div>
                ))}
              </div>
            </div>
          
 </div>

      </main>
    </>
  );
}