"use client";

import AdvancedLessonLayout from "../components/AdvancedLessonLayout";

export default function MovingAverageLesson() {
  return (
    <AdvancedLessonLayout
      title="Moving Averages & Trend Direction"
      description="Learn how moving averages help traders interpret price behavior, identify trends, and recognize changes in market momentum."

      sections={[
        {
          label: "Understanding Moving Averages",
          heading: "MA 7, MA 25 and MA 99",
          image: "/learn/advanced/ma/moving-averages.png",
          imageAlt: "TradeNestX chart showing MA 7, MA 25 and MA 99",
          paragraphs: [
            "A Simple Moving Average (SMA) is calculated by adding the closing prices of a selected number of candles and dividing the total by that number. This smooths price fluctuations and makes market trends easier to recognize.",

            "Moving average periods depend on the selected timeframe. For example, MA 7 on a 4-hour chart represents seven 4-hour candles, covering 28 hours in a continuously traded market, while MA 7 on a daily chart covers seven daily candles.",

            "When price trades above a moving average, it is trading above its recent average closing price. When price trades below a moving average, it is trading below that average. Comparing price with multiple moving averages helps traders evaluate short-term momentum and broader market conditions.",

            "Moving averages are lagging indicators because they use historical prices. They reflect existing market behavior rather than predict future price movements. Price moving above or below a moving average does not independently confirm a change in trend.",
          ],
          points: [
            {
              title: "MA 7",
              color: "#eab308",
              description:
                "The average closing price over 7 candles. It responds quickly to price changes and reflects short-term momentum.",
            },
            {
              title: "MA 25",
              color: "#38bdf8",
              description:
                "The average closing price over 25 candles. It filters short-term fluctuations and provides intermediate trend direction.",
            },
            {
              title: "MA 99",
              color: "#a78bfa",
              description:
                "The average closing price over 99 candles. It responds more gradually and provides a broader perspective on market direction.",
            },
          ],
          caption:
            "Compare how each moving average responds to the same price movements. Shorter periods are more sensitive, while longer periods produce smoother lines.",
        },

        {
          label: "Bullish Trend",
          heading: "Recognizing Bullish Alignment",
          image: "/learn/advanced/ma/bullish-alignment.png",
          imageAlt: "TradeNestX chart showing bullish moving average alignment",
          paragraphs: [
            "In the highlighted area, MA 7 is above MA 25, and MA 25 is above MA 99. This indicates that recent average prices are higher than longer-term averages, creating bullish alignment.",

            "Notice how MA 7 and MA 25 slope upward and separate from MA 99 as price advances. The increasing separation reflects stronger recent price performance.",

            "Bullish alignment becomes more meaningful when supported by higher highs and higher lows in the market structure. Temporary pullbacks can still occur within an established uptrend.",

            "During an uptrend, moving averages may act as dynamic support, where price temporarily pulls back before recovering. Traders can observe price reactions around these averages to evaluate whether the trend remains healthy. Moving averages are potential reaction areas, not guaranteed support levels.",
          ],
        },

        {
          label: "Bearish Trend",
          heading: "Recognizing Bearish Alignment",
          image: "/learn/advanced/ma/bearish-alignment.png",
          imageAlt: "TradeNestX chart showing bearish moving average alignment",
          paragraphs: [
            "In the highlighted area, MA 7 is below MA 25, and MA 25 is below MA 99. Recent average prices are lower than longer-term averages, creating bearish alignment.",

            "Notice how MA 7 and MA 25 slope downward while MA 99 remains relatively flat. This reflects weakening short-term and intermediate market conditions.",

            "Bearish alignment becomes more meaningful when supported by lower highs and lower lows in the market structure. Although price begins consolidating near the bottom, a temporary recovery does not necessarily indicate that the broader downtrend has ended.",

            "During a downtrend, moving averages may act as dynamic resistance, where temporary price recoveries encounter resistance before declining again. Traders can observe these reactions to evaluate whether bearish conditions remain intact. Moving averages are potential reaction areas, not guaranteed resistance levels.",
          ],
        },

        {
          label: "Market Transition",
          heading: "Recognizing Changing Market Conditions",
          image: "/learn/advanced/ma/market-transition.png",
          imageAlt: "TradeNestX chart showing a weakening bullish trend and moving average crossovers",
          paragraphs: [
            "In the highlighted area, the previously bullish alignment begins to weaken as price moves lower and the moving averages converge.",

            "MA 7 crosses below MA 25, reflecting short-term weakness, while MA 25 begins sloping downward. MA 99 continues rising, creating mixed alignment rather than a fully established bearish trend.",

            "Convergence, flattening slopes, and crossovers can indicate weakening momentum, consolidation, or a potential change in market direction.",

            "During sideways markets, moving averages may flatten, overlap, and repeatedly cross one another as price fluctuates within a range. These conditions can produce misleading indications of trend changes. Recognizing this behavior helps traders avoid interpreting every crossover as the beginning of a new trend.",

            "A moving average crossover alone does not confirm a reversal. Traders should evaluate market structure, support and resistance, and higher timeframe conditions before drawing conclusions.",
          ],
        },
      ]}

      questions={[
        "Why does TradeNestX use MA 7, 25, and 99?",
        "How is a Simple Moving Average calculated?",
        "How do timeframes affect moving averages?",
        "How do I interpret price above or below moving averages?",
        "How do I identify bullish and bearish moving average alignment?",
        "How can moving averages act as dynamic support and resistance?",
        "How do I recognize a weakening trend using moving averages?",
        "Why can moving average crossovers be misleading?",
      ]}
    />
  );
}