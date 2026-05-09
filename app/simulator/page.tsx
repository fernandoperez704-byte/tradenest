"use client";

import { useState } from "react";

export default function SimulatorPage() {
  const [price, setPrice] = useState(100);
  const [balance, setBalance] = useState(10000);
  const [shares, setShares] = useState(0);

  function movePrice() {
    const change = Math.floor(Math.random() * 20) - 10;
    setPrice((prev) => Math.max(1, prev + change));
  }

  function buyStock() {
    if (balance >= price) {
      setBalance(balance - price);
      setShares(shares + 1);
      movePrice();
    }
  }

  function sellStock() {
    if (shares > 0) {
      setBalance(balance + price);
      setShares(shares - 1);
      movePrice();
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-cyan-400 mb-8">
        Trade Simulator
      </h1>

      <div className="bg-zinc-900 p-10 rounded-2xl shadow-xl text-center">
        <p className="text-3xl mb-4">
          Stock Price: ${price}
        </p>

        <p className="text-xl mb-2">
          Balance: ${balance}
        </p>

        <p className="text-xl mb-8">
          Shares Owned: {shares}
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={buyStock}
            className="px-8 py-3 bg-green-500 rounded-xl text-black font-bold"
          >
            BUY
          </button>

          <button
            onClick={sellStock}
            className="px-8 py-3 bg-red-500 rounded-xl text-white font-bold"
          >
            SELL
          </button>
        </div>
      </div>
    </div>
  );
}