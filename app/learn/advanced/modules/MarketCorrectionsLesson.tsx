"use client";

import AdvancedLessonLayout from "../components/AdvancedLessonLayout";

export default function MarketCorrectionsLesson() {
  return (
    <AdvancedLessonLayout
      title="Market Corrections"
      description="Learn how corrective movements develop, how to evaluate their characteristics, and how to distinguish temporary market adjustments from broader directional changes."

      sections={[
        {
          label: "Understanding Market Corrections",
          heading: "Why Markets Do Not Move in Straight Lines",
          image: "/learn/advanced/market-corrections/correction-basics.png",
          imageAlt: "TradeNestX chart showing corrective movements within an established trend",
          paragraphs: [
            "A market correction is a movement against an established market direction. Corrections can develop as traders take profits, market expectations change, or participation weakens following an extended movement.",

            "In an upward trend, corrections generally involve declining prices. In a downward trend, corrective movements can involve temporary price recoveries.",

            "In conventional stock market terminology, a correction generally refers to a decline of 10% to less than 20% from a recent peak. In technical analysis, however, corrective movements are not defined by one universal percentage.",

            "Corrections are a natural part of market behavior and can occur without ending the established trend.",
          ],
        },

        {
          label: "Corrective Market Behavior",
          heading: "Recognizing Different Types of Corrections",
          image: "/learn/advanced/market-corrections/correction-types.png",
          imageAlt: "TradeNestX chart showing different forms of corrective market behavior",
          paragraphs: [
            "Not all corrections develop in the same way. Some occur through rapid price movements, while others develop gradually or through extended periods of sideways activity.",

            "The speed and duration of a correction provide context about how the market is adjusting after its previous movement.",
          ],
          points: [
            {
              title: "Sharp Correction",
              color: "#ef4444",
              description:
                "A rapid movement against the prevailing trend, often accompanied by larger candles and increased price fluctuations.",
            },
            {
              title: "Gradual Correction",
              color: "#eab308",
              description:
                "A slower adjustment that develops through smaller movements and temporary recoveries.",
            },
            {
              title: "Sideways Correction",
              color: "#22d3ee",
              description:
                "A period of limited directional progress where price consolidates instead of significantly retracing the previous movement.",
            },
          ],
          caption:
            "Markets can correct through changes in price, through the passage of time, or through a combination of both.",
        },

        {
          label: "Correction vs. Reversal",
          heading: "Recognizing When Market Conditions Change",
          image: "/learn/advanced/market-corrections/correction-vs-reversal.png",
          imageAlt: "TradeNestX chart comparing corrective behavior with a broader structural reversal",
          paragraphs: [
            "A correction and a reversal can initially appear similar. Their distinction becomes clearer as subsequent price movements develop.",

            "During a correction, price may temporarily move against the prevailing direction while important structural levels remain intact.",

            "When corrective movements begin breaking significant structural levels and attempts to resume the previous trend repeatedly fail, the possibility of a broader directional change deserves greater attention.",

            "The size of a correction alone cannot establish whether a reversal is developing. A sharp correction can recover, while a relatively small correction can gradually develop into a reversal.",
          ],
        },

        {
          label: "Practical Application",
          heading: "Evaluating the Development of a Correction",
          image: "/learn/advanced/market-corrections/practical-application.png",
          imageAlt: "TradeNestX chart showing the development and evaluation of a market correction",
          paragraphs: [
            "Begin by identifying the movement that preceded the correction. An extended directional movement provides different context from a market that was already struggling to make progress.",

            "Compare the duration and speed of the correction with the preceding movement. A market that gives back several days of progress within a short period is behaving differently from one that adjusts gradually.",

            "During a bearish market, compare the strength of temporary recoveries with the preceding declines. During a bullish market, evaluate whether pullbacks are becoming more aggressive relative to previous advances. These comparisons help traders recognize changes in market behavior before drawing conclusions about the broader trend.",

            "Update your assessment as new price behavior develops rather than assuming that a correction must end at a particular price or within a specific period.",

            "Avoid treating every price decline as a buying opportunity or every temporary recovery as a selling opportunity. The purpose of correction analysis is to understand changing market conditions, not to predict an exact turning point.",
          ],
          caption:
            "Evaluate how a correction develops, not simply how far price has moved.",
        },
      ]}

      questions={[
        "What is a market correction?",
        "Why do corrections develop during established trends?",
        "Does a correction always require a 10% decline?",
        "What are the different types of market corrections?",
        "How can a market correct through sideways movement?",
        "How do I distinguish a correction from a reversal?",
        "Why are correction speed and duration important?",
        "How can I evaluate whether a correction is becoming stronger?",
      ]}
    />
  );
}