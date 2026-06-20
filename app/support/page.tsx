"use client";

import Navbar from "../components/Navbar";

export default function SupportPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-cyan-500/20 bg-zinc-900 p-10 text-center">
<h1 className="text-5xl font-black">
  <span className="text-white">TradeNest</span>
  <span className="text-cyan-400">X</span>
  <span className="text-white"> Support</span>
</h1>

            <p className="mt-8 text-xl font-bold">Need help?</p>

            <div className="mt-8 space-y-3 text-lg text-zinc-300">
              <p>• Account access issues</p>
              <p>• Billing questions</p>
              <p>• Payment problems</p>
              <p>• Bug reports</p>
              <p>• Feature requests</p>
            </div>

<a
  href="mailto:support@tradenestx.com?subject=TradeNestX Support Request"
  className="mt-10 inline-block text-3xl font-black text-cyan-400 transition hover:text-cyan-300 hover:underline"
>
  support@tradenestx.com
</a>

            <p className="mt-4 text-zinc-500">
              We typically respond within 24–48 hours.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}