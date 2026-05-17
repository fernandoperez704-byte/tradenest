import Navbar from "./components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-black p-8 text-white">
       <div className="absolute inset-0 overflow-hidden">

  <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />

  <div className="absolute right-[-10%] top-[20%] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[140px]" />

  <div className="absolute bottom-[-10%] left-[30%] h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[160px]" />

</div>

<div className="relative z-10">
        <section className="mx-auto flex min-h-[78vh] max-w-6xl flex-col items-center justify-center text-center">
          <h1 className="text-7xl md:text-8xl font-black tracking-tight">
            <span className="text-white">TradeNest</span>
<span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]">X</span>
          </h1>

          <p className="mt-8 max-w-3xl text-xl md:text-3xl leading-relaxed text-zinc-300">
            Learn trading, practice with paper money, and track your progress.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <a
              href="/learn"
              className="rounded-2xl bg-cyan-500 px-8 py-4 font-black text-black transition-all duration-300 hover:-translate-y-[2px] hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]"
            >
              Start Learning
            </a>

            <a
              href="/simulator"
              className="rounded-2xl border border-zinc-700 bg-[#18181b] px-8 py-4 font-black text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-cyan-500/40 hover:text-cyan-400"
            >
              Open Simulator
            </a>
          </div>

          
        </section>
        </div>
      </main>
    </>
  );
}