"use client";

import { useState } from "react";

type GabySimulatorCoachProps = {
  mode: string;
  selectedCoin: string;
  trades: any[];
  futuresHistory: any[];
  positions: any;
  futuresPositions: any[];
  balance: number;
  marginUsed: number;

  marketIntelligence?: any;
  movingAverageAnalysis?: any;
  currentEntryQuality?: string | null;
};

export default function GabySimulatorCoach({
  mode,
  selectedCoin,
  trades,
  futuresHistory,
  positions,
  futuresPositions,
  balance,
  marginUsed,
  marketIntelligence,
  movingAverageAnalysis,
  currentEntryQuality,
}: GabySimulatorCoachProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "Hi, I’m Gaby. I can help explain the simulator, spot trading, futures, leverage, liquidation, and review your practice trades."
  );
  const [loading, setLoading] = useState(false);

  async function askGaby(customQuestion?: string) {
    const finalQuestion = customQuestion || question;

    if (!finalQuestion.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/gaby-simulator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: finalQuestion,
          simulatorContext: {
            mode,
            selectedCoin,
            balance,
            marginUsed,
            trades: trades.slice(-5),
            futuresHistory: futuresHistory.slice(-5),
            positions,
            futuresPositions,
          },
        }),
      });

      const data = await res.json();

      setAnswer(data.answer || "Gaby could not respond right now.");
      setQuestion("");
    } catch (error) {
      setAnswer("Gaby is having trouble reviewing the simulator right now.");
    } finally {
      setLoading(false);
    }
  }

