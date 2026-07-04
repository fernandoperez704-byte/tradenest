"use client";

import AdvancedLessonLayout from "../components/AdvancedLessonLayout";

export default function ReadingMarketContextLesson() {
  return (
    <AdvancedLessonLayout
      title="Reading Market Context"
      images={[
        "/learn/advanced/context/1.webp",
        "/learn/advanced/context/2.webp",
        "/learn/advanced/context/3.webp",
        "/learn/advanced/context/4.webp",
      ]}
      questions={[
        "Why does TradeNestX analyze the market in a specific order?",
        "How do direction and support work together?",
        "Why is support only support until it breaks?",
        "How does Gaby determine the overall market context?",
      ]}
    />
  );
}