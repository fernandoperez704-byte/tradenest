"use client";

import Navbar from "../components/Navbar";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function ProfilePage() {
  const { user } = useUser();
  const [trades, setTrades] = useState<any[]>([]);

  useEffect(() => {
    async function loadTrades() {
      if (!user) return;

      const q = query(
        collection(db, "trades"),
        where("userId", "==", user.id)
      );

      const snapshot = await getDocs(q);

      setTrades(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    }

    loadTrades();
  }, [user]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-cyan-400 text-center mt-6">
            Trader Profile
          </h1>

          <div className="mt-10 bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-cyan-500 flex items-center justify-center text-4xl font-bold text-black">
                F
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  {user?.firstName || "Trader"}
                </h2>

                <p className="text-gray-400 mt-2">
                  Beginner Paper Trader
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <div className="bg-zinc-800 rounded-xl p-5 text-center">
                <p className="text-gray-400">Practice Balance</p>
                <p className="text-3xl font-bold text-cyan-400 mt-2">
                  $10,000
                </p>
              </div>

              <div className="bg-zinc-800 rounded-xl p-5 text-center">
                <p className="text-gray-400">Total Trades</p>
                <p className="text-3xl font-bold text-cyan-400 mt-2">
                  {trades.length}
                </p>
              </div>

              <div className="bg-zinc-800 rounded-xl p-5 text-center">
                <p className="text-gray-400">Win Rate</p>
                <p className="text-3xl font-bold text-cyan-400 mt-2">
                  {trades.length > 0 ? "100%" : "0%"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
            <h2 className="text-3xl font-bold text-cyan-400">
              Saved Trade History
            </h2>

            <div className="mt-6 space-y-4">
              {trades.length === 0 ? (
                <p className="text-gray-400">No saved trades yet.</p>
              ) : (
                trades.map((trade) => (
                  <div
                    key={trade.id}
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
                        {trade.userName}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">
                        ${Number(trade.amount).toFixed(2)}
                      </p>

                      <p className="text-gray-400 text-sm">
                        @ ${Number(trade.price).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}