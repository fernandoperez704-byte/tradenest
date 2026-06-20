"use client";

import Navbar from "../components/Navbar";

export default function NewsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-black text-cyan-400">
            Market News
          </h1>

          <p className="mt-8 text-2xl font-bold">
            Coming Soon
          </p>

          <p className="mt-4 text-zinc-400">
            Daily market headlines and educational breakdowns
            from Gaby are coming soon.
          </p>
        </div>
      </main>
    </>
  );
}