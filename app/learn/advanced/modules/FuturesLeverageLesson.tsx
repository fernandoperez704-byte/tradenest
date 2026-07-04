"use client";

import AdvancedLessonLayout from "../components/AdvancedLessonLayout";

export default function FuturesLeverageLesson() {
  return (
    <AdvancedLessonLayout
      title="Futures & Leverage"
      images={[
        "/learn/advanced/futures/1.webp",
        "/learn/advanced/futures/2.webp",
        "/learn/advanced/futures/3.webp",
        "/learn/advanced/futures/4.webp",
      ]}
      questions={[
        "Why does leverage increase risk?",
        "What is liquidation?",
        "Why should beginners use low leverage?",
        "How does the simulator calculate liquidation?",
      ]}
    />
  );
}