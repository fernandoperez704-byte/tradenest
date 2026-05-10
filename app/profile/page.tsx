import Navbar from "../components/Navbar";

export default function ProfilePage() {
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
                  Fernando
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
                  0
                </p>
              </div>

              <div className="bg-zinc-800 rounded-xl p-5 text-center">
                <p className="text-gray-400">Win Rate</p>
                <p className="text-3xl font-bold text-cyan-400 mt-2">
                  0%
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}