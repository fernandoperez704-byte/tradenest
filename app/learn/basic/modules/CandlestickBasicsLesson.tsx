"use client";

import BasicLessonLayout from "../components/BasicLessonLayout";

type CandlestickBasicsLessonProps = {
  isCompleted: boolean;
  onComplete: () => void;
};

export default function CandlestickBasicsLesson({
  isCompleted,
  onComplete,
}: CandlestickBasicsLessonProps) {
  return (
    <BasicLessonLayout
      lessonId="candlesticks"
      title="Candlestick Basics"
      description="Learn how to read candlesticks, interpret price movement, recognize market pressure, and understand the information behind each candle."

      isCompleted={isCompleted}
      onComplete={onComplete}

      sections={[
        {
          label: "Price Action",
          heading: "Understanding Candlesticks",
          image: "/learn/candlesticks/candlestick-basics.webp",
          imageAlt: "The anatomy of a trading candlestick",
          paragraphs: [
            "A candlestick is a visual representation of price movement during a specific period of time.",
            "Every candlestick contains four important prices: the opening price, the highest price, the lowest price, and the closing price.",
            "The rectangular portion of the candle is called the body. The thin lines extending above and below the body are called wicks.",
            "The body represents the distance between the opening and closing prices, while the wicks show how far price traveled beyond those levels.",
            "Understanding these four prices allows traders to interpret market behavior instead of simply watching price move up and down.",
          ],
          points: [
            {
              title: "Open",
              description:
                "The first traded price during the candle's time period.",
              color: "#22d3ee",
            },
            {
              title: "High",
              description:
                "The highest traded price during the candle's time period.",
              color: "#22c55e",
            },
            {
              title: "Low",
              description:
                "The lowest traded price during the candle's time period.",
              color: "#ef4444",
            },
            {
              title: "Close",
              description:
                "The final traded price when the candle's time period ends.",
              color: "#eab308",
            },
          ],
        },
        {
          label: "Candle Direction",
          heading: "Bullish vs Bearish Candlesticks",
          image: "/learn/candlesticks/bullish-vs-bearish-candle.webp",
          imageAlt: "Comparison of bullish and bearish candlesticks",
          paragraphs: [
            "A bullish candlestick forms when the closing price is higher than the opening price. It is commonly displayed in green.",
            "A bearish candlestick forms when the closing price is lower than the opening price. It is commonly displayed in red.",
            "On a bullish candle, the bottom of the body represents the opening price and the top represents the closing price.",
            "On a bearish candle, the top of the body represents the opening price and the bottom represents the closing price.",
            "A single bullish candle does not establish a bullish trend, just as a single bearish candle does not establish a bearish trend.",
            "Traders should interpret candle direction within the context of surrounding price movement.",
          ],
          points: [
            {
              title: "Bullish Candle",
              description:
                "Price closed above its opening price.",
              color: "#22c55e",
            },
            {
              title: "Bearish Candle",
              description:
                "Price closed below its opening price.",
              color: "#ef4444",
            },
          ],
        },
        {
          label: "Candle Strength",
          heading: "Large Bodies vs Small Bodies",
          image: "/learn/candlesticks/big-body-vs-small-body.webp",
          imageAlt: "Comparison of large and small candlestick bodies",
          paragraphs: [
            "The size of a candlestick body shows how far price moved between its opening and closing prices.",
            "A large bullish body indicates substantial upward price movement during that period, while a large bearish body indicates substantial downward movement.",
            "A small body indicates that price closed relatively close to where it opened.",
            "Small bodies may appear during consolidation, uncertainty, or periods when directional movement is limited.",
            "Compare candle bodies with nearby candles on the same timeframe to determine whether the current movement is unusually strong or weak.",
            "Body size alone does not reveal trading volume or guarantee that price will continue moving in the same direction.",
          ],
        },
        {
          label: "Price Rejection",
          heading: "Understanding Candlestick Wicks",
          image: "/learn/candlesticks/long-wick-rejection.webp",
          imageAlt: "Upper and lower candlestick wick rejection",
          paragraphs: [
            "Candlestick wicks reveal price levels that were reached during a period but were not maintained at the close.",
            "A long upper wick shows that price moved higher before returning toward the candle's body.",
            "A long lower wick shows that price moved lower before recovering toward the candle's body.",
            "These movements may indicate rejection of higher or lower prices, particularly when they occur near important market levels.",
            "Traders should examine where the wick appears, how the candle closes, and how subsequent candles behave.",
            "A long wick does not automatically confirm a reversal. It may also represent temporary volatility or a brief reaction within an existing trend.",
          ],
          points: [
            {
              title: "Upper Wick",
              description:
                "Shows how far price traded above the candle body.",
              color: "#ef4444",
            },
            {
              title: "Lower Wick",
              description:
                "Shows how far price traded below the candle body.",
              color: "#22c55e",
            },
          ],
        },
        {
          label: "Candle Recognition",
          heading: "Common Candlestick Formations",
          image: "/learn/candlesticks/common-candlesticks.webp",
          imageAlt: "Examples of common candlestick formations",
          paragraphs: [
            "Candlesticks can form recognizable shapes based on the relationship between their bodies and wicks.",
            "A doji forms when the opening and closing prices are equal or nearly equal, indicating limited net directional movement.",
            "A hammer typically has a small body near the upper end of its range and a long lower wick. After a decline, it may suggest rejection of lower prices.",
            "A shooting star typically has a small body near the lower end of its range and a long upper wick. After an advance, it may suggest rejection of higher prices.",
            "The meaning of a candlestick formation depends on its location within the market and the price movement surrounding it.",
            "Recognizing a candle formation is not the same as confirming a trading opportunity.",
          ],
          points: [
            {
              title: "Doji",
              description:
                "Opening and closing prices are nearly equal.",
              color: "#eab308",
            },
            {
              title: "Hammer",
              description:
                "Potential lower-price rejection following a decline.",
              color: "#22c55e",
            },
            {
              title: "Shooting Star",
              description:
                "Potential higher-price rejection following an advance.",
              color: "#ef4444",
            },
          ],
        },
        {
          label: "Practical Application",
          heading: "Reading Candlesticks Together",
          image: "/learn/candlesticks/candles-tell-a-story.webp",
          imageAlt: "Interpreting a sequence of trading candlesticks",
          paragraphs: [
            "Individual candlesticks provide information about a specific period, but a sequence of candles provides a broader view of market behavior.",
            "Several candles with expanding bullish bodies may indicate strengthening upward momentum. Expanding bearish bodies may indicate strengthening downward momentum.",
            "When candle bodies become smaller or rejection wicks become more noticeable, directional momentum may be weakening.",
            "Traders should observe whether price continues advancing, begins consolidating, or struggles to maintain recent gains or losses.",
            "An active candle can change its appearance before its time period ends. Waiting for a candle to close provides a completed record of that period's price movement.",
            "Use the TradeNestX simulator to observe completed candlesticks, compare their bodies and wicks, and study how price behaves across multiple candles.",
            "Candlesticks help traders interpret market behavior, but they should never be treated as guaranteed buy or sell signals.",
          ],
        },
      ]}

      questions={[
        "What is a candlestick?",
        "What is a bullish candle?",
        "What is a bearish candle?",
        "What does a long wick mean?",
        "What does the size of a candle body tell us?",
        "What is a doji candlestick?",
        "Why should traders wait for a candle to close?",
        "Why is one candlestick not enough to confirm a reversal?",
      ]}
    />
  );
}