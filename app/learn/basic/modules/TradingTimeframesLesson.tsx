"use client";

import BasicLessonLayout from "../components/BasicLessonLayout";

type TradingTimeframesLessonProps = {
  isCompleted: boolean;
  onComplete: () => void;
};

export default function TradingTimeframesLesson({
  isCompleted,
  onComplete,
}: TradingTimeframesLessonProps) {
  return (
    <BasicLessonLayout
      lessonId="timeframes"
      title="Trading Timeframes"
      description="Learn how trading timeframes represent price movement, how different timeframes influence market interpretation, and how traders combine them to understand the bigger picture."

      isCompleted={isCompleted}
      onComplete={onComplete}

      sections={[
        {
          label: "Chart Fundamentals",
          heading: "Understanding Trading Timeframes",
          image: "/learn/timeframes/trading-timeframes.webp",
          imageAlt: "Understanding different trading timeframes",
          paragraphs: [
            "A trading timeframe determines how much time each candlestick represents on a chart.",
            "On a 1-minute chart, each candle represents one minute of price movement. On a 4-hour chart, each candle represents four hours of price movement.",
            "Changing the timeframe does not change the underlying market price. It changes how price movement is grouped and displayed.",
            "Different timeframes allow traders to examine immediate price behavior or broader market developments.",
            "Understanding timeframes is essential because the same market can appear very different depending on the period being analyzed.",
          ],
          points: [
            {
              title: "Lower Timeframes",
              description:
                "Display shorter periods of price movement in greater detail.",
              color: "#eab308",
            },
            {
              title: "Higher Timeframes",
              description:
                "Display broader price movements over longer periods.",
              color: "#22d3ee",
            },
          ],
        },
        {
          label: "Timeframe Comparison",
          heading: "The 1-Minute Chart vs the 1-Hour Chart",
          image: "/learn/timeframes/1m-vs-1h.webp",
          imageAlt: "Comparison of one-minute and one-hour charts",
          paragraphs: [
            "A 1-hour candlestick summarizes the price movement represented by sixty 1-minute intervals.",
            "The hourly candle displays the opening price, highest price, lowest price, and closing price of that entire hour.",
            "A 1-minute chart reveals the individual price fluctuations that occurred within the same period.",
            "A market may experience several short-term declines on the 1-minute chart while still closing higher on the 1-hour chart.",
            "Neither chart is incorrect. Each provides a different level of detail about the same market.",
          ],
        },
        {
          label: "Trading Styles",
          heading: "Matching Timeframes to Trading Objectives",
          image: "/learn/timeframes/scalping-vs-swing.webp",
          imageAlt: "Timeframe differences between scalping and swing trading",
          paragraphs: [
            "Traders select timeframes according to their trading objectives, available time, and expected position duration.",
            "Scalpers typically focus on small price movements and may hold positions for seconds or minutes.",
            "Day traders generally open and close positions within the same trading day.",
            "Swing traders attempt to participate in broader price movements that may develop over several days or weeks.",
            "Long-term investors generally focus on larger market developments over months or years.",
            "There is no universally best timeframe. The appropriate choice depends on the trader's objectives, experience, and risk management approach.",
          ],
          points: [
            {
              title: "Scalping",
              description:
                "Commonly uses 1-minute and 5-minute charts.",
              color: "#eab308",
            },
            {
              title: "Day Trading",
              description:
                "Commonly uses 5-minute, 15-minute, and 1-hour charts.",
              color: "#22d3ee",
            },
            {
              title: "Swing Trading",
              description:
                "Commonly uses 4-hour and daily charts.",
              color: "#22c55e",
            },
            {
              title: "Long-Term Investing",
              description:
                "Commonly uses daily, weekly, and monthly charts.",
              color: "#a78bfa",
            },
          ],
        },
        {
          label: "Price Fluctuations",
          heading: "Understanding Market Noise",
          image: "/learn/timeframes/market-noise.webp",
          imageAlt: "Market noise across different trading timeframes",
          paragraphs: [
            "Market noise refers to short-term price fluctuations that may not represent a meaningful change in the broader market direction.",
            "Lower timeframes display more individual fluctuations because price movement is divided into smaller periods.",
            "A sudden decline on a 1-minute chart may appear significant but represent only a small fluctuation within a 4-hour candle.",
            "Traders can compare the same market across multiple timeframes to determine whether a movement is isolated or part of a broader development.",
            "Higher timeframes reduce the visibility of smaller fluctuations, but they do not eliminate uncertainty or guarantee more accurate predictions.",
          ],
        },
        {
          label: "Market Perspective",
          heading: "Understanding Higher-Timeframe Direction",
          image: "/learn/timeframes/higher-timeframe-trend.webp",
          imageAlt: "Identifying broader market direction on higher timeframes",
          paragraphs: [
            "Higher timeframes help traders observe broader price movements without focusing exclusively on immediate fluctuations.",
            "A market may be moving higher on the daily chart while experiencing a temporary decline on the 15-minute chart.",
            "Similarly, a short-term recovery may develop while the broader market continues moving lower.",
            "Traders should identify which timeframe they are describing before drawing conclusions about market direction.",
            "A short-term change does not necessarily invalidate the broader direction, but persistent changes may eventually influence higher-timeframe behavior.",
            "Higher-timeframe analysis provides context rather than certainty about future price movement.",
          ],
        },
        {
          label: "Decision Making",
          heading: "The Challenges of Lower Timeframes",
          image: "/learn/timeframes/lower-timeframe-stress.webp",
          imageAlt: "Challenges associated with lower-timeframe trading",
          paragraphs: [
            "Lower timeframes produce new candles more frequently, requiring traders to process information and make decisions more quickly.",
            "Frequent price fluctuations can create a sense of urgency and encourage impulsive decisions.",
            "Shorter-duration trading may also increase the relative impact of transaction fees, spreads, and slippage.",
            "Beginners may find it easier to study higher timeframes because they provide more time to evaluate developing market conditions.",
            "However, higher timeframes can require greater patience and may involve wider price movements.",
            "The timeframe should support the trader's decision-making process rather than encourage unnecessary activity.",
          ],
        },
        {
          label: "Multi-Timeframe Analysis",
          heading: "Combining Different Timeframes",
          image: "/learn/timeframes/multi-timeframe-analysis.webp",
          imageAlt: "Using multiple timeframes to analyze the same market",
          paragraphs: [
            "Multi-timeframe analysis involves examining the same market across different chart periods.",
            "Traders often begin with a higher timeframe to understand broader market conditions before examining lower timeframes for additional detail.",
            "For example, a trader may examine the daily chart for overall direction, the 4-hour chart for developing price movements, and the 15-minute chart for short-term behavior.",
            "When timeframes disagree, traders should recognize that each may be describing a different stage of the same market movement.",
            "Agreement between timeframes can provide additional context, but it does not guarantee that price will continue in a particular direction.",
            "Using too many timeframes can also create conflicting interpretations and unnecessary complexity.",
          ],
          points: [
            {
              title: "Daily Chart",
              description:
                "Provides a broader view of market direction.",
              color: "#22d3ee",
            },
            {
              title: "4-Hour Chart",
              description:
                "Helps evaluate developing movements within the broader market.",
              color: "#22c55e",
            },
            {
              title: "15-Minute Chart",
              description:
                "Provides additional detail about short-term price behavior.",
              color: "#eab308",
            },
          ],
        },
        {
          label: "Practical Application",
          heading: "Building a Timeframe Analysis Routine",
          image: "/learn/timeframes/timeframe-ladder.webp",
          imageAlt: "A structured approach to analyzing trading timeframes",
          paragraphs: [
            "A consistent timeframe analysis routine helps traders organize market information before making decisions.",
            "Begin by selecting a higher timeframe that provides relevant context for your trading objectives.",
            "Move to an intermediate timeframe to examine how current price movement relates to the broader direction.",
            "Use a lower timeframe when additional detail is necessary.",
            "Avoid switching timeframes simply to find information that supports an existing trading decision.",
            "Use the TradeNestX simulator to examine the same asset across multiple timeframes and compare how its candlesticks and price movements appear.",
            "The objective is to understand the relationship between short-term movements and broader market behavior, not to predict every price fluctuation.",
          ],
        },
      ]}

      questions={[
        "What is a trading timeframe?",
        "Why do timeframes matter?",
        "Which timeframe is best for beginners?",
        "Why do lower timeframes feel stressful?",
        "What is market noise?",
        "Why can different timeframes show different market directions?",
        "What is multi-timeframe analysis?",
        "How can traders combine higher and lower timeframes?",
      ]}
    />
  );
}