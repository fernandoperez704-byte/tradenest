export const STOCK_WATCHLIST = [
  // Highly traded stocks
  { symbol: "NVDA", name: "NVIDIA" },
  { symbol: "TSLA", name: "Tesla" },
  { symbol: "AAPL", name: "Apple" },
  { symbol: "AMD", name: "Advanced Micro Devices" },
  { symbol: "AMZN", name: "Amazon" },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "META", name: "Meta Platforms" },
  { symbol: "GOOGL", name: "Alphabet" },
  { symbol: "PLTR", name: "Palantir Technologies" },
  { symbol: "AVGO", name: "Broadcom" },
  { symbol: "NFLX", name: "Netflix" },
  { symbol: "COIN", name: "Coinbase" },
  { symbol: "MSTR", name: "Strategy" },
  { symbol: "JPM", name: "JPMorgan Chase" },
  { symbol: "BAC", name: "Bank of America" },

  // Major ETFs
  { symbol: "SPY", name: "SPDR S&P 500 ETF Trust" },
  { symbol: "QQQ", name: "Invesco QQQ Trust" },
  { symbol: "IWM", name: "iShares Russell 2000 ETF" },
  { symbol: "DIA", name: "SPDR Dow Jones Industrial Average ETF" },
  { symbol: "VTI", name: "Vanguard Total Stock Market ETF" },
] as const;

export type StockSymbol =
  (typeof STOCK_WATCHLIST)[number]["symbol"];