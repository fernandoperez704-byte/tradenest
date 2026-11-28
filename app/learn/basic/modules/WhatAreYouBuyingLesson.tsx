"use client";

import BasicLessonLayout from "../components/BasicLessonLayout";

type WhatAreYouBuyingLessonProps = {
  isCompleted: boolean;
  onComplete: () => void;
};

export default function WhatAreYouBuyingLesson({
  isCompleted,
  onComplete,
}: WhatAreYouBuyingLessonProps) {
  return (
    <BasicLessonLayout
      lessonId="buying"
      title="What Are You Buying?"
      description="Understand the different financial assets and instruments available to traders, what they represent, and how their risks differ."

      isCompleted={isCompleted}
      onComplete={onComplete}

      sections={[
        {
          label: "Understanding Financial Markets",
          heading: "Know What You Are Trading",
          image: "/learn/markets/what-are-you-buying.png",
          imageAlt: "Overview of different financial markets",
          paragraphs: [
            "Before learning charts, indicators, or trading strategies, you need to understand what you are actually buying or trading.",

            "Financial markets include stocks, cryptocurrencies, currencies, indices, futures, and options. Although their charts may look similar, these instruments represent different things and carry different risks.",

            "Some instruments provide direct ownership of an asset, while others provide exposure to its price through a financial contract.",

            "Understanding these differences helps traders evaluate risk, choose appropriate markets, and avoid trading instruments they do not fully understand.",
          ],
        },

        {
          label: "Stocks",
          heading: "Owning Part of a Company",
          image: "/learn/markets/stocks.png",
          imageAlt: "Introduction to stock trading",
          paragraphs: [
            "A stock represents a share of ownership in a company. When you purchase shares, you become a shareholder in that company.",

            "Stock prices can change based on company earnings, business performance, economic conditions, news, and investor expectations.",

            "Some companies distribute a portion of their earnings to shareholders through dividends, although dividends are not guaranteed.",

            "Before trading a stock, understand the company behind its ticker symbol and the factors that may influence its value.",
          ],
        },

        {
          label: "Cryptocurrency",
          heading: "Trading Digital Assets",
          image: "/learn/markets/crypto.png",
          imageAlt: "Introduction to cryptocurrency trading",
          paragraphs: [
            "Cryptocurrencies are digital assets that generally operate using blockchain technology. Bitcoin and Ethereum are examples of cryptocurrencies.",

            "Unlike stocks, purchasing a cryptocurrency generally does not provide ownership in a company or a claim on its earnings.",

            "Cryptocurrency prices can be influenced by adoption, market demand, token supply, regulation, technological developments, and investor sentiment.",

            "Crypto markets generally operate 24 hours a day, seven days a week. Their volatility can create significant price movements and substantial financial risk.",
          ],
        },

        {
          label: "Forex",
          heading: "Trading Currency Pairs",
          image: "/learn/markets/forex.png",
          imageAlt: "Introduction to foreign exchange markets",
          paragraphs: [
            "Forex, or foreign exchange, is the market where currencies are exchanged against one another.",

            "Currencies are quoted in pairs, such as EUR/USD. This pair represents the value of the euro relative to the US dollar.",

            "Currency prices are influenced by interest rates, inflation, economic reports, central bank decisions, and international events.",

            "Forex traders should understand both currencies in a pair. A price movement can result from changes affecting either currency. Leverage can also significantly increase trading risk.",
          ],
        },

        {
          label: "Market Indices",
          heading: "Measuring a Group of Assets",
          image: "/learn/markets/index.png",
          imageAlt: "Introduction to market indices",
          paragraphs: [
            "A market index measures the performance of a selected group of assets. The S&P 500 and Nasdaq-100 are examples of stock market indices.",

            "Indices help traders and investors evaluate broader market conditions instead of focusing on a single company.",

            "An index itself cannot be purchased directly. Traders can gain exposure through instruments such as exchange-traded funds, futures, and options.",

            "An index may provide broader market exposure, but diversification does not eliminate the possibility of financial losses.",
          ],
        },

        {
          label: "Futures",
          heading: "Trading Financial Contracts",
          image: "/learn/markets/futures.png",
          imageAlt: "Introduction to futures trading",
          paragraphs: [
            "A futures contract is a financial agreement based on the price of an underlying asset, such as a commodity, cryptocurrency, or stock market index.",

            "Trading futures generally provides exposure to price movements without requiring direct ownership of the underlying asset.",

            "Futures allow traders to take long or short positions. Traditional futures have expiration dates, while perpetual futures generally do not.",

            "Futures commonly involve margin and leverage, which can magnify both gains and losses. Traders must understand margin requirements and liquidation risk before using these instruments.",
          ],
        },

        {
          label: "Options",
          heading: "Understanding Rights and Obligations",
          image: "/learn/markets/options.png",
          imageAlt: "Introduction to options trading",
          paragraphs: [
            "An option is a financial contract that gives its buyer the right, but not the obligation, to buy or sell an underlying asset at a specified price under the terms of the contract.",

            "A call option provides the right to buy, while a put option provides the right to sell. The option buyer pays a premium for this right.",

            "Option prices are influenced by the underlying asset price, volatility, strike price, and remaining time until expiration.",

            "An option buyer can lose the entire premium paid, while certain option-selling strategies can expose traders to substantially greater losses. Understanding these risks is essential before trading options.",
          ],
        },
      ]}

      questions={[
        "What is a stock?",
        "Why do prices move?",
        "What is crypto?",
        "What should beginners focus on?",
        "What is the difference between owning an asset and trading a contract?",
        "How do currency pairs work?",
        "Can I buy a market index directly?",
        "What is the difference between futures and options?",
      ]}
    />
  );
}