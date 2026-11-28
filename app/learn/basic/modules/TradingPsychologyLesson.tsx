"use client";

import BasicLessonLayout from "../components/BasicLessonLayout";

type TradingPsychologyLessonProps = {
  isCompleted: boolean;
  onComplete: () => void;
};

export default function TradingPsychologyLesson({
  isCompleted,
  onComplete,
}: TradingPsychologyLessonProps) {
  return (
    <BasicLessonLayout
      lessonId="psychology"
      title="Trading Psychology"
      description="Understand how emotions, behavioral biases, and personal habits influence trading decisions, and learn how to develop a disciplined and consistent approach to the market."

      isCompleted={isCompleted}
      onComplete={onComplete}

      sections={[
        {
          label: "Psychological Fundamentals",
          heading: "Understanding Trading Psychology",
          image: "/learn/psychology/psychology-basics.webp",
          imageAlt: "The relationship between emotions and trading decisions",
          paragraphs: [
            "Trading psychology examines how emotions, beliefs, expectations, and behavioral habits influence financial decisions.",
            "Understanding market analysis does not guarantee that a trader will apply that knowledge consistently.",
            "Financial uncertainty can create emotional reactions that influence how traders interpret information and respond to price movement.",
            "A trader may understand the importance of waiting for confirmation but still enter a position prematurely because of excitement or impatience.",
            "Another trader may recognize that a position is no longer supported by market conditions but hesitate to close it because accepting a loss feels uncomfortable.",
            "Developing trading discipline does not require eliminating emotions. It requires recognizing emotional reactions and preventing them from controlling important decisions.",
            "Psychological discipline can improve decision-making consistency, but it cannot eliminate market uncertainty or guarantee profitability.",
          ],
          points: [
            {
              title: "Emotional Awareness",
              description:
                "Recognizing how personal feelings influence the interpretation of market information.",
              color: "#22d3ee",
            },
            {
              title: "Self-Control",
              description:
                "Maintaining control over decisions when experiencing emotional pressure.",
              color: "#a78bfa",
            },
            {
              title: "Consistency",
              description:
                "Applying a defined decision-making process across different market conditions.",
              color: "#22c55e",
            },
          ],
        },
        {
          label: "Emotional Behavior",
          heading: "Understanding Fear and Greed",
          image: "/learn/psychology/fear-vs-greed.webp",
          imageAlt: "How fear and greed influence trading behavior",
          paragraphs: [
            "Fear and greed are two common emotional influences in financial markets.",
            "Fear may develop when traders experience uncertainty, anticipate financial losses, or remember previous negative trading experiences.",
            "Excessive fear can cause traders to hesitate when their predefined conditions are satisfied, close positions prematurely, or avoid making decisions altogether.",
            "Greed may develop when traders become excessively focused on potential profits.",
            "Excessive greed can encourage traders to increase exposure beyond their intended limits, ignore exit conditions, or pursue unrealistic financial expectations.",
            "Both emotions can cause traders to focus more on potential financial outcomes than on the actual behavior of the market.",
            "Recognizing these reactions allows traders to evaluate whether their decisions are supported by objective information or influenced primarily by emotion.",
          ],
          points: [
            {
              title: "Fear",
              description:
                "An emotional response to uncertainty or potential loss that may interfere with objective decisions.",
              color: "#ef4444",
            },
            {
              title: "Greed",
              description:
                "An excessive desire for financial gain that may encourage unnecessary exposure or unrealistic expectations.",
              color: "#eab308",
            },
            {
              title: "Emotional Balance",
              description:
                "Recognizing emotional reactions while continuing to evaluate decisions objectively.",
              color: "#22d3ee",
            },
          ],
        },
        {
          label: "Impulsive Decisions",
          heading: "Fear of Missing Out (FOMO)",
          image: "/learn/psychology/fomo-trading.webp",
          imageAlt: "Fear of missing out during rapid market movement",
          paragraphs: [
            "Fear of missing out, commonly known as FOMO, occurs when traders feel pressured to participate because they believe an opportunity may disappear.",
            "FOMO frequently develops during rapid price movements, increased social media attention, or discussions about other traders making substantial profits.",
            "A trader experiencing FOMO may abandon their original entry requirements because waiting feels like missing an opportunity.",
            "For example, after observing several large bullish candles, a trader may enter a position without evaluating whether price is approaching an important resistance area.",
            "The decision becomes driven by the movement that has already occurred rather than an objective evaluation of the remaining opportunity.",
            "Missing a price movement does not create a financial loss by itself.",
            "Traders can reduce impulsive behavior by recognizing that they are not required to participate in every market movement.",
            "If an opportunity no longer satisfies the original requirements, waiting for another opportunity is a valid decision.",
          ],
          points: [
            {
              title: "Chasing Price",
              description:
                "Entering after substantial price movement because of pressure to participate.",
              color: "#f97316",
            },
            {
              title: "Social Pressure",
              description:
                "Allowing other people's reported profits or opinions to influence personal decisions.",
              color: "#a78bfa",
            },
            {
              title: "Opportunity Acceptance",
              description:
                "Accepting that some market movements will occur without personal participation.",
              color: "#22c55e",
            },
          ],
        },
        {
          label: "Responding to Losses",
          heading: "Understanding Revenge Trading",
          paragraphs: [
            "Revenge trading occurs when a trader attempts to recover a previous financial loss through emotionally driven trading decisions.",
            "After experiencing a loss, a trader may feel frustrated, embarrassed, or determined to recover the lost money immediately.",
            "This emotional pressure can encourage larger positions, excessive trading frequency, or entries that do not satisfy the original trading requirements.",
            "The trader begins focusing on recovering a specific financial amount rather than evaluating the quality of the next opportunity.",
            "The market does not change its behavior because an individual trader has experienced a loss.",
            "Each new trading opportunity should be evaluated independently of the financial outcome of previous trades.",
            "Establishing personal session limits and taking time away from trading after emotionally difficult experiences can help interrupt impulsive behavior.",
            "A trader who feels unable to make objective decisions does not need to continue trading that session.",
          ],
          points: [
            {
              title: "Loss Recovery Pressure",
              description:
                "Feeling obligated to recover previous losses immediately.",
              color: "#ef4444",
            },
            {
              title: "Emotional Escalation",
              description:
                "Increasing trading activity or exposure in response to frustration.",
              color: "#f97316",
            },
            {
              title: "Independent Evaluation",
              description:
                "Assessing each new opportunity without allowing previous losses to determine the decision.",
              color: "#22d3ee",
            },
          ],
        },
        {
          label: "Confidence and Decision Quality",
          heading: "Overconfidence After Winning Trades",
          paragraphs: [
            "Overconfidence occurs when traders develop an exaggerated belief in their ability to predict or control market outcomes.",
            "A series of profitable trades can create the impression that a trading approach is more reliable than the available evidence actually demonstrates.",
            "Traders may begin increasing exposure, ignoring unfavorable information, or entering positions without their usual preparation.",
            "Winning trades can result from sound decisions, favorable market conditions, random variation, or a combination of these factors.",
            "A short winning streak is not sufficient evidence that a trading approach will remain effective under different market conditions.",
            "Confidence becomes more useful when it is supported by consistent preparation, realistic expectations, and evidence collected across many decisions.",
            "Maintaining the same standards after profitable trades can help prevent successful periods from encouraging unnecessary risk.",
          ],
          points: [
            {
              title: "Healthy Confidence",
              description:
                "Confidence supported by preparation, experience, and realistic expectations.",
              color: "#22c55e",
            },
            {
              title: "Overconfidence",
              description:
                "Assuming that recent success demonstrates greater predictive ability than the evidence supports.",
              color: "#eab308",
            },
            {
              title: "Process Consistency",
              description:
                "Maintaining established decision-making standards regardless of recent financial results.",
              color: "#22d3ee",
            },
          ],
        },
        {
          label: "Behavioral Biases",
          heading: "Recognizing Cognitive Biases in Trading",
          paragraphs: [
            "Cognitive biases are systematic tendencies in human thinking that can influence how information is interpreted and how decisions are made.",
            "Confirmation bias occurs when traders focus on information that supports their existing opinion while overlooking evidence that contradicts it.",
            "Loss aversion describes the tendency for losses to feel more significant than equivalent gains.",
            "Anchoring bias occurs when traders become excessively attached to a particular price, previous market high, or original entry level.",
            "Recency bias occurs when recent experiences receive more importance than a broader collection of historical evidence.",
            "The disposition effect describes a tendency to realize profitable positions too early while holding losing positions longer than intended.",
            "These tendencies can influence decisions even when traders believe they are evaluating the market objectively.",
            "One useful habit is to deliberately examine information that contradicts the original trading idea.",
            "Recognizing a bias does not automatically eliminate it, but awareness can help traders develop procedures that reduce its influence.",
          ],
          points: [
            {
              title: "Confirmation Bias",
              description:
                "Favoring information that supports an existing opinion while overlooking contradictory evidence.",
              color: "#a78bfa",
            },
            {
              title: "Loss Aversion",
              description:
                "Experiencing the psychological impact of losses more strongly than equivalent gains.",
              color: "#ef4444",
            },
            {
              title: "Anchoring Bias",
              description:
                "Allowing an initial price or reference point to influence later decisions excessively.",
              color: "#eab308",
            },
            {
              title: "Recency Bias",
              description:
                "Giving excessive importance to recent events or trading outcomes.",
              color: "#22d3ee",
            },
            {
              title: "Disposition Effect",
              description:
                "A tendency to close profitable positions too early while retaining losing positions.",
              color: "#f97316",
            },
          ],
        },
        {
          label: "Patience and Discipline",
          heading: "Learning When Not to Trade",
          image: "/learn/psychology/patience-in-trading.webp",
          imageAlt: "Practicing patience and waiting for suitable market conditions",
          paragraphs: [
            "Patience is the ability to wait without allowing inactivity or uncertainty to create unnecessary pressure.",
            "Financial markets can remain unpredictable, directionless, or unsuitable for a particular trading approach for extended periods.",
            "Traders who feel obligated to participate continuously may begin interpreting ordinary price fluctuations as meaningful opportunities.",
            "Overtrading occurs when trading activity exceeds what is justified by the trader's established approach.",
            "Excessive trading can increase transaction costs, emotional fatigue, and exposure to unnecessary market uncertainty.",
            "Patience allows traders to observe market behavior without feeling required to respond to every movement.",
            "Discipline also involves recognizing when fatigue, stress, or distraction may interfere with decision-making quality.",
            "Remaining out of the market is a legitimate decision when suitable conditions are absent.",
          ],
          points: [
            {
              title: "Patience",
              description:
                "Waiting for suitable conditions without creating unnecessary pressure to participate.",
              color: "#22c55e",
            },
            {
              title: "Overtrading",
              description:
                "Trading more frequently than justified by an established decision-making process.",
              color: "#ef4444",
            },
            {
              title: "Mental Readiness",
              description:
                "Recognizing whether concentration and emotional conditions support objective decisions.",
              color: "#22d3ee",
            },
          ],
        },
        {
          label: "Professional Mindset",
          heading: "Thinking in Probabilities",
          image: "/learn/psychology/thinking-like-a-professional.webp",
          imageAlt: "Developing a disciplined and probability-based trading mindset",
          paragraphs: [
            "A probability-based trading mindset recognizes that individual market outcomes cannot be known with certainty.",
            "Even a carefully evaluated trading opportunity can produce a financial loss.",
            "Accepting uncertainty allows traders to evaluate decisions without expecting every trade to produce a favorable outcome.",
            "Instead of attempting to prove that a market prediction was correct, traders can focus on whether their decisions were supported by the information available at the time.",
            "An individual profitable trade may result from a poor decision, while an individual losing trade may result from a reasonable decision.",
            "Outcome bias occurs when the quality of a decision is judged primarily by its final result rather than the information and reasoning available when the decision was made.",
            "A professional mindset emphasizes preparation, adaptability, accountability, and continuous learning.",
            "The objective is not to control market outcomes but to maintain control over personal decisions and behavior.",
          ],
          points: [
            {
              title: "Accept Uncertainty",
              description:
                "Recognize that no market analysis can guarantee an individual outcome.",
              color: "#22d3ee",
            },
            {
              title: "Avoid Outcome Bias",
              description:
                "Evaluate the reasoning behind a decision rather than judging it exclusively by its result.",
              color: "#a78bfa",
            },
            {
              title: "Personal Accountability",
              description:
                "Take responsibility for personal decisions without attempting to control unpredictable market behavior.",
              color: "#22c55e",
            },
          ],
        },
        {
          label: "Behavioral Development",
          heading: "Building Sustainable Trading Habits",
          paragraphs: [
            "Psychological discipline develops through repeated practice, self-observation, and consistent behavioral habits.",
            "Before beginning a trading session, evaluate whether stress, fatigue, frustration, or excitement could interfere with objective decisions.",
            "During the session, recognize emotional reactions without immediately acting on them.",
            "After the session, record situations where emotions influenced decisions, including both profitable and losing trades.",
            "A behavioral journal can help identify recurring patterns such as entering prematurely, hesitating unnecessarily, or increasing trading activity after losses.",
            "Reviewing these patterns can help traders establish specific behavioral improvements rather than relying on general promises to become more disciplined.",
            "Avoid treating trading as an obligation to generate immediate income or recover previous financial losses.",
            "If trading begins to interfere with financial stability, personal relationships, sleep, or everyday responsibilities, stepping away and seeking appropriate support may be necessary.",
            "Developing sustainable habits is more important than attempting to maximize activity during every trading session.",
          ],
          points: [
            {
              title: "Before Trading",
              description:
                "Evaluate concentration, emotional readiness, and personal expectations.",
              color: "#22d3ee",
            },
            {
              title: "During Trading",
              description:
                "Recognize emotional impulses and evaluate whether they are influencing decisions.",
              color: "#eab308",
            },
            {
              title: "After Trading",
              description:
                "Record behavioral patterns and identify specific areas for improvement.",
              color: "#a78bfa",
            },
            {
              title: "Personal Boundaries",
              description:
                "Recognize when trading activity is negatively affecting financial or personal well-being.",
              color: "#22c55e",
            },
          ],
        },
        {
          label: "Practical Application",
          heading: "Practicing Trading Discipline in TradeNestX",
          paragraphs: [
            "The TradeNestX simulator provides an environment where traders can practice decision-making without risking real capital.",
            "During simulated trading sessions, pay attention to personal reactions when price moves rapidly, a position becomes profitable, or a trade produces a loss.",
            "Observe whether excitement encourages premature entries or whether frustration creates pressure to open another position.",
            "Review completed simulated trades and identify situations where emotional reactions influenced the original decision-making process.",
            "Practice allowing market opportunities to pass when the required conditions are absent.",
            "Use Gaby to improve your understanding of market behavior and trading concepts rather than seeking reassurance or instructions about what to buy or sell.",
            "Remember that simulated trading cannot fully reproduce the emotional pressure associated with risking real money.",
            "The goal is to develop independent thinking, emotional awareness, and consistent behavior before considering real financial exposure.",
          ],
          points: [
            {
              title: "Observe",
              description:
                "Recognize emotional reactions during different simulated market conditions.",
              color: "#22d3ee",
            },
            {
              title: "Practice",
              description:
                "Develop consistent behavior without committing real capital.",
              color: "#eab308",
            },
            {
              title: "Reflect",
              description:
                "Identify recurring behavioral mistakes and evaluate their influence on decisions.",
              color: "#a78bfa",
            },
            {
              title: "Develop Independence",
              description:
                "Build the ability to evaluate market information without depending on external trading instructions.",
              color: "#22c55e",
            },
          ],
        },
      ]}

      questions={[
        "What is trading psychology?",
        "How do fear and greed influence trading decisions?",
        "What is FOMO trading and how can traders recognize it?",
        "What is revenge trading?",
        "Why can winning trades lead to overconfidence?",
        "What are the most common cognitive biases in trading?",
        "Why are patience and emotional discipline important?",
        "How can I practice trading psychology using TradeNestX?",
      ]}
    />
  );
}