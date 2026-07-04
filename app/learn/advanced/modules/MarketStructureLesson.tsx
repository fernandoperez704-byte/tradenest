"use client";

import AdvancedLessonLayout from "../components/AdvancedLessonLayout";

export default function MarketStructureLesson() {
  return (
    <AdvancedLessonLayout
      title="Market Structure"
      images={[
        "/learn/advanced/structure/1.webp",
        "/learn/advanced/structure/2.webp",
        "/learn/advanced/structure/3.webp",
        "/learn/advanced/structure/4.webp",
      ]}
      questions={[
        "What are higher highs and higher lows?",
        "What are lower highs and lower lows?",
        "How does structure show trend changes?",
        "How does TradeNestX detect market structure?",
      ]}
    />
  );
}