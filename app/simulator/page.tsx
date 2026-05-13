"use client";

import Navbar from "../components/Navbar";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type PricePoint = {
  time: string;
  price: number;
};

type AssetSymbol =
  | "BTC"
  | "ETH"
  | "SOL"
  | "XRP"
  | "DOGE"
  | "AAPL"
  | "TSLA"
  | "NVDA"
  | "AMZN"
  | "META";

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
};

const stockPrices = {
  AAPL: 210,
  TSLA: 340,
  NVDA: 1180,
  AMZN: 185,
  META: 540,
};

const startingBalance = 10000;

const emptyPositions: Record<AssetSymbol, number> = {
  BTC: 0,
  ETH: 0,
  SOL: 0,
  XRP: 0,
  DOGE: 0,
  AAPL: 0,
  TSLA: 0,
  NVDA: 0,
  AMZN: 0,
  META: 0,
};

export default function SimulatorPage() {
const { user } = useUser();
  const [market, setMarket] = useState<"CRYPTO" | "STOCKS">("CRYPTO");
  const [selectedCoin, setSelectedCoin] = useState<AssetSymbol>("BTC");

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

function updatePrices() {
  setPrices((prev) => {
    const updated = {
      BTC: Math.max(1000, prev.BTC + Math.random() * 800 - 400),
      ETH: Math.max(100, prev.ETH + Math.random() * 60 - 30),
      SOL: Math.max(10, prev.SOL + Math.random() * 20 - 10),
      XRP: Math.max(0.1, prev.XRP + Math.random() * 0.2 - 0.1),
      DOGE: Math.max(0.01, prev.DOGE + Math.random() * 0.02 - 0.01),

      AAPL: Math.max(50, prev.AAPL + Math.random() * 8 - 4),
      TSLA: Math.max(50, prev.TSLA + Math.random() * 12 - 6),
      NVDA: Math.max(100, prev.NVDA + Math.random() * 20 - 10),
      AMZN: Math.max(50, prev.AMZN + Math.random() * 6 - 3),
      META: Math.max(50, prev.META + Math.random() * 10 - 5),
    };

    setHistory((old) => [
      ...old.slice(-29),
      {
        time: new Date().toLocaleTimeString(),
        price: updated[selectedCoin],
      },
    ]);

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
        ]
      : [
          { symbol: "AAPL" as AssetSymbol, name: "Apple", price: prices.AAPL },
          { symbol: "TSLA" as AssetSymbol, name: "Tesla", price: prices.TSLA },
          { symbol: "NVDA" as AssetSymbol, name: "NVIDIA", price: prices.NVDA },
          { symbol: "AMZN" as AssetSymbol, name: "Amazon", price: prices.AMZN },
          { symbol: "META" as AssetSymbol, name: "Meta", price: prices.META },
        ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-8">
        <h1 className="text-3xl md:text-5xl font-bold text-cyan-400 text-center mt-6">
          Multi-Coin Simulator
        </h1>
<div className="mt-6 flex justify-center">
  <div className="flex flex-wrap justify-center gap-4">
    <div className="w-56 bg-green-500 text-center text-black px-4 py-2 rounded-xl font-bold">
      Crypto Market: OPEN
    </div>

    <div className="w-56 bg-cyan-500 text-center text-black px-4 py-2 rounded-xl font-bold">
      Stocks Market: LIVE
    </div>

    <div className="w-56 bg-orange-400 text-center text-black px-4 py-2 rounded-xl font-bold">
      Volatility: HIGH
    </div>
  </div>
</div>
<div className="mt-6 overflow-hidden rounded-xl bg-zinc-900 py-3">
  <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap text-lg font-bold text-cyan-400">
    BTC ${prices.BTC.toFixed(0)} ▲ &nbsp;&nbsp;&nbsp;
    ETH ${prices.ETH.toFixed(0)} ▲ &nbsp;&nbsp;&nbsp;
    SOL ${prices.SOL.toFixed(2)} ▲ &nbsp;&nbsp;&nbsp;
    TSLA ${prices.TSLA.toFixed(2)} ▼ &nbsp;&nbsp;&nbsp;
    NVDA ${prices.NVDA.toFixed(2)} ▲ &nbsp;&nbsp;&nbsp;
    AAPL ${prices.AAPL.toFixed(2)} ▲
  </div>
</div>
        <div className="mt-8 grid md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <div className="bg-zinc-900 p-4 md:p-5 rounded-2xl text-center">
            <p className="text-gray-400">Today</p>
            <p className="text-xl font-bold">
              {now ? now.toLocaleDateString() : "--/--/----"}
            </p>
            <p className="text-cyan-400">
              {now ? now.toLocaleTimeString() : "--:--:--"}
            </p>
          </div>

          <div className="bg-zinc-900 p-4 md:p-5 rounded-2xl text-center">
            <p className="text-gray-400">Daily P/L</p>
            <p className={`text-2xl font-bold ${pnlColor(totalPnl)}`}>
              ${totalPnl.toFixed(2)}
            </p>
          </div>

          <div className="bg-zinc-900 p-4 md:p-5 rounded-2xl text-center">
            <p className="text-gray-400">Weekly P/L</p>
            <p className={`text-2xl font-bold ${pnlColor(totalPnl)}`}>
              ${totalPnl.toFixed(2)}
            </p>
          </div>

          <div className="bg-zinc-900 p-4 md:p-5 rounded-2xl text-center">
            <p className="text-gray-400">Monthly P/L</p>
            <p className={`text-2xl font-bold ${pnlColor(totalPnl)}`}>
              ${totalPnl.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <div className="bg-zinc-900 rounded-2xl p-5 text-center">
            <p className="text-gray-400">Active Market</p>
            <p className="text-2xl font-bold text-cyan-400 mt-2">{market}</p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-5 text-center">
            <p className="text-gray-400">Selected Asset</p>
            <p className="text-2xl font-bold text-cyan-400 mt-2">
              {selectedCoin}
            </p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-5 text-center">
            <p className="text-gray-400">Open Positions</p>
            <p className="text-2xl font-bold text-cyan-400 mt-2">
              {Object.values(positions).filter((qty) => qty > 0).length}
            </p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-5 text-center">
            <p className="text-gray-400">Total Trades</p>
            <p className="text-2xl font-bold text-cyan-400 mt-2">
              {trades.length}
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 max-w-6xl mx-auto">
          <div className="bg-zinc-900 rounded-2xl p-4 h-fit">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => {
                  setMarket("CRYPTO");
                  setSelectedCoin("BTC");
                }}
                className={`px-4 py-2 rounded-xl font-bold ${
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
                className={`px-4 py-2 rounded-xl font-bold ${
                  market === "STOCKS"
                    ? "bg-cyan-500 text-black"
                    : "bg-zinc-800"
                }`}
              >
                Stocks
              </button>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-cyan-400">
              Watchlist
            </h2>

            <div className="space-y-3">
              {watchlist.map((coin) => (
                <button
                  key={coin.symbol}
                  onClick={() => setSelectedCoin(coin.symbol)}
                  className={`w-full rounded-xl border p-3 text-left ${
                    selectedCoin === coin.symbol
                      ? "border-cyan-400 bg-cyan-500 text-black"
                      : "border-zinc-700 bg-zinc-800"
                  }`}
                >
<div className="flex items-start justify-between">
  <div>
    <p className="text-xl font-bold">{coin.symbol}</p>
    <p className="text-sm opacity-70">{coin.name}</p>
  </div>

  <p className="font-bold">${coin.price.toLocaleString()}</p>
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
  stroke="lime"
  strokeWidth="4"
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

          <div>
            <div className="text-center space-y-3">
              <p className="text-2xl md:text-4xl font-bold">
                {selectedCoin} Price: ${currentPrice.toLocaleString()}
              </p>

              <p className="text-xl">Cash Balance: ${balance.toFixed(2)}</p>

              <p className="text-xl">
                {selectedCoin} Owned: {positions[selectedCoin].toFixed(6)}
              </p>

              <p className="text-2xl text-emerald-400 font-bold">
                Portfolio Value: ${portfolioValue.toFixed(2)}
              </p>

              <p className={`text-2xl font-bold ${pnlColor(totalPnl)}`}>
                Total P/L: ${totalPnl.toFixed(2)} (
                {totalPnlPercent.toFixed(2)}%)
              </p>
            </div>
<div className="mt-8 flex justify-center gap-3">
  {["1H", "4H", "1D", "1W", "1M"].map(
    (timeframe) => (
      <button
        key={timeframe}
        className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-bold text-white hover:bg-cyan-500 hover:text-black"
      >
        {timeframe}
      </button>
    )
  )}
</div>
            <div className="mt-10 bg-[#0f0f10] border border-zinc-800 rounded-2xl p-6 h-[420px] shadow-2xl">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}>
                  <CartesianGrid
  stroke="#27272a"
  strokeDasharray="2 2"
/>
                  <XAxis dataKey="time" hide />
                  <YAxis
  domain={["auto", "auto"]}
  tick={{ fill: "#a1a1aa" }}
/>
                  <Tooltip
  contentStyle={{
    backgroundColor: "#18181b",
    border: "1px solid #3f3f46",
    borderRadius: "12px",
    color: "white",
  }}
  labelStyle={{
    color: "#22d3ee",
  }}
/>
                 <Line
  type="monotone"
  dataKey="price"
  stroke="#00ff88"
  strokeWidth={3}
  dot={false}
  animationDuration={300}
/>
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-10 flex justify-center">
              <input
                type="number"
                value={tradeAmount}
                placeholder="Enter amount"
                onChange={(e) => {
                  const value = e.target.value;
                  setTradeAmount(value === "" ? "" : Number(value));
                }}
                className="bg-zinc-800 text-white px-4 py-3 rounded-xl w-56 text-center text-xl"
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={resetAccount}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  marginTop: "16px",
                  border: "2px solid cyan",
                }}
              >
                Reset Practice Account
              </button>
            </div>

            {message && (
              <p className="text-center mt-6 text-xl font-bold">{message}</p>
            )}

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {[100, 500, 1000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setTradeAmount(amount)}
                  className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-bold text-white hover:bg-cyan-500 hover:text-black"
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

            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={buyCoin}
                className="w-full md:w-36 rounded-xl bg-green-500 px-6 py-3 text-lg font-bold text-white hover:bg-green-600"
              >
                BUY
              </button>

              <button
                onClick={sellCoin}
                className="w-full md:w-36 rounded-xl bg-red-500 px-6 py-3 text-lg font-bold text-white hover:bg-red-600"
              >
                SELL
              </button>
            </div>
<div className="mt-14 bg-zinc-900 rounded-2xl p-6">
  <h2 className="text-2xl md:text-3xl font-bold mb-6">
    Top Movers
  </h2>

  <div className="grid md:grid-cols-2 gap-4">
    {watchlist.map((coin) => {
      const change =
        ((coin.price -
          (coin.price * 0.97)) /
          (coin.price * 0.97)) *
        100;

      return (
        <div
          key={coin.symbol}
          className="bg-zinc-800 rounded-xl p-4 flex justify-between items-center"
        >
          <div>
            <p className="font-bold text-cyan-400">
              {coin.symbol}
            </p>

            <p className="text-sm text-gray-400">
              {coin.name}
            </p>
          </div>

          <div
            className={`font-bold ${
              change >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {change.toFixed(2)}%
          </div>
        </div>
      );
    })}
  </div>
</div>
<div className="mt-6 bg-zinc-900 rounded-2xl p-6">
  <h2 className="text-3xl font-bold mb-4">
    Trading Tips
  </h2>

  <div className="space-y-3 text-gray-300">
    <p>• Never risk your full balance on one trade.</p>
    <p>• Watch your open positions before buying more.</p>
    <p>• Use the simulator to practice entries and exits.</p>
    <p>• Green does not always mean buy. Red does not always mean sell.</p>
  </div>
</div>
<div className="mt-6 bg-zinc-900 rounded-2xl p-6">
  <h2 className="text-2xl md:text-3xl font-bold mb-6">
    Market News
  </h2>

  <div className="space-y-4">
    <div className="bg-zinc-800 rounded-xl p-4">
      <p className="font-bold text-cyan-400">
        BTC Surges Above Resistance
      </p>

      <p className="text-gray-400 mt-1">
        Bitcoin volatility increases as traders
        react to market momentum.
      </p>
    </div>

    <div className="bg-zinc-800 rounded-xl p-4">
      <p className="font-bold text-cyan-400">
        Tesla Leads Tech Rally
      </p>

      <p className="text-gray-400 mt-1">
        TSLA and NVDA continue showing strong
        trading activity.
      </p>
    </div>

    <div className="bg-zinc-800 rounded-xl p-4">
      <p className="font-bold text-cyan-400">
        Altcoins See Increased Volume
      </p>

      <p className="text-gray-400 mt-1">
        SOL and XRP traders return after recent
        price swings.
      </p>
    </div>
  </div>
</div>
<div className="mt-14 bg-zinc-900 rounded-2xl p-6 text-center">
  <h2 className="text-3xl font-bold mb-4">
    Fear & Greed Index
  </h2>

  <div className="text-6xl font-bold text-green-400">
    72
  </div>

  <p className="mt-4 text-xl text-gray-300">
    Market Sentiment: Greed
  </p>

  <div className="mt-6 h-4 rounded-full bg-zinc-800 overflow-hidden">
    <div
      className="h-full bg-green-400"
      style={{ width: "72%" }}
    />
  </div>
</div>
<div className="mt-14 grid md:grid-cols-3 gap-4">
  <div className="bg-zinc-900 rounded-2xl p-6 text-center">
    <p className="text-gray-400">
      Best Performer
    </p>

    <p className="text-3xl font-bold text-green-400 mt-2">
      BTC
    </p>
  </div>

  <div className="bg-zinc-900 rounded-2xl p-6 text-center">
    <p className="text-gray-400">
      Worst Performer
    </p>

    <p className="text-3xl font-bold text-red-400 mt-2">
      XRP
    </p>
  </div>

  <div className="bg-zinc-900 rounded-2xl p-6 text-center">
    <p className="text-gray-400">
      Win Rate
    </p>

    <p className="text-3xl font-bold text-cyan-400 mt-2">
      68%
    </p>
  </div>
</div>
<div className="mt-14 bg-zinc-900 rounded-2xl p-6">
  <h2 className="text-2xl md:text-3xl font-bold mb-6">
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
      <p className="text-gray-400">
        No active allocations.
      </p>
    )}
  </div>
