"use client";

import AdvancedLessonLayout from "../components/AdvancedLessonLayout";

export default function MarketStructureLesson() {
  return (
    <AdvancedLessonLayout
      title="Market Structure"
      description="Learn how to identify market structure, interpret price movements, recognize changing market conditions, and apply this knowledge to make more informed trading decisions."

      sections={[
        {
          label: "Understanding Market Structure",
          heading: "Identifying Swing Highs and Swing Lows",
          image: "/learn/advanced/structure/market-structure.png",
          imageAlt: "TradeNestX chart showing significant swing highs and swing lows",
          paragraphs: [
            "Market structure describes how price moves through a sequence of highs and lows over time. These movements provide a foundation for understanding whether a market is advancing, declining, or consolidating.",

            "To identify market structure, begin by locating significant points where price changes direction. A swing high forms when price advances to a peak before declining, while a swing low forms when price declines to a bottom before recovering. Subsequent price action is necessary to establish these swing points.",

            "Market structure can be divided into external and internal structure. External structure consists of the major swing highs and swing lows that define the broader market direction on the selected timeframe. Internal structure consists of smaller price movements that develop within those larger structural swings.",

            "To distinguish between them, zoom out and identify the major advances and declines before examining smaller movements within them. A break of an internal swing level may indicate a temporary change in momentum without invalidating the external market structure.",

            "Understanding this distinction helps traders prioritize meaningful structural levels, evaluate pullbacks, and avoid mistaking minor price fluctuations for major changes in market direction.",
          ],
          points: [
            {
              title: "Swing High",
              color: "#22c55e",
              description:
                "A local price peak where an upward movement is followed by a decline.",
            },
            {
              title: "Swing Low",
              color: "#ef4444",
              description:
                "A local price bottom where a downward movement is followed by a recovery.",
            },
            {
              title: "Internal Structure",
              color: "#38bdf8",
              description:
                "Smaller swing highs and swing lows that develop within a larger structural movement.",
            },
            {
              title: "External Structure",
              color: "#eab308",
              description:
                "Major swing highs and swing lows that define the broader market structure on the selected timeframe.",
            },
          ],
          caption:
            "Identify the significant peaks and valleys before comparing their positions to determine the market structure.",
        },

        {
          label: "Bullish Market Structure",
          heading: "Identifying Higher Highs and Higher Lows",
          image: "/learn/advanced/structure/bullish-structure.png",
          imageAlt: "TradeNestX chart showing higher highs and higher lows",
          paragraphs: [
            "Bullish market structure develops when price establishes a sequence of higher highs and higher lows. Each significant advance exceeds the previous swing high, while subsequent pullbacks remain above the previous significant swing low.",

            "When an advance breaks above a previous significant swing high, identify the swing low from which that advance originated. This level is commonly referred to as a protected low because it represents an important reference point for maintaining the established bullish structure.",

            "Traders can use these structural levels to evaluate pullbacks, identify potential support areas, and assess whether their bullish interpretation remains valid. A temporary decline within the established structure does not necessarily indicate a reversal.",

            "Difficulty establishing new highs may indicate weakening momentum, while a confirmed break below a protected low challenges the existing bullish structure. Recognizing these developments helps traders reassess their market interpretation and evaluate risk rather than assuming the trend will continue indefinitely.",
          ],
          points: [
            {
              title: "Higher High (HH)",
              color: "#22c55e",
              description:
                "A swing high that forms above the previous significant swing high.",
            },
            {
              title: "Higher Low (HL)",
              color: "#22c55e",
              description:
                "A swing low that forms above the previous significant swing low.",
            },
            {
              title: "Protected Low",
              color: "#eab308",
              description:
                "A significant swing low associated with an advance that breaks a previous structural high, serving as a reference level for evaluating bullish structural invalidation.",
            },
          ],
          caption:
            "Compare consecutive swing highs and swing lows to recognize the upward progression of bullish market structure.",
        },

        {
          label: "Bearish Market Structure",
          heading: "Identifying Lower Highs and Lower Lows",
          image: "/learn/advanced/structure/bearish-structure.png",
          imageAlt: "TradeNestX chart showing lower highs and lower lows",
          paragraphs: [
            "Bearish market structure develops when price establishes a sequence of lower highs and lower lows. Each significant decline moves below the previous swing low, while subsequent recoveries fail to reach the previous significant swing high.",

            "When a decline breaks below a previous significant swing low, identify the swing high from which that decline originated. This level is commonly referred to as a protected high because it represents an important reference point for maintaining the established bearish structure.",

            "Traders can use these structural levels to evaluate temporary recoveries, identify potential resistance areas, and assess whether their bearish interpretation remains valid. An upward movement within the established structure does not necessarily indicate a bullish reversal.",

            "Difficulty establishing new lows may indicate weakening downward momentum, while a confirmed break above a protected high challenges the existing bearish structure. Recognizing these developments helps traders reassess their market interpretation and evaluate risk rather than assuming price will continue declining.",
          ],
          points: [
            {
              title: "Lower High (LH)",
              color: "#ef4444",
              description:
                "A swing high that forms below the previous significant swing high.",
            },
            {
              title: "Lower Low (LL)",
              color: "#ef4444",
              description:
                "A swing low that forms below the previous significant swing low.",
            },
            {
              title: "Protected High",
              color: "#eab308",
              description:
                "A significant swing high associated with a decline that breaks a previous structural low, serving as a reference level for evaluating bearish structural invalidation.",
            },
          ],
          caption:
            "Observe how successive recoveries and declines establish progressively lower structural levels.",
        },

        {
          label: "Sideways Market Structure",
          heading: "Recognizing Consolidation and Trading Ranges",
          image: "/learn/advanced/structure/sideways-structure.png",
          imageAlt: "TradeNestX chart showing sideways market structure between support and resistance",
          paragraphs: [
            "Sideways market structure develops when price fluctuates within a relatively defined range without establishing consistent higher highs and higher lows or lower highs and lower lows.",

            "To identify a sideways market, look for repeated price reactions around similar upper and lower boundaries. Swing highs that form around similar prices are commonly referred to as equal highs, while swing lows that form around similar prices are referred to as equal lows. These levels do not need to be perfectly identical.",

            "Traders can identify the upper resistance zone, the lower support zone, and the current position of price within the range. This helps them evaluate the available room for price movement, recognize nearby structural barriers, and avoid treating movements within consolidation as established directional trends.",

            "Equal highs or equal lows can also develop within an existing trend and may indicate difficulty extending the previous structural movement. However, their presence alone does not confirm consolidation or a reversal.",

            "A consolidation range can eventually develop into either trend continuation or a reversal. To evaluate a potential breakout or breakdown, observe whether price closes beyond the range boundary and establishes subsequent structural progression outside the range. A temporary move beyond the boundary may represent a false break.",
          ],
          points: [
            {
              title: "Resistance Zone",
              color: "#ef4444",
              description:
                "The upper area of the range where price repeatedly struggles to advance.",
            },
            {
              title: "Support Zone",
              color: "#22c55e",
              description:
                "The lower area of the range where price repeatedly struggles to decline further.",
            },
            {
              title: "Equal Highs (EQH)",
              color: "#eab308",
              description:
                "Two or more significant swing highs that form around a similar price level, indicating difficulty establishing higher highs.",
            },
            {
              title: "Equal Lows (EQL)",
              color: "#eab308",
              description:
                "Two or more significant swing lows that form around a similar price level, indicating difficulty establishing lower lows.",
            },
          ],
          caption:
            "Observe how price repeatedly reacts near the range boundaries without establishing a consistent directional trend.",
        },

        {
          label: "Market Structure Transition",
          heading: "Identifying Structural Breaks and Potential Reversals",
          image: "/learn/advanced/structure/structure-transition.png",
          imageAlt: "TradeNestX chart showing a structural break and changing market direction",
          paragraphs: [
            "Market structure begins to transition when price no longer maintains its established sequence of highs and lows. Recognizing these changes helps traders distinguish trend continuation, structural weakness, and potential reversals.",

            "A Break of Structure (BOS) commonly describes price breaking a significant swing level in the direction of the established trend. In bullish conditions, this involves breaking above a previous significant high, while in bearish conditions, it involves breaking below a previous significant low.",

            "A Change of Character (CHoCH) commonly describes a structural break against the established trend. A break below a protected low challenges bullish structure, while a break above a protected high challenges bearish structure. This provides an early indication of changing market conditions rather than confirmation of a new trend.",

            "To evaluate a structural break, identify the significance of the level being challenged, observe whether price closes beyond that level, and examine whether subsequent price movements sustain the break. A wick beyond a structural level followed by a return to the previous price area may indicate a false break. Even a candle close beyond the level does not guarantee continuation.",

            "Following a bearish Change of Character, observe whether subsequent recoveries establish lower highs and further declines establish lower lows. Following a bullish Change of Character, observe whether subsequent advances establish higher highs and pullbacks establish higher lows. This developing sequence provides stronger evidence of a structural transition than an isolated break.",

            "Market structure must also be evaluated across relevant timeframes. For example, traders can use the daily chart to identify the broader structure, the four-hour chart to examine significant structural developments, and the fifteen-minute chart to observe shorter-term price movements. A bearish structure on the fifteen-minute chart may represent a temporary pullback within a bullish daily structure.",

            "When structural conditions change, traders can reassess their directional interpretation, identify which structural levels remain valid, and evaluate whether their original assumptions still apply. Market structure provides a framework for evaluating market conditions and risk, not a guarantee of future price direction.",
          ],
          points: [
            {
              title: "Break of Structure (BOS)",
              color: "#22c55e",
              description:
                "A break of a significant structural level in the direction of the established trend, commonly interpreted as evidence of continuation.",
            },
            {
              title: "Change of Character (CHoCH)",
              color: "#eab308",
              description:
                "A break against the established structural direction that may provide an early indication of changing market conditions.",
            },
            {
              title: "False Break",
              color: "#ef4444",
              description:
                "A temporary movement beyond a structural level followed by a return to the previous price area without sustained continuation.",
            },
            {
              title: "Reversal Confirmation",
              color: "#38bdf8",
              description:
                "The development of a consistent structural sequence in the opposite direction following an initial structural break, providing stronger evidence of a potential reversal.",
            },
          ],
          caption:
            "Evaluate the structural level being broken and the subsequent sequence of highs and lows before interpreting a potential market transition.",
        },
      ]}

      questions={[
        "How do I identify significant swing highs and swing lows?",
        "What is the difference between internal and external market structure?",
        "How do I identify bullish and bearish market structure?",
        "How can protected highs and protected lows help me evaluate risk?",
        "How do I identify consolidation using equal highs and equal lows?",
        "What is the difference between BOS and CHoCH?",
        "How do I distinguish a false break from a structural reversal?",
        "How do I analyze market structure across multiple timeframes?",
      ]}
    />
  );
}