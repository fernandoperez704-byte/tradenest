"use client";

import BasicLessonLayout from "../components/BasicLessonLayout";

type ChartPatternsLessonProps = {
  isCompleted: boolean;
  onComplete: () => void;
};

export default function ChartPatternsLesson({
  isCompleted,
  onComplete,
}: ChartPatternsLessonProps) {
  return (
    <BasicLessonLayout
      lessonId="patterns"
      title="Chart Patterns"
      description="Learn how recurring price formations develop, how to identify potential continuation and reversal patterns, and how to evaluate their confirmation and failure."

      isCompleted={isCompleted}
      onComplete={onComplete}

      sections={[
        {
          label: "Pattern Fundamentals",
          heading: "Understanding Chart Patterns",
          image: "/learn/patterns/chart-patterns-basics.webp",
          imageAlt: "Common chart patterns formed through price movement",
          paragraphs: [
            "Chart patterns are recognizable formations created by price movement over time.",
            "Unlike individual candlestick formations, chart patterns develop across multiple candles and reflect broader changes in market behavior.",
            "Traders use chart patterns to organize price information and evaluate whether an existing trend may continue, weaken, or reverse.",
            "Chart patterns are generally classified as reversal patterns, continuation patterns, or formations that may resolve in either direction.",
            "The appearance of a recognizable shape does not automatically confirm a pattern.",
            "Traders should consider the preceding trend, the development of the formation, and how price behaves around its boundaries.",
            "Real market patterns rarely look as perfect as educational illustrations. Their proportions, duration, and price boundaries can vary considerably.",
          ],
          points: [
            {
              title: "Reversal Patterns",
              description:
                "Formations that may indicate a potential change in the direction of an existing trend.",
              color: "#a78bfa",
            },
            {
              title: "Continuation Patterns",
              description:
                "Formations that may develop during a temporary pause within an existing trend.",
              color: "#22d3ee",
            },
            {
              title: "Pattern Confirmation",
              description:
                "Additional price behavior that supports the interpretation of a developing formation.",
              color: "#eab308",
            },
          ],
        },
        {
          label: "Bearish Reversal Formation",
          heading: "Double Top Pattern",
          image: "/learn/patterns/double-top.webp",
          imageAlt: "Double top pattern with two peaks and a neckline",
          paragraphs: [
            "A double top is a potential bearish reversal pattern that commonly develops after an upward price movement.",
            "The formation begins when price reaches a high, declines temporarily, and then attempts to move upward again.",
            "The second upward attempt reaches approximately the same price area as the first peak but fails to establish sustained upward movement.",
            "The low between the two peaks creates a reference level commonly called the neckline.",
            "Two similar highs alone do not confirm a double top. The formation is traditionally considered confirmed when price breaks below the neckline.",
            "Traders can evaluate completed candles and subsequent price behavior to determine whether the breakdown is being sustained.",
            "If price instead moves above the two peaks and sustains higher prices, the potential bearish reversal interpretation may become invalid.",
          ],
          points: [
            {
              title: "First Peak",
              description:
                "The initial high established during the upward movement.",
              color: "#22d3ee",
            },
            {
              title: "Second Peak",
              description:
                "A subsequent attempt to advance that struggles around the previous high.",
              color: "#eab308",
            },
            {
              title: "Neckline Breakdown",
              description:
                "A move below the intervening low that supports the bearish reversal interpretation.",
              color: "#ef4444",
            },
          ],
        },
        {
          label: "Bullish Reversal Formation",
          heading: "Double Bottom Pattern",
          image: "/learn/patterns/double-bottom.webp",
          imageAlt: "Double bottom pattern with two lows and a neckline",
          paragraphs: [
            "A double bottom is a potential bullish reversal pattern that commonly develops after a downward price movement.",
            "The formation begins when price reaches a low, recovers temporarily, and then declines toward the previous low.",
            "The second downward attempt reaches approximately the same price area as the first low but fails to establish sustained downward movement.",
            "The high between the two lows creates the neckline of the formation.",
            "Two similar lows alone do not confirm a double bottom. The formation is traditionally considered confirmed when price breaks above the neckline.",
            "A sustained move above the neckline may provide evidence that the previous downward movement is weakening.",
            "If price instead moves below the two lows and sustains lower prices, the potential bullish reversal interpretation may become invalid.",
          ],
          points: [
            {
              title: "First Bottom",
              description:
                "The initial low established during the downward movement.",
              color: "#22d3ee",
            },
            {
              title: "Second Bottom",
              description:
                "A subsequent decline that struggles to sustain movement below the previous low.",
              color: "#eab308",
            },
            {
              title: "Neckline Breakout",
              description:
                "A move above the intervening high that supports the bullish reversal interpretation.",
              color: "#22c55e",
            },
          ],
        },
        {
          label: "Price Compression",
          heading: "Ascending Triangle Pattern",
          image: "/learn/patterns/ascending-triangle.webp",
          imageAlt: "Ascending triangle with horizontal resistance and rising lows",
          paragraphs: [
            "An ascending triangle develops when price repeatedly encounters a relatively horizontal upper boundary while establishing progressively higher lows.",
            "The rising lows indicate that downward price movements are becoming shallower as the formation develops.",
            "The distance between the upper and lower boundaries gradually decreases, creating a period of price compression.",
            "To identify an ascending triangle, look for multiple highs near a similar price area and a sequence of rising lows.",
            "A horizontal line can represent the upper boundary, while an ascending trend line can connect the developing lows.",
            "Ascending triangles are traditionally associated with a bullish bias, particularly when they develop during an existing upward trend.",
            "However, price can also break below the ascending boundary. The shape alone does not determine the direction of the eventual breakout.",
          ],
          points: [
            {
              title: "Horizontal Upper Boundary",
              description:
                "An area where upward price movements repeatedly encounter resistance.",
              color: "#ef4444",
            },
            {
              title: "Higher Lows",
              description:
                "Progressively higher reaction lows that create the ascending boundary.",
              color: "#22c55e",
            },
            {
              title: "Price Compression",
              description:
                "A narrowing price range as the two boundaries converge.",
              color: "#eab308",
            },
          ],
        },
        {
          label: "Price Compression",
          heading: "Descending Triangle Pattern",
          image: "/learn/patterns/descending-triangle.webp",
          imageAlt: "Descending triangle with horizontal support and falling highs",
          paragraphs: [
            "A descending triangle develops when price repeatedly encounters a relatively horizontal lower boundary while establishing progressively lower highs.",
            "The falling highs indicate that upward price recoveries are becoming smaller as the formation develops.",
            "The distance between the upper and lower boundaries gradually decreases, creating price compression.",
            "To identify a descending triangle, look for multiple lows near a similar price area and a sequence of declining highs.",
            "A horizontal line can represent the lower boundary, while a descending trend line can connect the developing highs.",
            "Descending triangles are traditionally associated with a bearish bias, particularly when they develop during an existing downward trend.",
            "However, price can also break above the descending boundary. Traders should evaluate the actual resolution rather than assuming that a breakdown must occur.",
          ],
          points: [
            {
              title: "Horizontal Lower Boundary",
              description:
                "An area where downward price movements repeatedly encounter support.",
              color: "#22c55e",
            },
            {
              title: "Lower Highs",
              description:
                "Progressively lower reaction highs that create the descending boundary.",
              color: "#ef4444",
            },
            {
              title: "Pattern Resolution",
              description:
                "Price eventually moves beyond one of the developing boundaries.",
              color: "#eab308",
            },
          ],
        },
        {
          label: "Trend Reversal Formation",
          heading: "Head and Shoulders Pattern",
          image: "/learn/patterns/head-and-shoulders.webp",
          imageAlt: "Head and shoulders pattern showing three peaks and a neckline",
          paragraphs: [
            "A head and shoulders pattern is a potential bearish reversal formation that commonly develops after an upward trend.",
            "The formation consists of three major peaks, with the middle peak extending above the two surrounding peaks.",
            "The first peak forms the left shoulder. Price then declines before advancing to a higher peak known as the head.",
            "After another decline, price attempts to recover but establishes a lower peak known as the right shoulder.",
            "The reaction lows between the three peaks form the neckline, which may be horizontal or sloped.",
            "The lower right shoulder may indicate that the market is struggling to maintain its previous upward progression.",
            "The pattern is traditionally considered confirmed when price breaks below the neckline.",
            "An inverse head and shoulders is the opposite formation, consisting of three lows with the middle low extending below the surrounding lows. It may indicate a potential bullish reversal after a downward trend.",
            "Neither formation guarantees a reversal, and both can fail even after an initial neckline break.",
          ],
          points: [
            {
              title: "Left Shoulder",
              description:
                "The first major peak before the formation of the head.",
              color: "#22d3ee",
            },
            {
              title: "Head",
              description:
                "The highest peak within the standard head and shoulders formation.",
              color: "#a78bfa",
            },
            {
              title: "Right Shoulder",
              description:
                "A subsequent lower peak that may indicate weakening upward progression.",
              color: "#eab308",
            },
            {
              title: "Neckline",
              description:
                "The boundary connecting the reaction lows between the peaks.",
              color: "#ef4444",
            },
          ],
        },
        {
          label: "Pattern Reliability",
          heading: "Confirmation, Failure, and Invalidation",
          paragraphs: [
            "A developing chart pattern represents a possible interpretation of market behavior rather than a confirmed outcome.",
            "Traders should distinguish between recognizing a potential formation and observing evidence that the formation has resolved.",
            "A pattern may appear complete visually while price remains within its original boundaries.",
            "Completed candle closes beyond important pattern boundaries can provide additional evidence of confirmation.",
            "Trading volume and subsequent price behavior can help traders evaluate whether the movement is being sustained.",
            "A pattern can fail when price moves beyond a boundary but subsequently returns inside the formation.",
            "Invalidation occurs when market behavior no longer supports the original interpretation of the pattern.",
            "Some traders estimate potential price objectives by projecting the height of a completed formation from its breakout or breakdown area.",
            "These measured objectives are estimates, not guaranteed destinations. Price may reverse before reaching them or continue significantly beyond them.",
            "Confirmation reduces some uncertainty but does not eliminate the possibility of pattern failure.",
          ],
          points: [
            {
              title: "Developing Pattern",
              description:
                "A recognizable formation that has not yet resolved beyond its relevant boundaries.",
              color: "#eab308",
            },
            {
              title: "Confirmed Pattern",
              description:
                "A formation whose subsequent price behavior supports its traditional interpretation.",
              color: "#22c55e",
            },
            {
              title: "Failed Pattern",
              description:
                "A formation whose subsequent price behavior contradicts its expected development.",
              color: "#ef4444",
            },
            {
              title: "Measured Objective",
              description:
                "An estimated price projection based on the dimensions of a formation, not a guaranteed target.",
              color: "#a78bfa",
            },
          ],
        },
        {
          label: "Practical Application",
          heading: "Identifying Chart Patterns in TradeNestX",
          paragraphs: [
            "Begin by examining the direction of price before the potential pattern started developing.",
            "Identify the important reaction highs and lows that define the formation.",
            "Use the horizontal line tool in the TradeNestX simulator to mark necklines and horizontal pattern boundaries.",
            "Use the trend line tool to connect rising lows or falling highs when examining triangle formations.",
            "Avoid forcing lines to fit a pattern when the underlying price movement does not support the formation.",
            "Compare the developing pattern with the broader market direction and nearby important price zones.",
            "Observe whether completed candles sustain movement beyond the relevant pattern boundary.",
            "Identify what subsequent price behavior would invalidate your original interpretation.",
            "Practice recognizing both successful and failed formations to understand how chart patterns behave under different market conditions.",
            "The objective is not to memorize shapes or predict every market movement. It is to understand how recurring formations reflect changes in price behavior and how those changes can support informed trading decisions.",
          ],
          points: [
            {
              title: "Identify the Formation",
              description:
                "Recognize the important highs, lows, and boundaries that define the pattern.",
              color: "#22d3ee",
            },
            {
              title: "Evaluate the Context",
              description:
                "Consider the preceding trend and surrounding market conditions.",
              color: "#a78bfa",
            },
            {
              title: "Observe the Resolution",
              description:
                "Evaluate whether subsequent price behavior confirms or invalidates the formation.",
              color: "#eab308",
            },
          ],
        },
      ]}

      questions={[
        "What is a chart pattern?",
        "What is a double top pattern?",
        "What is a double bottom pattern?",
        "How do traders identify an ascending triangle?",
        "How do traders identify a descending triangle?",
        "What is a head and shoulders pattern?",
        "How do traders confirm a chart pattern?",
        "Why do chart patterns sometimes fail?",
      ]}
    />
  );
}