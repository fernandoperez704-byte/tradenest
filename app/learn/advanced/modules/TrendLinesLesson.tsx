"use client";

import AdvancedLessonLayout from "../components/AdvancedLessonLayout";

export default function TrendLinesLesson() {
  return (
    <AdvancedLessonLayout
      title="Trend Lines"
      description="Learn how to draw, evaluate, and interpret trend lines to understand dynamic price boundaries and changes in market behavior."

      sections={[
        {
          label: "Understanding Trend Lines",
          heading: "Identifying Dynamic Price Boundaries",
          image: "/learn/advanced/trend-lines/trend-line-basics.png",
          imageAlt: "TradeNestX chart showing ascending and descending trend lines",
          paragraphs: [
            "A trend line connects significant price extremes to create a diagonal reference across a chart. Unlike horizontal support and resistance, its reference price changes over time.",

            "An ascending trend line connects rising swing lows, while a descending trend line connects falling swing highs.",

            "The slope of a trend line represents the rate of price change over time. However, its visual angle depends on the chart scale and zoom level, so steepness alone should not be used to determine trend strength.",

            "Trend lines are analytical references rather than fixed boundaries that price must respect.",
          ],
        },

        {
          label: "Drawing Trend Lines",
          heading: "Selecting Meaningful Anchor Points",
          image: "/learn/advanced/trend-lines/anchor-points.png",
          imageAlt: "TradeNestX chart showing correct trend line anchor selection",
          paragraphs: [
            "A trend line requires at least two distinct anchor points. Select meaningful swing extremes rather than connecting unrelated candles.",

            "For an ascending trend line, connect a significant swing low to a subsequent higher low. For a descending trend line, connect a significant swing high to a subsequent lower high.",

            "Use a consistent approach when selecting candle wicks or bodies. Avoid forcing a line through multiple candles simply to create the desired slope.",

            "On TradeNestX, select the Trend Line tool, place the first anchor on the chart, and select the second anchor to complete the drawing.",
          ],
        },

        {
          label: "Evaluating Trend Lines",
          heading: "Recognizing Meaningful Reactions and Breaks",
          image: "/learn/advanced/trend-lines/trend-line-validation.png",
          imageAlt: "TradeNestX chart showing a descending trend line break followed by limited follow-through and a new lower low",
          paragraphs: [
            "Two anchor points establish a trend line, while subsequent independent price reactions provide additional evidence that the boundary is relevant.",

            "Evaluate the spacing between reactions and the amount of price movement separating them. Several adjacent candles touching a line may represent one reaction rather than multiple independent tests.",

            "A candle wick crossing a trend line does not necessarily establish a meaningful break. Observe candle closes, subsequent price movement, and whether price returns across the boundary.",

            "A broken trend line indicates that price has moved beyond its previous diagonal reference. It does not independently confirm a market structure reversal.",
          ],
        },

        {
          label: "Practical Application",
          heading: "Combining Trend Lines With Market Structure",
          image: "/learn/advanced/trend-lines/practical-application.png",
          imageAlt: "TradeNestX chart showing trend line breaks compared with market structure",
          paragraphs: [
            "When price breaks a trend line, identify the most recent significant swing high or swing low and observe whether that structural level remains intact.",

            "When price breaks an ascending trend line but continues forming higher lows, the upward movement may be slowing without reversing its broader structure.",

            "Similarly, a break above a descending trend line may indicate reduced downward momentum while the broader market structure remains bearish.",

            "Compare diagonal boundaries with significant horizontal price levels to distinguish changes in the pace of a movement from actual structural changes.",

            "Avoid continuously repositioning trend lines to fit new price behavior. Preserve the original reference when evaluating how the market has changed.",
          ],
          caption:
            "A change in the pace of a trend is not necessarily a change in its overall direction.",
        },
      ]}

      questions={[
        "What does a trend line represent?",
        "How do trend lines differ from horizontal support and resistance?",
        "How do I select meaningful anchor points?",
        "Should I use candle wicks or bodies?",
        "How do I evaluate the validity of a trend line?",
        "How can I identify a meaningful trend line break?",
        "Does a trend line break confirm a reversal?",
        "How can I combine trend lines with market structure?",
      ]}
    />
  );
}