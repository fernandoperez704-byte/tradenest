"use client";

import AdvancedLessonLayout from "../components/AdvancedLessonLayout";

export default function FibonacciRetracementLesson() {
  return (
    <AdvancedLessonLayout
      title="Fibonacci Retracement"
      description="Learn how retracement measurements help traders evaluate the depth of price pullbacks and interpret potential reaction zones within a market movement."

      sections={[
        {
          label: "Understanding Retracements",
          heading: "Measuring the Depth of a Price Movement",
          image: "/learn/advanced/fibonacci/retracement-basics.png",
          imageAlt: "TradeNestX chart showing retracement measurement levels",
          paragraphs: [
            "Fibonacci Retracement is a chart measurement technique that divides a selected price movement into percentage levels. These levels help traders evaluate how much of a previous movement price has retraced.",

            "Traditional Fibonacci retracement tools commonly include 23.6%, 38.2%, 50%, 61.8%, and 78.6%. The 50% level is a widely used midpoint measurement rather than a Fibonacci ratio.",

            "TradeNestX uses a simplified measurement system with equally spaced levels at 0%, 25%, 50%, 75%, and 100%. These levels divide the selected price movement into four equal zones. The intermediate levels are percentage measurements rather than traditional Fibonacci ratios.",

            "Retracement measurements describe the relationship between current price and a selected historical movement. They do not independently predict where price will reverse.",
          ],
          caption:
            "Each percentage represents a relative position within the selected price range rather than a fixed price distance.",
        },

        {
          label: "Selecting Anchor Points",
          heading: "Measuring a Complete Price Movement",
          image: "/learn/advanced/fibonacci/anchor-points.png",
          imageAlt: "TradeNestX chart showing the starting and ending anchor points",
          paragraphs: [
            "A retracement measurement requires two anchor points that define the price movement being studied. The distance between these points determines every intermediate measurement level.",

            "Select the beginning and ending extremes of the movement you want to evaluate. When measuring the complete price range, use the relevant candle wick extremes rather than arbitrarily selecting candle bodies.",

            "Changing either anchor point changes the entire measurement. Selecting unrelated price extremes can produce levels that do not accurately represent the movement being studied.",

            "On TradeNestX, select the Fibonacci Retracement tool and place the first anchor at the ending extreme of the movement and the second anchor at its starting extreme.",

            "For an upward movement, draw from the swing high to the swing low. For a downward movement, draw from the swing low to the swing high. This orientation places 0% at the ending extreme and 100% at the starting extreme, allowing the displayed percentages to represent actual retracement depth.",
          ],
        },

        {
          label: "Measurement Levels",
          heading: "Understanding the Four Retracement Zones",
          image: "/learn/advanced/fibonacci/retracement-zones.png",
          imageAlt: "TradeNestX chart showing 0%, 25%, 50%, 75%, and 100% measurement levels",
          paragraphs: [
            "Retracement percentages allow traders to compare the depth of different price movements, even when their absolute price ranges are different.",

            "For example, if price rises from $100 to $200 and then declines to $175, it has retraced 25% of the original $100 movement. A decline to $150 represents a 50% retracement, while a decline to $125 represents a 75% retracement.",

            "Retracement depth is measured from the ending extreme back toward the starting extreme of the original movement. Always check the orientation of the displayed levels before interpreting their percentages.",
          ],
          points: [
            {
              title: "0% – 25%",
              color: "#22c55e",
              description:
                "A shallow retracement that gives back relatively little of the original price movement.",
            },
            {
              title: "25% – 50%",
              color: "#eab308",
              description:
                "A moderate retracement approaching the midpoint of the measured movement.",
            },
            {
              title: "50% – 75%",
              color: "#f97316",
              description:
                "A deeper retracement that gives back more than half of the original movement.",
            },
            {
              title: "75% – 100%",
              color: "#ffffff",
              description:
                "A substantial retracement approaching the starting price of the original movement.",
            },
          ],
          caption:
            "Retracement depth describes how much of a movement has been recovered or surrendered. It does not determine the probability of a reversal.",
        },

        {
          label: "Practical Application",
          heading: "Using Retracement Levels in Market Analysis",
          image: "/learn/advanced/fibonacci/practical-application.png",
          imageAlt: "TradeNestX chart showing retracement levels aligned with existing market structure",
          paragraphs: [
            "Retracement measurements help traders identify areas worth monitoring rather than exact prices where the market is expected to reverse.",

            "When a retracement level aligns with an independently identified support or resistance zone, multiple analytical observations point to the same area. This is known as confluence. It makes the area worth examining more closely but does not guarantee a price reaction.",

            "Observe how price behaves when approaching these areas. Repeated rejection, consolidation, or a decisive move through a level provides more information than the percentage alone.",

            "Comparing successive retracements helps traders evaluate whether the market is retaining more or less of its previous movements. Measurements should be compared using consistent anchor selection and relevant timeframes.",

            "When the original movement extends to a new extreme, update the measurement if the objective is to evaluate the extended movement. Avoid moving anchors simply to make percentage levels align with historical price reactions.",
          ],
          caption:
            "Retracement levels provide measurable context. Actual price behavior determines whether an area remains relevant.",
        },
      ]}

      questions={[
        "What does Fibonacci Retracement measure?",
        "How do traditional Fibonacci ratios differ from TradeNestX levels?",
        "How do I select the correct anchor points?",
        "How do I draw retracements for upward and downward movements?",
        "What does each retracement zone represent?",
        "How can retracement levels align with support and resistance?",
        "When should I update my retracement anchor points?",
        "What are the most common retracement measurement mistakes?",
      ]}
    />
  );
}