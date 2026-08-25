"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { db } from "@/app/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  completeSnapshot,
  isSnapshotComplete,
} from "@/lib/gabySnapshot/snapshot";

type GabySimulatorCoachProps = {
  userId: string;
  isPaid: boolean;

  traderDevelopmentEngines?: {
    trendBias: any;
    riskAllocation: any;
    entryQuality: any;
    exitManagement: any;
  };

  autoQuestion?: string | null;
  clearAutoQuestion?: () => void;
  mode: string;
  selectedCoin: string;
  trades: any[];
  futuresHistory: any[];
  setFuturesHistory: any;
  setTrades: any;
positions: any;
spotPositionFacts: any;
futuresPositions: any[];
futuresPositionManagement: any;
  balance: number;
  marginUsed: number;
  marketIntelligence?: any;
  marketAnalysisSummary?: string;
  movingAverageAnalysis?: any;
  currentEntryQuality?: string | null;
  selectedTimeframe?: string;
  currentPrice?: number;
  priceLocation?: string | null;
  strongestPattern?: any;
  onAnalysisComplete?: (
  subject: string | null
) => void;


onChartCommand?: (command: any) => void;
chartHighlightState?: {
  visible: boolean;
  pinned: boolean;
  type?: "SUPPORT" | "RESISTANCE" | null;
  price?: number | null;
};

};

