"use client";

import { useState } from "react";
import { db } from "@/app/firebase";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  completeSnapshot,
  isSnapshotComplete,
} from "@/lib/gabySnapshot/snapshot";
type GabySimulatorCoachProps = {
userId: string;
  mode: string;
  selectedCoin: string;
  trades: any[];
  futuresHistory: any[];
  setFuturesHistory: any;
setTrades: any;
  positions: any;
  futuresPositions: any[];
  balance: number;
  marginUsed: number;

  marketIntelligence?: any;
  marketAnalysisSummary?: string;
  movingAverageAnalysis?: any;
  currentEntryQuality?: string | null;
  selectedTimeframe?: string;
  currentPrice?: number;
  priceLocation?: string | null;
};

export default function GabySimulatorCoach({
  userId,
  mode,
  selectedCoin,
  trades,
  futuresHistory,
  setFuturesHistory,
setTrades,
  positions,
  futuresPositions,
  balance,
  marginUsed,
marketIntelligence,
marketAnalysisSummary,
movingAverageAnalysis,
  currentEntryQuality,
  selectedTimeframe,
  currentPrice,
  priceLocation,
}: GabySimulatorCoachProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "Hi, I’m Gaby. I can help explain the simulator, spot trading, futures, leverage, liquidation, and review your practice trades."
  );
  const [loading, setLoading] = useState(false);
  

const [conversationHistory, setConversationHistory] = useState<any[]>([]);
const [lastReferencedLevel, setLastReferencedLevel] = useState<any>(null);
const [lastTopic, setLastTopic] = useState<string | null>(null);

const [conversationState, setConversationState] = useState<{
  intent: string | null;
  subject: string | null;
  mode: string | null;
  awaitingFollowUp: boolean;
}>({
  intent: null,
  subject: null,
  mode: null,
  awaitingFollowUp: false,
});

function getConversationIntent(message: string) {
  const text = message.trim().toLowerCase();

const acknowledgementWords = [
  "ok",
  "okay",
  "yes",
  "yep",
  "yup",
  "cool",
  "nice",
  "got it",
  "understood",
  "makes sense",
];

if (acknowledgementWords.includes(text)) {
  return "CONVERSATION_ACKNOWLEDGEMENT";
}

const thankWords = [
  "thanks",
  "thank you",
  "ty",
  "thx",
];

if (thankWords.includes(text)) {
  return "CONVERSATION_THANKS";
}

const greetingWords = [
  "hi",
  "hello",
  "hey",
  "good morning",
  "good afternoon",
  "good evening",
];

if (greetingWords.includes(text)) {
  return "CONVERSATION_GREETING";
}

const farewellWords = [
  "bye",
  "goodbye",
  "see you",
  "talk later",
  "good night",
];

if (farewellWords.includes(text)) {
  return "CONVERSATION_FAREWELL";
}

  const followUps = [
    "why",
    "how",
    "explain more",
    "more details",
    "what do you mean",
    "explain that",
    "that",
    "this",
    "can you explain",
  ];

  if (followUps.some((word) => text.includes(word))) {
    return "FOLLOW_UP";
  }

  if (
    text.includes("what is") ||
    text.includes("what does") ||
    text.includes("how does") ||
    text.includes("explain")
  ) {
    return "EDUCATION";
  }

  if (
    text.includes("i think") ||
    text.includes("looks bullish") ||
    text.includes("looks bearish") ||
    text.includes("i believe")
  ) {
    return "COACHING";
  }

  if (
    text.includes("liquidation") ||
    text.includes("leverage") ||
    text.includes("margin") ||
    text.includes("position size")
  ) {
    return "SIMULATOR_HELP";
  }

  if (
    text.includes("review") ||
    text.includes("trade") ||
    text.includes("entry")
  ) {
    return "TRADE_REVIEW";
  }

if (
  text.includes("how am i") ||
  text.includes("how's my trading") ||
  text.includes("how is my trading") ||
  text.includes("overall performance") ||
  text.includes("overall review") ||
  text.includes("overall progress") ||
  text.includes("improving") ||
  text.includes("getting better") ||
  text.includes("my strengths") ||
  text.includes("my weaknesses") ||
  text.includes("what should i improve") ||
  text.includes("what should i work on") ||
  text.includes("consistency")
) {
  return "TRADER_DEVELOPMENT";
}

  if (
    text.includes("btc") ||
    text.includes("bullish") ||
    text.includes("bearish") ||
    text.includes("support") ||
    text.includes("resistance") ||
    text.includes("pattern")
  ) {
    return "MARKET_ANALYSIS";
  }

  return "GENERAL_QUESTION";
}

