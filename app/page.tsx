import Navbar from "./components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

<main className="bg-black">
  {/* Mobile hero */}
  <div className="block md:hidden">
    <img
      src="/learn/hero/tradenestx-hero-banner-4k.png"
      alt="TradeNestX Hero"
      className="block w-full object-contain"
    />
  </div>

  {/* Desktop hero */}
  <div className="hidden h-screen w-full md:block">
    <img
      src="/learn/hero/tradenestx-hero-banner-4k.png"
      alt="TradeNestX Hero"
      className="h-full w-full object-contain"
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