export default function GabySimulatorCoach({
  userId,
  isPaid,
  traderDevelopmentEngines,
  autoQuestion,
  clearAutoQuestion,
  mode,
  selectedCoin,
  trades,
  futuresHistory,
  setFuturesHistory,
  setTrades,
  positions,
  spotPositionFacts,
  futuresPositions,
  futuresPositionManagement,
  balance,
  marginUsed,
  marketIntelligence,
  marketAnalysisSummary,
  movingAverageAnalysis,
  currentEntryQuality,
  selectedTimeframe,
  currentPrice,
  priceLocation,
  strongestPattern,
  onAnalysisComplete,
  onChartCommand,
  chartHighlightState,
}: GabySimulatorCoachProps) {
  const { user } = useUser();
  const { openSignIn } = useClerk();

function requireSignIn() {
  if (user) {
    return true;
  }

  const currentPage =
    window.location.pathname +
    window.location.search +
    window.location.hash;

  openSignIn({
    forceRedirectUrl: currentPage,
  });

  return false;
}

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(`Not sure what to ask? Ask me about:

Review my last trade
My trades report
My biggest strength
My biggest weakness
My entry quality
My exit timing
My risk management
My trade management
My profit protection
My trading psychology
Leverage & liquidation
Stop losses
How the simulator works   `);

const [loading, setLoading] = useState(false);
const [upgradeRequired, setUpgradeRequired] = useState(false);
const [listening, setListening] = useState(false);
const [voiceMode, setVoiceMode] = useState(false);

const recognitionRef = useRef<any>(null);
const voiceModeRef = useRef(false);

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

const [gabyMemoryLoaded, setGabyMemoryLoaded] = useState(false);

useEffect(() => {
  if (!user?.id || !isPaid) {
    setGabyMemoryLoaded(false);
    return;
  }

  (async () => {
    try {
      const snap = await getDoc(doc(db, "gabySimulatorMemory", user.id));

      if (snap.exists()) {
        const memory = snap.data();

        if (Array.isArray(memory.conversationHistory))
          setConversationHistory(memory.conversationHistory.slice(-12));

        setLastTopic(memory.lastTopic ?? null);
        setLastReferencedLevel(memory.lastReferencedLevel ?? null);

        if (memory.conversationState)
          setConversationState(memory.conversationState);
      }
    } catch (error) {
      console.error("Failed to load Gaby memory:", error);
    } finally {
      setGabyMemoryLoaded(true);
    }
  })();
}, [user?.id, isPaid]);

useEffect(() => {
  if (!user?.id || !isPaid || !gabyMemoryLoaded) return;

  setDoc(
    doc(db, "gabySimulatorMemory", user.id),
    {
      conversationHistory: conversationHistory.slice(-12),
      lastTopic,
      lastReferencedLevel,
      conversationState,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  ).catch((error) =>
    console.error("Failed to save Gaby memory:", error)
  );
}, [
  user?.id,
  isPaid,
  gabyMemoryLoaded,
  conversationHistory,
  lastTopic,
  lastReferencedLevel,
  conversationState,
]);

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
  "thank",
  "ty",
  "thx",
  "thk",
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

    if (
  text.includes("open position") ||
  text.includes("current position") ||
  text.includes("my position") ||
  text.includes("this position") ||
  text.includes("active position") ||
  text.includes("position am i in") ||
  text.includes("position do i have") ||
  text.includes("open trade") ||
  text.includes("current trade") ||
  text.includes("how is my position") ||
  text.includes("how's my position") ||
  text.includes("break-even") ||
  text.includes("break even") ||
  text.includes("break even price") ||
  text.includes("breakeven") ||
  (
    text.includes("profitable") &&
    (
      text.includes("position") ||
      text.includes("trade")
    )
  )
) {
  return "CURRENT_POSITION";
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
  text.includes("trade report") ||
  text.includes("trades report") ||
  text.includes("trader report") ||
  text.includes("development report") ||
  text.includes("progress report") ||
  text.includes("last trades") ||
  text.includes("last 10 trades") ||
  text.includes("last ten trades") ||
  text.includes("last 20 trades") ||
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
  text.includes("consistency") ||

text.includes("exit management") ||
text.includes("my exit management") ||
text.includes("exit efficiency") ||
text.includes("my exit efficiency") ||
text.includes("trade management") ||
text.includes("my trade management") 

) {
  return "TRADER_DEVELOPMENT";
}

if (
  text.includes("review my trade") ||
  text.includes("review my last trade") ||
  text.includes("last trade") ||
  text.includes("my trade") ||
  text.includes("my entry") ||
  text.includes("my exit")
) {
  return "TRADE_REVIEW";
}


if (
  (text.includes("btc") &&
    (
      text.includes("go up") ||
      text.includes("going up") ||
      text.includes("goin up") ||
      text.includes("go down") ||
      text.includes("going down") ||
      text.includes("goin down")
    )) ||
  text.includes("will btc") ||
  text.includes("will bitcoin") ||
  text.includes("where is btc going") ||
  text.includes("is btc going to") ||
  text.includes("will the market") ||
  text.includes("price prediction") ||
  text.includes("predict")
) {
  return "PRICE_PREDICTION";
}

if (
  text.includes("what price to buy") ||
  text.includes("prices to buy") ||
  text.includes("where should i buy") ||
  text.includes("where to buy") ||
  text.includes("when should i buy") ||
  text.includes("when to buy") ||
  text.includes("what should i buy") ||
  text.includes("tell me what to buy") ||
  text.includes("tell me when to buy") ||
  text.includes("tell me at what prices to buy") ||
  text.includes("buy price") ||
  text.includes("good buy") ||
  text.includes("good entry") ||
  text.includes("good long") ||
  text.includes("good short")
) {
  return "SIGNAL_REQUEST";
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

if (
  text.includes("direction") ||
  text.includes("bullish") ||
  text.includes("bearish") ||
  text.includes("transition")
) {
  return "DIRECTION";
}

if (text.includes("pattern")) return "PATTERN";
    if (text.includes("bounce pressure")) return "BOUNCE_PRESSURE";
    if (text.includes("fall force")) return "FALL_FORCE";
    if (text.includes("move condition")) return "MOVE_CONDITION";
    if (text.includes("market state")) return "MARKET_STATE";
if (text.includes("leverage")) return "LEVERAGE";
if (text.includes("liquidation")) return "LIQUIDATION";
if (text.includes("margin")) return "MARGIN";
if (text.includes("review")) return "TRADE_REVIEW";

if (
  text.includes("position") ||
  text.includes("open trade") ||
  text.includes("current trade")
) {
  return "CURRENT_POSITION";
}

return null;
  }

  // Shared single-source filtering method for extracting the target trade context
  const getLatestReviewedTrade = useCallback(() => {
    const sourceArray = mode === "FUTURES" ? futuresHistory : trades;
    const closedTrades = sourceArray.filter((trade) => {
      const isCoinMatch = trade.coin === selectedCoin;
      const isClosed = mode === "FUTURES"
        ? trade.status !== "OPEN"
        : ["SELL", "TAKE PROFIT", "STOP LOSS"].includes(trade.type);
      const hasReviewData = !!(trade.review || trade.automaticReview);

      return isCoinMatch && isClosed && hasReviewData;
    });

    return [...closedTrades].sort((a, b) => {
      const timeA = new Date(a.closedAt ?? a.time ?? 0).getTime();
      const timeB = new Date(b.closedAt ?? b.time ?? 0).getTime();
      return timeB - timeA;
    })[0];
  }, [mode, futuresHistory, trades, selectedCoin]);

async function persistCompletedTradeReviewSnapshot(completedSnapshot: any) {
  if (!completedSnapshot?.snapshotId) return;

    // Optimized: Only map scan on the track arrays tied to the active mode state
    if (mode === "FUTURES") {
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
    } else {
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
    }
if (!isPaid) return;
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

  const askGaby = useCallback(async (customQuestion?: string, reviewOverride?: any) => {
    let finalQuestion = customQuestion || question;
    let reviewSnapshot = reviewOverride || null;

    if (!finalQuestion.trim()) return;

const normalizedInput =
  finalQuestion.trim().toLowerCase();

if (
  normalizedInput === "show support" ||
  normalizedInput === "show me support" ||
  normalizedInput === "show the support" ||
  normalizedInput === "show me the support" ||
  normalizedInput === "where is support" ||
  normalizedInput === "where is the support"
) {
  finalQuestion = "Where is the nearest support?";
}

if (
  normalizedInput === "show resistance" ||
  normalizedInput === "show me resistance" ||
  normalizedInput === "show the resistance" ||
  normalizedInput === "show me the resistance" ||
  normalizedInput === "where is resistance" ||
  normalizedInput === "where is the resistance"
) {
  finalQuestion = "Where is the nearest resistance?";
}  

    const originalQuestion = finalQuestion.trim().toLowerCase();
    let conversationIntent = getConversationIntent(finalQuestion);

// If we're already in a conversation and this doesn't look like
// a brand-new topic, keep using the current intent.
if (
  conversationState.awaitingFollowUp &&
  conversationState.intent &&
  conversationIntent === "FOLLOW_UP"
) {
  conversationIntent = conversationState.intent;
}

console.log("QUESTION:", finalQuestion);
console.log("INTENT:", conversationIntent);

const wantsMultiTradeReview =
  originalQuestion.includes("10") ||
  originalQuestion.includes("20") ||
  originalQuestion.includes("last 10") ||
  originalQuestion.includes("last 20") ||
  originalQuestion.includes("recent trades") ||
  originalQuestion.includes("all trades") ||
  originalQuestion.includes("overall") ||
  originalQuestion.includes("performance") ||
  originalQuestion.includes("progress");

    if (
      conversationIntent === "TRADE_REVIEW" &&
      !wantsMultiTradeReview &&
      !reviewSnapshot
    ) {
      const latestTrade = getLatestReviewedTrade();
      reviewSnapshot =
        latestTrade?.review ||
        latestTrade?.automaticReview ||
        null;
    }
    
let conversationSubject = getConversationSubject(finalQuestion);


if (
  conversationState.awaitingFollowUp &&
  conversationState.subject &&
  (
    conversationIntent === "FOLLOW_UP" ||
    conversationIntent === conversationState.intent
  )
) {
  conversationSubject = conversationState.subject;
}   

// Give GPT explicit context.
if (conversationSubject) {
  finalQuestion = `${finalQuestion}

Context: Continue discussing ${conversationSubject}.`;
}

let currentTopic = lastTopic;

if (originalQuestion.includes("support")) {
  currentTopic = "SUPPORT";
}

if (originalQuestion.includes("resistance")) {
  currentTopic = "RESISTANCE";
}

if (
  originalQuestion.includes("direction") ||
  originalQuestion.includes("bullish") ||
  originalQuestion.includes("bearish") ||
  originalQuestion.includes("transition")
) {
  currentTopic = "DIRECTION";
}

if (
  originalQuestion.includes("review") ||
  originalQuestion.includes("trade") ||
  originalQuestion.includes("entry")
) {
  currentTopic = "REVIEW";
}

setLastTopic(currentTopic);

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

const isInitialTradeReviewRequest =
  conversationIntent === "TRADE_REVIEW" &&
  (
    originalQuestion.includes("review") ||
    originalQuestion.includes("last trade")
  );

if (
  isInitialTradeReviewRequest &&
  isSnapshotComplete(reviewSnapshot)
) {
  const gabyAnswer = reviewSnapshot.gaby.explanation;
  setAnswer(gabyAnswer);
  
  // ✨ Prime the state so the user can immediately ask follow-up questions about this snapshot
  setConversationState({
    intent: "TRADE_REVIEW",
    subject: "TRADE_REVIEW",
    mode: "TRADE_REVIEW",
    awaitingFollowUp: true,
  });

  // ✨ Save it to history so the backend knows what snapshot was just shown
  setConversationHistory((prev) => [
    ...prev.slice(-7),
    {
      user: finalQuestion,
      gaby: gabyAnswer,
    },
  ]);

  setQuestion("");
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
  lastTopic: currentTopic,

  traderDevelopmentEngines,

  mode,
  selectedCoin,
  balance,
  marginUsed,
  selectedTimeframe,
  currentPrice,
  priceLocation,
  strongestPattern,

  chartHighlightState: chartHighlightState ?? {
    visible: false,
    pinned: false,
    type: null,
    price: null,
  },
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
            
            marketAnalysisSummary,
            marketState: marketIntelligence?.marketState,
            controlStrength: marketIntelligence?.controlStrength,
            moveCondition: marketIntelligence?.moveCondition,
            maStructureExtension: marketIntelligence?.maStructureExtension,
            fallForce: marketIntelligence?.fallForce,
            bouncePressure: marketIntelligence?.bouncePressure,
            momentumStage: marketIntelligence?.momentumStage,
trades: trades.slice(-5),
futuresHistory: futuresHistory.slice(-5),

positions,
spotPositionFacts,
futuresPositions,
futuresPositionManagement,
          },
        }),
      });

const data = await res.json();
const gabyAnswer =
  data.answer || "Gaby could not respond right now.";

setAnswer(gabyAnswer);
setUpgradeRequired(Boolean(data.upgradeRequired));

if (
  data.chartCommand &&
  data.chartCommand.action !== "NONE"
) {
  onChartCommand?.(data.chartCommand);
} else {
  onAnalysisComplete?.(conversationSubject);
}

      if (
        reviewSnapshot &&
        !reviewSnapshot.gaby?.generated
      ) {
        const completedSnapshot = completeSnapshot(
          reviewSnapshot,
          gabyAnswer
        );
        await persistCompletedTradeReviewSnapshot(completedSnapshot);
      }

// ✨ Check for either a new subject OR an existing active conversation thread
if (conversationSubject || conversationState.awaitingFollowUp) {
  setConversationState({
    intent: conversationIntent,
    // Keep the previous subject if the current follow-up query didn't mention a new one
    subject: conversationSubject || conversationState.subject,
    mode:
      conversationIntent === "EDUCATION" ? "TEACHING" :
      conversationIntent === "COACHING" ? "COACHING" :
      conversationIntent === "MARKET_ANALYSIS" ? "ANALYSIS" :
      conversationIntent === "SIMULATOR_HELP" ? "SIMULATOR_HELP" :
      conversationIntent === "TRADE_REVIEW" ? "TRADE_REVIEW" :
      conversationIntent === "TRADER_DEVELOPMENT" ? "TRADER_DEVELOPMENT" : "GENERAL",
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
  }, [
  question,
  lastReferencedLevel,
  conversationHistory,
  userId,
  conversationState,
  lastTopic,
  mode,
  selectedCoin,
  balance,
  marginUsed,
  selectedTimeframe,
  currentPrice,
  priceLocation,
  strongestPattern,
  movingAverageAnalysis,
  marketIntelligence,
  marketAnalysisSummary,
trades,
futuresHistory,
positions,
spotPositionFacts,
futuresPositions,
futuresPositionManagement,
getLatestReviewedTrade,

onChartCommand,
chartHighlightState,
]);

function toggleVoiceMode() {
  if (!requireSignIn()) return;

  // TURN OFF
  if (voiceModeRef.current) {
    voiceModeRef.current = false;
    setVoiceMode(false);
    setListening(false);

    try {
      recognitionRef.current?.stop();
    } catch {}

    recognitionRef.current = null;
    return;
  }

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    setAnswer(
      "Voice recognition is not supported in this browser."
    );
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang =
    navigator.language || "en-US";

  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onstart = () => {
    setListening(true);
    setVoiceMode(true);
  };

recognition.onresult = (event: any) => {
  const text =
    event.results[
      event.results.length - 1
    ][0].transcript.trim();

  

  const wakeWord =
    /\b(?:gaby|gabby|gabi|gabbi)\b/i;

  const wakeMatch = text.match(wakeWord);

  if (!wakeMatch) {
    
    return;
  }

  const command = text
    .slice(
      (wakeMatch.index ?? 0) +
        wakeMatch[0].length
    )
    .replace(/^[,\s.!?-]+/, "")
    .trim();

  

if (!command) {
  const firstName = user?.firstName?.trim();

  setAnswer(
    firstName
      ? `Hi ${firstName}! What can I help you with?`
      : "Hi! What can I help you with?"
  );

  return;
}

  setQuestion(command);
  askGaby(command);
};

  recognition.onerror = (event: any) => {
    if (event.error === "no-speech") return;

    console.warn(
      "Gaby voice recognition:",
      event.error
    );
  };

  recognition.onend = () => {
    setListening(false);

    if (!voiceModeRef.current) return;

    try {
      recognition.start();
    } catch {}
  };

  recognitionRef.current = recognition;
  voiceModeRef.current = true;

  try {
    recognition.start();
  } catch {
    voiceModeRef.current = false;
    recognitionRef.current = null;
    setVoiceMode(false);
    setListening(false);
  }
}

useEffect(() => {
  return () => {
    voiceModeRef.current = false;

    try {
      recognitionRef.current?.stop();
    } catch {}

    recognitionRef.current = null;
  };
}, []);

  useEffect(() => {
    if (!autoQuestion) return;
    if (loading) return;

    askGaby(autoQuestion);

    if (clearAutoQuestion) {
      clearAutoQuestion();
    }
  }, [autoQuestion, loading, askGaby, clearAutoQuestion]);

  function reviewTrade() {
    console.log("========== REVIEW START ==========");
    console.log("Mode:", mode);
    console.log("Selected Coin:", selectedCoin);

    console.log(
      "FUTURES HISTORY",
      futuresHistory.map((trade) => ({
        coin: trade.coin,
        status: trade.status,
        pnl: trade.pnl,
        snapshotId: trade.snapshotId,
        hasReview: !!trade.review,
        hasAutomaticReview: !!trade.automaticReview,
        reviewGenerated: trade.review?.gaby?.generated,
        automaticGenerated: trade.automaticReview?.gaby?.generated,
      }))
    );

    console.log(
      "Spot Trades",
      trades.map((trade) => ({
        type: trade.type,
        status: trade.status,
        pnl: trade.pnl,
        snapshotId: trade.snapshotId,
        hasReview: !!trade.review,
        hasAutomaticReview: !!trade.automaticReview,
      }))
    );

    const latestTrade = getLatestReviewedTrade();
    console.log("LATEST TRADE", latestTrade);
    console.log("HAS REVIEW", !!latestTrade?.review);
    console.log("HAS AUTOMATIC REVIEW", !!latestTrade?.automaticReview);

    if (!latestTrade) {
      setAnswer(
        `Complete a ${selectedCoin} practice trade first so I can review it.`
      );
      return;
    }

    const reviewSnapshot = latestTrade.review || latestTrade.automaticReview;

    if (!reviewSnapshot) {
      setAnswer(
        "No completed trade with a saved review was found yet. Close a new TP or SL trade after the snapshot fix."
      );
      return;
    }

    console.log("LATEST TRADE", latestTrade);
    console.log("REVIEW SNAPSHOT", reviewSnapshot);
    console.log("SNAPSHOT COMPLETE", isSnapshotComplete(reviewSnapshot));

    const review = reviewSnapshot.engine?.review;

    if (!review) {
      setAnswer(
        "This trade does not have a completed deterministic review yet."
      );
      return;
    }

    setAnswer(
      `${review.explanation}\n\n${review.context}\n\nLesson: ${review.lesson}`
    );
  }

  return (
    <div className="rounded-3xl border border-cyan-400/20 bg-[#0f172a]/90 p-5 shadow-[0_0_35px_rgba(34,211,238,0.08)]">
      <div className="rounded-2xl border border-zinc-800 bg-[#020617] p-5 text-base leading-6 text-zinc-200 max-h-[460px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {loading ? (
          "Gaby is reviewing..."
        ) : answer.startsWith("Not sure what to ask?") ? (
          <>
            <p className="mb-4 font-semibold">
              Not sure what to ask? Ask me about:
            </p>

            <div className="flex flex-wrap gap-2">
{[
  "Review my last trade",
  "Show my trades report",
  "Where is the nearest support?",
  "Where is the nearest resistance?",
  "What is the overall market direction?",
].map((prompt) => (
  <button
    key={prompt}
    onClick={() => {
      // 1. Force the conversation state immediately based on the button action
      if (prompt === "Review my last trade") {
        setConversationState({
          intent: "TRADE_REVIEW",
          subject: "TRADE_REVIEW",
          mode: "TRADE_REVIEW",
          awaitingFollowUp: true,
        });
      } else if (prompt === "Show my trades report") {
        setConversationState({
          intent: "TRADER_DEVELOPMENT",
          subject: "TRADE_REVIEW",
          mode: "TRADER_DEVELOPMENT",
          awaitingFollowUp: true,
        });
      } else if (prompt.includes("support") || prompt.includes("resistance") || prompt.includes("direction")) {
        setConversationState({
          intent: "MARKET_ANALYSIS",
          subject: prompt.includes("support") ? "SUPPORT" : prompt.includes("resistance") ? "RESISTANCE" :"DIRECTION",
          mode: "ANALYSIS",
          awaitingFollowUp: true,
        });
      }

      // 2. Run the request thread with the state safely locked down
      askGaby(prompt);
    }}
    className="rounded-lg border border-zinc-700 bg-[#0f172a] px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-cyan-400 hover:text-cyan-300"
  >
    {prompt}
  </button>
))}
            </div>
          </>
) : (
  <>
    <div className="whitespace-pre-line">{answer}</div>

    {upgradeRequired && (
      <button
        onClick={async () => {
          const res = await fetch("/api/stripe/checkout", { method: "POST" });
          const data = await res.json();
          if (data.url) window.location.href = data.url;
        }}
        className="mt-4 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-black text-black"
      >
        Upgrade to TradeNestX Pro
      </button>
    )}
  </>
)}
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          onClick={() => window.dispatchEvent(new Event("startSimulatorTour"))}
          className="hidden h-11 rounded-xl border border-zinc-800 bg-[#111827] px-4 text-sm font-bold text-zinc-300 hover:border-cyan-400 hover:text-cyan-300 xl:block"
        >
          Explain Panel
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
onKeyDown={(e) => {
  if (e.key !== "Enter") return;

  if (!requireSignIn()) return;

  askGaby();
}}
          placeholder="Ask me about the simulator or review a practice trade."
          className="h-14 xl:h-11 flex-1 rounded-xl border border-zinc-800 bg-[#020617] px-4 text-base xl:text-sm text-white outline-none placeholder:text-zinc-500 focus:border-cyan-400"
        />

<button
  onClick={toggleVoiceMode}
  className={`h-11 w-full sm:w-auto rounded-xl border px-4 text-sm font-bold transition ${
    voiceMode
      ? "border-cyan-400 bg-cyan-500 text-black"
      : "border-cyan-500/40 bg-[#111827] text-cyan-300 hover:border-cyan-400"
  }`}
>
  {voiceMode
    ? "🎙️ Voice ON"
    : "🎙️ Voice OFF"}
</button>

<button
  onClick={() => {
    if (!requireSignIn()) return;
    askGaby();
  }}
  disabled={loading}
  className="h-11 w-full sm:w-auto rounded-xl bg-cyan-500 px-4 text-sm font-black text-black hover:bg-cyan-400 disabled:opacity-50"
>
  Ask
</button>

      </div>
    </div>
  );
}