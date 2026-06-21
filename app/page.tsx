import Navbar from "./components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

<main className="bg-black">
  <div className="relative h-[calc(100dvh-120px)] w-full md:h-screen">
    <img
      src="/learn/hero/tradenestx-hero-banner-4k.png"
      alt="TradeNestX Hero"
      className="h-full w-full object-cover md:object-contain"
    />
  </div>
</main>
<section className="bg-black">
  <img
    src="/learn/ai-coach/ai-coach-preview.png"
    alt="AI Coach Preview"
    className="mx-auto max-h-screen w-full object-contain"
  />
</section>
    </>
  );
}