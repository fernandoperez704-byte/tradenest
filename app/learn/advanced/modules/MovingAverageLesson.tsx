"use client";

import AdvancedLessonLayout from "../components/AdvancedLessonLayout";

export default function MovingAverageLesson() {
  return (
    <AdvancedLessonLayout
      title="Moving Averages & Trend Direction"
      images={[
        "/learn/advanced/ma/1.webp",
        "/learn/advanced/ma/2.webp",
        "/learn/advanced/ma/3.webp",
        "/learn/advanced/ma/4.webp",
      ]}
      questions={[
        "Why does TradeNestX use MA 7, 25, and 99?",
        "Why is trend direction important?",
        "What is a transition market?",
        "How does the simulator determine trend?",
      ]}
    />
  );
}