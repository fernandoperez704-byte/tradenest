"use client";

import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function TestFirePage() {
  async function testDatabase() {
    try {
      await addDoc(collection(db, "test"), {
        message: "TradeNestX connected",
        created: new Date(),
      });

      alert("Firestore connected successfully!");
    } catch (error) {
      console.error(error);
      alert("Firestore failed.");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <button
        onClick={testDatabase}
        className="bg-cyan-500 text-black px-6 py-4 rounded-xl font-bold"
      >
        Test Firestore
      </button>
    </main>
  );
}