function getConversationSubject(message: string) {
  const text = message.trim().toLowerCase();

  if (text.includes("rsi")) return "RSI";

  if (
    text.includes("moving average") ||
    text.includes("ma7") ||
    text.includes("ma 7") ||
    text.includes("ma25") ||
    text.includes("ma 25") ||
    text.includes("ma99") ||
    text.includes("ma 99")
  ) {
    return "MOVING_AVERAGES";
  }

  if (text.includes("volume")) return "VOLUME";
  if (text.includes("momentum")) return "MOMENTUM";
  if (text.includes("support")) return "SUPPORT";
  if (text.includes("resistance")) return "RESISTANCE";
  if (text.includes("pattern")) return "PATTERN";
  if (text.includes("bounce pressure")) return "BOUNCE_PRESSURE";
  if (text.includes("fall force")) return "FALL_FORCE";
  if (text.includes("move condition")) return "MOVE_CONDITION";
  if (text.includes("market state")) return "MARKET_STATE";
  if (text.includes("leverage")) return "LEVERAGE";
  if (text.includes("liquidation")) return "LIQUIDATION";
  if (text.includes("margin")) return "MARGIN";
  if (text.includes("review")) return "TRADE_REVIEW";

  return null;
}

async function persistCompletedTradeReviewSnapshot(
  completedSnapshot: any
) {
  if (!completedSnapshot?.snapshotId) return;

  setFuturesHistory((prev: any[]) =>
    prev.map((trade) =>
      trade.snapshotId === completedSnapshot.snapshotId
        ? {
            ...trade,
            automaticReview: completedSnapshot,
            review: completedSnapshot,
          }
        : trade
    )
  );

  setTrades((prev: any[]) =>
    prev.map((trade) =>
      trade.snapshotId === completedSnapshot.snapshotId
        ? {
            ...trade,
            review: completedSnapshot,
          }
        : trade
    )
  );

  const q = query(
    collection(db, "tradeReviews"),
    where("snapshotId", "==", completedSnapshot.snapshotId)
  );

  const snapshot = await getDocs(q);

  snapshot.docs.forEach(async (reviewDoc) => {
    await updateDoc(reviewDoc.ref, {
      review: completedSnapshot,
    });
  });
}

async function askGaby(customQuestion?: string, reviewOverride?: any) {
  let finalQuestion = customQuestion || question;

  if (!finalQuestion.trim()) return;

  const originalQuestion = finalQuestion.trim().toLowerCase();

const conversationIntent =
  getConversationIntent(finalQuestion);

let conversationSubject =
  getConversationSubject(finalQuestion);

if (
  conversationIntent === "FOLLOW_UP" &&
  conversationState.subject
) {
  conversationSubject = conversationState.subject;
}

if (
  conversationIntent === "FOLLOW_UP" &&
  conversationSubject
) {
  finalQuestion = `${finalQuestion} Context: continue explaining ${conversationSubject}.`;
}


if (originalQuestion.includes("support")) {
  setLastTopic("SUPPORT");
}

if (originalQuestion.includes("resistance")) {
  setLastTopic("RESISTANCE");
}

if (
  originalQuestion.includes("direction") ||
  originalQuestion.includes("bullish") ||
  originalQuestion.includes("bearish") ||
  originalQuestion.includes("transition")
) {
  setLastTopic("DIRECTION");
}

if (
  originalQuestion.includes("review") ||
  originalQuestion.includes("trade") ||
  originalQuestion.includes("entry")
) {
  setLastTopic("REVIEW");
}

  if (originalQuestion.includes("support")) {
  setLastReferencedLevel({
    type: "SUPPORT",
    index: 0,
  });
}

if (originalQuestion.includes("resistance")) {
  setLastReferencedLevel({
    type: "RESISTANCE",
    index: 0,
  });
}

const reviewSnapshot = reviewOverride || null;

console.log("ASK GABY REVIEW SNAPSHOT:", reviewSnapshot);

if (isSnapshotComplete(reviewSnapshot)) {
  setAnswer(reviewSnapshot.gaby.explanation);
  return;
}

  setLoading(true);

  try {
    const res = await fetch("/api/gaby-simulator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({
        question: finalQuestion,
        lastReferencedLevel,
        lastReviewData: reviewSnapshot,
        conversationHistory: conversationHistory.slice(-8),
simulatorContext: {
  userId,
  conversationIntent,
  conversationSubject,
  conversationState,
  lastTopic,
  mode,
  selectedCoin,
          balance,
          marginUsed,
          selectedTimeframe,
          currentPrice,
          priceLocation,
          marketDirection: movingAverageAnalysis?.direction,
          structure: marketIntelligence?.structure,
          ma7: movingAverageAnalysis?.ma7,
          ma25: movingAverageAnalysis?.ma25,
          ma99: movingAverageAnalysis?.ma99,
nearestSupport: marketIntelligence?.nearestSupport,
nextSupport: marketIntelligence?.nextSupport,
nearestResistance: marketIntelligence?.nearestResistance,
nextResistance: marketIntelligence?.nextResistance,
supportLevels: marketIntelligence?.supportLevels,
resistanceLevels: marketIntelligence?.resistanceLevels,
          patternAnalysis: marketIntelligence?.patternAnalysis,
momentumAnalysis: marketIntelligence?.momentumAnalysis,
volumeAnalysis: marketIntelligence?.volumeAnalysis,
rsiAnalysis: marketIntelligence?.rsiAnalysis,
marketConviction: marketIntelligence?.marketConviction,
marketAnalysisSummary,
marketState: marketIntelligence?.marketState,
controlStrength: marketIntelligence?.controlStrength,
moveCondition: marketIntelligence?.moveCondition,

maStructureExtension:
  marketIntelligence?.maStructureExtension,

fallForce:
  marketIntelligence?.fallForce,

bouncePressure:
  marketIntelligence?.bouncePressure,

momentumStage:
  marketIntelligence?.momentumStage,

trades: trades.slice(-5),
          futuresHistory: futuresHistory.slice(-5),
          positions,
          futuresPositions,
        },
      }),
    });

    const data = await res.json();

