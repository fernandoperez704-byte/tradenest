"use client";

import BasicLessonLayout from "../components/BasicLessonLayout";

type ProtectingCapitalLessonProps = {
  isCompleted: boolean;
  onComplete: () => void;
};

export default function ProtectingCapitalLesson({
  isCompleted,
  onComplete,
}: ProtectingCapitalLessonProps) {
  return (
    <BasicLessonLayout
      lessonId="risk"
      title="Protecting Your Capital"
      description="Learn how risk management, position sizing, discipline, and capital preservation help traders survive uncertain market conditions."

      isCompleted={isCompleted}
      onComplete={onComplete}

      sections={[
        {
          label: "Risk Management",
          heading: "Capital Preservation Comes First",
          image: "/learn/risk/protecting-your-capital.webp",
          imageAlt: "Understanding capital preservation",
          paragraphs: [
            "Capital is the money available to a trader for trading and investing. Protecting that capital is one of the most important responsibilities in trading.",
            "Even experienced traders experience losing trades because no strategy can predict every market movement.",
            "Risk management focuses on controlling potential losses rather than attempting to eliminate uncertainty.",
            "Preserving capital allows traders to continue learning, improve their strategies, and participate in future opportunities.",
          ],
        },
        {
          label: "Position Sizing",
          heading: "Small Risk vs Large Risk",
          image: "/learn/risk/small-risk-vs-big-risk.webp",
          imageAlt: "Comparison of small and large trading risks",
          paragraphs: [
            "Position sizing determines how much exposure a trader takes when entering a position.",
            "A larger position increases both potential profits and potential losses for the same price movement.",
            "For example, a trader with a $1,000 account who plans to risk 1% of their capital is accepting a planned loss of $10 on that trade.",
            "Position size should account for the distance between the entry price and the planned stop loss, along with trading fees and potential slippage.",
            "Risking a smaller portion of capital on individual trades can reduce the damage caused by consecutive losses.",
          ],
        },
        {
          label: "Loss Management",
          heading: "Understanding Stop Loss Protection",
          image: "/learn/risk/stop-loss-protection.webp",
          imageAlt: "Using stop losses to manage trading risk",
          paragraphs: [
            "A stop loss is an instruction designed to exit a position when price reaches a specified trigger level.",
            "Traders use stop losses to establish where their original trade idea may no longer be valid.",
            "On a chart, a stop loss may be positioned beyond a relevant support level, resistance level, or structural price area.",
            "Placing a stop too close to the entry may result in an unnecessary exit during normal price fluctuations. Placing it too far away without adjusting position size may create excessive risk.",
            "A stop loss does not guarantee an exact execution price. Slippage, price gaps, and limited liquidity can cause actual losses to exceed planned losses.",
          ],
        },
        {
          label: "Trading Discipline",
          heading: "Avoiding Revenge Trading",
          image: "/learn/risk/revenge-trading.webp",
          imageAlt: "The risks of revenge trading",
          paragraphs: [
            "Revenge trading occurs when a trader attempts to recover a previous loss by entering another trade impulsively.",
            "This behavior can lead to larger positions, excessive leverage, and decisions that ignore the original trading plan.",
            "A losing trade does not make the next trading opportunity more favorable.",
            "Traders should evaluate each opportunity independently and avoid increasing risk simply because a previous trade was unsuccessful.",
          ],
        },
        {
          label: "Trade Evaluation",
          heading: "Understanding Risk to Reward",
          image: "/learn/risk/risk-to-reward.webp",
          imageAlt: "Understanding trading risk and potential reward",
          paragraphs: [
            "The risk-to-reward ratio compares the potential loss of a trade with its potential profit.",
            "For example, risking $10 for a potential profit of $20 represents a risk-to-reward ratio of 1:2.",
            "On a chart, traders can compare the distance from their planned entry to their stop loss with the distance from their entry to their profit target.",
            "A favorable risk-to-reward ratio does not guarantee a profitable trade or strategy.",
            "Long-term results also depend on win rate, execution quality, trading costs, and consistency.",
          ],
          points: [
            {
              title: "Planned Risk",
              description:
                "The potential loss based on the entry, stop loss, and position size.",
              color: "#ef4444",
            },
            {
              title: "Potential Reward",
              description:
                "The potential profit if price reaches the planned target.",
              color: "#22c55e",
            },
          ],
        },
        {
          label: "Risk Exposure",
          heading: "Recognizing Overtrading",
          image: "/learn/risk/overtrading-warning.webp",
          imageAlt: "Warning signs of overtrading",
          paragraphs: [
            "Overtrading occurs when a trader enters more positions than their strategy, risk limits, or market conditions justify.",
            "Frequent trading can increase transaction costs and expose capital to unnecessary market risk.",
            "Holding multiple positions in closely related assets can also increase total exposure, even when each position appears small individually.",
            "Traders should evaluate their combined exposure rather than treating every open position as an independent risk.",
          ],
        },
        {
          label: "Capital Management",
          heading: "Building a Capital Protection Framework",
          image: "/learn/risk/protecting-capital-pyramid.webp",
          imageAlt: "Capital protection and risk management framework",
          paragraphs: [
            "Effective capital protection requires consistent rules rather than decisions made individually under pressure.",
            "A risk management framework may include position size limits, maximum daily losses, total exposure limits, and predefined exit conditions.",
            "These rules should be established before entering trades and adjusted only through deliberate evaluation.",
            "Profit objectives should never override the risk limits established to protect the trading account.",
          ],
          points: [
            {
              title: "Capital Preservation",
              description:
                "Protect the account from losses that could prevent continued trading.",
              color: "#22d3ee",
            },
            {
              title: "Controlled Exposure",
              description:
                "Manage individual position sizes and combined account risk.",
              color: "#22c55e",
            },
            {
              title: "Consistent Discipline",
              description:
                "Follow predefined risk rules regardless of recent trading results.",
              color: "#eab308",
            },
          ],
        },
        {
          label: "Drawdown",
          heading: "The Impact of One Large Loss",
          image: "/learn/risk/one-bad-trade.webp",
          imageAlt: "How large trading losses affect account recovery",
          paragraphs: [
            "Drawdown measures the decline in account value from a previous peak.",
            "As losses become larger, the percentage gain required to recover the original capital increases.",
            "For example, losing 20% of an account requires a 25% gain on the remaining capital to recover.",
            "A 50% loss requires a 100% gain to return to the original account value.",
            "This is why preventing excessive losses is essential, even when a trader believes strongly in a particular opportunity.",
          ],
          points: [
            {
              title: "10% Loss",
              description:
                "Requires approximately an 11.1% gain to recover.",
              color: "#eab308",
            },
            {
              title: "20% Loss",
              description:
                "Requires a 25% gain to recover.",
              color: "#f97316",
            },
            {
              title: "50% Loss",
              description:
                "Requires a 100% gain to recover.",
              color: "#ef4444",
            },
          ],
        },
        {
          label: "Practical Application",
          heading: "Practice Before Risking Real Capital",
          image: "/learn/risk/demo-first.webp",
          imageAlt: "Practicing risk management in a trading simulator",
          paragraphs: [
            "A trading simulator allows traders to practice position sizing, stop loss placement, and risk-to-reward evaluation without risking real money.",
            "Use the TradeNestX simulator to establish a planned entry, identify an appropriate exit level, and calculate potential risk before opening a position.",
            "Review completed trades to determine whether your decisions followed your original risk management rules.",
            "Evaluate consistency and discipline rather than focusing exclusively on simulated profits.",
            "Simulation helps develop practical skills, but it cannot fully reproduce real-world execution conditions or the emotional pressure of risking actual money.",
          ],
        },
      ]}

      questions={[
        "What is risk management?",
        "Why do traders use stop losses?",
        "What is revenge trading?",
        "Why is protecting capital important?",
        "How does position sizing affect risk?",
        "What is a risk-to-reward ratio?",
        "What is drawdown?",
        "Why should traders limit their total market exposure?",
      ]}
    />
  );
}