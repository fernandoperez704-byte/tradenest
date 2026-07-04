"use client";

import AdvancedLessonLayout from "../components/AdvancedLessonLayout";

export default function RsiMomentumLesson() {
  return (
    <AdvancedLessonLayout
      title="RSI & Momentum"
      images={[
        "/learn/advanced/rsi/1.webp",
        "/learn/advanced/rsi/2.webp",
        "/learn/advanced/rsi/3.webp",
        "/learn/advanced/rsi/4.webp",
      ]}
      questions={[
        "Why is RSI not a buy or sell signal?",
        "What does overbought mean?",
        "What does oversold mean?",
        "How does TradeNestX use RSI and momentum?",
      ]}
    />
  );
}