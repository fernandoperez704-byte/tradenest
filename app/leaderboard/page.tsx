"use client";

import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState<any[]>([]);

useEffect(() => {
  const unsub = onSnapshot(collection(db, "portfolios"), (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const sorted = data.sort(
      (a: any, b: any) => b.balance - a.balance
    );

    setLeaders(sorted);
  });

  return () => unsub();
}, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold text-cyan-400 text-center mt-6">
            Global Leaderboard
          </h1>

          <p className="text-center text-gray-400 mt-4 text-xl">
            Top paper trading accounts.
          </p>

          <div className="mt-10 space-y-4">
            {leaders.map((leader, index) => (
              <div
                key={leader.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold text-2xl">
                    #{index + 1}
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">
                      {leader.userName || "Trader"}
                    </h2>

                    <p className="text-gray-400">
                      Portfolio Balance
                    </p>
                  </div>
                </div>

                <div className="text-cyan-400 text-3xl font-bold">
                  ${Number(leader.balance).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}