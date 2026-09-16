export type CoinbaseFuturesTopOfBook = {
  bestBid: number | null;
  bestAsk: number | null;
  mid: number | null;
};

export function createCoinbaseFuturesOrderBook() {
  const bids = new Map<number, number>();
  const asks = new Map<number, number>();

  function applyUpdates(updates: any[]): CoinbaseFuturesTopOfBook {
    for (const update of updates) {
      const price = Number(update.price_level);
      const quantity = Number(update.new_quantity);

      if (!Number.isFinite(price)) continue;
      if (!Number.isFinite(quantity)) continue;

      const book =
        update.side === "bid"
          ? bids
          : update.side === "offer"
          ? asks
          : null;

      if (!book) continue;

      if (quantity === 0) {
        book.delete(price);
      } else {
        book.set(price, quantity);
      }
    }

    const bestBid =
      bids.size > 0
        ? Math.max(...bids.keys())
        : null;

    const bestAsk =
      asks.size > 0
        ? Math.min(...asks.keys())
        : null;

    const mid =
      bestBid !== null && bestAsk !== null
        ? (bestBid + bestAsk) / 2
        : null;

    return {
      bestBid,
      bestAsk,
      mid,
    };
  }

  return {
    applyUpdates,
  };
}