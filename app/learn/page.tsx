"use client";

import Navbar from "../components/Navbar";

const lessons = [
  {
    title: "What Is A Stock?",
    text: "A stock represents ownership in a company. When you buy a stock, you own a small piece of that business.",
  },
  {
    title: "What Is Cryptocurrency?",
    text: "Cryptocurrency is digital money that runs on blockchain technology. Popular coins include Bitcoin and Ethereum.",
  },
  {
    title: "What Is Buying?",
    text: "Buying means entering a trade because you believe the price will increase in the future.",
  },
  {
    title: "What Is Selling?",
    text: "Selling means exiting a trade to lock in profits or prevent larger losses.",
  },
  {
    title: "What Is Profit & Loss?",
    text: "Profit and Loss (P/L) tracks how much money you gained or lost from your trades.",
  },
  {
    title: "Risk Management",
    text: "Good traders protect their money first. Never risk all your balance on one trade.",
  },
];

export default function LearnPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-cyan-400 text-center mt-6">
            Learn Trading
          </h1>

          <p className="text-center text-gray-400 mt-4 text-xl">
            Beginner friendly lessons to help you understand trading.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {lessons.map((lesson, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-cyan-400 transition"
              >
                <h2 className="text-2xl font-bold text-cyan-400">
                  {lesson.title}
                </h2>

                <p className="text-gray-300 mt-4 text-lg leading-8">
                  {lesson.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}