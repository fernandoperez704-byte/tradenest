"use client";

import BasicLessonLayout from "../components/BasicLessonLayout";

type SupplyDemandLessonProps = {
  isCompleted: boolean;
  onComplete: () => void;
};

export default function SupplyDemandLesson({
  isCompleted,
  onComplete,
}: SupplyDemandLessonProps) {
  return (
    <BasicLessonLayout
      lessonId="supplydemand"
      title="Supply & Demand"
      description="Learn how supply and demand zones develop, how price imbalances influence market movement, and how traders evaluate areas where significant buying or selling pressure previously occurred."

      isCompleted={isCompleted}
      onComplete={onComplete}

      sections={[
        {
          label: "Market Fundamentals",
          heading: "Understanding Supply and Demand Zones",
          image: "/learn/supplydemand/supply-demand-basics.webp",
          imageAlt: "Understanding supply and demand zones on a trading chart",
          paragraphs: [
            "Supply represents the quantity of an asset that market participants are willing to sell at different prices. Demand represents the quantity they are willing to purchase.",
            "In technical analysis, supply and demand zones are price areas from which the market previously experienced significant directional movement.",
            "These zones help traders identify where a meaningful imbalance between buying and selling pressure may have developed.",
            "A rapid upward departure may suggest that available sell orders were insufficient to absorb aggressive buying activity at existing prices.",
            "A rapid downward departure may suggest that available buy orders were insufficient to absorb aggressive selling activity at existing prices.",
            "Supply and demand zones are inferred from historical price behavior. Candlestick charts alone cannot reveal the exact quantity of unfilled orders remaining within a zone.",
          ],
          points: [
            {
              title: "Demand Zone",
              description:
                "An area from which price previously experienced a significant upward departure.",
              color: "#22c55e",
            },
            {
              title: "Supply Zone",
              description:
                "An area from which price previously experienced a significant downward departure.",
              color: "#ef4444",
            },
            {
              title: "Price Imbalance",
              description:
                "A condition in which aggressive buying or selling activity exceeds the available opposing liquidity at existing prices.",
              color: "#22d3ee",
            },
          ],
        },
        {
          label: "Demand Formation",
          heading: "Identifying Demand Zones",
          image: "/learn/supplydemand/demand-zone.webp",
          imageAlt: "Identifying the origin of a demand zone",
          paragraphs: [
            "A demand zone is commonly identified near the origin of a significant upward price movement.",
            "Traders often look for a brief period of consolidation or a small group of candles immediately before a strong upward departure.",
            "This area is sometimes called the base because it represents the price range from which the directional movement developed.",
            "Demand zones can form after a decline that reverses upward or during an existing upward movement that temporarily pauses before continuing.",
            "To identify a potential demand zone, locate the upward departure and examine the candles immediately preceding it.",
            "The boundaries of the zone can be estimated using the bodies and wicks of the candles forming its base.",
            "There is no universally accepted method for drawing demand zones, so traders should use a consistent approach.",
            "A demand zone indicates historical buying pressure, not a guarantee that sufficient buying interest will remain when price returns.",
          ],
          points: [
            {
              title: "Drop-Base-Rally",
              description:
                "Price declines, forms a base, and then moves upward.",
              color: "#22c55e",
            },
            {
              title: "Rally-Base-Rally",
              description:
                "Price moves upward, temporarily consolidates, and then continues upward.",
              color: "#22d3ee",
            },
            {
              title: "Zone Boundaries",
              description:
                "The approximate price range surrounding the base before the upward departure.",
              color: "#eab308",
            },
          ],
        },
        {
          label: "Supply Formation",
          heading: "Identifying Supply Zones",
          image: "/learn/supplydemand/supply-zone.webp",
          imageAlt: "Identifying the origin of a supply zone",
          paragraphs: [
            "A supply zone is commonly identified near the origin of a significant downward price movement.",
            "Traders often look for a brief period of consolidation or a small group of candles immediately before a strong downward departure.",
            "Supply zones can form after an upward movement that reverses downward or during an existing downward movement that temporarily pauses before continuing.",
            "To identify a potential supply zone, locate the downward departure and examine the candles immediately preceding it.",
            "The bodies and wicks of the candles forming the base can help establish the approximate boundaries of the zone.",
            "A significant downward departure provides evidence of historical selling pressure, but it does not reveal whether additional sell orders remain at that location.",
            "If price later returns to the zone, traders should evaluate current market behavior rather than assuming that the original selling pressure still exists.",
          ],
          points: [
            {
              title: "Rally-Base-Drop",
              description:
                "Price moves upward, forms a base, and then declines.",
              color: "#ef4444",
            },
            {
              title: "Drop-Base-Drop",
              description:
                "Price declines, temporarily consolidates, and then continues downward.",
              color: "#eab308",
            },
            {
              title: "Zone Boundaries",
              description:
                "The approximate price range surrounding the base before the downward departure.",
              color: "#22d3ee",
            },
          ],
        },
        {
          label: "Market Imbalances",
          heading: "Understanding Price Imbalance",
          image: "/learn/supplydemand/price-imbalance.webp",
          imageAlt: "Understanding directional price imbalances",
          paragraphs: [
            "Every completed trade involves both a buyer and a seller. However, buying and selling activity can differ in urgency and available liquidity.",
            "When aggressive buy orders consume available sell orders at existing prices, subsequent transactions may occur at higher prices.",
            "When aggressive sell orders consume available buy orders at existing prices, subsequent transactions may occur at lower prices.",
            "These conditions can produce rapid directional movements with relatively little opposing price movement.",
            "On a candlestick chart, traders may identify potential imbalances through large directional candles, limited candle overlap, and strong departures from consolidation areas.",
            "Rapid price movement can also result from limited liquidity, unexpected news, or forced liquidations.",
            "A strong directional departure does not automatically prove that institutional traders entered the market or that unfilled orders remain behind.",
            "Price imbalances provide historical context, but the market is not required to return to the area where an imbalance developed.",
          ],
          points: [
            {
              title: "Bullish Imbalance",
              description:
                "Aggressive buying activity moves price through available sell-side liquidity.",
              color: "#22c55e",
            },
            {
              title: "Bearish Imbalance",
              description:
                "Aggressive selling activity moves price through available buy-side liquidity.",
              color: "#ef4444",
            },
            {
              title: "Liquidity",
              description:
                "The availability of opposing orders that allow transactions to occur without excessive price movement.",
              color: "#22d3ee",
            },
          ],
        },
        {
          label: "Zone Evaluation",
          heading: "What Happens When Price Returns to a Zone?",
          image: "/learn/supplydemand/zone-retest.webp",
          imageAlt: "Price returning to previously established supply and demand zones",
          paragraphs: [
            "When price returns to a previously identified supply or demand zone, traders can observe whether a meaningful reaction develops.",
            "A zone that has not been revisited since its formation is commonly described as a fresh zone.",
            "Some traders prioritize fresh zones because the original area has not yet experienced another test.",
            "However, a fresh zone does not guarantee that unfilled orders remain or that a stronger reaction will occur.",
            "Repeated visits can change the behavior of a zone as orders are executed, canceled, or replaced by new orders.",
            "A demand zone may produce an upward reaction, temporary consolidation, or continued downward movement.",
            "A supply zone may produce a downward reaction, temporary consolidation, or continued upward movement.",
            "If price moves decisively through a zone and sustains movement beyond it, the original zone may no longer provide the expected reaction.",
            "Traders should evaluate the current reaction instead of relying exclusively on the strength of the original departure.",
          ],
          points: [
            {
              title: "Fresh Zone",
              description:
                "A zone that price has not revisited since its original formation.",
              color: "#22d3ee",
            },
            {
              title: "Tested Zone",
              description:
                "A zone that price has revisited one or more times.",
              color: "#eab308",
            },
            {
              title: "Zone Invalidation",
              description:
                "Price behavior no longer supports the original interpretation of the zone.",
              color: "#ef4444",
            },
          ],
        },
        {
          label: "Technical Analysis Comparison",
          heading: "Supply and Demand vs Support and Resistance",
          image: "/learn/supplydemand/supply-demand-vs-support-resistance.webp",
          imageAlt: "Comparing supply and demand zones with support and resistance",
          paragraphs: [
            "Supply and demand analysis and support and resistance analysis are closely related, but they emphasize different aspects of historical price behavior.",
            "Support and resistance analysis commonly focuses on areas where price has previously encountered difficulty continuing in a particular direction.",
            "Supply and demand analysis commonly focuses on the origin of significant directional departures and the potential imbalances associated with those movements.",
            "A support zone may be identified through several historical upward reactions within a similar price range.",
            "A demand zone may be identified after a single significant upward departure from a relatively small price area.",
            "Similarly, resistance may develop through repeated downward reactions, while a supply zone may be identified from the origin of a significant downward departure.",
            "These concepts can overlap. A demand zone may also represent support, and a supply zone may also represent resistance.",
            "Neither approach is inherently more reliable in every market condition. Both require traders to evaluate current price behavior and acknowledge uncertainty.",
          ],
          points: [
            {
              title: "Support and Resistance",
              description:
                "Emphasizes historical price reactions around important levels or zones.",
              color: "#22d3ee",
            },
            {
              title: "Supply and Demand",
              description:
                "Emphasizes the origin of significant directional movements and potential price imbalances.",
              color: "#a78bfa",
            },
            {
              title: "Combined Context",
              description:
                "An area identified through both approaches may deserve additional attention, but its future behavior remains uncertain.",
              color: "#eab308",
            },
          ],
        },
        {
          label: "Practical Application",
          heading: "Evaluating Supply and Demand on a Chart",
          paragraphs: [
            "Begin by locating a significant upward or downward price movement on the chart.",
            "Trace the movement back to its origin and examine the candles that formed immediately before the departure.",
            "Estimate the upper and lower boundaries of the potential zone using a consistent method.",
            "Evaluate the size of the departure relative to surrounding price movements and observe whether it moved beyond previous price areas.",
            "Check whether price has already returned to the zone and how it behaved during those visits.",
            "Consider the width of the zone because wider zones may involve greater price uncertainty and require different risk management considerations.",
            "Use two horizontal lines in the TradeNestX simulator to represent the upper and lower boundaries of an identified supply or demand zone.",
            "Observe whether price reacts, consolidates, or moves through the zone when it returns.",
            "The objective is to understand where significant price imbalances previously developed and evaluate whether those areas remain relevant under current market conditions.",
          ],
          points: [
            {
              title: "Locate the Departure",
              description:
                "Identify a significant directional movement relative to surrounding price behavior.",
              color: "#22d3ee",
            },
            {
              title: "Identify the Origin",
              description:
                "Examine the price area immediately preceding the directional movement.",
              color: "#a78bfa",
            },
            {
              title: "Evaluate the Reaction",
              description:
                "Observe current market behavior rather than assuming the historical imbalance will repeat.",
              color: "#eab308",
            },
          ],
        },
      ]}

      questions={[
        "What is a supply zone?",
        "What is a demand zone?",
        "How do traders identify supply and demand zones?",
        "What is a price imbalance?",
        "What is a fresh supply or demand zone?",
        "What happens when price returns to a zone?",
        "What invalidates a supply or demand zone?",
        "What is the difference between supply and demand and support and resistance?",
      ]}
    />
  );
}