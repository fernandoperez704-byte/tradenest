"use client";

import BasicLessonLayout from "../components/BasicLessonLayout";

type HowMarketWorksLessonProps = {
  isCompleted: boolean;
  onComplete: () => void;
};

export default function HowMarketWorksLesson({
  isCompleted,
  onComplete,
}: HowMarketWorksLessonProps) {
  return (
    <BasicLessonLayout
      lessonId="market"
      title="How The Market Works"
      description="Understand how buyers, sellers, supply, demand, and changing market conditions influence price movements."

      isCompleted={isCompleted}
      onComplete={onComplete}

      sections={[
        {
          label: "Market Fundamentals",
          heading: "Understanding Price Movement",
          image: "/learn/market/how-market-works.webp",
          imageAlt: "How financial markets work",
          paragraphs: [
            "Financial markets bring buyers and sellers together to exchange assets at agreed prices.",
            "Prices change as market participants adjust their orders in response to information, expectations, opportunities, and risk.",
            "Every completed transaction involves both a buyer and a seller. Price direction depends on how aggressively participants trade against the available orders.",
            "Understanding these interactions helps traders interpret market behavior rather than simply reacting to rising or falling prices.",
          ],
        },
        {
          label: "Market Participants",
          heading: "Understanding Buyers",
          image: "/learn/market/buyers.webp",
          imageAlt: "Buying pressure in financial markets",
          paragraphs: [
            "Buyers enter the market for different reasons, including long-term investment, short-term speculation, and closing short positions.",
            "When aggressive buying consumes available sell orders, transactions may occur at progressively higher prices.",
            "On a chart, sustained upward movement and strong bullish candles may indicate increasing buying pressure.",
            "However, buying pressure can weaken at any time, and rising prices do not guarantee continued upward movement.",
          ],
        },
        {
          label: "Market Participants",
          heading: "Understanding Sellers",
          image: "/learn/market/sellers.webp",
          imageAlt: "Selling pressure in financial markets",
          paragraphs: [
            "Sellers may be taking profits, reducing exposure, protecting capital, or opening short positions where supported.",
            "When aggressive selling consumes available buy orders, transactions may occur at progressively lower prices.",
            "On a chart, sustained downward movement and strong bearish candles may indicate increasing selling pressure.",
            "However, falling prices can stabilize when sufficient buying interest becomes available.",
          ],
        },
        {
          label: "Market Interaction",
          heading: "Buying Pressure vs Selling Pressure",
          image: "/learn/market/buyers-vs-sellers.webp",
          imageAlt: "Comparison of buying and selling pressure",
          paragraphs: [
            "Buying and selling pressure continuously interact as market participants compete for favorable prices.",
            "When aggressive buying dominates available liquidity, prices may rise. When aggressive selling dominates, prices may fall.",
            "When neither side maintains enough pressure to move prices consistently, the market may trade sideways.",
            "Traders can observe these changes through price movement, but individual candles alone cannot reveal every participant's intentions.",
          ],
        },
        {
          label: "Price Formation",
          heading: "Understanding Supply",
          image: "/learn/market/supply.webp",
          imageAlt: "Supply in financial markets",
          paragraphs: [
            "Supply represents the quantity of an asset that participants are willing to sell at different prices.",
            "When substantial selling interest becomes available, upward price movement may slow or encounter resistance.",
            "Supply can change as investors adjust their expectations, take profits, or respond to economic developments.",
            "Understanding supply helps explain why prices may struggle to continue rising even when market sentiment appears positive.",
          ],
        },
        {
          label: "Price Formation",
          heading: "Understanding Demand",
          image: "/learn/market/demand.webp",
          imageAlt: "Demand in financial markets",
          paragraphs: [
            "Demand represents the quantity of an asset that participants are willing to purchase at different prices.",
            "When substantial buying interest becomes available, downward price movement may slow or stabilize.",
            "Demand can increase or decrease as expectations, economic conditions, and perceived opportunities change.",
            "Strong demand does not guarantee rising prices because available supply and market conditions can also change.",
          ],
        },
        {
          label: "Market Balance",
          heading: "How Supply and Demand Interact",
          image: "/learn/market/supply-vs-demand.webp",
          imageAlt: "Interaction between market supply and demand",
          paragraphs: [
            "Market prices continuously adjust as available supply and demand change.",
            "When buying interest increases relative to available supply, prices may rise. When selling interest increases relative to available demand, prices may fall.",
            "Periods of relative balance can produce sideways movement until market conditions change.",
            "Traders use this understanding to evaluate price behavior without assuming that any particular movement must continue.",
          ],
        },
        {
          label: "Market Conditions",
          heading: "Understanding Volatility",
          image: "/learn/market/volatility.webp",
          imageAlt: "Volatility and changing market conditions",
          paragraphs: [
            "Volatility describes how much prices fluctuate over a given period.",
            "Economic announcements, unexpected news, changing expectations, and limited liquidity can increase volatility.",
            "On a chart, larger candles, wider price ranges, and rapid fluctuations may indicate increased volatility.",
            "Higher volatility can create opportunities, but it also increases uncertainty, execution risk, and the potential for losses.",
            "Traders should consider current market conditions before deciding whether a trading opportunity fits their risk tolerance.",
          ],
        },
      ]}

      questions={[
        "Why do prices move?",
        "What is volatility?",
        "What is supply and demand?",
        "Why do markets panic?",
        "What causes buying pressure?",
        "What causes selling pressure?",
        "Why does the market sometimes move sideways?",
        "How does liquidity affect price movement?",
      ]}
    />
  );
}