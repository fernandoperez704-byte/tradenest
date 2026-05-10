import Navbar from "./components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-8">
        <section className="max-w-6xl mx-auto text-center mt-16">
          <h1 className="text-6xl font-bold text-cyan-400">
            TradeNestX
          </h1>

          <p className="mt-6 text-2xl text-gray-300">
            Learn trading, practice with paper money, and track your progress.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <a
              href="/learn"
              className="bg-cyan-500 text-black px-8 py-4 rounded-xl font-bold"
            >
              Start Learning
            </a>

            <a
              href="/simulator"
              className="bg-zinc-800 px-8 py-4 rounded-xl font-bold"
            >
              Open Simulator
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-zinc-900 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-cyan-400">
                Learn
              </h2>
              <p className="text-gray-400 mt-3">
                Beginner-friendly lessons about stocks, crypto, buying, selling, and risk.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-cyan-400">
                Practice
              </h2>
              <p className="text-gray-400 mt-3">
                Use a paper trading simulator before risking real money.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-cyan-400">
                Compete
              </h2>
              <p className="text-gray-400 mt-3">
                Track your progress and climb the leaderboard.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}