function reviewTrade() {
  const closedTrades =
    mode === "FUTURES"
      ? futuresHistory.filter(
          (trade) =>
            trade.status !== "OPEN" &&
            trade.pnl !== null &&
            trade.pnl !== undefined
        )
      : trades.filter(
          (trade) =>
            trade.type === "SELL" &&
            trade.pnl !== null &&
            trade.pnl !== undefined
        );

  const latestTrade = [...closedTrades].sort((a, b) => {
    const timeA = new Date(
      a.closedAt ?? a.createdAt ?? a.time ?? a.date ?? 0
    ).getTime();

    const timeB = new Date(
      b.closedAt ?? b.createdAt ?? b.time ?? b.date ?? 0
    ).getTime();

    return timeB - timeA;
  })[0];

  if (!latestTrade) {
    setAnswer("Place a practice trade first and I'll review it.");
    return;
  }

  const pnl = Number(
    latestTrade.pnl ??
      latestTrade.profit ??
      latestTrade.realizedPnL ??
      0
  );

  const grossPnl = Number(latestTrade.grossPnl ?? pnl);
  const totalFees = Number(latestTrade.totalFees ?? 0);

  const grossPnlText = `$${grossPnl.toFixed(2)}`;
  const feesText = `$${totalFees.toFixed(2)}`;

  const hasStopLoss =
    latestTrade.stopLoss !== undefined &&
    latestTrade.stopLoss !== null &&
    latestTrade.stopLoss !== "";

  const hasTakeProfit =
    latestTrade.takeProfit !== undefined &&
    latestTrade.takeProfit !== null &&
    latestTrade.takeProfit !== "";

  const balanceAtEntry = Number(
    latestTrade.balanceAtEntry ??
      latestTrade.balanceAtClose ??
      balance ??
      10000
  );

  const feeDrivenLoss =
    pnl < 0 &&
    grossPnl >= 0 &&
    totalFees > 0;

const outcomeText =
  pnl > 0
    ? "Trade Result: Profit"
    : pnl < 0
    ? "Trade Result: Loss"
    : "Trade Result: Break Even";

  let reviewText = "";

const marketDirection =
  movingAverageAnalysis?.direction || "TRANSITION";

const marketStructure =
  marketIntelligence?.structure || "RANGING";

const supportText =
  marketIntelligence?.nearestSupport
    ? `$${marketIntelligence.nearestSupport.low.toFixed(2)} - $${marketIntelligence.nearestSupport.high.toFixed(2)}`
    : "No clear nearby support";

const resistanceText =
  marketIntelligence?.nearestResistance
    ? `$${marketIntelligence.nearestResistance.low.toFixed(2)} - $${marketIntelligence.nearestResistance.high.toFixed(2)}`
    : "No clear nearby resistance";

const entryQualityText =
  currentEntryQuality || "NEUTRAL";


  if (mode === "SPOT") {
    const spotTradeValue = Number(
      latestTrade.amount ??
        latestTrade.value ??
        0
    );

    const spotPositionPercent =
      balanceAtEntry > 0
        ? (spotTradeValue / balanceAtEntry) * 100
        : 0;

if (spotPositionPercent > 50) {
  reviewText = `
The main issue was position size.

You committed about ${spotPositionPercent.toFixed(
    1
  )}% of your account to a single trade.

That amount of exposure creates unnecessary account risk, regardless of whether the trade made money or lost money.

I would reduce position size before making any other adjustment.
`;

} else if (!hasStopLoss && spotPositionPercent > 10) {
  reviewText = `
The main issue was the lack of a stop loss.

Without a predefined risk level, it becomes difficult to control losses when the market moves against the position.

I would identify the stop loss before entering the trade and build position size around that risk.
`;

} else if (!hasTakeProfit && spotPositionPercent > 10) {
  reviewText = `
The main issue was the lack of a profit target.

Having a target creates structure and helps avoid emotional decision making during the trade.

I would define both the risk level and profit target before entering.
`;

} else if (feeDrivenLoss) {
  reviewText = `
The risk management appears controlled.

Position size was reasonable and there are no major risk concerns.

The main thing I would review is whether the expected move was large enough to justify the trading costs and fees.
`;

} else {
  reviewText = `
The setup appears reasonably controlled.

Position size was appropriate and there are no major risk management concerns visible from this trade.

I would continue focusing on consistency and disciplined execution.
`;
}
  }

  if (mode === "FUTURES") {
    const marginAmount = Number(
      latestTrade.margin ??
        latestTrade.amount ??
        0
    );

    const leverageUsed = Number(
      latestTrade.leverage ??
        1
    );

    const positionExposure = Number(
      latestTrade.positionSize ??
        marginAmount * leverageUsed
    );

    const marginPercent =
      balanceAtEntry > 0
        ? (marginAmount / balanceAtEntry) * 100
        : 0;

    const exposurePercent =
      balanceAtEntry > 0
        ? (positionExposure / balanceAtEntry) * 100
        : 0;

if (latestTrade.status === "LIQUIDATED") {
  reviewText = `
The main issue was the liquidation.

The combination of margin size, leverage, and exposure created more risk than the account could safely handle.

I would reduce both leverage and margin size before increasing position size again.
`;

} else if (leverageUsed > 20) {
  reviewText = `
The main issue was leverage.

You used ${leverageUsed}x leverage, which significantly increased account risk and reduced the amount of room the trade had to develop.

I would reduce leverage before making any other adjustment to the trade plan.
`;

} else if (marginPercent > 25) {
  reviewText = `
The main issue was margin size.

You committed about ${marginPercent.toFixed(
        1
      )}% of the account as margin on a single trade.

I would reduce margin size so no single position has too much influence on the account.
`;

} else if (exposurePercent > 100) {
  reviewText = `
The main issue was overall exposure.

After leverage was applied, the position controlled about ${exposurePercent.toFixed(
        1
      )}% of the account.

I would reduce exposure so the position has more room to develop without excessive account risk.
`;

} else if (!hasStopLoss) {
  reviewText = `
The main issue was the lack of a stop loss.

Without a predefined risk level, losses can become larger than intended, especially when leverage is involved.

I would identify the stop loss before entering the trade and build position size around that risk.
`;

} else if (feeDrivenLoss) {
  reviewText = `
The risk management appears controlled.

Margin size, leverage, and exposure do not show major warning signs.

The main thing I would review is whether the expected move was large enough to justify the trading costs and fees.
`;

} else {
  reviewText = `
The setup appears reasonably controlled.

Margin size, leverage, exposure, and risk management do not show any major concerns.

I would continue focusing on consistency and disciplined execution.
`;
}
  }

  setAnswer(
  `${outcomeText}

${reviewText}`.trim()
);
}

  return (
    <div className="rounded-3xl border border-cyan-400/20 bg-[#0f172a]/90 p-5 shadow-[0_0_35px_rgba(34,211,238,0.08)]">


      <div className="rounded-2xl border border-zinc-800 bg-[#020617] p-5 text-base leading-7 text-zinc-200">
        {loading ? "Gaby is reviewing..." : answer}
      </div>

<div className="mt-4 flex gap-2">
  <button
    onClick={() => window.dispatchEvent(new Event("startSimulatorTour"))}
    className="h-11 rounded-xl border border-zinc-800 bg-[#111827] px-4 text-sm font-bold text-zinc-300 hover:border-cyan-400 hover:text-cyan-300"
  >
    Explain Panel
  </button>

  <button
    onClick={reviewTrade}
    className="h-11 rounded-xl border border-zinc-800 bg-[#111827] px-4 text-sm font-bold text-zinc-300 hover:border-cyan-400 hover:text-cyan-300"
  >
    Review Trade
  </button>
</div>

      <div className="mt-4 flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") askGaby();
          }}
          placeholder="Ask me about the simulator or review a practice trade."
          className="h-11 flex-1 rounded-xl border border-zinc-800 bg-[#020617] px-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-cyan-400"
        />

        <button
          onClick={() => askGaby()}
          disabled={loading}
          className="h-11 rounded-xl bg-cyan-500 px-4 text-sm font-black text-black hover:bg-cyan-400 disabled:opacity-50"
        >
          Ask
        </button>
      </div>
    </div>
  );
}