const gabyAnswer = data.answer || "Gaby could not respond right now.";

setAnswer(gabyAnswer);

if (
  reviewSnapshot &&
  !reviewSnapshot.gaby?.generated
) {
  const completedSnapshot = completeSnapshot(
    reviewSnapshot,
    gabyAnswer
  );

await persistCompletedTradeReviewSnapshot(
  completedSnapshot
);  

}

if (conversationSubject) {
  setConversationState({
    intent: conversationIntent,
    subject: conversationSubject,
mode:
  conversationIntent === "EDUCATION"
    ? "TEACHING"
    : conversationIntent === "COACHING"
    ? "COACHING"
    : conversationIntent === "MARKET_ANALYSIS"
    ? "ANALYSIS"
    : conversationIntent === "SIMULATOR_HELP"
    ? "SIMULATOR_HELP"
    : conversationIntent === "TRADE_REVIEW"
    ? "TRADE_REVIEW"
    : conversationIntent === "TRADER_DEVELOPMENT"
    ? "TRADER_DEVELOPMENT"
    : "GENERAL",
    awaitingFollowUp: true,
  });
}

setConversationHistory((prev) => [
  ...prev.slice(-7),
  {
    user: finalQuestion,
    gaby: gabyAnswer,
  },
]);

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
            trade.coin === selectedCoin &&
            trade.status !== "OPEN" &&
            trade.pnl !== null &&
            trade.pnl !== undefined
        )
      : trades.filter(
          (trade) =>
            trade.coin === selectedCoin &&
            trade.type === "SELL" &&
            trade.pnl !== null &&
            trade.pnl !== undefined
        );

  const latestTrade = closedTrades.find(
  (trade) => trade.automaticReview || trade.review
);

  if (!latestTrade) {
    setAnswer(
      `Complete a ${selectedCoin} practice trade first so I can review it.`
    );
    return;
  }

const reviewSnapshot =
  latestTrade.review || latestTrade.automaticReview;

if (!reviewSnapshot) {
  setAnswer(
    "This completed trade does not have a saved review yet."
  );
  return;
}

askGaby(
  "Review my latest completed trade using this snapshot.",
  reviewSnapshot
);
}

  return (
    <div className="rounded-3xl border border-cyan-400/20 bg-[#0f172a]/90 p-5 shadow-[0_0_35px_rgba(34,211,238,0.08)]">


      <div className="whitespace-pre-line rounded-2xl border border-zinc-800 bg-[#020617] p-5 text-base leading-6 text-zinc-200">
        {loading ? "Gaby is reviewing..." : answer}
      </div>

<div className="mt-4 flex flex-col gap-2 sm:flex-row">
<button
  onClick={() => window.dispatchEvent(new Event("startSimulatorTour"))}
  className="hidden h-11 rounded-xl border border-zinc-800 bg-[#111827] px-4 text-sm font-bold text-zinc-300 hover:border-cyan-400 hover:text-cyan-300 xl:block"
>
  Explain Panel
</button>

<button
  onClick={reviewTrade}
  className="h-11 w-full sm:w-auto rounded-xl border border-zinc-800 bg-[#111827] px-4 text-sm font-bold text-zinc-300 hover:border-cyan-400 hover:text-cyan-300"
>
  Review Trade
</button>
</div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") askGaby();
          }}
          placeholder="Ask me about the simulator or review a practice trade."
          className="h-14 xl:h-11 flex-1 rounded-xl border border-zinc-800 bg-[#020617] px-4 text-base xl:text-sm text-white outline-none placeholder:text-zinc-500 focus:border-cyan-400"
        />

<button
  onClick={() => askGaby()}
  disabled={loading}
  className="h-11 w-full sm:w-auto rounded-xl bg-cyan-500 px-4 text-sm font-black text-black hover:bg-cyan-400 disabled:opacity-50"
>
  Ask
</button>
      </div>
    </div>
  );
}