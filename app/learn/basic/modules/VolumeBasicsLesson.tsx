"use client";

import BasicLessonLayout from "../components/BasicLessonLayout";

type VolumeBasicsLessonProps = {
  isCompleted: boolean;
  onComplete: () => void;
};

export default function VolumeBasicsLesson({
  isCompleted,
  onComplete,
}: VolumeBasicsLessonProps) {
  return (
    <BasicLessonLayout
      lessonId="volume"
      title="Volume Basics"
      description="Learn how trading volume measures market activity, how it relates to price movement, and how traders use it to evaluate the strength and reliability of market developments."

      isCompleted={isCompleted}
      onComplete={onComplete}

      sections={[
        {
          label: "Market Participation",
          heading: "Understanding Trading Volume",
          image: "/learn/volume/volume-basics.webp",
          imageAlt: "Understanding trading volume on a chart",
          paragraphs: [
            "Trading volume measures the quantity of an asset traded during a specific period.",
            "In the stock market, volume typically represents the number of shares traded. In cryptocurrency markets, it may represent the quantity of cryptocurrency traded or its equivalent monetary value. In futures markets, volume commonly represents the number of contracts traded.",
            "Volume is commonly displayed as vertical bars beneath the price chart. Each volume bar corresponds to a candlestick on the selected timeframe.",
            "A taller volume bar represents greater trading activity, while a shorter bar represents less trading activity.",
            "Every completed transaction involves both a buyer and a seller. Volume measures the amount traded, not the number of buyers compared with sellers.",
            "While price shows how the market moved, volume provides additional information about the level of activity behind that movement.",
          ],
          points: [
            {
              title: "Price",
              description:
                "Shows the direction and magnitude of market movement.",
              color: "#22d3ee",
            },
            {
              title: "Volume",
              description:
                "Shows the quantity of trading activity during that movement.",
              color: "#eab308",
            },
          ],
        },
        {
          label: "Relative Volume",
          heading: "High Volume vs Low Volume",
          image: "/learn/volume/high-vs-low-volume.webp",
          imageAlt: "Comparison of high and low trading volume",
          paragraphs: [
            "Volume is most useful when compared with previous trading activity in the same market.",
            "High volume occurs when trading activity is noticeably greater than its recent average. Low volume occurs when trading activity is below its recent average.",
            "Traders can identify changes in volume by comparing the height of recent volume bars with earlier bars on the same chart.",
            "High volume indicates increased trading activity, but it does not automatically indicate bullish or bearish conditions.",
            "Low volume indicates reduced trading activity, but it does not necessarily mean that price will stop moving.",
            "Volume should also be evaluated in relation to the trading session, timeframe, and exchange because normal activity can vary significantly.",
          ],
          points: [
            {
              title: "High Volume",
              description:
                "Indicates increased trading activity relative to recent periods.",
              color: "#22c55e",
            },
            {
              title: "Low Volume",
              description:
                "Indicates reduced trading activity relative to recent periods.",
              color: "#eab308",
            },
          ],
        },
        {
          label: "Price and Volume",
          heading: "Evaluating the Strength of Price Movement",
          image: "/learn/volume/volume-confirms-move.webp",
          imageAlt: "Using trading volume to evaluate price movement",
          paragraphs: [
            "Volume can help traders evaluate whether a price movement is accompanied by increasing or decreasing trading activity.",
            "When price rises alongside increasing volume, the upward movement is occurring with greater market activity.",
            "When price falls alongside increasing volume, the downward movement is also occurring with greater market activity.",
            "When price continues moving in one direction while volume gradually decreases, trading activity behind that movement may be weakening.",
            "However, declining volume does not automatically indicate an approaching reversal. Price can continue moving even when trading activity decreases.",
            "Traders should observe several completed candles and volume bars rather than relying on a single observation.",
          ],
          points: [
            {
              title: "Rising Price and Rising Volume",
              description:
                "An upward movement accompanied by increasing trading activity.",
              color: "#22c55e",
            },
            {
              title: "Falling Price and Rising Volume",
              description:
                "A downward movement accompanied by increasing trading activity.",
              color: "#ef4444",
            },
            {
              title: "Price Movement and Declining Volume",
              description:
                "A movement accompanied by decreasing trading activity that may require additional evaluation.",
              color: "#eab308",
            },
          ],
        },
        {
          label: "Market Confirmation",
          heading: "Volume During Breakouts and Breakdowns",
          image: "/learn/volume/volume-breakout.webp",
          imageAlt: "Trading volume during a market breakout",
          paragraphs: [
            "A breakout occurs when price moves above an established resistance area. A breakdown occurs when price moves below an established support area.",
            "Volume provides additional context when evaluating whether these movements are accompanied by increased market activity.",
            "A breakout accompanied by noticeably higher volume may indicate stronger participation in the movement.",
            "A breakout accompanied by low volume may require additional observation because trading activity has not increased significantly.",
            "Even high-volume breakouts can fail. Price may move beyond an important level before returning to its previous trading range.",
            "Traders should evaluate candle closes, subsequent price behavior, and volume together before reaching conclusions about a breakout or breakdown.",
          ],
          points: [
            {
              title: "Increased Volume",
              description:
                "Provides additional evidence of trading activity during a breakout or breakdown.",
              color: "#22c55e",
            },
            {
              title: "Reduced Volume",
              description:
                "May indicate that additional confirmation is necessary.",
              color: "#eab308",
            },
            {
              title: "Failed Breakout",
              description:
                "Can occur even when the initial movement is accompanied by high volume.",
              color: "#ef4444",
            },
          ],
        },
        {
          label: "Unusual Market Activity",
          heading: "Understanding Volume Spikes",
          image: "/learn/volume/volume-spike.webp",
          imageAlt: "Identifying unusual spikes in trading volume",
          paragraphs: [
            "A volume spike occurs when trading activity increases sharply compared with surrounding periods.",
            "Volume spikes appear as unusually tall bars on the volume indicator.",
            "They may occur during economic announcements, earnings releases, unexpected news, large transactions, or periods of forced liquidation.",
            "A volume spike accompanied by a large directional candle may indicate aggressive price movement.",
            "A volume spike accompanied by a small candle or long wicks may indicate substantial trading activity without sustained directional progress.",
            "The meaning of a volume spike depends on where it occurs and how price behaves afterward.",
            "A volume spike alone cannot establish whether a market will continue moving in the same direction or reverse.",
          ],
          points: [
            {
              title: "Directional Activity",
              description:
                "High volume accompanied by substantial price movement.",
              color: "#22d3ee",
            },
            {
              title: "Market Rejection",
              description:
                "High volume accompanied by price rejection or limited directional progress.",
              color: "#eab308",
            },
          ],
        },
        {
          label: "Practical Application",
          heading: "Reading Volume and Candlesticks Together",
          image: "/learn/volume/volume-and-candlesticks.webp",
          imageAlt: "Combining candlestick analysis with trading volume",
          paragraphs: [
            "Volume becomes more informative when interpreted alongside candlestick behavior and the surrounding market conditions.",
            "Begin by observing the direction, body size, and wicks of a completed candlestick.",
            "Compare its corresponding volume bar with recent completed volume bars on the same timeframe.",
            "A large candle accompanied by high volume indicates substantial price movement and increased trading activity.",
            "A small candle accompanied by high volume indicates substantial trading activity with limited net price movement.",
            "Volume bar colors commonly follow the direction of the corresponding candlestick. They do not necessarily represent separate buying and selling volume.",
            "Remember that the current candle's volume is still accumulating until the candle closes. Comparing an incomplete volume bar with completed bars can create misleading conclusions.",
            "Volume data may also represent activity from a specific exchange rather than the entire market.",
            "Use the TradeNestX simulator to compare price movements with their corresponding volume bars and observe how trading activity changes under different market conditions.",
            "The objective is to understand the relationship between price and market activity, not to use volume as an independent buy or sell signal.",
          ],
        },
      ]}

      questions={[
        "What is trading volume?",
        "Why does volume matter?",
        "What is high volume?",
        "What is low volume?",
        "How does volume help evaluate price movement?",
        "Why is volume important during breakouts?",
        "What does a volume spike mean?",
        "How can traders read volume and candlesticks together?",
      ]}
    />
  );
}