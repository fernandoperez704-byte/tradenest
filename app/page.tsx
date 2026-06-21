import Navbar from "./components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

<main className="bg-black">
  {/* Mobile TradeNestX Hero */}
  <div className="block md:hidden">
    <img
      src="/learn/hero/mobile-tradenestx-hero.png"
      alt="TradeNestX Hero"
      className="w-full"
    />
  </div>

  {/* Desktop TradeNestX Hero */}
  <div className="hidden h-screen w-full md:block">
    <img
      src="/learn/hero/tradenestx-hero-banner-4k.png"
      alt="TradeNestX Hero"
      className="h-full w-full object-contain"
    />
  </div>
</main>

{/* Mobile Gaby */}
<div className="block md:hidden bg-black">
  <img
    src="/learn/ai-coach/mobile-gaby-hero.png"
    alt="AI Coach Preview"
    className="w-full"
  />
</div>

{/* Desktop Gaby */}
<section className="hidden bg-black md:block">
  <img
    src="/learn/ai-coach/ai-coach-preview.png"
    alt="AI Coach Preview"
    className="mx-auto max-h-screen w-full object-contain"
  />
</section>
    </>
  );
}