import { useState } from "react";

export type CoinbaseTopOfBook = {
  bestBid: number | null;
  bestAsk: number | null;
  mid: number | null;
};

export function useCoinbaseFuturesTopOfBook() {
  const [topOfBook, setTopOfBook] = useState<CoinbaseTopOfBook>({
    bestBid: null, bestAsk: null, mid: null,
  });

  return { topOfBook, setTopOfBook };
}