</div>
            <div className="mt-14 bg-zinc-900 rounded-2xl p-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Open Positions</h2>

              <div className="space-y-3">
                {Object.entries(positions)
                  .filter(([, qty]) => qty > 0)
                  .map(([symbol, qty]) => {
                    const current = prices[symbol as AssetSymbol];
                    const value = qty * current;
                    const avgPrice = averagePrices[symbol as AssetSymbol];
                    const positionPnl = (current - avgPrice) * qty;

                    const positionPnlPercent =
                      avgPrice > 0
                        ? ((current - avgPrice) / avgPrice) * 100
                        : 0;

                    return (
                      <div
                        key={symbol}
                        className="grid grid-cols-2 md:grid-cols-6 gap-4 bg-zinc-800 p-4 rounded-xl text-sm md:text-base"
                      >
                        <div className="font-bold text-cyan-400">{symbol}</div>

                        <div>Qty: {qty.toFixed(6)}</div>

                        <div>Price: ${current.toLocaleString()}</div>

                        <div>Value: ${value.toFixed(2)}</div>

                        <div>Avg: ${avgPrice.toFixed(2)}</div>

                        <div
                          className={`font-bold ${
                            positionPnl >= 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          ${positionPnl.toFixed(2)} (
                          {positionPnlPercent.toFixed(2)}%)
                        </div>
                      </div>
                    );
                  })}

                {Object.values(positions).every((qty) => qty === 0) && (
                  <p className="text-gray-400">No open positions.</p>
                )}
              </div>
            </div>
<div className="mt-14 bg-zinc-900 rounded-2xl p-6">
  <h2 className="text-2xl md:text-3xl font-bold mb-6">
    Recent Activity
  </h2>

  <div className="space-y-4">
    {trades.slice(0, 5).map((trade, index) => (
      <div
        key={index}
        className="bg-zinc-800 rounded-xl p-4 flex justify-between items-center"
      >
        <div>
          <p
            className={`font-bold ${
              trade.type === "BUY"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {trade.type} {trade.coin}
          </p>

          <p className="text-gray-400 text-sm">
            {trade.time}
          </p>
        </div>

        <div className="text-right">
          <p className="font-bold">
            ${trade.amount.toFixed(2)}
          </p>

          <p className="text-gray-400 text-sm">
            @ ${trade.price.toLocaleString()}
          </p>
        </div>
      </div>
    ))}

    {trades.length === 0 && (
      <p className="text-gray-400">
        No recent activity.
      </p>
    )}
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
        </div>
      </main>
    </>
  );
}