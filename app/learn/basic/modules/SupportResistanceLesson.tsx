"use client";

import BasicLessonLayout from "../components/BasicLessonLayout";

type SupportResistanceLessonProps = {
  isCompleted: boolean;
  onComplete: () => void;
};

export default function SupportResistanceLesson({
  isCompleted,
  onComplete,
}: SupportResistanceLessonProps) {
  return (
    <BasicLessonLayout
      lessonId="support"
      title="Support & Resistance"
      description="Learn how to identify important price zones, understand market reactions around those zones, and evaluate potential breakouts, breakdowns, and changes in market behavior."

      isCompleted={isCompleted}
      onComplete={onComplete}

      sections={[
        {
          label: "Price Action Fundamentals",
          heading: "Understanding Support and Resistance",
          image: "/learn/support/support-resistance-basics.webp",
          imageAlt: "Understanding support and resistance on a trading chart",
          paragraphs: [
            "Support and resistance are areas where price has previously experienced noticeable reactions.",
            "Support represents an area where downward price movement has previously slowed, stopped, or reversed.",
            "Resistance represents an area where upward price movement has previously slowed, stopped, or reversed.",
            "These areas develop through market activity and may become important reference points when price returns to them.",
            "Support and resistance should generally be treated as price zones rather than exact prices because market reactions rarely occur at precisely the same level.",
            "Historical reactions provide useful context, but they do not guarantee that the market will react the same way in the future.",
          ],
          points: [
            {
              title: "Support",
              description:
                "An area where downward price movement has previously encountered buying pressure.",
              color: "#22c55e",
            },
            {
              title: "Resistance",
              description:
                "An area where upward price movement has previously encountered selling pressure.",
              color: "#ef4444",
            },
            {
              title: "Price Zones",
              description:
                "Ranges of prices where meaningful market reactions have previously occurred.",
              color: "#22d3ee",
            },
          ],
        },
        {
          label: "Identifying Support",
          heading: "How Support Develops",
          image: "/learn/support/support-floor.webp",
          imageAlt: "Price reacting to a support zone",
          paragraphs: [
            "Support develops when downward price movement encounters sufficient buying interest to slow or temporarily reverse the decline.",
            "To identify support on a chart, look for previous lows where price experienced noticeable upward reactions.",
            "Several reactions within a similar price range can help establish a recognizable support zone.",
            "Traders can examine both candlestick bodies and lower wicks to understand the approximate boundaries of the zone.",
            "A support zone becomes more relevant when its historical reactions are significant and visible within the timeframe being analyzed.",
            "Repeated reactions demonstrate that a zone has mattered in the past, but repeated tests do not necessarily make support stronger.",
            "Buying interest may gradually weaken, allowing price to eventually move below the zone.",
          ],
          points: [
            {
              title: "Previous Lows",
              description:
                "Identify areas where declining prices previously recovered.",
              color: "#22c55e",
            },
            {
              title: "Repeated Reactions",
              description:
                "Look for multiple reactions occurring within a similar price range.",
              color: "#22d3ee",
            },
            {
              title: "Weakening Support",
              description:
                "Observe whether subsequent recoveries become smaller or less sustained.",
              color: "#eab308",
            },
          ],
        },
        {
          label: "Identifying Resistance",
          heading: "How Resistance Develops",
          image: "/learn/support/resistance-ceiling.webp",
          imageAlt: "Price reacting to a resistance zone",
          paragraphs: [
            "Resistance develops when upward price movement encounters sufficient selling pressure to slow or temporarily reverse the advance.",
            "To identify resistance on a chart, look for previous highs where price experienced noticeable downward reactions.",
            "Several reactions within a similar price range can help establish a recognizable resistance zone.",
            "Upper candlestick wicks and repeated failures to sustain higher prices may provide additional evidence of resistance.",
            "Traders should observe how price behaves when approaching resistance rather than assuming that every encounter will produce a decline.",
            "If downward reactions become progressively smaller, the market may be experiencing increasing pressure against the resistance zone.",
            "Resistance can eventually fail when buying pressure becomes sufficient to sustain price above the zone.",
          ],
          points: [
            {
              title: "Previous Highs",
              description:
                "Identify areas where rising prices previously declined.",
              color: "#ef4444",
            },
            {
              title: "Price Rejection",
              description:
                "Observe whether price repeatedly struggles to remain above a particular area.",
              color: "#22d3ee",
            },
            {
              title: "Weakening Resistance",
              description:
                "Observe whether subsequent downward reactions become smaller or less sustained.",
              color: "#eab308",
            },
          ],
        },
        {
          label: "Support Failure",
          heading: "Understanding Support Breakdowns",
          image: "/learn/support/support-breakdown.webp",
          imageAlt: "Price breaking below an established support zone",
          paragraphs: [
            "A breakdown occurs when price moves below an established support zone.",
            "This indicates that the buying interest previously supporting price was insufficient to prevent the downward movement.",
            "A candlestick wick extending below support does not necessarily establish a sustained breakdown.",
            "Traders can evaluate completed candle closes below the zone, subsequent price behavior, and whether attempts to recover above the zone are unsuccessful.",
            "Increased trading volume may provide additional context, but it does not guarantee that the breakdown will continue.",
            "A false breakdown occurs when price temporarily moves below support before recovering back above the zone.",
            "Opening a short position near established support without evaluating the market reaction can expose a trader to an unexpected upward recovery.",
          ],
          points: [
            {
              title: "Potential Breakdown",
              description:
                "Price moves below an established support zone.",
              color: "#eab308",
            },
            {
              title: "Breakdown Confirmation",
              description:
                "Completed candles and subsequent price behavior provide evidence that price is sustaining movement below support.",
              color: "#ef4444",
            },
            {
              title: "False Breakdown",
              description:
                "Price temporarily moves below support but subsequently recovers above it.",
              color: "#22d3ee",
            },
          ],
        },
        {
          label: "Resistance Failure",
          heading: "Understanding Resistance Breakouts",
          image: "/learn/support/resistance-breakout.webp",
          imageAlt: "Price breaking above an established resistance zone",
          paragraphs: [
            "A breakout occurs when price moves above an established resistance zone.",
            "This indicates that buying pressure was sufficient to move price beyond an area that previously limited upward movement.",
            "A candlestick wick extending above resistance does not necessarily establish a sustained breakout.",
            "Traders can evaluate completed candle closes above the zone, subsequent price behavior, and whether price can remain above the former resistance area.",
            "A false breakout occurs when price temporarily moves above resistance before returning below the zone.",
            "Opening a long position directly below established resistance without evaluating the market reaction can expose a trader to an unexpected downward rejection.",
            "Waiting for additional confirmation can help traders avoid premature conclusions, although confirmation never eliminates trading risk.",
          ],
          points: [
            {
              title: "Potential Breakout",
              description:
                "Price moves above an established resistance zone.",
              color: "#eab308",
            },
            {
              title: "Breakout Confirmation",
              description:
                "Completed candles and subsequent price behavior provide evidence that price is sustaining movement above resistance.",
              color: "#22c55e",
            },
            {
              title: "False Breakout",
              description:
                "Price temporarily moves above resistance but subsequently returns below it.",
              color: "#ef4444",
            },
          ],
        },
        {
          label: "Role Reversal",
          heading: "When Support Becomes Resistance",
          image: "/learn/support/role-reversal.webp",
          imageAlt: "Support becoming resistance and resistance becoming support",
          paragraphs: [
            "Support and resistance zones can change their roles after price moves beyond them.",
            "When price breaks below support, the former support zone may become resistance during a subsequent recovery.",
            "When price breaks above resistance, the former resistance zone may become support during a subsequent decline.",
            "A retest occurs when price returns to an area that it previously broke through.",
            "Traders observe how price reacts during a retest to evaluate whether the former zone is developing a new role.",
            "Not every breakout or breakdown produces a retest, and not every retest results in a successful role reversal.",
            "A former resistance zone that fails to hold as support may indicate that the breakout is weakening or has failed.",
            "A former support zone that fails to hold as resistance may indicate that the breakdown is weakening or has failed.",
          ],
          points: [
            {
              title: "Resistance Becomes Support",
              description:
                "After a breakout, price returns to former resistance and experiences an upward reaction.",
              color: "#22c55e",
            },
            {
              title: "Support Becomes Resistance",
              description:
                "After a breakdown, price returns to former support and experiences a downward reaction.",
              color: "#ef4444",
            },
            {
              title: "Retest",
              description:
                "Price revisits a previously broken zone, allowing traders to evaluate its new behavior.",
              color: "#22d3ee",
            },
          ],
        },
        {
          label: "Practical Application",
          heading: "Using Support and Resistance in Market Analysis",
          paragraphs: [
            "Support and resistance help traders understand where important market decisions may develop and where potential obstacles exist.",
            "Begin by examining a higher timeframe to identify significant historical price reactions.",
            "Mark the most relevant support and resistance zones surrounding the current market price.",
            "Use a lower timeframe when necessary to examine how price is behaving around those areas.",
            "Consider the distance between the current price and the nearest important support or resistance zone when evaluating potential risk and reward.",
            "Avoid assuming that price must reverse simply because it reaches an established zone.",
            "Use the horizontal line tool in the TradeNestX simulator to mark important price levels. Multiple horizontal lines can help represent the boundaries of a wider price zone.",
            "Observe how price reacts when approaching, testing, breaking, or returning to those areas.",
            "The objective is to understand market behavior around important price zones rather than treating support and resistance as automatic entry or exit signals.",
          ],
          points: [
            {
              title: "Identify",
              description:
                "Locate meaningful historical price reactions.",
              color: "#22d3ee",
            },
            {
              title: "Observe",
              description:
                "Evaluate current price behavior around established zones.",
              color: "#eab308",
            },
            {
              title: "Evaluate",
              description:
                "Consider confirmation, available price movement, and potential risk before making decisions.",
              color: "#22c55e",
            },
          ],
        },
      ]}

      questions={[
        "What is support?",
        "What is resistance?",
        "How do traders identify support and resistance zones?",
        "Why are support and resistance zones not exact prices?",
        "What is a confirmed breakout?",
        "What is a confirmed breakdown?",
        "What is a false breakout or breakdown?",
        "How does support become resistance and resistance become support?",
      ]}
    />
  );
}