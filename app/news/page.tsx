"use client";

import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    async function loadNews() {
      const response = await fetch("/api/news");
      const data = await response.json();

      setNews(data);
    }

    loadNews();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold text-cyan-400 text-center mt-6">
            Market News
          </h1>

          <p className="text-center text-gray-400 mt-4 text-xl">
            Stay updated with stocks and crypto headlines.
          </p>

          <div className="mt-10 space-y-4">
            {news.map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800"
              >
                <h2 className="text-2xl font-bold">
                  {item.title}
                </h2>

                <div className="flex justify-between mt-4 text-gray-400">
                  <p>{item.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}