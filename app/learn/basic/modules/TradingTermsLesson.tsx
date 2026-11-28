"use client";

import BasicLessonLayout from "../components/BasicLessonLayout";

type TradingTermsLessonProps = {
  isCompleted: boolean;
  onComplete: () => void;
};

export default function TradingTermsLesson({
  isCompleted,
  onComplete,
}: TradingTermsLessonProps) {
  return (
    <BasicLessonLayout
      lessonId="vocabulary"
      title="Essential Trading Terms"
      description="Build your trading vocabulary with essential market terminology, execution concepts, financial measurements, and common expressions used in real-world trading."

      isCompleted={isCompleted}
      onComplete={onComplete}

      sections={[
        {
          label: "Trading Vocabulary",
          heading: "Understanding the Language of Trading",
          image: "/learn/terms/trading-terms-basics.webp",
          imageAlt: "Essential terminology used in financial markets",
          paragraphs: [
            "Financial markets have their own vocabulary used to describe price behavior, trading activity, financial instruments, and investment decisions.",
            "Understanding this terminology makes it easier to interpret market analysis, navigate trading platforms, and communicate with other traders.",
            "This lesson serves as a reference guide that you can revisit whenever you encounter an unfamiliar trading term.",
            "Some expressions describe measurable market conditions, while others represent interpretations or expectations.",
            "Understanding the difference helps traders evaluate information without confusing opinions with established facts.",
          ],
        },
        {
          label: "Market Direction",
          heading: "Common Market Expressions",
          image: "/learn/terms/common-trading-words.webp",
          imageAlt: "Common expressions describing market direction and price behavior",
          points: [
            {
              title: "Bullish",
              description:
                "Describes an expectation of rising prices or market conditions that support upward movement.",
              color: "#22c55e",
            },
            {
              title: "Bearish",
              description:
                "Describes an expectation of falling prices or market conditions that support downward movement.",
              color: "#ef4444",
            },
            {
              title: "Neutral",
              description:
                "Describes a market assessment without a clear directional preference.",
              color: "#a1a1aa",
            },
            {
              title: "Rally",
              description:
                "A period of noticeable upward price movement.",
              color: "#22c55e",
            },
            {
              title: "Sell-Off",
              description:
                "A period of substantial selling activity accompanied by declining prices.",
              color: "#ef4444",
            },
            {
              title: "Pullback",
              description:
                "A temporary price movement against the prevailing trend.",
              color: "#eab308",
            },
            {
              title: "Correction",
              description:
                "A meaningful price movement against a preceding trend. In stock market terminology, a decline of approximately 10 percent from a recent peak is commonly described as a correction.",
              color: "#f97316",
            },
            {
              title: "Reversal",
              description:
                "A change in the prevailing direction of price movement.",
              color: "#a78bfa",
            },
            {
              title: "Consolidation",
              description:
                "A period during which price fluctuates within a relatively limited range.",
              color: "#22d3ee",
            },
            {
              title: "Volatility",
              description:
                "The degree to which an asset's price fluctuates over a particular period.",
              color: "#eab308",
            },
          ],
        },
        {
          label: "Market Pricing",
          heading: "Bid, Ask, and Spread",
          image: "/learn/terms/spread.webp",
          imageAlt: "The difference between bid and ask prices in a financial market",
          paragraphs: [
            "The price displayed on a chart often represents the most recent executed trade, rather than the exact price currently available for buying or selling.",
            "The bid and ask describe the prices currently quoted by market participants.",
            "For example, if the highest bid is $99.95 and the lowest ask is $100.05, the quoted spread is $0.10.",
            "Understanding these prices helps traders recognize why their actual execution price may differ from the price displayed on a chart.",
          ],
          points: [
            {
              title: "Bid",
              description:
                "A quoted price at which a market participant is willing to buy an asset. The best bid is the highest available bid.",
              color: "#22c55e",
            },
            {
              title: "Ask",
              description:
                "A quoted price at which a market participant is willing to sell an asset. The best ask is the lowest available ask.",
              color: "#ef4444",
            },
            {
              title: "Bid-Ask Spread",
              description:
                "The difference between the best available ask and the best available bid.",
              color: "#eab308",
            },
            {
              title: "Last Price",
              description:
                "The price at which the most recent reported trade was executed.",
              color: "#22d3ee",
            },
            {
              title: "Mid Price",
              description:
                "The midpoint between the best bid and best ask prices.",
              color: "#a78bfa",
            },
            {
              title: "Tick Size",
              description:
                "The minimum permitted price increment for a particular trading instrument.",
              color: "#22d3ee",
            },
          ],
        },
        {
          label: "Market Accessibility",
          heading: "Liquidity and Market Depth",
          image: "/learn/terms/liquidity.webp",
          imageAlt: "The relationship between liquidity and trade execution",
          paragraphs: [
            "Liquidity describes how easily an asset can be bought or sold without significantly affecting its price.",
            "Highly liquid markets generally provide more opportunities to execute trades near currently quoted prices.",
            "Markets with limited liquidity may experience wider spreads, larger execution differences, and more substantial price changes when orders are executed.",
            "Trading volume and liquidity are related but are not identical. High historical trading volume does not guarantee sufficient liquidity at every moment.",
          ],
          points: [
            {
              title: "Liquidity",
              description:
                "The ability to buy or sell an asset without causing a substantial change in its price.",
              color: "#22d3ee",
            },
            {
              title: "Market Depth",
              description:
                "The quantity of available buy and sell orders across different price levels.",
              color: "#a78bfa",
            },
            {
              title: "Order Book",
              description:
                "A record of outstanding buy and sell orders displayed by price and quantity on a trading venue.",
              color: "#22d3ee",
            },
            {
              title: "Slippage",
              description:
                "The difference between an expected execution price and the actual execution price.",
              color: "#f97316",
            },
            {
              title: "Market Impact",
              description:
                "The effect that executing an order has on the market price.",
              color: "#eab308",
            },
            {
              title: "Trading Volume",
              description:
                "The quantity of an asset or trading instrument exchanged during a specified period.",
              color: "#22c55e",
            },
            {
              title: "Trading Pair",
              description:
                "Two assets or currencies quoted against each other, such as BTC/USD.",
              color: "#a78bfa",
            },
          ],
        },
        {
          label: "Asset Valuation",
          heading: "Market Capitalization and Supply",
          image: "/learn/terms/market-cap.webp",
          imageAlt: "Calculating market capitalization using asset price and supply",
          paragraphs: [
            "Market capitalization is a commonly used measurement of an asset's aggregate market value.",
            "For a publicly traded company, market capitalization is generally calculated by multiplying the current share price by the number of outstanding shares.",
            "For a cryptocurrency, market capitalization is commonly calculated by multiplying the current token price by its reported circulating supply.",
            "For example, a cryptocurrency priced at $2 with 100 million circulating tokens has a market capitalization of $200 million.",
            "Market capitalization does not represent the amount of money invested in an asset or the amount that could be withdrawn from the market.",
            "A low individual token price does not necessarily mean that a cryptocurrency is inexpensive relative to its overall valuation.",
          ],
          points: [
            {
              title: "Market Capitalization",
              description:
                "The current price multiplied by the relevant outstanding or circulating quantity.",
              color: "#22d3ee",
            },
            {
              title: "Outstanding Shares",
              description:
                "Shares of a company currently outstanding and held by shareholders.",
              color: "#a78bfa",
            },
            {
              title: "Circulating Supply",
              description:
                "The estimated quantity of cryptocurrency tokens currently circulating in the market.",
              color: "#22c55e",
            },
            {
              title: "Total Supply",
              description:
                "The quantity of cryptocurrency tokens currently in existence, generally excluding permanently burned tokens.",
              color: "#22d3ee",
            },
            {
              title: "Maximum Supply",
              description:
                "The maximum quantity of tokens permitted under an asset's current issuance rules, when such a limit exists.",
              color: "#eab308",
            },
            {
              title: "Fully Diluted Valuation (FDV)",
              description:
                "An estimated valuation calculated using the current token price and a broader supply measure, commonly maximum supply when available.",
              color: "#f97316",
            },
            {
              title: "All-Time High (ATH)",
              description:
                "The highest recorded price of an asset within the relevant available price history.",
              color: "#22c55e",
            },
            {
              title: "All-Time Low (ATL)",
              description:
                "The lowest recorded price of an asset within the relevant available price history.",
              color: "#ef4444",
            },
          ],
        },
        {
          label: "Trading Execution",
          heading: "Orders and Position Terminology",
          points: [
            {
              title: "Market Order",
              description:
                "An instruction to execute a trade at the best available market prices.",
              color: "#22d3ee",
            },
            {
              title: "Limit Order",
              description:
                "An instruction to execute a trade at a specified price or better, without guaranteeing execution.",
              color: "#a78bfa",
            },
            {
              title: "Stop Order",
              description:
                "An order that becomes active when a specified trigger price is reached.",
              color: "#eab308",
            },
            {
              title: "Stop-Limit Order",
              description:
                "An order that activates a limit order after a specified trigger price is reached.",
              color: "#f97316",
            },
            {
              title: "Fill",
              description:
                "The execution of all or part of a trading order.",
              color: "#22c55e",
            },
            {
              title: "Partial Fill",
              description:
                "An execution in which only part of the requested order quantity is completed.",
              color: "#eab308",
            },
            {
              title: "Long Position",
              description:
                "A position that generally benefits from an increase in the underlying asset's price.",
              color: "#22c55e",
            },
            {
              title: "Short Position",
              description:
                "A position that generally benefits from a decrease in the underlying asset's price.",
              color: "#ef4444",
            },
            {
              title: "Position Size",
              description:
                "The quantity of an asset or trading instrument held within a position.",
              color: "#22d3ee",
            },
            {
              title: "Exposure",
              description:
                "The financial value or sensitivity of a position to changes in market conditions.",
              color: "#a78bfa",
            },
            {
              title: "Notional Value",
              description:
                "The underlying financial value represented by a position or contract.",
              color: "#22d3ee",
            },
          ],
        },
        {
          label: "Derivatives and Margin",
          heading: "Futures Trading Terminology",
          paragraphs: [
            "Derivatives introduce additional terminology related to contracts, collateral, leverage, and position maintenance.",
            "Exact definitions and calculation methods may differ between trading platforms and contract types.",
            "These terms provide a foundation for the more detailed Futures and Leverage lesson in the Advanced Academy.",
          ],
          points: [
            {
              title: "Derivative",
              description:
                "A financial instrument whose value is derived from an underlying asset, index, rate, or other reference.",
              color: "#22d3ee",
            },
            {
              title: "Futures Contract",
              description:
                "A standardized agreement to buy, sell, or financially settle an underlying asset according to specified contract terms.",
              color: "#a78bfa",
            },
            {
              title: "Perpetual Contract",
              description:
                "A derivative contract designed without a fixed expiration date.",
              color: "#22d3ee",
            },
            {
              title: "Leverage",
              description:
                "The use of a financial arrangement that allows market exposure greater than the capital committed as margin.",
              color: "#eab308",
            },
            {
              title: "Initial Margin",
              description:
                "The collateral required to establish a leveraged position.",
              color: "#22c55e",
            },
            {
              title: "Maintenance Margin",
              description:
                "The minimum collateral or account equity required to maintain a leveraged position under applicable platform rules.",
              color: "#f97316",
            },
            {
              title: "Liquidation",
              description:
                "The forced reduction or closure of a leveraged position when applicable margin requirements are no longer satisfied.",
              color: "#ef4444",
            },
            {
              title: "Funding Rate",
              description:
                "A periodic rate used to calculate payments associated with perpetual contracts, typically between long and short position holders.",
              color: "#a78bfa",
            },
            {
              title: "Mark Price",
              description:
                "A reference price used by many derivatives platforms for unrealized profit and loss calculations and liquidation assessments.",
              color: "#22d3ee",
            },
            {
              title: "Index Price",
              description:
                "A reference price calculated from one or more underlying market price sources.",
              color: "#22d3ee",
            },
            {
              title: "Open Interest",
              description:
                "The total number of outstanding derivative contracts that have not been closed or settled.",
              color: "#22c55e",
            },
            {
              title: "Cross Margin",
              description:
                "A margin arrangement in which eligible collateral is shared across positions within a designated account.",
              color: "#eab308",
            },
            {
              title: "Isolated Margin",
              description:
                "A margin arrangement in which designated collateral is allocated separately to a particular position.",
              color: "#a78bfa",
            },
          ],
        },
        {
          label: "Financial Performance",
          heading: "Account and Performance Terminology",
          points: [
            {
              title: "Capital",
              description:
                "Financial resources available for investment, trading, or other financial activities.",
              color: "#22d3ee",
            },
            {
              title: "Balance",
              description:
                "The recorded amount of funds or assets in an account, according to the platform's accounting method.",
              color: "#22c55e",
            },
            {
              title: "Equity",
              description:
                "The net value of an account after accounting for relevant assets, liabilities, and position values.",
              color: "#a78bfa",
            },
            {
              title: "Buying Power",
              description:
                "The amount of additional purchasing capacity available under an account's applicable rules.",
              color: "#22d3ee",
            },
            {
              title: "Profit and Loss (PnL)",
              description:
                "The financial gain or loss associated with a position or collection of trades.",
              color: "#22d3ee",
            },
            {
              title: "Realized PnL",
              description:
                "Profit or loss recognized from positions or portions of positions that have been closed.",
              color: "#22c55e",
            },
            {
              title: "Unrealized PnL",
              description:
                "The estimated profit or loss associated with positions that remain open.",
              color: "#eab308",
            },
            {
              title: "Return on Investment (ROI)",
              description:
                "A percentage measurement comparing financial gain or loss with the amount invested.",
              color: "#a78bfa",
            },
            {
              title: "Return on Equity (ROE)",
              description:
                "A return measurement relative to equity. Derivatives platforms may use position margin as the reference amount.",
              color: "#22d3ee",
            },
            {
              title: "Drawdown",
              description:
                "A decline in account or portfolio value from a previous peak.",
              color: "#ef4444",
            },
            {
              title: "Maximum Drawdown",
              description:
                "The largest observed peak-to-trough decline during a specified measurement period.",
              color: "#f97316",
            },
            {
              title: "Break-Even",
              description:
                "The point at which financial gains and losses offset each other after relevant costs.",
              color: "#eab308",
            },
          ],
        },
        {
          label: "Trading Costs",
          heading: "Understanding Common Trading Fees",
          points: [
            {
              title: "Commission",
              description:
                "A fee charged by a broker or trading service for executing a transaction.",
              color: "#22d3ee",
            },
            {
              title: "Maker",
              description:
                "A market participant whose order adds resting liquidity to an order book.",
              color: "#22c55e",
            },
            {
              title: "Taker",
              description:
                "A market participant whose order executes against existing liquidity in an order book.",
              color: "#f97316",
            },
            {
              title: "Maker Fee",
              description:
                "A trading fee or rebate associated with adding liquidity to an order book.",
              color: "#22c55e",
            },
            {
              title: "Taker Fee",
              description:
                "A trading fee associated with removing existing liquidity from an order book.",
              color: "#eab308",
            },
            {
              title: "Borrowing Cost",
              description:
                "A charge associated with borrowing funds or assets for financial activities.",
              color: "#ef4444",
            },
            {
              title: "Funding Payment",
              description:
                "A periodic payment received or paid by perpetual contract position holders according to applicable funding rules.",
              color: "#a78bfa",
            },
          ],
        },
        {
          label: "Chart Analysis",
          heading: "Technical Analysis Abbreviations",
          points: [
            {
              title: "TA — Technical Analysis",
              description:
                "The study of historical price behavior and related market data to evaluate potential market developments.",
              color: "#22d3ee",
            },
            {
              title: "FA — Fundamental Analysis",
              description:
                "The evaluation of economic, financial, business, or asset-specific factors that may influence valuation.",
              color: "#a78bfa",
            },
            {
              title: "OHLC",
              description:
                "Open, High, Low, and Close prices recorded during a specified period.",
              color: "#22d3ee",
            },
            {
              title: "HH — Higher High",
              description:
                "A reaction high that forms above a previous relevant reaction high.",
              color: "#22c55e",
            },
            {
              title: "HL — Higher Low",
              description:
                "A reaction low that forms above a previous relevant reaction low.",
              color: "#22c55e",
            },
            {
              title: "LH — Lower High",
              description:
                "A reaction high that forms below a previous relevant reaction high.",
              color: "#ef4444",
            },
            {
              title: "LL — Lower Low",
              description:
                "A reaction low that forms below a previous relevant reaction low.",
              color: "#ef4444",
            },
            {
              title: "MA — Moving Average",
              description:
                "An indicator that calculates an average price over a specified number of periods.",
              color: "#eab308",
            },
            {
              title: "SMA — Simple Moving Average",
              description:
                "A moving average that assigns equal weight to each observation within its calculation period.",
              color: "#22d3ee",
            },
            {
              title: "EMA — Exponential Moving Average",
              description:
                "A moving average that assigns greater weight to more recent observations.",
              color: "#a78bfa",
            },
            {
              title: "RSI — Relative Strength Index",
              description:
                "A momentum indicator that evaluates the relative magnitude of recent price gains and losses.",
              color: "#eab308",
            },
            {
              title: "HTF — Higher Timeframe",
              description:
                "A chart timeframe longer than the timeframe currently being evaluated.",
              color: "#22d3ee",
            },
            {
              title: "LTF — Lower Timeframe",
              description:
                "A chart timeframe shorter than the timeframe currently being evaluated.",
              color: "#a78bfa",
            },
          ],
        },
        {
          label: "Common Trading Abbreviations",
          heading: "Everyday Trading Language",
          points: [
            {
              title: "SL — Stop Loss",
              description:
                "A predefined protective exit intended to limit potential losses.",
              color: "#ef4444",
            },
            {
              title: "TP — Take Profit",
              description:
                "A predefined exit intended to realize profits when specified conditions are satisfied.",
              color: "#22c55e",
            },
            {
              title: "BE — Break-Even",
              description:
                "A financial outcome or reference level at which gains and losses offset each other after relevant costs.",
              color: "#eab308",
            },
            {
              title: "R:R — Risk-to-Reward Ratio",
              description:
                "A comparison between the planned potential loss and planned potential profit of a trade.",
              color: "#a78bfa",
            },
            {
              title: "R-Multiple",
              description:
                "A trade result expressed as a multiple of its originally planned financial risk.",
              color: "#22d3ee",
            },
            {
              title: "FOMO — Fear of Missing Out",
              description:
                "Emotional pressure to participate in a perceived opportunity before it disappears.",
              color: "#f97316",
            },
            {
              title: "FUD — Fear, Uncertainty, and Doubt",
              description:
                "A term used to describe information or sentiment that creates concern or uncertainty around an asset or market.",
              color: "#eab308",
            },
            {
              title: "DYOR — Do Your Own Research",
              description:
                "An expression encouraging individuals to independently evaluate information before making financial decisions.",
              color: "#22c55e",
            },
            {
              title: "DCA — Dollar-Cost Averaging",
              description:
                "An approach involving investing predetermined monetary amounts at regular intervals regardless of current asset prices.",
              color: "#22d3ee",
            },
            {
              title: "HODL",
              description:
                "A cryptocurrency expression describing the practice of continuing to hold an asset despite market fluctuations.",
              color: "#a78bfa",
            },
          ],
        },
        {
          label: "Practical Application",
          heading: "Using Trading Terminology in TradeNestX",
          paragraphs: [
            "Understanding trading terminology becomes more useful when it is connected to practical market observation.",
            "As you explore the TradeNestX simulator, identify how terms such as entry price, position size, leverage, profit and loss, and market direction relate to the information displayed.",
            "When reading market analysis, distinguish between descriptions of observed price behavior and expectations about future price movement.",
            "Use Gaby to clarify unfamiliar terminology and understand how specific concepts apply to real-world financial markets.",
            "Return to this glossary whenever you encounter a term that you do not fully understand.",
            "Learning trading vocabulary is an ongoing process that supports independent research, informed decisions, and continued financial education.",
          ],
        },
      ]}

      questions={[
        "What is the difference between bid and ask?",
        "What is a bid-ask spread?",
        "What is the difference between liquidity and trading volume?",
        "What is market capitalization?",
        "What is the difference between realized and unrealized PnL?",
        "What is the difference between maker and taker fees?",
        "What is the difference between margin and leverage?",
        "What are the most common technical analysis abbreviations?",
      ]}
    />
  );
}