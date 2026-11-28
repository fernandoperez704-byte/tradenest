"use client";

import BasicLessonLayout from "../components/BasicLessonLayout";

type TradePlanLessonProps = {
  isCompleted: boolean;
  onComplete: () => void;
};

export default function TradePlanLesson({
  isCompleted,
  onComplete,
}: TradePlanLessonProps) {
  return (
    <BasicLessonLayout
      lessonId="setups"
      title="Building A Trade Plan"
      description="Learn how to organize market analysis, establish entry and exit conditions, evaluate potential risk and reward, and develop a consistent trading decision-making process."

      isCompleted={isCompleted}
      onComplete={onComplete}

      sections={[
        {
          label: "Trading Fundamentals",
          heading: "Understanding a Trade Plan",
          image: "/learn/tradeplan/trade-plan-basics.webp",
          imageAlt: "The essential components of a structured trade plan",
          paragraphs: [
            "A trade plan is a predefined set of conditions that guides a trader before, during, and after a trade.",
            "Instead of entering a position simply because price is moving, a trader establishes a clear reason for considering the opportunity.",
            "A structured trade plan combines market analysis, entry conditions, risk management, exit conditions, and position management.",
            "A trade plan should also explain what market behavior would invalidate the original trading idea.",
            "The purpose of planning is not to predict the market with certainty. It is to prepare for different outcomes before committing capital.",
            "A well-structured plan can help traders make more consistent decisions and evaluate their performance over time.",
            "Choosing not to enter a trade when the required conditions are absent is also part of following a trade plan.",
          ],
          points: [
            {
              title: "Market Analysis",
              description:
                "Understand the current market environment and the reason for considering a trade.",
              color: "#22d3ee",
            },
            {
              title: "Execution Conditions",
              description:
                "Define the specific conditions required before entering or exiting a position.",
              color: "#a78bfa",
            },
            {
              title: "Risk Management",
              description:
                "Establish acceptable risk and determine how the position will be managed.",
              color: "#eab308",
            },
          ],
        },
        {
          label: "Market Preparation",
          heading: "Developing a Trading Idea",
          paragraphs: [
            "Every trade plan should begin with an evaluation of the current market environment.",
            "Determine whether the market is trending upward, trending downward, or moving within a relatively established range.",
            "Identify important price zones and examine how the market is behaving around them.",
            "Consider whether the current price location provides sufficient room for the anticipated movement before encountering another important price zone.",
            "Develop a conditional trading idea based on observable market behavior rather than a personal expectation about where price should move.",
            "For example, a trader observing an upward trend near resistance may decide to evaluate the opportunity only if price establishes a sustained breakout.",
            "If the required conditions never develop, the original trading idea does not need to become an actual trade.",
          ],
          points: [
            {
              title: "Market Environment",
              description:
                "Identify whether price is trending, consolidating, or transitioning between conditions.",
              color: "#22d3ee",
            },
            {
              title: "Trading Thesis",
              description:
                "A clear explanation of why a particular market movement may develop.",
              color: "#a78bfa",
            },
            {
              title: "Required Conditions",
              description:
                "Observable market behavior that must occur before the trading idea is considered actionable.",
              color: "#eab308",
            },
          ],
        },
        {
          label: "Trade Execution",
          heading: "Defining Entry, Stop Loss, and Target",
          image: "/learn/tradeplan/entry-stop-target.webp",
          imageAlt: "A trade plan showing entry price, stop loss, and profit target",
          paragraphs: [
            "A structured trade plan establishes the intended entry conditions, protective exit conditions, and potential profit objectives before a position is opened.",
            "The entry represents the price or market condition at which the trader intends to open a position.",
            "The stop loss represents a predefined protective exit intended to limit losses if the market moves against the position.",
            "The stop loss should consider the price area where the original trading idea would no longer be supported by market behavior.",
            "A profit target represents a potential exit area based on the anticipated price movement and surrounding market conditions.",
            "Profit targets should consider realistic market obstacles rather than being selected solely according to the amount of money a trader wants to earn.",
            "After identifying an appropriate protective exit, the trader can calculate a position size consistent with the amount of capital they are willing to risk.",
            "Actual execution prices may differ from planned prices because of slippage, fees, liquidity conditions, and rapid market movement.",
          ],
          points: [
            {
              title: "Entry",
              description:
                "The predefined price or condition required to open a position.",
              color: "#22d3ee",
            },
            {
              title: "Stop Loss",
              description:
                "A protective exit intended to limit losses when the trade moves against the original plan.",
              color: "#ef4444",
            },
            {
              title: "Profit Target",
              description:
                "A potential exit area established using the anticipated movement and market context.",
              color: "#22c55e",
            },
            {
              title: "Invalidation",
              description:
                "The market condition that contradicts the original trading idea.",
              color: "#eab308",
            },
          ],
        },
        {
          label: "Trade Evaluation",
          heading: "Understanding Risk and Reward",
          image: "/learn/tradeplan/risk-reward.webp",
          imageAlt: "Comparing potential trading risk with potential reward",
          paragraphs: [
            "The risk-to-reward ratio compares the planned potential loss of a trade with its planned potential profit.",
            "For example, a hypothetical long position with an entry price of $100, a stop loss at $95, and a profit target at $110 has a planned price risk of $5 and a potential price reward of $10 per unit.",
            "This produces a risk-to-reward ratio of 1:2 before trading costs.",
            "A risk-to-reward ratio of 1:2 means the planned potential reward is twice the planned risk.",
            "A favorable ratio does not automatically make a trade a good opportunity. The probability of reaching the target and the surrounding market conditions must also be considered.",
            "Moving a profit target farther away simply to create a more attractive ratio does not improve the underlying trading opportunity.",
            "Similarly, placing a stop loss unnecessarily close to the entry can create an attractive ratio while increasing the likelihood of being stopped out by normal price fluctuations.",
            "Trading fees, funding costs where applicable, and slippage can reduce actual rewards and increase actual losses.",
          ],
          points: [
            {
              title: "1:1 Risk-to-Reward",
              description:
                "Risking $50 for a potential reward of $50 before trading costs.",
              color: "#22d3ee",
            },
            {
              title: "1:2 Risk-to-Reward",
              description:
                "Risking $50 for a potential reward of $100 before trading costs.",
              color: "#22c55e",
            },
            {
              title: "1:3 Risk-to-Reward",
              description:
                "Risking $50 for a potential reward of $150 before trading costs.",
              color: "#a78bfa",
            },
          ],
        },
        {
          label: "Long-Term Performance",
          heading: "Combining Risk, Reward, and Win Rate",
          paragraphs: [
            "The effectiveness of a trading approach cannot be determined by its win rate or risk-to-reward ratio alone.",
            "Win rate represents the percentage of completed trades that produce a profit.",
            "A trader can have a relatively low win rate and still achieve positive results if average winning trades are sufficiently larger than average losing trades.",
            "For example, consider ten hypothetical trades with four winning trades earning $100 each and six losing trades losing $50 each.",
            "The four winning trades produce $400 in total profits, while the six losing trades produce $300 in total losses.",
            "The combined result is a profit of $100 before trading costs, despite a win rate of only 40 percent.",
            "With an actual average loss of $50 and an actual average win of $100, the theoretical break-even win rate is approximately 33.3 percent before trading costs.",
            "Trading costs increase the win rate or average reward required to break even.",
            "These calculations illustrate why traders should evaluate their average results across a meaningful sample of completed trades rather than focusing exclusively on individual outcomes.",
            "Historical performance does not guarantee that the same results will continue under future market conditions.",
          ],
          points: [
            {
              title: "Win Rate",
              description:
                "The percentage of completed trades that produce a profit.",
              color: "#22d3ee",
            },
            {
              title: "Average Win and Loss",
              description:
                "The average financial result of profitable and losing trades.",
              color: "#a78bfa",
            },
            {
              title: "Trading Expectancy",
              description:
                "The estimated average result per trade based on win rate, average wins, average losses, and trading costs.",
              color: "#22c55e",
            },
          ],
        },
        {
          label: "Pre-Trade Preparation",
          heading: "Building a Pre-Trade Checklist",
          image: "/learn/tradeplan/checklist-before-trade.webp",
          imageAlt: "A checklist for evaluating a trading opportunity before entering",
          paragraphs: [
            "A pre-trade checklist helps traders evaluate whether an opportunity satisfies their predefined requirements.",
            "The checklist should contain specific questions that can be answered using observable information.",
            "Before entering a position, determine whether the market environment supports the original trading idea.",
            "Verify that the required entry conditions have developed and that the position is not being opened prematurely.",
            "Confirm that the protective exit, potential target, and position size have been established.",
            "Consider whether upcoming economic announcements, company earnings, or other relevant events could significantly affect market conditions.",
            "Evaluate whether the planned risk remains acceptable if the trade does not develop as expected.",
            "If an essential requirement is missing, the trader can wait, reassess the opportunity, or decide not to participate.",
          ],
          points: [
            {
              title: "Market Context",
              description:
                "Does the current market environment support the trading idea?",
              color: "#22d3ee",
            },
            {
              title: "Entry Conditions",
              description:
                "Have the predefined requirements for entering the position developed?",
              color: "#a78bfa",
            },
            {
              title: "Risk and Reward",
              description:
                "Are the potential loss, position size, and profit objective clearly defined?",
              color: "#eab308",
            },
            {
              title: "Trade Invalidation",
              description:
                "Is it clear what market behavior would invalidate the trading idea?",
              color: "#ef4444",
            },
            {
              title: "Execution Readiness",
              description:
                "Are the intended order type, exit conditions, and relevant trading costs understood?",
              color: "#22c55e",
            },
          ],
        },
        {
          label: "Position Management",
          heading: "Managing a Trade After Entry",
          paragraphs: [
            "A trade plan should explain how a position will be managed after it has been opened.",
            "Market conditions can change after entry, so traders should establish rules for responding to favorable and unfavorable price movement.",
            "Some traders use predefined exits, while others use trailing stops, partial exits, or adjustments based on specific market developments.",
            "A trailing stop is designed to move a protective exit in a favorable direction as price advances, according to predefined conditions.",
            "A partial exit involves closing a portion of a position while leaving the remaining portion open.",
            "Moving a stop loss to the entry price may reduce planned price risk, but trading costs and slippage can still produce a financial loss.",
            "Position management decisions should be consistent with the original plan or a predefined adjustment rule.",
            "Increasing exposure or widening a protective stop without reassessing total risk can create losses greater than originally intended.",
            "The objective is to respond to changing market conditions through a defined process rather than making unplanned adjustments.",
          ],
          points: [
            {
              title: "Predefined Exit",
              description:
                "Close the position when an established exit condition is reached.",
              color: "#22d3ee",
            },
            {
              title: "Trailing Stop",
              description:
                "Adjust a protective exit according to predefined favorable price movement.",
              color: "#eab308",
            },
            {
              title: "Partial Exit",
              description:
                "Close part of a position while continuing to manage the remaining exposure.",
              color: "#22c55e",
            },
          ],
        },
        {
          label: "Common Planning Mistakes",
          heading: "Recognizing an Incomplete Trade Plan",
          image: "/learn/tradeplan/common-plan-mistakes.webp",
          imageAlt: "Common mistakes traders make when developing a trade plan",
          paragraphs: [
            "A trading idea is not a complete trade plan simply because an entry price has been identified.",
            "Entering a position without defining the conditions for exiting leaves important decisions unresolved.",
            "Selecting a profit target without considering surrounding market conditions can create unrealistic expectations.",
            "Choosing position size before establishing acceptable risk can expose more capital than intended.",
            "Changing the original trading thesis after unfavorable price movement can make it difficult to recognize when a trade has become invalid.",
            "Using different entry and exit rules for every trade makes it difficult to evaluate whether a particular approach is effective.",
            "A profitable trade does not necessarily demonstrate that the planning process was sound.",
            "Similarly, a losing trade does not necessarily mean the original plan was poorly constructed.",
            "Traders should evaluate the quality of their decisions separately from the financial outcome of an individual trade.",
          ],
          points: [
            {
              title: "Undefined Risk",
              description:
                "Opening a position without establishing an acceptable potential loss.",
              color: "#ef4444",
            },
            {
              title: "Unrealistic Objectives",
              description:
                "Selecting profit targets without evaluating the surrounding market conditions.",
              color: "#eab308",
            },
            {
              title: "Inconsistent Rules",
              description:
                "Changing the decision-making process without a defined reason.",
              color: "#f97316",
            },
            {
              title: "Outcome-Based Evaluation",
              description:
                "Judging the quality of a trading decision solely by whether the trade made or lost money.",
              color: "#a78bfa",
            },
          ],
        },
        {
          label: "Trader Development",
          heading: "Reviewing and Improving Your Trade Plan",
          paragraphs: [
            "A trade plan becomes more useful when traders review how consistently they followed it and evaluate the results over time.",
            "After closing a position, record the original trading idea, intended entry, protective exit, profit objective, and actual execution results.",
            "Compare the original plan with the decisions made while the position was open.",
            "Identify whether the outcome resulted from normal market uncertainty, execution differences, or a failure to follow predefined conditions.",
            "Review multiple completed trades before making significant changes to the trading approach.",
            "Use the TradeNestX simulator to practice developing and executing trade plans without risking real capital.",
            "Review completed simulated trades to identify recurring mistakes, inconsistent decisions, and areas that require further practice.",
            "Gaby can help explain market behavior and trading concepts, but the trader remains responsible for evaluating the opportunity and developing an independent plan.",
            "Simulated trading provides a useful learning environment, although real trading may involve different execution conditions, financial pressure, and costs.",
            "The objective is to develop a repeatable decision-making process that can be evaluated, refined, and improved through experience.",
          ],
          points: [
            {
              title: "Plan",
              description:
                "Establish market conditions, entry requirements, acceptable risk, and exit rules.",
              color: "#22d3ee",
            },
            {
              title: "Execute",
              description:
                "Follow the predefined conditions and manage the position according to the plan.",
              color: "#eab308",
            },
            {
              title: "Review",
              description:
                "Compare the original plan with actual decisions and trading results.",
              color: "#a78bfa",
            },
            {
              title: "Improve",
              description:
                "Refine the process using evidence collected across multiple completed trades.",
              color: "#22c55e",
            },
          ],
        },
      ]}

      questions={[
        "What is a trade plan?",
        "How do traders develop a trading idea?",
        "How do traders determine entry, stop loss, and profit target?",
        "What is a risk-to-reward ratio?",
        "Can traders be profitable with a low win rate?",
        "What should a pre-trade checklist include?",
        "How should traders manage a position after entry?",
        "How can I practice and improve my trade plan using TradeNestX?",
      ]}
    />
  );
}