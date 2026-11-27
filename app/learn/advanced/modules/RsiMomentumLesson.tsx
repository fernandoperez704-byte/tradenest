"use client";

import AdvancedLessonLayout from "../components/AdvancedLessonLayout";

export default function RsiMomentumLesson() {
  return (
    <AdvancedLessonLayout
      title="RSI & Momentum"
      description="Learn how the Relative Strength Index helps traders evaluate market momentum, recognize changing price behavior, and interpret potential trend weakness."

      sections={[
        {
          label: "Understanding RSI",
          heading: "Relative Strength Index (RSI)",
          image: "/learn/advanced/rsi/understanding-rsi.png",
          imageAlt: "TradeNestX chart showing the Relative Strength Index",
          paragraphs: [
            "The Relative Strength Index (RSI) is a momentum indicator that measures the relative strength of recent price gains and losses. Its values range from 0 to 100, helping traders evaluate the strength and direction of recent price movements.",

            "RSI is commonly calculated using 14 candles. The calculation compares smoothed average gains with smoothed average losses, producing a value that rises when gains dominate and falls when losses dominate.",

            "The selected timeframe determines the period being analyzed. RSI 14 on a four-hour chart evaluates momentum using four-hour candles, while RSI 14 on a daily chart evaluates momentum using daily candles.",

            "RSI measures momentum rather than the actual value of an asset. It helps traders interpret price behavior but does not independently predict future price direction.",
          ],
          points: [
            {
              title: "RSI 14",
              color: "#38bdf8",
              description:
                "A commonly used RSI calculation period based on 14 candles, using smoothed price gains and losses.",
            },
            {
              title: "Rising RSI",
              color: "#22c55e",
              description:
                "Indicates that recent price gains are becoming stronger relative to losses.",
            },
            {
              title: "Falling RSI",
              color: "#ef4444",
              description:
                "Indicates that recent price losses are becoming stronger relative to gains.",
            },
          ],
          caption:
            "Compare changes in the RSI line with corresponding price movements to understand how momentum develops.",
        },

        {
          label: "Overbought and Oversold",
          heading: "Understanding RSI Levels",
          image: "/learn/advanced/rsi/overbought-oversold.png",
          imageAlt: "TradeNestX chart showing RSI overbought and oversold conditions",
          paragraphs: [
            "RSI values above 70 are commonly described as overbought, while values below 30 are described as oversold. These conditions indicate that recent price movements have been strongly concentrated in one direction.",

            "Overbought does not mean that an asset is necessarily overpriced, and oversold does not mean that an asset is necessarily undervalued. During strong trends, RSI can remain above 70 or below 30 for extended periods.",

            "Traders can observe how price behaves when RSI enters or exits these areas. Continued structural progression may indicate sustained momentum, while difficulty establishing new structural levels may suggest that momentum is weakening.",
          ],
          points: [
            {
              title: "Overbought — Above 70",
              color: "#ef4444",
              description:
                "A condition where recent price gains strongly dominate losses, potentially reflecting sustained upward momentum.",
            },
            {
              title: "Oversold — Below 30",
              color: "#22c55e",
              description:
                "A condition where recent price losses strongly dominate gains, potentially reflecting sustained downward momentum.",
            },
          ],
          caption:
            "Observe how price behaves around overbought and oversold conditions rather than treating these levels as automatic trading signals.",
        },

        {
          label: "Momentum and Trend Direction",
          heading: "Interpreting the RSI Midpoint",
          image: "/learn/advanced/rsi/momentum-direction.png",
          imageAlt: "TradeNestX chart showing RSI momentum around the 50 level",
          paragraphs: [
            "The RSI 50 level represents the midpoint between upward and downward momentum. Values above 50 indicate that average gains exceed average losses, while values below 50 indicate that average losses exceed average gains.",

            "During established bullish conditions, RSI may spend more time above 50. During established bearish conditions, RSI may spend more time below 50. Repeated movements around the midpoint may reflect mixed momentum or consolidation.",

            "During a bullish trend, RSI recovering above 50 after a pullback may indicate renewed upward momentum. During a bearish trend, RSI falling below 50 after a temporary recovery may indicate renewed downward momentum.",

            "Momentum and price direction are not the same. Price can continue rising while RSI declines, reflecting weakening upward momentum. Similarly, price can continue falling while RSI rises, reflecting weakening downward momentum.",

            "Crossing the 50 level does not independently establish a new trend. Momentum changes should be evaluated alongside the broader price behavior.",
          ],
          points: [
            {
              title: "Above 50",
              color: "#22c55e",
              description:
                "Recent average gains exceed average losses, reflecting positive momentum.",
            },
            {
              title: "Below 50",
              color: "#ef4444",
              description:
                "Recent average losses exceed average gains, reflecting negative momentum.",
            },
            {
              title: "Around 50",
              color: "#eab308",
              description:
                "Relatively balanced momentum that may accompany consolidation or changing market conditions.",
            },
          ],
          caption:
            "Observe how RSI behaves around the midpoint and whether its momentum agrees with the established market structure.",
        },

        {
          label: "RSI Divergence",
          heading: "Recognizing Momentum Weakness",
          image: "/learn/advanced/rsi/rsi-divergence.png",
          imageAlt: "TradeNestX chart showing divergence between price and RSI",
          paragraphs: [
            "RSI divergence occurs when corresponding price swings and RSI swings develop in different directions. This indicates that momentum is not confirming the latest price movement.",

            "Regular bullish divergence develops when price establishes a lower low while RSI establishes a higher low. This suggests that downward momentum may be weakening despite price reaching a new low.",

            "Regular bearish divergence develops when price establishes a higher high while RSI establishes a lower high. This suggests that upward momentum may be weakening despite price reaching a new high.",

            "To identify divergence, compare corresponding significant swing points on the price chart and RSI indicator using the same timeframe. Avoid comparing unrelated peaks or valleys.",

            "Divergence helps traders recognize potential momentum weakness and reassess existing market conditions. However, divergence can persist during strong trends and does not independently confirm a reversal.",
          ],
          points: [
            {
              title: "Bullish Divergence",
              color: "#22c55e",
              description:
                "Price establishes a lower low while RSI establishes a corresponding higher low.",
            },
            {
              title: "Bearish Divergence",
              color: "#ef4444",
              description:
                "Price establishes a higher high while RSI establishes a corresponding lower high.",
            },
          ],
          caption:
            "Compare corresponding price and RSI swing points to identify whether momentum supports the latest structural movement.",
        },

        {
          label: "Momentum and Market Context",
          heading: "Applying RSI to Market Analysis",
          image: "/learn/advanced/rsi/momentum-context.png",
          imageAlt: "TradeNestX chart showing RSI momentum alongside market structure and moving averages",
          paragraphs: [
            "RSI becomes more informative when evaluated alongside market structure, moving averages, and significant support and resistance zones. These tools provide context for interpreting momentum rather than relying on an isolated indicator reading.",

            "For example, declining RSI near significant resistance during an established bullish structure may indicate weakening upward momentum. Traders can observe subsequent price reactions to determine whether the structure remains intact or begins to deteriorate.",

            "Momentum should also be evaluated across relevant timeframes. Weak momentum on a fifteen-minute chart may represent a temporary pullback while the four-hour or daily chart continues to reflect stronger bullish conditions.",

            "When RSI and price structure provide conflicting information, prioritize significant structural levels and observe subsequent price reactions. Weakening momentum while the structure remains intact may indicate a slowdown, while weakening momentum accompanied by a structural break provides stronger evidence of changing market conditions.",
          ],
          points: [
            {
              title: "Structural Confirmation",
              color: "#22c55e",
              description:
                "Evaluate whether momentum supports the established sequence of price highs and lows.",
            },
            {
              title: "Momentum Recovery",
              color: "#eab308",
              description:
                "Evaluate whether momentum recovers in the direction of the established trend following a temporary pullback or recovery.",
            },
            {
              title: "Conflicting Conditions",
              color: "#38bdf8",
              description:
                "Conditions where price structure and momentum provide different information, requiring further evaluation.",
            },
          ],
          caption:
            "Use RSI as supporting evidence when evaluating market structure, trend direction, and changing market conditions.",
        },
      ]}

      questions={[
        "How is RSI calculated and what does it measure?",
        "How do timeframes affect RSI readings?",
        "What do overbought and oversold conditions mean?",
        "How do I interpret the RSI 50 level?",
        "How can RSI help me identify weakening momentum?",
        "How do I identify bullish and bearish RSI divergence?",
        "How do I combine RSI with market structure and moving averages?",
        "Why is RSI not a buy or sell signal?",
      ]}
    />
  );
}