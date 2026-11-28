"use client";

import BasicLessonLayout from "../components/BasicLessonLayout";

type MarketLimitOrdersLessonProps = {
  isCompleted: boolean;
  onComplete: () => void;
};

export default function MarketLimitOrdersLesson({
  isCompleted,
  onComplete,
}: MarketLimitOrdersLessonProps) {
  return (
    <BasicLessonLayout
      lessonId="orders"
      title="Market vs Limit Orders"
      description="Learn how trading orders work, how execution affects your trades, and the differences between prioritizing speed and controlling price."

      isCompleted={isCompleted}
      onComplete={onComplete}

      sections={[
        {
          label: "Order Execution",
          heading: "Understanding Market Orders",
          image: "/learn/orders/market-order.webp",
          imageAlt: "How a market order works",
          paragraphs: [
            "A market order is an instruction to buy or sell an asset immediately at the best available prices.",
            "Market orders prioritize execution speed rather than control over the exact execution price.",
            "For example, if an asset is trading near $100, a market buy order may execute at $100 or a different price depending on available liquidity and current market conditions.",
            "The difference between the expected execution price and the actual execution price is known as slippage.",
            "Market orders can be useful when immediate execution is important, but traders should understand that the displayed market price is not a guaranteed execution price.",
          ],
        },
        {
          label: "Price Control",
          heading: "Understanding Limit Orders",
          image: "/learn/orders/limit-order.webp",
          imageAlt: "How a limit order works",
          paragraphs: [
            "A limit order allows traders to specify the maximum price they are willing to pay when buying or the minimum price they are willing to accept when selling.",
            "For example, if an asset is trading at $100, a trader may place a buy limit order at $95. The order can only execute at $95 or lower.",
            "Similarly, a sell limit order placed at $105 can only execute at $105 or higher.",
            "Limit orders provide greater control over execution price, but they do not guarantee execution.",
            "Even when the market reaches the specified price, an order may remain unfilled or only partially filled because of available liquidity and order priority.",
          ],
        },
        {
          label: "Order Comparison",
          heading: "Market Orders vs Limit Orders",
          image: "/learn/orders/market-vs-limit.webp",
          imageAlt: "Comparison of market and limit orders",
          paragraphs: [
            "The main difference between market and limit orders is what each order prioritizes.",
            "Market orders prioritize immediate execution, while limit orders prioritize control over execution price.",
            "Neither order type is universally better. Their usefulness depends on the trader's objectives, market conditions, and execution requirements.",
            "Understanding these differences helps traders choose an appropriate order type instead of entering or exiting positions without considering execution risk.",
          ],
          points: [
            {
              title: "Market Order",
              description:
                "Prioritizes execution speed but does not guarantee a specific price.",
              color: "#22d3ee",
            },
            {
              title: "Limit Order",
              description:
                "Controls the acceptable execution price but does not guarantee a fill.",
              color: "#22c55e",
            },
          ],
        },
        {
          label: "Practical Application",
          heading: "Execution Speed vs Price Precision",
          image: "/learn/orders/speed-vs-precision.webp",
          imageAlt: "Execution speed versus price precision",
          paragraphs: [
            "A well-planned trade involves more than identifying a potential entry or exit. Traders must also consider how their orders will execute.",
            "During periods of high volatility or limited liquidity, market orders may execute at prices significantly different from what traders expect.",
            "Limit orders can help traders maintain planned entry and exit prices, but the market may move away before those orders execute.",
            "Traders should avoid chasing price simply because a planned limit order was not filled.",
            "Practicing both order types in a trading simulator can help develop an understanding of execution, patience, and price control before risking real capital.",
          ],
        },
      ]}

      questions={[
        "What is a market order?",
        "What is a limit order?",
        "Which order is safer?",
        "Why do traders use limit orders?",
        "What is slippage?",
        "Why might a limit order not execute?",
        "What is a partial fill?",
        "How does volatility affect order execution?",
      ]}
    />
  );
}